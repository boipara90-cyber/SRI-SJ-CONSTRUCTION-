import React, { useState, useEffect, useRef } from 'react';
import { 
  ORIGINAL_27_PHOTOS_DEF, 
  OriginalPhotoMetadata, 
  getStoredPhotosMap, 
  saveOriginalPhoto, 
  batchSaveOriginalPhotos, 
  clearCustomPhotos, 
  fileToDataUrl 
} from '../services/photoStorageService';
import { 
  X, 
  UploadCloud, 
  Image as ImageIcon, 
  CheckCircle2, 
  Trash2, 
  RotateCcw, 
  Camera, 
  Layers, 
  Info, 
  Check, 
  Sparkles,
  ArrowRight,
  FolderOpen
} from 'lucide-react';

interface OriginalPhotosManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalPhotosManagerModal: React.FC<OriginalPhotosManagerModalProps> = ({ isOpen, onClose }) => {
  const [storedMap, setStoredMap] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDraggingBatch, setIsDraggingBatch] = useState(false);
  const [uploadStats, setUploadStats] = useState<{ total: number; custom: number }>({ total: 27, custom: 0 });
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSlotForUpload, setSelectedSlotForUpload] = useState<string | null>(null);

  // Load photos on mount and listen to updates
  const refreshPhotos = async () => {
    const map = await getStoredPhotosMap();
    setStoredMap(map);
    const customCount = Object.keys(map).length;
    setUploadStats({ total: 27, custom: customCount });
  };

  useEffect(() => {
    if (isOpen) {
      refreshPhotos();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      refreshPhotos();
    };
    window.addEventListener('sri_sj_photos_updated', handleUpdate);
    return () => window.removeEventListener('sri_sj_photos_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  // Process batch files dropped or selected
  const handleBatchFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    const itemsToSave: { id: string; dataUrl: string }[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const dataUrl = await fileToDataUrl(file);
      
      // Try to match filename like WA0002 or WA0015
      const lowerName = file.name.toLowerCase();
      let matchedSlot: OriginalPhotoMetadata | undefined = undefined;

      const waMatch = lowerName.match(/wa00(\d+)/i);
      if (waMatch && waMatch[1]) {
        const num = parseInt(waMatch[1], 10);
        // Find matching definition
        matchedSlot = ORIGINAL_27_PHOTOS_DEF.find(p => p.filename.toLowerCase().includes(`wa00${waMatch[1]}`) || p.stepNumber === num);
      }

      if (!matchedSlot) {
        // Fallback: assign to the i-th photo slot
        const targetIndex = i % ORIGINAL_27_PHOTOS_DEF.length;
        matchedSlot = ORIGINAL_27_PHOTOS_DEF[targetIndex];
      }

      if (matchedSlot) {
        itemsToSave.push({ id: matchedSlot.id, dataUrl });
      }
    }

    if (itemsToSave.length > 0) {
      await batchSaveOriginalPhotos(itemsToSave);
      setNotificationMsg(`Successfully applied ${itemsToSave.length} original photos across the website!`);
      setTimeout(() => setNotificationMsg(null), 4000);
    }
  };

  // Single slot file upload
  const handleSingleSlotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedSlotForUpload || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    await saveOriginalPhoto(selectedSlotForUpload, dataUrl);
    setSelectedSlotForUpload(null);
    setNotificationMsg(`Photo slot updated successfully!`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Reset/clear custom photos
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all custom uploaded site photos?')) {
      await clearCustomPhotos();
      setNotificationMsg('Photos reset successfully.');
      setTimeout(() => setNotificationMsg(null), 3000);
    }
  };

  const filteredDefs = ORIGINAL_27_PHOTOS_DEF.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-2xl bg-[#0f0f14] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden File Inputs */}
        <input 
          ref={batchFileInputRef}
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => e.target.files && handleBatchFiles(e.target.files)}
        />
        <input 
          ref={singleFileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleSingleSlotUpload}
        />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 bg-[#14141c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white font-['Space_Grotesk']">
                  Original Company Site Photos Manager
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                  {uploadStats.custom > 0 ? `${uploadStats.custom} OF 27 ORIGINAL PHOTOS ACTIVE` : '27 SLOTS READY'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Upload or replace real on-site photos for Sri SJ Constructions projects in Haldia, PGCIL, and Krishna River.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner */}
        {notificationMsg && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-xs font-bold text-emerald-300 flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Big Batch Upload Drop Area */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDraggingBatch(true); }}
            onDragLeave={() => setIsDraggingBatch(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingBatch(false);
              if (e.dataTransfer.files) handleBatchFiles(e.dataTransfer.files);
            }}
            className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all duration-300 text-center flex flex-col items-center justify-center gap-3 cursor-pointer ${
              isDraggingBatch 
                ? 'border-orange-500 bg-orange-500/10 scale-[1.01]' 
                : 'border-zinc-800 hover:border-orange-500/50 bg-[#121218] hover:bg-[#16161e]'
            }`}
            onClick={() => batchFileInputRef.current?.click()}
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-lg">
              <UploadCloud className="w-7 h-7 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Drag &amp; Drop Your 27 Original WhatsApp Photos Here
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
                Click to browse files or drop <span className="text-orange-400 font-mono">IMG-20260902-WA0002.jpg ... WA0028.jpg</span>. They will instantly replace images in the Hero showcase, top background, and project galleries.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button 
                type="button"
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Select Photos From Computer / Mobile</span>
              </button>
              {uploadStats.custom > 0 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-bold text-xs border border-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Categories Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {[
                { id: 'all', label: 'All 27 Photo Slots' },
                { id: 'river_piling', label: 'River Crossing Piling' },
                { id: 'concreting', label: 'RCC & Concreting' },
                { id: 'aerial_drone', label: 'Drone & Survey' },
                { id: 'industrial', label: 'Industrial & PEB' },
                { id: 'team_fleet', label: 'Team & Equipment' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-zinc-400 font-mono">
              Showing {filteredDefs.length} photo positions
            </div>
          </div>

          {/* 27 Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDefs.map(def => {
              const customImg = storedMap[def.id];
              const isCustom = Boolean(customImg);

              return (
                <div 
                  key={def.id}
                  className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                    isCustom 
                      ? 'bg-[#14141c] border-orange-500/40 shadow-lg' 
                      : 'bg-[#101015] border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Top slot header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-black flex items-center justify-center font-mono">
                          {def.stepNumber}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[140px]">
                          {def.filename}
                        </span>
                      </div>
                      {isCustom ? (
                        <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>Original Active</span>
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                          Waiting Upload
                        </span>
                      )}
                    </div>

                    {/* Image Preview / Drop target */}
                    <div 
                      className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-zinc-800 mb-2.5 cursor-pointer group-hover:border-orange-500/40"
                      onClick={() => {
                        setSelectedSlotForUpload(def.id);
                        singleFileInputRef.current?.click();
                      }}
                    >
                      {customImg ? (
                        <img 
                          src={customImg} 
                          alt={def.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-zinc-950/80">
                          <ImageIcon className="w-6 h-6 text-zinc-600 mb-1" />
                          <span className="text-[11px] font-bold text-zinc-400">Click to assign original photo</span>
                          <span className="text-[9px] text-zinc-400 mt-0.5">JPG / PNG / WebP</span>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="text-xs font-bold text-white bg-orange-500 px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <UploadCloud className="w-3 h-3" />
                          <span>{customImg ? 'Replace Photo' : 'Upload Photo'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title & Metadata */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white leading-tight truncate">
                        {def.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {def.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Footer tags */}
                  <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="text-orange-400 truncate max-w-[130px]">📍 {def.location.split(',')[0]}</span>
                    <span className="truncate max-w-[100px]">{def.client.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#14141c] flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-400">
            All original photos are stored in high resolution and synced dynamically.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Done &amp; View Live Website
          </button>
        </div>

      </div>
    </div>
  );
};
