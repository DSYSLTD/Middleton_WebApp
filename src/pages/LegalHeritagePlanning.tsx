import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Scale, Landmark, Lock, CheckCircle2, Calendar, PhoneCall, ChevronDown, ChevronUp, ArrowRight, Sun, Award, Clock } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';

export default function LegalHeritagePlanning() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pillars = [
    {
      title: "Estate Finalization & Probate Guidance",
      icon: <Scale size={28} className="text-[#411548]" />,
      desc: "Navigating the complexities of estate settlement with clarity and care. We assist families with inventorying estate assets, understanding Minnesota probate filing requirements, and connecting with licensed estate attorneys.",
      features: [
        "Inventory of Estate & Memorial Assets",
        "Probate Court Document Preparation Support",
        "Minnesota District Court Filing Navigation",
        "Executor & Trustee Administrative Aid"
      ]
    },
    {
      title: "Minnesota Legal Compliance & Statutory Filings",
      icon: <Landmark size={28} className="text-[#411548]" />,
      desc: "Ensuring all state, county, and local legal obligations are met accurately and promptly. From official Minnesota death certificates to required legal notices and statutory notifications.",
      features: [
        "Certified Copy Death Certificate Ordering (MN DHS)",
        "Social Security Administration (SSA) Death Notification",
        "Statutory Public & Newspaper Notice Placement",
        "County Registrar & Public Record Updates"
      ]
    },
    {
      title: "Secure Document Archiving & Heritage Vault",
      icon: <Lock size={28} className="text-[#411548]" />,
      desc: "Safeguarding critical family documents for future generations. Our encrypted digital vault holds vital records, military discharge forms, property deeds, and family legacy instructions.",
      features: [
        "Military DD-214 & Veteran Benefit Verification",
        "Life Insurance Policy Claims Acceleration",
        "Encrypted Digital Document Repository",
        "Family Heritage & Legacy Instruction Preservation"
      ]
    },
    {
      title: "Beneficiary & Financial Coordination",
      icon: <ShieldCheck size={28} className="text-[#411548]" />,
      desc: "Easing the administrative burden by coordinating directly with financial institutions, pension providers, and life insurance carriers to streamline beneficiary payout processes.",
      features: [
        "Life Insurance & Policy Claim Filing",
        "Pension & Retirement Benefit Notifications",
        "Real Estate Deed & Title Transfer Guidance",
        "Bank Account & Asset Transition Support"
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Legal & Document Review",
      desc: "We review existing wills, healthcare directives, and military discharge forms to construct a personalized legal action plan."
    },
    {
      step: "02",
      title: "Certified Record Procurement",
      desc: "Our team expedites certified Minnesota death certificates and submits mandatory federal notifications to Social Security and VA offices."
    },
    {
      step: "03",
      title: "Probate & Estate Alignment",
      desc: "We organize all required estate inventories, asset listings, and creditor notification forms ready for probate submission."
    },
    {
      step: "04",
      title: "Heritage Archiving & Transfer",
      desc: "All legal records, policy payouts, and family heritage instructions are securely archived and transferred to designated executors."
    }
  ];

  const faqs = [
    {
      q: "What is the difference between probate and estate administration in Minnesota?",
      a: "Probate is the court-supervised legal process of validating a will, identifying assets, paying valid debts, and distributing remaining property. Estate administration encompasses all financial, legal, and operational steps required to finalize a deceased person's affairs, whether court probate is necessary or not.",
      ctaText: "Schedule Legal Consultation",
      ctaLink: "/book-appointment"
    },
    {
      q: "How many certified death certificates will our family need?",
      a: "Most families need between 5 to 10 certified copies for financial institutions, real estate transfers, life insurance claims, vehicle title transfers, and retirement accounts. Our team handles the ordering process directly through the Minnesota Department of Health.",
      ctaText: "Request Administrative Support",
      ctaLink: "/services/legal-assistance"
    },
    {
      q: "Can Middleton Funeral Services assist with Veteran DD-214 military discharge forms?",
      a: "Yes. We directly assist families in retrieving official DD-214 discharge records from the National Archives to secure military honors, VA burial benefits, and honorable burial flags at state or national veterans cemeteries.",
      ctaText: "Request Veterans Honors Support",
      ctaLink: "/services/specialized-services"
    },
    {
      q: "How does the Heritage Vault protect our family's confidential documents?",
      a: "Our Heritage Vault uses 256-bit bank-grade encryption to store digital copies of legal documents, family histories, and policy records, accessible only by verified family members and designated legal representatives.",
      ctaText: "Access Heritage Vault Security",
      ctaLink: "/contact"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-20 lg:py-28 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <ShieldCheck size={14} className="text-white" /> Administrative & Legal Excellence
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white">
              Legal Heritage <span className="text-white">Planning</span>
            </h1>
            <p className="text-white/80 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Securing legacies, streamlining estate transitions, and fulfilling Minnesota legal compliance with complete dignity, transparency, and expert care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-24 bg-[#fcfcfc]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-3">
              <span className="w-12 h-[2px] bg-[#411548]"></span> COMPREHENSIVE LEGAL ARCHITECTURE <span className="w-12 h-[2px] bg-[#411548]"></span>
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#411548] uppercase font-black tracking-tight text-center max-w-3xl mx-auto">
              Safeguarding Your Family's <span className="text-black">Legal & Estate Heritage</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:bg-[#411548] group-hover:text-white transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#411548] uppercase mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed mb-8">{pillar.desc}</p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#411548] mb-4">Core Deliverables:</h4>
                  <ul className="space-y-3">
                    {pillar.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs font-semibold text-gray-800 uppercase tracking-tight">
                        <CheckCircle2 size={14} className="text-[#411548] shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guidance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-3">
              <Clock size={14} /> STREAMLINED EXECUTION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#411548] uppercase font-black tracking-tight">
              Four Steps to <span className="text-black">Legal Peace of Mind</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((s, idx) => (
              <div key={idx} className="bg-purple-50/50 p-8 rounded-[2rem] border border-purple-100 relative flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-serif font-black text-[#411548] block mb-4">{s.step}</span>
                  <h3 className="text-xl font-serif font-bold text-gray-900 uppercase mb-3">{s.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#411548] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl uppercase font-black tracking-tight mb-6 text-white">
            Need Guidance With <span className="text-white">Minnesota Probate or Estate Paperwork?</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Our estate support specialists are ready to help you navigate legal paperwork, death certificates, and inheritance planning with clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment?service=Legal%20%26%20Administrative%20Support"
              className="bg-white text-[#411548] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar size={14} /> Schedule Free Legal Consultation
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall size={14} /> Contact Legal Support
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#fcfcfc]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-3 block">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#411548] uppercase font-black tracking-tight">
              Legal Heritage <span className="text-black">Planning FAQs</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-serif font-bold text-gray-900 flex justify-between items-center text-lg hover:text-[#411548] transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} className="text-[#411548] shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 text-sm font-light leading-relaxed border-t border-gray-50 pt-4 space-y-4">
                    <p>{faq.a}</p>
                    <div>
                      <Link
                        to={faq.ctaLink}
                        className="inline-flex items-center gap-2 bg-[#411548] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md"
                      >
                        <span>{faq.ctaText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
