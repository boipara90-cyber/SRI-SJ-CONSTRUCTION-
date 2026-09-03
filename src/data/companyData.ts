import { ServiceItem, PilingFeature, ProjectItem, EquipmentItem, JobOpening } from '../types';

export const COMPANY_INFO = {
  name: "Sri SJ Constructions Private Limited",
  shortName: "Sri SJ Constructions",
  initials: "SJC",
  tagline: "Strong Foundations. Reliable Construction.",
  establishedYear: 2011,
  experienceYears: "15+",
  gstNumber: "19ABPCS8304J1ZQ",
  gstin: "19ABPCS8304J1ZQ",
  cinPlaceholder: "U45200WB2011PTCXXXXXX",
  address: {
    street: "Nandarampur, Sutahata",
    city: "Haldia",
    district: "Purba Medinipur",
    state: "West Bengal",
    pincode: "721635",
    country: "India",
    fullAddress: "Haldia, Sutahata, Nandarampur, West Bengal – 721635, India"
  },
  contact: {
    phone: "+91 81700 39171",
    altPhone: "+91 81700 39171",
    email: "srisjcons@gmail.com",
    supportEmail: "srisjcons@gmail.com",
    whatsapp: "+918170039171",
    workingHours: "Monday – Saturday: 9:00 AM – 8:00 PM (IST)",
    emergencySupport: "24/7 Site Equipment & Piling Breakdown Support"
  },
  stats: [
    { label: "Established Year", value: "2011", detail: "Registered Pvt Ltd" },
    { label: "GST Registration", value: "19ABPCS8304J1ZQ", detail: "Active Verified GSTIN" },
    { label: "Industry Experience", value: "15+ Years", detail: "Deep Piling & Civil" },
    { label: "Execution Track", value: "Multiple Projects", detail: "Industrial & Infrastructure" },
    { label: "Operational Hub", value: "Haldia, WB", detail: "Port & Industrial Belt" }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "piling-work",
    title: "Piling Work",
    category: "piling",
    shortDescription: "Specialized deep foundation piling solutions designed to transfer heavy structural loads to stable sub-strata.",
    fullDescription: "Sri SJ Constructions provides comprehensive deep foundation piling services tailored for challenging soil strata across coastal and industrial zones of West Bengal. Our experienced teams execute load-bearing piles with rigorous quality testing.",
    features: [
      "Rigid load-bearing deep piles",
      "Hydraulic & rotary boring methods",
      "Strict pile verticality and alignment control",
      "Full cage fabrication and tremie concreting"
    ],
    equipmentUsed: ["Rotary Piling Rig", "Bentonite Circulation Tanks", "Tremie Pipes", "Chisel & Bailer Sets"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80",
    iconName: "Drill"
  },
  {
    id: "foundation-construction",
    title: "Foundation Construction",
    category: "piling",
    shortDescription: "Engineering robust shallow and deep foundation systems for heavy industrial machinery and structures.",
    fullDescription: "From raft foundations and combined footings to heavy pile caps, we execute industrial-grade foundations built to withstand dynamic vibration, load stresses, and aggressive groundwater conditions.",
    features: [
      "Heavy RCC Pile Caps & Ground Beams",
      "Industrial Machine Foundations & Pedestals",
      "Raft & Mat Foundation Systems",
      "Waterproofing & anti-corrosion treatments"
    ],
    equipmentUsed: ["Transit Mixers", "Concrete Vibrators", "Total Station", "Steel Shuttering Sets"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    iconName: "Layers"
  },
  {
    id: "civil-construction",
    title: "Civil Construction",
    category: "civil",
    shortDescription: "Comprehensive turnkey civil engineering and structural building execution for commercial and institutional setups.",
    fullDescription: "Executing civil structures from groundwork to superstructures with uncompromising adherence to Indian Standards (IS codes), safety protocols, and client timelines.",
    features: [
      "Turnkey civil building execution",
      "Factory sheds and admin buildings",
      "Boundary walls, drainage & paving",
      "Quality certified raw materials"
    ],
    equipmentUsed: ["Excavators", "Concrete Pumps", "Bar Bending & Cutting Machines", "Scaffolding Towers"],
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80",
    iconName: "Building2"
  },
  {
    id: "bored-piling",
    title: "Bored Piling",
    category: "piling",
    shortDescription: "Cast-in-situ bored piling using bentonite slurry stabilization for high-capacity structural support.",
    fullDescription: "Our specialized bored cast-in-situ piling technique provides minimal vibration and noise, making it optimal for urban, industrial, and port areas where existing structures require protection.",
    features: [
      "Diameters from 450mm to 1200mm+",
      "Bentonite circulation for borehole stabilization",
      "Casing installation through soft top soils",
      "Direct tremie pouring with strict slump checks"
    ],
    equipmentUsed: ["Rotary Hydraulic Piling Rig", "Bentonite Pumps", "Sludge De-sanders", "Steel Liner Drivers"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
    iconName: "Hammer"
  },
  {
    id: "rcc-work",
    title: "RCC Work",
    category: "civil",
    shortDescription: "Precision Reinforced Cement Concrete work for columns, beams, slabs, retaining walls, and retaining structures.",
    fullDescription: "Expert bar bending, high-precision formwork staging, and controlled grade concreting (M20, M25, M30, M40+) tested for compressive strength and durability.",
    features: [
      "Rigid shuttering and formwork alignment",
      "Fe500D / Fe550D TMT reinforcement placing",
      "Slump and cube testing protocols",
      "Proper water/chemical membrane curing"
    ],
    equipmentUsed: ["High-Frequency Vibrators", "Automatic Rebar Benders", "Concrete Pumps", "Plate Compactors"],
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    iconName: "Grid"
  },
  {
    id: "structural-construction",
    title: "Structural Construction",
    category: "civil",
    shortDescription: "Heavy steel and concrete structural frameworks designed for factories, warehouses, and multi-tier facilities.",
    fullDescription: "Erection of durable structural elements with certified welders, heavy crane lifting, anchor bolting, and strict dimensional tolerance checks.",
    features: [
      "Heavy industrial framework assembly",
      "PEB & Hot-rolled structural erection",
      "Foundation bolt casting and alignment",
      "Corrosion-resistant epoxy coatings"
    ],
    equipmentUsed: ["Hydraulic Mobile Crane", "Welding Rectifiers", "Torque Wrenches", "Boom Lifts"],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    iconName: "Wrench"
  },
  {
    id: "industrial-construction",
    title: "Industrial Construction",
    category: "industrial",
    shortDescription: "Specialized infrastructure for manufacturing plants, refineries, processing units, and logistics parks.",
    fullDescription: "Understanding the demanding standards of industrial environments in the Haldia Industrial Zone, we adhere strictly to workplace safety, hazardous area protocols, and durable build standards.",
    features: [
      "Plant floor hard-standing & heavy pavements",
      "Tank farm foundations & bund walls",
      "Utility trenches, culverts & storm drains",
      "Adherence to Plant Safety (EHS) manuals"
    ],
    equipmentUsed: ["Road Rollers", "Motor Graders", "Transit Mixers", "Total Stations"],
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
    iconName: "Factory"
  },
  {
    id: "site-development",
    title: "Site Development",
    category: "earthwork",
    shortDescription: "Transforming raw plots into ready-to-build industrial and commercial project campuses.",
    fullDescription: "Complete site preparation including topographical survey, land clearing, earth grading, road alignments, utility layouts, and peripheral fencing.",
    features: [
      "Site grading and elevation leveling",
      "Internal access road development (WBM/Concrete)",
      "Stormwater drainage network creation",
      "Site demarcation and secure perimeter walls"
    ],
    equipmentUsed: ["Bulldozer", "Hydraulic Excavators", "Soil Compactors", "Tipper Trucks"],
    imageUrl: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=900&q=80",
    iconName: "MapPin"
  },
  {
    id: "earthwork",
    title: "Earthwork",
    category: "earthwork",
    shortDescription: "Bulk excavation, land filling, soil compaction, and embankment construction.",
    fullDescription: "Efficient heavy earthmoving operations with calibrated machinery capable of moving large volumes of soil, sand, and gravel within tight project schedules.",
    features: [
      "Deep basement & trench excavation",
      "Borrow earth & sand filling",
      "Controlled layer compaction with Proctor tests",
      "Shoring and slope stability management"
    ],
    equipmentUsed: ["Heavy Excavators", "Vibratory Soil Compactors", "Dumpers/Hyva", "Backhoe Loaders"],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    iconName: "Shovel"
  },
  {
    id: "equipment-support",
    title: "Construction Equipment Support",
    category: "industrial",
    shortDescription: "Fleet deployment and equipment leasing support with certified operators for construction and piling works.",
    fullDescription: "Providing well-maintained piling rigs, cranes, concrete mixers, and generators along with trained technical crews to ensure uninterrupted site operations.",
    features: [
      "Fully inspected & certified machinery",
      "Experienced equipment operators & riggers",
      "On-site mechanical maintenance backup",
      "Flexible short-term and project-term mobilization"
    ],
    equipmentUsed: ["Piling Rigs", "Mobile Cranes", "Diesel Gensets", "Concrete Machinery"],
    imageUrl: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80",
    iconName: "Truck"
  }
];

export const PILING_CAPABILITIES: PilingFeature[] = [
  {
    id: "bored-cast-in-situ",
    title: "Bored Cast-in-situ Piles",
    description: "Deep foundation piles formed by drilling boreholes into the ground using rotary rigs, stabilizing with bentonite mud, inserting steel cages, and concrete pouring via tremie pipe.",
    diameterRange: "450mm – 1200mm+",
    depthRange: "Up to 35+ meters",
    bestFor: "Industrial complexes, heavy civil structures, bridges, and high-load installations in West Bengal soil conditions.",
    iconName: "Drill"
  },
  {
    id: "foundation-piling",
    title: "Foundation Piling for High-Loads",
    description: "Specialized high-capacity pile groups engineered to transfer massive compressive, uplift, and lateral forces down to hard rock or dense sand strata.",
    diameterRange: "500mm – 1000mm",
    depthRange: "Site specific geotechnical design",
    bestFor: "Multi-story buildings, heavy machinery foundations, and industrial silos.",
    iconName: "Layers"
  },
  {
    id: "industrial-structures",
    title: "Piling for Industrial Structures",
    description: "Tailored piling configurations built to resist severe dynamic vibrations, chemical exposures, and coastal soil dampness common in the Haldia port corridor.",
    diameterRange: "600mm – 1200mm",
    depthRange: "Deep bearing strata",
    bestFor: "Petrochemical units, storage tank farms, power substations, and processing plants.",
    iconName: "Factory"
  },
  {
    id: "commercial-piling",
    title: "Piling for Commercial Buildings",
    description: "Low-vibration and low-noise bored piling methodology suitable for commercial shopping plazas, institutional campuses, and residential complexes.",
    diameterRange: "450mm – 750mm",
    depthRange: "15m – 30m",
    bestFor: "Commercial complexes, hospital blocks, educational buildings, and warehouses.",
    iconName: "Building2"
  },
  {
    id: "heavy-foundation-works",
    title: "Heavy Foundation Works & Pile Caps",
    description: "Seamless integration of bored piles with high-tensile reinforced pile caps, grade tie beams, and column stubs for unified structural behavior.",
    bestFor: "Crane gantry foundations, chimney bases, and heavy vibrating equipment pads.",
    iconName: "Shield"
  },
  {
    id: "site-prep-civil",
    title: "Site Preparation & Pile-Related Civil Works",
    description: "Complete pre-piling earth leveling, guide-wall casting, pile head chipping, cutoff leveling, and static pile load testing support.",
    bestFor: "Initial ground stabilization, bore clearance, and pile integrity testing readiness.",
    iconName: "Wrench"
  }
];

export const PILING_PROCESS_STEPS = [
  {
    step: "01",
    title: "Geotechnical Survey & Layout",
    description: "Accurate coordinate setting with Total Station and review of soil strata characteristics (Standard Penetration Test logs)."
  },
  {
    step: "02",
    title: "Borehole Drilling & Bentonite Stabilization",
    description: "Rotary drilling to target depth with continuous bentonite mud circulation to prevent borehole wall collapse."
  },
  {
    step: "03",
    title: "Rebar Cage Lowering & Centering",
    description: "Fabrication of certified Fe500D steel reinforcement cages with cover blocks, followed by precise vertical crane lowering."
  },
  {
    step: "04",
    title: "Tremie Concrete Pouring",
    description: "Displacement casting using clean tremie pipes to ensure homogenous concrete from bottom to top without segregation."
  },
  {
    step: "05",
    title: "Pile Integrity & Cap Integration",
    description: "Pile cutoff chipping to sound concrete level, non-destructive PIT checks, and integration into monolithic RCC pile caps."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Established Since 2011",
    description: "Proven operational track record in Haldia and across West Bengal with dedicated focus on civil and deep piling contracting.",
    iconName: "Calendar"
  },
  {
    title: "Experienced Team",
    description: "Rig operators, civil site engineers, and project supervisors with years of on-ground foundation execution experience.",
    iconName: "Users"
  },
  {
    title: "Quality Workmanship",
    description: "Strict adherence to Indian Standards (IS 2911 for piling, IS 456 for concrete) and client technical specifications.",
    iconName: "Award"
  },
  {
    title: "Safety First Culture",
    description: "Rigorous personal protective equipment (PPE) enforcement, daily toolbox talks, and proactive site hazard mitigation.",
    iconName: "ShieldCheck"
  },
  {
    title: "Professional Execution",
    description: "Systematic project scheduling, progress reporting, material testing documentation, and clear client communication.",
    iconName: "CheckCircle2"
  },
  {
    title: "Reliable Service",
    description: "Consistent support, responsive site mobilization, and dependable machinery maintenance to keep sites running.",
    iconName: "Clock"
  },
  {
    title: "Timely Project Completion",
    description: "Targeted milestone planning and synchronized equipment-material pipelines to deliver on agreed deadlines.",
    iconName: "Zap"
  },
  {
    title: "Customer-Focused Approach",
    description: "Collaborative engagement with project owners, EPC contractors, and structural consultants from design to handover.",
    iconName: "HeartHandshake"
  }
];

export const MAJOR_CLIENTS = [
  { 
    name: "Exide Industries Limited", 
    short: "EXIDE", 
    tagline: "Industrial Battery & Energy Systems",
    highlight: "Deep Foundation Piling, Heavy Machine Slabs & Plant Infrastructure Works",
    location: "Haldia & West Bengal Manufacturing Plants"
  },
  { 
    name: "Tata Projects / Tata Group", 
    short: "TATA", 
    tagline: "Engineering, Procurement & Construction",
    highlight: "Heavy Industrial Civil & Structural Foundation Packages under Strict EHS Norms",
    location: "National Infrastructure Projects"
  },
  { 
    name: "Adani Infra / Adani Group", 
    short: "ADANI", 
    tagline: "Ports, Energy & Logistics Infrastructure",
    highlight: "Large-Scale Substructure Civil Works, Soil Stabilization & Deep Piling Solutions",
    location: "Port, Energy & Industrial Corridors"
  },
  { 
    name: "ITC Limited", 
    short: "ITC", 
    tagline: "Manufacturing, Packaging & Logistics Hubs",
    highlight: "Precision Industrial Civil Construction, PEB Footings & Monolithic Floor Slabs",
    location: "Eastern Region Processing & Logistics Campuses"
  },
  { 
    name: "Ruchi Infra Services / Infrastructure", 
    short: "RUCHI", 
    tagline: "Port Terminals & Industrial Infrastructure",
    highlight: "High-Capacity Bored Cast-in-Situ Foundation Piling & Coastal Jetty Substructures",
    location: "Haldia Port & Industrial Belt, WB"
  },
  { 
    name: "Larsen & Toubro Limited", 
    short: "L&T", 
    tagline: "Global EPC & Heavy Infrastructure",
    highlight: "River Bank Transmission Piling & Substation Substructures at Krishna River",
    location: "EHV Transmission Lines & River Crossing Corridors"
  },
  { 
    name: "Jindal India Limited", 
    short: "JINDAL", 
    tagline: "Steel, Energy & Heavy Manufacturing",
    highlight: "Sheet Piling, PEB Structures & Heavy Triple Pot Furnace Foundations",
    location: "West Bengal Manufacturing Complexes"
  },
  { 
    name: "Power Grid Corporation of India Ltd", 
    short: "PGCIL", 
    tagline: "Central Transmission Utility of India",
    highlight: "765kV KMTL EHV Tower Piling, High-Load Foundation Rings & Pile Built-Up",
    location: "National Power Transmission Corridors"
  }
];

export const PROJECTS: ProjectItem[] = [
  // ================= CURRENT & ONGOING PROJECTS =================
  {
    id: "proj-current-ceratizit",
    title: "Industrial Foundation & Civil Package at Ceratizit India Pvt Ltd",
    client: "Ceratizit India Private Limited",
    location: "Industrial Corridor, West Bengal",
    typeOfWork: "Precision Machine Foundations, Bored Piling & Heavy Industrial Civil Works",
    category: "industrial",
    description: "Execution of high-precision heavy machinery foundations, rotary bored cast-in-situ piling, vibration-isolated RCC equipment slabs, and factory civil structural expansion works for Ceratizit India Private Limited.",
    isPlaceholder: false,
    status: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
    year: "Current Project (2025 - 2026)",
    highlights: [
      "Vibration-Isolated Dynamic Machine Slabs",
      "Rotary Bored Piling (600mm - 900mm dia)",
      "High-Grade M35/M40 Reinforced Concrete",
      "Precision Equipment Anchor Bolt Alignment"
    ]
  },
  {
    id: "proj-current-ruchi-infra",
    title: "Deep Piling & Infrastructure Package at Ruchi Infra Services, Haldia",
    client: "Ruchi Infra Services, Haldia",
    location: "Haldia Industrial & Port Corridor, West Bengal",
    typeOfWork: "High-Capacity Bored Cast-in-Situ Piling & Site Infrastructure",
    category: "piling",
    description: "Active high-capacity bored cast-in-situ foundation piling contract, coastal bentonite soil stabilization, and infrastructure civil development for Ruchi Infra Services at Haldia.",
    isPlaceholder: false,
    status: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80",
    year: "Current Project (2025 - 2026)",
    highlights: [
      "Haldia Coastal Soil Piling Operations",
      "Continuous Bentonite Slurry Circulation",
      "Heavy Pile Caps & Reinforced Grade Slabs",
      "Rapid Fleet Mobilization from Haldia Base"
    ]
  },
  {
    id: "proj-current-shreeji-propack",
    title: "Manufacturing Plant & PEB Substructures at Shreeji Propack Pvt Ltd",
    client: "Shreeji Propack Private Limited",
    location: "Industrial Manufacturing Zone, West Bengal",
    typeOfWork: "PEB Foundation Footings, Column Pedestals & Heavy Industrial Flooring",
    category: "civil",
    description: "Turnkey industrial civil execution including Pre-Engineered Building (PEB) heavy column pedestals, millimeter-accuracy anchor bolt casting, foundation tie beams, and high-load industrial floor slabs for Shreeji Propack Private Limited.",
    isPlaceholder: false,
    status: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    year: "Current Project (2025 - 2026)",
    highlights: [
      "Pre-Engineered Building (PEB) Structural Footings",
      "Heavy Load-Bearing Industrial Floor Concreting",
      "Precision Anchor Bolt Jig Setting",
      "Underground Cable Ducts & Storm Drainage"
    ]
  },
  {
    id: "proj-current-rg-baruah-stadium",
    title: "Deep Piling & Substructure at RG Baruah Nehru Stadium",
    client: "RG Baruah Nehru Stadium Infrastructure Authority",
    location: "Nehru Stadium Sports Complex, Guwahati / North-East Hub",
    typeOfWork: "Stadium Grandstand & High-Mast Light Tower Bored Piling & RCC Footings",
    category: "piling",
    description: "Execution of specialized deep bored foundation piling, high-capacity monolithic pile caps, and RCC structural footings for stadium grandstands, public concourses, and high-mast floodlight towers at the iconic RG Baruah Nehru Stadium.",
    isPlaceholder: false,
    status: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    year: "Current Project (2025 - 2026)",
    highlights: [
      "High-Mast Floodlight Tower Foundation Piles",
      "Stadium Grandstand Heavy Raft & Pile Caps",
      "IS 2911 Static Load Test Compliance",
      "High-Traffic Public Infrastructure Engineering"
    ]
  },
  {
    id: "proj-current-ganesh-complex",
    title: "Logistics Warehouse Substructure at Ganesh Complex, Ranihati",
    client: "Ganesh Complex Industrial Logistics Hub",
    location: "Ranihati, NH-16 / Howrah Industrial Corridor, West Bengal",
    typeOfWork: "Commercial Warehouse Foundation Piling, Plinth Beams & Yard Hardstanding",
    category: "civil",
    description: "Large-scale commercial logistics warehouse foundation package comprising bored piling, heavy reinforced plinth beams, high-load industrial slab casting, and drainage network at Ganesh Complex, Ranihati.",
    isPlaceholder: false,
    status: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80",
    year: "Current Project (2025 - 2026)",
    highlights: [
      "Large-Scale Logistics Hub Substructures",
      "High-Volume Bored Cast-In-Situ Piling",
      "Continuous Heavy Plinth Beam Grids",
      "Heavy Axle-Load Yard Hardstanding"
    ]
  },

  // ================= MAJOR COMPLETED PROJECTS =================
  {
    id: "proj-lt-pgcil-krishna",
    title: "Tower Foundation for L&T - PGCIL at Krishna River Bank",
    client: "Larsen & Toubro Limited (L&T) / PGCIL",
    location: "Krishna River Bank Corridor",
    typeOfWork: "River Bank Deep Bored Piling & Scour-Resistant Pile Caps",
    category: "piling",
    description: "High-capacity bored cast-in-situ piling and massive monolithic pile caps executed along the active Krishna River bank for critical river-crossing power transmission towers under L&T - PGCIL specifications.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "L&T & PGCIL Joint High-Voltage Specifications",
      "Active River Bank Geological Conditions",
      "Heavy Scour-Resistant RCC Pile Caps",
      "Tremie Concreting with Mud Stability"
    ]
  },
  {
    id: "proj-tata-industrial",
    title: "Heavy Industrial Civil & Foundation Package for TATA Projects",
    client: "TATA Projects / Tata Group",
    location: "Industrial Corridor, West Bengal",
    typeOfWork: "Heavy Industrial Civil Infrastructure & Equipment Foundations",
    category: "industrial",
    description: "Comprehensive execution of heavy industrial equipment pedestals, deep foundation piling, monolithic raft foundations, and structural civil works executed under stringent TATA engineering and safety benchmarks.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Strict TATA EHS & Quality Benchmarks",
      "High-Strength RCC Machine Foundations",
      "Heavy Structural Reinforcement Fabrication",
      "Zero-Incident Milestone Execution"
    ]
  },
  {
    id: "proj-jil-sheet-pile",
    title: "Sheet Pile & Deep Excavation at Jindal India Ltd (WB)",
    client: "Jindal India Limited (JINDAL)",
    location: "Jangalpur / Howrah & West Bengal Facility",
    typeOfWork: "Sheet Piling, Shoring & Deep Bulk Excavation",
    category: "piling",
    description: "Turnkey driving of interlocking steel sheet piles, ground stabilization shoring, dewatering control, and deep bulk earth excavation for heavy manufacturing equipment installations at Jindal India Ltd (WB).",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Interlocking Steel Sheet Piles Driving",
      "Deep Pit Shoring & Earth Retention",
      "Bulk Soil Excavation & Dewatering Control",
      "Zero Ground Settlement Around Plant"
    ]
  },
  {
    id: "proj-jil-triple-pot",
    title: "Triple Pot Foundation at Jindal India Ltd (JIL WB)",
    client: "Jindal India Limited (JINDAL)",
    location: "West Bengal Manufacturing Plant",
    typeOfWork: "Heavy Triple Pot Industrial Furnace / Vessel Foundation",
    category: "industrial",
    description: "Specialized, monolithic heavy reinforced concrete foundation engineered for Triple Pot industrial furnace / vessel units at Jindal India Ltd, designed to withstand intense dynamic loads and thermal stresses.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Triple Pot Industrial Vessel Substructure",
      "Thermal & Dynamic Stress Resistance",
      "Dense Rebar Cage Staging & Shuttering",
      "High-Grade Controlled Monolithic Pour"
    ]
  },
  {
    id: "proj-jil-peb",
    title: "PEB Foundation Work at Jindal India Ltd (JIL WB)",
    client: "Jindal India Limited (JINDAL)",
    location: "West Bengal Manufacturing Campus",
    typeOfWork: "Pre-Engineered Building (PEB) Foundations & Pedestals",
    category: "civil",
    description: "Complete turnkey foundation construction for Pre-Engineered Buildings (PEB), encompassing high-accuracy anchor bolt setting, reinforced column pedestals, grade tie beams, and industrial heavy-duty flooring at JIL WB.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Pre-Engineered Building (PEB) Footings",
      "Millimeter-Tolerance Anchor Bolt Casting",
      "Heavy Column Pedestals & Tie Beams",
      "Industrial High-Load Slab Concreting"
    ]
  },
  {
    id: "proj-sunlight-industrial",
    title: "Industrial Foundation & Substructure Package for SUNLIGHT",
    client: "SUNLIGHT Group / Infrastructure",
    location: "Industrial Hub, West Bengal",
    typeOfWork: "Bored Piling, Earthwork & Industrial Heavy Substructures",
    category: "industrial",
    description: "Execution of site grading, deep bored foundation piling, heavy machinery base casting, and drainage channels for SUNLIGHT industrial facilities.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Heavy Machine Foundation Blocks",
      "Site Grading & Deep Bored Piling",
      "High-Strength Concrete Formwork",
      "On-Time Project Handover"
    ]
  },
  {
    id: "proj-pgcil-kmtl",
    title: "Pile Built Up at PGCIL's 765KV KMTL",
    client: "Power Grid Corporation of India Limited (PGCIL)",
    location: "765kV KMTL Transmission Line Corridor",
    typeOfWork: "Deep Bored Piling & 765kV EHV Tower Pile Built-Up",
    category: "piling",
    description: "Successful execution of specialized pile built-up, heavy-duty rotary bored cast-in-situ piling, and high-load foundation integration for 765kV Extra High Voltage (EHV) transmission line towers for PGCIL.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "765kV EHV Extra High Voltage Line",
      "High-Torque Pile Built-Up Execution",
      "Rotary Bored Cast-In-Situ Piling",
      "Strict PGCIL Technical Compliance"
    ]
  },
  {
    id: "proj-uail-rayagada",
    title: "Foundation Work at UAIL - Rayagada",
    client: "Utkal Alumina International Limited (UAIL - Aditya Birla Group)",
    location: "Rayagada, Odisha",
    typeOfWork: "Heavy Industrial Equipment & Structural Foundation",
    category: "industrial",
    description: "Execution of heavy industrial machinery foundations, high-grade reinforced concrete pedestals, raft footings, and structural civil substructures for UAIL's alumina refinery complex at Rayagada.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Heavy Industrial Plant Foundations",
      "High-Strength Concrete (M35/M40 Grade)",
      "Strict Industrial EHS Protocols",
      "Precision Equipment Anchor Casting"
    ]
  },
  {
    id: "proj-creek-gujarat",
    title: "Tower Foundation at Creek, Gujarat",
    client: "Power Transmission & Coastal Infrastructure",
    location: "Creek / Tidal Wetland Corridor, Gujarat",
    typeOfWork: "Marine Creek Deep Tower Foundation & Saline Soil Piling",
    category: "piling",
    description: "Specialized deep foundation piling and heavy RCC tower footing in challenging coastal tidal creek terrain with aggressive saline soil conditions, customized liner casing, and anti-corrosive concrete mixes.",
    isPlaceholder: false,
    status: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
    year: "Completed",
    highlights: [
      "Marine Tidal Creek Environment",
      "Specialized Saline Soil Stabilization",
      "Deep Steel Liner Casing Driving",
      "Anti-Corrosion Concrete Protection"
    ]
  }
];

