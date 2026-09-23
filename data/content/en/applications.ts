import type { ContentBlock, ContentDocument } from "@/content/models/content-document";

function app(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  primaryKeyword: string,
  secondaryKeywords: readonly string[],
  overview: string,
  bullets: readonly string[],
  relatedProducts: readonly string[],
  relatedArticles?: readonly string[],
  body: readonly ContentBlock[] = [],
  faqs: ContentDocument["faqs"] = undefined,
): ContentDocument {
  return {
    id: `application-${slug}`,
    slug,
    path: `/applications/${slug}`,
    locale: "en",
    kind: "application",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword,
    secondaryKeywords,
    status: "published",
    evidenceStatus: "candidate",
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Applications", path: "/applications" },
      { label: title, path: `/applications/${slug}` },
    ],
    sections: [
      { type: "paragraph", text: overview },
      ...body,
      { type: "heading", level: 2, text: "Design considerations" },
      { type: "list", items: bullets },
    ],
    faqs,
    related: {
      products: relatedProducts,
      articles: relatedArticles,
    },
  };
}

export const enApplications: readonly ContentDocument[] = [
  app(
    "water-transfer",
    "Water Transfer Systems",
    "HDPE Pipe for Water Transfer | Bukan Pipe",
    "HDPE water transfer for municipal, rural and industrial mains — sizing diameter and SDR, and links to the product page and catalogue dimensions chart.",
    "PE pipe in water transfer networks",
    "HDPE water transfer",
    ["water supply HDPE pipe", "PE100 water pipe"],
    "Water transfer is a primary factory application — from municipal supply to industrial raw-water lines. This guide covers engineering considerations; pipe specifications and quotes are on the HDPE water pipe product page.",
    [
      "Operating pressure and SDR aligned with hydraulic design",
      "Fusion joints and leak control on long runs",
      "Air release valves on profiles with elevation change",
      "Temperature derating for exposed or high-temperature service",
    ],
    ["water-supply-pipe", "pe100-pipe"],
    ["air-vent-valve", "polyethylene-pipe-temperature-pressure"],
    [
      { type: "heading", level: 2, text: "Where PE sits in a water network" },
      {
        type: "paragraph",
        text: "In potable water systems, polyethylene pipe serves both the transmission main from source or reservoir to the town inlet and the distribution network down to the service connection. The governing product standard in Iran is INSO 14427-2, which fixes material, dimensions and the potable-contact requirements. That hygiene requirement is what separates a drinking water line from a raw water line — not anything visible about the pipe.",
      },
      { type: "heading", level: 2, text: "Diameter comes from flow; pressure class comes from the hydraulic grade line" },
      {
        type: "paragraph",
        text: "These are independent choices, and swapping them is the most common ordering mistake. Diameter follows from design flow and permissible velocity — roughly 0.5 to 2.5 m/s. Below that band suspended solids settle out; above it head loss, pumping energy and surge risk all climb. Pressure class, by contrast, comes from the maximum static head at the lowest point on the line plus a surge allowance — not from the pump's normal discharge pressure.",
      },
      {
        type: "paragraph",
        text: "If the line runs above 20 °C — laid on the surface, in direct sun, or carrying warm water — the PN figure has to be derated and the design basis becomes MOP, not the PN printed on the pipe.",
      },
      { type: "heading", level: 2, text: "Which joint, where" },
      {
        type: "list",
        items: [
          "Butt fusion: the primary method on transmission mains in medium and large diameters, with qualified equipment and an approved procedure",
          "Electrofusion: where there is no room for a butt machine — repairs, saddle branches, joints made in an open trench",
          "Flange and stub end: at valves, pump houses and anywhere the line must be opened later",
          "Mechanical couplers: mainly small diameters in the distribution network and service connections",
        ],
      },
      { type: "heading", level: 2, text: "Thrust blocks: the part that is specific to a fused line" },
      {
        type: "paragraph",
        text: "In steel or ductile iron pipe with mechanical joints, every bend and tee needs a concrete thrust block so that the unbalanced force does not pull the joint apart. A fully fused PE line is one continuous, end-restrained element, and that force is carried in the wall instead. But the exemption applies only to the fused portion: wherever a flanged or mechanical joint enters — a valve, a pump, a transition to metallic pipe — restraint has to be designed.",
      },
      { type: "heading", level: 2, text: "Handover: the pressure test" },
      {
        type: "paragraph",
        text: "The line is hydrostatically tested before commissioning. The part specific to polyethylene is that the pipe expands slightly under pressure — it is viscoelastic — so a pressure drop in the first minutes of the test does not by itself mean a leak. PE test procedures therefore include an initial relaxation phase, and the test has to follow the project procedure rather than the acceptance criteria used for metallic pipe.",
      },
    ],
    [
      {
        question: "PE80 or PE100 for a water main?",
        answer:
          "PE100 on new projects, almost always. Its higher MRS means a thinner wall for the same working pressure, so at a given outside diameter you get a larger bore and more capacity. PE80 survives mainly in small diameters and lighter duties.",
      },
      {
        question: "Should I order by PN or by SDR?",
        answer:
          "They express the same thing, but SDR is unambiguous: it is the ratio of outside diameter to wall thickness. PN is the corresponding working pressure at 20 °C for a given material grade, so it shifts when the grade changes. Quote outside diameter, SDR and grade together.",
      },
      {
        question: "Is polyethylene pipe safe for drinking water?",
        answer:
          "Pipe produced to INSO 14427-2 for potable water meets the contact requirements for drinking water. Pipe made for raw water, irrigation or industrial duty should not be used in a potable network.",
      },
      {
        question: "How deep should a water main be buried?",
        answer:
          "Depth is set by the project specification and three factors: local frost depth, traffic loading and clashes with other services. Polyethylene imposes no fixed figure of its own; what matters is the quality of the bedding and the surround.",
      },
    ],
  ),
  app(
    "agriculture-irrigation",
    "Agricultural Irrigation",
    "HDPE Pipe for Agricultural Irrigation | Bukan Pipe",
    "HDPE agricultural irrigation mains and feeder lines for drip, sprinkler and field networks — sizing from flow rate, with links to the irrigation product.",
    "PE pipe in farm irrigation",
    "HDPE agricultural irrigation",
    ["irrigation piping systems", "agricultural HDPE pipe"],
    "On farms, HDPE forms pressurised mains between the water source, pump station and field irrigation network — drip, sprinkler or subsurface zones. Product selection and pressure class follow the irrigation design.",
    [
      "Pump cycling and transient pressure",
      "Flexible routing across terrain",
      "Filtration and control valves upstream of emitters",
      "UV exposure limits for above-ground runs per project spec",
    ],
    ["irrigation-pipe", "water-supply-pipe"],
    ["subsurface-drip-irrigation"],
    [
      { type: "heading", level: 2, text: "Three levels, three different pipes" },
      {
        type: "paragraph",
        text: "A pressurised irrigation system has three layers, and confusing them leads to the wrong order. The main line runs from the well or reservoir to the control station, carrying the highest flow and pressure. The submain or manifold distributes between field blocks. The lateral is the emitter line itself, working at a far lower pressure. Pressure-rated polyethylene pipe covers the first two levels; the third is a separate product.",
      },
      { type: "heading", level: 2, text: "The design criterion that usually gets skipped: uniformity" },
      {
        type: "paragraph",
        text: "The aim is not simply to deliver water but to deliver it evenly. If head loss along a block is too great, emitters at the head of the run discharge more than those at the tail and the crop grows unevenly. The conventional criterion is that pressure variation within an irrigation block should stay within about 20 per cent of emitter operating pressure. Meeting it usually pushes diameter one size above what flow alone would have selected.",
      },
      { type: "heading", level: 2, text: "Size on the pump's shut-off head, not its duty point" },
      {
        type: "paragraph",
        text: "Field mains run on well or submersible pumps that start and stop frequently, so the line sees pressure cycling. Pressure class should be selected against the pump's maximum head with the valve closed, plus a surge allowance. Selecting PN from the ordinary working pressure is exactly what produces burst fittings in mid-summer.",
      },
      { type: "heading", level: 2, text: "Surface-laid lines and sunlight" },
      {
        type: "paragraph",
        text: "Part of a field system is temporary and laid on the ground. Black polyethylene is UV-protected by the carbon black in its compound, but two things remain true: the pipe wall in direct sun runs hotter than ambient air, so the pressure class needs the temperature derating factor applied; and a surface line moves as it heats and cools each day, so it needs either freedom to move longitudinally or proper restraint.",
      },
      { type: "heading", level: 2, text: "Filtration decides how long the system lasts" },
      {
        type: "paragraph",
        text: "The polyethylene pipe itself is untroubled by well water full of particles; the emitters at the end of the network are not. The filtration station at the head — screen, disc or sand depending on the source — together with the ability to flush line ends, is what determines the working life of the system.",
      },
    ],
    [
      {
        question: "What pressure class should a farm main be?",
        answer:
          "Select against the pump's maximum head at shut-off rather than the normal working pressure. PN6 and PN10 are the common classes on field systems; long runs, high lift or a deep well push it higher. The final figure comes from the hydraulic calculation.",
      },
      {
        question: "How do I size an irrigation pipe?",
        answer:
          "Start from design flow and pick a diameter that keeps velocity in range, then check total head loss across the block. If pressure varies by more than roughly 20 per cent of emitter pressure from head to tail, go up a size. The pipeline design calculator covers this first estimate.",
      },
      {
        question: "Is black pipe better than coloured pipe?",
        answer:
          "For mains and surface-laid lines, yes. The carbon black in the compound is what protects the pipe against UV. Coloured stripes only identify the application and add no mechanical property.",
      },
      {
        question: "Can I use the same pipe for irrigation and drinking water?",
        answer:
          "Not unless it was produced for potable water to INSO 14427-2. The reverse — using potable-grade pipe for irrigation — is technically fine but usually more expensive than the project needs.",
      },
    ],
  ),
  app(
    "gas-distribution",
    "Gas Distribution Networks",
    "HDPE Pipe for Gas Distribution | Bukan Pipe",
    "Gas distribution PE pipe for urban and rural service branches off steel transmission mains — electrofusion jointing, SDR class and catalogue dimensions.",
    "PE in gas distribution",
    "gas distribution PE pipe",
    ["HDPE pipe for gas networks", "polyethylene gas pipe"],
    "Polyethylene pipe serves urban and rural service connections and distribution branches from steel transmission lines. Electrofusion is the approved jointing method for gas in Iran. For pipe specifications and supply, see the HDPE gas pipe product page.",
    [
      "Utility requirements and IGS references where applicable",
      "Electrofusion qualification and inspection",
      "Line testing and commissioning per project",
    ],
    ["gas-pipe"],
    ["polyethylene-pipe-welding"],
    [
      { type: "heading", level: 2, text: "Which part of a gas network is polyethylene" },
      {
        type: "paragraph",
        text: "In gas systems, polyethylene does the distribution and service work — from the pressure reduction station onward, to the customer's service valve. High-pressure transmission remains steel. The governing product standard in Iran is INSO 11233-2, and the yellow body or yellow stripe is a convention so that a later excavation distinguishes the gas line from the water line at a glance.",
      },
      { type: "heading", level: 2, text: "Why electrofusion is the accepted method" },
      {
        type: "paragraph",
        text: "In a gas network the acceptance criterion for a joint is different from water: a small leak on a water line is lost volume, on a gas line it is a hazard. Electrofusion is the accepted method because the welding parameters are encoded in the fitting itself and read by the machine — the operator's judgement about temperature and time is removed, and the weld record can be logged and audited. Butt fusion is used in gas only within an approved procedure, with a qualified welder and the client's agreement.",
      },
      {
        type: "paragraph",
        text: "Two steps in electrofusion cannot be skipped: scraping the oxide layer off the pipe surface immediately before the fitting is placed, and leaving the assembly undisturbed for the full cooling time. Most welds that look sound and later leak were missing one of the two.",
      },
      { type: "heading", level: 2, text: "Branching off steel: the transition fitting" },
      {
        type: "paragraph",
        text: "Polyethylene cannot be welded to steel. The junction is made with a transition fitting — a factory-made component with a fusible PE end and a steel end, sealed in the factory. It must not be fabricated or substituted on site.",
      },
      { type: "heading", level: 2, text: "Finding the line after it is buried" },
      {
        type: "paragraph",
        text: "Polyethylene is non-metallic, so a metal detector will not find it. A buried PE gas network without a tracer wire alongside the pipe and yellow warning tape above it is incomplete. Those two inexpensive components are what stops the line being cut by an excavator a few years later.",
      },
      { type: "heading", level: 2, text: "Approval and inspection" },
      {
        type: "paragraph",
        text: "In Iran the pipe and fittings, the welder and the welding machine are all subject to gas company approval and IGS specifications. Leak and strength testing before handover, and a record of the welds made, are part of delivering the line rather than optional extras.",
      },
    ],
    [
      {
        question: "Up to what pressure can PE gas pipe be used?",
        answer:
          "Its role is distribution and service connection, not high-pressure transmission. The maximum operating pressure is set by INSO 11233-2 and the gas company specification on the basis of SDR and material grade, and must be taken from the project documents.",
      },
      {
        question: "How does gas pipe differ from water pipe?",
        answer:
          "The base material is the same, but the standard, the quality control requirements, the marking and the jointing method differ. Water pipe cannot be used in a gas network even at identical diameter and SDR; the line must use pipe carrying gas approval and the corresponding marking.",
      },
      {
        question: "Why is gas pipe yellow?",
        answer:
          "It is an identification convention, so that a future excavation immediately distinguishes the gas main from water and sewer lines. The colour confers no additional technical property.",
      },
      {
        question: "Can a PE gas line be laid above ground?",
        answer:
          "No. PE gas networks are designed to be buried. Surface installation exposes the pipe to mechanical damage, UV and temperature cycling, and is not permitted under distribution network rules.",
      },
    ],
  ),
  app(
    "sewage",
    "Sewerage Systems",
    "HDPE Pipe for Sewerage | Bukan Pipe",
    "HDPE sewer application for municipal and industrial wastewater collection — gravity network versus pumped rising main, and SDR selection from the catalogue.",
    "PE in sewer networks",
    "HDPE sewer application",
    ["polyethylene sewer pipe", "wastewater HDPE pipe"],
    "Sewer networks need chemical resistance, grade control and long-term performance in wet soil. This guide focuses on use-case selection; the HDPE sewer pipe product page lists specifications for the sewer product line.",
    [
      "Chemical compatibility with wastewater",
      "Grade and self-cleansing velocity",
      "Fusion joints to limit infiltration/exfiltration points",
    ],
    ["sewage-pipe"],
    ["hdpe-installation-guide", "polyethylene-pipe-welding"],
    [
      { type: "heading", level: 2, text: "First decide whether the line is gravity or pressure" },
      {
        type: "paragraph",
        text: "This split changes the entire selection logic, and if it is not settled at the start the order comes out wrong. In a gravity sewer the flow moves on grade and the pipe carries essentially no internal pressure; what it has to withstand is soil and traffic load from outside, so the selection criterion is ring stiffness, not pressure class. In a pumped rising main the reverse is true: the pipe works under pressure and the criterion is the same PN and SDR used on water mains, with extra allowance for surge when the pump stops.",
      },
      { type: "heading", level: 2, text: "Gravity lines: grade and self-cleansing velocity" },
      {
        type: "paragraph",
        text: "Grade cannot simply be flattened to reduce excavation depth. If flow velocity falls below a certain value, solids settle out and the line silts up progressively. The conventional design criterion is to maintain a self-cleansing velocity of roughly 0.6 to 0.7 m/s at design flow. Excessive grade is not desirable either: it pulls the flow away from full-bore conditions and increases odour and corrosion in downstream structures.",
      },
      { type: "heading", level: 2, text: "What polyethylene actually solves here: corrosion and infiltration" },
      {
        type: "paragraph",
        text: "Two problems dog sewer networks. Hydrogen sulphide generated in stagnant sewage converts to acid at the pipe crown and attacks cementitious structures; polyethylene is inert to that mechanism, which is why it is so often chosen for rehabilitating deteriorated networks. The second is groundwater entering the network through joints, filling treatment capacity with water that should never have been there. In a fused PE line there is no joint to infiltrate through — the line is one continuous element.",
      },
      { type: "heading", level: 2, text: "Settlement and the connection to concrete structures" },
      {
        type: "paragraph",
        text: "Polyethylene is a flexible pipe: it works together with the soil around it, so bedding quality and side-fill compaction matter as much as the pipe itself. The sensitive point is where the pipe enters a manhole or concrete chamber. The structure does not settle and the pipe does, so that junction needs a sealing gasket and a flexible section to keep shear stress from concentrating at the pipe crown.",
      },
      { type: "heading", level: 2, text: "Chemical resistance in industrial effluent" },
      {
        type: "paragraph",
        text: "Polyethylene resists acids, alkalis, salts and domestic sewage. What needs checking is industrial effluent: aromatic solvents and hydrocarbons can swell the wall, and elevated effluent temperature reduces the permissible working pressure. For those lines the actual composition and temperature must be established before the pipe is selected.",
      },
    ],
    [
      {
        question: "What SDR suits a gravity sewer?",
        answer:
          "In a gravity line the criterion is not internal pressure but external load capacity. A lower SDR means a thicker wall and greater ring stiffness, which is what deep burial or traffic loading requires. The final figure comes from the burial depth, soil type and surface loading on that project.",
      },
      {
        question: "Does hydrogen sulphide attack polyethylene?",
        answer:
          "No. H2S corrosion is a problem for cementitious and metallic structures. Polyethylene is inert to that mechanism, which is one of the main reasons it is used to rehabilitate deteriorated sewer networks.",
      },
      {
        question: "Are sewerage and drainage the same thing?",
        answer:
          "No. Sewerage carries sanitary or industrial flow and must reach treatment; drainage conveys surface water and runoff. Their design criteria, grades and discharge rules differ, and the two should not be combined in one network.",
      },
      {
        question: "How does a sewage rising main differ from a water main?",
        answer:
          "Pressure class selection is similar, but two things change: frequent pump starts expose the line to surge more often, and the fluid carries solids, so a minimum flow velocity has to be maintained to prevent deposition.",
      },
    ],
  ),
  app(
    "drainage",
    "Drainage Systems",
    "HDPE Pipe for Drainage | Bukan Pipe",
    "HDPE drainage application for stormwater and surface runoff — how it differs from sanitary sewerage, and sizing from peak flow rather than pressure.",
    "PE in drainage networks",
    "HDPE drainage application",
    ["stormwater HDPE pipe", "surface drainage PE pipe"],
    "Drainage handles surface runoff and stormwater — not sanitary sewage. HDPE offers hydraulic capacity, installation speed and soil durability for road, site and agricultural drainage.",
    [
      "Hydraulic capacity and gradient",
      "Durability in saturated soil",
      "Fast civil installation on infrastructure projects",
    ],
    ["drainage-pipe"],
    ["hdpe-installation-guide"],
    [
      { type: "heading", level: 2, text: "Drainage is three different jobs" },
      {
        type: "paragraph",
        text: "The word covers three distinct tasks, and pipe selection is not the same in all three. Surface and stormwater drainage collects rainfall from roads and sites and has a high instantaneous peak flow. Agricultural drainage lowers the water table in a field and runs slow and continuous. Structural and highway drainage relieves water behind a retaining wall or under a road formation so that pore pressure and settlement do not develop.",
      },
      { type: "heading", level: 2, text: "Perforated or solid" },
      {
        type: "paragraph",
        text: "This is the primary decision. Where water has to enter the pipe from the soil — a field drain, a subgrade drain, behind a wall — perforated pipe is required. Where collected water is simply being conveyed to the outfall, solid pipe must be used; perforated pipe on that leg means water you worked to collect leaks back into the ground on the way. A properly designed drainage system usually uses both, in different parts of the run.",
      },
      { type: "heading", level: 2, text: "The filter is what decides service life" },
      {
        type: "paragraph",
        text: "Drains rarely fail because the pipe fails; they fail because they silt up with fines. Perforated pipe therefore needs a filter — geotextile wrap or a fibre sock — inside a gravel or graded aggregate envelope. Filter selection follows soil texture: in fine-grained and clay soils the wrong filter blinds itself and the drain stops working.",
      },
      { type: "heading", level: 2, text: "Diameter comes from peak flow, not from habit" },
      {
        type: "paragraph",
        text: "For surface drainage, the basis is peak runoff for the project's design return period — not average annual rainfall. Because the line is gravity, its real capacity is set by the grade as built: flattening the grade to reduce excavation depth reduces capacity sharply.",
      },
      { type: "heading", level: 2, text: "Why polyethylene" },
      {
        type: "list",
        items: [
          "A fused line has no joints, so roots and fines cannot enter at a connection",
          "It does not corrode in wet or acidic soil, unlike metal and concrete",
          "It is light and supplied in long lengths, which means fast installation in long trenches",
          "Its flexibility accommodates settlement of the drained ground without fracture",
        ],
      },
      { type: "heading", level: 2, text: "Fix the outfall before designing anything" },
      {
        type: "paragraph",
        text: "The most common field failure in drainage is a system that is built correctly but discharges to a point that is not below the line, or that submerges in the wet season. The line then stays full and drainage stops. The outfall level and its condition in the worst seasonal case have to be established before the network is designed.",
      },
    ],
    [
      {
        question: "How does drainage pipe differ from sewer pipe?",
        answer:
          "By duty and by discharge rules. Drainage conveys surface and groundwater and may be perforated so water can enter it. Sewerage carries contaminated flow, must be fully sealed and must reach treatment. The two networks should not be connected.",
      },
      {
        question: "Where should perforated pipe go?",
        answer:
          "Only in the collection section — where water has to enter from the soil. The conveyance leg carrying collected water to the outfall should be solid, otherwise part of the flow returns to the ground on the way.",
      },
      {
        question: "How long does a PE drain last?",
        answer:
          "The pipe itself lasts a long time in soil because it does not rot. What determines the working life of the system is the filter and gravel envelope around it — drains usually fail by clogging, not by pipe failure.",
      },
      {
        question: "Can a drain discharge into the sewer?",
        answer:
          "Technically, and usually under local rules, no. Storm runoff entering a foul sewer saturates network and treatment capacity during rainfall and causes surcharging.",
      },
    ],
  ),
  app(
    "industrial",
    "Industrial Piping",
    "HDPE Pipe for Industrial Applications | Bukan Pipe",
    "Industrial HDPE pipe for process fluid and slurry transfer — chemical compatibility, pressure and temperature checks, and the industrial product page.",
    "PE in industrial fluid transfer",
    "industrial HDPE pipe",
    ["PE100 pressure pipe", "industrial polyethylene pipe"],
    "Factory materials include industrial fluid transfer among stated PE pipe applications. Material grade, pressure and temperature limits must follow the process engineer's specification — not generic product marketing.",
    [
      "Fluid compatibility and temperature",
      "Pressure class and SDR per process design",
      "Project standards and inspection requirements",
    ],
    ["industrial-pipe", "pe100-pipe", "water-supply-pipe"],
    ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe-temperature-pressure"],
    [
      { type: "heading", level: 2, text: "Where PE is used in industry" },
      {
        type: "paragraph",
        text: "Industrial use falls into roughly four groups: raw and circulating water in cooling systems, slurry and abrasive transport in mining and mineral processing, acid, alkali and brine lines, and industrial effluent networks. What they share is a combination of fluid corrosivity and the futility of metallic pipe against it.",
      },
      { type: "heading", level: 2, text: "Chemical compatibility: where yes, where no" },
      {
        type: "paragraph",
        text: "Polyethylene resists acids, alkalis, salts and aqueous solutions very well, and that is precisely why it displaces steel on corrosive duty. But the resistance is not universal. Aromatic solvents and chlorinated hydrocarbons are absorbed into the wall and cause swelling and loss of mechanical properties. Strong oxidisers at high concentration degrade the wall over time.",
      },
      {
        type: "paragraph",
        text: "The practical point is that compatibility has to be checked against the actual composition, actual concentration and actual temperature of the fluid — not against its generic name. A dilute solution at ambient temperature and the same solution concentrated at 60 °C are two different problems.",
      },
      { type: "heading", level: 2, text: "Temperature is the real constraint" },
      {
        type: "paragraph",
        text: "Most premature failures on industrial PE lines come from temperature, not pressure. The PN marked on the pipe applies at 20 °C; as fluid temperature rises, the permissible working pressure falls by the temperature derating factor. If the process line runs continuously warm, SDR selection has to be based on MOP at operating temperature rather than nominal PN.",
      },
      { type: "heading", level: 2, text: "Slurry and abrasion" },
      {
        type: "paragraph",
        text: "In slurry transport, polyethylene's advantage over steel is abrasion resistance: a soft, compliant surface absorbs particle impact instead of being cut by it. Two practical consequences follow. Wear is not uniform — it concentrates in the invert and at bends — so periodically rotating the pipe about its axis extends line life. And flow velocity must stay above the settling threshold for the solids, or the line silts up progressively.",
      },
      { type: "heading", level: 2, text: "Where PE is the wrong choice" },
      {
        type: "list",
        items: [
          "Steam lines and any continuously hot fluid — outside polyethylene's temperature range",
          "Hot oil, aromatic solvents and chlorinated hydrocarbons",
          "Lines exposed to fire, or where fire resistance is specified",
          "Where the project specification explicitly requires metallic pipe with radiographic weld inspection",
          "Very high pressures in large diameters, where the required wall thickness becomes uneconomic",
        ],
      },
      { type: "heading", level: 2, text: "What to establish before ordering" },
      {
        type: "paragraph",
        text: "For an industrial line, diameter and pressure alone are not enough. Fluid composition and concentration, operating and maximum transient temperature, working and surge pressure, the presence and percentage of abrasive solids, and the client's governing specification — these are what make grade and SDR selection possible. Final compatibility sign-off rests with the project's process engineer.",
      },
    ],
    [
      {
        question: "What temperature can polyethylene pipe work at?",
        answer:
          "The PN marked on the pipe applies at 20 °C. Above that the permissible pressure must be corrected by the temperature derating factor and MOP becomes the design basis. For continuously hot fluid, polyethylene is usually not the right choice.",
      },
      {
        question: "Is polyethylene resistant to acid?",
        answer:
          "To aqueous acids and alkalis, generally yes — that is the main reason it replaces steel on these lines. Aromatic solvents, chlorinated hydrocarbons and strong oxidisers are the exceptions. Compatibility must be checked against the actual composition, concentration and temperature.",
      },
      {
        question: "For a mining slurry line, polyethylene or steel?",
        answer:
          "Against particle abrasion polyethylene usually lasts longer, because its compliant surface absorbs particle impact. Its limits are temperature and pressure; on high-pressure or hot lines, steel or steel with a polyethylene lining is the more common option.",
      },
      {
        question: "How do I connect a PE industrial line to metallic equipment?",
        answer:
          "With a stub end and backing flange. The joint can be opened, which is what pump, valve and vessel connections need. Note that at a flanged joint the line's thrust is no longer restrained by fusion, so mechanical restraint has to be designed.",
      },
    ],
  ),
  app(
    "cable-protection",
    "Cable & Telecom Protection",
    "HDPE Pipe for Cable Protection | Bukan Pipe",
    "HDPE cable duct for telecom, power and fibre routes — sizing the duct from cable count and diameter, and burial considerations.",
    "PE cable protection",
    "HDPE cable duct",
    ["polyethylene cable duct", "telecom conduit PE"],
    "Cable protection for telecom, power and fibre routes is listed among company applications. Selection follows trench design, cover depth and mechanical protection requirements.",
    [
      "Wall stiffness and crush resistance per trench design",
      "Installation in open cut or directional bore",
      "Moisture protection for enclosed cables",
    ],
    ["water-supply-pipe"],
    ["hdpe-installation-guide"],
    [
      { type: "heading", level: 2, text: "What a cable duct actually does" },
      {
        type: "paragraph",
        text: "A duct does not carry the cable; it holds its route. It does three jobs: it protects the cable from soil load, traffic load and excavator strikes; it makes it possible to pull cable through a buried route at all; and — most importantly — it makes replacing or adding cable possible later without digging again. That third job is what justifies the cost of the duct.",
      },
      { type: "heading", level: 2, text: "Diameter comes from fill ratio" },
      {
        type: "paragraph",
        text: "Duct size is not chosen from cable diameter but from fill ratio. The conventional rule is that the duct's internal diameter should be at least about 1.5 times the cable's outside diameter. A tight duct raises pulling tension and, on a route with bends, jams the cable. If several cables share one duct, the combined cross-sectional area has to be assessed against the duct bore, not just the diameter of the largest cable.",
      },
      { type: "heading", level: 2, text: "Pulling or blowing decides the bore finish" },
      {
        type: "paragraph",
        text: "Copper and power cable is normally pulled with a rope. Fibre on long routes is blown in with compressed air, and that method depends on low internal friction. Ducts made for fibre blowing have a low-friction or ribbed inner wall. If the route is for fibre, that property has to be specified from the outset — with a plain smooth-bore duct the blowable length drops sharply.",
      },
      { type: "heading", level: 2, text: "Bend radius is the real route constraint" },
      {
        type: "paragraph",
        text: "Two bend radii apply and both have to be respected: the duct's own permitted radius, and the cable's, which is usually the more restrictive — especially for fibre. The route should be designed with gentle curves; several bends clustered in one section raise pulling tension cumulatively and can make cable installation impossible.",
      },
      { type: "heading", level: 2, text: "The steps that get skipped and cost money later" },
      {
        type: "list",
        items: [
          "Install a draw rope in the duct from the start — without one, a buried empty duct is effectively unusable",
          "Bury a spare duct in the same trench; its cost is negligible against re-excavation",
          "Cap both ends so that silt, water and rodents do not get in",
          "Lay warning tape above the route and mark the chamber positions",
          "Record the route and chambers as-built",
        ],
      },
      { type: "heading", level: 2, text: "Ducts fill with water, and that is normal" },
      {
        type: "paragraph",
        text: "Every buried duct takes on water sooner or later. Good design accepts this and selects cable rated for a wet environment, rather than assuming the duct stays dry. The point that genuinely has to be sealed is where the duct enters a chamber, equipment room or building — otherwise the duct pipes water straight to the equipment.",
      },
    ],
    [
      {
        question: "How do I size a cable duct?",
        answer:
          "By fill ratio. The conventional rule is an internal diameter at least about 1.5 times the cable's outside diameter. For multiple cables, assess their combined cross-sectional area against the duct bore. The spare space both reduces pulling tension and leaves room to add cable later.",
      },
      {
        question: "What duct does fibre optic cable need?",
        answer:
          "If the installation method is air blowing, the duct needs a low-friction or ribbed inner wall. With an ordinary duct the length that can be blown in one shot falls sharply and the number of intermediate chambers rises.",
      },
      {
        question: "Can water pipe be used as cable duct?",
        answer:
          "Mechanically it usually can, and it is seen on small projects, but there are two limits: the bore is not optimised for fibre blowing, and the pipe's marking does not match its actual use, which misleads future excavation. For main routes, order duct with a declared specification.",
      },
      {
        question: "Is a draw rope really necessary?",
        answer:
          "Yes. Getting a rope into a buried duct that never had one is difficult and sometimes impossible. The draw rope has to go in as the duct is laid, before it is backfilled.",
      },
    ],
  ),
];
