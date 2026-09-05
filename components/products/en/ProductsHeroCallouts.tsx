import type { HeroCallout } from "@/lib/products/en-hub-hero";

type ProductsHeroCalloutsProps = {
  callouts: readonly HeroCallout[];
};

/** Stem start in viewBox units — label box sits left of anchor on desktop */
function calloutStemStart(callout: HeroCallout) {
  const labelRight = callout.labelAt.x + 14;
  const x =
    callout.anchor.x > callout.labelAt.x
      ? Math.min(labelRight, callout.anchor.x - 1.5)
      : Math.max(callout.labelAt.x - 2, callout.anchor.x + 1.5);

  return { x, y: callout.labelAt.y + 2 };
}

export function ProductsHeroCallouts({ callouts }: ProductsHeroCalloutsProps) {
  return (
    <svg
      className="en-products-hero__callouts"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {callouts.map((callout, index) => {
        const stem = calloutStemStart(callout);

        return (
          <g
            key={callout.id}
            className="en-products-hero__callout-line"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <circle
              cx={callout.anchor.x}
              cy={callout.anchor.y}
              r="0.45"
              className="en-products-hero__callout-dot"
            />
            <line
              x1={stem.x}
              y1={stem.y}
              x2={callout.anchor.x}
              y2={callout.anchor.y}
              className="en-products-hero__callout-stem"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ProductsHeroCalloutLabels({ callouts }: ProductsHeroCalloutsProps) {
  return (
    <div className="en-products-hero__callout-labels">
      {callouts.map((callout, index) => (
        <div
          key={callout.id}
          className="en-products-hero__callout-label"
          style={
            {
              left: `${callout.labelAt.x}%`,
              top: `${callout.labelAt.y}%`,
              animationDelay: `${0.35 + index * 0.1}s`,
            } as React.CSSProperties
          }
        >
          <span className="en-products-hero__callout-title">{callout.label}</span>
          <span className="en-products-hero__callout-detail">{callout.detail}</span>
        </div>
      ))}
    </div>
  );
}

/** Stacked spec list — mobile/tablet only (desktop uses pipe callouts) */
export function ProductsHeroMobileSpecs({ callouts }: ProductsHeroCalloutsProps) {
  return (
    <ul className="en-products-hero__mobile-specs">
      {callouts.map((callout) => (
        <li key={callout.id} className="en-products-hero__mobile-spec">
          <span className="en-products-hero__mobile-spec-title">{callout.label}</span>
          <span className="en-products-hero__mobile-spec-detail">{callout.detail}</span>
        </li>
      ))}
    </ul>
  );
}
