import React, { useState } from 'react';
import { ShieldCheck, Save, RefreshCw, AlertTriangle, Building, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { blogStore, SiteSettings } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsSystemAdmin({ onShowToast }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(() => blogStore.getSettings());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    blogStore.saveSettings(settings);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('System settings updated successfully');
    }, 400);
  };

  const handleClearCache = () => {
    onShowToast('Edge cache cleared and search indexes rebuilt');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">System & Enterprise Administration</h2>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Configure institutional contact points, 24/7 care dispatch hotlines, business hours, and operational modes.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#C5A059]" /> Institution Name
            </label>
            <input 
              type="text" 
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A059]" /> Primary Inquiries Routing Email
            </label>
            <input 
              type="email" 
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A059]" /> 24/7 Immediate Need Hotline
            </label>
            <input 
              type="text" 
              value={settings.emergencyPhone}
              onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A059]" /> Office Main Desk Phone
            </label>
            <input 
              type="text" 
              value={settings.officePhone}
              onChange={(e) => setSettings({ ...settings, officePhone: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" /> Physical Care Location
            </label>
            <input 
              type="text" 
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059]" /> Business & Care Hours
            </label>
            <input 
              type="text" 
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        {/* Operational Switches */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-bold text-xs text-gray-900">Online Memorial Arrangements Gateway</p>
              <p className="text-[11px] text-gray-500 font-light">Allow families to initiate pre-need and arrangement intakes online.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.onlineArrangementsEnabled}
              onChange={(e) => setSettings({ ...settings, onlineArrangementsEnabled: e.target.checked })}
              className="w-5 h-5 accent-[#411548] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-bold text-xs text-gray-900">Maintenance Mode</p>
              <p className="text-[11px] text-gray-500 font-light">Temporarily pause public changes while staff updates records.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-5 h-5 accent-[#411548] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClearCache}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-full flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Rebuild Search Indexes & Cache
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#C5A059]" /> {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
