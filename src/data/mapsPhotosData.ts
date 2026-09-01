export interface MapLocation {
  id: string;
  name: string;
  category: 'headquarters' | 'current_project' | 'completed_project';
  address: string;
  districtState: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  clientOrFacility: string;
  scopeOfWork: string;
  status: 'Head Office' | 'Current Site' | 'Completed Project';
  googleMapsQueryUrl: string;
  embedUrl: string;
  sitePhoto: string;
  highlights: string[];
}

export interface SitePhotoItem {
  id: string;
  title: string;
  projectName: string;
  locationName: string;
  category: 'piling' | 'industrial' | 'civil' | 'office_fleet' | 'user_uploaded';
  imageUrl: string;
  dateTaken: string;
  uploader: string;
  isVerified: boolean;
  googleMapQueryUrl?: string;
  description: string;
  tags: string[];
  specs?: string;
}

export const GOOGLE_MAPS_OFFICIAL_QUERY = "https://www.google.com/maps/search/?api=1&query=Sri+SJ+Constructions+Private+Limited+Sutahata+Haldia+West+Bengal+721635";

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "loc-hq-sutahata",
    name: "Headquarters & Central Equipment Yard",
    category: "headquarters",
    address: "Haldia, Sutahata, Nandarampur",
    districtState: "Purba Medinipur, West Bengal – 721635",
    coordinates: { lat: 22.1287, lng: 88.0833 },
    clientOrFacility: "SRI SJ CONSTRUCTIONS PRIVATE LIMITED",
    scopeOfWork: "Corporate Headquarters, Heavy Piling Rig Yard & Engineering Center",
    status: "Head Office",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Sutahata+Haldia+West+Bengal+721635+Sri+SJ+Constructions",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59049.25608678036!2d88.0833!3d22.1287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f06c117d3d25%3A0x86133ffaa33aa2e1!2sSutahata%2C%20Haldia%2C%20West%20Bengal%20721635!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80",
    highlights: ["Central Rig & Winch Fleet", "Registered CIN Base", "24/7 Deployment Cell"]
  },
  {
    id: "loc-cur-ceratizit",
    name: "Ceratizit India Private Limited Site",
    category: "current_project",
    address: "Industrial Growth Corridor",
    districtState: "West Bengal, India",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    clientOrFacility: "Ceratizit India Private Limited",
    scopeOfWork: "Precision Heavy Machinery Foundations, Rotary Bored Piling & RCC Slabs",
    status: "Current Site",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Ceratizit+India+Private+Limited+West+Bengal",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35231268715!2d88.2649509!3d22.5355649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
    highlights: ["Vibration-Isolated Slabs", "High-Strength M40 Concrete", "Precision Alignment"]
  },
  {
    id: "loc-cur-ruchi-infra",
    name: "Ruchi Infra Services Site",
    category: "current_project",
    address: "Haldia Industrial & Port Belt",
    districtState: "Haldia, Purba Medinipur, WB – 721602",
    coordinates: { lat: 22.0625, lng: 88.0645 },
    clientOrFacility: "Ruchi Infra Services, Haldia",
    scopeOfWork: "High-Capacity Bored Cast-in-Situ Piling & Coastal Soil Stabilization",
    status: "Current Site",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Ruchi+Infra+Services+Haldia+West+Bengal",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59102.39201509378!2d88.0325157!3d22.0625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f928e4693a15%3A0xda5918e97fca7c90!2sHaldia%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80",
    highlights: ["Bentonite Slurry Piling", "Marine Coastal Strata", "Rapid Mobilization"]
  },
  {
    id: "loc-cur-shreeji",
    name: "Shreeji Propack Private Limited Site",
    category: "current_project",
    address: "Manufacturing & Packaging Zone",
    districtState: "West Bengal, India",
    coordinates: { lat: 22.4837, lng: 88.1924 },
    clientOrFacility: "Shreeji Propack Private Limited",
    scopeOfWork: "PEB Column Pedestals, Anchor Bolt Casting & Heavy Industrial Flooring",
    status: "Current Site",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Shreeji+Propack+Private+Limited+West+Bengal",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117950.0!2d88.1924!3d22.4837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027725e24b4f17%3A0x6b1897c88b704c74!2sHowrah%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000003!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    highlights: ["Pre-Engineered Building Substructures", "High-Load Slabs", "Tie Beam Networks"]
  },
  {
    id: "loc-cur-stadium",
    name: "RG Baruah Nehru Stadium Site",
    category: "current_project",
    address: "Nehru Stadium Sports Hub",
    districtState: "Guwahati / North-East Hub",
    coordinates: { lat: 26.1820, lng: 91.7580 },
    clientOrFacility: "RG Baruah Nehru Stadium Authority",
    scopeOfWork: "Grandstand Substructures & High-Mast Light Tower Bored Piling",
    status: "Current Site",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=RG+Baruah+Nehru+Stadium+Guwahati",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57303.17726593581!2d91.7288673!3d26.1820377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a597a7e780a47%3A0x5a18a99478f72671!2sNehru%20Stadium%2C%20Guwahati!5e0!3m2!1sen!2sin!4v1700000000004!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    highlights: ["High-Mast Tower Foundations", "Heavy Grandstand Rafts", "IS 2911 Load Testing"]
  },
  {
    id: "loc-cur-ganesh-complex",
    name: "Ganesh Complex Logistics Site",
    category: "current_project",
    address: "NH-16 Logistics Corridor, Ranihati",
    districtState: "Howrah, West Bengal – 711302",
    coordinates: { lat: 22.5850, lng: 88.1750 },
    clientOrFacility: "Ganesh Complex Industrial Logistics Hub",
    scopeOfWork: "Commercial Warehouse Bored Piling, Reinforced Plinth & Yard Hardstanding",
    status: "Current Site",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Ganesh+Complex+Ranihati+Howrah+West+Bengal",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58954.21852924108!2d88.1450000!3d22.5850000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0280145c26b5d9%3A0x6b2e0dc316279f0!2sRanihati%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000005!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80",
    highlights: ["Heavy Axle Yard Slabs", "Deep Warehouse Bored Piles", "Continuous Plinth Grids"]
  },
  {
    id: "loc-cmp-jindal",
    name: "Jindal India Limited (JIL WB) Facility",
    category: "completed_project",
    address: "Jangalpur Industrial Zone, Howrah",
    districtState: "West Bengal, India",
    coordinates: { lat: 22.6100, lng: 88.2400 },
    clientOrFacility: "Jindal India Limited (JINDAL)",
    scopeOfWork: "Sheet Piling, Shoring, PEB Foundations & Heavy Triple Pot Vessel Substructures",
    status: "Completed Project",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Jindal+India+Limited+Jangalpur+Howrah+West+Bengal",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58930.0!2d88.2400!3d22.6100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02778747970d47%3A0x5a18a99478f72671!2sJangalpur%2C%20Howrah%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000006!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    highlights: ["Sheet Piling & Shoring", "Triple Pot Furnace Base", "Zero Plant Settlement"]
  },
  {
    id: "loc-cmp-lt-krishna",
    name: "L&T - PGCIL Krishna River Bank Corridor",
    category: "completed_project",
    address: "High-Voltage River Crossing Corridor",
    districtState: "Krishna River Basin, India",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    clientOrFacility: "Larsen & Toubro (L&T) / PGCIL",
    scopeOfWork: "River Bank Deep Bored Piling & Scour-Resistant Heavy Monolithic Pile Caps",
    status: "Completed Project",
    googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Larsen+and+Toubro+Power+Grid+Krishna+River",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122340.0!2d80.6480!3d16.5062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9482d944b%3A0x939b7e84ab4a0265!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000007!5m2!1sen!2sin",
    sitePhoto: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80",
    highlights: ["L&T & PGCIL Joint Specs", "High Scour Resistance", "Tremie Slurry Concreting"]
  }
];

