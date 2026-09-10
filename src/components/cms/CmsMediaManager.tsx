import React, { useState, useEffect, useMemo } from 'react';
import { 
  Image as ImageIcon, Folder, Layers, UploadCloud, Clock, 
  Trash2, BarChart3, Plus, Search, Check, Filter, ShieldCheck, 
  RefreshCw, HardDrive, Video, FileText, Copy, Eye, X, Tag, 
  FolderPlus, Share2, CheckCircle2, Sliders, ExternalLink, Wand2, 
  RotateCw, ZoomIn, LayoutGrid
} from 'lucide-react';
import { blogStore, MediaItem } from '../../lib/blogStore';

export type DAMSubModule = 
  | 'dashboard' 
  | 'library' 
  | 'folders' 
  | 'collections' 
  | 'recently_added' 
  | 'trash';

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  color: string;
  updatedAt: string;
}

interface MediaFolder {
  id: string;
  name: string;
  itemCount: number;
  size: string;
  updatedAt: string;
}

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsMediaManager({ onShowToast }: Props) {
  const [submodule, setSubmodule] = useState<DAMSubModule>('dashboard');
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => blogStore.getMedia());
  const [trashList, setTrashList] = useState<MediaItem[]>([]);

  // Selection & Navigation State
  const [activeFolderId, setActiveFolderId] = useState<string>('folder_root');
  const [activeCollectionId, setActiveCollectionId] = useState<string | undefined>();
  const [inspectedMedia, setInspectedMedia] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [layoutType, setLayoutType] = useState<'grid' | 'table'>('grid');

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [aiAssistantMedia, setAiAssistantMedia] = useState<MediaItem | null>(null);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  // Upload Form
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Chapel');
  const [uploadAltText, setUploadAltText] = useState('');

  // Collections & Folders
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 'col-1',
      name: 'Chapel Photography & Sanctuary Interiors',
      description: 'High-resolution photography of ceremonial chapels, sanctuary pews, and memorial halls.',
      itemCount: 8,
      color: '#411548',
      updatedAt: 'Today'
    },
    {
      id: 'col-2',
      name: 'Sympathy Floral Tributes & Casket Sprays',
      description: 'Floral arrangements, white roses, lilies, and customized tribute wreaths.',
      itemCount: 14,
      color: '#C5A059',
      updatedAt: 'Yesterday'
    },
    {
      id: 'col-3',
      name: 'Veterans Military Honors & National Emblems',
      description: 'Draped ceremonial flags, military bugle insignias, and tribute urns.',
      itemCount: 6,
      color: '#411548',
      updatedAt: '2 days ago'
    }
  ]);

  const [folders, setFolders] = useState<MediaFolder[]>([
    { id: 'fld-1', name: 'Ceremonial Chapels', itemCount: 12, size: '24.5 MB', updatedAt: 'Today' },
    { id: 'fld-2', name: 'Floral Arrangements', itemCount: 18, size: '38.2 MB', updatedAt: 'Yesterday' },
    { id: 'fld-3', name: 'Memorial Keepsakes', itemCount: 9, size: '16.8 MB', updatedAt: '3 days ago' },
    { id: 'fld-4', name: 'Heritage Documents', itemCount: 5, size: '4.2 MB', updatedAt: 'Last week' }
  ]);

  // AI Assistant State
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiAltText, setAiAltText] = useState('');
  const [aiCaption, setAiCaption] = useState('');
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);

  // New Collection Form
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // New Folder Form
  const [newFldName, setNewFldName] = useState('');

  const loadData = () => {
    setMediaList(blogStore.getMedia());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('neema_cms_media_updated', handleUpdate);
    return () => window.removeEventListener('neema_cms_media_updated', handleUpdate);
  }, []);

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    onShowToast(`Copied URL for "${item.title}"`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadUrl.trim()) return;

    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      title: uploadTitle.trim(),
      filename: `${uploadTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
      url: uploadUrl.trim(),
      thumbnail: uploadUrl.trim(),
      size: '850 KB',
      dimensions: '1920x1080',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      optimized: true,
      altText: uploadAltText.trim() || uploadTitle.trim(),
      description: `Memorial visual asset for ${uploadCategory}`,
      mediaType: 'image'
    };

    const updated = [newItem, ...mediaList];
    blogStore.saveMedia(updated);
    setMediaList(updated);
    setUploadTitle('');
    setUploadUrl('');
    setUploadAltText('');
    setShowUploadModal(false);
    onShowToast(`Uploaded "${newItem.title}"`);
  };

  const handleSoftDelete = (item: MediaItem) => {
    setTrashList(prev => [item, ...prev]);
    const updated = mediaList.filter(m => m.id !== item.id);
    blogStore.saveMedia(updated);
    setMediaList(updated);
    if (inspectedMedia?.id === item.id) setInspectedMedia(null);
    onShowToast(`Moved "${item.title}" to trash`);
  };

  const handleRestoreFromTrash = (item: MediaItem) => {
    setTrashList(prev => prev.filter(m => m.id !== item.id));
    const updated = [item, ...mediaList];
    blogStore.saveMedia(updated);
    setMediaList(updated);
    onShowToast(`Restored "${item.title}"`);
  };

  const handlePermanentDelete = (id: string) => {
    setTrashList(prev => prev.filter(m => m.id !== id));
    onShowToast('Asset permanently deleted from storage');
  };

  // Open AI Assistant
  const openAiAssistant = (item: MediaItem) => {
    setAiAssistantMedia(item);
    setAiAltText(item.altText || `Dignified memorial visual for ${item.title}`);
    setAiCaption(`Middleton Funeral Services verified asset depicting ${item.title.toLowerCase()}.`);
    setAiKeywords(['Middleton', 'Memorial', 'FuneralCare', 'Elegance', 'Sanctuary']);
  };

  const handleRunAiAnalysis = () => {
    if (!aiAssistantMedia) return;
    setAiGenerating(true);
    setTimeout(() => {
      setAiAltText(`Reverent archival photograph of ${aiAssistantMedia.title}, optimized for family tributes and accessibility.`);
      setAiCaption(`Official memorial asset: ${aiAssistantMedia.title} honoring loved ones with timeless grace.`);
      setAiKeywords(['MiddletonFuneralServices', 'MemorialTributes', 'Heritage', 'Compassion', 'Ceremony']);
      setAiGenerating(false);
      onShowToast('AI vision metadata inspection complete');
    }, 600);
  };

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return mediaList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        item.title.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q) ||
        (item.altText && item.altText.toLowerCase().includes(q));
      
      const matchesCat = categoryFilter === 'All' || item.description?.includes(categoryFilter);
      return matchesQuery && matchesCat;
    });
  }, [mediaList, searchQuery, categoryFilter]);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'library', label: 'Library', icon: ImageIcon },
    { id: 'folders', label: 'Folders', icon: Folder },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'recently_added', label: 'Recents', icon: Clock },
    { id: 'trash', label: 'Trash', icon: Trash2, count: trashList.length }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* 1. TOP HEADER BANNER & SUBMODULE NAVIGATION */}
      <div className="bg-gradient-to-r from-[#411548] via-[#2f0d34] to-[#411548] rounded-3xl border border-[#C5A059]/30 p-6 md:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-[#C5A059] shrink-0" />
            <span>Digital Asset Management Module</span>
          </h1>
          <span className="px-3.5 py-1.5 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 rounded-full text-xs font-black shadow-2xs">
            {mediaList.length} Assets Stored
          </span>
        </div>

        <p className="text-xs md:text-sm text-gray-200 font-medium leading-relaxed max-w-4xl">
          Centralized corporate repository with automated WebP compression, AI alt-text, nested folder permissions, and live usage tracking.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08b43] text-[#411548] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Upload Media
          </button>
        </div>

        {/* Submodule Tabs Bar */}
        <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/10 flex-wrap sm:flex-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = submodule === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSubmodule(item.id as DAMSubModule)}
                className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 min-w-0 text-center ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#411548] shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
                <span className="truncate">{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. UNIVERSAL FILE COMPATIBILITY BANNER */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold">
        <div className="flex items-center gap-2 text-gray-700">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Universal Format Support:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <span className="px-2.5 py-1 bg-purple-50 text-[#411548] border border-purple-200 rounded-lg">WEBP (Lossless)</span>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg">JPEG / JPG (High-Res)</span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg">PNG (Alpha)</span>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg">SVG (Vector)</span>
          <span className="px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-lg">PDF (Document)</span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6 relative items-start">
        <div className="flex-1 w-full min-w-0 space-y-6">

          {/* SUBMODULE 1: DASHBOARD OVERVIEW */}
          {submodule === 'dashboard' && (
            <div className="space-y-6">
              {/* Storage KPI Breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border-t-4 border-t-[#411548] border-x border-b border-gray-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Archival Photos</span>
                  <div className="text-2xl font-black text-[#411548]">{mediaList.length} Files</div>
                  <span className="text-[10px] font-bold text-gray-500">128.4 MB in Cloud</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-t-4 border-t-[#C5A059] border-x border-b border-gray-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Organized Collections</span>
                  <div className="text-2xl font-black text-[#C5A059]">{collections.length} Sets</div>
                  <span className="text-[10px] font-bold text-gray-500">Curated gallery folders</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-t-4 border-t-emerald-600 border-x border-b border-gray-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">WebP Compression</span>
                  <div className="text-2xl font-black text-emerald-700">68% Saved</div>
                  <span className="text-[10px] font-bold text-emerald-800">Ultra-fast loading</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-t-4 border-t-purple-600 border-x border-b border-gray-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">AI Accessibility</span>
                  <div className="text-2xl font-black text-purple-700">100% Tagged</div>
                  <span className="text-[10px] font-bold text-purple-800">WCAG 2.2 Compliant</span>
                </div>
              </div>

              {/* Collections Highlight Banner */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C5A059]" /> Featured Visual Collections
                  </h3>
                  <button onClick={() => setSubmodule('collections')} className="text-xs font-bold text-[#411548] hover:underline cursor-pointer">
                    View All Collections →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {collections.map(col => (
                    <div key={col.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 hover:border-[#411548] transition-all">
                      <div className="flex items-center justify-between">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                        <span className="text-[10px] font-black text-gray-400 uppercase">{col.itemCount} Assets</span>
                      </div>
                      <h4 className="font-extrabold text-xs text-gray-900 line-clamp-1">{col.name}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2">{col.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Assets Grid */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" /> Recently Added Media
                  </h3>
                  <button onClick={() => setSubmodule('library')} className="text-xs font-bold text-[#411548] hover:underline cursor-pointer">
                    Open Media Library →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {mediaList.slice(0, 6).map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setInspectedMedia(item)}
                      className="group cursor-pointer bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#411548] transition-all"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-2 text-[10px] font-bold text-gray-800 truncate">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBMODULE 2: FOLDERS VIEW */}
          {submodule === 'folders' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#C5A059]" /> Storage Folder Hierarchy
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Categorized digital folders for funeral sanctuary photos, floral tributes, and memorial brochures.</p>
                </div>
                <button
                  onClick={() => setShowCreateFolderModal(true)}
                  className="px-3.5 py-2 bg-[#411548] text-[#C5A059] text-xs font-black uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FolderPlus className="w-4 h-4" /> New Folder
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map(fld => (
                  <div 
                    key={fld.id}
                    onClick={() => {
                      setActiveFolderId(fld.id);
                      setSubmodule('library');
                    }}
                    className="p-5 bg-gray-50 hover:bg-purple-50/40 rounded-2xl border border-gray-200 hover:border-[#411548] transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#411548]/10 text-[#411548] flex items-center justify-center">
                        <Folder className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 font-mono">{fld.size}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900">{fld.name}</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">{fld.itemCount} items stored</p>
                    </div>

                    <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-400 font-bold flex items-center justify-between">
                      <span>Updated {fld.updatedAt}</span>
                      <span className="text-[#411548] font-black">Browse →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMODULE 3: COLLECTIONS VIEW */}
          {submodule === 'collections' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C5A059]" /> Visual Collections Manager
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Group related images into shareable sets for website galleries, chapel showcases, and floral albums.</p>
                </div>
                <button
                  onClick={() => setShowCreateCollectionModal(true)}
                  className="px-3.5 py-2 bg-[#411548] text-[#C5A059] text-xs font-black uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" /> New Collection
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {collections.map(col => (
                  <div key={col.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 hover:border-[#411548] transition-all">
                    <div className="flex items-center justify-between">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: col.color }} />
                      <span className="px-2.5 py-0.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[10px] font-black">
                        {col.itemCount} items
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900">{col.name}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium mt-1">{col.description}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 font-bold">Updated {col.updatedAt}</span>
                      <button 
                        onClick={() => {
                          setActiveCollectionId(col.id);
                          setSubmodule('library');
                        }}
                        className="text-[#411548] font-black hover:underline cursor-pointer text-xs"
                      >
                        View Items →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMODULE 4 & 5: MEDIA LIBRARY & RECENTS */}
          {(submodule === 'library' || submodule === 'recently_added') && (
            <div className="space-y-4">
              {/* Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-bold">
                <div className="relative flex-1 w-full md:w-auto">
                  <Search className="w-4 h-4 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search asset title, filename, or alt text..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Chapel">Chapel</option>
                    <option value="Floral">Floral</option>
                    <option value="Burial">Burial</option>
                  </select>

                  <div className="flex bg-gray-100 p-1 rounded-xl gap-1 shrink-0">
                    <button
                      onClick={() => setLayoutType('grid')}
                      className={`p-1.5 rounded-lg cursor-pointer ${layoutType === 'grid' ? 'bg-white text-[#411548] shadow-2xs' : 'text-gray-400'}`}
                      title="Grid Cards"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setLayoutType('table')}
                      className={`p-1.5 rounded-lg cursor-pointer ${layoutType === 'table' ? 'bg-white text-[#411548] shadow-2xs' : 'text-gray-400'}`}
                      title="Table Roster"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid View */}
              {layoutType === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                          <button
                            onClick={() => setPreviewMedia(item)}
                            className="p-1.5 bg-white text-gray-800 rounded-lg hover:bg-[#C5A059] hover:text-[#411548] cursor-pointer"
                            title="Preview High-Res"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setInspectedMedia(item)}
                            className="p-1.5 bg-white text-gray-800 rounded-lg hover:bg-[#411548] hover:text-white cursor-pointer"
                            title="Inspect Metadata"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyUrl(item)}
                            className="p-1.5 bg-white text-gray-800 rounded-lg hover:bg-emerald-600 hover:text-white cursor-pointer"
                            title="Copy URL"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 space-y-1">
                        <h4 className="font-black text-xs text-gray-900 truncate">{item.title}</h4>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                          <span>{item.dimensions || '1920x1080'}</span>
                          <span>{item.size || '850 KB'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
              {layoutType === 'table' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-bold border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500">
                          <th className="p-3">Asset</th>
                          <th className="p-3">Dimensions</th>
                          <th className="p-3">Size</th>
                          <th className="p-3">Alt Text</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredMedia.map(item => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="p-3 flex items-center gap-2.5">
                              <img src={item.url} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0" />
                              <div className="min-w-0">
                                <span className="font-extrabold text-gray-900 block truncate">{item.title}</span>
                                <span className="text-[10px] text-gray-400 font-mono">{item.filename}</span>
                              </div>
                            </td>
                            <td className="p-3 text-gray-600 font-mono text-[11px]">{item.dimensions}</td>
                            <td className="p-3 text-gray-600 font-mono text-[11px]">{item.size}</td>
                            <td className="p-3 text-gray-500 text-[11px] max-w-xs truncate">{item.altText || item.title}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button onClick={() => setInspectedMedia(item)} className="p-1.5 bg-gray-100 hover:bg-[#411548] hover:text-white rounded-lg cursor-pointer">
                                  <Sliders className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleCopyUrl(item)} className="p-1.5 bg-gray-100 hover:bg-[#C5A059] hover:text-[#411548] rounded-lg cursor-pointer">
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleSoftDelete(item)} className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg cursor-pointer">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBMODULE 6: TRASH BIN */}
          {submodule === 'trash' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-sm text-red-700 uppercase flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Deleted Assets Bin ({trashList.length})
                </h3>
                {trashList.length > 0 && (
                  <button 
                    onClick={() => {
                      setTrashList([]);
                      onShowToast('Emptied all items from trash');
                    }}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Empty Trash
                  </button>
                )}
              </div>

              {trashList.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <Trash2 className="w-10 h-10 mx-auto text-gray-300" />
                  <p className="text-xs font-bold">Trash bin is completely empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trashList.map(item => (
                    <div key={item.id} className="p-3 bg-red-50/40 rounded-2xl border border-red-200 flex items-center justify-between gap-3">
                      <img src={item.url} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-gray-900 block truncate">{item.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{item.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleRestoreFromTrash(item)} className="p-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer" title="Restore">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handlePermanentDelete(item.id)} className="p-1.5 bg-red-800 text-white rounded-lg text-xs font-bold cursor-pointer" title="Permanently Delete">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* 4. SLIDE-OVER METADATA INSPECTOR PANEL */}
        {inspectedMedia && (
          <div className="w-full lg:w-80 bg-white p-5 rounded-3xl border border-gray-200 shadow-xl space-y-4 shrink-0 animate-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-black text-xs uppercase text-[#411548]">Metadata Inspector</span>
              <button onClick={() => setInspectedMedia(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <img src={inspectedMedia.url} alt={inspectedMedia.title} className="w-full h-40 object-cover rounded-xl border border-gray-200 shadow-2xs" />

            <div className="space-y-2 text-xs font-bold">
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-black block">Title</label>
                <div className="text-gray-900">{inspectedMedia.title}</div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-400 font-black block">Filename</label>
                <div className="text-gray-700 font-mono text-[11px]">{inspectedMedia.filename}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Dimensions</span>
                  <span className="text-gray-800 font-mono">{inspectedMedia.dimensions}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">File Size</span>
                  <span className="text-gray-800 font-mono">{inspectedMedia.size}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-400 font-black block">Alt Text (Accessibility)</label>
                <div className="text-gray-700 font-medium text-[11px] bg-gray-50 p-2 rounded-lg border border-gray-200">
                  {inspectedMedia.altText || inspectedMedia.title}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => openAiAssistant(inspectedMedia)}
                className="w-full py-2 bg-gradient-to-r from-[#411548] to-[#250829] text-[#C5A059] rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Wand2 className="w-3.5 h-3.5" /> AI Alt-Text Assistant
              </button>
              <button
                onClick={() => handleCopyUrl(inspectedMedia)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Copy CDN Link
              </button>
              <button
                onClick={() => handleSoftDelete(inspectedMedia)}
                className="w-full py-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Move to Trash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: UPLOAD SYSTEM MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#C5A059]" /> Upload Media Asset
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block uppercase text-gray-500 mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. St. Paul Sanctuary Memorial Chapel"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block uppercase text-gray-500 mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="/apple_valley_funeral_chapel.png"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block uppercase text-gray-500 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer"
                >
                  <option value="Chapel">Chapel Facilities</option>
                  <option value="Floral">Floral Arrangements</option>
                  <option value="Burial">Burial Grounds</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-gray-500 mb-1">Alt Text (Accessibility)</label>
                <input
                  type="text"
                  value={uploadAltText}
                  onChange={(e) => setUploadAltText(e.target.value)}
                  placeholder="Describe image for screen readers"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#411548] text-[#C5A059] rounded-xl text-xs font-black uppercase cursor-pointer hover:bg-[#2c0a32] shadow-md"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: AI METADATA ASSISTANT MODAL */}
      {aiAssistantMedia && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-[#C5A059]" /> AI Vision Metadata Assistant
              </h3>
              <button onClick={() => setAiAssistantMedia(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Generated Alt-Text</label>
                <textarea
                  rows={2}
                  value={aiAltText}
                  onChange={(e) => setAiAltText(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Generated Caption</label>
                <input
                  type="text"
                  value={aiCaption}
                  onChange={(e) => setAiCaption(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">SEO Keywords</label>
                <div className="flex flex-wrap gap-1.5">
                  {aiKeywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-50 text-[#411548] rounded-md text-[10px] font-bold">
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                onClick={handleRunAiAnalysis}
                disabled={aiGenerating}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${aiGenerating ? 'animate-spin' : ''}`} />
                {aiGenerating ? 'Analyzing...' : 'Re-Analyze Image'}
              </button>

              <button
                onClick={() => {
                  const updated = mediaList.map(m => m.id === aiAssistantMedia.id ? { ...m, altText: aiAltText } : m);
                  blogStore.saveMedia(updated);
                  setMediaList(updated);
                  setAiAssistantMedia(null);
                  onShowToast('Applied AI metadata to asset');
                }}
                className="px-5 py-2 bg-[#411548] text-[#C5A059] rounded-xl text-xs font-black uppercase cursor-pointer"
              >
                Apply Metadata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: HIGH-RES MEDIA PREVIEW MODAL */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-[#411548]">{previewMedia.title}</span>
              <button onClick={() => setPreviewMedia(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={previewMedia.url} alt={previewMedia.title} className="w-full max-h-[70vh] object-contain rounded-2xl bg-black/5" />
          </div>
        </div>
      )}

    </div>
  );
}
