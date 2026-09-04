import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  CalendarDays,
  Heart,
  PhoneCall
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { useModals } from '../context/ModalContext';

export default function Contact() {
  const { openCallbackModal } = useModals();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead collected:', formData);
    alert('Thank you for contacting us. Our team will reach out to you shortly.');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 24/7 EMERGENCY BANNER */}
      <div className="bg-[#411548] py-3.5 text-center border-b border-white/10 text-white shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em]">
          <ShieldAlert size={16} className="text-white animate-pulse" /> Immediate Assistance Available 24/7
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <MessageCircle size={12} className="text-white" /> Middleton Funeral Services
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Contact & Location
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Compassionate guidance, immediate assistance, and professional care available 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EMERGENCY CTA - FULL WIDTH */}
      <section className="bg-[#411548] py-12 md:py-16 text-white relative overflow-hidden shadow-2xl border-t border-white/10">
        <div className="absolute inset-0 bg-white/[0.02] pattern-grid-white/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex-1">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase block mb-3 opacity-70">Need Urgent Help?</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-4 tracking-tight leading-tight text-white">
                24/7 Immediate <span className="text-white italic font-light lowercase">Support</span>
              </h2>
              <p className="text-white/70 max-w-2xl text-base font-light leading-relaxed">
                 If you have just experienced a loss, please call us directly for immediate coordination and spiritual care. Our directors are available every hour of every day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <a href="tel:+19524862871" className="flex items-center justify-center gap-3 bg-white text-[#411548] px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-[1.03] transition-all shadow-2xl">
                <Phone size={18} /> (952) 486-2871
              </a>
              <button 
                onClick={() => openCallbackModal('24/7 Immediate Emergency Callback')}
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all"
              >
                <PhoneCall size={18} /> Request Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INFO GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* OFFICE INFO */}
            <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#411548] mb-10 group-hover:bg-[#411548] group-hover:text-white transition-all duration-500">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#411548] mb-4 font-serif uppercase tracking-tight text-[#411548]">Our Office</h3>
              <p className="text-black/60 text-lg font-light mb-10 leading-loose">
                Middleton Funeral Home<br/>
                14850 Garret Ave.<br/>
                Apple Valley MN 55124
              </p>
              <div className="flex flex-col gap-6 mt-auto">
                 <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-black/40">
                   <Clock size={20} className="text-[#411548]" />
                   <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-[#411548] group-hover:text-black transition-colors">
                    <Mail size={20} />
                    <a href="mailto:inquiries@middletonfunerals.com" className="hover:underline">inquiries@middletonfunerals.com</a>
                 </div>
              </div>
            </div>

            {/* GRIEF SUPPORT - PURPLE VARIANT */}
            <div className="bg-[#411548]/5 p-16 rounded-[4rem] border border-[#411548]/10 flex flex-col group overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-[#411548] rounded-2xl flex items-center justify-center text-white mb-10 shadow-xl group-hover:scale-110 transition-transform">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#411548] mb-4 font-serif uppercase tracking-tight text-[#411548]">Grief Support</h3>
              <p className="text-black/60 text-lg font-light mb-12 leading-relaxed">
                Connect with our dedicated specialists and community resources to find professional healing.
              </p>
              <div className="mt-auto flex flex-col gap-6">
                <Link to="/grief-support" className="flex items-center justify-between text-xs font-black tracking-widest uppercase text-[#411548] hover:gap-8 transition-all">
                  Resource Guide <ArrowRight size={14} />
                </Link>
                <Link to="/join-support-group" className="flex items-center justify-between text-xs font-black tracking-widest uppercase text-[#411548] hover:gap-8 transition-all">
                   Join Support Group <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & BOOKING */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
             <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase tracking-tight mb-6">Send Us A Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-black/50 uppercase tracking-[0.25em] mb-2">Your Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-0 focus:border-[#411548] focus:bg-white transition-all text-sm font-medium shadow-sm outline-none"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-black/50 uppercase tracking-[0.25em] mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-0 focus:border-[#411548] focus:bg-white transition-all text-sm font-medium shadow-sm outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-black/50 uppercase tracking-[0.25em] mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-0 focus:border-[#411548] focus:bg-white transition-all text-sm font-medium shadow-sm outline-none"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-black/50 uppercase tracking-[0.25em] mb-2">Inquiry Type</label>
                      <select 
                        value={formData.serviceType}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-0 focus:border-[#411548] focus:bg-white transition-all text-sm font-medium appearance-none text-black cursor-pointer shadow-sm outline-none"
                      >
                        <option value="">General Inquiry</option>
                        <option value="funeral">Funeral Services</option>
                        <option value="cremation">Cremation Services</option>
                        <option value="preplanning">Pre-Planning Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black/50 uppercase tracking-[0.25em] mb-2">Your Message</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 focus:ring-0 focus:border-[#411548] focus:bg-white transition-all text-sm font-medium shadow-sm outline-none"
                      placeholder="How can our community help you today?"
                    ></textarea>
                  </div>

                  {/* Consent declaration */}
                  <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      required
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#411548] focus:ring-[#411548] cursor-pointer shrink-0"
                    />
                    <label htmlFor="contact-consent" className="text-xs text-gray-600 font-light leading-relaxed cursor-pointer">
                      I consent to Middleton Funeral Services storing my submitted information to answer my inquiry in accordance with the <Link to="/privacy-policy" className="underline text-[#411548] font-bold">Privacy Policy</Link>.
                    </label>
                  </div>

                  <button className="w-full md:w-auto bg-[#411548] text-white px-10 py-4 rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-black transition-all shadow-xl">
                    Submit Inquiry
                  </button>
                </form>
             </div>

             <div className="lg:w-[400px]">
                <div className="bg-white border-2 border-gray-50 rounded-[2.5rem] p-10 shadow-sm">
                   <h3 className="text-xl font-bold text-[#411548] mb-6 font-serif uppercase tracking-tight">Quick Support</h3>
                   <div className="space-y-8">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                           <MessageCircle size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1 uppercase tracking-tight">WhatsApp</p>
                          <p className="text-xs text-gray-500 font-light mb-3 italic">Direct messaging with our directors.</p>
                          <a 
                            href="https://wa.me/19524862871" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase tracking-widest text-[#411548] hover:underline inline-flex items-center gap-1"
                          >
                            Start WhatsApp Chat <ArrowRight size={12} />
                          </a>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                           <CalendarDays size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1 uppercase tracking-tight">Schedule Consultation</p>
                          <p className="text-xs text-gray-500 font-light mb-3">Book an in-person or virtual meeting.</p>
                          <Link 
                            to="/book-appointment" 
                            className="text-[10px] font-bold uppercase tracking-widest text-[#411548] hover:underline inline-flex items-center gap-1"
                          >
                            Pick a Date <ArrowRight size={12} />
                          </Link>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                           <HelpCircle size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1 uppercase tracking-tight">How We Work</p>
                          <p className="text-xs text-gray-500 font-light mb-3">5-step care roadmap and process.</p>
                          <Link 
                            to="/how-we-work" 
                            className="text-[10px] font-bold uppercase tracking-widest text-[#411548] hover:underline inline-flex items-center gap-1"
                          >
                            Explore Process <ArrowRight size={12} />
                          </Link>
                        </div>
                     </div>
                     <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#411548] shrink-0">
                           <PhoneCall size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1 uppercase tracking-tight">Request Callback</p>
                          <p className="text-xs text-gray-500 font-light mb-3">Pick your preferred call time.</p>
                          <button 
                            onClick={() => openCallbackModal('Quick Support Callback Request')}
                            className="text-[10px] font-bold uppercase tracking-widest text-[#411548] hover:underline inline-flex items-center gap-1"
                          >
                            Request Call Back <ArrowRight size={12} />
                          </button>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="h-[500px] w-full bg-gray-100 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
            <div className="text-center">
               <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Apple Valley, MN Location Map</p>
            </div>
        </div>
        <div className="absolute top-10 left-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-sm hidden md:block">
           <h3 className="font-bold text-[#411548] mb-2 uppercase tracking-tight">Directions & Parking</h3>
           <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">
              We provide ample complimentary parking at our main entrance at 14850 Garret Ave, Apple Valley, MN 55124.
           </p>
           <a 
            href="https://maps.google.com/?q=14850+Garret+Ave,+Apple+Valley,+MN+55124"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#411548] flex items-center gap-2 hover:gap-3 transition-all"
           >
             Get Directions <ArrowRight size={14} />
           </a>
        </div>
      </section>

      {/* LOGO SYMBOL */}
      <div className="py-20 flex justify-center opacity-10">
         <CustomIcon size={80} />
      </div>
    </div>
  );
}
