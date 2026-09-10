import React, { useState } from 'react';
import { Heart, Plus, Calendar, MapPin, User, CheckCircle2, Clock, X } from 'lucide-react';
import { blogStore, BeneficiaryRecord } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsBeneficiaries({ onShowToast }: Props) {
  const [bens, setBens] = useState<BeneficiaryRecord[]>(() => blogStore.getBeneficiaries());
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Form State
  const [name, setName] = useState('');
  const [familyContact, setFamilyContact] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceType, setServiceType] = useState('Traditional Church Liturgy & Burial');
  const [tributeTitle, setTributeTitle] = useState('');
  const [chapelLocation, setChapelLocation] = useState('Main Sanctuary, Apple Valley');
  const [notes, setNotes] = useState('');

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRecord: BeneficiaryRecord = {
      id: `ben-${Date.now()}`,
      name: name.trim(),
      familyContact: familyContact.trim() || 'Family Representative',
      serviceDate: serviceDate || new Date().toISOString().split('T')[0],
      serviceType,
      tributeTitle: tributeTitle.trim() || `Honoring the Memory of ${name.trim()}`,
      status: 'Active Care',
      chapelLocation,
      notes: notes.trim()
    };

    const updated = [newRecord, ...bens];
    blogStore.saveBeneficiaries(updated);
    setBens(updated);
    setShowAddModal(false);
    setName('');
    setFamilyContact('');
    setServiceDate('');
    setTributeTitle('');
    setNotes('');
    onShowToast(`Created memorial record for ${newRecord.name}`);
  };

  const handleStatusChange = (id: string, newStatus: BeneficiaryRecord['status']) => {
    const updated = bens.map(b => b.id === id ? { ...b, status: newStatus } : b);
    blogStore.saveBeneficiaries(updated);
    setBens(updated);
    onShowToast(`Updated status to ${newStatus}`);
  };

  const filtered = bens.filter(b => filterStatus === 'All' || b.status === filterStatus);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">Honored Families & Memorial Tributes</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2.5 bg-[#C5A059] hover:bg-white text-[#411548] font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> + New Family Record
          </button>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Coordinate memorial arrangements, family contact logs, chapel schedules, and ongoing bereavement aftercare support.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2 overflow-x-auto">
        {['All', 'Active Care', 'Aftercare Support', 'Completed'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              filterStatus === st ? 'bg-[#411548] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(b => (
          <div key={b.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between border-t-4 border-t-[#411548]">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif font-black text-lg text-gray-900">{b.name}</h3>
                  <p className="text-xs text-[#411548] font-bold">{b.serviceType}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase shrink-0 ${
                  b.status === 'Active Care' ? 'bg-amber-100 text-amber-800' :
                  b.status === 'Aftercare Support' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 font-light border-y border-gray-100 py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Service Date: <strong>{b.serviceDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{b.chapelLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Contact: {b.familyContact}</span>
                </div>
              </div>

              {b.notes && (
                <p className="text-xs text-gray-500 font-light italic bg-gray-50 p-3 rounded-xl">
                  "{b.notes}"
                </p>
              )}
            </div>

            {/* Status change actions */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Set Status:</span>
              <div className="flex gap-1.5">
                {(['Active Care', 'Aftercare Support', 'Completed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(b.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase cursor-pointer ${
                      b.status === st ? 'bg-[#411548] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">New Honored Family Memorial Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBeneficiary} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Loved One Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Katherine Anne Larson"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-700 mb-1">Family Contact Phone/Name</label>
                  <input 
                    type="text" 
                    value={familyContact}
                    onChange={(e) => setFamilyContact(e.target.value)}
                    placeholder="e.g. Thomas Larson • (952) 486-..."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-700 mb-1">Service Date</label>
                  <input 
                    type="date" 
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                >
                  <option value="Traditional Church Liturgy & Burial">Traditional Church Liturgy & Burial</option>
                  <option value="Celebration of Life & Reception">Celebration of Life & Reception</option>
                  <option value="Memorial Cremation Service">Memorial Cremation Service</option>
                  <option value="Green Burial & Natural Internment">Green Burial & Natural Internment</option>
                  <option value="Private Family Visitation">Private Family Visitation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Chapel / Venue</label>
                <input 
                  type="text" 
                  value={chapelLocation}
                  onChange={(e) => setChapelLocation(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Arrangement Notes</label>
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requests, floral tributes, music preferences..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-light"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#411548] text-white text-xs font-black uppercase tracking-widest rounded-full"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
