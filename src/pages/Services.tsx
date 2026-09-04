import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import { DOVE_ICON } from '../constants/assets';
import { 
  Heart, 
  Sun, 
  Anchor, 
  Milestone, 
  ShieldCheck, 
  Truck, 
  Users, 
  Camera,
  ArrowRight,
  Bird,
  Scale,
  Leaf,
  Flame,
  ClipboardCheck
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';

export default function Services() {
  const { openDownloadModal } = useModals();
  const serviceCategories = [
    {
      title: "Funeral & Memorial Services",
      path: "/services/funeral-services",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Traditional funerals", "Memorial services", "Celebration of life", "Graveside services", "Anniversary services"]
    },
    {
      title: "Burial Options",
      path: "/services/burials",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Traditional burial", "Green burial", "Mausoleum burial", "Home burial", "Veteran burial"]
    },
    {
      title: "Cremation Services",
      path: "/services/cremation",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Direct cremation", "Memorial cremation", "Witnessed cremation", "Aquamation", "Scattering ceremonies"]
    },
    {
      title: "Environmental Memorials",
      path: "/services/burials",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Natural green burials", "Biodegradable urns", "Carbon-neutral services", "Living memorial trees", "Eco-friendly legal guidance"],
      isPremium: true
    },
    {
      title: "Pre-Planning",
      path: "/pre-planning",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Service selection", "Legacy planning", "Legal preparedness", "Payment financing"]
    },
    {
      title: "Grief Support & Aftercare",
      path: "/grief-support",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Counseling", "Support groups", "Wellness resources", "Anniversary check-ins"]
    },
    {
      title: "Legal & Administrative",
      path: "/services/legal-assistance",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Death certificates", "Insurance claims", "Probate guidance", "Notary services"]
    },
    {
      title: "Specialized Services",
      path: "/services/specialized-services",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Military honors", "Repatriation", "Cultural rites", "Death doula support"]
    },
    {
      title: "Venue Arrangements",
      path: "/services/venues",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["On-site chapels", "Church coordination", "Outdoor venues", "Reception planning"]
    },
    {
      title: "Embalming & Preparation",
      path: "/services/embalming-preparation",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Sanitary care", "Cosmetics", "Restorative art", "Refrigeration"]
    },
    {
      title: "Funeral Logistics",
      path: "/services/funeral-coordination",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Clergy coordination", "Floral coordination", "Reception planning", "Logistics"]
    },
    {
      title: "Transportation & Livery",
      path: "/services/transportation-livery",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Hearse services", "Family limousines", "Shuttle vans", "Procession coordination"]
    },
    {
      title: "Technology & Media",
      path: "/services/technology-media",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Live streaming", "Online memorials", "Video tributes", "Digital guestbooks"]
    },
    {
      title: "Sympathy Gifts",
      path: "/flowers",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Funeral Flowers", "Flower sprays", "Custom arrangements", "Sympathy cards", "Remembrance gifts"]
    },
    {
      title: "Memorial Essentials",
      path: "/shop",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: [
        "Caskets & Coffins", 
        "Urns and Cremation", 
        "Grave and Memorial Items", 
        "Funeral Décor", 
        "Tribute accessories", 
        "Keepsakes & Remembrance"
      ],
      isPremium: true
    },
    {
      title: "Legal Heritage Planning",
      path: "/services/legal-heritage-planning",
      icon: <CustomIcon size={36} variant="hover-white" />,
      items: ["Estate Finalization", "Probate Guidance", "MN Legal Compliance", "Secure Documentation"],
      isPremium: true
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Unified Hero Section */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <Sun size={12} className="text-white" /> Professional Care Spectrum
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Professional Care Services
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Honoring your loved one's legacy with dignity, professional care, and complete support across Minnesota.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
               <span className="w-12 h-[2px] bg-[#411548]"></span> OUR SERVICE SPECTRUM <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#411548] uppercase font-black tracking-tight mb-8 text-center max-w-4xl mx-auto leading-tight">
              Professional Care <br/> <span className="text-black">For Every Need</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serviceCategories.slice(0, 4).map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-2 duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] flex items-center justify-center text-[#411548] mb-8 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                  <div className="group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-transform duration-500">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#411548] mb-6 font-serif uppercase tracking-tighter group-hover:text-black transition-colors">{cat.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-black text-[13px] font-bold uppercase tracking-tight">
                      <CustomIcon size={12} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={cat.path} 
                  className="inline-flex items-center gap-2 text-[#411548] font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
                >
                  Explore More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 1: Full-Width */}
        <div className="bg-[#411548] py-24 text-white relative overflow-hidden shadow-2xl mt-24 mb-24">
          <div className="absolute inset-0 bg-white/[0.03] pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
            <div className="text-center md:text-left">
               <h3 className="text-4xl font-serif font-black uppercase mb-4 tracking-tight text-white">Planning for the Future?</h3>
               <p className="text-white font-light text-xl max-w-xl leading-relaxed">Download our comprehensive pre-planning guide to start the conversation today with your loved ones.</p>
            </div>
            <button 
              onClick={() => openDownloadModal({
                title: 'Middleton Services & Pre-Planning Guide',
                filename: 'middleton-services-guide.txt',
                contentGenerator: () => `MIDDLETON FUNERAL SERVICES - COMPREHENSIVE SERVICE GUIDE\n\nDetailed breakdown of traditional burial, cremation options, memorial keepsakes, and transport coordination.`
              })}
              className="bg-white text-[#411548] px-14 py-6 rounded-full font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
            >
               Download Your Guide
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serviceCategories.slice(4, 8).map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-2 duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#411548] mb-8 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                  <div className="group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-transform duration-500">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#411548] mb-6 font-serif uppercase tracking-tighter">{cat.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-black text-[13px] font-bold uppercase tracking-tight">
                      <CustomIcon size={12} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={cat.path} 
                  className="inline-flex items-center gap-2 text-[#411548] font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
                >
                  Explore More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 2: Full-Width */}
        <div className="bg-[#411548] py-24 text-white relative overflow-hidden shadow-2xl mt-24 mb-24">
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
            <div className="text-center md:text-left">
               <h3 className="text-4xl font-serif font-black uppercase mb-4 tracking-tight text-white">Need immediate Support?</h3>
               <p className="text-white font-light text-xl max-w-xl leading-relaxed text-white">Our counselors are available for a private consultation 24/7 in Apple Valley and surrounding areas.</p>
            </div>
            <Link to="/contact" className="bg-white text-[#411548] px-14 py-6 rounded-full font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
               Connect With Us
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {serviceCategories.slice(8, 12).map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-2 duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#411548] mb-8 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                  <div className="group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-transform duration-500">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#411548] mb-6 font-serif uppercase tracking-tighter">{cat.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-black text-[13px] font-bold uppercase tracking-tight">
                      <CustomIcon size={12} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={cat.path} 
                  className="inline-flex items-center gap-2 text-[#411548] font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
                >
                  Explore More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Not Sure Where to Start - Full Width */}
        <div className="py-32 bg-[#411548] text-center text-white relative overflow-hidden shadow-2xl mt-24 mb-24">
          <div className="absolute inset-0 bg-white/[0.02] pattern-grid-white/10 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <h2 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tight mb-8 relative z-10 text-white">
              Not sure where to <span className="text-white italic font-light lowercase">begin?</span>
            </h2>
            <p className="text-white text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed relative z-10">
              Every family is unique. Our funeral directors are here to listen and help you create a service that truly reflects your loved one's spirit and legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10 flex-wrap">
              <Link 
                to="/book-appointment" 
                className="bg-white text-[#411548] px-10 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl text-center"
              >
                Schedule Free Consultation
              </Link>
              <Link 
                to="/join-support-group" 
                className="bg-transparent border-2 border-white/60 text-white px-10 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center"
              >
                Join Support Group
              </Link>
              <Link 
                to="/prices" 
                className="bg-transparent border-2 border-white/30 text-white/80 px-10 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center"
              >
                View Price List
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serviceCategories.slice(12).map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-2 duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#411548] mb-8 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                  <div className="group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-transform duration-500">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#411548] mb-6 font-serif uppercase tracking-tighter">{cat.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-black text-[13px] font-bold uppercase tracking-tight">
                      <CustomIcon size={12} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={cat.path} 
                  className="inline-flex items-center gap-2 text-[#411548] font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
                >
                  Explore Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Need Immediate Guidance Or Planning?
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Our licensed funeral directors are available 24/7 to discuss customized services, pricing, and arrangements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Talk With A Director
            </Link>
            <Link to="/prices" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              View Itemized Price List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
