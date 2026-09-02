import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function FuneralServices() {
  const services = [
    {
      title: "Traditional Funeral Services",
      description: "A formal and structured service often including a viewing or visitation followed by a ceremony at a church or funeral home.",
      features: ["Viewing/Visitation", "Formal Ceremony", "Casket Presentation", "Processional to Cemetery"]
    },
    {
      title: "Memorial Services",
      description: "A service held without the body present, allowing for more flexibility in timing and location.",
      features: ["Urn Display", "Photo Tributes", "Personalized Themes", "Reception/Gathering"]
    },
    {
      title: "Celebration of Life Services",
      description: "A more personalized, often less formal event focused on celebrating the unique life and passions of the deceased.",
      features: ["Storytelling", "Themed Decor", "Music & Video", "Casual Environment"]
    },
    {
      title: "Graveside Services",
      description: "A simplified ceremony held directly at the burial site, focusing on the final commitment.",
      features: ["Outdoor Setting", "Intimate Atmosphere", "Committal Prayers", "Final Goodbyes"]
    },
    {
      title: "Viewing & Visitation Services",
      description: "Private time for family and friends to gather, find support, and say their final goodbyes in a calm environment.",
      features: ["Private Viewing", "Public Visitation", "Healing Atmosphere", "Family Support"]
    },
    {
      title: "Personalized Memorial Services",
      description: "Tailored ceremonies that incorporate hobbies, interests, and professional achievements.",
      features: ["Unique Themes", "Hobbies Tributes", "Custom Visuals", "Legacy Focus"]
    },
    {
      title: "Scattering Ceremonies",
      description: "Thoughtful coordination for the final disposition of ashes in a meaningful location.",
      features: ["Location Planning", "Ritual Creation", "Eco-friendly Urns", "Memory Keepsakes"]
    },
    {
      title: "Anniversary & Remembrance Services",
      description: "Services held on a significant date to continue the process of remembrance and healing.",
      features: ["Healing Events", "Candle Lighting", "Family Gatherings", "Annual Tribute"]
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> Middleton Funeral Care
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Funeral Services
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Honouring every life with dignity, compassion, and personalized ceremony choices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gray-600 text-lg font-light leading-relaxed mb-12">
            Choosing how to honour a loved one’s final journey is a deeply personal decision: one that deserves compassionate guidance, professional support, and thoughtful options. Our experienced team is here to help you create a farewell that reflects your loved one’s life, legacy, faith, and personal values.
          </p>
          <div className="rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100 mb-8">
            <img src={DRIVE_IMAGES.MIDDLETON_FUNERAL_CARE} alt="Middleton Funeral Care & Guidance" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                   <h3 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">{service.title}</h3>
                   <p className="text-gray-500 font-light mb-8 leading-relaxed">{service.description}</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#411548]">
                           <CustomIcon size={12} className="shrink-0" />
                           {feature}
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Need Expert Funeral Director Guidance?
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Our licensed funeral directors are available 24/7 to help you navigate choices and plan a meaningful farewell.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Contact A Director
            </Link>
            <Link to="/book-appointment" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
