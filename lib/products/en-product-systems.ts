import { productSystemAssets } from "@/lib/products/product-assets";

export type ProductSystemIcon =
  | "water"
  | "gas"
  | "irrigation"
  | "sewer"
  | "drainage"
  | "pe100";

export type ProductSystemSpec = {
  label: string;
  value: string;
};

export type ProductSystem = {
  id: ProductSystemIcon;
  number: string;
  name: string;
  slug: string;
  path: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  accent: string;
  accentMuted: string;
  icon: ProductSystemIcon;
  eyebrow: string;
  title: string;
  description: string;
  tags: readonly string[];
  specs: readonly ProductSystemSpec[];
  ctaLabel: string;
  imageAlt: string;
};

/** @deprecated use productSystemAssets */
export const enProductSystemAssets = productSystemAssets;

export const enProductSystems: readonly ProductSystem[] = [
  {
    id: "water",
    number: "01",
    name: "Water",
    slug: "water-supply-pipe",
    path: "/products/water-supply-pipe",
    image: productSystemAssets.water,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#33aaff",
    accentMuted: "rgba(51, 170, 255, 0.12)",
    icon: "water",
    eyebrow: "WATER PIPE SYSTEMS",
    title: "Reliable flow. Every drop.",
    description:
      "HDPE water pipe for municipal, rural and industrial transfer — smooth bore, fusion-friendly and corrosion-free in soil.",
    tags: ["PE100", "Pressure Systems", "Municipal / Industrial"],
    specs: [
      { label: "Application", value: "Potable & raw water networks" },
      { label: "Jointing", value: "Butt fusion compatible" },
      { label: "Production", value: "INSO 14427-2 qualifying lines" },
      { label: "Surface", value: "Smooth internal bore" },
      { label: "Service", value: "Buried corrosion-free" },
    ],
    ctaLabel: "Explore Water Pipes",
    imageAlt: "HDPE water pipe with blue stripe in a water transfer environment",
  },
  {
    id: "gas",
    number: "02",
    name: "Gas",
    slug: "gas-pipe",
    path: "/products/gas-pipe",
    image: productSystemAssets.gas,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#e8b923",
    accentMuted: "rgba(232, 185, 35, 0.12)",
    icon: "gas",
    eyebrow: "GAS PIPE SYSTEMS",
    title: "Distribution integrity underground.",
    description:
      "Single-wall polyethylene pipe for gas service connections and distribution — corrosion-resistant and suited to fusion joints.",
    tags: ["PE100", "Electrofusion", "Distribution Networks"],
    specs: [
      { label: "Application", value: "Gas service & distribution" },
      { label: "Jointing", value: "Electrofusion where specified" },
      { label: "Environment", value: "Soil & infrastructure" },
      { label: "Flexibility", value: "Curved alignments" },
      { label: "Reference", value: "Project specification driven" },
    ],
    ctaLabel: "Explore Gas Pipes",
    imageAlt: "HDPE gas pipe with amber stripe in infrastructure context",
  },
  {
    id: "irrigation",
    number: "03",
    name: "Irrigation",
    slug: "irrigation-pipe",
    path: "/products/irrigation-pipe",
    image: productSystemAssets.irrigation,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#3ecf7a",
    accentMuted: "rgba(62, 207, 122, 0.12)",
    icon: "irrigation",
    eyebrow: "IRRIGATION PIPE SYSTEMS",
    title: "Field-ready pressurised mains.",
    description:
      "Polyethylene pipe for pressurised agricultural water mains between source, storage and field irrigation networks.",
    tags: ["Pressurised Mains", "Agriculture", "Fusion Compatible"],
    specs: [
      { label: "Application", value: "Farm feeder mains" },
      { label: "Context", value: "Pump to field header" },
      { label: "Routing", value: "Flexible terrain" },
      { label: "Networks", value: "Drip & sprinkler supply" },
      { label: "Durability", value: "Irrigation water chemistry" },
    ],
    ctaLabel: "Explore Irrigation Pipes",
    imageAlt: "HDPE irrigation pipe with green stripe in agricultural field",
  },
  {
    id: "sewer",
    number: "04",
    name: "Sewer",
    slug: "sewage-pipe",
    path: "/products/sewage-pipe",
    image: productSystemAssets.sewer,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#a56bff",
    accentMuted: "rgba(165, 107, 255, 0.12)",
    icon: "sewer",
    eyebrow: "SEWER PIPE SYSTEMS",
    title: "Wastewater collection below grade.",
    description:
      "Polyethylene pipe for municipal and industrial wastewater collection systems with chemical resistance and fusion joint integrity.",
    tags: ["Sanitary Sewer", "Fusion Joints", "Buried Networks"],
    specs: [
      { label: "Application", value: "Wastewater collection" },
      { label: "Environment", value: "Wet soil performance" },
      { label: "Chemistry", value: "Common wastewater resistance" },
      { label: "Installation", value: "Lightweight civil works" },
      { label: "Design", value: "Gradient per specification" },
    ],
    ctaLabel: "Explore Sewer Pipes",
    imageAlt: "HDPE sewer pipe with purple accent in underground tunnel",
  },
  {
    id: "drainage",
    number: "05",
    name: "Drainage",
    slug: "drainage-pipe",
    path: "/products/drainage-pipe",
    image: productSystemAssets.drainage,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#2ec4d6",
    accentMuted: "rgba(46, 196, 214, 0.12)",
    icon: "drainage",
    eyebrow: "DRAINAGE PIPE SYSTEMS",
    title: "Surface water, controlled flow.",
    description:
      "Polyethylene pipe for surface water and subsurface drainage — stormwater routing, not sanitary sewage.",
    tags: ["Stormwater", "Surface Drainage", "Civil Networks"],
    specs: [
      { label: "Application", value: "Surface & site drainage" },
      { label: "Hydraulics", value: "Smooth bore capacity" },
      { label: "Context", value: "Road & yard projects" },
      { label: "Alignment", value: "Flexible routing" },
      { label: "Design", value: "Hydraulic gradient driven" },
    ],
    ctaLabel: "Explore Drainage Pipes",
    imageAlt: "HDPE drainage pipe with cyan stripe in stormwater environment",
  },
  {
    id: "pe100",
    number: "06",
    name: "PE100",
    slug: "pe100-pipe",
    path: "/products/pe100-pipe",
    image: productSystemAssets.pe100,
    imageWidth: 1672,
    imageHeight: 941,
    accent: "#33aaff",
    accentMuted: "rgba(51, 170, 255, 0.12)",
    icon: "pe100",
    eyebrow: "PE100 MATERIAL GRADE",
    title: "Higher MRS. Demanding pressure design.",
    description:
      "PE100 polyethylene pipe with higher MRS for higher-pressure design — thinner walls or higher rating at the same SDR.",
    tags: ["PE100 Grade", "Pressure Design", "Engineering Spec"],
    specs: [
      { label: "Material", value: "PE100 MRS grade" },
      { label: "Design", value: "Higher-pressure segments" },
      { label: "Application", value: "Industrial transfer" },
      { label: "Engineering", value: "PN / SDR per project" },
      { label: "QC", value: "Laboratory mechanical scope" },
    ],
    ctaLabel: "Explore PE100",
    imageAlt: "PE100 HDPE pipe engineering cutaway with blue technical environment",
  },
] as const;
