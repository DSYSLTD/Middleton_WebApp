import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Church, 
  MapPin, 
  Tent, 
  HeartHandshake, 
  Coffee,
  Building2,
  ArrowRight,
  X,
  Calendar,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function Venues() {
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);

  const venues = [
    {
      title: "On-Site Chapel Services",
      desc: "Our serene, on-site chapels provide a dignified and convenient space for services of any size with state-of-the-art audiovisual streaming.",
      icon: <Church className="w-6 h-6" />,
      features: [
        "Flexible seating for 50 to 350 guests",
        "High-definition livestreaming for out-of-town guests",
        "Private family viewing rooms and refreshment parlors",
        "Full organ, piano, and custom acoustic sound system"
      ],
      details: "Our on-site chapels are designed with warm architectural lighting, plush seating, and acoustic precision to create an atmosphere of profound serenity and comfort. Whether hosting an intimate gathering or a large tribute, our funeral directors oversee every element of the chapel ceremony."
    },
    {
      title: "Church & Religious Venues",
      desc: "We coordinate with local churches, synagogues, mosques, and religious institutions across Minnesota to honour your faith traditions.",
      icon: <MapPin className="w-6 h-6" />,
      features: [
        "Direct liaison with clergy, imams, rabbis, and pastors",
        "Transportation coordination for processional motorcades",
        "Coordination of traditional liturgical bulletins and music",
        "Handling of flower arrangements and altar decor"
      ],
      details: "Faith traditions provide comfort and structure during loss. We have built strong partnerships with religious institutions across the Twin Cities metro area, ensuring your family's religious customs are executed with total fidelity."
    },
    {
      title: "Outdoor & Graveside",
      desc: "Beautifully organized ceremonies in nature, including cemetery committals, garden tributes, and natural parkland gatherings.",
      icon: <Tent className="w-6 h-6" />,
      features: [
        "Weather protection canopies and plush seating",
        "Mobile public address sound systems for outdoor eulogies",
        "Committal ceremony staging and flower presentation",
        "Permit processing for county parks and gardens"
      ],
      details: "Nature offers a peaceful backdrop for honoring a life well-lived. Our staff manages all outdoor logistics, from setup of elegant, weather-resistant tents to PA sound coverage and seating for guests."
    },
    {
      title: "Celebration of Life Venues",
      desc: "Unique locations tailored to celebrate a life well-lived in a less traditional setting, such as historic halls, art centers, and golf clubs.",
      icon: <HeartHandshake className="w-6 h-6" />,
      features: [
        "Custom venue booking & contract management",
        "Personalized memory display tables and photo galleries",
        "Catering and bar service coordination",
        "Live musical ensemble setup"
      ],
      details: "For families seeking a non-traditional celebration, we facilitate venue selection at golf courses, historic estates, community centers, and art galleries, creating a relaxed environment centered on storytelling and remembrance."
    },
    {
      title: "Reception Venue Planning",
      desc: "Comprehensive coordination for post-service gatherings, including venue booking, catering, seating, and floral arrangements.",
      icon: <Coffee className="w-6 h-6" />,
      features: [
        "On-site and off-site catering arrangements",
        "Dedicated reception host staff to serve guests",
        "Menu customization (dietary, cultural, halal, kosher)",
        "Audio/visual setup for slideshows and family videos"
      ],
      details: "Gathering over bread and memory allows family and friends to comfort one another following the formal ceremony. We handle all catering logistics so you can focus entirely on your guests."
    },
    {
      title: "Boutique Memorial Parlors & Private Family Suites",
      desc: "Intimate, beautifully furnished private parlors and family suites for personal viewings, quiet reflection, and private family gatherings.",
      icon: <Building2 className="w-6 h-6" />,
      features: [
        "Private climate-controlled family suites",
        "Custom refreshment & lounge amenities",
        "Dedicated family host & attendant",
        "Flexible hourly or full-day arrangements"
      ],
      details: "Our private family parlors offer a calm, home-like sanctuary for intimate family viewings, private prayers, and peaceful moments of reflection before or after formal ceremonies."
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
              <HeartHandshake size={12} className="text-white" /> Venue Arrangements
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight mb-4 text-white">
              Venue Arrangements & Sanctuaries
            </h1>
            <p className="text-sm md:text-base font-light text-white max-w-3xl mx-auto leading-relaxed">
              Finding a sanctuary that reflects the unique spirit of your loved one. From on-site chapels and churches to outdoor gardens, private parlors, and reception venues.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((venue, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col justify-between">
                   <div>
                     <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#411548] mb-8">
                        {venue.icon}
                     </div>
                     <h3 className="text-xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">{venue.title}</h3>
                     <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">{venue.desc}</p>
                     
                     <ul className="space-y-2 mb-8">
                       {venue.features.map((feat, fIdx) => (
                         <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                           <CheckCircle2 size={12} className="text-[#411548] shrink-0" />
                           <span>{feat}</span>
                         </li>
                       ))}
                     </ul>
                   </div>

                   <div className="pt-6 border-t border-gray-100 space-y-3">
                     <button 
                       onClick={() => setSelectedVenue(idx)}
                       className="w-full bg-[#411548] text-white py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                     >
                       <span>Explore Dedicated Details</span>
                       <ArrowRight size={14} />
                     </button>
                     <Link 
                       to={`/book-appointment?step=2&service=${encodeURIComponent(venue.title)}`}
                       className="w-full inline-flex items-center justify-center gap-2 bg-purple-50 text-[#411548] hover:bg-purple-100 py-2.5 px-6 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
                     >
                       Schedule Venue Planning
                     </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Dedicated Venue Detail Modal */}
      <AnimatePresence>
        {selectedVenue !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl relative border border-gray-100 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedVenue(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#411548] hover:text-white transition-all flex items-center justify-center cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#411548] flex items-center justify-center mb-6">
                {venues[selectedVenue].icon}
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-2">
                Dedicated Venue Arrangement
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase mb-4">
                {venues[selectedVenue].title}
              </h2>

              <p className="text-gray-700 text-base leading-relaxed font-light mb-6">
                {venues[selectedVenue].details}
              </p>

              <div className="bg-purple-50/70 p-6 rounded-2xl border border-purple-100 mb-8">
                <h4 className="font-serif font-black text-[#411548] uppercase text-xs tracking-wider mb-3">Included Logistics & Care</h4>
                <ul className="space-y-2">
                  {venues[selectedVenue].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                      <CheckCircle2 size={14} className="text-[#411548] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/book-appointment?step=2&service=${encodeURIComponent(venues[selectedVenue].title)}`}
                  onClick={() => setSelectedVenue(null)}
                  className="flex-1 bg-[#411548] text-white py-4 px-8 rounded-full font-black text-xs uppercase tracking-widest text-center hover:bg-black transition-all shadow-xl"
                >
                  Schedule Appointment
                </Link>
                <a
                  href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20have%20questions%20about%20venue%20arrangements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white py-4 px-8 rounded-full font-black text-xs uppercase tracking-widest text-center hover:bg-emerald-700 transition-all shadow-md"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coordination CTA */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
               <h2 className="text-3xl font-serif font-black text-[#411548] uppercase tracking-tight mb-8">Professional Coordination</h2>
               <p className="text-gray-500 text-lg font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                 Our team handles every detail of the arrangement, from booking venues and arranging security to managing catering and floral delivery.
               </p>
               <Link to="/book-appointment?step=2&service=Venue%20Arrangements%20Planning" className="bg-[#411548] text-white px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl inline-block">
                 Schedule Appointment
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
