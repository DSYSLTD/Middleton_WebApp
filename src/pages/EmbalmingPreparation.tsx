import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Calendar, MessageCircle } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function EmbalmingPreparation() {
  const options = [
    {
      title: "Washing & Dressing",
      desc: "Gentle and respectful sanitary care, dressing in family-provided attire, and meticulous final presentation.",
      details: ["Sanitary Washing", "Clothed with Dignity", "Personal Effects Care"]
    },
    {
      title: "Cosmetics & Grooming",
      desc: "Professional cosmetic applications and hair styling to help families remember their loved one as they were.",
      details: ["Feature Restoration", "Professional Hair Styling", "Manicure & Grooming"]
    },
    {
      title: "Restorative Art",
      desc: "Advanced techniques for feature restoration to provide family members with a peaceful final goodbye.",
      details: ["Feature Reconstruction", "Advanced Cosmetics", "Technical Excellence"]
    },
    {
      title: "Refrigeration Services",
      desc: "Short-term climate-controlled care for families choosing natural burial or no embalming.",
      details: ["Secure Facility", "Dignified Monitoring", "Natural Preservation"]
    },
    {
      title: "Embalming Services",
      desc: "Licensed professional preservation for long-distance transport, public viewing, or eco-friendly needs.",
      details: ["Traditional Embalming", "Eco-friendly Solutions", "Legal Compliance"]
    },
    {
      title: "Green Embalming & Bio-Care",
      desc: "Eco-friendly, formaldehyde-free preservation solutions designed for natural burials, green cemeteries, and eco-conscious families.",
      details: ["Formaldehyde-Free Care", "Botanical Bio-Fluids", "Green Burial Compliant"]
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Hero Header - Standardized with Pure White Text */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <ShieldCheck size={12} className="text-white" /> Professional Care & Preparation
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight mb-4 text-white">
              Embalming & Care Services
            </h1>
            <p className="text-sm md:text-base font-light text-white max-w-3xl mx-auto leading-relaxed">
              Our care team provides professional, compassionate, and dignified preparation services for every loved one in our care with clinical precision and respect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="max-w-4xl mx-auto mb-16 rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100">
             <img src={DRIVE_IMAGES.STRATEGIC_4} alt="Dignified Preparation & Care" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {options.map((opt, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-4">{opt.title}</h3>
                     <p className="text-gray-500 font-light mb-8 leading-relaxed text-xs">{opt.desc}</p>
                     <div className="space-y-3 mb-8">
                        {opt.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#411548]/80">
                             <CustomIcon size={12} className="shrink-0" />
                             {detail}
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="pt-6 border-t border-gray-100 space-y-2.5">
                     <Link
                       to={`/book-appointment?step=2&service=${encodeURIComponent(opt.title)}`}
                       className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                     >
                       Schedule Care Consultation <Calendar size={14} />
                     </Link>

                     <a
                       href={`https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(opt.title)}.`}
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

      {/* Plan Today & Quality Commitment */}
      <section className="py-24 bg-[#411548] text-white border-t border-white/10 relative overflow-hidden">
         <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 text-white rounded-3xl shadow-sm mb-10 border border-white/20">
               <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white mb-6">Plan Today & Our Quality Commitment</h2>
            <p className="text-white/80 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
               Every individual who enters our care is treated with the same level of respect, dignity, and attention as if they were a member of our own family. Secure your future wishes in advance or request immediate care guidance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Link 
                 to="/book-appointment?step=2&service=Pre-Planning%20Consultation" 
                 className="inline-flex items-center gap-3 bg-white text-[#411548] px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl"
               >
                  Schedule Appointment <ArrowRight size={18} />
               </Link>
               <a 
                 href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20would%20like%20to%20discuss%20Pre-Planning%20Consultation." 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 transition-all shadow-xl"
               >
                  WhatsApp Consultation <MessageCircle size={18} />
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
