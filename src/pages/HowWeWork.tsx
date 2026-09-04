import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, HeartHandshake, FileCheck2, CalendarHeart, 
  Package, Truck, ArrowRight, CheckCircle2, ShieldCheck, Clock, Store, MessageCircle,
  Globe, Flame, Users
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function HowWeWork() {
  const steps = [
    {
      num: '01',
      icon: PhoneCall,
      title: '1. Reporting the Death',
      subtitle: '24/7 Immediate Response & Authorities Notification',
      content: 'When a loved one passes away, families must notify the appropriate authorities, including the county medical examiner or coroner where required by Minnesota law. Our compassionate team assists families throughout this process, ensuring all reporting procedures are handled correctly and respectfully.',
      highlight: 'We are available 24/7 to provide immediate assistance and guidance.',
      bullets: [
        'Immediate 24/7 phone dispatch & response',
        'County medical examiner & coroner notification',
        'Dignified initial transfer of remains',
        'Clear guidance for home or hospital deaths'
      ]
    },
    {
      num: '02',
      icon: HeartHandshake,
      title: '2. Initial Consultation & Family Support',
      subtitle: 'Personalized Guidance & Emotional Care',
      content: 'Our funeral directors meet personally with families to understand their wishes, traditions, religious preferences, and service expectations. We provide compassionate guidance while helping families explore funeral, burial, cremation, memorial, and pre-planning options.',
      highlight: 'During this stage, we focus on:',
      bullets: [
        'Emotional support',
        'Service planning guidance',
        'Cultural and religious preferences',
        'Budget transparency',
        'Personalized memorialization options'
      ]
    },
    {
      num: '03',
      icon: FileCheck2,
      title: '3. Legal & Administrative Assistance',
      subtitle: 'Minnesota Regulatory & Permits Compliance',
      content: 'Navigating legal paperwork after a loss can feel overwhelming. Middleton Funeral Services assists families in obtaining and processing all required legal documentation in compliance with Minnesota regulations.',
      highlight: 'We Assist With:',
      bullets: [
        'Death Certificates',
        'Burial Permits',
        'Cremation Authorizations',
        'Transit Permits',
        'Insurance Documentation',
        'Veterans Benefit Paperwork',
        'Repatriation Documentation',
        'Estate & Probate Guidance Referrals'
      ]
    },
    {
      num: '04',
      icon: CalendarHeart,
      title: '4. Funeral & Memorial Planning',
      subtitle: 'Customized Tributes & Legacy Celebrations',
      content: 'We work closely with families to create personalized services that honour the unique life and legacy of their loved one.',
      highlight: 'Available Service Options:',
      bullets: [
        'Traditional Funeral Services',
        'Memorial Services',
        'Celebration of Life Ceremonies',
        'Graveside Services',
        'Religious & Cultural Ceremonies',
        'Green Burials',
        'Cremation Services',
        'Veteran Services'
      ],
      extraText: 'Families may personalize every detail including music, readings, floral arrangements, tribute videos, décor, and keepsakes.'
    },
    {
      num: '05',
      icon: Package,
      title: '5. Funeral Products & Memorial Items',
      subtitle: 'Thoughtfully Selected Keepsakes & Caskets',
      content: 'We offer thoughtfully selected funeral products designed to create meaningful and lasting tributes. Each product can be personalized to reflect your loved one’s personality, faith, interests, and legacy.',
      highlight: 'Available Products Include:',
      bullets: [
        'Traditional Caskets',
        'Eco-Friendly Caskets',
        'Customized Caskets',
        'Cremation Urns',
        'Keepsake Urns',
        'Memorial Jewelry',
        'Floral Arrangements',
        'Casket Adornments',
        'Memory Books',
        'Tribute Videos',
        'Printed Memorial Materials'
      ]
    },
    {
      num: '06',
      icon: Truck,
      title: '6. Transportation & Livery Services',
      subtitle: 'Dignified & Professional Transfer',
      content: 'We provide professional and dignified transportation services throughout every stage of the funeral process.',
      highlight: 'Livery Fleet Highlights:',
      bullets: [
        'Clean executive funeral hearses & coaches',
        'Chauffeured family limousines (7-passenger)',
        'Pallbearer & floral transfer vehicles',
        'Airport & state-wide repatriation transport'
      ]
    },
    {
      num: '07',
      icon: Globe,
      title: '7. International Repatriation',
      subtitle: 'Global Embassies & Consular Coordination',
      content: 'For families needing to send a loved one overseas, we manage all required international transport documentation, coordinate with foreign embassies and consulates, secure permissions, and liaise with international airlines and overseas funeral directors.',
      highlight: 'Global Repatriation Care:',
      bullets: [
        'Consular & embassy document filing',
        'Airtight Zinc liner & sealing services',
        'Customs & airport clearance protocols',
        'Coordination with receiving international funeral homes'
      ]
    },
    {
      num: '08',
      icon: Flame,
      title: '8. Burial or Cremation Disposition',
      subtitle: 'Dignified Final Committal & State Compliance',
      content: 'Once arrangements are finalized, we proceed with the chosen disposition. Burials are managed end-to-end including cemetery logistics and graveside honors. Cremations are conducted in full compliance with Minnesota law with ashes placed in your chosen urn.',
      highlight: 'Disposition Options:',
      bullets: [
        'Cemetery vault & interment service',
        'Direct cremation with witness viewing option',
        'Natural green burial & eco-grounds',
        'Scattering ceremonies & keepsake urn placement'
      ]
    },
    {
      num: '09',
      icon: Users,
      title: '9. Grief Support & Aftercare',
      subtitle: 'Continuous Bereavement & Community Care',
      content: 'Our commitment extends well beyond the day of the service. We provide ongoing grief counseling in Apple Valley and surrounding Twin Cities communities, access to peer support circles, bereavement leave guidance, and annual memorial gatherings.',
      highlight: 'Aftercare & Ongoing Support:',
      bullets: [
        'Licensed 1-on-1 grief therapist referrals',
        'Weekly & monthly bereavement support groups',
        'Milestone & anniversary check-ins',
        'Annual community healing & candle-lighting events'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> Clear & Transparent Process
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              How We Work
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              At Middleton Funeral Services, we provide a clear, supportive, and professionally guided process designed to ease emotional stress while helping families make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS TIMELINE / STEPS */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#411548]">Step-by-Step Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase mt-2">9 Steps of Professional Care</h2>
            <p className="text-gray-500 font-light text-base mt-3">From initial notification to final tribute, our team manages every detail with dignity.</p>
          </div>

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white rounded-[3rem] p-8 md:p-14 border border-gray-200 shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-10 items-start"
                >
                  {/* Step Number Badge */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-100 text-[#411548] flex items-center justify-center font-serif font-black text-2xl shadow-sm mb-3">
                      <StepIcon size={36} />
                    </div>
                    <span className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest">
                      Step {step.num}
                    </span>
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-1">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-serif font-black text-[#411548] uppercase">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed">
                      {step.content}
                    </p>

                    {step.extraText && (
                      <p className="text-gray-600 italic text-sm font-light border-l-2 border-[#411548] pl-4">
                        {step.extraText}
                      </p>
                    )}

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#411548] mb-4 flex items-center gap-2">
                        <CheckCircle2 size={16} /> {step.highlight}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-3 text-xs md:text-sm text-gray-700 font-medium">
                            <CheckCircle2 size={16} className="text-[#411548] shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards & Excellence Feature Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto">
              <img 
                src={DRIVE_IMAGES.EXCELLENCE_IN_CARE} 
                alt="Middleton Operations & Care Standards" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] mb-2 inline-block">
                Excellence In Care
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[#411548] uppercase mb-4">
                Operational Care & Dignity Standards
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-6">
                Every step of our process—from first call transfer to final committal—is governed by strict Minnesota regulatory standards and Middleton's internal protocols of dignity, privacy, and reverence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/regulatory-disclosure" className="bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                  Read Regulatory Disclosure
                </Link>
                <Link to="/faq" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                  Browse Operations FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK WITH US RIBBON */}
      <section className="py-20 bg-[#f8f5fa] border-y border-[#411548]/10 text-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-xl border border-[#411548]/10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-5 py-2 rounded-full text-[11px] font-black tracking-[0.25em] uppercase mb-4">
                <CustomIcon size={14} variant="purple" /> Collaboration & Community Partnerships
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-[#411548] tracking-tight mb-4">
                Work With Us
              </h2>
              <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                At Middleton Funeral Services, we partner closely with local clergy, healthcare organizations, florists, monument craftsmen, grief counselors, and families to deliver holistic, dignified care. Whether you want to plan a funeral with us, join our partner network, or participate in community circles, we are here for you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
              <Link
                to="/book-appointment"
                className="bg-[#411548] text-white hover:bg-[#310f36] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <CalendarHeart size={16} /> Plan a Funeral With Us
              </Link>
              <Link
                to="/sell-with-us"
                className="bg-white text-[#411548] border border-[#411548]/20 hover:bg-purple-50 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <Store size={16} /> Vendor & Partner Registration
              </Link>
              <Link
                to="/join-support-group"
                className="bg-white text-[#411548] border border-[#411548]/20 hover:bg-purple-50 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <HeartHandshake size={16} /> Community Support Circle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELEVANT CONTENT: WHY FAMILIES & PARTNERS TRUST OUR PROCESS */}
      <section className="py-24 bg-white text-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#411548] block mb-3">
              GUARANTEES & SERVICE STANDARDS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase tracking-tight mb-6">
              Why Families & Partners Trust Our Process
            </h2>
            <p className="text-gray-600 font-light text-lg leading-relaxed">
              Every stage of our 9-step arrangement protocol is built on unyielding transparency, compassionate communication, and complete compliance with federal and state regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#411548]/20 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-[#411548] text-white rounded-2xl flex items-center justify-center font-bold mb-6 shadow-md">
                <Clock size={24} />
              </div>
              <h3 className="font-serif font-black text-lg text-[#411548] uppercase mb-2">24/7 Direct Access</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Reach a licensed director at any time — day or night — with zero automated call center barriers.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#411548]/20 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-[#411548] text-white rounded-2xl flex items-center justify-center font-bold mb-6 shadow-md">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif font-black text-lg text-[#411548] uppercase mb-2">Zero Hidden Fees</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Clear, itemized pricing given upfront in full compliance with the Federal Trade Commission Funeral Rule.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#411548]/20 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-[#411548] text-white rounded-2xl flex items-center justify-center font-bold mb-6 shadow-md">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-serif font-black text-lg text-[#411548] uppercase mb-2">Multicultural Respect</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Tailored arrangements honoring every religious belief, military service, or secular preference.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#411548]/20 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-[#411548] text-white rounded-2xl flex items-center justify-center font-bold mb-6 shadow-md">
                <FileCheck2 size={24} />
              </div>
              <h3 className="font-serif font-black text-lg text-[#411548] uppercase mb-2">Administrative Care</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Complete management of death certificates, legal permits, obituary publishing, and benefit filings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Schedule Director Guidance Today
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Let our family guide yours through every step of funeral arrangements, pre-planning, or administrative filings with complete budget transparency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-appointment"
              className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg"
            >
              Book Appointment
            </Link>
            <a
              href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg flex items-center gap-2"
            >
              <MessageCircle size={14} /> WhatsApp Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
