import React, { useState, useEffect, useRef } from 'react';
import { 
  MAP_LOCATIONS, 
  INITIAL_SITE_PHOTOS, 
  MapLocation, 
  SitePhotoItem, 
  GOOGLE_MAPS_OFFICIAL_QUERY 
} from '../data/mapsPhotosData';
import { 
  MapPin, 
  Search, 
  UploadCloud, 
  ExternalLink, 
  Camera, 
  CheckCircle2, 
  Layers, 
  Navigation, 
  X, 
  Plus, 
  Image as ImageIcon, 
  Sparkles, 
  Building, 
  HardHat, 
  Compass, 
  Eye, 
  ShieldCheck, 
  Download,
  Filter
} from 'lucide-react';

const STORAGE_KEY = 'sri_sj_user_uploaded_photos_v1';

interface GoogleMapsGallerySectionProps {
  onOpenQuoteModal?: (serviceTitle?: string) => void;
}

export const GoogleMapsGallerySection: React.FC<GoogleMapsGallerySectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(MAP_LOCATIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [photos, setPhotos] = useState<SitePhotoItem[]>(INITIAL_SITE_PHOTOS);
  const [activePhotoModal, setActivePhotoModal] = useState<SitePhotoItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadProject, setUploadProject] = useState('Ceratizit India Private Limited');
  const [uploadLocation, setUploadLocation] = useState('Industrial Corridor, West Bengal');
  const [uploadCategory, setUploadCategory] = useState<'piling' | 'industrial' | 'civil' | 'office_fleet'>('piling');
  const [uploadUploader, setUploadUploader] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadSpecs, setUploadSpecs] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load uploaded photos from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SitePhotoItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos([...parsed, ...INITIAL_SITE_PHOTOS]);
        }
      }
    } catch (e) {
      console.warn('Could not load stored photos', e);
    }
  }, []);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) {
      alert('Please select or drag an image to upload.');
      return;
    }

    const newPhoto: SitePhotoItem = {
      id: `user-photo-${Date.now()}`,
      title: uploadTitle || 'Uploaded Site Photograph',
      projectName: uploadProject,
      locationName: uploadLocation,
      category: 'user_uploaded',
      imageUrl: previewImage,
      dateTaken: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      uploader: uploadUploader || 'Site Engineering Team',
      isVerified: true,
      googleMapQueryUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uploadLocation)}`,
      description: uploadDescription || 'Field photograph uploaded via Sri SJ Construction Portal.',
      tags: ['User Uploaded', uploadCategory.toUpperCase(), uploadProject],
      specs: uploadSpecs || 'Field Observation Record'
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);

    try {
      const customOnly = updated.filter(p => p.category === 'user_uploaded');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      // Reset form
      setPreviewImage(null);
      setUploadTitle('');
      setUploadDescription('');
      setUploadSpecs('');
      setUploadUploader('');
    }, 1200);
  };

  // Filtered photos
  const filteredPhotos = photos.filter(p => {
    const matchesCategory = 
      activeCategory === 'all' 
        ? true 
        : activeCategory === 'uploaded' 
        ? p.category === 'user_uploaded' 
        : p.category === activeCategory;
        
    const matchesSearch = 
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="maps-photos" className="py-20 bg-[#e2e8f0] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Google Maps Discovery &amp; Live Site Photos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
              Search SJ Construction on Google Maps &amp; Site Photo Hub
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
              Explore our headquarters in <strong className="text-slate-950">Sutahata, Haldia (WB 721635)</strong>, active project sites, and verified field construction photography. Upload site progress photos directly to our digital engineering repository.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={GOOGLE_MAPS_OFFICIAL_QUERY}
              target="_blank"
              rel="noreferrer"
              id="search-gmaps-direct-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs shadow-sm transition-all hover:border-amber-500 hover:text-amber-700"
            >
              <Search className="w-4 h-4 text-amber-600" />
              <span>Search "SJ Construction" on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={() => setUploadModalOpen(true)}
              id="upload-site-photos-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Site Photo</span>
            </button>
          </div>
        </div>

        {/* 1. INTERACTIVE GOOGLE MAPS SITE EXPLORER */}
        <div className="mb-14 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Geographic Site Presence &amp; Operational Network</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk']">
                {selectedLocation.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {selectedLocation.address}, {selectedLocation.districtState}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                selectedLocation.category === 'headquarters'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : selectedLocation.category === 'current_project'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {selectedLocation.status}
              </span>
              <a
                href={selectedLocation.googleMapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-amber-400 hover:bg-slate-800 text-xs font-bold shadow-xs transition-colors"
              >
                <span>Navigate in Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Location Selector Pills */}
          <div className="p-4 bg-slate-100/80 border-b border-slate-200 overflow-x-auto flex items-center gap-2 scrollbar-thin">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 shrink-0">
              Select Location:
            </span>
            {MAP_LOCATIONS.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                id={`map-loc-tab-${loc.id}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedLocation.id === loc.id
                    ? 'bg-slate-900 text-amber-400 ring-2 ring-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <MapPin className={`w-3 h-3 ${selectedLocation.id === loc.id ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{loc.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>

          {/* Map Viewer & Details Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Embedded Google Map Frame */}
            <div className="lg:col-span-8 h-80 sm:h-96 relative bg-slate-200">
              <iframe
                title={`Google Map - ${selectedLocation.name}`}
                src={selectedLocation.embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/85 text-white backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2 pointer-events-none">
                <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Coordinates: {selectedLocation.coordinates.lat}° N, {selectedLocation.coordinates.lng}° E</span>
              </div>
            </div>

            {/* Site Engineering Overview Card */}
            <div className="lg:col-span-4 p-6 bg-slate-50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="space-y-4">
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={selectedLocation.sitePhoto}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[11px] font-black text-amber-300 uppercase tracking-wide">
                    {selectedLocation.clientOrFacility}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    Scope of Engineering Execution
                  </span>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    {selectedLocation.scopeOfWork}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                    Key Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLocation.highlights.map((h, i) => (
                      <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  Registered: SRI SJ CONSTRUCTION
                </span>
                <a
                  href={selectedLocation.googleMapsQueryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-black text-amber-800 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. GOOGLE MAPS VERIFIED SITE PHOTOS GALLERY */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Field Photographs &amp; Progress Archive</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                Verified Site &amp; Machine Photography
              </h3>
            </div>

            {/* Search Input in Gallery */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photos by keyword, site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-wrap sm:flex-nowrap">
            {[
              { id: 'all', label: 'All Photos', count: photos.length },
              { id: 'piling', label: 'Piling & Deep Foundations' },
              { id: 'industrial', label: 'Heavy Machine Foundations' },
              { id: 'civil', label: 'Civil & PEB Works' },
              { id: 'office_fleet', label: 'Haldia Base & Fleet' },
              { 
                id: 'uploaded', 
                label: 'User Uploaded', 
                count: photos.filter(p => p.category === 'user_uploaded').length,
                isCustom: true
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                id={`photo-filter-${tab.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  activeCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-500/40'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                }`}
              >
                {tab.isCustom && <UploadCloud className="w-3.5 h-3.5 text-amber-700" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                    activeCategory === tab.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Photo Cards Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-black text-slate-800 font-['Space_Grotesk']">No photographs match your filter</h4>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or uploading a new photo from the site.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  id={`photo-card-${photo.id}`}
                  onClick={() => setActivePhotoModal(photo)}
                  className="group rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md cursor-pointer"
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs border ${
                        photo.category === 'user_uploaded'
                          ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                          : 'bg-slate-900/80 text-slate-200 border-slate-700'
                      }`}>
                        {photo.category === 'user_uploaded' ? 'Field Upload' : 'Verified Rig Photo'}
                      </span>

                      <div className="p-1 rounded bg-black/60 text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Location Label */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{photo.locationName}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        {photo.projectName}
                      </span>
                      <h4 className="text-sm font-black text-slate-950 font-['Space_Grotesk'] line-clamp-2 mt-0.5 group-hover:text-amber-800 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {photo.description}
                      </p>
                    </div>

                    {photo.specs && (
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-700">
                        {photo.specs}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{photo.dateTaken}</span>
                      <span className="text-amber-800 font-bold">SRI SJ CONSTRUCTION</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ================= MODAL 1: FULL PHOTO DETAIL VIEWER ================= */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200 truncate">
                  {activePhotoModal.title}
                </span>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-slate-950 max-h-96 flex items-center justify-center border border-slate-200 shadow-inner">
                <img
                  src={activePhotoModal.imageUrl}
                  alt={activePhotoModal.title}
                  className="max-h-96 w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    {activePhotoModal.projectName}
                  </span>
                  <h3 className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                    {activePhotoModal.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activePhotoModal.description}
                  </p>

                  {activePhotoModal.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activePhotoModal.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 block">Site Location:</span>
                    <span className="font-black text-slate-900">{activePhotoModal.locationName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Photographed By:</span>
                    <span className="text-slate-800">{activePhotoModal.uploader}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Date / Timeline:</span>
                    <span className="text-slate-800">{activePhotoModal.dateTaken}</span>
                  </div>
                  {activePhotoModal.specs && (
                    <div>
                      <span className="font-bold text-slate-500 block">Technical Specs:</span>
                      <span className="font-mono text-slate-800">{activePhotoModal.specs}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200">
                    <a
                      href={activePhotoModal.googleMapQueryUrl || GOOGLE_MAPS_OFFICIAL_QUERY}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View Location on Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: UPLOAD SITE & GOOGLE MAPS PHOTOS ================= */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white font-['Space_Grotesk']">
                  Upload Construction &amp; Site Photo
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-6 space-y-4">
              {uploadSuccess ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-black text-slate-900">Photo Successfully Added!</h4>
                  <p className="text-xs text-slate-600">
                    Your photograph is now cataloged in the SRI SJ CONSTRUCTION repository and gallery.
                  </p>
                </div>
              ) : (
                <>
                  {/* Drag & Drop Box */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-amber-500 bg-amber-50/50'
                        : previewImage
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : 'border-slate-300 hover:border-amber-400 bg-slate-50'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                    />

                    {previewImage ? (
                      <div className="space-y-2">
                        <img
                          src={previewImage}
                          alt="Upload preview"
                          className="max-h-48 mx-auto rounded-lg shadow-sm object-cover"
                        />
                        <p className="text-xs text-emerald-700 font-bold">
                          ✓ Image loaded! Click to change photo.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadCloud className="w-10 h-10 text-amber-600 mx-auto" />
                        <div className="text-xs font-bold text-slate-800">
                          <span>Click to browse</span> or drag and drop site photo
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Supports PNG, JPG, JPEG, WebP from field cameras or mobile
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Photo Title / Operation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rotary Bored Piling Rig Drilling"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project / Client Facility *
                      </label>
                      <select
                        value={uploadProject}
                        onChange={(e) => setUploadProject(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Ceratizit India Private Limited">Ceratizit India Private Limited</option>
                        <option value="Ruchi Infra Services, Haldia">Ruchi Infra Services, Haldia</option>
                        <option value="Shreeji Propack Private Limited">Shreeji Propack Private Limited</option>
                        <option value="RG Baruah Nehru Stadium">RG Baruah Nehru Stadium</option>
                        <option value="Ganesh Complex, Ranihati">Ganesh Complex, Ranihati</option>
                        <option value="Jindal India Limited (JIL WB)">Jindal India Limited (JIL WB)</option>
                        <option value="Larsen & Toubro (L&T) - PGCIL">Larsen &amp; Toubro (L&T) - PGCIL</option>
                        <option value="TATA Projects Industrial Site">TATA Projects Industrial Site</option>
                        <option value="SUNLIGHT Infrastructure Hub">SUNLIGHT Infrastructure Hub</option>
                        <option value="Sri SJ Haldia Base & Equipment Yard">Sri SJ Haldia Base &amp; Equipment Yard</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Site Location / Map Area *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sutahata, Haldia, West Bengal"
                        value={uploadLocation}
                        onChange={(e) => setUploadLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Category
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="piling">Piling &amp; Deep Foundations</option>
                        <option value="industrial">Heavy Machine Foundations</option>
                        <option value="civil">Civil &amp; PEB Substructures</option>
                        <option value="office_fleet">Equipment Fleet / Yard</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Uploader Name / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Site Quality Engineer"
                        value={uploadUploader}
                        onChange={(e) => setUploadUploader(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Technical Specs (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pile Dia 750mm, Depth 25m, M35"
                        value={uploadSpecs}
                        onChange={(e) => setUploadSpecs(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Field Notes / Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter site observations, rig telemetry or shuttering notes..."
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                    >
                      Publish to Gallery
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
