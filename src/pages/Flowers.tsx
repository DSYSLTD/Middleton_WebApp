import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Star,
  ArrowRight,
  Flower2,
  Gift,
  Search,
  CheckCircle2,
  X,
  Eye,
  ShieldCheck,
  Truck,
  Award,
  MapPin,
  Building2,
  Copy,
  Check,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Calendar,
  User,
  Image as ImageIcon,
  Send,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { DoveIcon } from '../components/DoveIcon';
import { useModals } from '../context/ModalContext';

import { SYMPATHY_GIFTS, SympathyGiftProduct } from '../data/sympathyGiftsData';
export type { SympathyGiftProduct };

const FEATURED_GIFTS: SympathyGiftProduct[] = SYMPATHY_GIFTS;

// Suggested Sympathy Card Messages by Style
const CARD_MESSAGES: Record<string, string[]> = {
  "Simple & heartfelt": [
    "Thinking of you and your family during this difficult time. May the memories of your loved one bring you comfort and peace.",
    "Sending our deepest condolences. Wishing you strength and gentle comfort in the days ahead.",
    "Holding you close in our thoughts and hearts. With deepest sympathy on your loss."
  ],
  "Religious": [
    "May God's grace surround you and grant you peace that surpasses all understanding during this time of sorrow.",
    "Praying that the Lord comforts your family with His eternal peace and gentle love. You are in our prayers.",
    "Blessed are those who mourn, for they shall be comforted. Keeping your family lifted in prayer."
  ],
  "From a friend": [
    "I am so deeply sorry for your loss. Please know I am always here for you — for a walk, a conversation, or quiet support whenever you need.",
    "Your loved one touched so many lives with warmth and grace. I am so grateful to have known them, and I stand with you today.",
    "Sending you strength and endless love. I am holding space in my heart for you and your family."
  ],
  "From a colleague": [
    "On behalf of the entire team, please accept our heartfelt sympathies. Our thoughts are with you and your family.",
    "We are deeply saddened by news of your loss. Wishing you comfort and peace during this time of mourning.",
    "Sending our warmest support from all your colleagues. Please take all the time you need."
  ],
  "From a business": [
    "Please accept our sincere condolences from all of us at Middleton. We hold your family in our highest thoughts.",
    "With heartfelt sympathy on your loss. May peace and comforting memories surround your family.",
    "Sending our thoughts and respectful sympathies to you and your loved ones."
  ],
  "From a church/community": [
    "Your church family surrounds you with prayers, comfort, and steadfast love during this season of grief.",
    "Our entire community grieves with you and stands beside your family with compassionate hearts.",
    "Sending the warm embrace of our parish family. May faith and cherished memories bring solace."
  ],
  "For a child": [
    "Sending endless hugs, love, and gentle thoughts. May happy memories bring warmth to your heart every single day.",
    "Holding you so tight in our thoughts. You are surrounded by love and caring hearts always.",
    "With tender sympathy and warm thoughts. We are all here to support you."
  ],
  "For a spouse/partner": [
    "Words cannot express the sorrow of losing your life partner. May the deep love you shared sustain you in every moment.",
    "Your bond was a beautiful light to everyone who knew you. Holding you in continuous love and remembrance.",
    "Wishing you strength and gentle peace as you remember a life of extraordinary partnership and devotion."
  ]
};

