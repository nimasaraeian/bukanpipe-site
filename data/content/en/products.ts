import { buildEnProduct } from "@/data/content/shared/product-factory";

export const enProducts = [
  buildEnProduct({
    id: "product-gas-pipe",
    slug: "gas-pipe",
    title: "HDPE Gas Pipe",
    seoTitle: "HDPE Gas Pipe | PE100 Gas Distribution Pipe | Bukan Pipe",
    seoDescription:
      "HDPE gas pipe for municipal and rural gas distribution. Manufactured to EN 1555, INSO 11233 and IGS-M-PL-014-1 where applicable to the project.",
    description:
      "Single-wall polyethylene pipe for gas service connections and distribution — corrosion-resistant and suited to fusion joints.",
    primaryKeyword: "HDPE gas pipe",
    secondaryKeywords: ["PE100 gas pipe", "polyethylene gas pipe", "gas distribution PE pipe"],
    overview:
      "Main transmission lines in gas networks are often steel. Polyethylene pipe is widely used for urban and rural service connections and distribution branches. Bukan Pipe manufactures HDPE gas pipe in a range of sizes aligned with EN 1555, INSO 11233 and National Iranian Gas Company reference IGS-M-PL-014-1 for qualifying projects.",
    advantages: [
      "Fusion joints can match pipe strength when executed and inspected correctly",
      "Flexibility reduces fittings on curved alignments — useful in seismic areas",
      "Corrosion and abrasion resistance in soil environments",
      "Better tolerance of ground movement than rigid metallic pipe in many layouts",
    ],
    applications: [
      "Urban and rural gas service connections from steel mains",
      "Low and medium-pressure distribution in infrastructure projects",
      "Lines requiring electrofusion — the method approved for gas service in Iran",
    ],
    standardsNote:
      "Pressure class, SDR and joint type must follow the project specification, engineering drawing and gas utility requirements. Request project-specific recommendations from sales.",
    qualityNote:
      "Production QC and relevant mechanical tests are performed in-line and in the laboratory. See the Laboratory section for test scope.",
    relatedProducts: ["pe100-pipe", "water-supply-pipe"],
    relatedApplications: ["gas-distribution"],
    relatedArticles: ["polyethylene-pipe-welding", "polyethylene-pipe-temperature-pressure"],
    references: ["https://bukanpipe.com/gas-pipe/"],
    faqs: [
      {
        question: "Which jointing method is used for municipal gas networks?",
        answer:
          "Electrofusion is the approved method for gas distribution in Iran. Joint quality depends on operator qualification, machine parameters and inspection.",
      },
      {
        question: "Does PE gas pipe become brittle in cold weather?",
        answer:
          "Polyethylene retains elasticity at typical regional winter temperatures. Below-freeze brittleness is not characteristic of PE in normal service conditions.",
      },
    ],
  }),
  buildEnProduct({
    id: "product-water-supply-pipe",
    slug: "water-supply-pipe",
    title: "HDPE Water Pipe",
    seoTitle: "HDPE Water Pipe | PE100 Water Supply Pipe to 630 mm | Bukan Pipe",
    seoDescription:
      "HDPE water pipe for potable and raw water networks. Single-wall extrusion up to 630 mm (25 in) OD. INSO 14427-2 production for qualifying water projects.",
    description:
      "Polyethylene pipe for municipal, rural and industrial water transfer — smooth bore, fusion-friendly and corrosion-free in soil.",
    primaryKeyword: "HDPE water pipe",
    secondaryKeywords: ["PE100 water pipe", "HDPE pipe for water supply", "polyethylene water pipe"],
    overview:
      "Bukan Pipe produces single-wall HDPE pipe up to 630 mm outside diameter (25 in) in a range of wall thicknesses and pressure classes. Potable and raw water supply is a core application; water pipe for qualifying projects is produced to INSO 14427-2 with PN marked on the pipe body at 20 °C reference temperature.",
    advantages: [
      "Corrosion-free service life in buried installations",
      "Smooth internal surface supports hydraulic design",
      "Faster field installation than metallic pipe with butt fusion",
      "Lower handling weight for rural and urban projects",
    ],
    applications: [
      "Municipal and rural potable water networks",
      "Raw, treated and pressurised agricultural water mains",
      "Industrial water transfer lines",
    ],
    standardsNote:
      "PN marked on the pipe applies at 20 °C. At higher fluid or ambient temperatures, apply temperature derating (see Technical Center article on MOP).",
    qualityNote: "Incoming material, in-line dimensional control and laboratory testing support production QC.",
    relatedProducts: ["pe100-pipe", "irrigation-pipe"],
    relatedApplications: ["water-transfer"],
    relatedArticles: ["polyethylene-pipe-temperature-pressure", "air-vent-valve"],
    references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/temp-cooficient/"],
    faqs: [
      {
        question: "Is PN on the pipe the same as operating pressure on site?",
        answer:
          "No. PN is defined at 20 °C reference. Maximum operating pressure (MOP) must include temperature and service factors from the project engineer.",
      },
    ],
  }),
  buildEnProduct({
    id: "product-sewage-pipe",
    slug: "sewage-pipe",
    title: "HDPE Sewer Pipe",
    seoTitle: "HDPE Sewer Pipe | Polyethylene Wastewater Pipe | Bukan Pipe",
    seoDescription:
      "HDPE pipe for sanitary sewer collection and transfer. Chemical resistance and fusion joints for buried wastewater networks.",
    description: "Polyethylene pipe for municipal and industrial wastewater collection systems.",
    primaryKeyword: "HDPE sewer pipe",
    secondaryKeywords: ["PE sewer pipe", "polyethylene sewer pipe", "HDPE wastewater pipe"],
    overview:
      "HDPE is a common choice for wastewater collection because of chemical resistance, joint integrity and durability in wet soil. Bukan Pipe supplies polyethylene pipe for sanitary sewer and wastewater collection networks.",
    advantages: [
      "Resistance to common wastewater chemistry",
      "Fusion joints reduce leakage points",
      "Long-term performance in moist ground",
      "Lightweight installation on civil projects",
    ],
    applications: [
      "Municipal sanitary sewer networks",
      "Industrial and landscape wastewater lines",
      "Building connections to public sewers",
    ],
    standardsNote:
      "Pressure class, SDR and line gradient must follow the sewer design and project specification.",
    qualityNote: "Dimensional, mechanical and pressure-related tests per factory QC scope.",
    relatedProducts: ["drainage-pipe"],
    relatedApplications: ["sewage"],
    relatedArticles: [],
    faqs: [],
  }),
  buildEnProduct({
    id: "product-drainage-pipe",
    slug: "drainage-pipe",
    title: "HDPE Drainage Pipe",
    seoTitle: "HDPE Drainage Pipe | Polyethylene Surface Drainage | Bukan Pipe",
    seoDescription:
      "HDPE drainage pipe for stormwater, surface runoff and complementary civil networks — for surface water, not sanitary sewage.",
    description: "Polyethylene pipe for surface water and subsurface drainage.",
    primaryKeyword: "HDPE drainage pipe",
    secondaryKeywords: ["PE drainage pipe", "polyethylene drainage pipe", "stormwater HDPE pipe"],
    overview:
      "Drainage addresses surface runoff, infiltration and complementary civil flows — not sanitary sewage. HDPE offers hydraulic capacity, flexibility and soil durability for these networks.",
    advantages: [
      "Smooth bore for hydraulic capacity",
      "Rapid installation on road and site projects",
      "UV exposure must follow project specification for above-ground runs",
      "Fewer fittings on flexible alignments",
    ],
    applications: [
      "Road and industrial yard drainage",
      "Agricultural and site stormwater routing",
      "Complementary networks alongside sewer lines",
    ],
    standardsNote: "Diameter and gradient follow hydraulic design and construction drawings.",
    qualityNote: "Production QC aligned with other PE pipe families.",
    relatedProducts: ["sewage-pipe"],
    relatedApplications: ["drainage"],
    relatedArticles: [],
    faqs: [],
  }),
  buildEnProduct({
    id: "product-irrigation-pipe",
    slug: "irrigation-pipe",
    title: "HDPE Irrigation Pipe",
    seoTitle: "HDPE Irrigation Pipe | Agricultural PE Pipe | Bukan Pipe",
    seoDescription:
      "HDPE irrigation pipe for pressurised farm mains and water transfer to drip, sprinkler and feeder networks.",
    description: "Polyethylene pipe for pressurised agricultural water mains.",
    primaryKeyword: "HDPE irrigation pipe",
    secondaryKeywords: ["PE irrigation pipe", "agricultural HDPE pipe", "irrigation piping systems"],
    overview:
      "In agriculture, HDPE forms the pressurised mains between the well, pump station and field irrigation network. Bukan Pipe lists pressurised irrigation among the primary applications for its polyethylene pipe production.",
    advantages: [
      "Handles pump cycling and field pressure variation",
      "Flexible routing across farm terrain",
      "Faster repair and extension than rigid alternatives",
      "Corrosion resistance to irrigation water chemistry",
    ],
    applications: [
      "Pressurised irrigation feeder mains",
      "Water transfer from borehole to storage and field header",
      "Supply lines to drip, sprinkler and micro-irrigation zones",
    ],
    standardsNote:
      "For subsurface irrigation design, see the Technical Center article and consult project engineering.",
    qualityNote: "Pressure and dimensional testing in QC.",
    relatedProducts: ["water-supply-pipe"],
    relatedApplications: ["agriculture-irrigation"],
    relatedArticles: ["subsurface-drip-irrigation"],
    faqs: [],
  }),
  buildEnProduct({
    id: "product-pe100-pipe",
    slug: "pe100-pipe",
    title: "PE100 Pipe",
    seoTitle: "PE100 Pipe | PE100 HDPE Pressure Pipe | Bukan Pipe",
    seoDescription:
      "PE100 HDPE pipe for higher-pressure design in the same SDR — material grade specifications and project quotes.",
    description: "PE100 polyethylene pipe with higher MRS for higher-pressure design.",
    primaryKeyword: "PE100 pipe",
    secondaryKeywords: ["PE100 HDPE pipe", "PE100 pressure pipe", "PE100 water pipe"],
    overview:
      "PE100 is a higher MRS grade than PE80: at the same SDR it allows thinner walls or higher pressure rating. For PE100 specifications and project quotes, see the details on this page; for PN, SDR and temperature derating, see the Technical Center.",
    advantages: [
      "Higher MRS — smaller diameter or higher pressure in design",
      "Long-term underground performance in network applications",
      "Used with INSO 14427-2 for qualifying water supply production",
    ],
    applications: [
      "Higher-pressure water supply segments",
      "Industrial transfer where PE100 is specified",
      "Projects with explicit PE100 material requirements",
    ],
    standardsNote:
      "PE100 resists internal pressure; external vacuum or collapse requires air valves, anchoring and line design — see Technical Center.",
    qualityNote: "Mechanical and thermal tests per laboratory scope.",
    relatedProducts: ["water-supply-pipe", "gas-pipe"],
    relatedApplications: ["water-transfer", "industrial"],
    relatedArticles: ["polyethylene-pipe-temperature-pressure", "air-vent-valve"],
    faqs: [
      {
        question: "Should PE100 always replace PE80?",
        answer:
          "Material grade follows the project specification, pressure, temperature and engineer's design — not a universal substitution.",
      },
    ],
  }),
] as const;
