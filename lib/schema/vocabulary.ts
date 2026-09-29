import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The schema.org vocabulary, read out of schema-dts.
 *
 * Google's Rich Results Test is the usual way to check structured data, and
 * it is unreachable from this environment. What it mostly catches — a type
 * that does not exist, a property misspelled or hung on a type that does not
 * define it — can be caught here instead, against the real vocabulary rather
 * than a list someone typed out. schema-dts ships the whole of schema.org as
 * TypeScript interfaces; this reads the property names back out of them.
 *
 * Test-time only. Nothing here is bundled.
 */

/**
 * schema-dts declares each type as `interface XLeaf extends YBase { "@type": "X" }`
 * with the properties on the Base interfaces, so the chain is walked through
 * the interfaces rather than the exported type aliases.
 */
const INTERFACE = /interface (\w+) extends ([^{]+)\{/g;
const PROPERTY = /"(@?[a-zA-Z][\w:]*)"\?:/g;

/** Structural JSON-LD keys, which are not schema.org properties. */
const JSON_LD_KEYS = new Set(["@context", "@type", "@id", "@graph", "@value", "@language"]);

type Vocabulary = {
  /** schema.org type name -> every property it defines or inherits */
  properties: Map<string, Set<string>>;
};

let cached: Vocabulary | undefined;

export function schemaVocabulary(): Vocabulary {
  if (cached) return cached;

  const source = readFileSync(
    path.join(process.cwd(), "node_modules/schema-dts/dist/schema.d.ts"),
    "utf8",
  );

  const own = new Map<string, Set<string>>();
  const parents = new Map<string, string[]>();

  for (const match of source.matchAll(INTERFACE)) {
    const name = match[1] ?? "";
    const extended = match[2] ?? "";
    const start = match.index! + match[0].length;
    const body = source.slice(start, source.indexOf("\n}", start));
    own.set(
      name,
      new Set([...body.matchAll(PROPERTY)].map((property) => property[1] ?? "")),
    );
    parents.set(
      name,
      extended
        .split(",")
        .map((parent) => parent.trim())
        // Partial<IdReference> and the like carry no schema.org properties
        .filter((parent) => /^\w+$/.test(parent)),
    );
  }

  const resolved = new Map<string, Set<string>>();
  const resolveInterface = (name: string, seen = new Set<string>()): Set<string> => {
    if (seen.has(name)) return new Set();
    seen.add(name);
    const properties = new Set(own.get(name) ?? []);
    for (const parent of parents.get(name) ?? []) {
      for (const inherited of resolveInterface(parent, seen)) properties.add(inherited);
    }
    return properties;
  };

  /* A type is whatever its Leaf interface says, falling back to its Base. */
  for (const name of own.keys()) {
    const type = name.replace(/(Leaf|Base)$/, "");
    if (type === name) continue;
    if (name.endsWith("Leaf") || !resolved.has(type)) {
      resolved.set(type, resolveInterface(name));
    }
  }

  cached = { properties: resolved };
  return cached;
}

export function isSchemaType(type: string): boolean {
  return schemaVocabulary().properties.has(type);
}

/** Property names on `type` that schema.org does not define. */
export function unknownProperties(type: string, keys: readonly string[]): string[] {
  const known = schemaVocabulary().properties.get(type);
  if (!known) return [];
  return keys.filter((key) => !JSON_LD_KEYS.has(key) && !known.has(key));
}
