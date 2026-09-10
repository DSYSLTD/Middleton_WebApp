import React, { useState } from 'react';
import { Share2, Save, ExternalLink } from 'lucide-react';
import { blogStore, SocialMediaLink } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsSocialMedia({ onShowToast }: Props) {
  const [socials, setSocials] = useState<SocialMediaLink[]>(() => blogStore.getSocials());

  const handleUpdate = (id: string, url: string, enabled: boolean) => {
    const updated = socials.map(s => s.id === id ? { ...s, url, enabled } : s);
    setSocials(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    blogStore.saveSocials(socials);
    onShowToast('Social media links updated successfully');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex items-center gap-3">
          <Share2 className="w-6 h-6 text-[#C5A059]" />
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">Social Media & Memorial Broadcast Channels</h2>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Connect official Middleton Funeral Services accounts for public obituaries, live stream broadcasts, and community updates.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="space-y-4">
          {socials.map(s => (
            <div key={s.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="sm:w-1/3">
                <span className="font-serif font-black text-xs uppercase text-[#411548] block">{s.label}</span>
                <span className="text-[10px] text-gray-400 font-light">Public profile link</span>
              </div>
              
              <div className="flex-1 flex items-center gap-3">
                <input 
                  type="url" 
                  value={s.url}
                  onChange={(e) => handleUpdate(s.id, e.target.value, s.enabled)}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium"
                />
                <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={s.enabled}
                    onChange={(e) => handleUpdate(s.id, s.url, e.target.checked)}
                    className="w-4 h-4 accent-[#411548]"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#C5A059]" /> Save Social Channels
          </button>
        </div>
      </form>
    </div>
  );
}
