import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Users, Clock } from 'lucide-react';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function TransportationLivery() {
  const fleet = [
    {
      title: "Traditional Hearses",
      desc: "Our impeccably maintained fleet of hearses provide a dignified final carriage for your loved one.",
      image: DRIVE_IMAGES.GRACEFUL_PROCESSION_3
    },
    {
      title: "Family Limousines",
      desc: "Chauffeur-driven limousines to ensure your family travels together in comfort and privacy.",
      image: DRIVE_IMAGES.GRACEFUL_PROCESSION_1
    },
    {
      title: "Lead Cars & Flower Cars",
      desc: "Coordinating the procession with professional lead vehicles and dedicated floral transport.",
      image: DRIVE_IMAGES.GRACEFUL_PROCESSION_2
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
              <Truck size={14} className="text-white animate-pulse" /> Graceful Procession
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Transportation & <span className="text-white">Livery</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white max-w-4xl mx-auto leading-relaxed">
              Dignified transport for your loved one and peaceful, comfortable travel for your family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {fleet.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                   <div className="aspect-video relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="p-10">
                      <h3 className="text-xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">{item.title}</h3>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#411548] shrink-0 shadow-sm">
                        <Truck size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[#411548] uppercase tracking-widest text-sm mb-2">First Call Transport</h4>
                        <p className="text-gray-500 text-sm font-light">Immediate, dignified transportation of your loved one from the place of death into our care, available 24/7.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#411548] shrink-0 shadow-sm">
                        <Users size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[#411548] uppercase tracking-widest text-sm mb-2">Chauffeur Services</h4>
                        <p className="text-gray-500 text-sm font-light">Professional, uniformed drivers dedicated to providing a safe and solemn travel experience for all attendees.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#411548] shrink-0 shadow-sm">
                        <Clock size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold text-[#411548] uppercase tracking-widest text-sm mb-2">Timing & Coordination</h4>
                        <p className="text-gray-500 text-sm font-light">Precise logistical planning to ensure every element of the procession moves seamlessly and on schedule.</p>
                     </div>
                  </div>
               </div>
               <div className="bg-[#411548] rounded-[3rem] p-12 text-white shadow-2xl">
                  <h3 className="text-3xl font-serif font-black uppercase mb-6">Plan Your Procession</h3>
                  <p className="text-white/70 font-light mb-10 leading-relaxed">
                    Contact us to discuss your transportation needs for the day of the service. We can accommodate various group sizes and specific vehicle preferences.
                  </p>
                  <Link to="/book-appointment" className="inline-flex items-center gap-3 bg-white text-[#411548] px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-all">
                     Schedule Logistics Consultation <ArrowRight size={18} />
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