export const INITIAL_SITE_PHOTOS: SitePhotoItem[] = [
  {
    id: "photo-1",
    title: "Hydraulic Rotary Bored Piling Operations",
    projectName: "PGCIL 765kV KMTL / Ruchi Infra Haldia",
    locationName: "Haldia Industrial Hub, West Bengal",
    category: "piling",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Active Site Photography",
    uploader: "Sri SJ Chief Piling Engineer",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Sutahata+Haldia+West+Bengal+721635+Sri+SJ+Construction",
    description: "Hydraulic rotary rig actively drilling deep bored cast-in-situ foundation pile with continuous bentonite slurry circulation.",
    tags: ["Rotary Piling", "Bored Cast-in-Situ", "Haldia", "IS 2911"],
    specs: "Diameter: 750mm | Depth: 28m | Bentonite Slurry"
  },
  {
    id: "photo-2",
    title: "Interlocking Steel Sheet Piling & Shoring",
    projectName: "Jindal India Limited (JIL WB)",
    locationName: "Jangalpur / Howrah, West Bengal",
    category: "piling",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Verified Project Site",
    uploader: "Sri SJ Geotechnical Division",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Jindal+India+Limited+Howrah+West+Bengal",
    description: "Interlocking steel sheet piles driven to create a watertight retention barrier for deep industrial machine pit excavation.",
    tags: ["Sheet Piling", "Deep Pit Shoring", "Jindal India Ltd", "Dewatering"],
    specs: "Sheet Pile Length: 12m | Deep Pit Depth: 7.5m"
  },
  {
    id: "photo-3",
    title: "Heavy Machine Vibration-Isolated Foundation",
    projectName: "Ceratizit India Private Limited",
    locationName: "Industrial Growth Corridor, West Bengal",
    category: "industrial",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Current Active Contract",
    uploader: "Sri SJ Structural Civil Team",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Ceratizit+India+Private+Limited+West+Bengal",
    description: "Monolithic reinforced concrete machinery slab cast with high-precision anchor bolts and dynamic vibration damping joints.",
    tags: ["Ceratizit India", "Vibration-Isolated", "Machine Slab", "M40 Grade"],
    specs: "Concrete Grade: M40 | Anchor Tolerance: ±1.0mm"
  },
  {
    id: "photo-4",
    title: "Heavy Triple Pot Vessel Substructure & Staging",
    projectName: "Jindal India Limited (JIL WB)",
    locationName: "West Bengal Manufacturing Plant",
    category: "industrial",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Verified Project Site",
    uploader: "Sri SJ Industrial Foundations Team",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Jindal+India+Limited+West+Bengal",
    description: "Massive reinforced concrete foundation block designed for high thermal resistance and heavy dynamic industrial pot loads.",
    tags: ["Triple Pot Base", "Industrial Vessel", "Thermal Resistant", "JINDAL"],
    specs: "Reinforced Rebar Cage: Fe 500D | High-Volume Pour"
  },
  {
    id: "photo-5",
    title: "PEB Column Pedestals & Foundation Grid",
    projectName: "Shreeji Propack Private Limited",
    locationName: "Industrial Manufacturing Zone, West Bengal",
    category: "civil",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Current Active Contract",
    uploader: "Sri SJ PEB Construction Desk",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Shreeji+Propack+Private+Limited",
    description: "Turnkey Pre-Engineered Building footings, reinforced concrete column pedestals, and tie beam framework for factory shed.",
    tags: ["Shreeji Propack", "PEB Foundations", "Column Pedestals", "Anchor Jigs"],
    specs: "Pedestal Grid: 36 Columns | High-Precision Bolt Jig"
  },
  {
    id: "photo-6",
    title: "Stadium Grandstand & High-Mast Tower Footings",
    projectName: "RG Baruah Nehru Stadium",
    locationName: "Nehru Stadium Sports Complex",
    category: "piling",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Current Active Contract",
    uploader: "Sri SJ Infrastructure Division",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=RG+Baruah+Nehru+Stadium+Guwahati",
    description: "Deep foundation piling and monolithic raft pile caps for grandstand expansion and 45-meter floodlight mast towers.",
    tags: ["RG Baruah Stadium", "High-Mast Tower", "Grandstand Raft", "Deep Piling"],
    specs: "High-Mast Depth: 32m | Static Load Test: 250 Ton"
  },
  {
    id: "photo-7",
    title: "Commercial Warehouse Piling & Heavy Plinth Grid",
    projectName: "Ganesh Complex, Ranihati",
    locationName: "NH-16 Logistics Corridor, Howrah, WB",
    category: "civil",
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Current Active Contract",
    uploader: "Sri SJ Site Civil Engineer",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Ganesh+Complex+Ranihati+Howrah+West+Bengal",
    description: "Large logistics warehouse foundation package including bored piling, continuous heavy plinth beams, and laser-screed flooring.",
    tags: ["Ganesh Complex Ranihati", "Logistics Hub", "Plinth Grid", "Warehouse Piling"],
    specs: "Warehouse Area: 85,000 sq ft | Heavy Axle Rating"
  },
  {
    id: "photo-8",
    title: "Central Equipment Yard & Rig Mobilization Hub",
    projectName: "SRI SJ Central Operations Base",
    locationName: "Haldia, Sutahata, Nandarampur – 721635",
    category: "office_fleet",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    dateTaken: "Corporate HQ Photography",
    uploader: "Sri SJ Operations Management",
    isVerified: true,
    googleMapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Sutahata+Haldia+West+Bengal+721635+Sri+SJ+Construction",
    description: "Central fleet staging yard in Sutahata, Haldia, maintaining hydraulic rotary rigs, excavators, winches, and tremie pipes.",
    tags: ["Haldia Yard", "Sutahata", "Fleet Staging", "Headquarters"],
    specs: "Fleet: 8+ Piling Rigs, Excavators, Bentonite Pumps"
  }
];