export default function Flowers() {
  const [searchParams] = useSearchParams();
  const addressParam = searchParams.get('address');
  const deceasedParam = searchParams.get('deceased');

  const { openCallbackModal, openCustomOrderModal } = useModals();

  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [savedWishlist, setSavedWishlist] = useState<number[]>([]);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [isGiftComparisonOpen, setIsGiftComparisonOpen] = useState<boolean>(false);

  // Message Helper State
  const [selectedMessageStyle, setSelectedMessageStyle] = useState<string>("Simple & heartfelt");
  const [selectedMessageText, setSelectedMessageText] = useState<string>(CARD_MESSAGES["Simple & heartfelt"][0]);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Live Personalization Studio Simulator State
  const [persName, setPersName] = useState("In Loving Memory of Eleanor");
  const [persMessage, setPersMessage] = useState("May the memories you shared bring comfort during this difficult time.");
  const [persDate, setPersDate] = useState("1948 — 2026");
  const [persSignature, setPersSignature] = useState("With love, The Johnson Family");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (productName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedToast(productName);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleCopyMessage = (msg: string) => {
    navigator.clipboard.writeText(msg);
    setSelectedMessageText(msg);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // Filter gifts by category
  const filteredGifts = activeCategory === "All" 
    ? FEATURED_GIFTS 
    : FEATURED_GIFTS.filter(g => g.category === activeCategory);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1A081D] text-white px-6 py-4 rounded-2xl shadow-2xl border border-[#411548]/50 flex items-center gap-4"
          >
            <div className="w-9 h-9 rounded-full bg-[#411548] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-purple-300">Sympathy Gift Added</p>
              <p className="text-xs font-bold text-white line-clamp-1">{addedToast}</p>
            </div>
            <button onClick={() => setAddedToast(null)} className="ml-2 text-white/60 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        )}

        {copiedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1A081D] text-white px-6 py-4 rounded-2xl shadow-2xl border border-[#411548]/50 flex items-center gap-4"
          >
            <div className="w-9 h-9 rounded-full bg-[#411548] text-white flex items-center justify-center shrink-0">
              <Copy size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-purple-300">Message Copied To Clipboard</p>
              <p className="text-xs font-bold text-white">Ready to attach to your card or gift order.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-filled Delivery Location Banner if coming from obituary */}
      {addressParam && (
        <div className="bg-[#1A081D] text-white py-3 px-4 text-center border-b border-[#411548]/40 text-xs font-medium shadow-inner">
          <div className="container mx-auto max-w-5xl flex items-center justify-center gap-2 flex-wrap">
            <span className="bg-[#411548] text-white p-1 rounded-full shrink-0">
              <MapPin size={14} />
            </span>
            <span>
              <strong>Delivering Sympathy Gift To:</strong> {addressParam} {deceasedParam ? `(In memory of ${deceasedParam})` : ''}
            </span>
          </div>
        </div>
      )}

      {/* 1. PAGE HERO — Standardized Brand Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <DoveIcon size={12} variant="white" />
              <span>Compassionate Care • Dependable Support • Peace of Mind</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white leading-tight">
              A Thoughtful Gesture.<br />
              <span className="text-white">A Lasting Comfort.</span>
            </h1>

            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-6">
              When words aren't enough, a thoughtful gift can remind a grieving family that they are remembered, supported, and not alone. Choose a meaningful sympathy gift or floral arrangement to present in remembrance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#featured-gifts"
                className="group inline-flex items-center gap-2 bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer"
              >
                <DoveIcon size={14} variant="hover-white" />
                <span>Shop Sympathy Gifts</span>
              </a>
              <button 
                onClick={() => openCallbackModal('Sympathy Gift Guidance')}
                className="group inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all shadow-lg cursor-pointer"
              >
                <DoveIcon size={14} variant="hover-dark" />
                <span>Need Help Choosing?</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK CATEGORY NAVIGATION */}
      <section className="bg-white py-8 border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-5">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.25em] block mb-1">Explore By Category</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-[#1A081D]">Find a Meaningful Way to Show You Care</h2>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
            {[
              { id: 'All', label: 'All Gifts', icon: '✨' },
              { id: 'Flowers', label: 'Flowers', icon: '🌸' },
              { id: 'Memorial Candles', label: 'Memorial Candles', icon: '🕯️' },
              { id: 'Photo Gifts', label: 'Photo Gifts', icon: '🖼️' },
              { id: 'Plants & Garden', label: 'Plants & Garden', icon: '🌿' },
              { id: 'Keepsakes', label: 'Keepsakes', icon: '💝' },
              { id: 'Sympathy Cards', label: 'Sympathy Cards', icon: '✉️' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const el = document.getElementById('featured-gifts');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#1A081D] text-white shadow-md border-2 border-[#411548]' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED SYMPATHY GIFTS */}
      <section id="featured-gifts" className="py-16 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-1">Hand-Selected Sympathy Expressions</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1A081D] uppercase">Thoughtful Gifts for Difficult Moments</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Each gift is carefully packaged with a personalized card and delivered directly to the family's home or funeral home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGifts.map((gift) => {
              const isSaved = savedWishlist.includes(gift.id);
              return (
                <div 
                  key={gift.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Image & Wishlist Container */}
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img 
                        src={gift.image} 
                        alt={gift.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Badge */}
                      <span className="absolute top-3 left-3 bg-[#1A081D]/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#411548]/40 backdrop-blur-md">
                        {gift.badge}
                      </span>

                      {/* Wishlist Heart Toggle */}
                      <button 
                        onClick={(e) => toggleWishlist(gift.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                          isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-rose-500'
                        }`}
                        title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
                      >
                        <Heart size={16} className={isSaved ? "fill-white" : ""} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                        <Star size={14} className="fill-amber-400" />
                        <span>{gift.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({gift.reviewsCount} reviews)</span>
                      </div>

                      <h3 className="font-serif font-black text-xl text-[#1A081D] mb-2 group-hover:text-[#411548] transition-colors">
                        {gift.name}
                      </h3>

                      <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                        {gift.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & CTA Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Starting From</span>
                      <span className="text-2xl font-serif font-black text-[#1A081D]">${gift.price.toFixed(0)}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        if (gift.isPersonalizable) {
                          const el = document.getElementById('personalize-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          handleAddToCart(gift.name, e);
                        }
                      }}
                      className="bg-[#411548] hover:bg-[#2A0E2E] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>{gift.isPersonalizable ? 'Personalize' : gift.category === 'Flowers' ? 'Send Flowers' : 'View Gift'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SHOP BY PURPOSE */}
      <section className="py-16 px-4 bg-white border-y border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Guided Gift Selection</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A081D] uppercase">What Would You Like Your Gift to Say?</h2>
            <p className="text-xs md:text-sm text-slate-600 font-light mt-2">
              Selecting a sympathy gift can feel overwhelming. Choose the sentiment you wish to express, and let us recommend the perfect tribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Purpose 1 */}
            <div className="bg-[#f0f4f8] rounded-3xl p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="text-3xl mb-3">🌸</div>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-2">"I'm Thinking of You"</h3>
                <p className="text-xs text-slate-600 font-light mb-6">A warm, gentle reminder that the family is surrounded by support during their immediate mourning.</p>
                
                <span className="text-[10px] font-black uppercase tracking-wider text-[#411548] block mb-3">Recommended Gifts:</span>
                <ul className="space-y-2 mb-8 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Sympathy Flowers</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Sympathy Flower Basket</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Peace Lily</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Letterpress Sympathy Card</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Memorial Candle</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('Flowers');
                  const el = document.getElementById('featured-gifts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Thinking of You Gifts</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Purpose 2 */}
            <div className="bg-[#faf5fb] rounded-3xl p-8 border border-purple-200/60 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="text-3xl mb-3">🕯️</div>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-2">"Their Memory Lives On"</h3>
                <p className="text-xs text-slate-600 font-light mb-6">Lasting memorial keepsakes and inscribed items that honor a legacy for years to come.</p>
                
                <span className="text-[10px] font-black uppercase tracking-wider text-[#411548] block mb-3">Recommended Gifts:</span>
                <ul className="space-y-2 mb-8 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Memorial Candle</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Inscribed Photo Frame</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Laser Memorial Plaque</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Engraved Keepsake Box</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Ashes Jewelry & Lockets</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('Memorial Candles');
                  const el = document.getElementById('featured-gifts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Remembrance Gifts</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Purpose 3 */}
            <div className="bg-[#faf5fb] rounded-3xl p-8 border border-purple-200 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-2">"May You Find Peace & Comfort"</h3>
                <p className="text-xs text-slate-600 font-light mb-6">Calming indoor plants, soothing garden stones, and wind chimes designed to bring tranquility.</p>
                
                <span className="text-[10px] font-black uppercase tracking-wider text-[#411548] block mb-3">Recommended Gifts:</span>
                <ul className="space-y-2 mb-8 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Peace Lily</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Memorial Wind Chime</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Garden Stepping Stone</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Memory Angel Figurine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Comfort Care Hamper</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('Plants & Garden');
                  const el = document.getElementById('featured-gifts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Comfort Gifts</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Purpose 4 */}
            <div className="bg-[#faf5fb] rounded-3xl p-8 border border-purple-200 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="text-3xl mb-3">💝</div>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-2">"I Want to Give Something Personal"</h3>
                <p className="text-xs text-slate-600 font-light mb-6">Gifts engraved with names, dates, custom poems, or family portraits for an unforgettable tribute.</p>
                
                <span className="text-[10px] font-black uppercase tracking-wider text-[#411548] block mb-3">Recommended Gifts:</span>
                <ul className="space-y-2 mb-8 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Personalized Memorial Candle</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Engraved Keepsake Box</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Custom Inscribed Photo Frame</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Laser Fingerprint Jewelry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#411548]" /> Hardwood Memorial Plaque</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('personalize-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Personalized Gifts</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYMPATHY GIFT COLLECTIONS */}
      <section className="py-16 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Bundled Comfort & Tribute Bundles</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A081D] uppercase">Thoughtfully Curated Gift Collections</h2>
            <p className="text-xs md:text-sm text-slate-600 font-light mt-2">
              Expressing care is effortless with our pre-coordinated gift sets, combining sentiment, candles, keepsakes, and floral beauty in unified presentation boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* COMFORT COLLECTION */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block mb-4">
                  Simple Support
                </span>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-1">Comfort Collection</h3>
                <p className="text-xs text-slate-500 font-light mb-6">A simple collection for expressing care and support.</p>
                
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-[#1A081D]">$125</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A081D] block mb-2">Includes:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Sympathy card</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Memorial candle</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Small remembrance gift</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Premium gift presentation box</div>
                </div>
              </div>

              <button
                onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Comfort Collection ($125)')}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Comfort</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* REMEMBRANCE COLLECTION ⭐ */}
            <div className="bg-[#1A081D] text-white rounded-3xl p-8 border-2 border-[#411548] shadow-2xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#411548] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-md flex items-center gap-1 border border-purple-400/30">
                <Star size={12} className="fill-white text-white" /> MOST POPULAR CHOICE
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/10 px-3 py-1 rounded-full inline-block mb-4 mt-2">
                  Meaningful Tribute
                </span>
                <h3 className="font-serif font-black text-2xl text-white mb-1">Remembrance Collection</h3>
                <p className="text-xs text-slate-300 font-light mb-6">A meaningful combination designed to honor the memory of a loved one.</p>
                
                <div className="mb-6 pb-6 border-b border-white/15">
                  <span className="text-xs font-bold text-white block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-white">$225</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white block mb-2">Includes:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><CheckCircle2 className="text-white shrink-0" size={16} /> Memorial candle</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><CheckCircle2 className="text-white shrink-0" size={16} /> Inscribed photo frame</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><CheckCircle2 className="text-white shrink-0" size={16} /> Remembrance keepsake</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><CheckCircle2 className="text-white shrink-0" size={16} /> Letterpress sympathy card</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><CheckCircle2 className="text-white shrink-0" size={16} /> Premium gift presentation</div>
                </div>
              </div>

              <button
                onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Remembrance Collection ($225)')}
                className="w-full bg-[#411548] hover:bg-[#5A1E63] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Remembrance ⭐</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* PREMIUM TRIBUTE GIFT */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block mb-4">
                  Complete Gesture
                </span>
                <h3 className="font-serif font-black text-2xl text-[#1A081D] mb-1">Premium Tribute Gift</h3>
                <p className="text-xs text-slate-500 font-light mb-6">A more substantial personalized gift for close family and friends.</p>
                
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-[#1A081D]">$395</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A081D] block mb-2">Includes:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Premium floral arrangement</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Personalized memorial candle</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Premium engraved keepsake</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Inscribed photo frame</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Personalized sympathy card</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Gift presentation</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><CheckCircle2 className="text-[#411548] shrink-0" size={16} /> Delivery within service area</div>
                </div>
              </div>

              <button
                onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Premium Tribute Gift ($395)')}
                className="w-full bg-[#411548] hover:bg-[#2A0E2E] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Premium</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERSONALIZE YOUR GIFT CTA RIBBON */}
      <section id="personalize-section" className="py-12 px-4 bg-gradient-to-r from-[#1A081D] via-[#411548] to-[#1A081D] text-white border-b border-[#411548]">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <DoveIcon size={28} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Laser Engraving & Inscription Studio</span>
              <h2 className="text-2xl md:text-3xl font-serif font-black uppercase text-white">Custom Laser Engraved Gifts & Tributes</h2>
              <p className="text-xs text-slate-200 font-light mt-1">Inscribe deceased name, memory dates, tribute message and signature on plaques, urns, or keepsakes.</p>
            </div>
          </div>
          <button
            onClick={() => openCustomOrderModal('Personalized Tributes', 2)}
            className="bg-white text-[#1A081D] hover:bg-purple-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <DoveIcon size={16} className="text-[#411548]" />
            <span>Open Personalization Studio</span>
          </button>
        </div>
      </section>

      {/* 7. SEND DIRECTLY TO THE FAMILY */}
      <section className="py-16 px-4 bg-gray-50/50 border-b border-slate-200">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Seamless Direct Delivery</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A081D] uppercase mb-4">Send Your Sympathy Gift With Care</h2>
          <p className="text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto mb-12">
            You don't have to attend the service in person to show that you care. Simply select a gift, provide your message, and Middleton handles the rest.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center mb-12">
            {[
              { num: '1', title: 'Choose a gift', desc: 'Select from flowers, candles, or keepsakes' },
              { num: '2', title: 'Add your message', desc: 'Include a custom card or choose a template' },
              { num: '3', title: 'Provide delivery details', desc: 'Funeral home or home address' },
              { num: '4', title: 'Middleton prepares gift', desc: 'Hand-assembled & elegantly wrapped' },
              { num: '5', title: 'Delivered with care', desc: 'Hand-delivered with verification' },
            ].map((step, idx) => (
              <div key={step.num} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative text-center flex flex-col justify-between h-full">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#411548] text-white font-black text-xs flex items-center justify-center mx-auto mb-3">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-xs text-[#1A081D] mb-1">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 font-light">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <a 
            href="#featured-gifts"
            className="inline-flex items-center gap-2 bg-[#411548] hover:bg-[#2A0E2E] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
          >
            <DoveIcon size={16} variant="white" />
            <span>Send a Gift Now</span>
          </a>
        </div>
      </section>

      {/* 8. GIFT DELIVERY CTA RIBBON */}
      <section className="py-12 px-4 bg-[#1A081D] text-white border-b border-[#411548]">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#411548] border border-white/20 flex items-center justify-center shrink-0">
              <DoveIcon size={28} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Reliable Timely Delivery</span>
              <h2 className="text-2xl md:text-3xl font-serif font-black uppercase text-white">Coordinated Direct Funeral & Residence Delivery</h2>
              <p className="text-xs text-slate-200 font-light mt-1">Scheduled express delivery directly to chapel viewings, service locations or family residences.</p>
            </div>
          </div>
          <button
            onClick={() => openCustomOrderModal('Flowers', 3)}
            className="bg-white text-[#1A081D] hover:bg-purple-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <DoveIcon size={16} className="text-[#411548]" />
            <span>Schedule Delivery</span>
          </button>
        </div>
      </section>

      {/* 9. SYMPATHY CARD MESSAGE HELPER CTA RIBBON */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#2A0E2E] via-[#1A081D] to-[#2A0E2E] text-white border-b border-[#411548]">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <DoveIcon size={28} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Card Wording Generator</span>
              <h2 className="text-2xl md:text-3xl font-serif font-black uppercase text-white">Find the Perfect Words of Comfort</h2>
              <p className="text-xs text-slate-200 font-light mt-1">Use our integrated card wording generator to compose heartfelt sympathy messages effortlessly.</p>
            </div>
          </div>
          <button
            onClick={() => openCustomOrderModal('Sympathy Gifts', 2)}
            className="bg-white text-[#1A081D] hover:bg-purple-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <DoveIcon size={16} className="text-[#411548]" />
            <span>Use Wording Generator</span>
          </button>
        </div>
      </section>

      {/* 10. GIFT COMPARISON (COLLAPSIBLE) */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => setIsGiftComparisonOpen(!isGiftComparisonOpen)}
            className="w-full flex items-center justify-between p-6 bg-[#1A081D] text-white rounded-2xl shadow-md cursor-pointer hover:bg-[#2A0E2E] transition-all"
          >
            <div className="flex items-center gap-3 text-left">
              <DoveIcon size={24} variant="white" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Collection Matrix</span>
                <h2 className="text-xl md:text-2xl font-serif font-black uppercase text-white">Compare Sympathy Gift Bundles</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white">
              <span>{isGiftComparisonOpen ? 'Hide Gift Comparison' : 'Expand Gift Comparison'}</span>
              {isGiftComparisonOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          <AnimatePresence>
            {isGiftComparisonOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-x-auto border border-slate-200 rounded-2xl shadow-sm"
              >
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#1A081D] text-white">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/3">Included Item</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5">Comfort<br/><span className="text-white font-normal text-[10px]">$125</span></th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5 bg-[#411548] text-white">Remembrance ⭐<br/><span className="text-white font-normal text-[10px]">$225</span></th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5">Premium<br/><span className="text-white font-normal text-[10px]">$395</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Sympathy card</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Standard</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Letterpress</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Personalized</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Memorial candle</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Standard</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Inscribed</td>
                      <td className="p-4 text-center text-[#411548] font-bold">Premium Inscribed</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Photo frame</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Standard Frame</td>
                      <td className="p-4 text-center text-[#411548] font-bold">Premium Wood Frame</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Keepsake</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Small Keepsake</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Inscribed Box</td>
                      <td className="p-4 text-center text-[#411548] font-bold">Premium Engraved</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Flowers</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 text-slate-400">—</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Premium Spray/Basket</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Personalization</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Inscribed</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Full Laser Inscription</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Gift presentation</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Included</td>
                      <td className="p-4 text-center bg-purple-50/50 text-[#411548] font-bold">✓ Included</td>
                      <td className="p-4 text-center text-[#411548] font-bold">Premium Wrapped</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1A081D]">Delivery</td>
                      <td className="p-4 text-center text-slate-500">Standard Add-on</td>
                      <td className="p-4 text-center bg-purple-50/50 text-slate-500">Standard Add-on</td>
                      <td className="p-4 text-center text-[#411548] font-bold">✓ Included</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="p-4 text-xs uppercase">Starting Price</td>
                      <td className="p-4 text-center text-sm font-serif font-black text-[#1A081D]">$125</td>
                      <td className="p-4 text-center text-sm font-serif font-black bg-purple-100 text-[#1A081D]">$225</td>
                      <td className="p-4 text-center text-sm font-serif font-black text-[#1A081D]">$395</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4">Action</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Comfort Collection ($125)')} 
                          className="bg-[#411548] text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase cursor-pointer hover:bg-[#2A0E2E]"
                        >
                          Choose Comfort
                        </button>
                      </td>
                      <td className="p-4 text-center bg-purple-50/50">
                        <button 
                          onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Remembrance Collection ($225)')} 
                          className="bg-[#411548] text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase cursor-pointer hover:bg-[#2A0E2E]"
                        >
                          Choose Remembrance ⭐
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => openCustomOrderModal('Sympathy Package Bundle', 2, 'Premium Tribute Gift ($395)')} 
                          className="bg-[#411548] text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase cursor-pointer hover:bg-[#2A0E2E]"
                        >
                          Choose Premium
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 11. WHY CHOOSE MIDDLETON? */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#1A081D] to-[#2A0E2E] text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[10px] font-black text-purple-300 uppercase tracking-[0.3em] block mb-2">Our Sympathy Guarantee</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white mb-6">More Than a Gift</h2>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 mb-12">
            <p className="text-sm md:text-base font-serif italic text-purple-100 leading-relaxed">
              "A sympathy gift is more than an item. It says: <br/>
              <strong>'I remember.' 'I care.' 'You are not alone.'</strong>"
            </p>
            <p className="text-[11px] text-slate-300 font-light mt-3">
              Middleton helps you express those sentiments with thoughtfully selected gifts, personalized remembrance items and compassionate delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#411548] text-white flex items-center justify-center mb-4">
                <Heart size={20} />
              </div>
              <h3 className="font-serif font-black text-lg text-white mb-2">Compassionate Care</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">Every order is prepared with utmost sensitivity, high aesthetic standards, and deep respect for the family's grief.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#411548] text-white flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <h3 className="font-serif font-black text-lg text-white mb-2">Dependable Support</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">We're here when you need guidance selecting an appropriate gift based on your relationship and budget.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#411548] text-white flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif font-black text-lg text-white mb-2">Peace of Mind</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">We handle card preparation, wrapping, and direct delivery confirmation so you can send condolences worry-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1A081D] uppercase">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can I send a gift directly to the funeral home?",
                a: "Yes. Where appropriate, gifts can be coordinated for delivery to the funeral service location ahead of visitation or service times.",
                ctaText: "Order Funeral Flowers Now",
                ctaLink: "/flowers"
              },
              {
                q: "Can I send a gift directly to the family?",
                a: "Yes. Select family-home delivery during checkout and provide their residence address for respectful courier delivery.",
                ctaText: "Browse Sympathy Baskets",
                ctaLink: "/flowers"
              },
              {
                q: "Can I personalize a sympathy gift?",
                a: "Yes. Selected candles, frames, keepsakes, jewelry and plaques can be personalized with names, memory dates, and laser-inscribed messages.",
                ctaText: "Order Personalized Keepsakes",
                ctaLink: "/shop"
              },
              {
                q: "Can I include a sympathy message?",
                a: "Yes. You can write your own heartfelt message or choose from our suggested message template helper above.",
                ctaText: "Custom Order Helper",
                ctaLink: "/custom-order"
              },
              {
                q: "Can I order flowers and a gift together?",
                a: "Yes. Our ordering system allows you to combine floral arrangements, memory candles, cards, and keepsakes in a single unified order.",
                ctaText: "Combine Flowers & Keepsakes",
                ctaLink: "/flowers"
              },
              {
                q: "What if I don't know what to send?",
                a: "Use our 'Need Help Choosing?' button or call our director team. We can recommend an appropriate gift based on your relationship with the family and your budget.",
                ctaText: "Call Floral Specialist 24/7",
                ctaLink: "tel:9524862871",
                isExternal: true
              }
            ].map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-[#1A081D] bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="p-5 text-xs text-slate-600 font-light leading-relaxed bg-white border-t border-slate-100 space-y-4">
                      <p>{item.a}</p>
                      <div>
                        {item.isExternal ? (
                          <a
                            href={item.ctaLink}
                            className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
                          >
                            <span>{item.ctaText}</span>
                            <ArrowRight size={12} />
                          </a>
                        ) : (
                          <Link
                            to={item.ctaLink}
                            className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
                          >
                            <span>{item.ctaText}</span>
                            <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. FINAL CALL TO ACTION */}
      <section className="py-20 px-4 bg-[#f8f5fa] text-center border-t border-[#411548]/10">
        <div className="container mx-auto max-w-4xl">
          <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Expressions of Support</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A081D] uppercase mb-4">
            Sometimes, a Small Gesture Means So Much.
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-light max-w-xl mx-auto mb-8">
            Send a thoughtful expression of love, remembrance and support to let the family know they are not alone.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#featured-gifts"
              className="bg-[#411548] hover:bg-[#2A0E2E] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              <Gift size={16} className="text-purple-300" />
              <span>Shop Sympathy Gifts</span>
            </a>

            <button 
              onClick={() => {
                const el = document.getElementById('featured-gifts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#1A081D] hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-slate-300 flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle size={16} />
              <span>Help Me Choose</span>
            </button>

            <button 
              onClick={() => openCallbackModal('Talk to a Director')}
              className="bg-white text-[#1A081D] hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-slate-300 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall size={16} />
              <span>Talk to a Funeral Director</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
