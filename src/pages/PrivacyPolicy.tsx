import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-28 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border border-white/20 text-white">
              <ShieldCheck size={14} className="text-white" /> Legal & Privacy Notice
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Privacy <span className="text-white">Policy</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white max-w-2xl mx-auto leading-relaxed">
              How Middleton Funeral Services collects, protects, and respects your family's personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-20">
        <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl space-y-10 text-gray-700 leading-relaxed font-light text-lg">
          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4 flex items-center gap-3">
              <Lock size={20} className="text-[#411548]" /> 1. Commitment to Privacy
            </h2>
            <p>
              At Middleton Funeral Services, we understand the sensitive nature of the information shared with us during times of loss or pre-planning. We are committed to protecting your privacy and treating your family's data with utmost dignity, confidentiality, and security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when making funeral arrangements, requesting pre-planning guides, submitting obituaries, or subscribing to grief support resources:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details (Name, email address, phone number, mailing address).</li>
              <li>Vital statistics and family history required for official Death Certificate filings.</li>
              <li>Payment details for services, flowers, or memorial merchandise.</li>
              <li>Tribute messages, memorial guestbook entries, and obituary submissions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">
              Your information is used strictly to fulfill professional funeral coordination and memorial services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Filing required legal permits, death certificates, and state regulatory documents in Minnesota.</li>
              <li>Coordinating with cemeteries, crematories, clergy, and florists on your behalf.</li>
              <li>Publishing obituaries and memorial details as directed by the primary family contact.</li>
              <li>Sending requested grief support resources, planning guides, or service updates.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              4. Information Sharing & Third Parties
            </h2>
            <p>
              We do <strong>never sell, trade, or rent</strong> your personal information to third-party marketers. Information is shared only with verified partners (such as county registrars, official florists, or medical examiners) strictly necessary to carry out requested funeral and burial services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              5. Data Security & Storage
            </h2>
            <p>
              We employ industry-standard encryption, secure server architecture, and strict access controls to protect your data from unauthorized access, alteration, or disclosure. Physical records are retained in locked, compliance-verified archives according to Minnesota Board of Mortuary Science standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              6. Contact Our Privacy Officer
            </h2>
            <p className="mb-6">
              If you have any questions regarding this policy or wish to request data deletion, please reach out to our team:
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-base">
              <p className="font-bold text-[#411548]">Middleton Funeral Services — Privacy Office</p>
              <p>24173 Williams Rd, Rogers, MN 55374</p>
              <p>Email: <a href="mailto:info@middletonfunerals.com" className="underline font-semibold text-[#411548]">info@middletonfunerals.com</a></p>
              <p>Phone: <a href="tel:9524862871" className="underline font-semibold text-[#411548]">952 486-2871</a></p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-[#411548] uppercase tracking-wider">
            <Link to="/terms" className="hover:underline flex items-center gap-1">
              Terms & Conditions <ChevronRight size={14} />
            </Link>
            <Link to="/regulatory-disclosure" className="hover:underline flex items-center gap-1">
              Regulatory Disclosure <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
