import React from 'react';
import { motion } from 'motion/react';
import { FileText, Shield, Scale, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
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
              <Scale size={14} className="text-white" /> Service Agreement
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Terms & <span className="text-white">Conditions</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white max-w-2xl mx-auto leading-relaxed">
              General guidelines, standard arrangements, and operational terms governing Middleton Funeral Services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-20">
        <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl space-y-10 text-gray-700 leading-relaxed font-light text-lg">
          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4 flex items-center gap-3">
              <FileText size={20} className="text-[#411548]" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website or utilizing the funeral, cremation, pre-planning, or marketplace services of Middleton Funeral Services, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              2. Professional Funeral Services & GPL Compliance
            </h2>
            <p className="mb-4">
              All funeral goods and services offered by Middleton Funeral Services comply strictly with the Federal Trade Commission (FTC) Funeral Rule and Minnesota Statute Chapter 149A:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our General Price List (GPL) is available for inspection prior to any purchasing decision.</li>
              <li>Families retain the right to select individual goods and services without mandatory item bundling.</li>
              <li>A written Statement of Funeral Goods and Services Selected will be provided for final sign-off before arrangements commence.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              3. Authorizations & Legal Representation
            </h2>
            <p>
              The individual signing arrangement forms or submitting online pre-planning instructions certifies that they hold legal authority under Minnesota law (such as Next of Kin or Designated Healthcare Agent) to make final disposition arrangements for the deceased.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              4. Payment & Financial Terms
            </h2>
            <p className="mb-4">
              Payment terms for contracted services are outlined in the signed Statement of Funeral Goods and Services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full payment or verified insurance assignment is due prior to final interment or cremation.</li>
              <li>We accept credit cards, certified checks, verified life insurance policy assignments, and pre-need trust funds.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              5. Intellectual Property & Website Content
            </h2>
            <p>
              All text, memorial photography, and branding assets published on this website are protected intellectual property of Middleton Funeral Services. Reproduction without prior written authorization is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              6. Governing Law
            </h2>
            <p>
              These Terms and Conditions are governed by the laws of the State of Minnesota. Any disputes shall be resolved within the jurisdiction of Hennepin/Wright County courts.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-[#411548] uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:underline flex items-center gap-1">
              Privacy Policy <ChevronRight size={14} />
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
