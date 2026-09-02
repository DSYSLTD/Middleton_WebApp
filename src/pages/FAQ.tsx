import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  PhoneCall, 
  Calendar, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  MessageCircle,
  FileText,
  Flower2,
  PenTool,
  Scale,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  ctaText: string;
  ctaLink: string;
  isExternal?: boolean;
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('fp-1');
  const [currentPage, setCurrentPage] = useState(1);
  const FAQ_ITEMS_PER_PAGE = 3;

  // Actual category names for tabs
  const categoryTabs = [
    'All',
    'Funeral Planning',
    'Burial Cremation',
    'Grief Support',
    'Pre-Planning',
    'Funeral products',
    'Minnesota Guidance'
  ];

  const faqs: FAQItem[] = [
    // Funeral Planning
    {
      id: 'fp-1',
      category: 'Funeral Planning',
      question: 'What should I do immediately when a death occurs?',
      answer: 'First, call our 24/7 immediate assistance line at 952 486-2871. Our licensed funeral directors will immediately guide you through bringing your loved one into our care, notify necessary state authorities, and schedule a convenient arrangement meeting.',
      ctaText: 'Call Immediate Assistance: 952 486-2871',
      ctaLink: 'tel:9524862871',
      isExternal: true
    },
    {
      id: 'fp-2',
      category: 'Funeral Planning',
      question: 'What is the difference between a traditional funeral and a graveside service?',
      answer: 'A traditional funeral includes a visitation or viewing followed by a formal service at our chapel, a church, or a designated venue prior to burial. A graveside service takes place directly at the cemetery lot where family and friends gather for final committal honors.',
      ctaText: 'Book Funeral Planning Consultation',
      ctaLink: '/book-appointment'
    },
    {
      id: 'fp-3',
      category: 'Funeral Planning',
      question: 'Can we customize the funeral ceremony to reflect our loved one’s unique life and culture?',
      answer: 'Absolutely. We specialize in custom tributes—including memory displays, live musical performances, custom video slideshows, personalized stationery, military honors, and cultural rituals.',
      ctaText: 'Explore Funeral Services',
      ctaLink: '/services'
    },

    // Burial Cremation
    {
      id: 'bc-1',
      category: 'Burial Cremation',
      question: 'Is a viewing or visitation possible before cremation takes place?',
      answer: 'Yes. Many families choose a traditional visitation or family viewing with a ceremonial rental casket prior to the cremation process, providing closure and a comforting farewell for friends and relatives.',
      ctaText: 'View Cremation Packages',
      ctaLink: '/services/cremation'
    },
    {
      id: 'bc-2',
      category: 'Burial Cremation',
      question: 'What happens to cremated remains after the cremation process?',
      answer: 'Cremated remains can be placed in a keepsake urn, buried in a cemetery plot, enshrined in a columbarium niche, scattered in meaningful permitted locations, or transformed into memorial jewelry.',
      ctaText: 'Browse Urns & Memorial Keepsakes',
      ctaLink: '/shop'
    },
    {
      id: 'bc-3',
      category: 'Burial Cremation',
      question: 'What are the environmental standards for natural green burials in Minnesota?',
      answer: 'Green burials forego chemical embalming and metal caskets, using biodegradable woven shrouds or solid pine caskets in designated Minnesota natural prairie conservation grounds.',
      ctaText: 'Compare Burial & Cremation Options',
      ctaLink: '/burial-comparison'
    },

    // Grief Support
    {
      id: 'gs-1',
      category: 'Grief Support',
      question: 'What grief support and aftercare resources do you provide for grieving families?',
      answer: 'We provide complimentary access to peer grief support groups, 1-on-1 counseling with certified grief counselors, educational bereavement literature, and annual remembrance gatherings.',
      ctaText: 'Join A Support Group Circle',
      ctaLink: '/join-support-group'
    },
    {
      id: 'gs-2',
      category: 'Grief Support',
      question: 'How can I support a grieving friend or family member from afar?',
      answer: 'You can order fresh sympathy floral arrangements, send care packages, or post heartfelt messages and memories on their loved one’s permanent online obituary memorial page.',
      ctaText: 'Send Sympathy Flowers & Gifts',
      ctaLink: '/flowers'
    },
    {
      id: 'gs-3',
      category: 'Grief Support',
      question: 'How do I speak directly with your Certified Grief Counselor?',
      answer: 'Co-founder Elsie Middleton Kamangala is a Certified Grief Counselor who provides empathetic guidance and structured grief counseling sessions for individuals and families.',
      ctaText: 'Schedule Grief Counseling Session',
      ctaLink: '/team/elsie'
    },

    // Pre-Planning
    {
      id: 'pp-1',
      category: 'Pre-Planning',
      question: 'Why should I pre-plan my funeral services in advance?',
      answer: 'Pre-planning guarantees your personal preferences are documented, spares your children from sudden emotional decision-making, and locks in current service costs against future inflation.',
      ctaText: 'Start Smart Pre-Planning Form',
      ctaLink: '/pre-planning'
    },
    {
      id: 'pp-2',
      category: 'Pre-Planning',
      question: 'Are my pre-funded funeral trust funds legally secure?',
      answer: 'Yes. In strict compliance with Minnesota state statutes, 100% of pre-funded dollars are deposited into state-regulated, FDIC-insured funeral trust accounts or specialized insurance policies.',
      ctaText: 'Review Pre-Planning Security Safeguards',
      ctaLink: '/regulatory-disclosure'
    },
    {
      id: 'pp-3',
      category: 'Pre-Planning',
      question: 'Can I transfer an existing pre-planned funeral agreement to Middleton Funeral Services?',
      answer: 'Yes. Minnesota state law protects consumer portability—you can transfer any existing pre-need arrangement from another funeral home to Middleton Funeral Services seamlessly.',
      ctaText: 'Request Pre-Plan Transfer Assistance',
      ctaLink: '/contact'
    },

    // Minnesota Guidance
    {
      id: 'mg-1',
      category: 'Minnesota Guidance',
      question: 'What legal death disclosures and consumer rights exist in Minnesota?',
      answer: 'Under Minnesota Law and FTC Rules, families have the right to receive itemized General Price Lists, supply third-party caskets without penalty fees, and receive transparent disclosures at all times.',
      ctaText: 'View MN Regulatory Disclosures',
      ctaLink: '/regulatory-disclosure'
    },
    {
      id: 'mg-2',
      category: 'Minnesota Guidance',
      question: 'Is embalming legally required by Minnesota state law?',
      answer: 'No. Embalming is not legally mandated in Minnesota if burial or cremation occurs within 72 hours of death, or if proper refrigeration facilities are utilized.',
      ctaText: 'Speak With A Director',
      ctaLink: '/contact'
    },
    {
      id: 'mg-3',
      category: 'Minnesota Guidance',
      question: 'How do veterans military funeral honors work in Minnesota cemeteries?',
      answer: 'Eligible United States veterans receive folded flag presentations, Taps bugle honors, and government burial plot benefits at Fort Snelling or Minnesota state veterans cemeteries.',
      ctaText: 'Verify Veteran Military Honors',
      ctaLink: '/contact'
    },

    // Funeral products
    {
      id: 'mr-1',
      category: 'Funeral products',
      question: 'How do I submit an obituary for publication on your website?',
      answer: 'You can easily draft and submit an obituary through our online Submit Obituary portal. Upload photos, write personal life stories, and publish announcements instantly.',
      ctaText: 'Submit An Obituary Announcement',
      ctaLink: '/submit-obituary'
    },
    {
      id: 'mr-2',
      category: 'Funeral products',
      question: 'How can out-of-town guests attend funeral services virtually?',
      answer: 'We provide private or public high-definition service livestreams, online tribute guestbooks, and downloadable digital memorial keepsakes accessible from any device worldwide.',
      ctaText: 'View Current Obituaries & Services',
      ctaLink: '/obituaries'
    },
    {
      id: 'mr-3',
      category: 'Funeral products',
      question: 'Where can I find sympathy gifts, flowers, and memorial keepsakes?',
      answer: 'Explore our online sympathy marketplace to order fresh floral tributes, memorial trees, sympathy gift baskets, and custom keepsake jewelry.',
      ctaText: 'Shop Sympathy Marketplace',
      ctaLink: '/shop'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = activeTab === 'All' || faq.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const totalPages = Math.ceil(filteredFaqs.length / FAQ_ITEMS_PER_PAGE) || 1;
  const currentFaqs = filteredFaqs.slice(
    (currentPage - 1) * FAQ_ITEMS_PER_PAGE,
    currentPage * FAQ_ITEMS_PER_PAGE
  );

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header Section */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <HelpCircle size={12} className="text-white" /> Middleton Knowledge Center
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Find clear, compassionate answers and direct action steps for funeral planning, cremation options, pre-planning, grief support, Minnesota guidance, and memorial resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Search & Category Filter Tabs Bar */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search questions or topics (e.g. immediate need, pre-planning, legal rights, grief)..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#411548] text-sm font-medium"
              />
            </div>

            {/* Actual Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full justify-between">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    activeTab === cat 
                      ? 'bg-[#411548] text-white shadow-md scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Layout (Clean Accordion & Direct Director Assistance Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FAQ Accordion Column (8 Columns) */}
            <div className="lg:col-span-8 space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
                  <HelpCircle size={40} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">No matching questions found</h3>
                  <p className="text-sm text-gray-500 mb-6">Try adjusting your search query or select another category tab above.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveTab('All'); setCurrentPage(1); }}
                    className="bg-[#411548] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  {currentFaqs.map((faq) => {
                    const isOpen = expandedId === faq.id;
                    return (
                      <div 
                        key={faq.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-purple-50/20 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#411548] bg-purple-100/60 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                              {faq.category}
                            </span>
                            <h3 className="font-serif text-base md:text-lg font-bold text-gray-900 leading-snug">
                              {faq.question}
                            </h3>
                          </div>
                          <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[#411548] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#411548] text-white' : ''}`}>
                            <ChevronDown size={18} />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="p-6 pt-0 border-t border-gray-100 text-sm text-gray-600 leading-relaxed font-light mt-4 space-y-4">
                                <p>{faq.answer}</p>

                                {/* Relevant CTA Button embedded inside collapsible section */}
                                <div className="pt-2">
                                  {faq.isExternal ? (
                                    <a
                                      href={faq.ctaLink}
                                      className="inline-flex items-center gap-2 bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md"
                                    >
                                      <span>{faq.ctaText}</span>
                                      <ArrowRight size={14} />
                                    </a>
                                  ) : (
                                    <Link
                                      to={faq.ctaLink}
                                      className="inline-flex items-center gap-2 bg-[#411548] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md"
                                    >
                                      <span>{faq.ctaText}</span>
                                      <ArrowRight size={14} />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Pagination Controls for FAQ pages */}
                  {totalPages > 1 && (
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/80">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Page {currentPage} of {totalPages} ({filteredFaqs.length} total questions)
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wider bg-white text-[#411548] hover:bg-[#411548] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#411548] transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft size={14} /> Prev
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-full text-xs font-black transition-all cursor-pointer ${
                              currentPage === page
                                ? 'bg-[#411548] text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wider bg-white text-[#411548] hover:bg-[#411548] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#411548] transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Next <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Direct Assistance Sidebar Column (4 Columns) - Text-based clean design without image */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Direct Director Support Card */}
              <div className="bg-[#411548] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <CustomIcon size={32} variant="white" className="mb-4" />
                <h3 className="font-serif text-2xl font-black uppercase mb-3 text-white">
                  Need Immediate Guidance?
                </h3>
                <p className="text-xs font-light text-white/80 leading-relaxed mb-6">
                  Our licensed funeral directors are on call 24 hours a day to answer questions, explain pricing, or assist with immediate care.
                </p>

                <div className="space-y-3">
                  <a 
                    href="tel:9524862871"
                    className="w-full bg-white text-[#411548] hover:bg-black hover:text-white py-3.5 px-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <PhoneCall size={14} /> Call 952.486.2871
                  </a>

                  <Link 
                    to="/book-appointment"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar size={14} /> Book Consultation
                  </Link>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#411548] pb-2 border-b border-gray-100">
                  Quick Care Shortcuts
                </h4>

                <Link
                  to="/join-support-group"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/50 hover:bg-purple-100/60 transition-colors text-xs font-bold text-[#411548]"
                >
                  <span className="flex items-center gap-2">
                    <HeartHandshake size={16} /> Grief Support Circles
                  </span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/submit-obituary"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/50 hover:bg-purple-100/60 transition-colors text-xs font-bold text-[#411548]"
                >
                  <span className="flex items-center gap-2">
                    <PenTool size={16} /> Submit Obituary
                  </span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/regulatory-disclosure"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/50 hover:bg-purple-100/60 transition-colors text-xs font-bold text-[#411548]"
                >
                  <span className="flex items-center gap-2">
                    <Scale size={16} /> Minnesota Laws & Rights
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Pre-Footer CTA Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Still Have Questions? We Are Available 24/7
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Reach out directly to our experienced team for personalized advice and immediate support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Contact Funeral Home
            </Link>
            <Link to="/book-appointment" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
