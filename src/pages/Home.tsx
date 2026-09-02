import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, Clock, FileText, Mail, BookOpen, Heart, MessageSquare, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { HERO_SLIDER_IMAGES } from '../constants/assets';
import { DRIVE_IMAGES, getDriveImageUrl } from '../utils/driveImages';
import { OBITUARIES_DATA } from '../data/obituariesData';

export default function Home() {
  const { openDownloadModal, openCallbackModal } = useModals();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDER_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDER_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDER_IMAGES.length) % HERO_SLIDER_IMAGES.length);
  };

  const recentObituaries = OBITUARIES_DATA.filter((person) => person.featured);

  const blogPosts = [
    { title: "Understanding Ambiguous Loss", category: "Grief Support", date: "May 1, 2026" },
    { title: "The Importance of Pre-Planning", category: "Education", date: "April 15, 2026" },
    { title: "How to Support a Grieving Friend", category: "Community", date: "March 30, 2026" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 
        ==============================
        HERO SECTION - BRAND PURPLE
        ============================== 
      */}
      <section className="bg-[#411548] py-32 lg:py-48 px-4 relative overflow-hidden min-h-[85vh] flex items-center justify-center">
        {/* Animated Background Image Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_SLIDER_IMAGES[currentSlide]} 
              alt={`Hero Slide ${currentSlide + 1}`} 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Dark Brand Purple Overlay for 100% legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#411548]/90 via-[#411548]/80 to-[#310c38]/90 backdrop-blur-[2px]"></div>
          </motion.div>
        </AnimatePresence>

        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3 z-0"></div>

        {/* Previous / Next Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-4 text-white font-black text-[10px] tracking-[0.5em] uppercase mb-8 p-3 px-8 bg-white/10 rounded-full border border-white/20 backdrop-blur-md shadow-2xl">
              <span className="w-8 h-[2px] bg-white/30 animate-pulse"></span> Home • Slide {currentSlide + 1} of {HERO_SLIDER_IMAGES.length} <span className="w-8 h-[2px] bg-white/30 animate-pulse"></span>
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] uppercase font-black tracking-tighter text-white">
              Honoring <span className="italic font-light lowercase text-white">lives</span>, <br/> 
              <span className="relative inline-block text-white">
                Simplifying
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-white/20 skew-x-12"></div>
              </span> Goodbyes
            </h1>
            <div className="w-24 h-1.5 bg-white/40 mx-auto mb-8"></div>
            <p className="text-white text-xl md:text-3xl leading-relaxed font-light mb-12 max-w-4xl mx-auto tracking-tight">
              Compassionate care, dependable support, <br className="hidden md:block"/> and <span className="font-serif italic font-light lowercase text-white/80">peace of mind.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
              <Link 
                to="/book-appointment" 
                className="bg-white text-[#411548] px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl text-center whitespace-nowrap inline-flex items-center justify-center cursor-pointer"
              >
                Book Appointment
              </Link>
              <Link 
                to="/services" 
                className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center whitespace-nowrap inline-flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex justify-center items-center gap-3 mt-12">
              {HERO_SLIDER_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-10 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHITE SPACER */}
      <div className="bg-white py-8"></div>

      {/* NEW SECTION BELOW HERO - STRATEGIC PILLARS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Compassionate Care",
                desc: "Guiding you through life's most difficult transitions with empathy and professional excellence.",
                icon: <Heart size={28} className="text-[#411548]" />
              },
              {
                title: "Legacy Preservation",
                desc: "We honor the stories that define a life, ensuring every legacy is preserved with dignity.",
                icon: <BookOpen size={28} className="text-[#411548]" />
              },
              {
                title: "Community Trust",
                desc: "A locally rooted establishment dedicated to serving Minnesota families since 2026.",
                icon: <Users size={28} className="text-[#411548]" />
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex flex-col items-center text-center p-8 rounded-[3rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-serif font-black text-[#411548] uppercase mb-4 tracking-tight">{pillar.title}</h3>
                <p className="text-black/60 font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION - REDESIGNED QUICK HELP */}
      <section className="py-32 bg-gray-50 overflow-hidden" id="what-we-offer">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
              <span className="w-12 h-[2px] bg-[#411548]"></span> OUR SERVICES <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-[#411548] uppercase mb-8 leading-[0.85] tracking-tight">
              What We <br /> <span className="text-black italic font-light lowercase text-[#411548]">Offer</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { 
                title: "View Obituaries", 
                desc: "Read life stories and leave condolences", 
                to: "/obituaries",
                cta: "View" 
              },
              { 
                title: "Plan a Service", 
                desc: "Explore our professional care options", 
                to: "/services/funeral-services",
                cta: "Learn More" 
              },
              { 
                title: "Pre-Plan Today", 
                desc: "Secure peace of mind for your family", 
                to: "/pre-planning",
                cta: "Learn More" 
              },
              { 
                title: "Sympathy Gifts", 
                desc: "Show your support with thoughtful tributes", 
                to: "/flowers",
                cta: "Shop Gifts" 
              },
              { 
                title: "Memorial Essentials", 
                desc: "Caskets, urns, and remembrance items", 
                to: "/shop",
                cta: "Browse Shop" 
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Link to={service.to} className="h-full bg-white p-8 rounded-[3rem] group flex flex-col justify-between cursor-pointer hover:bg-[#411548] transition-all duration-500 shadow-lg border border-gray-100">
                  <div>
                    <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-white/10 transition-colors">
                      <CustomIcon size={28} variant="default" className="group-hover:hidden transition-all" />
                      <CustomIcon size={28} variant="white" className="hidden group-hover:inline-block transition-all" />
                    </div>
                    <h3 className="font-bold text-xl text-[#411548] group-hover:text-white mb-4 leading-tight">{service.title}</h3>
                    <p className="text-sm font-light text-black/60 group-hover:text-white/70 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                  <span className="text-black group-hover:text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                    {service.cta} <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE CLOSURE PREPARATION - ANIMATED SECTION */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="lg:w-1/2"
            >
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-8">
                <span className="w-12 h-[2px] bg-[#411548]"></span> PRE-PLANNING <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-black text-[#411548] uppercase leading-[0.9] tracking-tight mb-8">
                Life Closure <br /> <span className="text-black italic font-light lowercase">Preparation</span>
              </h2>
              <p className="text-xl text-black/60 font-light mb-12 leading-relaxed">
                Planning ahead is one of the most thoughtful gifts you can give your family. Our life closure preparation services ensure your wishes are honored while easing the burden on those you love.
              </p>
              <div className="flex flex-wrap gap-6">
                 <Link to="/pre-planning" className="inline-flex items-center gap-4 bg-[#411548] text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
                   Start Planning <ArrowRight size={16} />
                 </Link>
                 <Link 
                   to="/resources"
                   className="inline-flex items-center gap-4 bg-white border-2 border-[#411548]/10 text-[#411548] px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-gray-50 transition-all"
                 >
                   Free Educational Guides
                 </Link>
              </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:w-1/2 relative w-full"
            >
               <div className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative z-10 bg-gray-50">
                  <img src={DRIVE_IMAGES.HOME_PRE_PLANNING} alt="Pre-Planning Consultation" className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-[2.5rem]" referrerPolicy="no-referrer" />
               </div>
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#411548]/5 rounded-full blur-3xl -z-0"></div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WE ARE HERE FOR YOU - REPLACING IMMEDIATE ASSISTANCE */}
      <section className="bg-[#411548] py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-8">
                <Clock size={16} /> Available 24/7
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-black uppercase mb-8 leading-[0.85] tracking-tight text-white">We Are Here <br/> <span className="text-white italic font-light lowercase text-white">For You</span></h2>
              <p className="text-white font-light text-xl max-w-md">Our compassionate team is standing by to support you through the most difficult moments, day or night.</p>
            </div>
            
            <div className="flex flex-col gap-6 w-full lg:w-auto relative z-10">
              <a 
                href="tel:9524862871" 
                className="bg-white text-[#411548] px-12 py-7 rounded-full font-black text-sm tracking-widest uppercase hover:scale-105 transition-all text-center flex items-center justify-center gap-6 shadow-2xl whitespace-nowrap"
              >
                <Phone size={24} /> 952 486-2871
              </a>
              <Link 
                to="/book-appointment" 
                className="bg-transparent border-2 border-white/20 text-white px-12 py-7 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center whitespace-nowrap"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT OBITUARIES - STATIC GRID OF 4 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="text-left">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> RECENT OBITUARIES <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#411548] uppercase leading-[0.9] tracking-tight">Celebrating <br/> <span className="text-black italic font-light lowercase">Lives</span></h2>
            </div>
            
            <Link to="/obituaries" className="text-[#411548] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all border-b-2 border-[#411548] pb-1.5">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Static 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
            {recentObituaries.map((person) => (
              <div
                key={person.id}
                className="bg-gray-50/70 p-6 rounded-[2.5rem] border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center flex flex-col items-center justify-between"
              >
                <Link to={`/obituaries/${person.id}`} className="block w-full">
                  {/* Circular Photo Frame */}
                  <div className="w-36 h-36 mx-auto rounded-full overflow-hidden mb-4 relative bg-gray-100 border-4 border-white shadow-md group-hover:border-[#411548] transition-all duration-300">
                    <img 
                      src={person.img} 
                      alt={person.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <span className="inline-block bg-[#411548]/10 text-[#411548] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    {person.location}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#411548] uppercase tracking-tight group-hover:text-black transition-colors mb-1 truncate w-full">
                    {person.name}
                  </h3>
                  <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                    {person.years || person.dates}
                  </p>
                  
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#411548] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    Read Tribute <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* EXPLORE BY LOCATION - HORIZONTAL CARDS */}
          <div className="mt-40">
            <div className="flex items-center gap-6 mb-20">
              <div className="h-[2px] flex-grow bg-gray-100"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Explore By Location</span>
              <div className="h-[2px] flex-grow bg-gray-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: "Twin Cities", desc: "Minneapolis & Saint Paul" },
                { name: "Rochester", desc: "Mayo Clinic Region" },
                { name: "St. Cloud", desc: "Central Minnesota" },
                { name: "Mankato", desc: "Southern Minnesota" }
              ].map((loc, idx) => (
                <Link 
                  key={idx} 
                  to={`/obituaries?location=${loc.name}`}
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-[#411548] hover:scale-105 transition-all duration-500 group shadow-sm hover:shadow-2xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 shadow-sm transition-colors">
                    <MapPin size={20} className="text-[#411548] group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-black text-[#411548] group-hover:text-white uppercase tracking-tight">{loc.name}</h4>
                    <p className="text-[9px] font-bold text-gray-400 group-hover:text-white/60 uppercase tracking-widest mt-0.5">{loc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE HIGHLIGHT - FULL WIDTH SECTION */}
      <section className="py-32 bg-[#411548] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-[#f0eaf2] rounded-[4rem] p-16 relative overflow-hidden group shadow-2xl transition-all duration-500 border border-[#411548]/10">
              <span className="text-[#411548]/60 font-black text-[10px] tracking-[0.4em] uppercase block mb-6">Honoring Legacies</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black uppercase mb-8 leading-tight tracking-tight text-[#411548]">Pay a Tribute <br/><span className="text-black italic font-light lowercase">Now</span></h2>
              <p className="text-[#411548]/80 font-light text-xl mb-12 leading-relaxed">
                Support a grieving family with beautiful, curated floral arrangements and thoughtful gifts delivered directly to the service with care. Our brand-aligned tribute service is here to help you honor their legacy.
              </p>
            <div className="flex flex-row gap-4 flex-nowrap shrink-0">
                <Link to="/flowers" className="inline-flex items-center gap-4 bg-[#411548] text-white px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl whitespace-nowrap">
                  Shop Gifts <ArrowRight size={18} />
                </Link>
                <Link to="/custom-order" className="inline-flex items-center gap-4 bg-white border-2 border-[#411548]/10 text-[#411548] px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-gray-50 transition-all whitespace-nowrap">
                  Custom Requests
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-[4rem] p-16 relative overflow-hidden group shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div>
                <span className="text-[#411548]/40 font-black text-[10px] tracking-[0.4em] uppercase block mb-6">Memorial Essentials</span>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#411548] uppercase mb-8 leading-tight tracking-tight">Memorial Essentials</h2>
                <ul className="text-black font-bold text-xs uppercase tracking-widest mb-10 space-y-3">
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Caskets & Coffins</li>
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Urns & Cremation</li>
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Grave & Memorial Items</li>
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Funeral Décor</li>
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Tribute Accessories</li>
                  <li className="flex items-center gap-3"><CustomIcon size={12} className="shrink-0" /> Keepsakes & Remembrance</li>
                </ul>
              </div>
              <div className="flex flex-row gap-4 flex-nowrap shrink-0">
                <Link to="/shop" className="inline-flex items-center justify-center gap-4 bg-[#411548] text-white px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl whitespace-nowrap">
                  Browse Shop <ArrowRight size={18} />
                </Link>
                <Link to="/sell-with-us" className="inline-flex items-center justify-center gap-4 bg-white border-2 border-[#411548]/10 text-[#411548] px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-gray-50 transition-all whitespace-nowrap">
                  Sell With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
              <span className="w-12 h-[2px] bg-[#411548]"></span> REAL EXPERIENCES <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-[#411548] uppercase mb-8 leading-[0.85] tracking-tight">
              What People <br /> <span className="text-black italic font-light lowercase">Says About Us</span>
            </h2>
            <p className="text-black/60 font-light text-xl max-w-2xl mx-auto">
              Compassionate feedback from the families we've had the honor of serving in their time of need.
            </p>
          </div>

          {(() => {
            const allTestimonials = [
              {
                name: "Linda Brooks",
                role: "Family Representative — Mankato",
                quote: "There are no easy words when a family loses someone so young. Middleton Funeral Services treated Daniel and our family with extraordinary care, dignity and sensitivity. Their support allowed us to concentrate on one another and celebrate Daniel's life rather than becoming overwhelmed by the arrangements.",
                img: getDriveImageUrl('1PyZ6JH4GRB8V16FDMWqA7VaqxT7bTeH2')
              },
              {
                name: "James Carter",
                role: "Family Representative — Twin Cities",
                quote: "Our family wanted Olivia's farewell to reflect her love for nature and the values she held close to her heart. Middleton listened to what mattered to us and helped us create a beautiful and meaningful farewell. Their professionalism, patience and compassion meant more to our family than words can express.",
                img: getDriveImageUrl('1MmyTXNsRzVG3HWQ0qIBWKTzvs7DPQFlZ')
              },
              {
                name: "Thomas Henderson",
                role: "Family Representative — St. Paul",
                quote: "Middleton Funeral Services made a difficult experience much more manageable for our family. From the first conversation through the funeral arrangements, we felt listened to, respected and supported. They took care of the details with professionalism while never losing sight of the person behind the arrangements—our mother.",
                img: getDriveImageUrl('1XuRNuWfalhLxFg0E6EkRD-sI8hfonpiR')
              },
              {
                name: "Jennifer Anderson",
                role: "Family Representative — Rochester",
                quote: "Our family was grateful to have compassionate professionals beside us during such a difficult time. Middleton Funeral Services made sure that every aspect of Dad's arrangements was handled respectfully and thoughtfully. Their kindness made an incredibly difficult process feel a little easier.",
                img: getDriveImageUrl('1DhHADPLun619jaSnRMd2NyjhiNtUuqzE')
              },
              {
                name: "Mark Kwamboka",
                role: "Family Representative — St. Cloud",
                quote: "Middleton Funeral Services understood that every family grieves differently. They gave us the space to make decisions while providing clear guidance whenever we needed it. Their compassionate approach helped us focus on celebrating Grace's life and the wonderful memories she left behind.",
                img: getDriveImageUrl('1RbwOIdaWyAR4m-x666VcoxVTfNBNWUM3')
              },
              {
                name: "Rachel Reed",
                role: "Family Representative — Minneapolis",
                quote: "Michael's passing was an incredibly painful experience for our family, but Middleton Funeral Services helped us navigate the practical details with compassion and understanding. They treated Michael with dignity and made sure our family's wishes were respected throughout the process. We are grateful for the care they provided.",
                img: getDriveImageUrl('1LeC5sboQ92anTQRWMKaEChzfAVpCVtWM')
              },
              {
                name: "Jason Martin",
                role: "Family Representative — Mankato",
                quote: "Sophia deserved a farewell that reflected the beauty, kindness and love she brought into our lives. Middleton Funeral Services listened carefully to our family and helped us create a meaningful and respectful service. Their compassion and attention to detail gave our family comfort during a very difficult time.",
                img: getDriveImageUrl('1ZXDUReR40a_ACsar9kGQK_89VdWR5J4T')
              },
              {
                name: "David Vance",
                role: "Family Representative — Twin Cities",
                quote: "During one of the most difficult moments of our lives, Middleton Funeral Services helped our family feel supported and cared for. They handled every detail with compassion and professionalism, allowing us to focus on remembering and celebrating our mother's life. We are deeply grateful for their guidance and kindness.",
                img: getDriveImageUrl('18Oj8jSBPYrGWNKQnwspkgZkThu1vXry_')
              },
              {
                name: "Susan Miller",
                role: "Family Representative — St. Cloud",
                quote: "Losing Robert was incredibly difficult, but Middleton Funeral Services made the funeral arrangements easier for our family. They listened to our wishes, answered every question and treated Robert with dignity and respect. Their support gave me peace of mind during an overwhelming time.",
                img: getDriveImageUrl('14I5hCsQ5ap1S7ZFtNvt0YUegAe8TDDmz')
              },
              {
                name: "Emily Sterling",
                role: "Family Representative — Rochester",
                quote: "Middleton Funeral Services guided our family through every step of John's arrangements with patience and genuine compassion. They respected our family's wishes and helped us create a meaningful service that truly reflected who my father was. We will always appreciate the care they showed our family.",
                img: getDriveImageUrl('1MUa5L-FsRY4H_jjlotLXSROSHdSCTiTR')
              }
            ];

            const total = allTestimonials.length;
            const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + total) % total);
            const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % total);

            // Display 3 items starting at testimonialIndex
            const visibleItems = [
              allTestimonials[testimonialIndex % total],
              allTestimonials[(testimonialIndex + 1) % total],
              allTestimonials[(testimonialIndex + 2) % total],
            ];

            return (
              <div className="relative max-w-6xl mx-auto px-4 md:px-12">
                <button
                  onClick={prevTestimonial}
                  className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#411548] hover:bg-[#411548] hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#411548] hover:bg-[#411548] hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {visibleItems.map((testimonial, idx) => (
                    <motion.div
                      key={`${testimonial.name}-${idx}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Heart key={i} size={14} className="fill-[#411548] text-[#411548]" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-8 text-base md:text-lg leading-relaxed flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className="relative mt-auto">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg mb-3">
                          <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#411548] rounded-full flex items-center justify-center text-white shadow-lg">
                          <MessageSquare size={12} />
                        </div>
                      </div>
                      <h4 className="font-bold text-[#411548] uppercase tracking-wider text-sm mt-3">{testimonial.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">{testimonial.role}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-12">
                  {allTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === testimonialIndex ? 'w-8 bg-[#411548]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* BLOG PREVIEW - WHITE SECTION SEPARATOR */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> FROM OUR BLOG <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="text-5xl font-serif font-black text-[#411548] uppercase mb-4 tracking-tight tracking-tight">The Grief <span className="text-black">Journal</span></h2>
            <p className="text-black/60 font-light text-xl max-w-2xl mx-auto">Compassionate guidance and educational insights from our professional bereavement team.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Understanding Ambiguous Loss", category: "Grief Support", date: "May 1, 2026", img: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&w=600&q=80" },
              { title: "The Importance of Pre-Planning", category: "Education", date: "April 15, 2026", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80" },
              { title: "Supporting a Grieving Friend", category: "Community", date: "March 30, 2026", img: "https://images.unsplash.com/photo-1516589174184-c685266d4af4?auto=format&fit=crop&w=600&q=80" }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-[3rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                </div>
                <div className="px-2">
                  <span className="text-[#411548] font-black text-[10px] tracking-[0.3em] uppercase mb-4 block opacity-60 font-mono">{post.category} • {post.date}</span>
                  <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-6 leading-tight group-hover:text-black transition-colors tracking-tight">{post.title}</h3>
                  <Link to="/blog" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#411548] hover:gap-5 transition-all">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/blog" className="inline-flex items-center gap-4 bg-white border-2 border-[#411548] text-[#411548] px-14 py-6 rounded-full font-black text-sm hover:bg-[#411548] hover:text-white transition-all shadow-xl tracking-widest uppercase">
              View All Articles <BookOpen size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* GRIEF SUPPORT & NEWSLETTER CTA - FULL WIDTH END-TO-END */}
      <section className="bg-[#411548] py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white mb-8">
                 <span className="w-12 h-[1px] bg-white/40"></span> HEALING & SUPPORT <span className="w-12 h-[1px] bg-white/40"></span>
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-black uppercase mb-10 leading-tight tracking-tight text-white">Finding Your Balance <br/> <span className="text-white italic font-light lowercase">After Loss</span></h2>
              <p className="text-white font-light text-xl mb-12 leading-relaxed">
                Join our supportive community and receive bi-weekly guidance, compassionate resources, and direct information on local grief groups in Minnesota.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/join-support-group" className="inline-flex items-center gap-3 bg-white text-[#411548] px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl whitespace-nowrap">
                  Join Support Group <Users size={16} />
                </Link>
                <Link to="/grief-support" className="inline-flex items-center gap-3 bg-transparent border-2 border-white/40 text-white px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/10 transition-all whitespace-nowrap">
                  Grief Resources <Heart size={16} />
                </Link>
                <Link to="/book-appointment" className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 text-white px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all whitespace-nowrap">
                  1-on-1 Counseling
                </Link>
                <Link to="/grief-support" className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 text-white px-8 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all whitespace-nowrap">
                  Spiritual Care Guide <CustomIcon size={14} variant="white" />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[5rem] border border-white/10 shadow-2xl">
                <h3 className="text-3xl font-serif font-black mb-8 flex items-center gap-4 uppercase tracking-tight text-white"><Mail className="text-white" size={32} /> Newsletter</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com" 
                    className="w-full bg-white/5 border border-white/20 rounded-[2rem] px-8 py-6 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-light text-lg placeholder:text-white/50 text-white"
                  />
                  <div className="flex items-start gap-2.5 px-2">
                    <input
                      type="checkbox"
                      id="home-newsletter-consent"
                      required
                      className="mt-1 w-4 h-4 accent-white rounded border-white/20 cursor-pointer"
                    />
                    <label htmlFor="home-newsletter-consent" className="text-[11px] text-white/80 font-light leading-snug">
                      I consent to receiving Middleton's bi-weekly grief support updates and community news. <a href="#/privacy-policy" className="underline text-white font-medium">Privacy Policy</a>
                    </label>
                  </div>
                  <button type="submit" className="w-full bg-white text-[#411548] py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-2xl">
                    Join Community
                  </button>
                  <p className="text-[10px] text-white text-center font-bold uppercase tracking-widest">Privacy focused. Unsubscribe any time.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
