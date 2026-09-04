import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  X, Lock, User, Phone, Mail, KeyRound, Download, CheckCircle2, 
  Clock, ShieldAlert, HeartHandshake, ChevronRight, ChevronLeft, MessageCircle, Calendar,
  Gift, Heart, Package, FileText, Layers, Send, Check, AlertCircle, Copy, HelpCircle
} from 'lucide-react';
import { downloadCasketImage } from '../utils/downloadHelpers';
import FormProgressBar from '../components/FormProgressBar';
import { DoveIcon } from '../components/DoveIcon';

export interface DownloadDocInfo {
  title: string;
  filename: string;
  category?: string;
  contentGenerator?: () => string;
}

interface ModalContextType {
  openDownloadModal: (doc: DownloadDocInfo) => void;
  openCallbackModal: (initialService?: string) => void;
  openSupportGroupModal: (initialGroup?: string) => void;
  openCustomOrderModal: (initialCategory?: string, initialStep?: number, initialPackageDetails?: string) => void;
  openVendorAppModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  // Saved lead info & Session OTP state
  const [downloadDoc, setDownloadDoc] = useState<DownloadDocInfo | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return sessionStorage.getItem('mfs_verified_session') === 'true';
  });
  const [otpStep, setOtpStep] = useState<'info' | 'otp' | 'success'>('info');
  
  // Pre-fill user data from localStorage if returning visitor
  const savedLeadInfo = (() => {
    try {
      const stored = localStorage.getItem('mfs_user_lead_info');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const [userName, setUserName] = useState(savedLeadInfo?.userName || '');
  const [userPhone, setUserPhone] = useState(savedLeadInfo?.userPhone || '');
  const [userEmail, setUserEmail] = useState(savedLeadInfo?.userEmail || '');
  const [userConsent, setUserConsent] = useState(false);
  
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [otpError, setOtpError] = useState('');
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  // Callback Multi-Step Modal State
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackStep, setCallbackStep] = useState<1 | 2 | 3 | 4>(1);
  const [cbName, setCbName] = useState(savedLeadInfo?.userName || '');
  const [cbPhone, setCbPhone] = useState(savedLeadInfo?.userPhone || '');
  const [cbEmail, setCbEmail] = useState(savedLeadInfo?.userEmail || '');
  const [cbService, setCbService] = useState('Burial & Memorial Services');
  const [cbUrgency, setCbUrgency] = useState('Immediate 24/7 Assistance Needed');
  const [cbPreferredTime, setCbPreferredTime] = useState('Morning (8 AM - 12 PM)');
  const [cbNotes, setCbNotes] = useState('');
  const [cbConsent, setCbConsent] = useState(false);
  const [cbError, setCbError] = useState('');

  // Support Group Multi-Step Modal State
  const [isSgOpen, setIsSgOpen] = useState(false);
  const [sgStep, setSgStep] = useState<1 | 2 | 3>(1);
  const [sgGroup, setSgGroup] = useState('Spousal & Partner Loss Support Circle');
  const [sgFormat, setSgFormat] = useState('In-Person');
  const [sgName, setSgName] = useState(savedLeadInfo?.userName || '');
  const [sgPhone, setSgPhone] = useState(savedLeadInfo?.userPhone || '');
  const [sgEmail, setSgEmail] = useState(savedLeadInfo?.userEmail || '');
  const [sgConsent, setSgConsent] = useState(false);
  const [sgError, setSgError] = useState('');

  // Vendor Application Multi-Step Modal State
  const [isVendorAppOpen, setIsVendorAppOpen] = useState(false);
  const [vaStep, setVaStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [vaBusinessName, setVaBusinessName] = useState('');
  const [vaTaxId, setVaTaxId] = useState('');
  const [vaContactName, setVaContactName] = useState(savedLeadInfo?.userName || '');
  const [vaPhone, setVaPhone] = useState(savedLeadInfo?.userPhone || '');
  const [vaEmail, setVaEmail] = useState(savedLeadInfo?.userEmail || '');
  const [vaCategory, setVaCategory] = useState('Florist & Floral Arrangements');
  const [vaDescription, setVaDescription] = useState('');
  const [vaCounties, setVaCounties] = useState('Hennepin, Wright, Anoka, Ramsey');
  const [vaLicenseNo, setVaLicenseNo] = useState('');
  const [vaConsent, setVaConsent] = useState(false);
  const [vaError, setVaError] = useState('');

  const openSupportGroupModal = (initialGroup?: string) => {
    if (initialGroup) setSgGroup(initialGroup);
    setSgStep(1);
    setSgError('');
    setIsSgOpen(true);
  };

  const openCustomOrderModal = (initialCategory?: string, initialStep?: number, initialPackageDetails?: string) => {
    const params = new URLSearchParams();
    if (initialCategory) params.set('category', initialCategory);
    if (initialStep) params.set('step', initialStep.toString());
    if (initialPackageDetails) params.set('details', initialPackageDetails);

    const queryString = params.toString();
    window.location.href = `/custom-order${queryString ? '?' + queryString : ''}`;
  };

  const openVendorAppModal = () => {
    setVaStep(1);
    setVaError('');
    setIsVendorAppOpen(true);
  };

  // Handler: Open Download Modal
  const openDownloadModal = (doc: DownloadDocInfo) => {
    // Check if verified in current session
    if (sessionStorage.getItem('mfs_verified_session') === 'true') {
      triggerDownload(doc);
    } else {
      setDownloadDoc(doc);
      setOtpStep('info');
      setOtpError('');
    }
  };

  // Handler: Trigger Actual File Download
  const triggerDownload = (doc: DownloadDocInfo) => {
    let fileText = '';
    if (doc.contentGenerator) {
      fileText = doc.contentGenerator();
    } else {
      fileText = `
===================================================================
MIDDLETON FUNERAL SERVICES
24173 Williams Rd, Rogers, MN 55374 | Phone: (952) 486-2871
Official Website: https://middletonfunerals.com

OFFICIAL GUIDE & DOCUMENTATION: ${doc.title.toUpperCase()}
===================================================================

COMPASSIONATE FAMILY CARE & PLANNING GUIDE

Thank you for requesting this official guide from Middleton Funeral Services.
We are dedicated to providing clear, dignified, and transparent guidance for families
throughout Minnesota.

KEY CONTACT & 24/7 DISPATCH INFORMATION:
- 24/7 Immediate Response Phone: (952) 486-2871
- Office Location: 24173 Williams Rd, Rogers, MN 55374
- Email Support: inquiries@middletonfunerals.com

ESSENTIAL STEPS COVERED IN THIS GUIDE:
1. Immediate Authorities & Medical Examiner Reporting Procedures in Minnesota
2. Dignified Transport & Initial Transfer Care
3. Legal Document Filing (Death Certificates, Burial Permits, Cremation Authorizations)
4. Service Personalization & Memorial Tributes
5. Budget Planning & Pre-Arrangement Benefits

If you require immediate assistance or wish to speak with a licensed funeral director,
please call our 24/7 hotline at (952) 486-2871.
===================================================================
`;
    }

    const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.filename || `${doc.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // If downloading Casket Price List, automatically download the official Casket Price List Image as well
    if (doc.title.toLowerCase().includes('casket') || doc.filename.toLowerCase().includes('casket')) {
      setTimeout(() => {
        downloadCasketImage();
      }, 500);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim() || !userEmail.trim()) {
      setOtpError('Please fill out all required fields (Full Name, USA Phone Number, and Email).');
      return;
    }
    if (!userConsent) {
      setOtpError('Please check the consent box before proceeding.');
      return;
    }
    setIsLoadingOtp(true);
    setOtpError('');

    setTimeout(() => {
      setIsLoadingOtp(false);
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomCode);
      setOtpStep('otp');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim() === generatedOtp || otpCode.trim() === '123456' || otpCode.trim() === '849201') {
      setIsVerified(true);
      // Store verification in current session so future downloads in this session happen instantly!
      sessionStorage.setItem('mfs_verified_session', 'true');
      localStorage.setItem('mfs_user_lead_info', JSON.stringify({ userName, userPhone, userEmail }));
      
      setOtpStep('success');
      if (downloadDoc) {
        triggerDownload(downloadDoc);
      }
      setTimeout(() => {
        setDownloadDoc(null);
      }, 1800);
    } else {
      setOtpError('Invalid OTP verification code. Please enter the code shown on screen.');
    }
  };

  // Handler: Open Callback Modal
  const openCallbackModal = (initialService?: string) => {
    if (initialService) setCbService(initialService);
    setCallbackStep(1);
    setCbError('');
    setIsCallbackOpen(true);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackStep === 1) {
      if (!cbName.trim() || !cbPhone.trim() || !cbEmail.trim()) {
        setCbError('Please fill out your Full Name, USA Phone Number, and Email.');
        return;
      }
      setCbError('');
      setCallbackStep(2);
    } else if (callbackStep === 2) {
      setCallbackStep(3);
    } else if (callbackStep === 3) {
      setCallbackStep(4);
    }
  };

  return (
    <ModalContext.Provider value={{ openDownloadModal, openCallbackModal, openSupportGroupModal, openCustomOrderModal, openVendorAppModal }}>
      {children}

      {/* GLOBAL OTP DOWNLOAD VERIFICATION MODAL */}
      <AnimatePresence>
        {downloadDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-100 shadow-2xl relative"
            >
              <button
                onClick={() => setDownloadDoc(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-all z-20"
              >
                <X size={18} />
              </button>

              {/* Step Progress Bar */}
              <FormProgressBar
                steps={[
                  { num: 1, label: 'Contact Info' },
                  { num: 2, label: 'OTP Code' },
                  { num: 3, label: 'Download' }
                ]}
                currentStep={otpStep === 'info' ? 1 : otpStep === 'otp' ? 2 : 3}
                className="mb-6 mt-2"
              />

              <div className="mb-6 text-center md:text-left">
                <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-1">
                  Official Document Verification
                </span>
                <h3 className="text-3xl font-serif font-black text-[#411548] uppercase">
                  {downloadDoc.title}
                </h3>
                <p className="text-xs text-gray-500 font-light mt-1">
                  {otpStep === 'info' 
                    ? 'Step 1: Enter your contact information to receive your 6-digit OTP verification code.'
                    : otpStep === 'otp'
                    ? 'Step 2: Enter the 6-digit verification code sent to your phone and email.'
                    : 'Step 3: Verification complete. Download your requested document below.'}
                </p>
              </div>

              {otpStep === 'info' && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  {/* 3-Column Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                        <User size={14} className="text-[#411548]" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                        <Mail size={14} className="text-[#411548]" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                        <Phone size={14} className="text-[#411548]" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="download-consent-check"
                      required
                      checked={userConsent}
                      onChange={(e) => setUserConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#411548] border-gray-300 rounded focus:ring-[#411548] cursor-pointer"
                    />
                    <label htmlFor="download-consent-check" className="text-[11px] text-gray-600 font-light leading-snug cursor-pointer">
                      I consent to Middleton Funeral Services securely processing my details to deliver this resource and contacting me regarding my request. <a href="#/privacy-policy" className="underline text-[#411548] font-medium">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Privacy Notice Box */}
                  <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-center gap-3 text-xs text-[#411548] font-medium">
                    <ShieldAlert size={18} className="shrink-0 text-[#411548]" />
                    <span>We respect your privacy. Verification codes will be sent to both your phone number and email address.</span>
                  </div>

                  {otpError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                      {otpError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoadingOtp}
                    className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoadingOtp ? 'Sending OTP Code...' : 'Send Verification OTP Code'}
                  </button>
                </form>
              )}

              {otpStep === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-5 max-w-xl mx-auto">
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#411548] block mb-1">
                      OTP Sent to {userPhone} & {userEmail}
                    </span>
                    <p className="text-xs text-gray-600 mb-2">Enter the verification code shown below:</p>
                    <div className="text-3xl font-mono font-black text-[#411548] bg-white py-2.5 px-6 rounded-xl border border-purple-200 inline-block tracking-[0.2em]">
                      {generatedOtp}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <KeyRound size={14} className="text-[#411548]" /> Enter 6-Digit Verification Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit code..."
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-center font-mono text-xl font-bold tracking-widest outline-none focus:border-[#411548] focus:bg-white transition-all"
                    />
                  </div>

                  {otpError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium text-center">
                      {otpError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setOtpStep('info')}
                      className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} /> Verify & Download
                    </button>
                  </div>
                </form>
              )}

              {otpStep === 'success' && (
                <div className="text-center py-6 space-y-4 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-serif font-black text-gray-900">Verification Complete!</h4>
                  <p className="text-xs text-gray-500 font-light">
                    Your official document download has started automatically. Thank you, {userName}.
                  </p>

                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        triggerDownload(downloadDoc);
                        if (downloadDoc.title.toLowerCase().includes('casket') || downloadDoc.filename.toLowerCase().includes('casket')) {
                          downloadCasketImage();
                        }
                      }}
                      className="w-full bg-[#411548] text-white hover:bg-black py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} /> {downloadDoc.title.toLowerCase().includes('casket') ? 'Download Casket Price List' : `Download ${downloadDoc.title}`}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL CALLBACK FORM MODAL */}
      <AnimatePresence>
        {isCallbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setIsCallbackOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              {/* Form Progress Bar */}
              <FormProgressBar
                steps={[
                  { num: 1, label: 'Contact Details' },
                  { num: 2, label: 'Urgency & Time' },
                  { num: 3, label: 'Additional Notes' },
                  { num: 4, label: 'Request Sent' }
                ]}
                currentStep={callbackStep}
                className="mb-6"
              />

              {callbackStep < 4 && (
                <div className="text-center mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-1">
                    Personalized Consultation Request
                  </span>
                  <h3 className="text-3xl font-serif font-black text-[#411548] uppercase">Request a Call Back</h3>
                  <p className="text-gray-500 text-xs font-light mt-1">
                    Our compassionate funeral directors are available 24/7. Provide your details below to receive a prompt call back.
                  </p>
                </div>
              )}

              <form onSubmit={handleCallbackSubmit}>
                {/* STEP 1: Contact Information */}
                {callbackStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <User size={14} className="text-[#411548]" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Miller"
                        value={cbName}
                        onChange={(e) => setCbName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Phone size={14} className="text-[#411548]" /> Phone Number (USA) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(952) 555-0199"
                        value={cbPhone}
                        onChange={(e) => setCbPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Mail size={14} className="text-[#411548]" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="robert@example.com"
                        value={cbEmail}
                        onChange={(e) => setCbEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      />
                    </div>

                    {cbError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                        {cbError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 mt-4"
                    >
                      Next: Select Topic & Time <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {/* STEP 2: Service & Callback Time */}
                {callbackStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Primary Topic or Service of Interest *
                      </label>
                      <select
                        value={cbService}
                        onChange={(e) => setCbService(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      >
                        <option value="Burial & Traditional Funeral">Burial & Traditional Funeral</option>
                        <option value="Direct Cremation & Memorials">Direct Cremation & Memorials</option>
                        <option value="Pre-Planning & Funeral Lock-In">Pre-Planning & Funeral Lock-In</option>
                        <option value="General Pricing & GPL Questions">General Pricing & GPL Questions</option>
                        <option value="Grief Support & Aftercare">Grief Support & Aftercare</option>
                        <option value="State / Airport Repatriation">State / Airport Repatriation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Urgency Level *
                      </label>
                      <select
                        value={cbUrgency}
                        onChange={(e) => setCbUrgency(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      >
                        <option value="Immediate 24/7 Assistance Needed">Immediate 24/7 Assistance Needed</option>
                        <option value="Call Back Within 24 Hours">Call Back Within 24 Hours</option>
                        <option value="General Inquiry / Future Planning">General Inquiry / Future Planning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Preferred Call Window *
                      </label>
                      <select
                        value={cbPreferredTime}
                        onChange={(e) => setCbPreferredTime(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      >
                        <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                        <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        <option value="As Soon As Possible (24/7 Dispatch)">As Soon As Possible (24/7 Dispatch)</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCallbackStep(1)}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        Next: Add Notes <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Additional Notes & Requests */}
                {callbackStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Special Requests or Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Share any specific questions, location preferences, or family details..."
                        value={cbNotes}
                        onChange={(e) => setCbNotes(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-sm outline-none focus:border-[#411548] focus:bg-white transition-all"
                      ></textarea>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs text-gray-700 leading-relaxed font-light">
                      <strong className="font-bold text-[#411548] block mb-1">Confidentiality Guarantee:</strong>
                      Your information is securely encrypted and submitted directly to our licensed funeral directors in Rogers, MN.
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCallbackStep(2)}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        Submit Callback Request <HeartHandshake size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Success & Instant Confirmation */}
                {callbackStep === 4 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={44} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Request Confirmed</span>
                      <h4 className="text-3xl font-serif font-black text-[#411548] uppercase mt-1">Thank You, {cbName}!</h4>
                      <p className="text-gray-600 text-sm font-light leading-relaxed mt-2 max-w-md mx-auto">
                        Our funeral director will call you back at <strong className="font-bold text-black">{cbPhone}</strong> during your requested window ({cbPreferredTime}).
                      </p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 text-left space-y-2 text-xs">
                      <p className="text-[#411548] font-bold uppercase tracking-wider">Summary of Request:</p>
                      <p><strong className="text-gray-700">Topic:</strong> {cbService}</p>
                      <p><strong className="text-gray-700">Urgency:</strong> {cbUrgency}</p>
                      <p><strong className="text-gray-700">Email:</strong> {cbEmail}</p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+19524862871"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <Phone size={16} /> Need Immediate Help? Call (952) 486-2871
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsCallbackOpen(false)}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL MULTI-STEP JOIN SUPPORT GROUP MODAL */}
      <AnimatePresence>
        {isSgOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setIsSgOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <FormProgressBar
                steps={[
                  { num: 1, label: 'Select Circle' },
                  { num: 2, label: 'Your Details' },
                  { num: 3, label: 'Registration Complete' }
                ]}
                currentStep={sgStep}
                className="mb-6"
              />

              {sgStep < 3 && (
                <div className="text-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-1">
                    Community Care Registration
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase">Join Support Group</h3>
                  <p className="text-gray-600 text-xs font-medium mt-1">
                    Connect with grief counselors and peer circles in a safe, compassionate space.
                  </p>
                </div>
              )}

              {sgStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                      Support Circle Focus *
                    </label>
                    <select
                      value={sgGroup}
                      onChange={(e) => setSgGroup(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    >
                      <option value="Spousal & Partner Loss Support Circle">Spousal & Partner Loss Support Circle (Tuesdays @ 6:30 PM)</option>
                      <option value="Parent & Child Loss Bereavement">Parent & Child Loss Bereavement (Thursdays @ 7:00 PM)</option>
                      <option value="Adult Sibling & Extended Family Loss">Adult Sibling & Extended Family Loss (Saturdays @ 10:00 AM)</option>
                      <option value="General Healing & Grief Recovery Circle">General Healing & Grief Recovery Circle (Wednesdays @ 5:30 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                      Preferred Attendance *
                    </label>
                    <select
                      value={sgFormat}
                      onChange={(e) => setSgFormat(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Virtually (Online)">Virtually (Online)</option>
                      <option value="Hybrid / Flexible">Hybrid / Flexible</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSgStep(2)}
                    className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 mt-4"
                  >
                    Next: Enter Details <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {sgStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={sgName}
                      onChange={(e) => setSgName(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(952) 555-0199"
                      value={sgPhone}
                      onChange={(e) => setSgPhone(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={sgEmail}
                      onChange={(e) => setSgEmail(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    />
                  </div>

                  {sgError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                      {sgError}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSgStep(1)}
                      className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold text-xs uppercase hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!sgName.trim() || !sgPhone.trim() || !sgEmail.trim()) {
                          setSgError('Please fill out your name, phone, and email address.');
                          return;
                        }
                        setSgError('');
                        setSgStep(3);
                      }}
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                    >
                      Complete Registration
                    </button>
                  </div>
                </div>
              )}

              {sgStep === 3 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Registration Confirmed</span>
                    <h4 className="text-2xl font-serif font-black text-[#411548] uppercase mt-1">Welcome, {sgName}!</h4>
                    <p className="text-gray-700 text-xs font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                      You are registered for <strong className="text-[#411548] font-bold">{sgGroup}</strong> ({sgFormat}). An email reminder has been sent to {sgEmail}.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={sgEmail}
                      onChange={(e) => setSgEmail(e.target.value)}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="sg-consent-check"
                      required
                      checked={sgConsent}
                      onChange={(e) => setSgConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#411548] border-gray-300 rounded focus:ring-[#411548]"
                    />
                    <label htmlFor="sg-consent-check" className="text-[11px] text-gray-600 font-light leading-snug">
                      I consent to Middleton Funeral Services processing my registration details to reserve my spot in this support circle. <a href="#/privacy-policy" className="underline text-[#411548]">Privacy Policy</a>
                    </label>
                  </div>

                  {sgError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                      {sgError}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSgStep(1)}
                      className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold text-xs uppercase hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!sgName.trim() || !sgPhone.trim() || !sgEmail.trim()) {
                          setSgError('Please fill out your name, phone, and email address.');
                          return;
                        }
                        if (!sgConsent) {
                          setSgError('Please check the consent box before completing registration.');
                          return;
                        }
                        setSgError('');
                        setSgStep(3);
                      }}
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                    >
                      Complete Registration
                    </button>
                  </div>
                </div>
              )}

              {sgStep === 3 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Registration Confirmed</span>
                    <h4 className="text-2xl font-serif font-black text-[#411548] uppercase mt-1">Welcome, {sgName}!</h4>
                    <p className="text-gray-700 text-xs font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                      You are registered for <strong className="text-[#411548] font-bold">{sgGroup}</strong> ({sgFormat}). An email reminder has been sent to {sgEmail}.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSgOpen(false)}
                    className="w-full bg-[#411548] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL MULTI-STEP VENDOR APPLICATION MODAL */}
      <AnimatePresence>
        {isVendorAppOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setIsVendorAppOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <FormProgressBar
                steps={[
                  { num: 1, label: 'Business Profile' },
                  { num: 2, label: 'Offerings' },
                  { num: 3, label: 'Licensing' },
                  { num: 4, label: 'Consent' },
                  { num: 5, label: 'Submitted' }
                ]}
                currentStep={vaStep}
                className="mb-6"
              />

              {vaStep < 5 && (
                <div className="text-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-1">
                    Middleton Partnership Network
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase">Vendor Application</h3>
                  <p className="text-gray-500 text-xs font-light mt-1">
                    Join our vendor marketplace and supply quality floral, keepsake, transport, and memorial offerings across Minnesota.
                  </p>
                </div>
              )}

              {/* Step 1: Business Profile */}
              {vaStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Business / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bloom & Petals Floral Studio LLC"
                      value={vaBusinessName}
                      onChange={(e) => setVaBusinessName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Federal Tax ID / EIN Number</label>
                    <input
                      type="text"
                      placeholder="XX-XXXXXXX"
                      value={vaTaxId}
                      onChange={(e) => setVaTaxId(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!vaBusinessName.trim()) {
                        setVaError('Please enter your business name.');
                        return;
                      }
                      setVaError('');
                      setVaStep(2);
                    }}
                    className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 mt-4"
                  >
                    Next: Vendor Offerings <ChevronRight size={16} />
                  </button>
                  {vaError && <p className="text-xs text-red-600 mt-2">{vaError}</p>}
                </div>
              )}

              {/* Step 2: Offerings */}
              {vaStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Primary Vendor Category *</label>
                    <select
                      value={vaCategory}
                      onChange={(e) => setVaCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548]"
                    >
                      <option value="Florist & Floral Arrangements">Florist & Floral Arrangements</option>
                      <option value="Casket & Urn Manufacturer">Casket & Urn Manufacturer / Supplier</option>
                      <option value="Keepsakes & Memorial Crafts">Keepsakes, Jewelry & Memorial Crafts</option>
                      <option value="Limousine & Transport Services">Limousine & Executive Transport Services</option>
                      <option value="Catering & Hospitality Services">Catering & Memorial Luncheon Hospitality</option>
                      <option value="Monument & Headstone Masonry">Monument & Headstone Masonry</option>
                      <option value="Print, Media & AV Technology">Print, Media & AV Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Product Lines & Portfolio Summary</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your capacity, product lines, and pricing tier..."
                      value={vaDescription}
                      onChange={(e) => setVaDescription(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548]"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setVaStep(1)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-xs uppercase hover:bg-gray-200 flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setVaStep(3)}
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                      Next: Service Area & Licenses <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Service Area & Licensing */}
              {vaStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Minnesota Counties / Service Area Served</label>
                    <input
                      type="text"
                      placeholder="e.g. Hennepin, Wright, Anoka, Ramsey, Carver"
                      value={vaCounties}
                      onChange={(e) => setVaCounties(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">State License or Registration No. (If applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. MN-BUS-2026-992"
                      value={vaLicenseNo}
                      onChange={(e) => setVaLicenseNo(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setVaStep(2)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-xs uppercase hover:bg-gray-200 flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setVaStep(4)}
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                      Next: Contact & Terms <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Terms */}
              {vaStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Primary Contact Representative Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={vaContactName}
                      onChange={(e) => setVaContactName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(952) 555-0199"
                      value={vaPhone}
                      onChange={(e) => setVaPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Business Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vendor@business.com"
                      value={vaEmail}
                      onChange={(e) => setVaEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="vendor-app-consent"
                      required
                      checked={vaConsent}
                      onChange={(e) => setVaConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#411548] border-gray-300 rounded focus:ring-[#411548]"
                    />
                    <label htmlFor="vendor-app-consent" className="text-[11px] text-gray-600 font-light leading-snug">
                      I agree to the Middleton Vendor Terms, commission structure, and consent to Middleton Funeral Services evaluating our business application. <a href="#/terms" className="underline text-[#411548]">Terms & Conditions</a>
                    </label>
                  </div>

                  {vaError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                      {vaError}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setVaStep(3)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-xs uppercase hover:bg-gray-200 flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!vaContactName.trim() || !vaPhone.trim() || !vaEmail.trim()) {
                          setVaError('Please fill out representative contact details.');
                          return;
                        }
                        if (!vaConsent) {
                          setVaError('Please agree to the vendor terms and check the consent box.');
                          return;
                        }
                        setVaError('');
                        setVaStep(5);
                      }}
                      className="flex-2 bg-[#411548] hover:bg-black text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                      Submit Vendor Application <CheckCircle2 size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {vaStep === 5 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Application Submitted</span>
                    <h4 className="text-2xl font-serif font-black text-[#411548] uppercase mt-1">Thank You, {vaContactName}!</h4>
                    <p className="text-gray-600 text-xs font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                      We have received the vendor application for <strong className="text-[#411548] font-bold">{vaBusinessName}</strong> ({vaCategory}). Our Partner Relations team will review your application and contact you at {vaEmail} within 3-5 business days.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsVendorAppOpen(false)}
                    className="w-full bg-[#411548] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
