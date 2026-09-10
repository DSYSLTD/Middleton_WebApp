import React, { useState } from 'react';
import { Database, Download, Upload, CheckCircle2, AlertTriangle, FileText, History } from 'lucide-react';
import { blogStore } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsBackups({ onShowToast }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [restoreJson, setRestoreJson] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const handleExportBackup = () => {
    setIsExporting(true);
    try {
      const backupData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        institution: 'Middleton Funeral Services',
        posts: blogStore.getPosts(),
        categories: blogStore.getCategories(),
        authors: blogStore.getAuthors(),
        vacancies: blogStore.getVacancies(),
        media: blogStore.getMedia(),
        beneficiaries: blogStore.getBeneficiaries(),
        settings: blogStore.getSettings(),
        roles: blogStore.getRoles(),
        socials: blogStore.getSocials(),
        tracking: blogStore.getTracking()
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `middleton-funeral-services-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onShowToast('Enterprise snapshot downloaded successfully');
    } catch (e) {
      onShowToast('Failed to export backup data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRestoreBackup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreJson.trim()) return;

    try {
      const parsed = JSON.parse(restoreJson);
      if (parsed.posts) blogStore.savePosts(parsed.posts);
      if (parsed.categories) blogStore.saveCategories(parsed.categories);
      if (parsed.authors) blogStore.saveAuthors(parsed.authors);
      if (parsed.vacancies) blogStore.saveVacancies(parsed.vacancies);
      if (parsed.media) blogStore.saveMedia(parsed.media);
      if (parsed.beneficiaries) blogStore.saveBeneficiaries(parsed.beneficiaries);
      if (parsed.settings) blogStore.saveSettings(parsed.settings);
      if (parsed.roles) blogStore.saveRoles(parsed.roles);
      if (parsed.socials) blogStore.saveSocials(parsed.socials);
      if (parsed.tracking) blogStore.saveTracking(parsed.tracking);

      setShowRestoreModal(false);
      setRestoreJson('');
      onShowToast('Snapshot restored! Reloading updated modules...');
      setTimeout(() => window.location.reload(), 1200);
    } catch {
      onShowToast('Invalid JSON snapshot format. Check data and retry.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-[#C5A059]" />
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">Enterprise Backup & Disaster Recovery</h2>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Safeguard all memorial archives, honored family registries, director credentials, and career postings with full JSON snapshot export and restore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#411548]/10 rounded-2xl text-[#411548]">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-black text-base text-gray-900">Export Full System Snapshot</h3>
                <p className="text-xs text-gray-500 font-light">Includes articles, media URLs, job postings, and family records.</p>
              </div>
            </div>
            <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Complete JSON portable data
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Preserves article blocks & SEO metadata
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant local download
              </li>
            </ul>
          </div>

          <button
            onClick={handleExportBackup}
            disabled={isExporting}
            className="w-full py-3.5 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5A059]" /> {isExporting ? 'Generating...' : 'Download JSON Snapshot'}
          </button>
        </div>

        {/* Restore Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-700">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-black text-base text-gray-900">Restore from JSON Snapshot</h3>
                <p className="text-xs text-gray-500 font-light">Restore previously exported archive into the current system.</p>
              </div>
            </div>
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-2xl border border-amber-200/50 leading-relaxed font-light">
              <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
              Restoring a snapshot replaces the current local registry with the contents of the uploaded snapshot.
            </p>
          </div>

          <button
            onClick={() => setShowRestoreModal(true)}
            className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#411548]" /> Restore Snapshot
          </button>
        </div>
      </div>

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Restore System Snapshot</h3>
              <button onClick={() => setShowRestoreModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleRestoreBackup} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Paste JSON Backup Content *</label>
                <textarea 
                  rows={6} 
                  required
                  value={restoreJson}
                  onChange={(e) => setRestoreJson(e.target.value)}
                  placeholder="Paste JSON data exported previously..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRestoreModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#411548] text-white text-xs font-black uppercase tracking-widest rounded-full"
                >
                  Confirm & Restore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
