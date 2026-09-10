import React, { useState } from 'react';
import { Target, Save, Code, CheckCircle2 } from 'lucide-react';
import { blogStore, TrackingSettings } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsTracking({ onShowToast }: Props) {
  const [tracking, setTracking] = useState<TrackingSettings>(() => blogStore.getTracking());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    blogStore.saveTracking(tracking);
    onShowToast('Tracking & pixel activation updated successfully');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-[#C5A059]" />
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">Pixel Activation & Analytics Tracking</h2>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Integrate verified measurement tags for Google Analytics 4 (GA4), Meta Pixel, privacy consent compliance, and custom verification scripts.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input 
              type="text" 
              value={tracking.googleAnalyticsId}
              onChange={(e) => setTracking({ ...tracking, googleAnalyticsId: e.target.value })}
              placeholder="e.g. G-MIDD77912"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold"
            />
            <p className="text-[10px] text-gray-400 mt-1">Tracks grief resource viewership and arrangement flows.</p>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-700 mb-1">
              Meta / Facebook Pixel ID
            </label>
            <input 
              type="text" 
              value={tracking.metaPixelId}
              onChange={(e) => setTracking({ ...tracking, metaPixelId: e.target.value })}
              placeholder="e.g. 10982736451829"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold"
            />
            <p className="text-[10px] text-gray-400 mt-1">Measures community event registrations and obituary views.</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
          <div>
            <p className="font-bold text-xs text-gray-900">GDPR & CCPA Cookie Consent Banner</p>
            <p className="text-[11px] text-gray-500 font-light">Enforce respectful cookie policy compliance for family website visitors.</p>
          </div>
          <input 
            type="checkbox" 
            checked={tracking.cookieConsentBanner}
            onChange={(e) => setTracking({ ...tracking, cookieConsentBanner: e.target.checked })}
            className="w-5 h-5 accent-[#411548] cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-gray-700 mb-1 flex items-center gap-2">
            <Code className="w-4 h-4 text-[#C5A059]" /> Custom Header Scripts / Meta Tags
          </label>
          <textarea 
            rows={3}
            value={tracking.customHeadScript}
            onChange={(e) => setTracking({ ...tracking, customHeadScript: e.target.value })}
            placeholder="<!-- Add external verification tags here -->"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#C5A059]" /> Activate & Save Tracking
          </button>
        </div>
      </form>
    </div>
  );
}
