// Sri SJ Constructions Private Limited - Original Site Photos Management Service
// Uses IndexedDB for full-resolution image storage and local reactivity

import { TopBackgroundSlide } from '../data/heroSlidesData';

const DB_NAME = 'SriSJ_Photos_DB_v2';
const STORE_NAME = 'site_photos';
const DB_VERSION = 1;

export interface OriginalPhotoMetadata {
  id: string;
  stepNumber: number;
  filename: string;
  title: string;
  subtitle: string;
  location: string;
  client: string;
  category: 'river_piling' | 'concreting' | 'aerial_drone' | 'team_fleet' | 'industrial' | 'transmission';
  categoryLabel: string;
  technicalSpecs: string;
  tags: string[];
  customImageUrl?: string; // Stored user uploaded data URL or blob URL
}

// 27 Standard original photos mapping to WhatsApp camera files
export const ORIGINAL_27_PHOTOS_DEF: OriginalPhotoMetadata[] = [
  {
    id: 'photo-1',
    stepNumber: 1,
    filename: 'IMG-20260902-WA0002.jpg',
    title: 'River Crossing Cofferdam Piling Platform',
    subtitle: 'High-voltage transmission line tower foundation platform with heavy crawler crane, concrete boom pump, and pile cap formwork.',
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
    filename: 'IMG-20260902-WA0003.jpg',
    title: 'Reinforced Pile Cap Concreting & Vibration',
    subtitle: 'Site workforce pouring and consolidating high-strength concrete into massive square pile cap rebar mesh.',
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
    filename: 'IMG-20260902-WA0004.jpg',
    title: '4-Stub Quad Foundation Aerial Drone View',
    subtitle: 'Bird\'s-eye view of 4 finished transmission tower pile caps with steel safety scaffolding and survey-aligned stub legs.',
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
    filename: 'IMG-20260902-WA0005.jpg',
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
    filename: 'IMG-20260902-WA0006.jpg',
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
    filename: 'IMG-20260902-WA0007.jpg',
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
    filename: 'IMG-20260902-WA0008.jpg',
    title: 'Panoramic Riverbed Causeway & Staging Area',
    subtitle: 'Wide vista showing access road, heavy machinery staging yard, and riverbed pile cap construction.',
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
    filename: 'IMG-20260902-WA0009.jpg',
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
    filename: 'IMG-20260902-WA0010.jpg',
    title: 'Twin Crane & Boom Pump River Concreting',
    subtitle: 'Simultaneous operation of crawler crane, concrete pump, and transit mixers during peak foundation pour.',
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
    filename: 'IMG-20260902-WA0011.jpg',
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
    filename: 'IMG-20260902-WA0012.jpg',
    title: 'Rotary Piling Rig Soil Excavation',
    subtitle: 'Deep rotary Kelly bar drilling through tough alluvial soil layers with continuous slurry pumping.',
    location: 'Ceratizit India Plant, West Bengal',
    client: 'Ceratizit India Private Limited',
    category: 'industrial',
    categoryLabel: 'Rotary Boring',
    technicalSpecs: 'Torque 180 kNm, 1000mm bored piles, IS 2911 compliance.',
    tags: ['Ceratizit', 'Kelly Bar', 'Rotary Piling']
  },
  {
    id: 'photo-12',
    stepNumber: 12,
    filename: 'IMG-20260902-WA0013.jpg',
    title: 'Deep Pit Shoring & Water Dewatering Fleet',
    subtitle: 'High-discharge submersible pump lines keeping deep foundation pit bone dry throughout excavation.',
    location: 'Industrial Chemical Complex, Haldia',
    client: 'Ruchi Infra Services',
    category: 'industrial',
    categoryLabel: 'Dewatering System',
    technicalSpecs: 'Continuous 24/7 dewatering, groundwater table suppression below cut-off level.',
    tags: ['Dewatering', 'Haldia Plant', 'Deep Pit']
  },
  {
    id: 'photo-13',
    stepNumber: 13,
    filename: 'IMG-20260902-WA0014.jpg',
    title: 'Digital Total Station Centerline Survey',
    subtitle: 'Chief survey engineer checking horizontal offsets, diagonals, and elevations of 4 tower stubs.',
    location: 'High Voltage Transmission Line Corridor',
    client: 'Power Grid Corporation of India Limited',
    category: 'transmission',
    categoryLabel: 'Precision Survey',
    technicalSpecs: 'Laser EDM accuracy ±1mm, 3D coordinate system benchmarking.',
    tags: ['Total Station', 'Laser EDM', 'Survey Accuracy']
  },
  {
    id: 'photo-14',
    stepNumber: 14,
    filename: 'IMG-20260902-WA0015.jpg',
    title: 'PEB Industrial Column Base Casting',
    subtitle: 'Heavy factory building foundation tie-beams and column pedestals with anchor bolt clusters.',
    location: 'Shreeji Propack Facility, West Bengal',
    client: 'Shreeji Propack Private Limited',
    category: 'industrial',
    categoryLabel: 'PEB Foundation',
    technicalSpecs: '50-tonne column load capacity, grade beams network, vibration damping.',
    tags: ['PEB Factory', 'Anchor Bolts', 'Tie Beams']
  },
  {
    id: 'photo-15',
    stepNumber: 15,
    filename: 'IMG-20260902-WA0016.jpg',
    title: 'Coastal Marine Piling & High Scour Foundation',
    subtitle: 'Deep foundation bored piles designed for maximum river flood scour resistance and seismic resilience.',
    location: 'Coastal Marine Piling Zone, Haldia',
    client: 'Haldia Industrial Zone & JINDAL',
    category: 'transmission',
    categoryLabel: 'Marine Foundation',
    technicalSpecs: 'Permanent steel liners, telescopic Kelly bar, reverse circulation drilling.',
    tags: ['Marine Piling', 'Haldia', 'Scour Resistance']
  },
  {
    id: 'photo-16',
    stepNumber: 16,
    filename: 'IMG-20260902-WA0017.jpg',
    title: 'Deep Pit Shoring & Pump Fleet Deployment',
    subtitle: 'Heavy shoring, dewatering pumps, and transit fleet coordinated across the river access bund.',
    location: 'Industrial Plant Basin, West Bengal',
    client: 'Jindal & TATA Industrial Hubs',
    category: 'industrial',
    categoryLabel: 'Deep Shoring',
    technicalSpecs: 'High-discharge submersible pumps, continuous 24/7 dry basin maintenance.',
    tags: ['Pump Fleet', 'Cofferdam Work', 'Dry Pit']
  },
  {
    id: 'photo-17',
    stepNumber: 17,
    filename: 'IMG-20260902-WA0018.jpg',
    title: 'Heavy Anchor Bolt Template Positioning',
    subtitle: 'Laser-guided steel template holding high-tensile anchor bolts during column pedestal casting.',
    location: 'Industrial Machine Bay Foundation',
    client: 'Ganesh Complex & Industrial Parks',
    category: 'industrial',
    categoryLabel: 'Anchor Bolts',
    technicalSpecs: 'Grade 8.8 high-tensile anchor bolts, CNC template alignment.',
    tags: ['Anchor Template', 'Ganesh Complex', 'Pedestal']
  },
  {
    id: 'photo-18',
    stepNumber: 18,
    filename: 'IMG-20260902-WA0019.jpg',
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
    filename: 'IMG-20260902-WA0020.jpg',
    title: 'Sunset Riverbank Concrete Pour Completion',
    subtitle: 'Golden sunset over the river cofferdam as final batch of pile cap concrete reaches top finish grade.',
    location: 'Krishna Riverbank Piling Project',
    client: 'L&T Infrastructure',
    category: 'river_piling',
    categoryLabel: 'Sunset River Pour',
    technicalSpecs: '320 m³ single pour, continuous supply chain logistics.',
    tags: ['Sunset Pour', 'Finish Grade', 'Concrete Crew']
  },
  {
    id: 'photo-20',
    stepNumber: 20,
    filename: 'IMG-20260902-WA0021.jpg',
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
    filename: 'IMG-20260902-WA0022.jpg',
    title: 'Wide Vista: 4 Completed Tower Footings',
    subtitle: 'Panoramic drone perspective showing all 4 anchor stubs fully cured and ready for tower superstructure erection.',
    location: 'National Power Corridor, West Bengal',
    client: 'Power Grid Corporation of India Limited',
    category: 'aerial_drone',
    categoryLabel: '4-Stub Overview',
    technicalSpecs: '4 monolithic foundations, complete backfill and compaction, QA certified.',
    tags: ['Drone Panorama', '4-Stub Overview', 'Erection Ready']
  },
  {
    id: 'photo-22',
    stepNumber: 22,
    filename: 'IMG-20260902-WA0023.jpg',
    title: 'Engineering Supervisory Inspection at Dusk',
    subtitle: 'Quality control managers checking concrete slump, cube test cylinders, and pour elevation markers.',
    location: 'Haldia / Sutahata Major Substructure Hub',
    client: 'SRI SJ CONSTRUCTIONS PRIVATE LIMITED',
    category: 'team_fleet',
    categoryLabel: 'Quality Assurance',
    technicalSpecs: 'IS 456 / IS 516 certified sampling, compressive testing at 7, 14, 28 days.',
    tags: ['Cube Testing', 'Slump Test', 'Site Quality']
  },
  {
    id: 'photo-23',
    stepNumber: 23,
    filename: 'IMG-20260902-WA0024.jpg',
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
    filename: 'IMG-20260902-WA0025.jpg',
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
    filename: 'IMG-20260902-WA0026.jpg',
    title: 'Heavy Foundation Tie Beam Network',
    subtitle: 'Monolithic RCC tie beams connecting 4 individual pile caps for enhanced seismic and lateral stability.',
    location: 'Transmission Base Infrastructure',
    client: 'PGCIL Power Grid Network',
    category: 'concreting',
    categoryLabel: 'Tie Beam Cast',
    technicalSpecs: 'Grade M40 concrete, tie-beam section 800x1200mm, continuous bonding.',
    tags: ['Tie Beams', 'Seismic Stability', 'Monolithic Cast']
  },
  {
    id: 'photo-26',
    stepNumber: 26,
    filename: 'IMG-20260902-WA0027.jpg',
    title: 'River Crossing Power Corridor Vista',
    subtitle: 'Expansive view of the river navigation span and twin tower foundation platforms across the water.',
    location: 'EHV Krishna River Crossing Project',
    client: 'L&T Infrastructure',
    category: 'river_piling',
    categoryLabel: 'EHV River Span',
    technicalSpecs: 'Navigational clearance 42m, heavy scour protection, riprap revetment.',
    tags: ['EHV Crossing', 'Navigational Span', 'River Piling']
  },
  {
    id: 'photo-27',
    stepNumber: 27,
    filename: 'IMG-20260902-WA0028.jpg',
    title: 'Triple Pot Foundation & Machine Substructures',
    subtitle: 'Precision vibration-isolated heavy machine foundations and triple pot vessel bases with high-early-strength RCC.',
    location: 'TATA Projects & SUNLIGHT Industrial Complex',
    client: 'TATA Projects Limited & SUNLIGHT Group',
    category: 'industrial',
    categoryLabel: 'Triple Pot Slabs',
    technicalSpecs: 'Heavy dynamic load resistance, 1500mm thick reinforced base slab, zero settlement.',
    tags: ['TATA Projects', 'Triple Pot', 'SUNLIGHT']
  }
];

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get all stored photos map from IndexedDB
export async function getStoredPhotosMap(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        if (Array.isArray(req.result)) {
          req.result.forEach((item: { id: string; dataUrl: string }) => {
            if (item.id && item.dataUrl) {
              result[item.id] = item.dataUrl;
            }
          });
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch (err) {
    console.warn('Failed to open IndexedDB for photos:', err);
    return {};
  }
}

// Save single photo into IndexedDB
export async function saveOriginalPhoto(photoId: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: photoId, dataUrl, updatedAt: Date.now() });
      tx.oncomplete = () => {
        // Dispatch custom update event so UI components refresh
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sri_sj_photos_updated', { detail: { photoId } }));
        }
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error saving photo to IndexedDB:', err);
  }
}

// Batch save multiple photos
export async function batchSaveOriginalPhotos(items: { id: string; dataUrl: string }[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      items.forEach(item => {
        store.put({ id: item.id, dataUrl: item.dataUrl, updatedAt: Date.now() });
      });
      tx.oncomplete = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sri_sj_photos_updated', { detail: { count: items.length } }));
        }
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error batch saving photos:', err);
  }
}

// Clear all custom stored photos (reset)
export async function clearCustomPhotos(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('sri_sj_photos_updated', { detail: { cleared: true } }));
        }
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error clearing photos:', err);
  }
}

// Helper to convert File to Data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
