import type { SeoProductSeed } from "@/lib/content/seo-content-model";
import {
  baseProductSpecRows,
  seoLandingPaths,
  seoProductHeroImages,
} from "@/lib/content/seo-content-model";

export const enSeoProductSeeds: readonly SeoProductSeed[] = [
  {
    id: "product-water-supply-pipe",
    slug: "water-supply-pipe",
    title: "Water HDPE Pipes",
    seoTitle: "Water HDPE Pipes | PE100 Water Supply Pipe 16–630 mm | Bukan Pipe",
    seoDescription:
      "Water HDPE pipes for potable and raw water networks: single-wall PE100 from 16 mm to 630 mm, pressure rating 2.5 to 25 bar. INSO 14427-2 for qualifying projects.",
    description:
      "HDPE water pipes for municipal, rural and industrial water transfer — smooth bore, fusion-friendly and corrosion-free in soil.",
    primaryKeyword: "water HDPE pipes",
    secondaryKeywords: ["HDPE water pipe", "PE100 water pipe", "polyethylene water supply pipe"],
    definition:
      "Water HDPE pipes are single-wall high-density polyethylene (PE) pressure pipes used to convey potable, raw and treated water in buried or exposed networks.",
    overview:
      "Bukan Pipe manufactures water HDPE pipes from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR). For qualifying water projects, production follows INSO 14427-2 with PN marked on the pipe body at 20 °C reference temperature.",
    specifications: baseProductSpecRows("en", [
      { label: "Material grade", value: "PE100 / PE80 per project specification" },
      { label: "Pressure marking", value: "PN at 20 °C (apply temperature derating on site)" },
      { label: "Typical standard", value: "INSO 14427-2 for qualifying water supply production" },
      { label: "Jointing", value: "Butt fusion and electrofusion (project-specific)" },
    ]),
    specNote:
      "A sample of the catalogue dimension table follows; the full diameter, SDR and wall thickness chart is published in the technical centre.",
    advantages: [
      "Corrosion-free service life in buried installations",
      "Smooth internal surface supports hydraulic design",
      "Faster field installation than metallic pipe with butt fusion",
      "Lower handling weight for rural and urban projects",
    ],
    applications: [
      "Municipal and rural potable water networks",
      "Raw, treated and pressurised agricultural water mains",
      "Industrial water transfer and process feed lines",
    ],
    standardsNote:
      "PN marked on the pipe applies at 20 °C. At higher fluid or ambient temperatures, apply temperature derating — see the MOP article in Technical Center.",
    qualityNote:
      "Incoming material control, in-line dimensional checks and laboratory mechanical tests support production QC.",
    relatedProducts: ["pe100-pipe", "irrigation-pipe", "industrial-pipe"],
    relatedApplications: ["water-transfer"],
    relatedArticles: [
      "pe100-technical-guide",
      "hdpe-installation-guide",
      "polyethylene-pipe-temperature-pressure",
      "air-vent-valve",
    ],
    extraSections: [
      {
        type: "heading",
        level: 2,
        text: "Catalogue dimensions — sample",
      },
      {
        type: "dimension-excerpt",
        table: "water-supply",
        sizes: [63, 110, 160, 250, 400, 630],
      },
    ],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "PE100 Technical Guide", path: seoLandingPaths.pe100Guide, hint: "MRS, SDR and PN" },
      { label: "HDPE Installation Guide", path: seoLandingPaths.installGuide },
      { label: "Water transfer applications", path: "/applications/water-transfer" },
      { label: "Temperature & MOP derating", path: seoLandingPaths.temperature },
    ],
    references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/temp-cooficient/"],
    faqs: [
      {
        question: "Is PN on the pipe the same as operating pressure on site?",
        answer:
          "No. PN is defined at 20 °C reference. Maximum operating pressure (MOP) must include temperature and service factors from the project engineer.",
      },
      {
        question: "What size and pressure range do Bukan Pipe water HDPE pipes cover?",
        answer: "Single-wall HDPE water pipe is manufactured from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR).",
      },
    ],
    heroImage: seoProductHeroImages.water,
  },
  {
    id: "product-gas-pipe",
    slug: "gas-pipe",
    title: "Gas HDPE Pipes",
    seoTitle: "Gas HDPE Pipes | PE100 Gas Distribution Pipe | Bukan Pipe",
    seoDescription:
      "Gas HDPE pipes for municipal and rural gas distribution. Manufactured to EN 1555, INSO 11223 and IGS-M-PL-014-1 where applicable to the project.",
    description:
      "Single-wall polyethylene gas pipes for service connections and distribution — corrosion-resistant and suited to fusion joints.",
    primaryKeyword: "gas HDPE pipes",
    secondaryKeywords: ["HDPE gas pipe", "PE100 gas pipe", "polyethylene gas distribution pipe"],
    definition:
      "Gas HDPE pipes are polyethylene pressure pipes designed for low and medium-pressure natural gas distribution and service connections, joined primarily by electrofusion in Iran.",
    overview:
      "Main transmission lines in gas networks are often steel. Gas HDPE pipes are widely used for urban and rural service connections and distribution branches. Bukan Pipe manufactures gas HDPE pipes aligned with EN 1555, INSO 11223 and National Iranian Gas Company reference IGS-M-PL-014-1 for qualifying projects.",
    specifications: baseProductSpecRows("en", [
      { label: "Material grade", value: "PE100 / PE80 per gas utility specification" },
      { label: "Typical standards", value: "EN 1555, INSO 11223, IGS-M-PL-014-1 (project-specific)" },
      { label: "Approved jointing (Iran)", value: "Electrofusion for gas distribution networks" },
      { label: "Service", value: "Low and medium-pressure distribution and service lines" },
    ]),
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
      "Pressure class, SDR and joint type must follow the project specification, engineering drawing and gas utility requirements.",
    qualityNote:
      "Production QC and relevant mechanical tests are performed in-line and in the laboratory. See the Laboratory section for test scope.",
    relatedProducts: ["pe100-pipe", "water-supply-pipe"],
    relatedApplications: ["gas-distribution"],
    relatedArticles: ["hdpe-installation-guide", "polyethylene-pipe-welding", "polyethylene-pipe-temperature-pressure"],
    extraSections: [
      {
        type: "heading",
        level: 2,
        text: "Catalogue dimensions — sample",
      },
      {
        type: "dimension-excerpt",
        table: "gas-supply",
        sizes: [63, 90, 110, 160, 225],
      },
    ],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "HDPE Installation Guide", path: seoLandingPaths.installGuide },
      { label: "HDPE pipe welding guide", path: seoLandingPaths.welding },
      { label: "Gas distribution applications", path: "/applications/gas-distribution" },
      { label: "HDPE gas pipe guide", path: "/technical-center/gas-polyethylene-pipe-guide" },
      { label: "PE100 Technical Guide", path: seoLandingPaths.pe100Guide },
    ],
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
    heroImage: seoProductHeroImages.gas,
  },
  {
    id: "product-irrigation-pipe",
    slug: "irrigation-pipe",
    title: "Irrigation HDPE Pipes",
    seoTitle: "Irrigation HDPE Pipes | Agricultural PE Water Mains | Bukan Pipe",
    seoDescription:
      "Irrigation HDPE pipes for pressurised farm mains and water transfer to drip, sprinkler and feeder networks.",
    description: "HDPE pipes for pressurised agricultural water mains and field irrigation networks.",
    primaryKeyword: "irrigation HDPE pipes",
    secondaryKeywords: ["HDPE irrigation pipe", "agricultural PE pipe", "farm water mains"],
    definition:
      "Irrigation HDPE pipes are polyethylene pressure pipes that form the pressurised mains between water sources, pumps and field irrigation systems including drip and sprinkler zones.",
    overview:
      "In agriculture, HDPE forms the pressurised mains between the well, pump station and field irrigation network. Bukan Pipe lists pressurised irrigation among the primary applications for its polyethylene pipe production from 16 mm to 630 mm, pressure rating 2.5 to 25 bar.",
    specifications: baseProductSpecRows("en", [
      { label: "Typical service", value: "Pressurised irrigation feeder mains" },
      { label: "Pressure class", value: "PN per hydraulic design and pump duty" },
      { label: "Jointing", value: "Butt fusion for mains; electrofusion where specified" },
    ]),
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
    relatedArticles: ["subsurface-drip-irrigation", "hdpe-installation-guide"],
    extraSections: [
      {
        type: "heading",
        level: 2,
        text: "Catalogue dimensions — sample",
      },
      {
        type: "dimension-excerpt",
        table: "drip-irrigation",
        sizes: [16, 20, 25, 32],
      },
    ],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "Agriculture & irrigation applications", path: "/applications/agriculture-irrigation" },
      { label: "Water HDPE Pipes", path: seoLandingPaths.water },
      { label: "HDPE Installation Guide", path: seoLandingPaths.installGuide },
      { label: "Subsurface drip irrigation", path: "/technical-center/subsurface-drip-irrigation" },
    ],
    faqs: [
      {
        question: "Can the same HDPE pipe serve irrigation and potable water?",
        answer:
          "Material and production standard follow the project specification. Potable networks may require INSO 14427-2 production — confirm with sales for your application.",
      },
    ],
    heroImage: seoProductHeroImages.irrigation,
  },
  {
    id: "product-industrial-pipe",
    slug: "industrial-pipe",
    title: "Industrial HDPE Pipes",
    seoTitle: "Industrial HDPE Pipes | Process & Chemical Transfer | Bukan Pipe",
    seoDescription:
      "Industrial HDPE pipes for process water, slurry and chemical transfer networks. PE100 grade, fusion joints and corrosion resistance for plant and mine projects.",
    description:
      "HDPE pipes for industrial process fluid transfer, cooling water and abrasive slurry lines where polyethylene is specified.",
    primaryKeyword: "industrial HDPE pipes",
    secondaryKeywords: ["HDPE process pipe", "PE100 industrial pipe", "polyethylene chemical transfer"],
    definition:
      "Industrial HDPE pipes are polyethylene pressure or gravity lines used in factories, mines and utilities to convey process water, cooling water, slurries and compatible chemicals where PE is specified by the engineer.",
    overview:
      "HDPE is selected in industrial projects for chemical resistance, joint integrity and durability in corrosive soil. Bukan Pipe supplies industrial HDPE pipes in PE100 and other grades per project specification, with production from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR).",
    specifications: baseProductSpecRows("en", [
      { label: "Material grade", value: "PE100 / PE80 per process specification" },
      { label: "Chemical compatibility", value: "Project-specific — confirm fluid and concentration with engineer" },
      { label: "Jointing", value: "Butt fusion; electrofusion where access requires" },
      { label: "Typical uses", value: "Process water, cooling, slurry, industrial effluent transfer" },
    ]),
    advantages: [
      "Corrosion resistance in aggressive soil and many industrial fluids",
      "Fusion joints reduce leakage in long transfer runs",
      "Abrasion resistance for slurry and mining applications",
      "Lighter handling than steel on remote industrial sites",
    ],
    applications: [
      "Process and cooling water lines in factories",
      "Mining and mineral slurry transfer where PE is approved",
      "Industrial effluent and compatible chemical transfer networks",
      "Temporary bypass and plant expansion mains",
    ],
    standardsNote:
      "Fluid compatibility, pressure, temperature and anchoring must follow the process engineer's specification — not all chemicals are suitable for PE.",
    qualityNote: "Mechanical and dimensional QC aligned with other PE pipe families. Laboratory scope available on request.",
    relatedProducts: ["pe100-pipe", "water-supply-pipe"],
    relatedApplications: ["industrial"],
    relatedArticles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe-temperature-pressure"],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "Industrial applications", path: "/applications/industrial" },
      { label: "PE100 Technical Guide", path: seoLandingPaths.pe100Guide },
      { label: "Water HDPE Pipes", path: seoLandingPaths.water },
      { label: "HDPE Installation Guide", path: seoLandingPaths.installGuide },
    ],
    faqs: [
      {
        question: "Is HDPE suitable for all industrial chemicals?",
        answer:
          "No. Chemical compatibility depends on concentration, temperature and exposure time. The process engineer must confirm suitability for each fluid.",
      },
      {
        question: "When should PE100 be specified for industrial lines?",
        answer:
          "When higher MRS allows thinner wall or higher pressure at the same SDR — follow the project material specification.",
      },
    ],
    heroImage: seoProductHeroImages.industrial,
  },
  {
    id: "product-pe100-pipe",
    slug: "pe100-pipe",
    title: "PE100 HDPE Pipes",
    seoTitle: "PE100 HDPE Pipes | Higher MRS Pressure Pipe | Bukan Pipe",
    seoDescription:
      "PE100 HDPE pipes for higher-pressure design in the same SDR. Material grade guide, applications and project quotes from Bukan Pipe.",
    description: "PE100 polyethylene pipe with higher MRS for higher-pressure or thinner-wall design.",
    primaryKeyword: "PE100 HDPE pipes",
    secondaryKeywords: ["PE100 pipe", "PE100 HDPE pipe", "PE100 pressure pipe"],
    definition:
      "PE100 HDPE pipes use polyethylene compound with Minimum Required Strength (MRS) of 10 MPa — allowing higher pressure rating or thinner walls than PE80 at the same SDR.",
    overview:
      "PE100 is a higher MRS grade than PE80: at the same SDR it allows thinner walls or higher pressure rating. Bukan Pipe produces PE100 HDPE pipes for water, gas and industrial networks where the grade is specified.",
    specifications: baseProductSpecRows("en", [
      { label: "MRS", value: "10 MPa (PE100 designation)" },
      { label: "Design benefit", value: "Higher PN or reduced wall thickness vs PE80 at same SDR" },
      { label: "Typical standards", value: "INSO 14427-2 (water), EN 1555 / INSO 11223 (gas) — project-specific" },
    ]),
    advantages: [
      "Higher MRS — smaller diameter or higher pressure in design",
      "Long-term underground performance in network applications",
      "Used with INSO 14427-2 for qualifying water supply production",
    ],
    applications: [
      "Higher-pressure water supply segments",
      "Industrial transfer where PE100 is specified",
      "Gas distribution where utility specification requires PE100",
    ],
    standardsNote:
      "PE100 resists internal pressure; external vacuum or collapse requires air valves, anchoring and line design — see Technical Center.",
    qualityNote: "Mechanical and thermal tests per laboratory scope.",
    relatedProducts: ["water-supply-pipe", "gas-pipe", "industrial-pipe"],
    relatedApplications: ["water-transfer", "industrial", "gas-distribution"],
    relatedArticles: ["pe100-technical-guide", "polyethylene-pipe-temperature-pressure", "air-vent-valve"],
    extraSections: [
      {
        type: "heading",
        level: 2,
        text: "Catalogue dimensions — sample",
      },
      {
        type: "dimension-excerpt",
        table: "water-supply",
        sizes: [110, 160, 250, 400, 630],
      },
    ],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "PE100 Technical Guide", path: seoLandingPaths.pe100Guide },
      { label: "HDPE Pipe Guide (pillar)", path: seoLandingPaths.pillar },
      { label: "Water HDPE Pipes", path: seoLandingPaths.water },
      { label: "Gas HDPE Pipes", path: seoLandingPaths.gas },
    ],
    faqs: [
      {
        question: "Should PE100 always replace PE80?",
        answer:
          "Material grade follows the project specification, pressure, temperature and engineer's design — not a universal substitution.",
      },
    ],
    heroImage: seoProductHeroImages.pe100,
  },
  {
    id: "product-sewage-pipe",
    slug: "sewage-pipe",
    title: "HDPE Sewer Pipe",
    seoTitle: "HDPE Sewer Pipe | Polyethylene Wastewater Pipe | Bukan Pipe",
    seoDescription:
      "HDPE sewer pipe for sanitary sewer collection and transfer. Chemical resistance and fusion joints for buried wastewater networks.",
    description: "Polyethylene pipe for municipal and industrial wastewater collection systems.",
    primaryKeyword: "HDPE sewer pipe",
    secondaryKeywords: ["PE sewer pipe", "polyethylene sewer pipe", "HDPE wastewater pipe"],
    definition:
      "HDPE sewer pipes are polyethylene pipes used in gravity or low-pressure sanitary sewer collection systems where chemical resistance and durable joints are required.",
    overview:
      "HDPE is a common choice for wastewater collection because of chemical resistance, joint integrity and durability in wet soil. Bukan Pipe supplies polyethylene sewer pipes for municipal and industrial wastewater networks.",
    specifications: baseProductSpecRows("en", [
      { label: "Service", value: "Sanitary sewer collection and transfer" },
      { label: "Jointing", value: "Butt fusion; electrofusion where specified" },
    ]),
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
    standardsNote: "Pressure class, SDR and line gradient must follow the sewer design and project specification.",
    qualityNote: "Dimensional, mechanical and pressure-related tests per factory QC scope.",
    extraSections: [
      { type: "heading", level: 2, text: "What the catalogue lists for sewerage" },
      {
        type: "paragraph",
        text: "The consumption column of the catalogue packing table marks its first three rows as water supply AND sewerage: SDR 41 at 3.2 atm, SDR 33 at 4 and SDR 26 at 5. The first two run 315 to 630 mm and the third from 50 to 630 mm, all supplied as 12 m branches. Sewer pipe is the same polyethylene pressure pipe in a lighter wall, not a separate product.",
      },
      { type: "dimension-table", table: "supply-form-sewerage" },
      { type: "heading", level: 2, text: "Gravity network or pumped main?" },
      {
        type: "paragraph",
        text: "Most sewer networks are gravity: flow follows the gradient and the pipe carries little internal pressure, which is why the light-wall SDRs are the ones listed. A rising main downstream of a pumping station is a genuine pressure line and has to be selected from its design pressure like a water main.",
      },
      { type: "heading", level: 2, text: "The thing that gets confused: SDR is not SN" },
      {
        type: "paragraph",
        text: "SDR is the diameter-to-wall-thickness ratio and describes internal pressure capability. SN is ring stiffness and describes resistance to soil and traffic load. In a buried gravity sewer the threat is deflection under load, not internal pressure. The catalogue publishes SDR and states no SN class, so if the project specification calls for one, confirm it with the technical department before ordering. Bedding and compaction around the pipe matter as much as wall thickness in controlling deflection.",
      },
    ],
    relatedProducts: ["drainage-pipe", "water-supply-pipe"],
    relatedApplications: ["sewage"],
    relatedArticles: ["hdpe-installation-guide"],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "Sewage applications", path: "/applications/sewage" },
      { label: "HDPE Installation Guide", path: seoLandingPaths.installGuide },
      { label: "HDPE Drainage Pipe", path: "/products/drainage-pipe" },
    ],
    faqs: [
      {
        question: "What SDR is HDPE sewer pipe?",
        answer:
          "The Bukan Pipe catalogue lists SDR 41, 33 and 26 for water supply and sewerage. Which of the three applies depends on the network: a gravity sewer needs only a light wall, while a pumped rising main must be selected from its design pressure.",
      },
      {
        question: "What diameters are available for HDPE sewer pipe?",
        answer:
          "From the catalogue packing table, SDR 41 and 33 run 315 to 630 mm and SDR 26 runs 50 to 630 mm. All three are supplied as 12 m branches.",
      },
      {
        question: "What is the difference between SDR and SN for sewer pipe?",
        answer:
          "SDR is the ratio of outer diameter to wall thickness and relates to internal pressure. SN is ring stiffness and relates to soil and traffic load on a buried pipe. Ring stiffness is the governing property in a gravity sewer. The catalogue publishes SDR and states no SN class, so confirm before ordering if your specification calls for one.",
      },
      {
        question: "How is HDPE sewer pipe jointed?",
        answer:
          "Butt fusion and electrofusion. A fused joint has a clear advantage in wastewater: there is no leak path, so neither does sewage escape to ground nor groundwater infiltrate the network.",
      },
      {
        question: "Can HDPE be used for industrial effluent?",
        answer:
          "It depends on the chemistry, concentration and temperature of the effluent. Polyethylene resists a wide range of substances, but compatibility has to be confirmed for that specific effluent. Send the effluent analysis with your enquiry.",
      },
    ],
    heroImage: seoProductHeroImages.sewer,
  },
  {
    id: "product-drainage-pipe",
    slug: "drainage-pipe",
    title: "HDPE Drainage Pipe",
    seoTitle: "HDPE Drainage Pipe | Polyethylene Surface Drainage | Bukan Pipe",
    seoDescription:
      "HDPE drainage pipe for stormwater, surface runoff and complementary civil networks — for surface water, not sanitary sewage.",
    description: "Polyethylene pipe for surface water and subsurface drainage.",
    primaryKeyword: "HDPE drainage pipe",
    secondaryKeywords: ["PE drainage pipe", "polyethylene drainage pipe", "stormwater HDPE pipe"],
    definition:
      "HDPE drainage pipes convey stormwater, surface runoff and subsurface drainage — distinct from sanitary sewer service.",
    overview:
      "Drainage addresses surface runoff, infiltration and complementary civil flows — not sanitary sewage. HDPE offers hydraulic capacity, flexibility and soil durability for these networks.",
    specifications: baseProductSpecRows("en", [
      { label: "Service", value: "Stormwater and surface drainage" },
      { label: "Installation", value: "Buried or exposed per civil design" },
    ]),
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
    extraSections: [
      { type: "heading", level: 2, text: "Drainage is not sewerage" },
      {
        type: "paragraph",
        text: "The two get conflated in enquiries and the wrong product follows. Sanitary sewage is a continuous organic-loaded flow bound for treatment. Drainage is intermittent, driven by rainfall, and usually discharges to surface water. Pollution load, flow pattern and discharge point all differ, so the design diameter differs too.",
      },
      { type: "heading", level: 2, text: "Sizing a drainage line" },
      {
        type: "paragraph",
        text: "Unlike a water main, which starts from design pressure, drainage starts from peak flow: design rainfall intensity times catchment area times runoff coefficient. That gives a flow rate, and the diameter follows from hydraulic capacity at the available gradient. Because the line is gravity-driven and carries little internal pressure, a heavy wall is not what matters — resistance to soil and traffic load on the buried pipe is.",
      },
      { type: "heading", level: 2, text: "Supply form in the catalogue" },
      {
        type: "paragraph",
        text: "The catalogue marks its consumption column for water supply and sewerage and carries no separate drainage row. Drainage pipe is supplied from the same production range; the table below shows which diameters each SDR covers and whether it ships as a coil or a 12 m branch. Confirm availability of your diameter and SDR combination with sales before ordering.",
      },
      { type: "dimension-table", table: "supply-form" },
    ],
    relatedProducts: ["sewage-pipe", "water-supply-pipe"],
    relatedApplications: ["drainage"],
    relatedArticles: [],
    curatedLinks: [
      { label: "Complete polyethylene pipe guide", path: "/technical-center/polyethylene-pipe-complete-guide" },
      { label: "Drainage applications", path: "/applications/drainage" },
      { label: "HDPE Sewer Pipe", path: "/products/sewage-pipe" },
    ],
    faqs: [
      {
        question: "What is the difference between drainage pipe and sewer pipe?",
        answer:
          "Drainage carries stormwater and surface runoff — intermittent flow that usually discharges to surface water. Sanitary sewer carries continuous organic-loaded flow to treatment. The flow pattern and discharge point differ, so the design diameter differs.",
      },
      {
        question: "How is drainage pipe diameter selected?",
        answer:
          "From peak runoff: design rainfall intensity, catchment area and runoff coefficient. The diameter then follows from hydraulic capacity at the available gradient. Use the pipeline design calculator for a first pass and have the result confirmed by the design engineer.",
      },
      {
        question: "What diameters of HDPE drainage pipe are available?",
        answer:
          "The catalogue has no separate drainage row; drainage pipe comes from the same production range. The supply form table on this page shows the diameter band and packing for each SDR. Confirm your combination with sales before ordering.",
      },
      {
        question: "What SDR does drainage pipe need?",
        answer:
          "A gravity drainage line carries little internal pressure, so a heavy wall is not required. What governs a buried pipe is soil and traffic load, and the quality of bedding and compaction around it. If your specification calls for a stiffness class, confirm before ordering.",
      },
    ],
    heroImage: seoProductHeroImages.drainage,
  },
];
