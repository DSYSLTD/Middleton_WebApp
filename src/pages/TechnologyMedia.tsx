import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Share2, Film, Computer, Globe } from 'lucide-react';

export default function TechnologyMedia() {
  const options = [
    {
      title: "Livestreaming",
      icon: <Video size={24} />,
      desc: "High-definition broadcast of the service so friends and family can attend remotely from anywhere in the world."
    },
    {
      title: "Digital Memorials",
      icon: <Globe size={24} />,
      desc: "Permanent online pages where memories, photos, and messages can be shared and preserved across generations."
    },
    {
      title: "Video Tributes",
      icon: <Film size={24} />,
      desc: "Custom-edited photo and video slideshows displayed during the service to celebrate meaningful moments."
    },
    {
      title: "Social Media Integration",
      icon: <Share2 size={24} />,
      desc: "Sharing service details and obituaries across social platforms to inform the wider community."
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
              <Video size={14} className="text-white animate-pulse" /> Modern Memorials
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Technology & <span className="text-white">Media</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white/80 max-w-4xl mx-auto leading-relaxed">
              Bridging the gap between physical and digital spaces to ensure every loved one can be part of the farewell.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {options.map((opt, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all flex items-start gap-8">
                   <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#411548] shrink-0">
                      {opt.icon}
                   </div>
                   <div>
                      <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-4">{opt.title}</h3>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{opt.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Equipment Highlight */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100 flex flex-col lg:flex-row items-center gap-20">
               <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-3 text-[#411548] bg-white px-5 py-2.5 rounded-full shadow-sm text-xs font-bold uppercase tracking-widest mb-8">
                     <Computer size={18} /> Professional Equipment
                  </div>
                  <h2 className="text-4xl font-serif font-black uppercase text-[#411548] mb-8 leading-tight">Reliable Audio-Visual <br/> <span className="text-gray-400">Excellence</span></h2>
                  <p className="text-gray-500 font-light text-lg leading-relaxed mb-10">
                     We utilize high-quality cameras, microphones, and streaming infrastructure to ensure a stable and respectful viewing experience for remote attendees. Our technicians manage every technical aspect on the day of the service.
                  </p>
                  <Link to="/book-appointment" className="inline-flex items-center gap-3 bg-[#411548] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#300f35] transition-all">
                     Schedule Tech Support Consultation <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="lg:w-1/2 w-full grid grid-cols-2 gap-6">
                  <div className="aspect-square bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-center items-center text-center">
                     <Video size={40} className="text-[#411548] mb-4" />
                     <h4 className="font-bold text-[#411548] text-sm uppercase">HD Cameras</h4>
                  </div>
                  <div className="aspect-square bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-center items-center text-center">
                     <Film size={40} className="text-[#411548] mb-4" />
                     <h4 className="font-bold text-[#411548] text-sm uppercase">Pro Edit</h4>
                  </div>
                  <div className="aspect-square bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-center items-center text-center">
                     <Globe size={40} className="text-[#411548] mb-4" />
                     <h4 className="font-bold text-[#411548] text-sm uppercase">Global Stream</h4>
                  </div>
                  <div className="aspect-square bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-center items-center text-center">
                     <Share2 size={40} className="text-[#411548] mb-4" />
                     <h4 className="font-bold text-[#411548] text-sm uppercase">Secure Link</h4>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
