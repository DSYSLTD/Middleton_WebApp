import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Tag,
  ArrowRight,
  Clock,
  X,
  Share2,
  CheckCircle2,
  Star,
  Filter,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BlogPostSkeleton } from '../components/Skeleton';
import CustomIcon from '../components/CustomIcon';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  image: string;
  isFeatured?: boolean;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    takeaways: string[];
  };
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 4;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, activeTag, searchQuery]);

  const categories = [
    "All",
    "Funeral Planning",
    "Burial Cremation",
    "Grief Support",
    "Pre-Planning",
    "Funeral Products",
    "Minnesota Guidance"
  ];

  const popularTags = [
    "Grief Support",
    "Eco-Friendly",
    "Pre-Planning",
    "VA Benefits",
    "Celebration of Life",
    "Consumer Rights",
    "Holiday Healing"
  ];

  const posts: Article[] = [
    {
      id: "1",
      title: "Coping with Loss During the Holidays: A Compassionate Healing Guide",
      category: "Grief Support",
      date: "Dec 12, 2025",
      readTime: "5 min read",
      author: {
        name: "Sarah Jenkins",
        role: "Director of Bereavement Support",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "The holidays can intensify feelings of grief when missing someone special. Learn practical, gentle ways to honor their memory, establish new traditions, and find moments of genuine peace.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      tags: ["Grief Support", "Holiday Healing", "Family Wellbeing"],
      content: {
        intro: "For those carrying the weight of loss, the holiday season often brings mixed emotions. Surrounded by festive songs and gatherings, the absence of a loved one can feel acutely sharp. It is completely normal to feel conflicted, anxious, or overwhelmed.",
        sections: [
          {
            heading: "Acknowledge Your Feelings Without Judgment",
            body: "There is no correct way to grieve during the holidays. Give yourself explicit permission to feel sorrow, joy, or a combination of both. You do not owe anyone a cheerful facade if you feel heavy inside."
          },
          {
            heading: "Create a Dedicated Memory Ritual",
            body: "Lighting a memorial candle before holiday dinners, setting a place of honor at the table, or hanging a custom keepsake ornament can provide a comforting physical anchor for your loved one's presence."
          },
          {
            heading: "Simplify Expectations & Give Yourself Grace",
            body: "Re-evaluate traditional commitments. If hosting a large family gathering feels exhausting, consider scaling down or starting a quiet new tradition like a winter nature walk or a family story circle."
          }
        ],
        takeaways: [
          "Communicate open boundaries with family members in advance.",
          "Balance solitary quiet time with supportive group connection.",
          "Consider making a memorial charitable donation in your loved one's honor."
        ]
      }
    },
    {
      id: "2",
      title: "The Environmental Impact of Green Burials in Minnesota",
      category: "Burial Cremation",
      date: "Nov 28, 2025",
      readTime: "4 min read",
      author: {
        name: "David Vance",
        role: "Eco-Funeral Specialist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "Explore how natural burial options, biodegradable shrouds, and native flora preserves are helping Minnesota families return loved ones to the earth sustainably.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
      tags: ["Eco-Friendly", "Natural Burial", "Sustainability"],
      content: {
        intro: "Green burials have evolved from a niche preference into one of Minnesota's fastest-growing funeral choices. By foregoing formaldehyde-based embalming and metal caskets, green burials allow the human body to return gently to nature.",
        sections: [
          {
            heading: "Zero Chemical Preservation",
            body: "In a green burial, formaldehyde fluids are replaced with refrigeration or organic essential oil preparations. This preserves groundwater integrity and protects natural soil microbiology."
          },
          {
            heading: "Biodegradable Caskets & Linen Shrouds",
            body: "Materials such as woven willow, bamboo, seagrass, and unbleached cotton shrouds dissolve naturally over time, nourishing forest floors and wildlife conservation grounds."
          }
        ],
        takeaways: [
          "Dramatically reduces carbon footprint compared to standard vaults.",
          "Supports local prairie and woodland restoration grounds in Minnesota.",
          "Fully compliant with all state health regulations and township zoning."
        ]
      }
    },
    {
      id: "3",
      title: "Understanding Minnesota Funeral Laws & Consumer Rights in 2026",
      category: "Minnesota Guidance",
      date: "Oct 15, 2025",
      readTime: "6 min read",
      author: {
        name: "Marcus Middleton",
        role: "Managing Director",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "A comprehensive breakdown of state regulations, FTC funeral rule protections, pre-need trust safeguards, and what rights you have during funeral arrangement.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      tags: ["Consumer Rights", "State Laws", "Planning Safeguards"],
      content: {
        intro: "Navigating funeral law during a period of bereavement can be daunting. Understanding Minnesota statutes and Federal Trade Commission (FTC) Funeral Rules empowers families to make clear, confident, and cost-effective decisions.",
        sections: [
          {
            heading: "The General Price List (GPL) Right",
            body: "By federal law, funeral homes must provide an itemized General Price List prior to discussing any services or pricing. You are never obligated to purchase packaged bundles or unwanted add-ons."
          },
          {
            heading: "Third-Party Caskets & Merchandise",
            body: "You have the absolute right to provide a casket or urn purchased from an external vendor. Funeral providers cannot charge handling fees or refuse third-party merchandise."
          }
        ],
        takeaways: [
          "Pre-need trust funds in MN must be deposited into insured escrow accounts.",
          "Embalming is not legally required by MN law if burial or cremation occurs within 72 hours.",
          "You are entitled to written price disclosures over the phone at any time."
        ]
      }
    },
    {
      id: "4",
      title: "Honoring Veterans: Full Military Funeral Honors & VA Benefits Guide",
      category: "Funeral products",
      date: "Sep 20, 2025",
      readTime: "5 min read",
      author: {
        name: "Lt. Col. Robert Hayes (Ret.)",
        role: "Veterans Care Liaison",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "How to arrange presidential memorial certificates, flag presentations, bugle taps, and burial in national or state veterans cemeteries across Minnesota.",
      image: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&w=800&q=80",
      tags: ["VA Benefits", "Military Honors", "Veterans"],
      content: {
        intro: "Every eligible United States veteran is entitled to a dignified military funeral honors ceremony. Middleton Funeral Services handles all coordination with local Honor Guards and the Department of Veterans Affairs.",
        sections: [
          {
            heading: "Core Elements of Military Honors",
            body: "An official military honors detail consists of two or more uniformed service members folding and presenting the United States flag to next-of-kin, accompanied by the solemn playing of Taps."
          },
          {
            heading: "National & State Veterans Cemeteries",
            body: "Eligible veterans receive grave space, opening and closing services, perpetual care, and a government headstone or marker at zero cost to the surviving family."
          }
        ],
        takeaways: [
          "Requires Form DD-214 or honorable discharge documentation.",
          "Burial benefits extend to spouses and dependent children.",
          "Pre-verification of eligibility prevents stress during sudden loss."
        ]
      }
    },
    {
      id: "5",
      title: "How Pre-Planning Saves Families Stress & Financial Strain",
      category: "Pre-Planning Services",
      date: "Aug 14, 2025",
      readTime: "4 min read",
      author: {
        name: "Elena Rostova",
        role: "Pre-Planning Counselor",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "Locking in today's rates, specifying personal wishes in advance, and freeing your children from difficult decisions during times of emotional grief.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      tags: ["Pre-Planning", "Family Wellbeing", "Financial Peace"],
      content: {
        intro: "Pre-planning is one of the most thoughtful gifts you can leave for your family. By documenting your preferences and funding arrangements early, you shield loved ones from emotional decision-making.",
        sections: [
          {
            heading: "Price Inflation Protection",
            body: "Pre-funding locks in service costs at current rates. Regardless of future inflation or cost increases, guaranteed pre-need arrangements ensure your family pays zero extra fees later."
          },
          {
            heading: "Eliminating Guesswork & Family Tension",
            body: "When choices regarding music, readings, casket selection, or cremation disposition are recorded, family members can focus entirely on supporting each other rather than debating choices."
          }
        ],
        takeaways: [
          "Plans are 100% transferable if you relocate.",
          "Flexible monthly payment arrangements available.",
          "Store copies safely in our digital vault for family access."
        ]
      }
    },
    {
      id: "6",
      title: "Personalizing a Celebration of Life: Creative & Meaningful Ideas",
      category: "Funeral Planning",
      date: "Jul 02, 2025",
      readTime: "5 min read",
      author: {
        name: "Sarah Jenkins",
        role: "Director of Bereavement Support",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
      },
      excerpt: "From customized memorial playlists and memory tables to seedling giveaways and video tribute streams, make your tribute truly reflection of a unique life.",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      tags: ["Celebration of Life", "Tributes", "Personalization"],
      content: {
        intro: "A celebration of life focuses on honoring a loved one's joy, achievements, passions, and relationships. It offers families the freedom to blend traditional reverence with joyful personal storytelling.",
        sections: [
          {
            heading: "Curating Interactive Memory Displays",
            body: "Set up thematic tables featuring personal keepsakes, gardening tools, vintage records, or sports memorabilia. Encourage guests to write memory cards and place them in a commemorative box."
          },
          {
            heading: "Living Tributes & Seedling Keepsakes",
            body: "Gift guests wildflower seed packets or tree saplings to plant in their home gardens, creating living, blooming memorials that honor your loved one season after season."
          }
        ],
        takeaways: [
          "Incorporate customized acoustic music or acoustic playlists.",
          "Host an open mic segment for personal family anecdotes.",
          "Livestream for remote relatives unable to travel."
        ]
      }
    }
  ];

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [posts, selectedCategory, activeTag, searchQuery]);

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const isShowingFeaturedBanner = !searchQuery && !activeTag && selectedCategory === 'All' && featuredPost;

  // Filter pool for grid
  const poolPosts = useMemo(() => {
    if (isShowingFeaturedBanner) {
      return filteredPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, isShowingFeaturedBanner, featuredPost]);

  const totalPages = Math.ceil(poolPosts.length / POSTS_PER_PAGE) || 1;

  // Paginated articles slice
  const displayedGridPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return poolPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [poolPosts, currentPage]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> Perspectives & Guidance
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              The Healing Journal
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Compassionate wisdom, practical planning advice, and legal guidance for life's most meaningful transitions.
            </p>

            {/* Quick Hero Search Input */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="absolute left-6 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-full pl-14 pr-12 py-3.5 text-xs md:text-sm font-light shadow-2xl outline-none focus:ring-4 focus:ring-white/30 transition-all" 
                  placeholder="Search articles on grief, planning, laws, or veterans benefits..." 
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Content Container */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Featured Spotlight Section (shown when no search/tag active) */}
          {!searchQuery && !activeTag && selectedCategory === 'All' && featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                <div className="lg:w-1/2 w-full h-80 md:h-96 rounded-[2.5rem] overflow-hidden relative shrink-0">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 bg-[#411548] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Star size={12} className="fill-white" /> Featured Article
                  </div>
                </div>

                <div className="lg:w-1/2 w-full flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100 flex items-center gap-1.5">
                        <Tag size={12} /> {featuredPost.category}
                      </span>
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={13} /> {featuredPost.date}
                      </span>
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <Clock size={13} /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 
                      onClick={() => setSelectedArticle(featuredPost)}
                      className="text-2xl md:text-4xl font-serif font-black text-[#411548] uppercase leading-tight mb-4 hover:text-black cursor-pointer transition-colors"
                    >
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Author Box & Action */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-100" 
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-[10px] font-medium text-gray-500">{featuredPost.author.role}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedArticle(featuredPost)}
                      className="inline-flex items-center justify-center gap-3 bg-[#411548] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-md group-hover:gap-4 shrink-0 whitespace-nowrap"
                    >
                      Read Featured Story <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Interactive Category Filter Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#411548]" />
                <h3 className="text-sm font-black uppercase tracking-wider text-[#411548]">Explore Topics</h3>
              </div>

              {(selectedCategory !== 'All' || activeTag || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveTag(null);
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                >
                  <X size={14} /> Reset Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto pb-4 scrollbar-none w-full justify-between">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 shadow-sm ${
                    selectedCategory === cat
                      ? 'bg-[#411548] text-white shadow-md scale-105'
                      : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Articles Feed */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <BlogPostSkeleton key={i} />
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-200 shadow-sm">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-2xl font-serif font-bold text-[#411548] mb-2 uppercase">No Articles Found</h3>
                  <p className="text-gray-500 font-light text-sm max-w-md mx-auto mb-6">
                    We couldn't find any articles matching your search query or topic filter.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setActiveTag(null);
                      setSearchQuery('');
                    }}
                    className="bg-[#411548] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                  >
                    View All Articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayedGridPosts.map((post, idx) => (
                    <motion.article 
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="group bg-white rounded-[2.5rem] p-6 border border-gray-100 hover:shadow-2xl transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
                    >
                      <div>
                        {/* Image */}
                        <div 
                          onClick={() => setSelectedArticle(post)}
                          className="h-56 rounded-[2rem] overflow-hidden mb-6 cursor-pointer relative"
                        >
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#411548] text-[9.5px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                            <Tag size={10} /> {post.category}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => setSelectedArticle(post)}
                          className="text-xl font-serif font-bold text-[#411548] mb-3 hover:text-black cursor-pointer transition-colors leading-tight uppercase"
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-500 font-light mb-6 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Author & CTA */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-8 h-8 rounded-full object-cover border border-purple-100" 
                          />
                          <span className="text-xs font-bold text-gray-700">{post.author.name}</span>
                        </div>

                        <button 
                          onClick={() => setSelectedArticle(post)}
                          className="text-xs font-black uppercase tracking-wider text-[#411548] group-hover:text-black flex items-center gap-1.5 transition-colors"
                        >
                          Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`p-3 rounded-full border border-gray-200 transition-all ${
                      currentPage === 1 
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                        : 'text-[#411548] hover:bg-[#411548] hover:text-white bg-white shadow-sm'
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-full text-xs font-black transition-all ${
                            currentPage === pageNum
                              ? 'bg-[#411548] text-white shadow-md scale-105'
                              : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={`p-3 rounded-full border border-gray-200 transition-all ${
                      currentPage === totalPages 
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                        : 'text-[#411548] hover:bg-[#411548] hover:text-white bg-white shadow-sm'
                    }`}
                    aria-label="Next Page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0 space-y-10">
              
              {/* Category Counts Sidebar Box */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#411548] mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <CustomIcon size={14} /> Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => {
                    const count = cat === 'All' 
                      ? posts.length 
                      : posts.filter(p => p.category === cat).length;

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-left ${
                          selectedCategory === cat
                            ? 'bg-[#411548] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#411548]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#411548] mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Tag size={14} /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={`text-[10.5px] font-bold px-3 py-1.5 rounded-full transition-all ${
                        activeTag === tag
                          ? 'bg-[#411548] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-[#411548]'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Consultation CTA Card */}
              <div className="bg-[#411548] text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <CustomIcon size={36} variant="white" className="mx-auto mb-4" />
                <h4 className="text-xl font-serif font-black uppercase mb-3">Need Compassionate Advice?</h4>
                <p className="text-white/80 font-light text-xs leading-relaxed mb-6">
                  Our licensed directors are available 24/7 to help you navigate funeral planning, legal regulations, or grief care.
                </p>
                <Link 
                  to="/book-appointment" 
                  className="w-full inline-flex items-center justify-center bg-white text-[#411548] hover:bg-black hover:text-white py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-widest shadow-md transition-all whitespace-nowrap"
                >
                  Book Appointment
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] p-6 md:p-12 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto border border-gray-100"
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#411548] hover:text-white flex items-center justify-center transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Calendar size={13} /> {selectedArticle.date}
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Clock size={13} /> {selectedArticle.readTime}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase leading-tight mb-6">
                  {selectedArticle.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                  <img 
                    src={selectedArticle.author.avatar} 
                    alt={selectedArticle.author.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-100" 
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedArticle.author.name}</p>
                    <p className="text-xs font-medium text-gray-500">{selectedArticle.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="h-80 md:h-96 rounded-[2.5rem] overflow-hidden mb-8 shadow-md">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Article Content */}
              <div className="space-y-8 text-gray-700 leading-relaxed font-light text-base md:text-lg">
                <p className="text-xl font-normal text-[#411548] italic border-l-4 border-[#411548] pl-6 py-2 bg-purple-50/50 rounded-r-2xl">
                  "{selectedArticle.content.intro}"
                </p>

                {selectedArticle.content.sections.map((sec, i) => (
                  <div key={i} className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#411548] uppercase">
                      {sec.heading}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{sec.body}</p>
                  </div>
                ))}

                {/* Key Takeaways Box */}
                <div className="bg-purple-50 rounded-3xl p-6 md:p-8 border border-purple-100 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#411548] flex items-center gap-2">
                    <CheckCircle2 size={16} /> Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {selectedArticle.content.takeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-normal">
                        <span className="w-2 h-2 rounded-full bg-[#411548] mt-2 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    to="/book-appointment" 
                    onClick={() => setSelectedArticle(null)}
                    className="bg-[#411548] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-md whitespace-nowrap inline-flex items-center justify-center"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Newsletter Lead Magnet Pre-Footer */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-white/40" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            The Healing Newsletter
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Receive monthly guidance on navigating grief, planning education, legal updates, and community support events directly in your inbox.
          </p>

          {newsletterSubscribed ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-6 max-w-md mx-auto text-white"
            >
              <CheckCircle2 size={32} className="mx-auto mb-2 text-green-400" />
              <p className="font-bold text-sm">Thank you for subscribing!</p>
              <p className="text-xs font-light text-white/70 mt-1">You will receive our monthly care journal and event invitations.</p>
            </motion.div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all text-xs" 
                placeholder="Enter your email address..." 
              />
              <button 
                type="submit"
                className="bg-white text-[#411548] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white shadow-xl transition-all shrink-0 whitespace-nowrap inline-flex items-center justify-center"
              >
                Join Journal
              </button>
            </form>
          )}

          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-6">
            Zero spam &bull; Unsubscribe at any time &bull; Privacy Protected
          </p>
        </div>
      </section>
    </div>
  );
}
