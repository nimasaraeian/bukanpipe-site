import type { SeoArticleSeed } from "@/lib/content/seo-content-model";

export const enHdpePillarArticle: SeoArticleSeed = {
  slug: "polyethylene-pipe-complete-guide",
  title: "What Is Polyethylene Pipe? Complete HDPE Guide — Applications, Standards, and Pipe Selection",
  seoTitle: "Polyethylene Pipe: HDPE Guide & Selection | Bukan Pipe",
  seoDescription:
    "Complete guide to polyethylene and PE100 HDPE pipe: SDR, working pressure, water and gas standards, quality control, and industrial procurement from Bukan Pipe.",
  description:
    "Engineering and procurement guide to HDPE pipe — from material and standard basics through technical offer review and project delivery.",
  primaryKeyword: "polyethylene pipe",
  secondaryKeywords: [
    "HDPE pipe",
    "PE100 pipe",
    "polyethylene pipe manufacturer",
    "HDPE pipe factory",
    "buy polyethylene pipe",
    "polyethylene pipe standard",
  ],
  definition:
    "Polyethylene pipe is a polymer product for fluid conveyance or other defined applications. In pressurized networks, selection is based on compound grade, outside diameter, wall thickness, design pressure and temperature, and the applicable service standard; the label HDPE alone does not define a complete purchase specification.",
  sections: [
    {
      type: "paragraph",
      text: "Selecting polyethylene pipe for a transmission line is a shared decision among engineering, procurement, and operations. The buyer focuses on price and delivery schedule, the contractor on transport, welding, and installation, and the operator on service reliability and maintainability. When each group considers only its own criteria, the product purchased may look acceptable on paper yet fail to match existing connections in the field, create excessive pressure loss, or lack adequate acceptance documentation. This guide helps establish a common language for defining the order and answers the main questions that should be resolved before a purchase request is issued.",
    },
    {
      type: "paragraph",
      text: "In this article, the best pipe means the product suited to actual project conditions and supported by evidence that can be reviewed. No grade, color, or pressure number creates universal superiority on its own. The content is written for industrial buyers, contractors, and water and gas network engineers; numerical examples are illustrative only. For an executable decision, the approved drawing, employer specification, and verified product information must be considered together. Bukan Pipe, as an HDPE pipe manufacturer, can be the technical enquiry contact; conformity for each order must still be assessed against the documentation for that specific product and that specific delivery.",
    },
    { type: "heading", level: 2, text: "Understanding the material: polyethylene, HDPE, and PE100" },
    {
      type: "paragraph",
      text: "Polyethylene is the name of a family of polymer materials, and HDPE refers to high-density polyethylene. In industrial correspondence, this term is commonly used for single-wall pipes employed in transmission networks. Recognizing the material family, however, is not the same as knowing the long-term performance of a particular compound. The formulation used in production may include additives required for stability and identification in addition to the base polymer. What must be clear in the order is the traceable grade designation, permitted application, and conformity of both compound and finished product with the specified standard — not merely a generic name on a price list.",
    },
    {
      type: "paragraph",
      text: "PE100 is a strength classification for pipe compound, and the number does not mean one hundred bar pressure, one hundred percent purity, or a guaranteed service life of one hundred years. The MRS value for this class is ten megapascals; for PE80 it is eight megapascals. This classification relies on evaluation of long-term behavior under reference conditions. The term PE100 by itself also does not show whether the pipe is approved for potable water, permitted for gas, or suited to every trenchless method. Each of those attributes is a separate specification and documentation matter and should appear in the supplier offer review.",
    },
    { type: "heading", level: 3, text: "Why is the same grade not enough?" },
    {
      type: "paragraph",
      text: "Two deliveries labeled PE100 pipe may differ in diameter, wall thickness, tolerances, application standard, storage condition, and traceability. Even when the raw material name is the same, production outcome and jointing conditions still matter. A product with surface damage in storage, for example, cannot be accepted solely because a raw-material data sheet is shown. A sound evaluation form places grade alongside batch ID, production date, test results, and pipe marking. That approach prevents turning a material name into a marketing claim and ties the purchase decision to measurable evidence.",
    },
    { type: "heading", level: 2, text: "How to read outside diameter, wall thickness, and SDR" },
    {
      type: "paragraph",
      text: "For many metric polyethylene pipes, the nominal size refers to outside diameter. Ordering a given diameter therefore does not necessarily mean the same bore for fluid passage. Wall thickness reduces internal space on both sides and affects flow rate and pressure-loss calculations. SDR is the ratio of nominal outside diameter to nominal wall thickness; at a fixed outside diameter, a lower SDR means greater wall thickness. This geometric relationship is useful for initial comparison, but standard dimension tables, wall-thickness rounding, and production tolerances must also be reflected in the final order.",
    },
    {
      type: "paragraph",
      text: "As an illustrative example, if outside diameter is two hundred millimeters and wall thickness is twelve millimeters, approximate internal diameter will be one hundred seventy-six millimeters. This is not a recommended standard size — it only shows the difference between internal and external diameter. A common mistake is for the designer to write the calculated internal diameter directly on the purchase list as the pipe size. It is better for the engineering table to include separate columns for outside diameter, SDR, reference thickness, and the internal diameter used in calculation so that supplier and contractor do not form different expectations about the dimensions required.",
    },
    {
      type: "spec-table",
      title: "Key terms on the purchase specification sheet",
      rows: [
        {
          label: "Outside diameter",
          value: "Reference size for pipe and many metric fittings; do not confuse with internal diameter.",
        },
        {
          label: "Wall thickness",
          value: "Dimension affecting pressure resistance and flow area; review together with tolerance.",
        },
        {
          label: "SDR",
          value: "Ratio of nominal outside diameter to nominal wall thickness; a lower number means a thicker wall at the same OD.",
        },
        {
          label: "PN or pressure class",
          value: "Characteristic dependent on standard and reference conditions; the same pressure rating does not apply at all temperatures.",
        },
        {
          label: "Application standard",
          value: "Reference for product requirements for water, gas, or the service defined in the contract.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Working pressure and temperature: beyond the number marked on the pipe" },
    {
      type: "paragraph",
      text: "Design pressure must cover the conditions the line will actually experience. Normal pump pressure is only one of those conditions; elevation difference, start-up and shutdown, valve status, and power-failure scenarios can also be decisive. On a long route, maximum pressure does not necessarily occur where the main pressure gauge is installed. The elevation profile must be matched to operating states. When a supplier receives only the usual network pressure, that single figure cannot infer every abnormal condition. Recording the design basis prevents later disagreement about expected performance.",
    },
    {
      type: "paragraph",
      text: "Fluid temperature and installation ambient temperature must also be defined. A pressure value defined under reference conditions cannot be applied at higher temperatures without reviewing the relevant derating factors. An above-ground line in summer does not behave thermally like a buried line in soil. Required information is not only the instantaneous maximum temperature; duration at different temperatures and the service pattern also matter. In an enquiry, write normal temperature, likely maximum temperature, and above-ground or buried condition separately. Pressure derating factor selection should be documented against the design reference and material data, not copied as a generic percentage for every project.",
    },
    { type: "heading", level: 3, text: "Water and gas comparison example" },
    {
      type: "paragraph",
      text: "The basic educational relationship for pressure in bar is twenty times MRS divided by the product of the design factor and the expression SDR minus one. For PE100 with SDR eleven and an assumed factor of one point two five, the result is sixteen bar. That result is limited to reference conditions and the assumptions of the example. If application or design factor changes, the result changes too. A water pressure table should therefore not be copied for gas. This calculation also does not replace surge review, fitting components, operator limits, or temperature-related pressure reduction, and it does not issue an operating instruction directly.",
    },
    { type: "heading", level: 2, text: "Main HDPE pipe applications and where selection stops" },
    {
      type: "paragraph",
      text: "In water supply, the primary issue is conveying the required flow at acceptable quality and controllable pressure. In irrigation networks, in addition to water transport, seasonal operating plans and compatibility with distribution equipment matter. In industrial lines, fluid chemistry and process temperature must be defined clearly. Pressurized sewer service is not the same as a gravity route; in the former, internal pressure and pumping play a direct role, while in the latter geometry and soil loading may be decisive. Visual similarity between pipes is not a valid reason to swap application in the field.",
    },
    {
      type: "paragraph",
      text: "In gas distribution, product identification, operator requirements, and execution-chain qualification have special importance. The buyer must know the product is supplied for that exact service and that the required documents are available. In industrial use, chemical resistance must not be read as immunity to every substance. Naming the fluid is not enough; concentration, temperature, contact duration, accompanying substances, and cleaning method must be known. If process information is incomplete, requesting compatibility review before ordering is a more rational step than selecting product based on one apparently similar project.",
    },
    {
      type: "internal-links",
      title: "Choose the product family by project application",
      links: [
        {
          label: "Water supply polyethylene pipe",
          path: "/products/water-supply-pipe",
          hint: "Review product specifications for water transmission",
        },
        {
          label: "Gas distribution polyethylene pipe",
          path: "/products/gas-pipe",
          hint: "Review product suited to gas network requirements",
        },
        {
          label: "PE100 pipe",
          path: "/products/pe100-pipe",
          hint: "Complete grade and dimension enquiry",
        },
      ],
    },
    { type: "heading", level: 2, text: "Polyethylene pipe standards: what does the standard number fix?" },
    {
      type: "paragraph",
      text: "The ISO 4427 family relates to polyethylene systems for water and certain related pressurized applications, and the ISO 4437 family addresses gaseous fuel supply systems. The pipe part is not the same as the fittings part or system performance assessment. In the contract, the part, edition, and applicable amendments must be stated. For projects in Iran, the requested national standard and employer-specific specification must also be taken from the official project documents. Writing compliant with international standard without number and scope does not create a reliable basis for comparison and acceptance.",
    },
    {
      type: "paragraph",
      text: "Presence of a standard number in a catalogue does not by itself prove that every product offered is approved across the full scope of that standard. The buyer should verify the link between the ordered product, certificate scope, validity date, and issuing body. It is better to agree the document list before contract award so that at loading stage it is clear whether one party expected a particular test report and the other prepared only a general company certificate. This is especially important in multi-diameter orders and staged delivery, because documents must be attributable to the items delivered.",
    },
    { type: "heading", level: 2, text: "From raw material to pipe: important points in production" },
    {
      type: "paragraph",
      text: "In extrusion, the polymer compound enters process equipment, is formed, and after passing through dimension control and cooling stages becomes a measurable product. Final quality is not the result of one machine or one setting alone. Feed stability, process control, die condition, haul-off and cooling coordination, and measurement accuracy must be viewed together. From the buyer's perspective, the useful question is not what promotional name the production line carries; the useful question is how the factory detects process changes and separates product outside acceptance limits from shippable delivery.",
    },
    {
      type: "paragraph",
      text: "When visiting an HDPE pipe factory, follow the information recording flow. Is incoming material ID linked to the production order? Can production date and line be recovered from the product? Are inspection results stored under the same identifier? A documented answer to these questions is more valuable than equipment viewing alone. The buyer can also ask how material or setting changes mid-order are managed. The aim is not to direct production; the aim is to ensure a change that affects the product is not released into the project delivery without recording and evaluation.",
    },
    { type: "heading", level: 2, text: "Quality control and the laboratory role in delivery acceptance" },
    {
      type: "paragraph",
      text: "Dimensional, visual, and marking checks are part of product evaluation. Material and performance tests are also defined according to standard and quality plan. The buyer should not treat one isolated result as proof of every characteristic; for example, an acceptable material test result does not cover transport damage or a delivered diameter error. The inspection plan should state what is controlled at the factory, what will be checked at delivery, and which result requires shipment hold or engineering decision. The role of sampling and lot representation must also be clear from the start.",
    },
    {
      type: "paragraph",
      text: "A test report is useful for procurement when sample, method, conditions, result, and acceptance criterion can be identified in it. A number without unit or without link to delivery ID contributes little to decision-making. Instead of a general request for a laboratory sheet, write the required information list in the quality appendix. If testing is done at an external laboratory, review scope of activity and qualification required by the project. The Bukan Pipe laboratory page is a suitable starting point for questions about services and documents; details available for a specific order should be confirmed by enquiry.",
    },
    {
      type: "internal-links",
      title: "Complete quality evaluation and technical knowledge",
      links: [
        {
          label: "Bukan Pipe laboratory",
          path: "/laboratory",
          hint: "Ask about tests and delivery documentation required for the lot.",
        },
        {
          label: "Technical center",
          path: "/technical-center",
          hint: "Read supplementary guides on selection, pressure, and installation.",
        },
      ],
    },
    { type: "heading", level: 2, text: "Hydraulics, energy, and the real cost of a transmission line" },
    {
      type: "paragraph",
      text: "In a pumped line, pipe purchase price is only part of project cost. Internal diameter affects velocity and pressure loss, and diameter choice can change pumping requirement. Economic comparison is better done for a defined operating period and should include energy cost, maintenance, access, and service interruption. A fixed percentage saving claim for all lines is not valid, because route length, flow, topography, and pump control method differ. A sound engineering proposal shows under which assumptions each option was compared and which assumption change the result is sensitive to.",
    },
    {
      type: "paragraph",
      text: "When comparing two offers, ensure the service level is the same. If one has smaller internal diameter, more joints, or a different delivery schedule, comparing price per meter alone is misleading. In a time-constrained project, cost of re-mobilizing the site can also matter. On a remote route, access to repair fittings and welding equipment should appear in the evaluation. These costs do not necessarily reject the lower-priced product; they complete the purchase picture. The final decision is better recorded in a table with columns for assumption, cost, risk, and approving party.",
    },
    { type: "heading", level: 2, text: "Jointing, installation, and site conditions" },
    {
      type: "paragraph",
      text: "Jointing method must be compatible with application, dimensions, and project requirements. Butt fusion and electrofusion are used in polyethylene systems, but method choice and execution instruction depend on project approval. Surface cleanliness, alignment, equipment condition, and controlled procedure steps affect outcome. A general article is not the place to set fusion temperature or cooling time for all products; those parameters must come from the approved procedure and manufacturer instruction. Before purchase, verify that the contractor has tools, qualified personnel, and space to execute the same pipe and fitting combination.",
    },
    {
      type: "paragraph",
      text: "In buried routes, pipe and surrounding soil form one behavioral system. Bedding condition, surround material, groundwater, and traffic load must appear in the execution design. Pipe flexibility does not permit omitting bedding preparation or leaving sharp rock in contact with the wall. In above-ground routes, supports, thermal expansion, and mechanical protection also need review. When purchasing, provide the installation drawing or at least a route condition description to the technical team so product is not selected on internal pressure alone and late site needs do not force order change.",
    },
    { type: "heading", level: 2, text: "Transport, storage, and incoming inspection" },
    {
      type: "paragraph",
      text: "Product quality must be preserved after it leaves the factory. In the transport plan, define packaging type, unloading method, and storage location. Dragging pipe on unsuitable surfaces, contact with sharp edges, or stacking without restraint can create problems. If the delivery is coiled, opening it requires a controlled method and adequate space. Acceptable damage limits, storage duration, and protection conditions should come from product and project documents. Using informal rules applied uniformly to all diameters and weather conditions is not a reliable acceptance approach.",
    },
    {
      type: "paragraph",
      text: "Do not limit incoming inspection to counting sticks. Check printed specification, length or meterage, diameter, end condition, and ID match to the delivery note. Record every discrepancy with photo, location, and identifier, and keep suspect items out of use until disposition is decided. This does not necessarily mean rejecting the delivery; it is an opportunity to make a documented decision before burial or welding. After installation, access to the same data is harder and correction cost is higher. Staged delivery should follow the same routine.",
    },
    { type: "heading", level: 2, text: "Polyethylene pipe buying guide and manufacturer evaluation" },
    {
      type: "paragraph",
      text: "A good purchase request starts with application description and then defines dimensions, pressure, temperature, meterage, and standard. The phrase suitable pipe for our project is not enough to receive a comparable offer. If the design is not yet final, label the enquiry preliminary and write its assumptions. The polyethylene pipe manufacturer must know which items are fixed and which await approval. That transparency prevents hidden price and delivery changes. In the firm order, record the bill-of-materials version and technical documents so later revisions remain traceable.",
    },
    {
      type: "spec-table",
      title: "Industrial enquiry information checklist",
      rows: [
        {
          label: "Service conditions",
          value: "Fluid type, base flow, design pressures, and expected temperatures",
        },
        {
          label: "Line items",
          value: "Outside diameter, SDR, grade, meterage per row, and delivery form",
        },
        {
          label: "Documents",
          value: "Standard and edition, drawing, inspection plan, and delivery certificates",
        },
        {
          label: "Execution",
          value: "Jointing method, installation location, route conditions, and site constraints",
        },
        {
          label: "Commercial",
          value: "Delivery location, schedule, offer validity, and transport responsibility",
        },
      ],
    },
    {
      type: "paragraph",
      text: "When evaluating a factory, turn general promises into answerable questions. Instead of asking whether quality is good, ask which document will be provided for this order line. Instead of relying on a best manufacturer label, assess verifiable supply history, technical response discipline, and discrepancy handling method. If the offer includes deviation from specification, record it in a deviation table. Verbal agreement on a dimension change or document does not replace written approval. That approach lets the buyer decide among suppliers on shared criteria.",
    },
    { type: "heading", level: 2, text: "Common mistakes and a decision scenario" },
    {
      type: "paragraph",
      text: "Suppose a contractor receives two offers for a water transmission line. Both show PE100, but one has a different SDR and the other incomplete delivery documents. Engineering should first review dimension and pressure conformity, quality should decide on documents, and procurement should compare price for equivalent items. If that sequence is reversed, the cheapest offer may be chosen before differences are clear. The aim is not to lengthen buying; the aim is to remove ambiguity that later becomes site stop or cost change.",
    },
    {
      type: "paragraph",
      text: "Another mistake is to equate design life with commercial warranty, or to read recyclability as permission to use any recycled material in pressure pipe. Each claim must be read within its own scope. Line identification color, higher weight, or glossy appearance are not complete quality criteria on their own. In a purchase meeting, ask for one relevant document for every claim that affects the decision. If the document is not available, record the item as unconfirmed and define its effect on acceptance; clarifying status through record is better than hiding it in contract wording.",
    },
    { type: "heading", level: 2, text: "Comparison with steel and other options in a real project" },
    {
      type: "paragraph",
      text: "Choice among polyethylene, steel, or other materials should follow the project problem. For example, where corrosion protection is a major issue, the polymeric nature of the pipe can influence option evaluation. Conversely, high temperature, special fluid conditions, or installation limits may require review of another material. A proper comparison needs a common service level: flow, pressure, temperature, route length, and installation conditions must be defined the same for all options. Then thickness, jointing method, protection, execution equipment, and maintenance plan for each option should be reviewed separately. Comparing two prices for two apparently equal nominal diameters without internal diameter and performance data does not yield a reliable result. In the selection report, write the reason each option was accepted or rejected so the decision does not depend on one person's preference or a product marketing title.",
    },
    {
      type: "paragraph",
      text: "For an industrial line, repair simplicity and access should also appear in the initial comparison. If the site lacks suitable welding equipment, the cost and time to provide it are part of the polyethylene option. If the metallic option needs special protection and maintenance, that cost must also be included on a clear basis. None of these points alone decides the outcome. It is better to show three cost states separately: initial cost, operating cost, and line shutdown consequence. In a plant where shutdown is very costly, repair planning capability may carry more weight; in a project with easy access, another criterion may dominate. Professional selection is the result of such comparison and is not replaced by a phrase suitable for all industries. Price and evaluation period assumptions should also be recorded so the calculation can be updated when market conditions change.",
    },
    { type: "heading", level: 2, text: "Design life, warranty, and actual service conditions" },
    {
      type: "paragraph",
      text: "In discussion about pipe life, separate three concepts: material evaluation basis, intended design period, and contractual product warranty. These concepts do not necessarily share the same number or range. Long-term material evaluation is done under defined conditions; the designer also decides for a service period and a set of loads; supplier warranty is a commitment whose conditions are written in the contract. If a long life is mentioned in an offer, ask which concept the wording refers to exactly. Without knowing temperature, pressure, fluid, installation, and execution quality, one general number cannot be assigned to every route. Purchase documents should use clear wording, and every commitment should have acceptance conditions and liability limits. That clarity helps the buyer hold realistic expectations and avoids dispute over the meaning of general terms.",
    },
    {
      type: "paragraph",
      text: "Maintaining information through operation is an important part of asset life management. If a line was designed for a defined flow but a larger pump is added years later, the effect of the change must be reviewed again. Pressure, temperature, and maintenance history help the engineering team see how closely actual conditions match the original design. A change in line performance should not be attributed to pipe material alone; joints, control equipment, local settlement, or operating method change may also play a role. For investigation, collect data first and then form a hypothesis. Recording location, time, pump status, and component specification is far more useful than an immediate conclusion about the quality of an entire delivery. That approach enables more precise technical review and corrective action suited to the cause.",
    },
    { type: "heading", level: 2, text: "Joint engineering and procurement meeting: from vague need to clear order" },
    {
      type: "paragraph",
      text: "A short meeting before enquiry can remove many later exchanges. Engineering lead first explains application, service conditions, and unfinalized items. Execution representative then states transport limits, welding space, and installation sequence. Quality defines required documents and inspection points, and procurement records required timing and purchase package boundaries. Meeting output should be a versioned bill of materials and a list of open questions. For each question, assign owner and due date. If diameter is not yet fixed, send it with a preliminary label; if standard is defined, the supplier should not change it by habit. This method turns scattered information into a shared basis for offer receipt without creating heavy administrative structure.",
    },
    {
      type: "paragraph",
      text: "After receiving offers, match responses row by row. For example, if the supplier quoted meterage in a different delivery form, review the effect on fitting count and transport. If a certificate is issued only after production, clarify what evidence exists for evaluation before order and what must be delivered after production. If part of the items cannot be supplied at requested time, record the alternative separately from the main offer. In the end, the final table should show exactly which product will be delivered when and with which documents. That table is also useful for change control; every later revision is compared to the same basis and its effect on price, execution, and acceptance remains visible.",
    },
    { type: "heading", level: 2, text: "References and scope of this guide" },
    {
      type: "paragraph",
      text: "For SDR definition and pressure relationship, the PE100+ Association technical guidance was used as review basis. Scope of water and gas standards should be checked from official ISO pages and the contract edition text. The PPI polyethylene pipe handbook is also useful supplementary reading on design, production, and installation. This article is not a rewrite of a standard text or approval for a specific order. Examples are built to explain decisions and do not attribute any production capacity, certificate, or test result of Bukan Pipe to product without document. Responsibility for executable specification remains with the project-qualified team.",
    },
    { type: "heading", level: 2, text: "Next step: technical enquiry to Bukan Pipe" },
    {
      type: "spec-cta",
      text: "To review polyethylene pipe supply from Bukan Pipe, send diameter and SDR list, application, design pressure and temperature, meterage, requested standard, and delivery timing. If part of the information is not yet fixed, state that so the offer can be prepared on clear assumptions. Include quality document requirements and inspection conditions in the enquiry.",
    },
  ],
  faqs: [
    {
      question: "Do HDPE pipe and PE100 pipe mean exactly the same thing?",
      answer:
        "No. HDPE refers to the high-density polyethylene material family and PE100 is a compound strength class. For ordering, diameter, SDR, application, standard, and required documents must be specified in addition to these names. Neither title alone proves potable-water approval or permission for use in a gas network.",
    },
    {
      question: "For buying polyethylene pipe, should we choose diameter first or pressure first?",
      answer:
        "Both must be coordinated in one design process. Flow need and pressure loss determine required internal diameter; pressure and service conditions affect effective wall thickness. After initial selection, resulting internal diameter should be checked again. Final order is usually defined by outside diameter and SDR, not diameter name alone.",
    },
    {
      question: "Is a lower SDR always the better choice?",
      answer:
        "No. At fixed outside diameter, lower SDR means thicker wall and less internal space. Selection must answer pressure need, flow, installation, and cost together. Extra thickness without hydraulic review does not necessarily improve the whole network and can change required fitting specifications.",
    },
    {
      question: "Can water supply pipe be used in a gas line?",
      answer:
        "Such a decision cannot be made from material or dimensional similarity alone. The product must be accepted for gas application and operator requirements. Standard, identification, documents, and required gas execution method must be reviewed independently; a water pressure table does not replace gas network engineering approval.",
    },
    {
      question: "What information is needed to compare price between two manufacturers?",
      answer:
        "First verify sameness of application, grade, diameter, SDR, meterage, standard, and delivery documents. Then place transport cost, inspection conditions, delivery time, and offer exceptions beside price. Comparing price per meter for two products with different specifications is not a reliable basis for economic choice.",
    },
    {
      question: "How do we receive a technical proposal from Bukan Pipe?",
      answer:
        "Use the quote request form or contact page and send the item table together with service conditions and project documents. For staged orders, write required timing for each section separately. Requesting technical review and delivery documentation helps ensure the received offer matches actual project need.",
    },
  ],
  related: {
    products: ["pe100-pipe", "water-supply-pipe", "gas-pipe"],
    articles: ["water-supply-polyethylene-pipe-guide", "gas-polyethylene-pipe-guide"],
    laboratory: ["test-scope"],
  },
  references: [
    "https://www.pe100plus.com/PE-Pipes/Technical-guidance/model/Design/SDR/pressure-rating-i1047.html",
    "https://www.iso.org/standard/72184.html",
    "https://www.plasticpipe.org/Shared_Content/Shop/PE-Handbook.aspx",
  ],
  curatedLinks: [
    {
      label: "Request a quote from Bukan Pipe",
      path: "/request-quote",
      hint: "Send item list and project conditions for enquiry.",
    },
    {
      label: "Contact Bukan Pipe",
      path: "/contact",
      hint: "Coordinate technical review and receive supplementary information",
    },
  ],
};
