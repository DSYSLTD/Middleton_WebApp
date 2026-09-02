import CustomIcon from "../components/CustomIcon";
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Medal, Globe, Users, Church, HeartHandshake, Baby, Calendar, MessageCircle } from 'lucide-react';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function SpecializedServices() {
  const options = [
    {
      title: "Military Honours",
      icon: <Medal size={28} />,
      desc: "Coordinating full military honors for eligible veterans, including flag folding, Taps, and honor guards.",
      items: ["Flag Presentation", "Honor Guard Coordination", "National Cemetery Liaison"]
    },
    {
      title: "International Repatriation",
      icon: <Globe size={28} />,
      desc: "Expert handling of all legal and logistical requirements for transporting a loved one across international borders.",
      items: ["Documentation & Permits", "Consular Liaison", "Worldwide Logistics"]
    },
    {
      title: "Cultural Funerals",
      icon: <Users size={28} />,
      desc: "Specialized services tailored to specific cultural traditions and family customs.",
      items: ["Traditional Rituals", "Custom Ceremonies", "Language Support"]
    },
    {
      title: "Religious Ceremonies",
      icon: <Church size={28} />,
      desc: "Honoring faith traditions with services designed in accordance with specific religious beliefs and practices.",
      items: ["Faith-specific Rites", "Clergy Coordination", "Sacred Space Prep"]
    },
    {
      title: "Death Doula Support",
      icon: <HeartHandshake size={28} />,
      desc: "Non-medical support providing emotional, spiritual, and physical guidance during the end-of-life transition.",
      items: ["Emotional Support", "End-of-life Planning", "Family Transitioning"]
    },
    {
      title: "Pediatric & Infant Care",
      icon: <Baby size={28} />,
      desc: "Gentle, specialized care and gentle guidance for families experiencing early pregnancy, infant, or child loss.",
      items: ["Gentle Keepsakes", "Specialized Counseling", "Dedicated Memorials"]
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#411548] py-24 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-4 text-white font-black text-[10px] tracking-[0.5em] uppercase mb-12 p-3 px-8 bg-white/10 rounded-full border border-white/20 backdrop-blur-md shadow-2xl">
              <Medal size={14} className="text-white animate-pulse" /> Custom Care
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Specialized <span className="text-white">Custom Care</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white/80 max-w-4xl mx-auto leading-relaxed">
              Tailored support for unique needs, from military honours to international repatriation, pediatric care, and cultural traditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="max-w-4xl mx-auto mb-16 rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100">
             <img src={DRIVE_IMAGES.STRATEGIC_3} alt="Specialized Cultural & Military Services" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {options.map((opt, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col justify-between">
                   <div>
                     <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-[#411548] mb-6">
                        {opt.icon}
                     </div>
                     <h3 className="text-xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">{opt.title}</h3>
                     <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">{opt.desc}</p>
                     <ul className="space-y-2 mb-8">
                        {opt.items.map((item, i) => (
                          <li key={i} className="text-xs text-gray-600 font-bold uppercase tracking-wider flex items-center gap-2">
                             <CustomIcon size={12} className="shrink-0 text-[#411548]" />
                             {item}
                          </li>
                        ))}
                     </ul>
                   </div>

                   <div className="pt-6 border-t border-gray-100 space-y-2.5">
                     <Link
                       to={`/book-appointment?step=2&service=${encodeURIComponent(opt.title)}`}
                       className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                     >
                       Schedule Consultation <Calendar size={14} />
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

      {/* CTA */}
      <section className="py-24 bg-[#411548] text-white">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-black uppercase mb-8 text-white">Have a unique request?</h2>
            <p className="text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              We pride ourselves on our ability to accommodate specific cultural, religious, and personal requests.
            </p>
            <Link to="/book-appointment?step=2&service=Custom%20Specialized%20Care" className="inline-flex items-center gap-3 bg-white text-[#411548] px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-all">
               Book Appointment For Special Requests <ArrowRight size={18} />
            </Link>
         </div>
      </section>
    </div>
  );
}
