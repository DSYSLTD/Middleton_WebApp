import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Search, ChevronDown, Calendar, MapPin, ArrowRight } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { ObituaryCardSkeleton } from '../components/Skeleton';
import { DRIVE_IMAGES } from '../utils/driveImages';
import { OBITUARIES_DATA } from '../data/obituariesData';

export default function Obituaries() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bornDate, setBornDate] = useState('');
  const [diedDate, setDiedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    keyword: true,
    category: true,
    location: true,
    bornDate: true,
    diedDate: true
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLocations, selectedCategories, bornDate, diedDate, viewMode]);

  useEffect(() => {
    const qParam = searchParams.get('q');
    const locParam = searchParams.get('location');
    const catParam = searchParams.get('category');
    const yearParam = searchParams.get('year');
    
    if (qParam) setSearchQuery(qParam);
    if (locParam) setSelectedLocations([locParam]);
    if (catParam) setSelectedCategories([catParam]);
    if (yearParam) setDiedDate(`${yearParam}-12-31`); // Simple mapping for the demo
  }, [searchParams]);

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const obituaries = OBITUARIES_DATA;

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredObituaries = obituaries.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         person.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(loc => person.location.toLowerCase().includes(loc.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || (person.category && selectedCategories.some(cat => person.category?.toLowerCase() === cat.toLowerCase()));
    
    // Simple date filtering (expecting person.dates like 'DD/MM/YYYY - DD/MM/YYYY')
    const datesArr = person.dates.split(' - ');
    const pBorn = datesArr[0].split('/').reverse().join('-'); // YYYY-MM-DD
    const pDied = datesArr[1].split('/').reverse().join('-'); // YYYY-MM-DD

    const matchesBorn = !bornDate || pBorn >= bornDate;
    const matchesDied = !diedDate || pDied <= diedDate;

    return matchesSearch && matchesLocation && matchesCategory && matchesBorn && matchesDied;
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> Middleton Memorials
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Recent Obituaries
            </h1>
            <p className="text-white text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Celebrating the legacies, storytelling, and memories of cherished lives.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <div className="w-full md:w-[280px] shrink-0 font-sans">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#411548] text-white px-6 py-4 font-bold text-lg">
              Filter
            </div>
            
            {/* Keyword */}
            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('keyword')} className="w-full flex items-center justify-between px-6 py-4 font-bold text-[#411548]">
                Keyword
                <CustomIcon size={16} className={`transition-transform duration-300 ${expandedSections.keyword ? "rotate-180" : ""}`} />
              </button>
              {expandedSections.keyword && (
                <div className="px-6 pb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search ..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border border-gray-200 rounded py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-[#411548] bg-[#f8f9fa] text-gray-700" 
                    />
                    <CustomIcon className="absolute right-3 top-1/2 -translate-y-1/2" size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between px-6 py-4 font-bold text-[#411548]">
                Category
                <CustomIcon size={16} className={`transition-transform duration-300 ${expandedSections.category ? "rotate-180" : ""}`} />
              </button>
              {expandedSections.category && (
                <div className="px-6 pb-4 flex flex-col gap-3 text-sm text-gray-600">
                  {['Man', 'Woman', 'Youth', 'Teen', 'Veteran', 'Others'].map((cat, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#411548] focus:ring-[#411548]" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('location')} className="w-full flex items-center justify-between px-6 py-4 font-bold text-[#411548]">
                Location
                <CustomIcon size={16} className={`transition-transform duration-300 ${expandedSections.location ? "rotate-180" : ""}`} />
              </button>
              {expandedSections.location && (
                <div className="px-6 pb-4 flex flex-col gap-3 text-sm text-gray-600">
                  {[
                    'Twin Cities', 'Rochester', 'St. Cloud', 'Mankato'
                  ].map((loc, i) => (
                     <div key={i} className="flex items-center justify-between cursor-pointer">
                       <label className="flex items-center gap-3 cursor-pointer">
                         <input 
                           type="checkbox" 
                           className="w-4 h-4 rounded border-gray-300 text-[#411548] focus:ring-[#411548]" 
                           checked={selectedLocations.includes(loc)}
                           onChange={() => toggleLocation(loc)}
                         />
                         <span>{loc}</span>
                       </label>
                       <CustomIcon size={14} />
                     </div>
                  ))}
                </div>
              )}
            </div>

            {/* Born Date */}
            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('bornDate')} className="w-full flex items-center justify-between px-6 py-4 font-bold text-[#411548]">
                <span className="flex items-center gap-2">Born Date <div className="w-4 h-4 rounded-full bg-[#411548] text-white flex items-center justify-center text-[10px] leading-none text-center">C</div></span>
                <CustomIcon size={16} className={`transition-transform duration-300 ${expandedSections.bornDate ? "rotate-180" : ""}`} />
              </button>
              {expandedSections.bornDate && (
                <div className="px-6 pb-4">
                  <input 
                    type="date" 
                    value={bornDate}
                    onChange={(e) => setBornDate(e.target.value)}
                    className="w-full border border-gray-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-[#411548] bg-white text-gray-700" 
                  />
                </div>
              )}
            </div>

            {/* Died Date */}
            <div>
              <button onClick={() => toggleSection('diedDate')} className="w-full flex items-center justify-between px-6 py-4 font-bold text-[#411548]">
                <span className="flex items-center gap-2">Died Date <div className="w-4 h-4 rounded-full bg-[#411548] text-white flex items-center justify-center text-[10px] leading-none text-center">C</div></span>
                <CustomIcon size={16} className={`transition-transform duration-300 ${expandedSections.diedDate ? "rotate-180" : ""}`} />
              </button>
              {expandedSections.diedDate && (
                <div className="px-6 pb-4">
                  <input 
                    type="date" 
                    value={diedDate}
                    onChange={(e) => setDiedDate(e.target.value)}
                    className="w-full border border-gray-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-[#411548] bg-white text-gray-700" 
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="font-bold text-gray-800">
              Showing 1-{filteredObituaries.length} Of {filteredObituaries.length} Results
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing</span>
                <select className="border border-gray-200 rounded py-1.5 px-3 focus:outline-none focus:border-[#411548] bg-white text-gray-700">
                  <option>Recently added ( latest )</option>
                </select>
              </div>
              <div className="flex bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#411548] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#411548] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Listings */}
          {isLoading ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ObituaryCardSkeleton key={i} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <ObituaryCardSkeleton key={i} viewMode="list" />
                ))}
              </div>
            )
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredObituaries.map((person) => (
                <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative pt-10 pb-8 px-4 flex flex-col items-center text-center">
                  {person.featured && (
                     <span className="absolute top-4 left-0 bg-[#411548] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-r-sm z-10 flex items-center gap-1 shadow-sm">
                       <span className="text-[14px] leading-none mb-0.5">★</span> FEATURED
                     </span>
                  )}
                  <div className="w-32 h-32 rounded-full mb-6 overflow-hidden relative flex-shrink-0">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover rounded-full" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
                      <CustomIcon size={48} />
                    </div>
                  </div>
                  
                  <span className="bg-[#f0eaf2] text-[#411548] text-[11px] font-bold px-3 py-1.5 rounded mb-4 inline-block">
                    {person.dates}
                  </span>
                  <h3 className="font-script text-3xl font-medium text-[#411548] mb-2">{person.name}</h3>
                  
                  <div className="flex gap-2 relative z-30 mt-4">
                    <Link to={`/flowers?deceased=${encodeURIComponent(person.name)}`} className="bg-white border border-[#411548] text-[#411548] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#411548] hover:text-white transition-all">Send Flowers</Link>
                    <Link to="/shop" className="bg-white border border-gray-200 text-[#411548] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">Shop Gifts</Link>
                  </div>

                  <Link to={`/obituaries/${person.id}`} className="absolute inset-0 z-20"></Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredObituaries.map((person) => (
                <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 relative group overflow-hidden">
                  
                  {/* Left: Image */}
                  <div className="flex flex-col items-center shrink-0 relative">
                    {person.featured && (
                       <span className="absolute -top-3 -left-8 bg-[#411548] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider rounded-r-sm z-10 flex items-center gap-1 shadow-sm opacity-90">
                         <span className="text-[12px] leading-none mb-0.5">★</span> FEATURED
                       </span>
                    )}
                    <div className="w-32 h-32 rounded-full overflow-hidden relative mb-2">
                       <img src={person.img} alt={person.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                     <div className="absolute -bottom-1 pointer-events-none">
                        <CustomIcon size={56} />
                     </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-script text-4xl text-[#411548] mb-2 font-medium">{person.name}</h3>
                    <div className="mb-3">
                       <span className="bg-[#f0eaf2] text-[#411548] text-[10px] font-bold px-2 py-1 uppercase rounded tracking-wider">
                         {person.dates}
                       </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
                      {person.abstract}
                    </p>
                    <div className="flex gap-4">
                      <Link to={`/obituaries/${person.id}`} className="inline-block bg-[#411548] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#300f35] transition-colors relative z-20">
                        View Obituary
                      </Link>
                      <Link to={`/flowers?deceased=${encodeURIComponent(person.name)}`} className="inline-block bg-white border border-[#411548] text-[#411548] px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#411548] hover:text-white transition-colors relative z-20">
                        Send Flowers
                      </Link>
                      <Link to="/shop" className="inline-block bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors relative z-20">
                        Shop Gifts
                      </Link>
                    </div>
                  </div>

                  {/* Right: Location & Icon */}
                  <div className="w-full sm:w-48 shrink-0 flex flex-col items-end justify-between border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 relative">
                    <CustomIcon size={40} className="absolute top-0 right-0 group-hover:scale-110 transition-transform origin-top-right rotate-12" />
                    <div className="mt-auto">
                      <p className="flex items-center gap-1.5 text-sm font-medium text-gray-600 justify-end text-right">
                        <CustomIcon size={16} />
                        {person.location}
                      </p>
                    </div>
                  </div>
                  
                  <Link to={`/obituaries/${person.id}`} className="absolute inset-0 z-0"></Link>
                  <Link to={`/submit-obituary`} className="relative z-10 hidden"></Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#411548] text-white font-bold text-sm shadow">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">2</button>
          </div>
        </div>
      </div>

      {/* HOW WE WORK SECTION */}
      <section className="py-32 bg-[#411548] text-white relative overflow-hidden mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-4 font-black">
              <span className="w-12 h-[1px] bg-white/40"></span> OUR PROCESS <span className="w-12 h-[1px] bg-white/40"></span>
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black uppercase mb-8 leading-[0.85] tracking-tight">
              <span className="text-white">How We</span> <br /> <span className="text-white italic font-light lowercase">Work</span>
            </h2>
            <p className="text-white/70 font-light text-xl max-w-2xl mx-auto uppercase tracking-wide text-sm font-bold">
              We make the process of honoring your loved one as seamless and compassionate as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Setup",
                desc: "Connect with our compassionate team or start directly online to share the life story and memories of your loved one."
              },
              {
                step: "02",
                title: "Crafting & Social Posts",
                desc: "Our professional digital team creates polished writeups along with custom social media graphics designed for sharing across all social platforms."
              },
              {
                step: "03",
                title: "Family Member Posting",
                desc: "Registered family members can submit and publish directly on the obituaries page upon account registration, or authorize our team to assist."
              },
              {
                step: "04",
                title: "Multi-Channel Broadcast",
                desc: "Our digital team publishes the tribute across web platforms, social channels, and local networks while enabling friends to send condolences and flowers."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-10 rounded-[3rem] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2">
                <span className="text-5xl font-serif font-black text-black mb-8 block">{item.step}</span>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 text-[#411548]">{item.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed uppercase text-[11px] tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group border border-gray-100">
                <img src={DRIVE_IMAGES.FAQ_AND_QUERIES} alt="Frequently Asked Questions & Queries" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-[#411548]/30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <h3 className="text-3xl font-serif font-black text-white uppercase leading-tight mb-4">Finding peace <br/> in memories</h3>
                   <p className="text-white/80 font-light max-w-sm">We are here to support you through every step of the journey.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="mb-16">
                <span className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#411548] mb-4 font-black">
                  <span className="w-12 h-[2px] bg-[#411548]"></span> COMMON QUERIES <span className="w-12 h-[2px] bg-[#411548]"></span>
                </span>
                <h2 className="text-5xl font-serif font-black text-[#411548] uppercase leading-[0.9] tracking-tight mb-8">
                  Frequently <br /> <span className="text-black italic font-light lowercase">Asked Questions</span>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "How do I find a specific obituary?",
                    a: "You can use our keyword search at the top of the filtering sidebar. Simply enter the name or location to see relevant results instantly.",
                    ctaText: "Search Obituary Directory",
                    ctaLink: "/obituaries"
                  },
                  {
                    q: "Can I search for obituaries by specific dates?",
                    a: "Yes, our filter sidebar includes 'Born Date' and 'Died Date' search parameters to help you narrow down your search precisely.",
                    ctaText: "Use Search Filters",
                    ctaLink: "/obituaries"
                  },
                  {
                    q: "Are obituaries always available online?",
                    a: "We maintain an ever-growing digital archive. While we aim for permanency, older records are moved to our heritage archives periodically.",
                    ctaText: "Contact Memory Care Team",
                    ctaLink: "/contact"
                  },
                  {
                    q: "What information is usually in an obituary?",
                    a: "A typical obituary includes the full name, dates of birth and death, a brief life story (abstract), service details, and family mentions.",
                    ctaText: "Submit An Obituary Announcement",
                    ctaLink: "/submit-obituary"
                  }
                ].map((faq, idx) => (
                  <details key={idx} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                      <h3 className="text-lg font-black text-[#411548] uppercase tracking-tight">{faq.q}</h3>
                      <span className="w-10 h-10 rounded-full bg-[#411548] text-white flex items-center justify-center transition-transform group-open:rotate-180">
                        <CustomIcon size={16} variant="white" />
                      </span>
                    </summary>
                    <div className="px-8 pb-8 text-gray-600 text-sm font-light leading-relaxed space-y-4">
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
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Submit An Obituary Or Order Sympathy Flowers
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Send condolences directly to a family or contact our team to publish an official obituary announcement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/flowers" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Send Sympathy Flowers
            </Link>
            <Link to="/contact" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Contact Funeral Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
