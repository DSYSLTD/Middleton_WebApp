import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import LeadMagnetsSection from '../components/LeadMagnetsSection';
import { 
  BookOpen, 
  FileText, 
  Heart, 
  MessageCircle, 
  Calendar, 
  Download, 
  ShieldCheck, 
  HeartHandshake,
  Users
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { useModals } from '../context/ModalContext';

export default function Resources() {
  const { openDownloadModal } = useModals();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#resource-row-2') {
      const timer = setTimeout(() => {
        const el = document.getElementById('resource-row-2');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const additionalResources = [
    {
      title: 'Funeral Planning Checklist',
      desc: 'Complete 25-point organizer covering immediate steps, legal documents, ceremony options, and family notifications.',
      serviceParam: 'Funeral & Burial Planning',
      filename: 'middleton-funeral-planning-checklist.txt',
      content: 'MIDDLETON FUNERAL SERVICES - FUNERAL PLANNING CHECKLIST\n\n1. Immediate steps after loss\n2. Ceremony & Service options\n3. Legal paperwork & certificates\n4. Memorial details'
    },
    {
      title: 'Spiritual Care & Memory Guide',
      desc: 'Inter-faith funeral protocols, clergy coordination guidelines, prayers, and memorial readings.',
      serviceParam: 'Funeral & Burial Planning',
      filename: 'middleton-spiritual-care-guide.txt',
      content: 'MIDDLETON FUNERAL SERVICES - SPIRITUAL CARE & MEMORY GUIDE\n\nInter-faith guidelines, clergy contacts, and scripture selections.'
    },
    {
      title: 'Pre-Planning & Advance Care Guide',
      desc: 'Learn how advance arrangements lock in transparent rates, spare loved ones stress, and protect your legacy.',
      serviceParam: 'Pre-Planning Consultation',
      filename: 'middleton-preplanning-guide.txt',
      content: 'MIDDLETON FUNERAL SERVICES - PRE-PLANNING & ADVANCE CARE GUIDE\n\nStep-by-step roadmap for locking in preferences and funding options.'
    },
    {
      title: 'Bereavement Care & Grief Roadmap',
      desc: 'Navigating loss, understanding stages of grief, family coping strategies, and local Minnesota counselor directory.',
      serviceParam: 'Professional Grief Counselling',
      filename: 'middleton-bereavement-roadmap.txt',
      content: 'MIDDLETON FUNERAL SERVICES - BEREAVEMENT CARE ROADMAP\n\nCompassionate coping strategies and 24/7 grief helpline directory.'
    },
    {
      title: 'Cremation & Urn Selection Guide',
      desc: 'Detailed overview of direct cremation options, ceremonial viewings, memorial urns, and scattering grounds.',
      serviceParam: 'Cremation Consultation',
      filename: 'middleton-cremation-guide.txt',
      content: 'MIDDLETON FUNERAL SERVICES - CREMATION & MEMORIAL GUIDE\n\nItemized cremation choices, urn selection, and Minnesota state laws.'
    },
    {
      title: 'Legal & Administrative Paperwork Guide',
      desc: 'Step-by-step guidance on death certificates, probate filings, veterans benefits, and life insurance claims.',
      serviceParam: 'Legal & Administrative Support',
      filename: 'middleton-legal-administrative-guide.txt',
      content: 'MIDDLETON FUNERAL SERVICES - LEGAL & ADMINISTRATIVE GUIDE\n\nDetailed instructions for managing official end-of-life paperwork in Minnesota.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Hero Section - Brand Purple */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <BookOpen size={12} className="text-white" /> Educational Resources & Guides
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Free Educational Downloads & Resources
            </h1>
            <p className="text-white text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Access our comprehensive library of planning guides, grief support roadmaps, legal checklists, and educational publications designed to help you and your family.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/book-appointment?service=${encodeURIComponent('Pre-Planning Consultation')}`}
                className="inline-flex items-center gap-2 bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer"
              >
                <Calendar size={14} /> Schedule Consultation
              </Link>
              <a
                href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20resources%20and%20guides."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all shadow-lg cursor-pointer"
              >
                <MessageCircle size={14} /> WhatsApp Us Directly
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Educational Downloads Component */}
      <LeadMagnetsSection />

      {/* Comprehensive Downloadable Resources Library */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-4 shadow-sm">
              <CustomIcon size={16} /> Complete Resource Collection
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[#411548] uppercase tracking-tight mb-4">
              Downloadable <span className="text-black">Care Guides</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Download any of our free educational PDFs, planning workbooks, and grief support guides directly below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalResources.map((res, idx) => (
              <div
                key={idx}
                id={idx === 3 ? "resource-row-2" : undefined}
                className="bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group scroll-mt-28"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#411548] flex items-center justify-center font-bold mb-6 group-hover:bg-[#411548] group-hover:text-white transition-all">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-3">{res.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">{res.desc}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openDownloadModal({
                      title: res.title,
                      filename: res.filename,
                      contentGenerator: () => res.content
                    })}
                    className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    Download PDF Guide <Download size={14} />
                  </button>

                  <a
                    href={`https://wa.me/19524862871?text=${encodeURIComponent(`Hello Middleton Funeral Services, I have a question regarding the ${res.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    WhatsApp Us Directly <MessageCircle size={14} />
                  </a>

                  <Link
                    to={`/book-appointment?service=${encodeURIComponent(res.serviceParam)}`}
                    className="w-full bg-gray-100 text-[#411548] py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Schedule Consultation <Calendar size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immediate Support Pre-Footer */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Have Questions About Our Guides?
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Our directors are available 24/7 to answer questions, send printed copies, or schedule a personal consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to={`/book-appointment?service=${encodeURIComponent('General Information Meeting')}`}
              className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer"
            >
              Schedule Appointment
            </Link>
            <a
              href="https://wa.me/19524862871?text=Hello%20Middleton%20Funeral%20Services%2C%20I%20would%20like%20to%20request%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={14} /> WhatsApp Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
