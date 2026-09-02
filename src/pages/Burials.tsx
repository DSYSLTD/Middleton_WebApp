import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import { 
  TreePine, 
  School, 
  MapPin, 
  Home, 
  Award, 
  FileText,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function Burials() {
  const { openDownloadModal, openCallbackModal } = useModals();
  const burialOptions = [
    {
      title: "Green Burials",
      description: "A natural and environmentally conscious farewell. Our eco-friendly burial solutions are designed to honour both your loved one and the environment.",
      icon: <CustomIcon size={24} />,
      items: [
        "Biodegradable Casket Burial",
        "Shroud Burial",
        "No-Container Natural Burial",
        "Tree Memorial Burial",
        "Conservation Cemetery Burial",
        "Eco-Friendly Urn Burial"
      ]
    },
    {
      title: "Traditional Ground Burials",
      description: "A timeless tribute rooted in tradition. We provide personalized services designed to honour your loved one with grace and care.",
      icon: <CustomIcon size={24} />,
      items: [
        "In-Ground Casket Burial",
        "Burial with Vault or Grave Liner",
        "Natural or Woodland Burial",
        "Family Plot Burial",
        "Veteran Burial"
      ]
    },
    {
      title: "Mausoleum & Above-Ground",
      description: "Elegance, permanence, and lasting remembrance. Distinguished alternatives to traditional burial in a serene and enduring memorial space.",
      icon: <CustomIcon size={24} />,
      items: [
        "Private Family Mausoleum",
        "Community or Public Mausoleum",
        "Companion Crypt",
        "Garden Mausoleum",
        "Columbarium Niches"
      ]
    },
    {
      title: "Home Burials",
      description: "A deeply personal and private alternative for families with qualifying properties. We guide you through the complex legalities and practicalities.",
      icon: <CustomIcon size={24} />,
      items: [
        "Rural Property Burial",
        "Family Estate Burial",
        "Private Memorial Garden Burial",
        "Farm or Woodland Burial",
        "Faith-Based Home Burial"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <TreePine size={12} className="text-white" /> Burial Options
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Burial & Rest Services
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              A deeply personal journey deserves compassionate guidance, green eco-options, and traditional ground burial care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#411548]/10 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="w-12 h-[2px] bg-[#411548]"></div>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Our Philosophy</span>
             <div className="w-12 h-[2px] bg-[#411548]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#411548] uppercase mb-12 tracking-tight">Care Beyond <span className="text-black">Comparison</span></h2>
          <p className="text-black text-xl font-light leading-relaxed mb-8">
            Whether you prefer a traditional burial, a peaceful green burial, an elegant mausoleum entombment, or a personalized cremation service, our experienced team is here to help you create a farewell that reflects your loved one's life, legacy, faith, and personal values.
          </p>
          <p className="text-black text-xl font-light leading-relaxed italic border-l-4 border-[#411548] pl-8 py-4 bg-gray-50 max-w-3xl mx-auto rounded-r-3xl mb-16">
            We proudly provide families throughout Minnesota with trusted funeral, burial, cremation, memorial, and aftercare services delivered with dignity, transparency, and care.
          </p>

          <div className="max-w-4xl mx-auto rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100">
            <img src={DRIVE_IMAGES.BURIAL_PHILOSOPHY} alt="Dignified Burial & Rest Services" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Main Options Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
               <span className="w-12 h-[2px] bg-[#411548]"></span> BURIAL SPECTRUM <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8 text-center max-w-4xl mx-auto leading-tight">
              Honoring Traditions <br/> <span className="text-black">In Every Form</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {burialOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10 hover:shadow-2xl transition-all hover:-translate-y-2 group duration-500"
              >
                <div className="w-20 h-20 shrink-0 rounded-3xl bg-gray-50 flex items-center justify-center text-[#411548] group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                  <div className="scale-150 group-hover:invert group-hover:brightness-0 transition-all">
                    {option.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#411548] mb-6 font-serif uppercase tracking-tight group-hover:text-black transition-colors">{option.title}</h3>
                  <p className="text-black/60 text-lg font-light mb-8 leading-relaxed">
                    {option.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {option.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-[13px] font-bold uppercase tracking-tight text-black">
                        <CustomIcon size={12} className="mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cemetery Care & Facilities Image Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto">
              <img 
                src={DRIVE_IMAGES.STRATEGIC_1} 
                alt="Middleton Memorial Rites & Care" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] mb-2 inline-block">
                Dignified Funeral Rites
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[#411548] uppercase mb-4">
                Sacred Memory & Grounds Coordination
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-6">
                Our funeral care coordinators liaise directly with local cemeteries across Hennepin County to manage plot preparation, committal ceremony protocols, military honor guard filings, and monument placements.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-appointment?step=2&service=Cemetery%20Grounds%20Guidance" className="bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                  Schedule Grounds Guidance
                </Link>
                <Link to="/burial-comparison" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                  View Comparison Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cemetery & Memorials Section */}
      <section className="py-32 bg-[#411548] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              <div className="lg:col-span-1">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-white/30"></div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Final Steps</span>
                    <div className="w-12 h-[1px] bg-white/30"></div>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif font-black uppercase mb-8 leading-tight tracking-tight">
                   Guidance For <br/> <span className="text-white">The Journey</span>
                 </h2>
                 <p className="text-white text-lg font-light mb-12 leading-relaxed">
                   Navigating cemetery laws and choosing the right monument are significant decisions. We are here to guide you through every legal and aesthetic detail.
                 </p>
                 <Link to="/book-appointment?step=2&service=Priority%20Burial%20Guidance" className="inline-flex items-center gap-3 bg-white text-[#411548] px-12 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
                   Request Priority Guidance <ArrowRight size={16} />
                 </Link>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 group hover:bg-[#411548] transition-all duration-500 flex flex-col justify-between">
                    <div>
                       <div className="w-12 h-12 mb-6 bg-white rounded-xl flex items-center justify-center p-2 group-hover:bg-[#411548] transition-all duration-500 shadow-sm border border-white/20">
                          <CustomIcon size={28} className="group-hover:brightness-0 group-hover:invert transition-all" />
                       </div>
                       <h4 className="text-xl font-bold mb-3 text-white">Cemetery Guidance</h4>
                       <p className="text-white text-xs font-light leading-relaxed mb-4 opacity-90">
                          Full expert assistance in choosing cemetery plots, reviewing local cemetery bylaws, and navigating Minnesota burial statutes.
                       </p>
                       <ul className="space-y-2 mb-6 text-xs text-white/80 font-light">
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> Plot selection & deed verification
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> Concrete vault & liner requirements
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> Inter-faith & military section guidance
                          </li>
                       </ul>
                    </div>
                    <Link 
                      to="/book-appointment?step=2&service=Cemetery%20Guidance"
                      className="bg-white text-[#411548] hover:bg-gray-100 py-3.5 px-6 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 w-full mt-2"
                    >
                      Schedule Cemetery Guidance <ArrowRight size={14} />
                    </Link>
                 </div>
                 
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 group hover:bg-[#411548] transition-all duration-500 flex flex-col justify-between">
                    <div>
                       <div className="w-12 h-12 mb-6 bg-white rounded-xl flex items-center justify-center p-2 group-hover:bg-[#411548] transition-all duration-500 shadow-sm border border-white/20">
                          <CustomIcon size={28} className="group-hover:brightness-0 group-hover:invert transition-all" />
                       </div>
                       <h4 className="text-xl font-bold mb-3 text-white">Headstones & Memorials</h4>
                       <p className="text-white text-xs font-light leading-relaxed mb-4 opacity-90">
                          From premium granite monuments to custom bronze plaques and engraved epitaphs, we craft enduring tributes.
                       </p>
                       <ul className="space-y-2 mb-6 text-xs text-white/80 font-light">
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> Custom granite & bronze monuments
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> On-site laser engraving & epitaphs
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> Professional foundation & setting
                          </li>
                       </ul>
                    </div>
                    <Link 
                      to="/shop" 
                      className="bg-white text-[#411548] hover:bg-gray-100 py-3.5 px-6 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 w-full mt-2"
                    >
                      Browse Monument Catalog <ArrowRight size={14} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Lead Magnets - WHITE BACKGROUND TO SEPARATE */}
      <section className="py-32 bg-white text-[#411548]">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-[4rem] p-12 md:p-16 border border-[#411548]/10 shadow-xl flex flex-col items-center text-center group hover:border-[#411548] transition-all duration-500 justify-between">
                 <div>
                    <div className="w-16 h-16 mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform flex items-center justify-center mx-auto">
                       <CustomIcon size={40} />
                    </div>
                    <h3 className="text-3xl font-serif font-black uppercase mb-4 tracking-tight text-[#411548]">Burial <span className="text-black italic font-light lowercase text-black/40">Comparison Page</span></h3>
                    <p className="text-black/70 text-base font-light mb-8 max-w-md mx-auto">
                       View an interactive side-by-side comparison of traditional vault burials, green eco-burials, mausoleums, and columbaria niches.
                    </p>
                 </div>
                 <Link 
                    to="/burial-comparison" 
                    className="bg-[#411548] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-2"
                 >
                    Explore Burial Comparison Page <ArrowRight size={16} />
                 </Link>
              </div>
              <div className="bg-white rounded-[4rem] p-16 border border-[#411548]/10 shadow-xl flex flex-col items-center text-center group hover:border-[#411548] transition-all duration-500">
                 <div className="mb-8 w-16 h-16 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <CustomIcon size={40} />
                 </div>
                 <h3 className="text-3xl font-serif font-black uppercase mb-6 tracking-tight text-[#411548]">Visit <span className="text-black italic font-light lowercase text-black/40">Potential Sites</span></h3>
                 <p className="text-black/60 text-lg font-light mb-12">Experience the serenity of potential resting places with one of our guidance counselors.</p>
                 <Link to="/book-appointment?step=2&service=Cemetery%20Tour%20Appointment" className="bg-[#411548] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Request Tour Appointment</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Questions About Cemetery Plots & Vaults?
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Speak directly with a funeral director to review plot requirements, vault options, and cemetery coordination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Contact A Director
            </Link>
            <Link to="/burial-comparison" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Compare Burial Types
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
