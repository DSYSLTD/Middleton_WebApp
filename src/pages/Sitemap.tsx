import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Map,
  Search,
  ExternalLink,
  FileCode,
  Check,
  Copy,
  ChevronRight,
  ShieldCheck,
  Compass,
  Heart,
  Calendar,
  Flower2,
  BookOpen,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  HelpCircle,
  Clock,
  Sparkles,
  PhoneCall,
  Flame,
  Car,
  Video,
  Scale,
  Landmark,
  Building,
  UserCheck,
  Package,
  Globe,
  Send,
  CheckCircle2,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { DoveIcon } from '../components/DoveIcon';

interface SitemapItem {
  name: string;
  path: string;
  description: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  priority?: string;
  changefreq?: string;
}

interface SitemapCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  items: SitemapItem[];
}

export default function Sitemap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const categories: SitemapCategory[] = useMemo(
    () => [
      {
        id: 'core',
        title: 'Core & Overview',
        description: 'Primary portal entry points, philosophical foundation, and 24/7 immediate assistance.',
        icon: Compass,
        items: [
          {
            name: 'Home',
            path: '/',
            description: 'Main entrance to Middleton Funeral Services with rapid care routing and service overviews.',
            badge: 'Homepage',
            priority: '1.0'
          },
          {
            name: 'About Us',
            path: '/about',
            description: 'Our heritage, licensed funeral directors, compassionate mission, and care philosophy.',
            badge: 'Company',
            priority: '0.8'
          },
          {
            name: 'How We Work',
            path: '/how-we-work',
            description: 'Step-by-step walkthrough of our care, from first transfer to post-ceremony bereavement.',
            badge: 'Process',
            priority: '0.8'
          },
          {
            name: 'Contact & Immediate Care',
            path: '/contact',
            description: '24/7 immediate telephone care, driving directions, map, and callback request form.',
            badge: '24/7 Helpline',
            priority: '0.9'
          }
        ]
      },
      {
        id: 'services',
        title: 'Funeral & Memorial Services',
        description: 'Comprehensive ceremonial, traditional, modern, and specialized funeral arrangements.',
        icon: Heart,
        items: [
          {
            name: 'All Funeral Services',
            path: '/services',
            description: 'Comprehensive directory of all 10 funeral care disciplines and ceremonies.',
            badge: 'Directory',
            priority: '0.9'
          },
          {
            name: 'Burial Services',
            path: '/services/burials',
            description: 'Traditional, lawn crypt, mausoleum entombment, and certified eco-friendly green burials.',
            badge: 'Traditional & Eco',
            priority: '0.8'
          },
          {
            name: 'Burial Comparison Tool',
            path: '/burial-comparison',
            description: 'Interactive side-by-side comparison of traditional, natural green, and cremation burials.',
            badge: 'Interactive',
            priority: '0.8'
          },
          {
            name: 'Cremation Services',
            path: '/services/cremation',
            description: 'Direct cremation, memorial gatherings, witness cremations, and scattering services.',
            badge: 'Dignified Care',
            priority: '0.8'
          },
          {
            name: 'Ceremonies & Celebrations of Life',
            path: '/services/funeral-services',
            description: 'Personalized chapel visitations, wake services, and uplifting life celebration tributes.',
            badge: 'Ceremony',
            priority: '0.8'
          },
          {
            name: 'Specialized & Cultural Honors',
            path: '/services/specialized-services',
            description: 'Military veteran honors, first responder tributes, and interfaith cultural protocols.',
            badge: 'Honors',
            priority: '0.8'
          },
          {
            name: 'Embalming & Restorative Art',
            path: '/services/embalming-preparation',
            description: 'Licensed anatomical preservation, cosmetic grooming, and open-casket preparation.',
            badge: 'Specialized',
            priority: '0.7'
          },
          {
            name: 'Transportation & Executive Livery',
            path: '/services/transportation-livery',
            description: 'Cadillac hearse, limousine family coaches, police motorcycle escorts, and transfers.',
            badge: 'Motorcade',
            priority: '0.7'
          },
          {
            name: 'Funeral Coordination & Directing',
            path: '/services/funeral-coordination',
            description: 'Experienced master of ceremonies, cemetery scheduling, clergy and floral logistics.',
            badge: 'Direction',
            priority: '0.7'
          },
          {
            name: 'Technology, Live-Streaming & Media',
            path: '/services/technology-media',
            description: 'HD multi-camera ceremony broadcasting, digital video tributes, and virtual guestbooks.',
            badge: 'Digital Care',
            priority: '0.7'
          },
          {
            name: 'Legal & Heritage Planning',
            path: '/services/legal-heritage-planning',
            description: 'Estate settlement advisory, death certificate procurement, and legacy safeguarding.',
            badge: 'Estate Advisory',
            priority: '0.7'
          },
          {
            name: 'Chapels, Suites & Venue Network',
            path: '/services/venues',
            description: 'Serene gathering chapels, intimate hospitality family suites, and scenic banquet halls.',
            badge: 'Gathering Spaces',
            priority: '0.7'
          }
        ]
      },
      {
        id: 'planning',
        title: 'Pre-Planning & Consultations',
        description: 'Advance arrangement recording, transparent cost lock-in, and appointment scheduling.',
        icon: Calendar,
        items: [
          {
            name: 'Advance Pre-Planning Guide',
            path: '/pre-planning',
            description: 'Smart online pre-arrangement questionnaire to record wishes and relieve family burdens.',
            badge: 'Legacy Protection',
            priority: '0.9'
          },
          {
            name: 'Schedule Appointment',
            path: '/book-appointment',
            description: 'Book an in-person conference, private telephone consultation, or video appointment.',
            badge: 'Direct Booking',
            priority: '0.9'
          }
        ]
      },
      {
        id: 'shop',
        title: 'Sympathy Gifts & Memorial Essentials',
        description: 'Curated floral sprays, memorial candles, personalized keepsakes, and certified caskets & urns.',
        icon: Flower2,
        items: [
          {
            name: 'Sympathy Gifts & Floral Tributes',
            path: '/flowers',
            description: 'Handcrafted floral easels, standing sprays, sympathy baskets, candles, and cards.',
            badge: 'Flowers & Gifts',
            priority: '0.8'
          },
          {
            name: 'Memorial Essentials Shop',
            path: '/shop',
            description: 'Certified hardwood & metal caskets, artisan urns, burial vaults, and cremation containers.',
            badge: 'Caskets & Urns',
            priority: '0.8'
          },
          {
            name: 'Custom Floral & Memorial Order',
            path: '/custom-order',
            description: 'Request bespoke botanical arrangements, custom ribbon sash inscriptions, or specialty tributes.',
            badge: 'Bespoke Order',
            priority: '0.7'
          },
          {
            name: 'Sell With Us (Florist & Artisan Onboarding)',
            path: '/sell-with-us',
            description: 'Partner with Middleton to provide local floral creations, custom urns, and memorial goods.',
            badge: 'Vendor Network',
            priority: '0.7'
          }
        ]
      },
      {
        id: 'support',
        title: 'Bereavement & Community Support',
        description: 'Certified grief support programs, educational downloads, and compassionate guidance.',
        icon: Users,
        items: [
          {
            name: 'Grief Support & Counseling',
            path: '/grief-support',
            description: 'Compassionate bereavement articles, licensed counselor directories, and helpline access.',
            badge: 'Healing',
            priority: '0.8'
          },
          {
            name: 'Join Support Group',
            path: '/join-support-group',
            description: 'Weekly peer support gatherings led by licensed family bereavement facilitators.',
            badge: 'Community Circles',
            priority: '0.8'
          },
          {
            name: 'Educational Resources & Downloads',
            path: '/resources',
            description: 'Free printable funeral planning checklists, estate guidelines, and grief roadmaps.',
            badge: 'Free Guides',
            priority: '0.8'
          },
          {
            name: 'Frequently Asked Questions (FAQ)',
            path: '/faq',
            description: 'Clear answers regarding embalming, cremation legality, pricing, and ceremony etiquette.',
            badge: 'Help Center',
            priority: '0.8'
          }
        ]
      },
      {
        id: 'obituaries',
        title: 'Obituaries & Remembrances',
        description: 'Tributes celebrating lives lived, service schedules, and condolence guestbooks.',
        icon: BookOpen,
        items: [
          {
            name: 'Obituaries & Tribute Wall',
            path: '/obituaries',
            description: 'Read commemorative obituaries, send flowers, leave digital candles, and sign guestbooks.',
            badge: 'Memorial Tributes',
            priority: '0.8'
          },
          {
            name: 'Submit an Obituary',
            path: '/submit-obituary',
            description: 'Online submission form for families to publish loving biographical tributes and service times.',
            badge: 'Family Submission',
            priority: '0.7'
          }
        ]
      },
      {
        id: 'company',
        title: 'Company, Careers & Editorial',
        description: 'Career openings, editorial knowledge base, author insights, and leadership.',
        icon: Briefcase,
        items: [
          {
            name: 'Careers & Opportunities',
            path: '/careers',
            description: 'Explore career paths for licensed morticians, apprentice directors, and hospitality staff.',
            badge: 'We Are Hiring',
            priority: '0.7'
          },
          {
            name: 'Job Application Form',
            path: '/job-application',
            description: 'Submit an employment application, upload resume credentials, and specify availability.',
            badge: 'Application',
            priority: '0.6'
          },
          {
            name: 'Bereavement & Planning Blog',
            path: '/blog',
            description: 'Insightful articles covering funeral traditions, coping with loss, and end-of-life care.',
            badge: 'Articles',
            priority: '0.8'
          }
        ]
      },
      {
        id: 'legal',
        title: 'Transparency, Legal & Compliance',
        description: 'FTC General Price List compliance, consumer rights, and technical site index.',
        icon: ShieldCheck,
        items: [
          {
            name: 'General Price List (GPL)',
            path: '/prices',
            description: 'Transparent itemized pricing for professional services, facilities, merchandise, and packages.',
            badge: 'FTC Compliant',
            priority: '0.9'
          },
          {
            name: 'Regulatory Disclosure',
            path: '/regulatory-disclosure',
            description: 'Federal Trade Commission (FTC) Funeral Rule consumer rights, Minnesota embalming statutes.',
            badge: 'Consumer Rights',
            priority: '0.5'
          },
          {
            name: 'Privacy Policy',
            path: '/privacy-policy',
            description: 'Our commitment to protecting client family confidentiality, payment data, and digital privacy.',
            badge: 'Data Protection',
            priority: '0.5'
          },
          {
            name: 'Terms & Conditions',
            path: '/terms',
            description: 'Standard terms of service, payment arrangements, merchandise warranties, and cancellations.',
            badge: 'Legal Terms',
            priority: '0.5'
          },
          {
            name: 'XML Sitemap',
            path: '/sitemap.xml',
            description: 'Structured search engine index file formatted according to the official Sitemaps XML protocol.',
            badge: 'Search Engines',
            priority: '0.7'
          }
        ]
      }
    ],
    []
  );

  // Filter items based on active category and search query
  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const matchesCategory = activeCategory === 'all' || cat.id === activeCategory;
        if (!matchesCategory && activeCategory !== 'all') {
          return null;
        }

        const filteredItems = cat.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.path.toLowerCase().includes(query) ||
            (item.badge && item.badge.toLowerCase().includes(query))
          );
        });

        if (filteredItems.length === 0) return null;

        return {
          ...cat,
          items: filteredItems
        };
      })
      .filter((cat): cat is SitemapCategory => cat !== null);
  }, [categories, activeCategory, searchQuery]);

  const totalPagesCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [categories]);

  const handleCopyXmlUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://middletonfuneralservices.com';
    navigator.clipboard.writeText(`${origin}/sitemap.xml`);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2500);
  };

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#411548] text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Map size={14} className="text-purple-200" />
              <span>Full Website Directory</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-white mb-5 leading-tight">
              Website Sitemap & Architecture
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              Easily explore every page, arrangement guide, memorial shop, grief resource, and regulatory disclosure on
              the Middleton Funeral & Cremation Services website.
            </p>

            {/* Quick SEO / XML Badge Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://search.google.com/search-console/sitemaps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                title="Submit your sitemap directly to Google Search Console"
              >
                <Globe size={15} />
                <span>Submit to Google Console</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#411548] font-bold text-xs tracking-wider uppercase hover:bg-gray-100 transition-colors shadow-lg"
              >
                <FileCode size={16} />
                <span>View XML Sitemap</span>
                <ExternalLink size={13} className="opacity-70" />
              </a>

              <button
                onClick={handleCopyXmlUrl}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase transition-colors backdrop-blur-md cursor-pointer"
              >
                {copiedXml ? (
                  <>
                    <Check size={16} className="text-emerald-300" />
                    <span>XML URL Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Sitemap.xml Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#411548] flex items-center justify-center shrink-0">
              <Map size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{totalPagesCount}</div>
              <div className="text-xs text-gray-500 font-medium">Pages Indexed</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">100%</div>
              <div className="text-xs text-gray-500 font-medium">FTC & GPL Compliant</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">24/7</div>
              <div className="text-xs text-gray-500 font-medium">Immediate Care Line</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <FileCode size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">XML 0.9</div>
              <div className="text-xs text-gray-500 font-medium">Google & Bing Index</div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Search Console Submission Banner */}
      <section className="container mx-auto px-4 max-w-7xl mt-8">
        <div className="bg-gradient-to-br from-white via-amber-50/30 to-purple-50/40 rounded-3xl p-6 md:p-8 border border-amber-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Globe size={14} className="text-amber-700" />
                <span>Search Engine Indexing</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Submit Website Sitemap to Google Search Console
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                Submitting your XML sitemap guarantees Googlebot rapidly discovers, crawls, and indexes all 35+ funeral service
                offerings, transparent pricing tables, obituaries, and grief care resources across Middleton Funeral Services.
              </p>

              {/* Step by step summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-700 font-medium mt-2">
                <div className="bg-white/90 p-3 rounded-xl border border-gray-200/70 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#411548] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <span>Open Google Console & select property</span>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-gray-200/70 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#411548] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <span>Navigate to <strong>Indexing &gt; Sitemaps</strong></span>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-gray-200/70 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#411548] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                  <span>Enter <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">sitemap.xml</code> and Submit</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm shrink-0 flex flex-col gap-3 min-w-[280px]">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Google Console Action
              </div>

              {/* Direct Submit Link */}
              <a
                href="https://search.google.com/search-console/sitemaps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#411548] hover:bg-[#300f35] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send size={14} />
                <span>Submit to Google Console</span>
                <ArrowUpRight size={14} />
              </a>

              {/* Copy snippet button */}
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 text-xs">
                <span className="font-mono text-gray-700 font-semibold px-2 flex-1">sitemap.xml</span>
                <button
                  type="button"
                  onClick={() => handleCopySnippet('sitemap.xml')}
                  className="bg-white hover:bg-gray-100 text-[#411548] px-3 py-1.5 rounded-lg border border-gray-300 font-semibold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy 'sitemap.xml' text"
                >
                  {copiedSnippet ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Companion webmaster tools */}
              <div className="flex items-center justify-between text-[11px] pt-1 text-gray-500 border-t border-gray-100">
                <a
                  href="https://search.google.com/test/rich-results?url=https%3A%2F%2Fmiddletonfuneralservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#411548] underline flex items-center gap-1"
                >
                  <span>Test Rich Results</span>
                  <ExternalLink size={10} />
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://www.bing.com/webmasters/sitemaps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#411548] underline flex items-center gap-1"
                >
                  <span>Bing Webmasters</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 max-w-7xl mt-10">
        {/* Controls: Search and Filter Tabs */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all pages, services, or policies..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#411548] focus:ring-2 focus:ring-purple-100 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredCategories.reduce((acc, c) => acc + c.items.length, 0)}</span> of{' '}
              <span className="font-bold text-gray-900">{totalPagesCount}</span> pages
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#411548] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Categories ({totalPagesCount})
            </button>
            {categories.map((cat) => {
              const count = cat.items.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-[#411548] text-white shadow-sm font-bold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
              <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">No pages found</h3>
              <p className="text-gray-500 text-sm mb-6">
                No matching page found for "{searchQuery}". Try searching for a different keyword or view all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-[#411548] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#300f35] transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              const CategoryIcon = cat.icon;
              return (
                <div key={cat.id} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200/80 shadow-sm">
                  {/* Category Header */}
                  <div className="flex items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#411548] flex items-center justify-center shrink-0">
                        <CategoryIcon size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 tracking-tight">
                          {cat.title}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full shrink-0">
                      {cat.items.length} {cat.items.length === 1 ? 'Route' : 'Routes'}
                    </span>
                  </div>

                  {/* Links Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="group p-4 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-mono text-purple-900/60 bg-purple-50 px-2 py-0.5 rounded-md font-semibold group-hover:bg-[#411548] group-hover:text-white transition-colors">
                              {item.path}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-gray-900 text-[15px] group-hover:text-[#411548] transition-colors flex items-center gap-1.5 mb-1.5">
                            <span>{item.name}</span>
                            <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#411548]" />
                          </h3>

                          <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-2 mb-3">
                            {item.description}
                          </p>
                        </div>

                        {item.priority && (
                          <div className="pt-2 border-t border-gray-100/80 flex items-center justify-between text-[10px] text-gray-400">
                            <span>SEO Priority: {item.priority}</span>
                            <span className="text-[#411548] font-medium group-hover:underline">Visit page &rarr;</span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Immediate Assistance Bottom Strip */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#411548] flex items-center justify-center shrink-0">
              <DoveIcon size={28} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Looking for Something Specific?</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light mt-0.5">
                Our funeral directors and arrangement counselors are available 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+19524862871"
              className="bg-[#411548] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#300f35] transition-colors flex items-center justify-center gap-2 shadow-sm flex-1 md:flex-none"
            >
              <PhoneCall size={15} />
              <span>Call 952 486-2871</span>
            </a>
            <Link
              to="/book-appointment"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
