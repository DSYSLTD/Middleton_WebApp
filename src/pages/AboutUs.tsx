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
  Clock,
  ArrowUpRight,
  Feather,
  Mail,
  Phone
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

      {/* HOW WE WORK - INSPIRED BY BRAND WORKFLOW */}
      <section className="bg-[#FAF9F6] py-24 lg:py-32 overflow-hidden border-y border-[#411548]/10">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Top Hero / Next Step Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Context */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-left"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#411548]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                  HERE FOR THE NEXT STEP
                </span>
                <div className="w-12 h-[2px] bg-[#411548]"></div>
              </div>

              <h2 className="font-serif text-[#411548] uppercase font-black tracking-tight mb-6 w-fit">
                <span className="whitespace-nowrap block text-[clamp(21.5px,5.2vw,53px)] leading-[1.15]">
                  A Steady Hand For The
                </span>
                <span className="text-black whitespace-nowrap block text-[clamp(17px,4.11vw,41.9px)] leading-[1.15]">
                  Moments That Matter Most
                </span>
              </h2>

              <p className="text-black font-light text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Middleton Funeral Services offers thoughtful funeral, cremation, and remembrance support for every family — with clear choices, practical guidance, and room to grieve.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  to="/book-appointment" 
                  className="inline-flex items-center gap-2 bg-[#411548] hover:bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 group"
                >
                  Request An Appointment 
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link 
                  to="/services" 
                  className="inline-flex items-center justify-center bg-white hover:bg-[#411548] hover:text-white text-[#411548] border-2 border-[#411548] px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl"
                >
                  Explore Services
                </Link>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-black/70 font-light mt-6">
                <CustomIcon size={16} className="shrink-0" />
                <span>Immediate guidance when you need it, with no pressure to decide everything today.</span>
              </div>
            </motion.div>

            {/* Right Column: Elevated "A Clear Next Step" Card */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-[3rem] p-8 lg:p-10 border-2 border-[#411548]/10 shadow-xl relative">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#411548]"></div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                      A CLEAR NEXT STEP
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#411548]/10 text-[#411548] flex items-center justify-center">
                    <CustomIcon size={18} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-[#411548] font-black uppercase tracking-tight mb-8 leading-snug">
                  You Do Not Have To <br/>
                  <span className="text-black">Carry It Alone</span>
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#411548] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      1
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-black text-[#411548] uppercase tracking-tight mb-1">
                        Tell Us What You Need
                      </h4>
                      <p className="text-black/80 text-sm font-light leading-relaxed">
                        A first conversation can be as simple as, &quot;What do we do now?&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#411548] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      2
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-black text-[#411548] uppercase tracking-tight mb-1">
                        See Your Options Clearly
                      </h4>
                      <p className="text-black/80 text-sm font-light leading-relaxed">
                        We explain the arrangements, products, and costs in plain language with transparent pricing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#411548] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      3
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-black text-[#411548] uppercase tracking-tight mb-1">
                        Make Space For Remembrance
                      </h4>
                      <p className="text-black/80 text-sm font-light leading-relaxed">
                        A meaningful service, a private goodbye, or something tailored in between.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-[#411548]/10 flex items-center gap-3 text-xs text-black font-semibold">
                  <CustomIcon size={18} className="shrink-0" />
                  <span>Respectful, transparent, and shaped around your family.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3-Column Metric / Value Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-y border-[#411548]/15 py-10 my-16 lg:my-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#411548]/15">
              <div className="pt-6 md:pt-0 first:pt-0">
                <span className="font-serif font-black text-2xl text-[#411548] tracking-widest block mb-2">01</span>
                <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight mb-2">
                  Clarity In A Difficult Time
                </h4>
                <p className="text-black font-light text-base leading-relaxed">Plain answers and itemized choices.</p>
              </div>
              <div className="pt-6 md:pt-0 md:pl-10">
                <span className="font-serif font-black text-2xl text-[#411548] tracking-widest block mb-2">02</span>
                <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight mb-2">
                  Care At Your Pace
                </h4>
                <p className="text-black font-light text-base leading-relaxed">Support for today, or planning for later.</p>
              </div>
              <div className="pt-6 md:pt-0 md:pl-10">
                <span className="font-serif font-black text-2xl text-[#411548] tracking-widest block mb-2">03</span>
                <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight mb-2">
                  A Place To Remember
                </h4>
                <p className="text-black font-light text-base leading-relaxed">Thoughtful ways to honor a life.</p>
              </div>
            </div>
          </motion.div>

          {/* Support for the Whole Family */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-16 lg:my-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#411548]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                  SUPPORT FOR THE WHOLE FAMILY
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#411548] uppercase font-black tracking-tight leading-tight mb-6">
                Practical Help, <br />
                <span className="text-black">Held With Care</span>
              </h3>
              <p className="text-black font-light text-lg leading-relaxed">
                There is no single right way to say goodbye. We help you understand what is possible, then make room for what matters to you.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 space-y-5"
            >
              <Link 
                to="/services" 
                className="flex items-start gap-5 p-7 rounded-[2rem] bg-white border-2 border-[#411548]/5 hover:border-[#411548] hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#411548]/5 text-[#411548] flex items-center justify-center shrink-0 group-hover:bg-[#411548] transition-colors">
                  <CustomIcon size={24} variant="hover-white" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight group-hover:text-black transition-colors">
                      Funeral & Memorial Planning
                    </h4>
                    <ArrowUpRight size={18} className="text-[#411548] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>
                  <p className="text-black/80 text-sm font-light leading-relaxed mt-1">
                    A calm, guided conversation about ceremonies, logistics, and the details that make a farewell personal.
                  </p>
                </div>
              </Link>

              <Link 
                to="/services" 
                className="flex items-start gap-5 p-7 rounded-[2rem] bg-white border-2 border-[#411548]/5 hover:border-[#411548] hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#411548]/5 text-[#411548] flex items-center justify-center shrink-0 group-hover:bg-[#411548] transition-colors">
                  <CustomIcon size={24} variant="hover-white" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight group-hover:text-black transition-colors">
                      Cremation & Burial Arrangements
                    </h4>
                    <ArrowUpRight size={18} className="text-[#411548] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>
                  <p className="text-black/80 text-sm font-light leading-relaxed mt-1">
                    Flexible options, explained plainly, with transparent itemized pricing for different budgets and wishes.
                  </p>
                </div>
              </Link>

              <Link 
                to="/obituaries" 
                className="flex items-start gap-5 p-7 rounded-[2rem] bg-white border-2 border-[#411548]/5 hover:border-[#411548] hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#411548]/5 text-[#411548] flex items-center justify-center shrink-0 group-hover:bg-[#411548] transition-colors">
                  <CustomIcon size={24} variant="hover-white" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight group-hover:text-black transition-colors">
                      Obituaries & Remembrance
                    </h4>
                    <ArrowUpRight size={18} className="text-[#411548] group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>
                  <p className="text-black/80 text-sm font-light leading-relaxed mt-1">
                    Create an online place to share a life, gather stories, and give family and friends a way to remember together.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* How We Help - One step at a time is enough */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-16 lg:my-24 pt-16 lg:pt-20 border-t border-[#411548]/15">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#411548]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                  HOW WE HELP
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#411548] uppercase font-black tracking-tight leading-tight mb-6">
                One Step At A Time <br />
                <span className="text-black">Is Enough</span>
              </h3>
              <p className="text-black font-light text-lg leading-relaxed">
                When everything feels urgent, a clear path can make the next decision feel possible. Our process keeps the details moving while you stay close to your family.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 divide-y divide-[#411548]/15"
            >
              <div className="pb-8 first:pt-0">
                <div className="flex items-start gap-6">
                  <span className="font-serif text-4xl sm:text-5xl text-[#411548] font-black shrink-0 w-14 pt-0.5">
                    01
                  </span>
                  <div>
                    <h4 className="font-serif text-2xl font-black text-[#411548] uppercase tracking-tight mb-2">
                      Start With A Call
                    </h4>
                    <p className="text-black font-light text-base leading-relaxed">
                      Tell us what has happened and what you need right now. We will meet you at your pace.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-8">
                <div className="flex items-start gap-6">
                  <span className="font-serif text-4xl sm:text-5xl text-[#411548] font-black shrink-0 w-14 pt-0.5">
                    02
                  </span>
                  <div>
                    <h4 className="font-serif text-2xl font-black text-[#411548] uppercase tracking-tight mb-2">
                      Choose What Feels Right
                    </h4>
                    <p className="text-black font-light text-base leading-relaxed">
                      We lay out the options, costs, and next steps clearly so your family can decide without pressure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-start gap-6">
                  <span className="font-serif text-4xl sm:text-5xl text-[#411548] font-black shrink-0 w-14 pt-0.5">
                    03
                  </span>
                  <div>
                    <h4 className="font-serif text-2xl font-black text-[#411548] uppercase tracking-tight mb-2">
                      Keep The Care Going
                    </h4>
                    <p className="text-black font-light text-base leading-relaxed">
                      From the ceremony to grief resources and practical follow-up, support does not end at goodbye.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strategic Planning Ahead Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-16 lg:my-24 bg-[#411548] rounded-[3.5rem] p-10 sm:p-14 lg:p-20 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/[0.04] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-black/20 rounded-full translate-y-1/2 pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 relative z-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[1px] bg-white/40"></div>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-bold">
                    PLANNING AHEAD
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-black uppercase tracking-tight leading-tight mb-4">
                  Give Your Future Family <br />
                  <span className="italic font-light lowercase text-white">a little more certainty</span>
                </h3>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                  Pre-planning lets you record your preferences, explore budget levels, and leave fewer hard decisions for the people you love.
                </p>
              </div>
              <div className="shrink-0">
                <Link 
                  to="/pre-planning" 
                  className="inline-flex items-center justify-center gap-2 bg-white hover:scale-105 text-[#411548] px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-2xl group whitespace-nowrap"
                >
                  Request A Conversation 
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Beyond the Service */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 py-16 lg:py-20 border-t border-[#411548]/15">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#411548]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                  BEYOND THE SERVICE
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#411548] uppercase font-black tracking-tight leading-tight">
                Remembrance <br />
                <span className="text-black">Keeps Unfolding</span>
              </h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div className="bg-white p-7 rounded-[2rem] border-2 border-[#411548]/5">
                <div className="flex items-center gap-2.5 mb-2">
                  <CustomIcon size={18} className="shrink-0" />
                  <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight">
                    Grief Education
                  </h4>
                </div>
                <p className="text-black/80 font-light text-base leading-relaxed">
                  Gentle, practical resources for the days and months when support still matters.
                </p>
              </div>

              <div className="bg-white p-7 rounded-[2rem] border-2 border-[#411548]/5">
                <div className="flex items-center gap-2.5 mb-2">
                  <CustomIcon size={18} className="shrink-0" />
                  <h4 className="font-serif text-xl font-black text-[#411548] uppercase tracking-tight">
                    Thoughtful Gestures
                  </h4>
                </div>
                <p className="text-black/80 font-light text-base leading-relaxed">
                  Sympathy gifts and memorial details that help friends and family show up with care.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Whenever You Are Ready */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 lg:py-28 text-center max-w-4xl mx-auto px-4 border-t border-[#411548]/15"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#411548]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548]">
                WHENEVER YOU ARE READY
              </span>
              <div className="w-12 h-[2px] bg-[#411548]"></div>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#411548] uppercase tracking-tight leading-tight mb-6">
              We Are Here To Make The <br className="hidden sm:block"/>
              <span className="text-black">Next Step Feel A Little Lighter</span>
            </h3>

            <p className="text-black font-light text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Reach out for immediate guidance, a thoughtful planning conversation, or simply a clear answer to a difficult question.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:inquiries@middletonfuneralservices.com" 
                className="inline-flex items-center gap-2 bg-[#411548] hover:bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 group"
              >
                <Mail size={16} /> Email Our Care Team 
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="tel:9524862871" 
                className="inline-flex items-center gap-2 bg-white hover:bg-[#411548] hover:text-white text-[#411548] border-2 border-[#411548] px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl"
              >
                <Phone size={15} /> (952) 486-2871
              </a>
            </div>

            <div className="mt-8 text-xs font-semibold tracking-widest uppercase text-black/60">
              middletonfuneralservices.com • 14850 Garret Ave, Apple Valley MN
            </div>
          </motion.div>

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
