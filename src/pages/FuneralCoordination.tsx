import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Flower2, Users, ScrollText, Calendar } from 'lucide-react';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function FuneralCoordination() {
  const categories = [
    {
      title: "Clergy & Celebrants",
      icon: <Users size={24} />,
      desc: "Liaising with religious leaders and secular celebrants to lead the service."
    },
    {
      title: "Floral Arrangements",
      icon: <Flower2 size={24} />,
      desc: "Coordinating with our florist marketplace to ensure beautiful, timely tributes."
    },
    {
      title: "Catering & Receptions",
      icon: <Utensils size={24} />,
      desc: "Arranging reception venues and catering services for family gatherings."
    },
    {
      title: "Printing & Stationery",
      icon: <ScrollText size={24} />,
      desc: "Designing and printing custom order of service, prayer cards, and memorial books."
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <ScrollText size={12} className="text-white" /> Complete Logistics & Care
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight text-white mb-4">
              Funeral Coordination
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Let us handle every detail. From floral tributes to catering and stationery, we coordinate all logistics so you can focus on what matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all flex items-start gap-8">
                   <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#411548] shrink-0">
                      {cat.icon}
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-[#411548] uppercase tracking-tight mb-3">{cat.title}</h3>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{cat.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Strategic Image Showcase Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto">
              <img 
                src={DRIVE_IMAGES.STRATEGIC_4} 
                alt="Middleton Funeral Coordination Excellence" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] mb-2 inline-block">
                Tailored Event Management
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[#411548] uppercase mb-4">
                Harmonious Ceremonial Logistics
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-6">
                Our seasoned directors seamlessly combine venue arrangements, musical interludes, audio-visual tribute streaming, repast catering, and floral displays into one cohesive, dignified experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-appointment?service=General%20Information%20Meeting&step=2" className="bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                  Book Coordination Consultation
                </Link>
                <Link to="/how-we-work" className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                  See Our 5-Step Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-serif font-black uppercase text-[#411548]">Stress-Free Planning</h2>
               <p className="text-gray-400 font-light mt-4">Our coordinate team manages every vendor relationship for you.</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12">
               <div className="flex-1 space-y-8">
                  <div className="flex gap-4">
                     <Calendar className="text-[#411548] shrink-0" />
                     <div>
                        <h4 className="font-bold text-[#411548] mb-1">Venue Booking</h4>
                        <p className="text-xs text-gray-500">Securing chapels, churches, or external social venues for services and wakes.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Flower2 className="text-[#411548] shrink-0" />
                     <div>
                        <h4 className="font-bold text-[#411548] mb-1">Third-party Liaison</h4>
                        <p className="text-xs text-gray-500">Paying all disbursements and fees on your behalf to simplify the billing process.</p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-80 bg-[#411548] text-white p-10 rounded-[3rem] flex flex-col justify-center text-center">
                  <h4 className="font-bold mb-4">Start Planning</h4>
                  <p className="text-sm text-white/70 font-light mb-8">Ready to discuss your requirements? Our directors are here to help.</p>
                  <Link to="/book-appointment?service=General%20Information%20Meeting&step=2" className="bg-white text-[#411548] px-8 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-gray-100 transition-all">
                     Schedule Appointment
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
