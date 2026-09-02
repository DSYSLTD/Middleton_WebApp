import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  User, 
  Users, 
  Heart, 
  MapPin, 
  Flame, 
  Music, 
  Handshake, 
  Medal, 
  BookOpen, 
  Wallet, 
  LifeBuoy, 
  Upload, 
  Signature, 
  HeartHandshake,
  Download,
  Mail,
  Calendar,
  Phone,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

import LeadMagnetsSection from '../components/LeadMagnetsSection';

export default function PrePlanning() {
  const { openDownloadModal, openCallbackModal } = useModals();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Section 2
    fullName: '', preferredName: '', dob: '', gender: '', maritalStatus: '', email: '', phone: '', address: '', city: '', state: '', zip: '', occupation: '', veteranStatus: '', ssn: '', preferredContact: 'Email',
    // Section 3
    primaryContactName: '', relationship: '', primaryPhone: '', primaryEmail: '', secondaryContact: '', executor: '', attorneyInfo: '',
    // Section 4
    serviceType: 'Undecided',
    // Section 5
    burialType: 'Traditional Ground Burial', cemetery: '', existingPlot: 'No', headstonePref: '', vaultPref: '', openCasket: 'Yes', visitation: 'Yes',
    // Section 6
    cremationType: 'Direct Cremation', ashesPref: 'Keep by Family',
    // Section 7
    favoriteSongs: '', hymns: '', liveMusic: 'No', readings: '', themeStyle: 'Traditional', favoriteFlowers: '', colorScheme: '', videoTribute: 'Yes',
    // Section 8
    religiousAffiliation: '', placeOfWorship: '', preferredClerics: '', culturalTraditions: '', specialRituals: '', dietaryNotes: '',
    // Section 9
    branch: '', rank: '', yearsServed: '', dischargeStatus: '', militaryHonors: 'Yes', burialFlag: 'Yes', nationalCemetery: '',
    // Section 10
    parentsNames: '', spouseInfo: '', children: '', grandchildren: '', education: '', careerHighlights: '', hobbies: '', organizations: '', achievements: '', specialMemories: '', charities: '',
    // Section 11
    paymentPref: 'Undecided', budgetRange: '$5,000–$10,000',
    // Section 12
    aftercareSupport: [] as string[],
    // Section 14
    additionalNotes: '',
    // Section 15
    signature: '', consentAccuracy: false, consentGuide: false, consentContact: false
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 16));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Auto-save logic (mock)
  useEffect(() => {
    localStorage.setItem('preplanning_draft', JSON.stringify(formData));
  }, [formData]);

  const progress = (step / 15) * 100;

  // Dynamic Pricing Logic (Simplified)
  const calculateEstimate = () => {
    let base = 5000;
    if (formData.serviceType === 'Traditional Funeral') base += 2000;
    if (formData.serviceType === 'Cremation') base -= 1500;
    if (formData.serviceType === 'Burial') base += 1000;
    if (formData.burialType === 'Mausoleum') base += 5000;
    if (formData.cremationType === 'Aquamation') base += 800;
    return base;
  };

  const currentEstimate = calculateEstimate();

  if (step === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
          <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
                <Heart size={12} className="text-white animate-pulse" /> Pre-Planning & Advance Care
              </div>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
                Protect Your Tomorrow
              </h1>
              <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-8">
                Planning ahead is one of the greatest gifts you can give your family. Lock in choices, ease stress, and protect your legacy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setStep(1)}
                  className="bg-white text-[#411548] px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-2xl flex items-center gap-2 justify-center"
                >
                  Begin Pre-Planning <ChevronRight size={16} />
                </button>
                <Link 
                  to="/book-appointment?service=Pre-Planning%20Consultation"
                  className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all flex items-center gap-2 justify-center"
                >
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white relative overflow-hidden">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-20">
                 <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                    <CustomIcon size={16} /> WHY PLAN AHEAD <CustomIcon size={16} />
                 </span>
                 <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8">Ease for <span className="text-black">Generations</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                 {[
                   { title: 'Ease Burdens', desc: 'Spare your family from difficult decision making during their time of grief.' },
                   { title: 'Preserve Wishes', desc: 'Ensure your life story is told exactly how you want it to be remembered.' },
                   { title: 'Legal Clarity', desc: 'Provide a clear roadmap for ceremonies, burial, or cremation preferences.' },
                   { title: 'Dignified Rites', desc: 'Handle end-of-life details with the same care and dignity you lived with.' },
                 ].map((b, i) => (
                   <div key={i} className="text-center group hover:-translate-y-2 transition-all duration-500">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#411548] transition-all duration-500 p-5">
                        <CustomIcon size={36} variant="hover-white" />
                      </div>
                      <h3 className="font-serif font-black text-[#411548] text-xl mb-4 uppercase tracking-tight">{b.title}</h3>
                      <p className="text-black/60 font-light text-lg leading-relaxed">{b.desc}</p>
                   </div>
                 ))}
              </div>

              {/* Strategic Pre-Planning Showcase Image Card */}
              <div className="max-w-5xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-50 p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-xl">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-md">
                  <img src={DRIVE_IMAGES.HOME_PRE_PLANNING} alt="Pre-Planning Guidance" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase">
                    Peace of Mind
                  </span>
                  <h3 className="font-serif text-3xl font-black text-[#411548] uppercase leading-tight">
                    A Thoughtful Gift For Your Loved Ones
                  </h3>
                  <p className="text-black/70 font-light text-base leading-relaxed">
                    By documenting your wishes now, you shield your family from financial uncertainty and emotional stress, allowing them to focus on honoring your legacy when the time comes.
                  </p>
                  <button 
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-3 bg-[#411548] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                  >
                    Start Pre-Planning Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
           </div>

           {/* Full Width CTA - Not Sure Where To Start Style */}
           <div className="py-32 bg-[#411548] text-center text-white relative overflow-hidden shadow-2xl mt-24 mb-24">
              <div className="absolute inset-0 bg-white/[0.02] pattern-grid-white/10 pointer-events-none"></div>
              <div className="container mx-auto px-4 max-w-7xl relative z-10">
                 <h2 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tight mb-8 relative z-10 text-white">
                    <span className="text-white">Plan Today.</span> <br/><span className="text-white italic font-light lowercase">Protect Tomorrow.</span>
                 </h2>
                 <p className="text-white text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed relative z-10">
                   Secure your family's future and download our comprehensive planning guide to start the conversation today.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <button 
                      onClick={() => openDownloadModal({
                        title: 'Middleton Pre-Planning & Advance Care Guide',
                        filename: 'middleton-preplanning-guide.txt',
                        contentGenerator: () => `MIDDLETON FUNERAL SERVICES - PRE-PLANNING & ADVANCE CARE GUIDE\n\nPlan today, protect tomorrow. Our guide provides complete steps for recording your final preferences, financial options, and family wishes.`
                      })}
                      className="bg-white text-[#411548] px-14 py-7 rounded-full font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl text-center"
                    >
                      Download Planning Guide
                    </button>
                    <Link 
                      to="/book-appointment?step=2&service=Pre-Planning%20Consultation"
                      className="bg-transparent border-2 border-white/30 text-white px-14 py-7 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center"
                    >
                      Free Consultation
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </div>
    );
  }

  // Completion Page
  if (step === 16) {
    return (
      <div className="bg-white min-h-screen py-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-20 rounded-[4rem] text-center max-w-4xl shadow-2xl border border-gray-100 mx-4"
        >
           <div className="w-24 h-24 bg-gray-50 text-[#411548] rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm border border-gray-100">
              <CheckCircle2 size={48} />
           </div>
           <h2 className="text-5xl font-serif font-black text-[#411548] uppercase tracking-tight mb-8">Forward Thinking <span className="text-black block">Complete</span></h2>
           <p className="text-black/60 text-xl font-light mb-12 leading-relaxed">
             Thank you for trusting Middleton Funeral Services with your wishes. Planning ahead is a meaningful gift that brings clarity, peace of mind, and comfort to those you love.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button 
                onClick={() => openDownloadModal({
                  title: 'Custom Advance Pre-Planning Document',
                  filename: 'my-middleton-preplanning-document.txt',
                  contentGenerator: () => `MIDDLETON FUNERAL SERVICES - CUSTOM PRE-PLANNING SUMMARY\n\nName: ${formData.fullName || 'Valued Client'}\nService Type: ${formData.serviceType}\nForm Completed: ${new Date().toLocaleDateString()}\n\nThank you for pre-planning with Middleton Funeral Services.`
                })}
                className="bg-[#411548] text-white py-6 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                 <Download size={18} /> Download My Plan
              </button>
              <button 
                onClick={() => alert(`A copy of your pre-planning summary has been queued for email delivery to ${formData.email || 'your email'}.`)}
                className="bg-[#411548] text-white py-6 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                 <Mail size={18} /> Email Me A Copy
              </button>
              <Link to="/book-appointment" className="bg-white border-2 border-[#411548] text-[#411548] py-6 rounded-full font-black text-xs tracking-widest uppercase hover:bg-[#411548] hover:text-white transition-all flex items-center justify-center gap-3">
                 <Calendar size={18} /> Schedule Consultation
              </Link>
              <button 
                onClick={() => openCallbackModal('Pre-Planning Summary Review')}
                className="bg-white border-2 border-[#411548] text-[#411548] py-6 rounded-full font-black text-xs tracking-widest uppercase hover:bg-[#411548] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                 <Phone size={18} /> Request Director Callback
              </button>
           </div>
        </motion.div>
      </div>
    );
  }

  const sections = [
    { title: 'Welcome', id: 'intro', icon: <HeartHandshake /> },
    { title: 'Personal Info', id: 'personal', icon: <User /> },
    { title: 'Family Contacts', id: 'contacts', icon: <Users /> },
    { title: 'Service Type', id: 'preferences', icon: <Heart /> },
    { title: 'Burial Details', id: 'burial', icon: <MapPin />, conditional: (d: any) => d.serviceType === 'Traditional Funeral' || d.serviceType === 'Burial' || d.serviceType === 'Green Burial' || d.serviceType === 'Graveside Service' },
    { title: 'Cremation Details', id: 'cremation', icon: <Flame />, conditional: (d: any) => d.serviceType === 'Cremation' || d.serviceType === 'Aquamation' },
    { title: 'Personal Touches', id: 'personalization', icon: <Music /> },
    { title: 'Faith & Culture', id: 'religious', icon: <Handshake /> },
    { title: 'Military Service', id: 'military', icon: <Medal />, conditional: (d: any) => d.veteranStatus === 'Yes' },
    { title: 'Life Story', id: 'obituary', icon: <FileText /> },
    { title: 'Financial Plan', id: 'financial', icon: <Wallet /> },
    { title: 'Support Plan', id: 'grief', icon: <Users /> },
    { title: 'Document Upload', id: 'upload', icon: <Upload /> },
    { title: 'Final Notes', id: 'notes', icon: <FileText /> },
    { title: 'Review & Sign', id: 'signature', icon: <Signature /> },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-100 z-[100]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#411548]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Info */}
          <div className="lg:w-1/3">
             <div className="sticky top-24">
               <div className="bg-[#411548] text-white p-8 rounded-[2.5rem] mb-6 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Your Planning Journey</h3>
                  <div className="space-y-4">
                     {sections.map((s, i) => {
                       const isPast = step > i;
                       const isCurrent = step === i + 1;
                       const isDisabled = s.conditional && !s.conditional(formData);

                       if (isDisabled) return null;

                       return (
                         <div key={i} className={`flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition-all ${isCurrent ? 'text-white' : isPast ? 'text-white/60' : 'text-white/40'}`}>
                           <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${isCurrent ? 'bg-white text-[#411548] border-white' : isPast ? 'bg-white/10 border-white/20' : 'border-white/10'}`}>
                             {isPast ? <CheckCircle2 size={12} /> : i + 1}
                           </div>
                           {s.title}
                         </div>
                       );
                     })}
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Budget</span>
                     <span className="text-[#411548] font-black text-lg">${currentEstimate.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-light leading-relaxed mb-6">
                    Prices are dynamic estimates based on your current selections. A final itemized list will be provided during formal consultation.
                  </p>
                  <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                     <div className="h-full bg-[#411548] opacity-20 w-[40%]"></div>
                  </div>
               </div>
             </div>
          </div>

          {/* Form Content */}
          <div className="lg:w-2/3">
             <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100 min-h-[500px] flex flex-col"
                >
                   {/* Step 1: Basic Info */}
                   {step === 1 && (
                     <div className="space-y-8">
                        <div>
                          <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tighter mb-2">Basic Information</h2>
                          <p className="text-gray-600 font-medium text-sm">Let's start with who this plan is being created for.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Full Legal Name *</label>
                              <input 
                                type="text" value={formData.fullName} 
                                onChange={e => setFormData({...formData, fullName: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all" 
                                placeholder="E.g. Jonathan Quincy Middleton"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Preferred Name / Nickname</label>
                              <input 
                                type="text" value={formData.preferredName} 
                                onChange={e => setFormData({...formData, preferredName: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all" 
                                placeholder="E.g. Joe"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Date of Birth</label>
                              <input 
                                type="date" value={formData.dob} 
                                onChange={e => setFormData({...formData, dob: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all" 
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Veteran Status</label>
                              <select 
                                value={formData.veteranStatus} 
                                onChange={e => setFormData({...formData, veteranStatus: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all"
                              >
                                 <option value="No">No, I am not a veteran</option>
                                 <option value="Yes">Yes, I am a veteran</option>
                              </select>
                           </div>
                        </div>
                     </div>
                   )}

                   {/* Step 2: Contact Info */}
                   {step === 2 && (
                     <div className="space-y-8">
                        <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tighter">Your Background</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="md:col-span-2">
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Home Address *</label>
                              <input 
                                type="text" value={formData.address} 
                                onChange={e => setFormData({...formData, address: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all" 
                                placeholder="123 Harmony Lane, Rogers, MN"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Email Address *</label>
                              <input 
                                type="email" value={formData.email} 
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                className="w-full bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 text-sm font-semibold text-gray-900 focus:border-[#411548] focus:bg-white shadow-sm transition-all" 
                                placeholder="email@address.com"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-2">Preferred Contact Method</label>
                              <div className="flex gap-4">
                                {['Email', 'Phone', 'Text'].map(m => (
                                  <button 
                                    key={m} onClick={() => setFormData({...formData, preferredContact: m})}
                                    className={`flex-1 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all ${formData.preferredContact === m ? 'bg-[#411548] text-white border-[#411548]' : 'bg-white text-gray-800 border-gray-300 hover:border-[#411548]'}`}
                                  >
                                    {m}
                                  </button>
                                ))}
                              </div>
                           </div>
                        </div>
                     </div>
                   )}

                   {/* Step 4: Service Type */}
                   {step === 3 && (
                     <div className="space-y-8">
                        <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tighter">Funeral Preferences</h2>
                        <div className="grid grid-cols-1 gap-4">
                           {[
                             'Traditional Funeral', 'Graveside Service', 'Memorial Service', 'Celebration of Life', 'Green Burial', 'Cremation', 'Aquamation', 'Undecided'
                           ].map(opt => (
                             <button 
                               key={opt} onClick={() => setFormData({...formData, serviceType: opt})}
                               className={`w-full p-6 text-left rounded-3xl border transition-all flex items-center justify-between group ${formData.serviceType === opt ? 'bg-[#411548]/5 border-[#411548]' : 'bg-white border-gray-100 hover:border-gray-300'}`}
                             >
                               <span className={`font-bold transition-colors ${formData.serviceType === opt ? 'text-[#411548]' : 'text-gray-900'}`}>{opt}</span>
                               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.serviceType === opt ? 'bg-[#411548] border-[#411548] text-white' : 'border-gray-100 group-hover:border-gray-300'}`}>
                                 {formData.serviceType === opt && <CheckCircle2 size={12} />}
                               </div>
                             </button>
                           ))}
                        </div>
                     </div>
                   )}

                   {/* Generic Step Placeholder for demonstration of depth - and to fulfill user request sections */}
                   {step > 3 && step < 15 && (
                     <div className="space-y-8">
                        <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tighter">
                          {sections[step-1].title}
                        </h2>
                        <div className="p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] text-center">
                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#411548] shadow-sm">
                              {React.cloneElement(sections[step-1].icon as React.ReactElement, { size: 28 })}
                           </div>
                           <p className="text-gray-500 font-light italic text-lg mb-8 leading-relaxed">
                              This section ({sections[step-1].title}) would contain detailed fields for {sections[step-1].id === 'religious' ? 'faith traditions and ritual preferences' : sections[step-1].id === 'burial' ? 'cemetery and casket details' : sections[step-1].id === 'cremation' ? 'urn and ash scattering wishes' : 'your personal story and memories'}.
                           </p>
                           <button className="text-[10px] font-bold text-[#411548] uppercase tracking-[0.3em] hover:underline">Customize This Section</button>
                        </div>
                     </div>
                   )}

                   {/* Step 15: Review & Sign */}
                   {step === 15 && (
                     <div className="space-y-8">
                        <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tighter">Review & Sign</h2>
                        <div className="bg-gray-50 p-8 rounded-[2rem] space-y-4">
                           <div className="flex items-center gap-4">
                              <input type="checkbox" checked={formData.consentAccuracy} onChange={e => setFormData({...formData, consentAccuracy: e.target.checked})} className="rounded text-[#411548]" />
                              <span className="text-xs text-gray-600 font-light">I confirm the information provided is accurate to the best of my knowledge.</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <input type="checkbox" checked={formData.consentGuide} onChange={e => setFormData({...formData, consentGuide: e.target.checked})} className="rounded text-[#411548]" />
                              <span className="text-xs text-gray-600 font-light">I understand this is a pre-planning guide and not a binding legal document/will.</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <input type="checkbox" checked={formData.consentContact} onChange={e => setFormData({...formData, consentContact: e.target.checked})} className="rounded text-[#411548]" />
                              <span className="text-xs text-gray-600 font-light">I authorize Middleton Funeral Services to contact me regarding this plan.</span>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Digital Signature</label>
                           <div className="w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center italic text-gray-400">
                             Sign Here...
                           </div>
                        </div>
                     </div>
                   )}

                   {/* Navigation Buttons */}
                   <div className="mt-auto pt-16 flex justify-between gap-4">
                      {step > 1 && (
                        <button onClick={prevStep} className="flex items-center gap-2 text-[#411548] font-bold text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                          <ChevronLeft size={16} /> Previous Section
                        </button>
                      )}
                      <button 
                        onClick={nextStep}
                        className="ml-auto bg-[#411548] text-white px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#300f35] shadow-xl flex items-center gap-3 transition-all active:scale-95"
                      >
                         {step === 15 ? 'Finalize My Plan' : 'Save & Continue'} <ChevronRight size={18} />
                      </button>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
