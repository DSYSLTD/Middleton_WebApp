import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Award, 
  History, 
  Target, 
  MapPin, 
  Handshake, 
  CheckCircle2,
  Gem,
  Medal,
  Star,
  FileText,
  ClipboardCheck,
  Calendar,
  Truck,
  Globe,
  Flame,
  Search,
  Scale,
  Bird,
  Quote,
  ChevronRight,
  ArrowRight,
  Clock
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function AboutUs() {
  const values = [
    { 
      name: 'Deep Compassion', 
      desc: "Supporting you through every stage of bereavement with unwavering empathy, professional counsel, and deeply personalized care. We help you navigate sudden loss and anticipatory grief with warmth and dignity.", 
      icon: <CustomIcon size={40} /> 
    },
    { 
      name: 'Foundational Integrity', 
      desc: "Full transparency in every interaction, ensuring absolute legal compliance and peace of mind for every family we serve across Minnesota. We uphold the highest ethical standards in all our bereavement services.", 
      icon: <CustomIcon size={40} /> 
    },
    { 
      name: 'Professional Excellence', 
      desc: "From certified mortuary science to custom memorialization, we provide the highest standard of professional funeral care with absolute precision, honoring every individual's beliefs and traditions.", 
      icon: <CustomIcon size={40} /> 
    },
    { 
      name: 'Innovative Care', 
      desc: "Embracing technology and sustainable options to provide modern, meaningful ways to celebrate and honor your loved one's unique legacy through virtual memorials and eco-conscious rites.", 
      icon: <CustomIcon size={40} /> 
    },
  ];

  const workSteps = [
    { 
      step: "01", 
      title: "Reporting the Death", 
      desc: "When a loved one passes away, it is important to notify the proper Minnesota authorities: the county medical examiner or coroner. Middleton Funeral Services coordinates this process, ensuring the death is correctly documented, reported, and that no step is missed.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "02", 
      title: "Initial Consultation & Support", 
      desc: "Our team meets with your family to discuss your loved one's wishes and your family's needs. We provide a compassionate, supportive environment to explore all funeral and cremation options, guiding you toward informed decisions with no pressure.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "03", 
      title: "Acquiring Legal Documents", 
      desc: "We secure all required documentation in compliance with Minnesota state regulations, including: Death Certificate (legal, insurance, and estate purposes); Burial Permit (required for all interments); and Cremation Authorization (required before cremation proceeds). All paperwork is completed accurately and submitted on time.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "04", 
      title: "Planning the Service", 
      desc: "Together we design a personalized funeral or memorial service. Options include traditional funeral services (visitation, ceremony, burial); cremation services with personalized ceremonies; green burials; virtual or hybrid memorial services; and pre-planned arrangements for future needs.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "05", 
      title: "Selecting Products", 
      desc: "We assist you in selecting meaningful items: caskets (traditional, eco-friendly, or customized); urns in a wide range of styles and materials; keepsakes for lasting mementoes; and casket adornment options for personalized floral and decorative arrangements.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "06", 
      title: "Transportation & Livery", 
      desc: "Our professional livery fleet ensures dignified, seamless transportation throughout: hearses for the deceased, limousines for immediate family, and shuttle or coach services for larger groups. All transportation is managed respectfully from place of death to burial site or crematory.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "07", 
      title: "International Repatriation", 
      desc: "For families needing to send a loved one to another country, we manage all required international transport documentation, coordinate with foreign embassies and consulates, secure permissions and approvals, and liaise with airlines and overseas funeral homes to ensure safe and dignified repatriation.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "08", 
      title: "Burial or Cremation", 
      desc: "Once arrangements are finalized, we proceed with the chosen disposition: burials are handled end-to-end including cemetery transportation and interment; cremations are managed in full compliance with Minnesota state law with ashes returned in an urn of your choice.",
      icon: <CustomIcon size={28} />
    },
    { 
      step: "09", 
      title: "Grief Support & Aftercare", 
      desc: "Our commitment extends well beyond the service. We provide ongoing grief counselling in Apple Valley and surrounding areas; access to support groups and online bereavement communities; guidance on bereavement leave and legal matters; and annual memorial planning for tributes and remembrance gatherings.",
      icon: <CustomIcon size={28} />
    }
  ];

  const assurances = [
    { title: "Personalized Care", meaning: "Every service reflects your loved one's unique life and story", delivery: "One-on-one consultations, family-led planning" },
    { title: "Stress-Free Planning", meaning: "All legal and logistical burdens handled on your behalf", delivery: "Dedicated case coordinator assigned at first contact" },
    { title: "Dignified Handling", meaning: "Respectful, professional care from transfer to final disposition", delivery: "Trained, licensed staff at every stage" },
    { title: "Transparent Pricing", meaning: "Full itemised General Price List provided before commitment", delivery: "FTC Funeral Rule compliant; no hidden charges" },
    { title: "Reliable Repatriation", meaning: "International transportation managed end-to-end", delivery: "Embassy coordination, airline liaison, foreign home partnership" },
    { title: "Ongoing Grief Support", meaning: "Bereavement care continues long after the service", delivery: "Counselling, community groups, annual memorials" },
    { title: "24/7 Availability", meaning: "We answer day or night, weekday or holiday", delivery: "Direct phone lines staffed round the clock" },
    { title: "Legal Compliance", meaning: "Strict adherence to all Minnesota state regulations", delivery: "Licensed establishment; all permits filed promptly" },
  ];

  const team = [
     { id: 'mwansa', name: 'Mwansa Kamangala', role: 'Co-Founder & Funeral Director', img: DRIVE_IMAGES.MWANSA_2 },
     { id: 'elsie', name: 'Elsie Kiboma', role: 'Grief Counselor & Data Analyst', img: DRIVE_IMAGES.ELSIE_1 },
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
              <History size={12} className="text-white" /> About Middleton Funeral Services
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              A Legacy Of Compassion & Care
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Honoring the past, serving the present, and protecting your family's future with dignity, transparency, and deep empathy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR COMMITMENT TO YOU */}
      <section className="py-32 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#411548]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Serving Families</span>
              <div className="w-12 h-[2px] bg-[#411548]"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-[#411548] uppercase leading-[0.9] tracking-tight mb-12">
              Our Commitment <br /> <span className="text-black italic font-light lowercase">To You</span>
            </h2>
            <div className="space-y-8 text-black font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              <p>
                Since 2026, families have turned to our Middleton funeral service for more than just funeral arrangements: they’ve sought comfort, clarity, and care.
              </p>
              <p>
                In a short amount of time, we have established a reputation for deep empathy and professional excellence. Our role is not only to provide guidance but to honor the stories that define a life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR HISTORY - ENHANCED (NO IMAGE) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
           <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-8"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                   <div className="w-12 h-[2px] bg-[#411548]"></div>
                   <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Our Heritage</span>
                   <div className="w-12 h-[2px] bg-[#411548]"></div>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-[#411548] mb-12 uppercase font-black tracking-tight leading-none text-center">Rooted in <br/> <span className="text-black">Community Care</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                   <div className="space-y-8 text-black font-light text-xl leading-relaxed flex flex-col justify-between">
                      <p className="first-letter:text-7xl first-letter:font-black first-letter:text-[#411548] first-letter:float-left first-letter:mr-4 first-letter:leading-[1] first-letter:uppercase">Established in 2026 by a family deeply committed to community care, Middleton Funeral Services was built on the belief that every life deserves to be celebrated and remembered with the utmost respect. Founded with a profound dedication to compassion, dignity, and service, the idea for the funeral home arose from a simple but powerful desire.</p>
                      <Link to="/services" className="inline-flex items-center justify-center bg-[#411548] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all whitespace-nowrap self-start">
                        Explore Our Services
                      </Link>
                   </div>
                   <div className="space-y-8 text-black font-light text-xl leading-relaxed border-l border-[#411548]/10 pl-12 flex flex-col justify-between">
                      <p>Our founders bring personal experience navigating grief and loss, which informs every decision we make: from how we answer the phone at 2 a.m., to the care we take in arranging every ceremony. This lived understanding sets us apart from institutional providers. We aren't just a business; we are your neighbors, here to support you in life's most difficult moments.</p>
                      <Link to="/book-appointment" className="inline-flex items-center justify-center bg-[#411548] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all whitespace-nowrap self-start">
                        Book Appointment
                      </Link>
                   </div>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* STRATEGIC CTA 1 - FULL WIDTH */}
      <section className="py-24 bg-[#411548] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl md:text-5xl font-serif font-black uppercase mb-4 tracking-tight text-white">Need Immediate Assistance?</h3>
              <p className="text-white text-xl font-light">Our compassionate team is available 24 hours a day, 7 days a week.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:9524862871" className="bg-white text-[#411548] px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl inline-flex items-center justify-center gap-3 whitespace-nowrap shrink-0">
                 Call Us Now <ArrowRight size={18} />
              </a>
              <Link to="/book-appointment" className="bg-white/10 border-2 border-white/30 text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all shadow-xl text-center whitespace-nowrap">
                 Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-xl border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#411548]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="w-12 h-12 mb-8 flex items-center justify-center">
                  <CustomIcon size={48} />
                </div>
                <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[2px] bg-[#411548]"></div>
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Serving The Present</span>
                 <div className="w-12 h-[2px] bg-[#411548]"></div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-black text-[#411548] uppercase mb-6 tracking-tight">Our Mission</h3>
              <p className="text-black font-light text-xl leading-relaxed mb-8">
                To provide compassionate, personalized funeral services that honour the lives of those we serve with dignity, respect, and care. We aim to offer families a comforting experience and comprehensive support during their most challenging times.
              </p>
              <p className="text-black font-semibold text-lg leading-relaxed">
                As a compassionate advisor, we offer grief support to help families navigate the mourning process and grief journey after the loss of a loved one.
              </p>
            </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#411548] p-12 lg:p-16 rounded-[4rem] shadow-xl text-white relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="w-12 h-12 mb-8 flex items-center justify-center">
                  <CustomIcon size={48} variant="white" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[1px] bg-white/30"></div>
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Protecting The Future</span>
                 <div className="w-12 h-[1px] bg-white/30"></div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight text-white">Our Vision</h3>
              <p className="text-white font-light text-xl leading-relaxed mb-8">
                To be our community's leading funeral planning provider, known for our commitment to excellence, integrity, and community resources and support.
              </p>
              <p className="text-white/80 font-light text-lg leading-relaxed">
                We strive to be a trusted partner for burial arrangements, cremation services, permanent memorialization, and life celebration events.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STRATEGIC CTA 2 - FULL WIDTH - MOVED HERE */}
      <section className="bg-[#411548] py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tight mb-4 leading-tight text-white">Protecting Your <br/> <span className="text-white italic font-light lowercase">Future Legacy</span></h2>
              <p className="text-white/60 max-w-2xl mb-8 text-xl font-light">Watch our detailed orientation video to understand how we support you from first call to final farewell.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/book-appointment" className="bg-white text-[#411548] px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl text-center whitespace-nowrap inline-flex items-center justify-center min-w-[260px]">
                Book Appointment
              </Link>
              <Link to="/services" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all text-center whitespace-nowrap inline-flex items-center justify-center min-w-[260px]">
                Full Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE VALUE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-20">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> WHAT WE VALUE <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-6">Our Core <span className="text-black">Values</span></h2>
              <p className="text-black max-w-2xl mx-auto font-light leading-relaxed">The principles that guide every action we take and every family we serve.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {values.map((v, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[3rem] border-2 border-[#411548]/5 hover:border-[#411548] hover:shadow-2xl transition-all flex flex-col md:flex-row gap-8 group"
                >
                   <div className="w-20 h-20 shrink-0 bg-[#411548]/5 rounded-3xl flex items-center justify-center text-[#411548] shadow-sm group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                      <div className="group-hover:invert group-hover:brightness-0 transition-all duration-500">
                        {v.icon}
                      </div>
                   </div>
                   <div>
                      <h3 className="font-serif font-black text-[#411548] text-2xl mb-4 uppercase tracking-tighter transition-colors">{v.name}</h3>
                      <p className="text-black text-lg font-light leading-relaxed">{v.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-20">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <span className="w-12 h-[2px] bg-[#411548]"></span> HOW WE WORK <span className="w-12 h-[2px] bg-[#411548]"></span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8 text-center max-w-4xl mx-auto leading-tight">
                Removing Complexity From <br/> <span className="text-black">Life's Most Difficult Moments</span>
              </h2>
              <p className="text-black max-w-3xl mx-auto font-light leading-relaxed text-lg mb-12">
                Our streamlined, compassionate process removes complexity from one of life's most difficult moments. Here is what to expect when you contact Middleton Funeral Services.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {workSteps.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-10 rounded-[3rem] border border-[#411548]/5 shadow-sm flex flex-col relative group hover:shadow-2xl transition-all h-full hover:-translate-y-2 duration-500"
                >
                   <div className="absolute top-8 right-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-serif font-black italic shadow-lg z-10 group-hover:bg-[#411548] transition-colors">
                      {s.step}
                   </div>
                   <div className="w-20 h-20 bg-[#411548]/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform p-3">
                      <CustomIcon size={40} />
                   </div>
                   <h3 className="font-bold text-black text-xl mb-6 uppercase tracking-tight leading-tight group-hover:text-[#411548] transition-colors">{s.title}</h3>
                   <p className="text-black text-sm font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
           </div>

           {/* HIGH-IMPACT DIRECTOR CONSULTATION HUB */}
            <div className="mt-24 px-4 md:px-0">
               <div className="bg-[#411548] py-20 px-8 md:px-16 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl border border-white/10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  <div className="relative z-10 max-w-5xl mx-auto">
                    <span className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-6 border border-white/20">
                      <CustomIcon size={14} variant="white" /> 24/7 Licensed Care & Support
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif font-black uppercase mb-6 tracking-tight text-white leading-tight">
                      Personalized Family Consultations <br className="hidden md:block"/> & 24/7 Dedicated Care
                    </h3>
                    <p className="text-white/90 max-w-3xl mx-auto mb-10 text-lg md:text-xl font-light leading-relaxed">
                      Every family's journey is unique. Our licensed funeral directors meet with you in person, by phone, or virtually to provide compassionate guidance, answer every question, and help you arrange a dignified tribute with complete price transparency.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                        <div className="w-10 h-10 bg-white text-[#411548] rounded-xl flex items-center justify-center font-bold mb-4 shadow-md">
                          <Clock size={20} />
                        </div>
                        <h4 className="font-serif font-black text-white text-base uppercase tracking-tight mb-1">24/7 Director Availability</h4>
                        <p className="text-white/70 text-xs font-light leading-relaxed">Direct, immediate support at any hour from our experienced local team.</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                        <div className="w-10 h-10 bg-white text-[#411548] rounded-xl flex items-center justify-center font-bold mb-4 shadow-md">
                          <ShieldCheck size={20} />
                        </div>
                        <h4 className="font-serif font-black text-white text-base uppercase tracking-tight mb-1">FTC Itemized Clarity</h4>
                        <p className="text-white/70 text-xs font-light leading-relaxed">Complete itemized price lists provided upfront with zero pressure or hidden fees.</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                        <div className="w-10 h-10 bg-white text-[#411548] rounded-xl flex items-center justify-center font-bold mb-4 shadow-md">
                          <Heart size={20} />
                        </div>
                        <h4 className="font-serif font-black text-white text-base uppercase tracking-tight mb-1">Tailored Ceremonies</h4>
                        <p className="text-white/70 text-xs font-light leading-relaxed">Honoring all religious, military, cultural, and personal preferences with reverence.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link to="/book-appointment" className="bg-white text-[#411548] px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 whitespace-nowrap inline-flex items-center justify-center min-w-[260px]">
                         Book Consultation
                      </Link>
                      <Link to="/prices" className="bg-white/10 text-white border border-white/30 px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/20 transition-all backdrop-blur-md whitespace-nowrap inline-flex items-center justify-center min-w-[260px]">
                         View Price List
                      </Link>
                    </div>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* EEAT Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-24 relative">
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="w-12 h-[2px] bg-[#411548]"></div>
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">MIDDLETON CORE PILLARS</span>
               <div className="w-12 h-[2px] bg-[#411548]"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8 text-center mx-auto text-black">A Legacy Built On <br/> <span className="text-black italic font-light lowercase">Absolute Integrity</span></h2>
            <p className="text-black/60 max-w-2xl mx-auto text-lg md:text-xl font-light">Our reputation is earned through every interaction, every ceremony, and every family we serve.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
               whileHover={{ y: -10, scale: 1.02 }}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="p-12 bg-white rounded-[4rem] border border-gray-100 hover:shadow-[0_40px_80px_-15px_rgba(65,21,72,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-black/[0.01] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#411548]/5 transition-all duration-700 flex items-center justify-center">
                <CustomIcon size={48} className="opacity-10 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="text-black text-3xl font-serif font-black mb-8 group-hover:text-[#411548] transition-colors uppercase tracking-tight italic">Decades of Local Presence</div>
              <p className="text-black/70 font-light text-xl leading-relaxed relative z-10">
                Our leadership team has direct, personal experience with grief and bereavement. Co-Founder Mwansa Kamangala has guided hundreds of families through end-of-life arrangements since 2026, bringing deep-rooted community knowledge and sensitivity.
              </p>
            </motion.div>
            
            <motion.div 
               whileHover={{ y: -10, scale: 1.02 }}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="p-12 bg-white rounded-[4rem] border border-gray-100 hover:shadow-[0_40px_80px_-15px_rgba(65,21,72,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-black/[0.01] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#411548]/5 transition-all duration-700 flex items-center justify-center">
                <CustomIcon size={48} className="opacity-10 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="text-black text-3xl font-serif font-black mb-8 group-hover:text-[#411548] transition-colors uppercase tracking-tight italic">Certified Mortuary Care</div>
              <p className="text-black/70 font-light text-xl leading-relaxed relative z-10">
                Our licensed funeral directors hold advanced professional credentials in mortuary science. We partner with elite hospice providers to ensure clinical-grade care and end-of-life support that meets the highest medical standards.
              </p>
            </motion.div>
            
            <motion.div 
               whileHover={{ y: -10, scale: 1.02 }}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="p-12 bg-white rounded-[4rem] border border-gray-100 hover:shadow-[0_40px_80px_-15px_rgba(65,21,72,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-black/[0.01] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#411548]/5 transition-all duration-700 flex items-center justify-center">
                <CustomIcon size={48} className="opacity-10 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="text-black text-3xl font-serif font-black mb-8 group-hover:text-[#411548] transition-colors uppercase tracking-tight italic">Licensed State Provider</div>
              <p className="text-black/70 font-light text-xl leading-relaxed relative z-10">
                Middleton Funeral Services is fully recognized and licensed by the State of Minnesota. We operate under stringent regulatory oversight, ensuring that every document and process is handled with legal precision.
              </p>
            </motion.div>
            
            <motion.div 
               whileHover={{ y: -10, scale: 1.02 }}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="p-12 bg-white rounded-[4rem] border border-gray-100 hover:shadow-[0_40px_80px_-15px_rgba(65,21,72,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-black/[0.01] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#411548]/5 transition-all duration-700 flex items-center justify-center">
                <CustomIcon size={48} className="opacity-10 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="text-black text-3xl font-serif font-black mb-8 group-hover:text-[#411548] transition-colors uppercase tracking-tight italic">Transparent & Compassionate</div>
              <p className="text-black/70 font-light text-xl leading-relaxed relative z-10">
                We believe in complete transparency. Our pricing is upfront, and our bereavement support is ongoing. We stand by our promise to provide verifiable trust through every step of the grief journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Affiliations & Compliance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif font-black text-[#411548] uppercase mb-8 leading-tight tracking-tight flex items-center gap-4">
                  <CustomIcon size={32} /> Professional Affiliations <br/> & Compliance
                </h2>
                <p className="text-black font-light text-lg mb-10 leading-relaxed">Establishing authority in the funeral services industry requires more than experience; it requires formal recognition, verified partnerships, and demonstrated legal compliance.</p>
                
                <h3 className="font-bold text-black uppercase text-sm tracking-widest mb-6 p-3 bg-gray-50 border-l-4 border-[#411548]">Licensing & Regulatory Compliance</h3>
                <ul className="space-y-4 mb-10">
                  {/* Professional Affiliations & Compliance list */}
                  {[
                    "Licensed funeral establishment operating under Minnesota Statute Chapter 149A",
                    "All funeral directors hold Minnesota Board of Mortuary Science licensure",
                    "Strict adherence to the Federal Trade Commission (FTC) Funeral Rule",
                    "Full compliance with the Minnesota Department of Health burial permit requirements",
                    "International repatriation processes comply with IATA regulations and receiving-country requirements"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-black text-sm font-light leading-relaxed">
                      <CustomIcon size={14} className="mt-1 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2">
                <h3 className="font-bold text-black uppercase text-sm tracking-widest mb-6 p-4 bg-gray-50 border-l-4 border-[#411548] flex items-center gap-4">
                  <CustomIcon size={20} /> Community & Healthcare Partnerships
                </h3>
                  <ul className="space-y-8">
                    {[
                      { name: "CentraCare Hospice", role: "Collaborative care for patients transitioning to end-of-life" },
                      { name: "Cremation Society of Minnesota", role: "Expanded access to cremation options for families" },
                      { name: "Mental Health Crisis Line", role: "Bereavement resource referral partnership" },
                      { name: "Minnesota Warmline", role: "Peer support network for grieving families" },
                      { name: "National Suicide Prevention Lifeline", role: "Crisis resource for those coping with traumatic loss" }
                    ].map((p, i) => (
                      <li key={i} className="group flex items-start gap-4">
                        <CustomIcon size={16} className="mt-1.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#411548] group-hover:text-black transition-colors">{p.name}</h4>
                          <p className="text-black text-sm font-light italic">{p.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Grief Support Credentials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[2px] bg-[#411548]"></div>
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">Specialized Care</span>
                 <div className="w-12 h-[2px] bg-[#411548]"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#411548] uppercase mb-8 leading-[0.9] tracking-tighter">Grief Support <br/> <span className="text-black">Credentials</span></h2>
              <p className="text-[#411548] font-bold text-lg mb-8 italic">"Our commitment extends beyond the service."</p>
              <p className="text-black font-light text-lg mb-10 leading-relaxed">
                Our grief counsellors are trained in evidence-based bereavement models including the Kübler-Ross grief stages, Worden's Tasks of Mourning, and Continuing Bonds Theory.
              </p>
              <div className="p-10 bg-[#411548]/5 rounded-[3.5rem] border-2 border-[#411548]/10 text-center">
                 <Quote className="text-[#411548]/20 w-12 h-12 mx-auto mb-6" />
                 <p className="text-black font-serif text-xl italic leading-relaxed">"We are here to support you through every stage of your grief journey, offering a safe space for healing and remembrance."</p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { type: "Sudden Loss", desc: "Support for families facing traumatic and unexpected death." },
                  { type: "Anticipatory Grief", desc: "Guidance for those anticipating a loss before it occurs." },
                  { type: "Ambiguous Loss", desc: "Support for disappearance, dementia, or estrangement." },
                  { type: "Disenfranchised Grief", desc: "Validation for losses not openly acknowledged by society." },
                  { type: "Complicated Grief", desc: "Specialized care for prolonged grief disorder and complex reactions." },
                  { type: "Collective Grief", desc: "Support for communities navigating shared loss and transitions." }
                ].map((g, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white border-2 border-[#411548]/5 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-[#411548] hover:border-[#411548]"
                  >
                    <h4 className="text-[#411548] font-bold uppercase text-xs tracking-widest mb-4">{g.type}</h4>
                    <p className="text-black text-sm font-light leading-relaxed">{g.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR ASSURANCES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-20">
              <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
                 <ShieldCheck className="w-5 h-5" /> OUR ASSURANCES
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#411548] uppercase font-black tracking-tight mb-8">Peace Of Mind <span className="text-black">Is Our Promise</span></h2>
              <p className="text-black max-w-2xl mx-auto font-light leading-relaxed">What you can count on from the moment you reach out to us.</p>
           </div>

           <div className="overflow-x-auto rounded-[4rem] border-2 border-[#411548]/5 shadow-2xl bg-white">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#411548] text-white">
                    <th className="px-10 py-10 font-serif text-xl uppercase tracking-tight font-black">What We Guarantee</th>
                    <th className="px-10 py-10 font-serif text-xl uppercase tracking-tight font-black">What It Means</th>
                    <th className="px-10 py-10 font-serif text-xl uppercase tracking-tight font-black">How We Deliver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#411548]/5">
                  {assurances.map((a, i) => (
                    <tr key={i} className="group transition-colors">
                      <td className="px-10 py-10">
                        <span className="text-[#411548] font-serif font-black uppercase text-lg tracking-tight group-hover:translate-x-2 transition-transform block">{a.title}</span>
                      </td>
                      <td className="px-10 py-10 text-black font-light text-lg italic leading-relaxed">"{a.meaning}"</td>
                      <td className="px-10 py-10 text-[#411548] text-lg font-black">{a.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>

           <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { val: "24/7", label: "Direct Support Line" },
                { val: "100%", label: "Legal Compliance" },
                { val: "FTC", label: "General Price List" },
                { val: "MN", label: "Licensed Mortuary" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white px-10 py-12 rounded-[3rem] text-center border-2 border-[#411548]/5 group hover:bg-[#411548] transition-all duration-500 shadow-sm hover:shadow-2xl"
                >
                   <p className="text-4xl font-serif font-black text-[#411548] group-hover:text-white mb-2 uppercase tracking-tight transition-colors">{stat.val}</p>
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#411548]/40 group-hover:text-white/70 transition-colors">{stat.label}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-white overflow-hidden border-t border-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
           <span className="inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#411548] mb-4">
              <span className="w-8 h-[2px] bg-[#411548]"></span> OUR BACKBONE <span className="w-8 h-[2px] bg-[#411548]"></span>
           </span>
           <h2 className="font-serif text-3xl md:text-4xl text-[#411548] uppercase font-black mb-16 tracking-tight">Our <span className="text-black">Visionaries</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
              {team.map((m, i) => (
                 <motion.div 
                   key={i} 
                   className="relative"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: i * 0.2 }}
                   viewport={{ once: true }}
                 >
                    <Link to={`/team/${m.id}`} className="group block focus:outline-none">
                      <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-white shadow-lg group-hover:shadow-2xl transition-all duration-700 relative scale-90 group-hover:scale-100 border border-gray-100">
                         <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                         
                         {/* Centered learn more badge on hover */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                           <span className="bg-[#411548] text-white text-[10px] font-black tracking-widest uppercase py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                             Learn More <ArrowRight size={12} />
                           </span>
                         </div>
                      </div>
                      <h3 className="font-serif font-black text-[#411548] text-2xl mb-1 uppercase tracking-tighter group-hover:text-[#411548]/80 transition-colors">{m.name}</h3>
                      <p className="text-black font-black text-[9px] uppercase tracking-[0.2em] mb-2">{m.role}</p>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#411548] opacity-0 group-hover:opacity-100 transition-all duration-500 mt-2">
                        View Bio <ArrowRight size={10} />
                      </span>
                    </Link>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Here To Support Your Family 24/7
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need immediate assistance or wish to plan ahead, our directors are available day and night to answer your questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Contact A Director
            </Link>
            <Link to="/book-appointment" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