export const EQUIPMENT_FLEET: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "Piling Rig (Rotary & Cast-In-Situ)",
    category: "Piling & Drilling",
    specification: "Hydraulic Rotary & Winch-Operated Piling Units with Bentonite circulation accessories",
    capacity: "Diameters: 450mm – 1200mm | Depth: Up to 35m+",
    status: "Ready for Deployment",
    description: "Heavy-duty piling rigs equipped for fast drilling through clayey, sandy, and mixed strata typical of coastal West Bengal.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "eq-2",
    name: "Heavy Hydraulic Excavator",
    category: "Earthmoving & Trenching",
    specification: "Tracked Hydraulic Excavators with heavy bucket & rock breaker attachments",
    capacity: "Bucket Capacity: 0.9 – 1.2 m³",
    status: "Ready for Deployment",
    description: "High-power excavators utilized for bulk site clearance, deep trench excavation, soil loading, and site development.",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "eq-3",
    name: "Mobile & Crawler Crane",
    category: "Lifting & Cage Handling",
    specification: "Hydraulic Telescopic / Lattice Boom Cranes for cage insertion & rig handling",
    capacity: "15 – 40 Tonnes Lifting Capacity",
    status: "Ready for Deployment",
    description: "Essential for precision lowering of heavy steel reinforcement pile cages, tremie pipe maneuvering, and heavy material handling.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "eq-4",
    name: "Concrete Equipment & Transit Mixers",
    category: "Concrete Handling",
    specification: "Transit Mixers, High-Volume Concrete Pumps, Tremie Sets & High-Frequency Vibrators",
    capacity: "Continuous Tremie Flow Rate",
    status: "Ready for Deployment",
    description: "Maintains optimal concrete slump and continuous displacement pouring during deep piling and monolithic pile cap casting.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "eq-5",
    name: "Heavy Diesel Generator",
    category: "Site Power Support",
    specification: "Acoustic Enclosed Diesel Generating Sets with auto-switchgear",
    capacity: "62.5 kVA – 125 kVA Output",
    status: "Ready for Deployment",
    description: "Ensures round-the-clock uninterrupted power for bentonite pumps, welding rectifiers, site lighting, and camp utilities.",
    imageUrl: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "eq-6",
    name: "General Construction Machinery",
    category: "Site Operations",
    specification: "Vibratory Soil Compactors, Total Stations, Bar Benders, Water Tankers & Tippers",
    capacity: "Multi-Unit Fleet",
    status: "Ready for Deployment",
    description: "A complete auxiliary fleet to support earth compaction, accurate surveying, structural rebar fabrication, and site logistics.",
    imageUrl: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=900&q=80"
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-1",
    title: "Piling Rig Operator (Hydraulic / Winch)",
    department: "Piling & Ground Engineering",
    location: "Haldia & West Bengal Sites",
    type: "Full-time",
    experience: "3+ Years in Bored Cast-In-Situ Piling",
    description: "Responsible for operating rotary/winch piling rigs, borehole alignment, tooling maintenance, and coordination during tremie concrete pours.",
    requirements: [
      "Minimum 3 years experience operating piling rigs on civil/industrial sites",
      "Knowledge of bentonite mud circulation and borehole stabilization",
      "Strong commitment to site safety and equipment maintenance"
    ]
  },
  {
    id: "job-2",
    title: "Civil Site Engineer (Piling & Foundation)",
    department: "Engineering & Operations",
    location: "Haldia / Sutahata, West Bengal",
    type: "Full-time",
    experience: "2–5 Years in Civil / Foundation Construction",
    description: "Oversee daily piling execution, coordinate soil test logs, supervise steel cage fabrication, manage concrete cube tests, and prepare daily progress reports (DPR).",
    requirements: [
      "Diploma or B.Tech/B.E. in Civil Engineering",
      "Understanding of IS 2911 Piling standards and IS 456 concrete norms",
      "Proficiency in site measurement, leveling, and client coordination"
    ]
  },
  {
    id: "job-3",
    title: "Site Safety Supervisor (EHS)",
    department: "Safety & Quality Control",
    location: "Project Sites, West Bengal",
    type: "Full-time",
    experience: "2+ Years in Construction / Industrial Safety",
    description: "Conduct daily toolbox talks, inspect crane rigging and piling areas, enforce PPE compliance, and ensure zero-incident site protocols.",
    requirements: [
      "Certification in Industrial Safety / EHS (Govt. recognized)",
      "Knowledge of excavation safety, heavy equipment hazards, and emergency response",
      "Good communication skills in Bengali, Hindi, and English"
    ]
  },
  {
    id: "job-4",
    title: "RCC & Rebar Foreman",
    department: "Civil & Structural",
    location: "Haldia, West Bengal",
    type: "Full-time",
    experience: "4+ Years in Rebar Cage Fabrication & Shuttering",
    description: "Lead teams of bar benders and carpenters for pile cage fabrication, pile cap shuttering, and precision reinforcement placement.",
    requirements: [
      "Strong drawing reading skills for structural BBS (Bar Bending Schedules)",
      "Leadership ability to manage site labor and ensure quality finish",
      "Experience with high-strength TMT rebar placement and cover control"
    ]
  },
  {
    id: "job-5",
    title: "Heavy Equipment Mechanic / Electrician",
    department: "Plant & Machinery Maintenance",
    location: "Haldia Central Workshop & Sites",
    type: "Full-time",
    experience: "3+ Years in Hydraulic Machinery Maintenance",
    description: "Perform preventive and breakdown maintenance on diesel engines, hydraulic systems, bentonite pumps, and generators.",
    requirements: [
      "ITI / Diploma in Mechanical or Automobile Engineering",
      "Hands-on diagnostic experience with hydraulic valves, pumps, and winches",
      "Ability to troubleshoot in field conditions"
    ]
  }
];
