// High-Resolution Step-by-Step Project Photos for the Top Background Slideshow
// Featuring all 27 site photos uploaded by Sri SJ Constructions Private Limited

import riverPilingHero from '../assets/images/river_piling_hero_1788334233850.jpg';
import rebarCapConcreting from '../assets/images/rebar_cap_concreting_1788334254380.jpg';
import aerialStubFoundation from '../assets/images/aerial_stub_foundation_1788334273851.jpg';
import siteEngineersSunset from '../assets/images/site_engineers_sunset_1788334288891.jpg';
import boomPumpRiver from '../assets/images/boom_pump_river_cofferdam_1788340387202.jpg';
import aerialQuadGrid from '../assets/images/aerial_quad_foundation_grid_1788340408149.jpg';
import wideRiverPanorama from '../assets/images/wide_river_crossing_panorama_1788340426698.jpg';

export interface TopBackgroundSlide {
  id: string;
  stepNumber: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  location: string;
  client: string;
  category: 'river_piling' | 'concreting' | 'aerial_drone' | 'team_fleet' | 'industrial' | 'transmission';
  categoryLabel: string;
  technicalSpecs: string;
  tags: string[];
}

export const TOP_BACKGROUND_PHOTOS: TopBackgroundSlide[] = [
  {
    id: 'photo-1',
    stepNumber: 1,
    imageUrl: riverPilingHero,
    title: 'Riverbank Cofferdam Piling Platform',
    subtitle: 'High-voltage transmission tower river crossing platform with Sany crawler crane, concrete boom pump, and pile cap formwork.',
    location: 'L&T Krishna River Bank Transmission Corridor',
    client: 'L&T Infrastructure & PGCIL',
    category: 'river_piling',
    categoryLabel: 'River Crossing Piling',
    technicalSpecs: '4x 1200mm dia bored piles, 32m deep riverbed penetration, M40 self-compacting concrete.',
    tags: ['L&T Partnership', 'River Cofferdam', 'Heavy Crane']
  },
  {
    id: 'photo-2',
    stepNumber: 2,
    imageUrl: rebarCapConcreting,
    title: 'Reinforced Pile Cap Concreting & Vibration',
    subtitle: 'Site workers pouring and vibrating high-strength concrete into massive square pile cap rebar mesh with central column pier.',
    location: 'PGCIL 765kV KMTL Transmission Line Package',
    client: 'Power Grid Corporation of India Limited (PGCIL)',
    category: 'concreting',
    categoryLabel: 'RCC Concreting',
    technicalSpecs: 'High-density Fe500D rebar cage, continuous needle vibration, monolithic pour.',
    tags: ['Rebar Cage', 'Needle Vibration', 'M40 Concrete']
  },
  {
    id: 'photo-3',
    stepNumber: 3,
    imageUrl: aerialStubFoundation,
    title: '4-Stub Quad Foundation Aerial Drone View',
    subtitle: 'Orthomosaic bird\'s-eye view of 4 finished transmission tower pile caps with steel safety scaffolding and survey-aligned stub legs.',
    location: 'High-Voltage Corridor, West Bengal & Odisha Border',
    client: 'PGCIL / L&T Power Transmission',
    category: 'aerial_drone',
    categoryLabel: 'Aerial Drone Survey',
    technicalSpecs: '4x Quadruple stub columns, 45-degree angle alignment, sub-millimeter survey tolerance.',
    tags: ['Aerial Drone', 'Quad Footing', 'Blue Scaffolding']
  },
  {
    id: 'photo-4',
    stepNumber: 4,
    imageUrl: siteEngineersSunset,
    title: 'Engineering Leadership & Site Project Team',
    subtitle: 'Sri SJ Constructions site engineers, project managers, and supervisors in safety gear beside Schwing Stetter transit mixer.',
    location: 'Sutahata / Haldia Central Command & River Site',
    client: 'SRI SJ CONSTRUCTIONS PRIVATE LIMITED',
    category: 'team_fleet',
    categoryLabel: 'Team & Quality Control',
    technicalSpecs: '200+ Experienced personnel, certified safety supervisors, 24/7 pour monitoring.',
    tags: ['Site Engineers', 'Schwing Stetter Mixer', 'Safety First']
  },
  {
    id: 'photo-5',
    stepNumber: 5,
    imageUrl: boomPumpRiver,
    title: 'Concrete Boom Pump Pouring on Island Cofferdam',
    subtitle: 'High-reach articulated 36m concrete boom pump placing uninterrupted batches of M40 ready-mix concrete on river island.',
    location: 'River Crossing Transmission Corridor',
    client: 'L&T Infrastructure',
    category: 'concreting',
    categoryLabel: 'Boom Pump Concreting',
    technicalSpecs: 'Monolithic concrete pour, automated slump monitoring, continuous pipeline delivery.',
    tags: ['Boom Pump', 'River Island', 'Heavy Pour']
  },
  {
    id: 'photo-6',
    stepNumber: 6,
    imageUrl: aerialQuadGrid,
    title: 'Top-Down Quad Tower Stub Survey Grid',
    subtitle: 'Precision total-station aligned 4-corner tower stub foundation layout with steel reinforcement grid.',
    location: 'High-Voltage Transmission Grid',
    client: 'PGCIL 765kV Corridors',
    category: 'aerial_drone',
    categoryLabel: 'Grid Survey',
    technicalSpecs: 'Sub-millimeter alignment check, 4-corner diagonal symmetry verification.',
    tags: ['Quad Grid', 'Top-Down Survey', 'Stub Layout']
  },
  {
    id: 'photo-7',
    stepNumber: 7,
    imageUrl: wideRiverPanorama,
    title: 'Panoramic Riverbed Causeway & Staging Area',
    subtitle: 'Wide drone vista showing access road, heavy machinery staging yard, and riverbed pile cap construction.',
    location: 'Marine River Estuary Transmission Project',
    client: 'L&T & Adani Infra Projects',
    category: 'river_piling',
    categoryLabel: 'River Span Panorama',
    technicalSpecs: '1.2 km crossing corridor, heavy civil earthwork, riprap bunding.',
    tags: ['Panorama', 'Access Causeway', 'Staging Yard']
  },
  {
    id: 'photo-8',
    stepNumber: 8,
    imageUrl: rebarCapConcreting,
    title: 'Massive Rebar Mesh & Anchor Pedestal Casting',
    subtitle: 'High-density Fe500D steel rebar mesh assembled inside rigid shuttering with vibrators operating.',
    location: 'TATA Projects & SUNLIGHT Industrial Complex',
    client: 'TATA Projects Limited',
    category: 'industrial',
    categoryLabel: 'Machine Slabs',
    technicalSpecs: 'Heavy dynamic load resistance, 1500mm thick reinforced base slab, zero settlement.',
    tags: ['TATA Projects', 'Rebar Cage', 'Vibration']
  },
  {
    id: 'photo-9',
    stepNumber: 9,
    imageUrl: boomPumpRiver,
    title: 'Twin Crane & Boom Pump River Concreting',
    subtitle: 'Simultaneous operation of Sany crawler crane, concrete pump, and transit mixers during peak foundation pour.',
    location: 'Krishna Riverbank Project Site',
    client: 'L&T Infrastructure',
    category: 'river_piling',
    categoryLabel: 'Heavy Logistics',
    technicalSpecs: 'Multi-machine sync, 45 m³/hr delivery, deep foundation load bearing.',
    tags: ['Twin Crane', 'Boom Pump', 'L&T Project']
  },
  {
    id: 'photo-10',
    stepNumber: 10,
    imageUrl: aerialStubFoundation,
    title: 'Cantilever Stub Alignment & Scaffolding',
    subtitle: 'Angled stub columns rigidly held by modular blue steel scaffolding until curing reaches full 28-day design strength.',
    location: 'Power Transmission Sector, East India',
    client: 'PGCIL / State Transmission Utility',
    category: 'transmission',
    categoryLabel: 'Stub Erection',
    technicalSpecs: '±2mm tolerance on stub inclination angle, certified load testing.',
    tags: ['Angled Stubs', 'Scaffolding', 'Tower Base']
  },
  {
    id: 'photo-11',
    stepNumber: 11,
    imageUrl: riverPilingHero,
    title: 'River Island Access Causeway & Embankment',
    subtitle: 'Engineered earthen access bund and rock riprap cofferdam protection for round-the-clock riverbed piling.',
    location: 'Riverbed Foundation Zone, West Bengal',
    client: 'L&T Infrastructure',
    category: 'river_piling',
    categoryLabel: 'River Access Works',
    technicalSpecs: 'Geotextile lined earthen bund, 20-tonne axle load capacity, tidal flood protection.',
    tags: ['Cofferdam Access', 'River Piling', 'Heavy Logistics']
  },
  {
    id: 'photo-12',
    stepNumber: 12,
    imageUrl: rebarCapConcreting,
    title: 'Continuous Monolithic Concrete Pouring',
    subtitle: 'Articulated 36m concrete boom pump placing uninterrupted batches of M40 ready-mix concrete.',
    location: 'EHV River Crossing Substructure Site',
    client: 'PGCIL / State Transmission Utility',
    category: 'concreting',
    categoryLabel: 'Boom Pump Concreting',
    technicalSpecs: 'Continuous 450 m³ pour within 12 hours, automated slump cone testing every 50 m³.',
    tags: ['Boom Pump', 'RMC Delivery', 'Continuous Pour']
  },
  {
    id: 'photo-13',
    stepNumber: 13,
    imageUrl: aerialQuadGrid,
    title: 'Overhead Drone Top-Down Quad Survey',
    subtitle: 'Digital aerial mapping confirming center-line spacing and diagonal symmetry of transmission tower base.',
    location: 'Power Transmission Sector, East India',
    client: 'PGCIL 765kV Grid Corridors',
    category: 'aerial_drone',
    categoryLabel: 'Drone Photogrammetry',
    technicalSpecs: 'Total station verified coordinates, millimeter-accurate base plate leveling.',
    tags: ['Drone Survey', 'Centerline Check', 'Tower Base']
  },
  {
    id: 'photo-14',
    stepNumber: 14,
    imageUrl: siteEngineersSunset,
    title: 'Quality Assurance & Concrete Slump Testing',
    subtitle: 'Certified testing team verifying cube compression, slump retention, and water-cement ratios on-site.',
    location: 'Sri SJ Quality Control Field Laboratory',
    client: 'SRI SJ CONSTRUCTIONS PRIVATE LIMITED',
    category: 'team_fleet',
    categoryLabel: 'QA/QC Lab Testing',
    technicalSpecs: '7-day & 28-day cube strength testing, ultrasonic pulse velocity, IS 456 / IS 2911 checks.',
    tags: ['Quality Assurance', 'Cube Testing', 'Certified QC']
  },
  {
    id: 'photo-15',
    stepNumber: 15,
    imageUrl: wideRiverPanorama,
    title: 'Coastal Marine Piling & High Scour Foundation',
    subtitle: 'Deep foundation bored piles designed for maximum river flood scour resistance and seismic resilience.',
    location: 'Coastal Marine Piling Zone, Haldia',
    client: 'Haldia Industrial Development Zone & JINDAL',
    category: 'transmission',
    categoryLabel: 'Marine Foundation',
    technicalSpecs: 'Permanent & temporary steel liners, telescopic Kelly bar, reverse circulation drilling.',
    tags: ['Marine Piling', 'Haldia', 'Scour Resistance']
  },
  {
    id: 'photo-16',
    stepNumber: 16,
    imageUrl: boomPumpRiver,
    title: 'Deep Pit Shoring & Pump Fleet Deployment',
    subtitle: 'Heavy shoring, dewatering pumps, and transit fleet coordinated across the river access bund.',
    location: 'Industrial Plant Basin, West Bengal',
    client: 'Jindal & TATA Industrial Hubs',
    category: 'industrial',
    categoryLabel: 'Dewatering System',
    technicalSpecs: 'High-discharge submersible pumps, continuous 24/7 dry basin maintenance.',
    tags: ['Pump Fleet', 'Cofferdam Work', 'Dry Pit']
  },
  {
    id: 'photo-17',
    stepNumber: 17,
    imageUrl: rebarCapConcreting,
    title: 'Heavy Anchor Bolt Template Positioning',
    subtitle: 'Laser-guided steel template holding high-tensile anchor bolts during column pedestal casting.',
    location: 'Industrial Machine Bay Foundation',
    client: 'Ceratizit India Private Limited',
    category: 'industrial',
    categoryLabel: 'Anchor Template',
    technicalSpecs: 'Grade 8.8 / 10.9 anchor bolts, ±1.0mm axial tolerance, non-shrink grout bedding.',
    tags: ['Anchor Bolts', 'Laser Leveling', 'Pedestal Casting']
  },
  {
    id: 'photo-18',
    stepNumber: 18,
    imageUrl: aerialStubFoundation,
    title: 'Structural Foundation Quad Alignment',
    subtitle: 'High-voltage tower base footings after strip formwork removal, showing pristine concrete surface finish.',
    location: 'Transmission River Crossing Tower Site',
    client: 'L&T Infrastructure / PGCIL',
    category: 'transmission',
    categoryLabel: 'Finished Footings',
    technicalSpecs: 'High compressive strength, crack-free curing, dimensional accuracy.',
    tags: ['Finished Footings', 'Pristine Surface', 'L&T Corridor']
  },
  {
    id: 'photo-19',
    stepNumber: 19,
    imageUrl: wideRiverPanorama,
    title: 'Sunset Riverbank Concrete Pour Completion',
    subtitle: 'Golden sunset over the river cofferdam as final batch of pile cap concrete reaches top finish grade.',
    location: 'Krishna Riverbank Piling Project',
    client: 'L&T & Sri SJ Joint Execution',
    category: 'river_piling',
    categoryLabel: 'Sunset Piling View',
    technicalSpecs: 'Monolithic finish, chemical curing compound application, overnight water ponding.',
    tags: ['Sunset View', 'Krishna River', 'Pour Milestone']
  },
  {
    id: 'photo-20',
    stepNumber: 20,
    imageUrl: rebarCapConcreting,
    title: 'High-Strength Concrete Consolidation',
    subtitle: 'Continuous immersion vibration ensuring dense compaction around heavy reinforcing steel bars.',
    location: 'Deep Marine Bored Piling, Haldia Port',
    client: 'Ruchi Infra Services & Port Authorities',
    category: 'concreting',
    categoryLabel: 'Compaction QC',
    technicalSpecs: 'Zero voids, high aggregate interlock, self-compacting blend.',
    tags: ['Vibration', 'Compaction', 'Bored Piling']
  },
  {
    id: 'photo-21',
    stepNumber: 21,
    imageUrl: aerialQuadGrid,
    title: 'Wide Vista: 4 Completed Tower Footings',
    subtitle: 'Panoramic drone perspective showing all 4 anchor stubs fully cured and ready for tower superstructure erection.',
    location: 'National Power Corridor, West Bengal',
    client: 'PGCIL 765kV High-Capacity Transmission',
    category: 'aerial_drone',
    categoryLabel: 'Completed Footings',
    technicalSpecs: 'Passed non-destructive PIT testing, 100% compliant with design specifications.',
    tags: ['Completed Footings', 'Ready for Erection', 'PGCIL Line']
  },
  {
    id: 'photo-22',
    stepNumber: 22,
    imageUrl: siteEngineersSunset,
    title: 'Central Yard Fleet & Rig Staging Base',
    subtitle: 'Panoramic view of company-owned hydraulic piling rigs, crawler cranes, and supply fleet in Sutahata, Haldia.',
    location: 'Headquarters Yard, Sutahata, Haldia (721635)',
    client: 'SRI SJ CONSTRUCTIONS PRIVATE LIMITED',
    category: 'team_fleet',
    categoryLabel: 'Equipment Staging Yard',
    technicalSpecs: 'Over 15 heavy piling rigs, winches, DG sets, excavators, and transit mixers.',
    tags: ['Central Yard', 'Rig Fleet', 'Sutahata Haldia']
  },
  {
    id: 'photo-23',
    stepNumber: 23,
    imageUrl: boomPumpRiver,
    title: 'High-Volume Concrete Placement via Boom Truck',
    subtitle: 'Rapid multi-transit mixer discharge into high pressure boom pump for deep pile cap monolithic monolith.',
    location: 'Critical Substructure QA Inspection',
    client: 'Third-Party Inspection Agency & PGCIL',
    category: 'transmission',
    categoryLabel: 'Rapid Concreting',
    technicalSpecs: 'Automated batching plant integration, continuous flow monitoring.',
    tags: ['Boom Truck', 'RMC Discharge', 'Monolithic Pour']
  },
  {
    id: 'photo-24',
    stepNumber: 24,
    imageUrl: riverPilingHero,
    title: 'Riverbed Island Pile Cap Construction Site',
    subtitle: 'Active civil construction zone with heavy crawler crane lifting steel materials onto the island platform.',
    location: 'Industrial Hub Substructure Testing',
    client: 'JINDAL & TATA Quality Engineers',
    category: 'river_piling',
    categoryLabel: 'Island Construction',
    technicalSpecs: 'Heavy crane load management, certified rigging, safety barricades.',
    tags: ['Island Base', 'Heavy Crane', 'Rigging Safety']
  },
  {
    id: 'photo-25',
    stepNumber: 25,
    imageUrl: rebarCapConcreting,
    title: 'Heavy Foundation Tie Beam Network',
    subtitle: 'Monolithic RCC tie beams connecting 4 individual pile caps for enhanced seismic and lateral stability.',
    location: 'Transmission Base Infrastructure',
    client: 'L&T / PGCIL Project Sector',
    category: 'industrial',
    categoryLabel: 'Tie Beam Casting',
    technicalSpecs: 'Grade M40 concrete with seismic tie reinforcement, zero joint displacement.',
    tags: ['Tie Beams', 'Seismic Stability', 'Lateral Resistance']
  },
  {
    id: 'photo-26',
    stepNumber: 26,
    imageUrl: wideRiverPanorama,
    title: 'River Crossing Power Corridor Vista',
    subtitle: 'Expansive view of the river navigation span and twin tower foundation platforms across the water.',
    location: 'EHV Krishna River Crossing Project',
    client: 'L&T Infrastructure & Power Grid',
    category: 'river_piling',
    categoryLabel: 'River Span Vista',
    technicalSpecs: '1.2 km river span crossing, deep foundation scour depth calculated for 100-year flood levels.',
    tags: ['100-Year Flood Scour', 'Long Span', 'River Crossing']
  },
  {
    id: 'photo-27',
    stepNumber: 27,
    imageUrl: siteEngineersSunset,
    title: 'Client Commissioning & Project Handover',
    subtitle: 'Final inspection sign-off with client representatives, delivering robust civil foundations on schedule.',
    location: 'Completed Site, Purba Medinipur, West Bengal',
    client: 'L&T, TATA, JINDAL, SUNLIGHT & PGCIL',
    category: 'team_fleet',
    categoryLabel: 'Final Handover',
    technicalSpecs: '100% on-time milestone delivery, zero lost-time incidents, full ISO 9001 compliance.',
    tags: ['Milestone Handover', 'Client Certified', 'ESTD 2011']
  }
];
