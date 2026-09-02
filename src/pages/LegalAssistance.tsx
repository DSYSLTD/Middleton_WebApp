import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Medal, 
  Gavel, 
  Handshake, 
  Globe, 
  PenTool,
  ArrowRight,
  MessageCircle,
  Calendar,
  Building2,
  FileCheck
} from 'lucide-react';

export default function LegalAssistance() {
  const categories = [
    {
      title: "Death Certificate Processing",
      desc: "Speedy and accurate handling of all necessary legal certifications, vital statistics filings, and certified copy procurement.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Life Insurance Claims",
      desc: "Compassionate assistance in filing policy claims, verifying beneficiaries, and navigating corporate insurance payouts.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Veterans Benefits & Honors",
      desc: "Helping military families secure national cemetery interment, military honors, flag presentations, and VA benefit filings.",
      icon: <Medal className="w-6 h-6" />
    },
    {
      title: "Probate & Estate Guidance",
      desc: "Connecting families with reliable estate attorneys, probate specialists, and court executor filing advisors.",
      icon: <Gavel className="w-6 h-6" />
    },
    {
      title: "Power of Attorney Support",
      desc: "Administrative coordination for appointed legal executors, trustees, and authorized healthcare representatives.",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      title: "International Repatriation",
      desc: "Managing complex consular documentation, embassy clearances, and transit protocols for sending loved ones home.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Notary Services",
      desc: "On-site certified notary public support for all funeral-related legal instruments, affidavits, and release forms.",
      icon: <PenTool className="w-6 h-6" />
    },
    {
      title: "Social Security Claims",
      desc: "Filing official death notifications to the Social Security Administration and processing survivor lump-sum benefit claims.",
      icon: <Building2 className="w-6 h-6" />
    },
    {
      title: "Burial Permits & Transport",
      desc: "Securing mandatory county burial-transit permits, coroner releases, and Minnesota state transport authorizations.",
      icon: <FileCheck className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <FileText size={12} className="text-white" /> Administrative Support
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight mb-4 text-white">
              Legal & Administrative
            </h1>
            <p className="text-sm md:text-base font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
              Simplifying the complexities of end-of-life paperwork. We provide professional guidance to ensure every legal and administrative detail is handled with precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid (9 Legal Options) */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#411548] block mb-2">9 Administrative Options</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase">Legal & Regulatory Services</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col justify-between group">
                   <div>
                     <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#411548] mb-6 group-hover:bg-[#411548] group-hover:text-white transition-all">
                        {cat.icon}
                     </div>
                     <h3 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-3">{cat.title}</h3>
                     <p className="text-gray-600 font-light text-xs leading-relaxed mb-8">{cat.desc}</p>
                   </div>

                   {/* Standardized CTAs */}
                   <div className="space-y-2.5 pt-4 border-t border-gray-100">
                     <Link
                       to={`/book-appointment?step=2&service=${encodeURIComponent(cat.title)}`}
                       className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                     >
                       Schedule Consultation <Calendar size={14} />
                     </Link>

                     <Link
                       to="/resources#resource-row-2"
                       className="w-full bg-gray-100 text-[#411548] py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                     >
                       View Legal Resources <ArrowRight size={14} />
                     </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Peace of Mind CTA */}
      <section className="py-20 bg-[#411548] text-white text-center border-t border-white/10">
         <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-4 text-white">We Handle The Details <br/> <span className="text-white">So You Can Heal</span></h2>
            <p className="text-white/80 font-light text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              From navigating veterans benefits to death certificate processing, our team is trained to manage the bureaucracy of loss with speed and dignity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Link 
                 to="/book-appointment?service=Legal%20%26%20Administrative%20Support" 
                 className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl"
               >
                 Schedule Legal Briefing
               </Link>
               <a 
                 href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20need%20assistance%20with%20legal%20and%20administrative%20support."
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all flex items-center gap-2"
               >
                 <MessageCircle size={14} /> WhatsApp Us Directly
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
