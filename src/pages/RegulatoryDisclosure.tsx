import React from 'react';
import { motion } from 'motion/react';
import { Award, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegulatoryDisclosure() {
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
              <Building2 size={14} className="text-white" /> State & Federal Disclosures
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
              Regulatory <span className="text-white">Disclosure</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white max-w-2xl mx-auto leading-relaxed">
              Official disclosures in full compliance with the Federal Trade Commission (FTC) and Minnesota Department of Health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-20">
        <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl space-y-10 text-gray-700 leading-relaxed font-light text-lg">
          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4 flex items-center gap-3">
              <Award size={20} className="text-[#411548]" /> 1. FTC Funeral Rule Disclosure
            </h2>
            <p className="mb-4">
              The Federal Trade Commission’s Funeral Rule requires funeral establishments to provide customers with itemized price information before purchasing:
            </p>
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-3 text-base text-[#411548]">
              <p className="font-bold flex items-center gap-2">
                <CheckCircle2 size={18} /> Right of Selection
              </p>
              <p className="font-light text-gray-700">
                You have the right to select only the goods and services you desire. You may choose any itemized service or product from our General Price List, Casket Price List, Outer Burial Container Price List, Cremation Container Price List, or Urns Price List.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              2. Minnesota Board of Mortuary Science Licensing
            </h2>
            <p className="mb-4">
              Middleton Funeral Services is a licensed funeral establishment operating strictly under Minnesota Statute Chapter 149A and overseen by the Minnesota Department of Health, Mortuary Science Section.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Establishment License No: <strong>MN-FS-55124</strong></li>
              <li>Supervising Licensed Mortician: <strong>Mwansa Kamangala</strong> (License No: <strong>MN-L-88201</strong>)</li>
              <li>Facility Address: 14850 Garret Ave, Apple Valley, MN 55124</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              3. Embalming & Preparation Disclosures
            </h2>
            <p>
              Except in certain special cases, law does not require embalming. Embalming may be necessary, however, if you choose certain funeral arrangements, such as a funeral with viewing. If you do not want embalming, you usually have the right to choose an arrangement that does not require you to pay for it, such as direct cremation or immediate burial.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              4. Outer Burial Containers (Vaults)
            </h2>
            <p>
              In most areas of Minnesota, state or local law does not require that you buy a container to surround the casket in the grave. However, many cemeteries require that you have such a container so that the grave will not sink in. Either a grave liner or a burial vault will satisfy these requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
              5. Regulatory Agencies & Inquiries
            </h2>
            <p className="mb-6">
              If you have questions or regulatory inquiries regarding mortuary practices in Minnesota, you may contact the state licensing body directly:
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-base">
              <p className="font-bold text-[#411548]">Minnesota Department of Health — Mortuary Science Section</p>
              <p>P.O. Box 64882, St. Paul, MN 55164-0882</p>
              <p>Phone: (651) 201-3829 | Email: health.mortsci@state.mn.us</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-[#411548] uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:underline flex items-center gap-1">
              Privacy Policy <ChevronRight size={14} />
            </Link>
            <Link to="/terms" className="hover:underline flex items-center gap-1">
              Terms & Conditions <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
