import React, { useState } from 'react';
import { 
  Heart, Plus, Search, Filter, Calendar, MapPin, 
  Eye, Edit3, Trash2, CheckCircle2, Clock, Share2, 
  FileText, Download, Printer, User, Sparkles, X, Check
} from 'lucide-react';
import { blogStore, ObituaryItem } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsObituaries({ onShowToast }: Props) {
  const [obituaries, setObituaries] = useState<ObituaryItem[]>(() => blogStore.getObituaries());
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'pending' | 'drafts'>('all');
  const [search, setSearch] = useState('');
  
  // Modals
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [inspectingObit, setInspectingObit] = useState<ObituaryItem | null>(null);
  const [editingObitId, setEditingObitId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ObituaryItem>>({
    name: '',
    sunrise: '1945-05-12',
    sunset: '2026-03-01',
    serviceDate: 'March 14, 2026 at 11:00 AM',
    serviceLocation: 'Middleton Historic Chapel, St. Paul, MN',
    biography: '',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    status: 'published',
    featured: false
  });

  const handleOpenCreate = () => {
    setEditingObitId(null);
    setFormData({
      name: '',
      sunrise: '1948-06-15',
      sunset: new Date().toISOString().split('T')[0],
      serviceDate: 'Saturday, 11:00 AM',
      serviceLocation: 'Apple Valley Memorial Chapel',
      biography: '',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      status: 'published',
      featured: false
    });
    setShowEditorModal(true);
  };

  const handleOpenEdit = (item: ObituaryItem) => {
    setEditingObitId(item.id);
    setFormData({ ...item });
    setShowEditorModal(true);
  };

  const handleSaveObituary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    if (editingObitId) {
      const updated = obituaries.map(o => o.id === editingObitId ? { ...o, ...formData } as ObituaryItem : o);
      blogStore.saveObituaries(updated);
      setObituaries(updated);
      onShowToast(`Updated memorial tribute for ${formData.name}`);
    } else {
      const newObit: ObituaryItem = {
        id: `obit-${Date.now()}`,
        name: formData.name.trim(),
        sunrise: formData.sunrise || '1950',
        sunset: formData.sunset || '2026',
        serviceDate: formData.serviceDate || 'To be announced',
        serviceLocation: formData.serviceLocation || 'Middleton Chapel',
        biography: formData.biography || 'Beloved family member remembered with deep gratitude and enduring love.',
        photo: formData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        condolencesCount: 0,
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: formData.status as any || 'published',
        featured: formData.featured || false
      };
      const updated = [newObit, ...obituaries];
      blogStore.saveObituaries(updated);
      setObituaries(updated);
      onShowToast(`Published memorial tribute for ${newObit.name}`);
    }

    setShowEditorModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the memorial tribute for ${name}?`)) {
      const updated = obituaries.filter(o => o.id !== id);
      blogStore.saveObituaries(updated);
      setObituaries(updated);
      onShowToast(`Archived tribute for ${name}`);
    }
  };

  const filteredObituaries = obituaries.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || 
                        o.serviceLocation.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'published') return matchSearch && o.status === 'published';
    if (activeTab === 'pending') return matchSearch && o.status === 'pending';
    if (activeTab === 'drafts') return matchSearch && o.status === 'draft';
    return matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner (1. Title -> 2. Text -> 3. Buttons) */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-xl space-y-4 border border-[#C5A059]/40 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <Heart className="w-7 h-7 text-[#C5A059] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-white">
              Obituaries & Memorial Tributes
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#411548] font-black text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> + Publish Obituary
            </button>
            <button
              onClick={() => onShowToast('Exported Obituaries Register (PDF)')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-[#411548] font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-2 transition-all cursor-pointer border border-white/20"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" /> Print Register
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-white/80 font-light max-w-4xl leading-relaxed relative z-10">
          Curate sacred memorial listings, ceremony timings, funeral chapel locations, online condolence guestbooks, and family photo tributes.
        </p>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10 overflow-x-auto relative z-10">
          {[
            { id: 'all', label: 'All Memorials', count: obituaries.length },
            { id: 'published', label: 'Active Services', count: obituaries.filter(o => o.status === 'published').length },
            { id: 'pending', label: 'Family Submissions', count: obituaries.filter(o => o.status === 'pending').length },
            { id: 'drafts', label: 'Drafts', count: obituaries.filter(o => o.status === 'draft').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C5A059] text-[#411548] shadow-md font-extrabold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#411548] text-white' : 'bg-white/20 text-white'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deceased name, service chapel, or city..."
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#411548]"
          />
        </div>
        <span className="text-xs font-bold text-gray-400">
          Showing {filteredObituaries.length} tributes
        </span>
      </div>

      {/* Obituaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObituaries.map(obit => (
          <div
            key={obit.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={obit.photo}
                  alt={obit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    obit.status === 'published' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {obit.status}
                  </span>
                  {obit.featured && (
                    <span className="px-2.5 py-0.5 bg-[#C5A059] text-[#411548] rounded-full text-[9px] font-black uppercase">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-[#C5A059] font-bold block">
                    {obit.sunrise} &ndash; {obit.sunset}
                  </span>
                  <h3 className="font-serif font-black text-lg text-white leading-tight">
                    {obit.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="font-bold">{obit.serviceDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="truncate">{obit.serviceLocation}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-light line-clamp-3 leading-relaxed">
                  {obit.biography}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setInspectingObit(obit)}
                  className="p-2 bg-gray-50 hover:bg-[#faf4fa] text-[#411548] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> Inspect
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(obit)}
                    className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl cursor-pointer"
                    title="Edit Obituary"
                  >
                    <Edit3 className="w-4 h-4 text-[#411548]" />
                  </button>
                  <button
                    onClick={() => handleDelete(obit.id, obit.name)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-xl cursor-pointer"
                    title="Archive Obituary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE OBITUARY MODAL */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C5A059]" />
                <span>{editingObitId ? `Edit Tribute: ${formData.name}` : 'Publish Memorial Obituary'}</span>
              </h3>
              <button onClick={() => setShowEditorModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveObituary} className="space-y-4 text-xs">
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Full Name of Deceased *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Margaret Evelyn Thornton"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Sunrise (Date of Birth) *</label>
                  <input
                    type="text"
                    required
                    value={formData.sunrise}
                    onChange={(e) => setFormData({ ...formData, sunrise: e.target.value })}
                    placeholder="e.g. June 14, 1942"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Sunset (Date of Passing) *</label>
                  <input
                    type="text"
                    required
                    value={formData.sunset}
                    onChange={(e) => setFormData({ ...formData, sunset: e.target.value })}
                    placeholder="e.g. March 1, 2026"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Service Date & Time</label>
                  <input
                    type="text"
                    value={formData.serviceDate}
                    onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                    placeholder="e.g. Saturday, March 14 at 11:00 AM"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Chapel / Venue Location</label>
                  <input
                    type="text"
                    value={formData.serviceLocation}
                    onChange={(e) => setFormData({ ...formData, serviceLocation: e.target.value })}
                    placeholder="e.g. Middleton Historic Chapel, St. Paul, MN"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Memorial Portrait Photo URL</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Eulogy & Memorial Biography</label>
                <textarea
                  rows={5}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  placeholder="Share the life story, surviving relatives, service notes, and memorial donation preferences..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-light leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#411548] rounded"
                  />
                  <span className="font-bold text-gray-700">Pin as Featured Tribute on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase tracking-wider shadow-md"
                >
                  {editingObitId ? 'Save Changes' : 'Publish Memorial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSPECT DOSSIER MODAL */}
      {inspectingObit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">
                Memorial Record: {inspectingObit.name}
              </h3>
              <button onClick={() => setInspectingObit(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#faf4fa] rounded-2xl border border-[#411548]/15">
              <img src={inspectingObit.photo} alt={inspectingObit.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#C5A059]" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C5A059] block">
                  Sunrise: {inspectingObit.sunrise} • Sunset: {inspectingObit.sunset}
                </span>
                <h4 className="font-serif font-black text-xl text-gray-900">{inspectingObit.name}</h4>
                <p className="text-xs text-gray-500 font-medium">{inspectingObit.serviceLocation}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <span className="font-bold text-gray-700 uppercase text-[10px] block">Full Eulogy & Remembrance</span>
              <p className="text-xs text-gray-700 leading-relaxed font-light">{inspectingObit.biography}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                onClick={() => setInspectingObit(null)}
                className="px-6 py-2 bg-[#411548] text-white rounded-full text-xs font-black uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
