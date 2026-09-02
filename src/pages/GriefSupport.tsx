import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import { 
  Heart, 
  Users, 
  BookOpen, 
  ArrowRight,
  HeartHandshake,
  Calendar,
  MessageCircle,
  ShieldAlert,
  Download
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function GriefSupport() {
  const { openCallbackModal } = useModals();

  const supportDuringPlanning = [
    { 
      title: "Professional Grief Counseling", 
      desc: "Access to licensed specialists during the initial days of loss.",
      serviceParam: "Professional Grief Counselling"
    },
    { 
      title: "Family Support Services", 
      desc: "Guided mediation and emotional support for the entire family unit.",
      serviceParam: "Family Support Services"
    },
    { 
      title: "Spiritual Care Guidance", 
      desc: "Collaborating with local clergy and spiritual leaders for comfort.",
      serviceParam: "Funeral & Burial Planning"
    },
    { 
      title: "Bereavement Resources", 
      desc: "Literature and tools to help understand the immediate stages of grief.",
      serviceParam: "General Information Meeting"
    },
    { 
      title: "Support Group Referrals", 
      desc: "Direct connections to specialized groups in the Minnesota area.",
      serviceParam: "Support Group Referrals"
    },
    { 
      title: "Online Grief Communities", 
      desc: "Access to verified digital platforms for shared understanding.",
      serviceParam: "Online Grief Communities"
    }
  ];

  const aftercareServices = [
    { 
      title: "Support Groups", 
      desc: "Regular weekly and monthly meetings for long-term healing.",
      serviceParam: "Support Groups"
    },
    { 
      title: "Aftercare Programs", 
      desc: "Step-by-step guidance as you navigate the months following a service.",
      serviceParam: "Family Support Services"
    },
    { 
      title: "Wellness Resources", 
      desc: "Holistic health suggestions to maintain balance during mourning.",
      serviceParam: "General Information Meeting"
    },
    { 
      title: "Grief Resource Library", 
      desc: "A curated collection of books, podcasts, and video series.",
      serviceParam: "General Information Meeting"
    },
    { 
      title: "Anniversary Check-ins", 
      desc: "Dedicated outreach from our directors on significant dates.",
      serviceParam: "Anniversary Check-ins"
    },
    { 
      title: "Memorial Healing Events", 
      desc: "Annual community gatherings to celebrate and remember together.",
      serviceParam: "Memorial Healing Events"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Hero - Brand Purple */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <Heart size={12} className="text-white" /> Grief & Bereavement Support
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Grief Support & Healing
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-6">
              You do not have to walk through loss alone. Access counseling referrals, support group connections, and centralized educational resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/join-support-group"
                className="inline-flex items-center gap-2 bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer"
              >
                <Users size={14} /> Join A Support Group
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all shadow-lg cursor-pointer"
              >
                <Download size={14} /> Download Free Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support During Planning */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-4 shadow-sm">
                <Heart size={14} /> Immediate Compassionate Care
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-4">
                Compassion <span className="text-black">During Loss</span>
              </h2>
              <p className="text-gray-600 text-base font-light max-w-2xl mx-auto">
                Comprehensive support services tailored for individuals and families during initial bereavement.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportDuringPlanning.map((cat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-200 hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                   <div>
                     <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-[#411548] mb-6 group-hover:bg-[#411548] group-hover:text-white transition-all duration-300">
                        <Heart size={24} />
                     </div>
                     <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-3">{cat.title}</h3>
                     <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">
                        {cat.desc}
                     </p>
                   </div>

                   {/* Standardized 2 CTAs per card */}
                   <div className="space-y-2.5 pt-4 border-t border-gray-100">
                     <Link
                       to={`/book-appointment?service=${encodeURIComponent(cat.serviceParam)}`}
                       className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                     >
                       Schedule Consultation <Calendar size={14} />
                     </Link>

                     <a
                       href={`https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(cat.title)}.`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                     >
                       WhatsApp Us Directly <MessageCircle size={14} />
                     </a>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Funeral Aftercare - Brand Purple Background */}
      <section className="py-24 bg-[#411548] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-white">
           <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-4 border border-white/20">
                 <HeartHandshake size={14} /> Ongoing Aftercare Programs
              </span>
              <h2 className="font-serif text-3xl md:text-5xl uppercase font-black tracking-tight mb-4 text-white">
                Funeral <span className="text-white">Aftercare & Healing</span>
              </h2>
              <p className="text-white/80 text-base font-light max-w-2xl mx-auto">
                Long-term healing roadmaps and support groups available to assist you well beyond the funeral service.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aftercareServices.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl text-gray-900 transition-all flex flex-col justify-between group border border-gray-100 hover:shadow-2xl"
                >
                   <div>
                     <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-[#411548] mb-6 group-hover:bg-[#411548] group-hover:text-white transition-all duration-300">
                        <CustomIcon size={24} variant="hover-white" />
                     </div>
                     <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-3">{cat.title}</h3>
                     <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">
                        {cat.desc}
                     </p>
                   </div>

                   {/* Standardized 2 CTAs per card */}
                   <div className="space-y-2.5 pt-4 border-t border-gray-100">
                     <Link
                       to={cat.title === "Support Groups" ? "/join-support-group" : `/book-appointment?service=${encodeURIComponent(cat.serviceParam)}`}
                       className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                     >
                       {cat.title === "Support Groups" ? "Join Support Circle" : "Schedule Consultation"} <Calendar size={14} />
                     </Link>

                     <a
                       href={`https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20am%20interested%20in%20${encodeURIComponent(cat.title)}.`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                     >
                       WhatsApp Us Directly <MessageCircle size={14} />
                     </a>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Resource Library Centralization Showcase Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1">
                  <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6 shadow-sm">
                     <BookOpen size={16} /> Centralized Educational Resources
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase tracking-tight mb-6">
                    Free Educational <br/><span className="text-black">Downloads & Guides</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 font-light mb-8 leading-relaxed">
                    All our downloadable planning workbooks, bereavement checklists, spiritual care guides, and legal administrative resources have been centralized on our dedicated Resources page.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                     <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-100 text-[#411548] flex items-center justify-center font-bold"><BookOpen size={20} /></div>
                        <span className="font-serif font-black text-xs uppercase tracking-wider text-[#411548]">Checklists & Guides</span>
                     </div>
                     <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-100 text-[#411548] flex items-center justify-center font-bold"><HeartHandshake size={20} /></div>
                        <span className="font-serif font-black text-xs uppercase tracking-wider text-[#411548]">PDF Downloads</span>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/resources"
                      className="inline-flex items-center gap-3 bg-[#411548] text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black transition-all shadow-xl cursor-pointer"
                    >
                      Explore Free Educational Downloads <ArrowRight size={16} />
                    </Link>
                  </div>
               </div>
               <div className="flex-1 w-full max-w-lg aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl relative group border border-gray-100">
                  <img src={DRIVE_IMAGES.GRIEF_EDUCATION} alt="Grief Support & Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-x-8 bottom-8 bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white">
                     <p className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] mb-2 italic text-center">Aftercare Support</p>
                     <h4 className="text-xl font-serif font-black text-center mb-3 uppercase tracking-tight text-[#411548]">Holistic Counseling</h4>
                     <p className="text-gray-600 text-xs text-center font-light leading-relaxed">
                        Our licensed counselors maintain consistent contact with families to ensure ongoing emotional wellness.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Strategic Community Healing & Support Circles Showcase */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto">
              <img 
                src={DRIVE_IMAGES.GRIEF_PEER_SUPPORT} 
                alt="Community Grief & Support Circles" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] mb-2 inline-block">
                Peer Support Circles
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[#411548] uppercase mb-4">
                Compassionate Group Healing & Fellowship
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-6">
                Our peer support groups bring together individuals experiencing similar journeys of loss. Facilitated by empathetic care counselors, these sessions provide a safe, non-judgmental space for sharing and comfort.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/join-support-group" className="bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                  Join A Support Circle
                </Link>
                <Link to="/faq" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                  Read Grief Support FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Support - Brand Purple background - All words white */}
      <section className="bg-[#411548] py-20 text-center text-white relative overflow-hidden border-t border-white/10">
         <div className="container mx-auto px-4 max-w-4xl relative z-10 text-white">
            <ShieldAlert size={48} className="mx-auto mb-6 text-white/40" />
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight mb-4 text-white">
              Immediate Crisis Support
            </h2>
            <p className="text-white/80 text-base font-light mb-8 leading-relaxed max-w-2xl mx-auto">
               If you are in immediate emotional distress, please reach out to national crisis lifelines available 24/7. Your wellness is our primary concern.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
               <a href="tel:988" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl whitespace-nowrap">
                  National Lifeline (988)
               </a>
               <Link to="/book-appointment" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all whitespace-nowrap">
                  Schedule Private Appointment
               </Link>
               <button 
                 onClick={() => openCallbackModal('Immediate Private Support Call')}
                 className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all whitespace-nowrap cursor-pointer"
               >
                 Request Immediate Callback
               </button>
               <a 
                 href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20am%20seeking%20immediate%20grief%20support%20assistance."
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-emerald-700 transition-all shadow-lg whitespace-nowrap flex items-center gap-2"
               >
                 <MessageCircle size={14} /> WhatsApp Counselor
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
