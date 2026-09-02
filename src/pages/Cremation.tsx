import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import { 
  Flame, 
  Wind, 
  Droplets, 
  Eye, 
  HelpCircle, 
  DollarSign,
  ArrowRight,
  Gem,
  MessageCircle,
  Calendar
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function Cremation() {
  const { openDownloadModal, openCallbackModal } = useModals();
  const cremationOptions = [
    {
      title: "Traditional Cremation with Funeral Service",
      price: "From $3,495",
      icon: <Flame className="w-6 h-6" />,
      desc: "Combines a full funeral ceremony with cremation afterward. The body is present during the service in a cremation or rental casket, allowing family and friends to pay their final respects."
    },
    {
      title: "Direct Cremation",
      price: "From $1,295",
      icon: <Flame className="w-6 h-6" />,
      desc: "A simple and cost-effective option where cremation takes place shortly after death without a formal funeral beforehand. Families may later hold a memorial service or private celebration of life."
    },
    {
      title: "Cremation with Memorial Service",
      price: "From $2,195",
      icon: <Flame className="w-6 h-6" />,
      desc: "The cremation occurs before the memorial gathering. The urn may be displayed while loved ones share memories, music, readings, tributes, and stories."
    },
    {
      title: "Cremation with Interment",
      price: "From $1,995",
      icon: <Flame className="w-6 h-6" />,
      desc: "Cremated remains are placed in a cemetery plot, columbarium niche, urn garden, or family memorial site, often accompanied by a committal service."
    },
    {
      title: "Witnessed Cremation",
      price: "From $1,595",
      icon: <Flame className="w-6 h-6" />,
      desc: "A ceremonial option where family members may be present at the beginning of the cremation process, providing closure and a final moment of connection."
    },
    {
      title: "Scattering of Ashes",
      price: "From $1,495",
      icon: <Flame className="w-6 h-6" />,
      desc: "Ashes may be scattered in a meaningful location such as a memorial garden, lake, ocean, forest, or other permitted area chosen by the family."
    },
    {
      title: "Green or Eco-Friendly Cremation (Aquamation)",
      price: "From $1,895",
      icon: <Flame className="w-6 h-6" />,
      desc: "Also known as alkaline hydrolysis or water cremation, this environmentally conscious process uses water and alkali instead of flame, reducing environmental impact."
    },
    {
      title: "Priority Expedited Cremation",
      price: "From $1,695",
      icon: <Flame className="w-6 h-6" />,
      desc: "For families requiring a faster turnaround, we offer expedited services ensuring the return of remains within a specified shortened timeframe."
    },
    {
      title: "Cremation with Military Honours",
      price: "From $2,495",
      icon: <Flame className="w-6 h-6" />,
      desc: "A specialized service for veterans, including the folding and presentation of the United States flag and the playing of Taps."
    }
  ];

  const faqs = [
    {
      q: "Can we still have a viewing with cremation?",
      a: "Yes, many families choose a traditional funeral service with a viewing using a rental casket before the cremation process takes place.",
      ctaText: "Book Viewing Consultation",
      ctaLink: "/book-appointment"
    },
    {
      q: "What is Aquamation?",
      a: "Also known as Alkaline Hydrolysis, it's a gentle, water-based process that has a much lower carbon footprint than flame cremation.",
      ctaText: "Compare Aquamation & Cremation",
      ctaLink: "/burial-comparison"
    },
    {
      q: "Is an urn required?",
      a: "While not legally required, an urn provides a dignified vessel for transport, burial, or home display. We offer a wide variety of styles.",
      ctaText: "Browse Urns & Keepsakes",
      ctaLink: "/shop"
    },
    {
      q: "How long does the cremation process take?",
      a: "Typically, the actual cremation takes 2-3 hours, but the entire process including statutory waiting periods and paperwork usually spans 7-10 days.",
      ctaText: "Speak With A Director 24/7",
      ctaLink: "tel:9524862871",
      isExternal: true
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <Flame size={12} className="text-white" /> Cremation Options
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Cremation & Memorial Choices
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Honoring unique legacies with dignity, direct cremation, water cremation (aquamation), and ceremony guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="w-12 h-[2px] bg-[#411548]"></div>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Our Approach</span>
             <div className="w-12 h-[2px] bg-[#411548]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#411548] uppercase mb-12 tracking-tight">Dignity in <span className="text-black">Every Spark</span></h2>
          <p className="text-black text-xl font-light leading-relaxed mb-8">
            At Middleton Funeral Services, we offer dignified cremation services tailored to spiritual beliefs, cultural traditions, environmental values, and personal preferences.
          </p>
          <p className="text-black text-xl font-light leading-relaxed italic border-l-4 border-[#411548] pl-8 py-4 bg-gray-50 max-w-3xl mx-auto rounded-r-3xl mb-12">
            We believe every farewell should reflect the individuality of the life lived, ensuring the final journey is handled with absolute care.
          </p>
          <div className="max-w-4xl mx-auto rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100">
            <img src={DRIVE_IMAGES.CREMATION_1} alt="Dignified Cremation Guidance" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Pricing & Options */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-20">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> CREMATION PATHWAYS <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8">Versatile <span className="text-black">Remembrance</span></h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cremationOptions.map((opt, idx) => (
                <div key={idx} className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-2 duration-500">
                   <div>
                     <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-[#411548] mb-6 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                        <Flame className="w-7 h-7" />
                     </div>
                     <h3 className="font-bold text-xl text-[#411548] mb-3 font-serif uppercase tracking-tight group-hover:text-black transition-colors">{opt.title}</h3>
                     <p className="text-[#411548] text-xs font-black mb-4 uppercase tracking-widest">{opt.price}</p>
                     <p className="text-black/60 text-sm font-light mb-8 leading-relaxed">
                        {opt.desc}
                     </p>
                   </div>

                   <div className="pt-6 border-t border-gray-100 space-y-2.5">
                     <Link 
                       to={`/prices?doc=cremation-containers&search=${encodeURIComponent(opt.title)}`}
                       className="w-full inline-flex items-center justify-center gap-2 bg-[#411548] text-white py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md cursor-pointer"
                     >
                       <span>View Pricing & Packages</span>
                       <ArrowRight size={14} />
                     </Link>
                     <a
                       href={`https://wa.me/19524862871?text=${encodeURIComponent(`Hello Middleton Funeral Services, I am interested in inquiring about ${opt.title}.`)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-6 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                     >
                       <MessageCircle size={14} />
                       <span>WhatsApp Us Directly</span>
                     </a>
                     <Link 
                       to={`/book-appointment?step=2&service=${encodeURIComponent(opt.title)}`}
                       className="w-full inline-flex items-center justify-center gap-2 bg-purple-50 text-[#411548] hover:bg-purple-100 py-2.5 px-6 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                     >
                       <Calendar size={14} />
                       <span>Schedule This Option</span>
                     </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

       {/* Strategic Feature Spotlight - Eco-Friendly Care & Modern Standards */}
       <section className="py-24 bg-gradient-to-b from-purple-50/50 to-white relative overflow-hidden border-y border-purple-100/50">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-6 relative">
                  <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white group">
                     <img 
                       src={DRIVE_IMAGES.CREMATION_2} 
                       alt="Eco-Friendly Care & Aquamation Standards" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                       referrerPolicy="no-referrer" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/80 via-transparent to-transparent"></div>
                     <div className="absolute bottom-8 left-8 right-8 text-white">
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-white">
                          Environmental Innovation
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tight text-white">
                          Gentle Care & Green Farewell Options
                        </h3>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-[2px] bg-[#411548]"></div>
                     <span className="text-xs font-black tracking-[0.25em] uppercase text-[#411548]">Modern Cremation Excellence</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase tracking-tight leading-tight">
                    Sustainable Care <br/><span className="text-black">Without Compromise</span>
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed font-light">
                    Whether choosing flame-based cremation or eco-conscious alkaline hydrolysis (Aquamation), Middleton Funeral Services ensures the highest standards of dignity, transparency, and personal honor for every family.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                     <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-[#411548] shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-xs uppercase tracking-wider text-[#411548]">Eco-Aquamation</h4>
                           <p className="text-gray-500 text-xs font-light mt-1">90% less energy than flame cremation with zero direct carbon emissions.</p>
                        </div>
                     </div>
                     <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <Eye className="w-5 h-5 text-[#411548] shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-xs uppercase tracking-wider text-[#411548]">Witnessed Options</h4>
                           <p className="text-gray-500 text-xs font-light mt-1">Private gathering space for peaceful family closure prior to cremation.</p>
                        </div>
                     </div>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                     <a
                       href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20cremation%20options."
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md"
                     >
                        <MessageCircle size={16} />
                        <span>WhatsApp Us Directly</span>
                     </a>
                     <Link
                       to="/book-appointment?service=Aquamation%20Consultation"
                       className="inline-flex items-center justify-center gap-2 bg-[#411548] hover:bg-black text-white px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md"
                     >
                        <Calendar size={16} />
                        <span>Schedule Consultation</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
       </section>

      {/* Ashes & Memorialization */}
      <section className="py-32 bg-[#411548] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="flex-1">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-[1px] bg-white"></div>
                     <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">Memorialization</span>
                     <div className="w-12 h-[1px] bg-white"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-black uppercase mb-12 leading-tight tracking-tight text-white">
                    <span className="text-white">Memorializing</span> <br/> <span className="text-white">The Essence</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                     <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-2">
                           <CustomIcon size={28} variant="white" />
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-serif uppercase tracking-tight">Scattering</h4>
                           <p className="text-white/60 font-light leading-relaxed">Legal guidance and coordination for land or sea scattering ceremonies.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-2">
                           <CustomIcon size={28} variant="white" />
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-serif uppercase tracking-tight">Keepsake Jewelry</h4>
                           <p className="text-white/60 font-light leading-relaxed">Carry a part of your loved one with you in beautiful handcrafted jewelry.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-2">
                           <CustomIcon size={28} variant="white" />
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-serif uppercase tracking-tight">Witnessed</h4>
                           <p className="text-white/60 font-light leading-relaxed">Allowing family members to be present at the start of the cremation process.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-2">
                           <CustomIcon size={28} variant="white" />
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2 font-serif uppercase tracking-tight">Columbariums</h4>
                           <p className="text-white/60 font-light leading-relaxed">Permanent, beautiful above-ground niches for final resting.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex-1 w-full relative">
                  <div className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] scale-95 group hover:scale-100 transition-all duration-1000 border border-white/20">
                     <img src={DRIVE_IMAGES.CREMATION_MEMORIALIZATION} alt="Cremation Memorialization" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/90 via-transparent to-transparent"></div>
                     <div className="absolute bottom-12 left-12 text-white">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-4">Aquamation</p>
                        <h3 className="text-4xl font-serif font-black uppercase tracking-tight text-white">The Greener <br/> Alternative</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ & Support - ENHANCED */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
           <div className="text-center mb-20">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> GUIDANCE <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8">Cremation <span className="text-black">FAQs</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                   <div>
                     <HelpCircle className="text-[#411548] w-10 h-10 mb-6" />
                     <h4 className="font-serif font-black text-[#411548] text-xl mb-6 uppercase tracking-tight">{faq.q}</h4>
                     <p className="text-black/60 text-base font-light leading-relaxed mb-6">{faq.a}</p>
                   </div>
                   {faq.isExternal ? (
                     <a href={faq.ctaLink} className="inline-flex items-center gap-2 bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all self-start">
                       <span>{faq.ctaText}</span>
                       <ArrowRight size={14} />
                     </a>
                   ) : (
                     <Link to={faq.ctaLink} className="inline-flex items-center gap-2 bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all self-start">
                       <span>{faq.ctaText}</span>
                       <ArrowRight size={14} />
                     </Link>
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Standard Pre-Footer Section */}
        <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10 mt-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
              Transparent Cremation Pricing & Guidance
            </h2>
            <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Download our detailed cremation price list for a complete, itemised breakdown of our services and memorial choices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => openDownloadModal({
                  title: 'Middleton Cremation Price List & Package Breakdown',
                  filename: 'middleton-cremation-price-list.txt',
                  contentGenerator: () => `MIDDLETON FUNERAL SERVICES - CREMATION PRICE LIST & PACKAGES\n\nDirect Cremation: $1,295\nMemorial Cremation Service: $2,495\nTraditional Cremation Service: $3,495\nWater Cremation (Aquamation): $2,195\n\nIncludes all transportation, permits, documentation, crematory fee, and basic urn.`
                })}
                className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg"
              >
                Download Cremation Price List
              </button>
              <Link 
                to="/book-appointment"
                className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
