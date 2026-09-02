import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, Shield, Settings2, Lock } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: true,
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    // Show cookie consent popup on initial session or brief delay
    const savedConsent = localStorage.getItem('middleton_cookie_consent');
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    localStorage.setItem('middleton_cookie_consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    localStorage.setItem('middleton_cookie_consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('middleton_cookie_consent', JSON.stringify(preferences));
    setShowCustomize(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-gray-200 pointer-events-auto text-gray-900"
        >
          {!showCustomize ? (
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#411548] flex items-center justify-center shrink-0 mt-1">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-[#411548] uppercase tracking-tight flex items-center gap-2">
                    Cookie & Privacy Preferences
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed mt-1">
                    We use cookies to enhance your experience, serve secure forms, and analyze site traffic to support grieving families with seamless service. You can customize your settings anytime. Read our{' '}
                    <a href="#/privacy-policy" className="text-[#411548] font-bold underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex-1 lg:flex-none px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Settings2 size={15} /> Customize
                </button>
                <button
                  onClick={handleDeclineNonEssential}
                  className="flex-1 lg:flex-none px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 lg:flex-none px-6 py-3 rounded-2xl bg-[#411548] text-white hover:bg-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Custom Cookie Settings</h3>
                  <p className="text-xs text-gray-500 font-light mt-0.5">Choose which categories of cookies you consent to use.</p>
                </div>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Essential */}
                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={14} className="text-[#411548]" />
                      <span className="font-bold text-xs uppercase tracking-wider text-[#411548]">Strictly Necessary</span>
                      <span className="bg-purple-200 text-[#411548] text-[9px] font-black uppercase px-2 py-0.5 rounded">Always On</span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-light">Required for essential website navigation, appointment scheduling, and security verification.</p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-white flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Shield size={14} className="text-gray-700" />
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-900">Analytics & Performance</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light">Helps us understand website usage to continuously improve family support services.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 accent-[#411548] cursor-pointer mt-1"
                  />
                </div>

                {/* Functional */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-white flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Settings2 size={14} className="text-gray-700" />
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-900">Functional Preferences</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light">Remembers custom choices such as obituary filters and pricing document views.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-5 h-5 accent-[#411548] cursor-pointer mt-1"
                  />
                </div>

                {/* Marketing */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-white flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Cookie size={14} className="text-gray-700" />
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-900">Community Outreach</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light">Allows us to share grief support workshops and community memorial announcements.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-5 h-5 accent-[#411548] cursor-pointer mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2.5 rounded-xl bg-[#411548] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md"
                >
                  Save & Apply Settings
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
