import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart, 
  Star,
  ArrowRight,
  Package,
  Gift,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Store,
  Layers,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Eye,
  Award,
  MapPin,
  PhoneCall,
  Plus,
  Minus,
  Check,
  HelpCircle,
  QrCode,
  Fingerprint,
  Calendar,
  ShieldCheck,
  FileText,
  Download
} from 'lucide-react';
import { ProductCardSkeleton } from '../components/Skeleton';
import { useModals } from '../context/ModalContext';
import { DoveIcon } from '../components/DoveIcon';
import { MEMORIAL_PRODUCTS, Product } from '../data/memorialProductsData';
import { getPriceListDoc, generatePriceListDocText } from '../data/priceListsData';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  vendor: string;
  tag: string;
  description: string;
  specs: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  // Caskets & Coffins
  {
    id: 1,
    name: "Classic Mahogany Casket",
    price: 3200.00,
    category: "Caskets & Coffins",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 28,
    vendor: "Middleton Foundry",
    tag: "Handcrafted Wood",
    description: "Hand-polished solid mahogany with plush velvet interior lining, brass handles, and customizable memory drawer.",
    specs: "Solid Mahogany • Velvet Interior • Standard 28\" Width",
    inStock: true
  },
  {
    id: 2,
    name: "Royal Sovereign Steel Casket",
    price: 2850.00,
    category: "Caskets & Coffins",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 19,
    vendor: "Sovereign Metals",
    tag: "18-Gauge Steel",
    description: "Durable 18-gauge steel casket featuring rubber gasket seal, satin interior, and brushed champagne finish.",
    specs: "18-Gauge Steel • Sealed Gasket • Satin Lining",
    inStock: true
  },
  {
    id: 3,
    name: "Eco Willow Woven Coffin",
    price: 1450.00,
    category: "Caskets & Coffins",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 14,
    vendor: "Eco-Peace Caskets",
    tag: "100% Biodegradable",
    description: "Sustainably harvested willow, hand-woven with organic unbleached cotton lining. Ideal for green burials.",
    specs: "Natural Willow • Unbleached Cotton • Eco Certified",
    inStock: true
  },

  // Urns & Cremation
  {
    id: 4,
    name: "Biodegradable Earth Urn",
    price: 185.00,
    category: "Urns & Cremation",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 42,
    vendor: "Eco-Peace Urns",
    tag: "Earth Friendly",
    description: "Composed of natural plant fiber and recycled paper, designed to gracefully return to nature during sea or ground burial.",
    specs: "Recycled Plant Fiber • 220 cu in Capacity • Dissolves Safely",
    inStock: true
  },
  {
    id: 5,
    name: "Polished Brass Heritage Urn",
    price: 290.00,
    category: "Urns & Cremation",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 31,
    vendor: "Everlasting Brass",
    tag: "Best Seller",
    description: "Solid brass cremation urn with hand-engraved scrollwork and a secure threaded lid enclosure.",
    specs: "Solid Brass • Threaded Lid • 210 cu in Volume",
    inStock: true
  },
  {
    id: 6,
    name: "Hand-Carved Carrara Marble Urn",
    price: 420.00,
    category: "Urns & Cremation",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 22,
    vendor: "Tuscan Stoneworks",
    tag: "Natural Stone",
    description: "Sculpted from genuine Carrara white marble. Each urn exhibits unique natural veining and timeless beauty.",
    specs: "Natural Carrara Marble • Felt Base • 200 cu in",
    inStock: true
  },

  // Grave & Memorial
  {
    id: 10,
    name: "Granite Memorial Park Bench",
    price: 1500.00,
    category: "Grave & Memorial",
    image: "https://images.unsplash.com/photo-1620336214101-76c2417728ce?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 17,
    vendor: "Granite Arts",
    tag: "Custom Engraved",
    description: "Solid granite memorial bench for cemetery plot or memory garden. Includes up to 3 lines of custom deep engraving.",
    specs: "Solid Polished Granite • 48\" Length • Weatherproof",
    inStock: true
  },
  {
    id: 11,
    name: "Cast Bronze Memorial Marker",
    price: 890.00,
    category: "Grave & Memorial",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 25,
    vendor: "Monumental Bronze",
    tag: "Cemetery Spec",
    description: "Official cemetery-approved cast bronze plaque mounted on a granite base. High-relief lettering and emblem.",
    specs: "24\" x 12\" Cast Bronze • Granite Base • Custom Lettering",
    inStock: true
  },
  {
    id: 12,
    name: "Garden Memory Stepping Stone",
    price: 135.00,
    category: "Grave & Memorial",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 44,
    vendor: "Memory Stones Co.",
    tag: "Home Garden",
    description: "Hand-carved weatherproof stone tablet inscribed with 'Always in Our Hearts' and comforting botanical motifs.",
    specs: "Cast Stone • 12\" Diameter • Indoor/Outdoor",
    inStock: true
  },

  // Keepsakes & Remembrance
  {
    id: 13,
    name: "Silver Ash Keepsake Locket",
    price: 225.00,
    category: "Keepsakes & Remembrance",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 63,
    vendor: "Everlasting Gems",
    tag: "Sterling Silver",
    description: "925 Sterling Silver cremation locket with a discreet inner chamber to preserve a small memory of ashes or hair.",
    specs: ".925 Sterling Silver • 20\" Chain • Funnel Kit Included",
    inStock: true
  },
  {
    id: 14,
    name: "Thumbprint Memorial Pendant",
    price: 195.00,
    category: "Keepsakes & Remembrance",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 37,
    vendor: "Everlasting Gems",
    tag: "Custom Laser Print",
    description: "Personalized pendant laser-etched with your loved one's actual fingerprint and name inscription on the back.",
    specs: "14K Gold Plated / Silver • HD Laser Etch • Includes Chain",
    inStock: true
  },
  {
    id: 15,
    name: "Hand-Blown Crystal Ash Memory Orb",
    price: 160.00,
    category: "Keepsakes & Remembrance",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 19,
    vendor: "Aura Glass Arts",
    tag: "Artisan Glass",
    description: "Solid hand-blown glass sphere infused with a swirling cloud of cremation ash and ethereal celestial colors.",
    specs: "Lead-Free Crystal • 3.5\" Sphere • Wooden LED Stand",
    inStock: true
  },

  // Funeral Décor
  {
    id: 16,
    name: "Velvet Casket Throw & Drapes",
    price: 350.00,
    category: "Funeral Décor",
    image: "https://images.unsplash.com/photo-1473216016654-e0696328310c?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewsCount: 15,
    vendor: "Soft Rest Textiles",
    tag: "Ceremonial Weave",
    description: "Rich burgundy velvet casket drape edged with metallic gold tassels. Adds warmth and dignity to viewing services.",
    specs: "Plush Velvet • Gold Fringe • Standard Casket Size",
    inStock: true
  },
  {
    id: 17,
    name: "Brass Altar Candlestick Set",
    price: 240.00,
    category: "Funeral Décor",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 21,
    vendor: "Altar Craft Co.",
    tag: "Pair Included",
    description: "Heavy solid brass floor candlesticks designed for sanctuary, chapel, or home vigil viewing settings.",
    specs: "Solid Brass • 36\" Height • Fits Standard Candles",
    inStock: true
  },

  // Tribute Accessories
  {
    id: 18,
    name: "Ceremonial White Silk Gloves Set",
    price: 45.00,
    category: "Tribute Accessories",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 33,
    vendor: "Middleton Logistics",
    tag: "Pallbearer Pack",
    description: "Pack of 6 pairs of formal white silk gloves for pallbearers and ceremonial attendants.",
    specs: "6 Pairs Included • 100% Breathable Silk • Stretch Fit",
    inStock: true
  },
  {
    id: 19,
    name: "Leatherbound Guest Registry Book",
    price: 65.00,
    category: "Tribute Accessories",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 48,
    vendor: "Middleton Publishing",
    tag: "Archival Quality",
    description: "Hardcover memorial guest register with acid-free archival paper, ribbon bookmark, and family history pages.",
    specs: "Genuine Leather • 120 Pages • Gold Details",
    inStock: true
  },
  {
    id: 20,
    name: "Embroidered Velvet Urn Bag",
    price: 40.00,
    category: "Tribute Accessories",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 26,
    vendor: "Soft Rest Textiles",
    tag: "Protection Sleeve",
    description: "Heavy velvet drawstring pouch designed to protect urns during transport and storage.",
    specs: "Soft Velvet • Satin Drawstring • Fits Standard Urns",
    inStock: true
  }
];

interface CustomBuildItem {
  id: string;
  name: string;
  category: 'Flowers' | 'Personalized Tributes' | 'Remembrance Keepsakes' | 'Memorial Décor' | 'Tribute Accessories';
  price: number;
  desc: string;
}

const CUSTOM_BUILD_ITEMS: CustomBuildItem[] = [
  // Flowers
  { id: 'f1', name: 'Casket Floral Spray', category: 'Flowers', price: 350, desc: 'Fresh lily and rose arrangement designed for casket placement.' },
  { id: 'f2', name: 'Standing Funeral Spray', category: 'Flowers', price: 195, desc: 'Easel-mounted standing spray with fresh seasonal blooms.' },
  { id: 'f3', name: 'Memorial Table Arrangement', category: 'Flowers', price: 95, desc: 'Low-profile centerpiece for guestbook or photo display tables.' },
  { id: 'f4', name: 'Sympathy Flower Basket', category: 'Flowers', price: 75, desc: 'Hand-tied sympathy basket with fresh blooms and greenery.' },
  
  // Personalized Tributes
  { id: 'p1', name: 'Personalized Memorial Candle', category: 'Personalized Tributes', price: 45, desc: 'Custom soy pillar candle with printed photo & memorial dates.' },
  { id: 'p2', name: 'Custom Photo Frame', category: 'Personalized Tributes', price: 65, desc: 'Solid wood memorial frame with engraved name and dates.' },
  { id: 'p3', name: 'Custom Tribute Signage', category: 'Personalized Tributes', price: 85, desc: 'Easel-mounted welcome board with photo and order of service.' },
  { id: 'p4', name: 'Memorial Folders / Programs (Pack of 50)', category: 'Personalized Tributes', price: 95, desc: 'Full-color folded order of service programs with biography.' },

  // Remembrance Keepsakes
  { id: 'k1', name: 'Engraved Memorial Locket', category: 'Remembrance Keepsakes', price: 195, desc: 'Sterling silver locket for small keepsake or laser fingerprint.' },
  { id: 'k2', name: 'Miniature Keepsake Urn', category: 'Remembrance Keepsakes', price: 120, desc: 'Handcrafted mini urn for sharing memories among family.' },
  { id: 'k3', name: 'Hand-Blown Glass Memory Orb', category: 'Remembrance Keepsakes', price: 160, desc: 'Artisan crystal sphere infused with swirling memory colors.' },
  { id: 'k4', name: 'Laser Thumbprint Pendant', category: 'Remembrance Keepsakes', price: 185, desc: 'Etched fingerprint pendant on 20-inch silver chain.' },

  // Memorial Décor
  { id: 'd1', name: 'Memorial Table Arrangement Set', category: 'Memorial Décor', price: 150, desc: 'Matching table runner, candle pedestals, and floral accents.' },
  { id: 'd2', name: 'Altar Candle Display Set', category: 'Memorial Décor', price: 85, desc: 'Pair of brass floor pedestals with long-burning vigil tapers.' },
  { id: 'd3', name: 'Ceremonial Memorial Backdrop', category: 'Memorial Décor', price: 250, desc: 'Plush velvet backdrop curtain frame for memorial photo display.' },
  { id: 'd4', name: 'Display Easel & Wooden Stand', category: 'Memorial Décor', price: 40, desc: 'Sturdy mahogany display easel for tribute portraits and sprays.' },

  // Tribute Accessories
  { id: 'a1', name: 'Leatherbound Memorial Guest Book', category: 'Tribute Accessories', price: 65, desc: 'Archival leather register book with gold-foil lettering.' },
  { id: 'a2', name: 'Prayer Cards (Pack of 100)', category: 'Tribute Accessories', price: 50, desc: 'Laminated prayer cards with customized poem and photograph.' },
  { id: 'a3', name: 'Tribute QR-Code Card', category: 'Tribute Accessories', price: 35, desc: 'Scannable acrylic display linking directly to digital memorial.' },
  { id: 'a4', name: 'Ceremonial Silk Gloves (Pack of 6)', category: 'Tribute Accessories', price: 45, desc: 'Formal white silk gloves for ceremonial attendants.' }
];

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const addressParam = searchParams.get('address');
  const deceasedParam = searchParams.get('deceased');

  const { openCallbackModal, openCustomOrderModal } = useModals();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Custom Build Your Own Tribute Quantities State
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});
  const [selectedPackageModal, setSelectedPackageModal] = useState<'Essential' | 'Standard' | 'Premium' | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortBy]);

  const categoriesList = ["All", "Grave & Memorial", "Keepsakes & Remembrance", "Funeral Décor", "Tribute Accessories"];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.id - b.id;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (productName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedToast(productName);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("marketplace-catalog");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom Build Item Counter Handlers
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCustomQuantities(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Compute live custom tribute total
  const calculatedCustomTotal = CUSTOM_BUILD_ITEMS.reduce((sum, item) => {
    const qty = customQuantities[item.id] || 0;
    return sum + (item.price * qty);
  }, 0);

  const totalSelectedCustomItemsCount = (Object.values(customQuantities) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleCustomBuildSubmit = () => {
    if (totalSelectedCustomItemsCount === 0) {
      alert("Please select at least one item using the [+] buttons before proceeding.");
      return;
    }
    openCustomOrderModal();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#411548] text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-purple-200">Added To Cart</p>
              <p className="text-xs font-bold text-white line-clamp-1">{addedToast}</p>
            </div>
            <button onClick={() => setAddedToast(null)} className="ml-2 text-white/60 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 01 — HERO SECTION — Standardized Brand Hero */}
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
              <span>Thoughtful Tributes • Meaningful Remembrance</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white leading-tight">
              Thoughtful Tributes.<br />
              <span className="text-white">Meaningful Remembrance.</span>
            </h1>

            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Choose a tribute package that reflects your loved one and your family's wishes. Each package combines carefully selected flowers, remembrance items, memorial décor, and tribute accessories.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/custom-order?category=Sympathy+Package+Bundle"
                className="group inline-flex items-center gap-2 bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer"
              >
                <DoveIcon size={14} variant="hover-white" />
                <span>Choose Your Package</span>
              </Link>
              <button 
                onClick={() => openCallbackModal()}
                className="group inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#411548] transition-all shadow-lg cursor-pointer"
              >
                <DoveIcon size={14} variant="hover-dark" />
                <span>Talk to a Funeral Director</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auto-filled Delivery Address Banner */}
      {addressParam && (
        <div className="bg-[#2A0E2E] text-white py-3 px-4 text-center border-b border-purple-900 font-medium text-xs shadow-inner">
          <div className="container mx-auto max-w-5xl flex items-center justify-center gap-2 flex-wrap">
            <span className="bg-white text-[#411548] p-1 rounded-full shrink-0">
              <MapPin size={14} />
            </span>
            <span>
              <strong>Auto-filled Delivery Address:</strong> {addressParam} {deceasedParam ? `(Service / Residence location for ${deceasedParam})` : ''}
            </span>
          </div>
        </div>
      )}

      {/* Sympathy Gifts & Flowers Quick Switch Banner */}
      <div className="bg-purple-50 border-b border-purple-200 py-3.5 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#411548] text-white flex items-center justify-center shrink-0 shadow-sm">
              <DoveIcon size={20} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] block">Looking for Sympathy Gifts & Condolence Hampers?</span>
              <p className="text-xs text-slate-700 font-medium">Standing wreaths, casket sprays, condolence gift hampers, and personalized keepsakes are on our dedicated Sympathy Gifts page.</p>
            </div>
          </div>
          <Link
            to="/flowers"
            className="bg-[#411548] text-white hover:bg-black px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>View Sympathy Gifts</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 02 — PACKAGE SELECTOR CARDS */}
      <section id="package-cards" className="py-16 bg-gray-50/50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Curated Remembrance Packages</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase">Find The Right Tribute For Your Family</h2>
            <p className="text-xs md:text-sm text-slate-600 font-light max-w-xl mx-auto mt-2">
              Select a pre-configured package or build your own tribute item by item below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="package-cards">
            {/* ESSENTIAL TRIBUTE PACKAGE */}
            <div className="bg-white rounded-[2rem] border-2 border-slate-200 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mb-4">
                  Simple • Dignified • Meaningful
                </span>
                <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-1">ESSENTIAL TRIBUTE</h3>
                <p className="text-xs text-slate-500 font-light mb-6">Designed for families who want a beautiful tribute without extensive décor.</p>
                
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-[#411548]">$299</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] block mb-2">Key Package Features:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Check className="text-[#411548] shrink-0" size={16} /> 1 Standard Sympathy Floral Arrangement</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Check className="text-[#411548] shrink-0" size={16} /> Memorial Candle & Photo Frame</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Check className="text-[#411548] shrink-0" size={16} /> 1 Standard Memorial Keepsake</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Check className="text-[#411548] shrink-0" size={16} /> Prayer Cards & Bookmarks</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Check className="text-[#411548] shrink-0" size={16} /> Basic Presentation & Setup</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openCustomOrderModal('Essential Tribute Package ($299)', 2)}
                  className="w-full bg-[#411548] hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Choose Essential</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedPackageModal('Essential')}
                  className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-[#411548] py-1 cursor-pointer"
                >
                  View Full Package Inclusions →
                </button>
              </div>
            </div>

            {/* STANDARD TRIBUTE PACKAGE ⭐ */}
            <div className="bg-purple-50/70 rounded-[2rem] border-2 border-[#411548] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#411548] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Star size={12} className="fill-white text-white" /> MOST POPULAR CHOICE
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] bg-purple-100 px-3 py-1 rounded-full inline-block mb-4 mt-2">
                  Fuller Memorial Experience
                </span>
                <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-1">STANDARD TRIBUTE</h3>
                <p className="text-xs text-slate-600 font-light mb-6">Combining flowers, personalization, keepsakes and coordinated décor.</p>
                
                <div className="mb-6 pb-6 border-b border-purple-200">
                  <span className="text-xs font-bold text-purple-900 block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-[#411548]">$699</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] block mb-2">Key Package Features:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> Standard Casket or Standing Spray</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> Personalized Candle & Photo Frame</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> 1 Premium Keepsake & Guest Book</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> Memorial Table Arrangement & Easel</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> Tribute QR-Code Card & Digital Page</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900"><Check className="text-[#411548] shrink-0" size={16} /> Dedicated Tribute Consultation</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openCustomOrderModal('Standard Tribute Package ($699)', 2)}
                  className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Choose Standard ⭐</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedPackageModal('Standard')}
                  className="w-full text-center text-[10px] font-bold text-[#411548] hover:text-black py-1 cursor-pointer"
                >
                  View Full Package Inclusions →
                </button>
              </div>
            </div>

            {/* PREMIUM TRIBUTE PACKAGE */}
            <div className="bg-[#411548] text-white rounded-[2rem] border-2 border-purple-950 p-6 md:p-8 flex flex-col justify-between shadow-xl relative">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/10 px-3 py-1 rounded-full inline-block mb-4">
                  A Complete Celebration of Life
                </span>
                <h3 className="text-2xl font-serif font-black text-white uppercase mb-1">PREMIUM TRIBUTE</h3>
                <p className="text-xs text-white/80 font-light mb-6">Our most comprehensive tribute package for a fully personalized memorial.</p>
                
                <div className="mb-6 pb-6 border-b border-white/20">
                  <span className="text-xs font-bold text-white block uppercase">Starting From</span>
                  <span className="text-4xl font-serif font-black text-white">$1,499</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white block mb-2">Key Package Features:</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> Premium Casket Spray OR Large Spray</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> Premium Personalized Candle & Signage</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> 2 Premium Keepsakes OR Jewelry</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> Ceremonial Memorial Backdrop</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> Coordinated Guest-Book Table & Easels</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white"><Check className="text-white shrink-0" size={16} /> Full Setup & Family Review</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openCustomOrderModal('Premium Tribute Package ($1,499)', 2)}
                  className="w-full bg-white text-[#411548] hover:bg-purple-100 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Choose Premium</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setSelectedPackageModal('Premium')}
                  className="w-full text-center text-[10px] font-bold text-white hover:text-[#e0c3fc] py-1 cursor-pointer"
                >
                  View Full Package Inclusions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — DETAILED SIDE-BY-SIDE COMPARISON TABLE (COLLAPSIBLE) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <button
            onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            className="w-full flex items-center justify-between p-6 bg-[#411548] text-white rounded-2xl shadow-md cursor-pointer hover:bg-black transition-all"
          >
            <div className="flex items-center gap-3 text-left">
              <DoveIcon size={24} variant="white" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Package Comparison</span>
                <h2 className="text-xl md:text-2xl font-serif font-black uppercase text-white">Compare What's Included Across Packages</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white">
              <span>{isComparisonOpen ? 'Hide Full Comparison' : 'Expand Package Comparison'}</span>
              {isComparisonOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          <AnimatePresence>
            {isComparisonOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-x-auto border border-slate-200 rounded-2xl shadow-sm"
              >
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#411548] text-white">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/3">Included Feature</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5">Essential<br/><span className="text-white font-normal text-[10px]">$299</span></th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5 bg-purple-900 text-white">Standard ⭐<br/><span className="text-white font-normal text-[10px]">$699</span></th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-center w-1/5">Premium<br/><span className="text-white font-normal text-[10px]">$1,499</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#411548]">Funeral floral arrangement</td>
                      <td className="p-4 text-center">✓ (Standard)</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ (Casket / Standing)</td>
                      <td className="p-4 text-center font-bold">✓ (Premium Spray)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Sympathy / tribute flowers</td>
                      <td className="p-4 text-center text-slate-500">Basic</td>
                      <td className="p-4 text-center bg-purple-50/50">Standard Coordinated</td>
                      <td className="p-4 text-center font-bold text-[#411548]">Premium Selection</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial candle</td>
                      <td className="p-4 text-center">✓ Standard</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Personalized</td>
                      <td className="p-4 text-center font-bold">✓ Premium Personalized</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial photo frame</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Standard</td>
                      <td className="p-4 text-center font-bold">✓ Premium Wood Frame</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#411548]">Memorial keepsake</td>
                      <td className="p-4 text-center">1 Item</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">1 Premium Keepsake</td>
                      <td className="p-4 text-center font-bold text-[#411548]">2 Keepsakes or Jewelry</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Personalized memorial item</td>
                      <td className="p-4 text-center text-slate-500">Basic</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Custom Inscribed</td>
                      <td className="p-4 text-center font-bold">✓ Premium Custom</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial photo display</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold">✓ Custom Display Set</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial guest book</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold text-[#411548]">Premium Leatherbound</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial décor</td>
                      <td className="p-4 text-center text-slate-500">Basic</td>
                      <td className="p-4 text-center bg-purple-50/50">Standard Table Set</td>
                      <td className="p-4 text-center font-bold">Premium Table & Centerpiece</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial table arrangement</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#411548]">Memorial backdrop</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 text-slate-400">—</td>
                      <td className="p-4 text-center font-bold text-[#411548]">✓ Plush Velvet Frame</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Prayer cards & Bookmarks</td>
                      <td className="p-4 text-center">✓ Included</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold">✓ Premium Personalized</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Memorial folders / programs</td>
                      <td className="p-4 text-center text-slate-500">Basic Folders</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Customized</td>
                      <td className="p-4 text-center font-bold text-[#411548]">Premium Custom Booklet</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Tribute QR-code card</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Setup & presentation</td>
                      <td className="p-4 text-center text-slate-500">Basic Setup</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Full Setup</td>
                      <td className="p-4 text-center font-bold text-[#411548]">Premium Setup & Review</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4">Personalization consultation</td>
                      <td className="p-4 text-center">✓ Included</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#411548]">Dedicated tribute planning</td>
                      <td className="p-4 text-center text-slate-400">—</td>
                      <td className="p-4 text-center bg-purple-50/50 font-bold text-[#411548]">✓ Included</td>
                      <td className="p-4 text-center font-bold text-[#411548]">✓ Dedicated Director</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="p-4 text-xs uppercase">Best for</td>
                      <td className="p-4 text-center text-[11px] text-slate-600">Simple, dignified remembrance</td>
                      <td className="p-4 text-center text-[11px] bg-purple-100/70 text-[#411548]">Most families</td>
                      <td className="p-4 text-center text-[11px] text-[#411548]">Full, elevated tribute</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 04 — TAILORED FLEXIBILITY CTA RIBBON */}
      <section id="build-your-own" className="py-12 bg-gradient-to-r from-[#1A081D] via-[#411548] to-[#1A081D] text-white border-b border-[#411548]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <DoveIcon size={28} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white block">Tailored Flexibility</span>
              <h2 className="text-2xl md:text-3xl font-serif font-black uppercase text-white">Need Something Unique or Custom?</h2>
              <p className="text-xs text-slate-200 font-light mt-1">Combine sympathy gifts, flowers, laser-engraved plaques, and memorial essentials into a custom package.</p>
            </div>
          </div>
          <button
            onClick={() => openCustomOrderModal('Sympathy Package Bundle', 1)}
            className="bg-white text-[#1A081D] hover:bg-purple-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <DoveIcon size={16} className="text-[#411548]" />
            <span>Custom Tribute & Personalization Form</span>
          </button>
        </div>
      </section>

      {/* 05 — PERSONALIZATION HIGHLIGHT */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Custom Inscriptions & Details</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#411548] uppercase">Make It Uniquely Theirs</h2>
            <p className="text-xs text-slate-600 font-light mt-2">
              Every tribute package includes specialized options for custom engraving, biography printing, photo touch-ups, and scannable digital memorial portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FileText size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase mb-2">Laser Inscription</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Precision laser etching of names, poems, scripture, and actual handwritten signatures on marble, brass, or wood.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <QrCode size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase mb-2">Tribute QR Portal</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Acrylic table cards embedded with a QR code linking guests directly to the online memorial video and guestbook.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Fingerprint size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase mb-2">Laser Fingerprint</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Capturing exact thumbprint ridges cast into sterling silver jewelry, pendants, and keepsake orbs.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Calendar size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase mb-2">Same-Day Printing</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                In-house high-resolution printing for custom prayer cards, bookmarks, and full-color memorial programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CASKETS, COFFINS & CREMATION URNS CTA RIBBON */}
      <div className="bg-[#2A0E2E] text-white py-8 px-4 border-b border-purple-900 shadow-md">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 shadow-sm">
              <DoveIcon size={24} variant="white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white block">Looking for Caskets, Coffins & Cremation Urns?</span>
              <h4 className="text-xl font-serif font-black text-white uppercase">Casket & Urn Specifications & Pricing</h4>
              <p className="text-xs text-slate-300 font-light mt-1">View solid mahogany caskets, 18-gauge steel vaults, Carrara marble urns, and eco-willow coffins.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/prices"
              className="bg-white text-[#411548] hover:bg-purple-100 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <span>View Pricing Catalog</span>
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => openCustomOrderModal('Caskets & Urns Inquiry')}
              className="bg-white/10 text-white hover:bg-white hover:text-[#411548] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
            >
              Request Custom Proof
            </button>
          </div>
        </div>
      </div>

      {/* 07 — STANDALONE MARKETPLACE PRODUCTS CATALOG */}
      <section id="marketplace-catalog" className="py-16 bg-gray-50/50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-1">Individual Merchandise Catalog</span>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase">Browse Individual Memorial Items</h2>
              <p className="text-xs text-slate-500 font-light">Select standalone grave markers, keepsake urns, memorial accessories, and tribute décor.</p>
            </div>

            <button
              onClick={() => openCustomOrderModal('Custom Item Inscription', 2)}
              className="bg-[#411548] text-white hover:bg-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm shrink-0 flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <DoveIcon size={14} variant="white" />
              <span>Laser Inscription Studio</span>
            </button>
          </div>

          {/* Category Navigation Buttons */}
          <div className="flex justify-center mb-6">
            <div className="bg-purple-50/80 p-2 rounded-2xl border border-purple-200/80 shadow-sm inline-flex flex-wrap items-center justify-center gap-2 max-w-full">
              {categoriesList.map((cat) => {
                const count = cat === "All" 
                  ? PRODUCTS.length 
                  : PRODUCTS.filter(p => p.category === cat).length;
                const isActive = activeCategory === cat;
                
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? "bg-[#411548] text-white shadow-md scale-105" 
                        : "bg-white text-slate-700 hover:bg-purple-100/60 border border-slate-200"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-purple-100 text-[#411548]"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#411548] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Pagination summary & Sort */}
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Page {currentPage} of {totalPages} ({filteredProducts.length} items)
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 outline-none focus:border-[#411548] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8">
              <ShoppingBag size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Products Found</h3>
              <p className="text-xs text-slate-500 mb-4">Try clearing your search query or choosing another category.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="bg-[#411548] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-[#411548]/40 transition-all duration-200 group"
                >
                  <div>
                    {/* Image Box */}
                    <div 
                      className="aspect-[4/3] relative overflow-hidden bg-slate-50 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-3 left-3 bg-[#411548] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                        {product.tag}
                      </span>

                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white text-[#411548] rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-black text-[#411548] uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold">{product.vendor}</span>
                      </div>

                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm font-bold text-slate-900 hover:text-[#411548] cursor-pointer transition-colors leading-snug line-clamp-1 mb-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-500 font-light line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            className={i < Math.floor(product.rating) ? "fill-[#411548] text-[#411548]" : "text-slate-200"} 
                          />
                        ))}
                        <span className="text-[10px] font-bold text-slate-400 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 pt-0 border-t border-slate-50 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-base font-serif font-black text-[#411548]">
                      ${product.price.toFixed(2)}
                    </span>

                    <button 
                      onClick={(e) => handleAddToCart(product.name, e)}
                      className="bg-[#411548] text-white hover:bg-black px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart size={12} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#411548] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={14} /> Prev
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#411548] text-white shadow-md"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#411548] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 07 — FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-1">Helpful Information</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#411548]" />
                Can I customize items within the pre-set tribute packages?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                Yes. While our Essential, Standard, and Premium packages are carefully curated for convenience and package savings, any package can be adjusted with add-ons or floral substitutions during your director consultation.
              </p>
              <Link
                to="/custom-order"
                className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
              >
                <span>Request Custom Package Order</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#411548]" />
                How quickly can tribute packages and personalized items be delivered?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                Standard printed materials, personalized candles, and floral sprays can be prepared within 24 to 48 hours for direct delivery to funeral chapels, churches, or cemetery pavilions across Apple Valley and the Twin Cities metro area.
              </p>
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
              >
                <span>Schedule Urgent Delivery Consultation</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#411548]" />
                What happens to the memorial décor and display items after the service?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                All keepsakes, guest books, photo frames, candles, and personalized signage are packed in protective transport sleeves for your family to take home and preserve permanently.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
              >
                <span>Explore Memorial Keepsakes</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#411548]" />
                Can we set up the tribute display at our church or external venue?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                Yes. Our team handles complete transport, setup, and presentation at funeral chapels, churches, cemetery pavilions, or private reception venues.
              </p>
              <Link
                to="/services/venues"
                className="inline-flex items-center gap-2 bg-[#411548] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-md"
              >
                <span>Explore Venue Setup Options</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — FINAL DIRECTOR CTA SECTION */}
      <section className="py-16 bg-[#411548] text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-200 block mb-2">
            Compassionate Care • Dependable Support • Peace of Mind
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-4 text-white">
            You Don't Have to Plan Everything Alone.
          </h2>
          <p className="text-white/85 font-light text-xs md:text-sm mb-8 leading-relaxed max-w-xl mx-auto">
            Our funeral directors are here to help you choose the right tribute package for your family, assist with customization, and coordinate delivery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => openCallbackModal()}
              className="bg-white text-[#411548] hover:bg-purple-100 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer"
            >
              Talk to a Funeral Director
            </button>
            <a 
              href="#package-cards"
              className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all"
            >
              Explore Tribute Options
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center z-10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-slate-100 relative aspect-square md:aspect-auto">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#411548] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
                    {selectedProduct.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#411548] uppercase tracking-widest bg-purple-100 px-2.5 py-1 rounded-md inline-block mb-2">
                      {selectedProduct.category}
                    </span>

                    <h3 className="text-xl font-serif font-black text-[#411548] uppercase mb-2 leading-tight">
                      {selectedProduct.name}
                    </h3>

                    <div className="text-2xl font-serif font-black text-[#411548] mb-4">
                      ${selectedProduct.price.toFixed(2)}
                    </div>

                    <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                      {selectedProduct.description}
                    </p>

                    <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 mb-4">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#411548] block mb-1">Specifications</span>
                      <p className="text-xs text-slate-700 font-mono">{selectedProduct.specs}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedProduct.name);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-[#411548] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer"
                    >
                      <ShoppingCart size={14} /> Add To Order
                    </button>
                    <button
                      onClick={() => {
                        const name = selectedProduct.name;
                        setSelectedProduct(null);
                        openCustomOrderModal('Personalized Tributes', 2, `Product: ${name}`);
                      }}
                      className="w-full bg-slate-100 text-slate-900 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center block hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      Request Custom Inscription
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-slate-200 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedPackageModal(null)}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] bg-purple-100 px-3 py-1 rounded-full inline-block mb-2">
                  Official Tribute Package Details
                </span>
                <h3 className="text-3xl font-serif font-black text-[#411548] uppercase">
                  {selectedPackageModal} Tribute Package
                </h3>
                <span className="text-2xl font-serif font-black text-[#411548] block mt-1">
                  {selectedPackageModal === 'Essential' ? '$299' : selectedPackageModal === 'Standard' ? '$699' : '$1,499'}
                </span>
              </div>

              {selectedPackageModal === 'Essential' && (
                <div className="space-y-6 text-xs text-slate-700">
                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Flowers Included</h4>
                    <p className="text-slate-600">1 standard sympathy or memorial floral arrangement with choice of selected flower colors and basic presentation.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Remembrance & Printed Tributes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>1 memorial candle</li>
                      <li>1 standard memorial keepsake</li>
                      <li>1 memorial photo frame</li>
                      <li>Prayer cards & memorial bookmarks</li>
                      <li>Basic memorial folders/programs</li>
                      <li>Memorial ribbon pins & basic tribute card</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Service & Upgrades</h4>
                    <p className="text-slate-600 mb-2">Basic arrangement and presentation with director consultation.</p>
                    <p className="text-slate-500 font-light italic">Optional upgrades: Larger floral arrangements, personalized candles, engraved keepsakes, additional photographs, and premium memorial décor.</p>
                  </div>
                </div>
              )}

              {selectedPackageModal === 'Standard' && (
                <div className="space-y-6 text-xs text-slate-700">
                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Flowers & Personalization Included</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>1 standard casket or standing floral arrangement + coordinated sympathy flowers</li>
                      <li>Personalized memorial candle & photo frame</li>
                      <li>Memorial photo display</li>
                      <li>Customized memorial folders/programs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Remembrance, Décor & Accessories</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>1 premium keepsake & memorial guest book</li>
                      <li>Memorial thank-you cards</li>
                      <li>Memorial table arrangement & candle display set</li>
                      <li>Display easel & stand</li>
                      <li>Prayer cards, bookmarks, ribbon pins</li>
                      <li>Tribute QR-code card linking to online memorial</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Service & Consultation</h4>
                    <p className="text-slate-600">Tribute planning consultation, personalized design consultation, setup and presentation.</p>
                  </div>
                </div>
              )}

              {selectedPackageModal === 'Premium' && (
                <div className="space-y-6 text-xs text-slate-700">
                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Premium Flowers & Tributes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Premium casket spray OR large standing spray + coordinated sympathy florals</li>
                      <li>Custom flower color / theme selection</li>
                      <li>Premium personalized candle & photo frame</li>
                      <li>Custom photo display & tribute signage</li>
                      <li>Personalized memorial folders/booklets</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Keepsakes, Décor & Accessories</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>2 premium remembrance keepsakes</li>
                      <li>Memorial jewelry OR premium keepsake urn</li>
                      <li>Engraved remembrance item</li>
                      <li>Premium memorial table set & floral centerpiece</li>
                      <li>Ceremonial memorial backdrop & candle display</li>
                      <li>Coordinated guest-book table & display easels</li>
                      <li>Premium prayer cards, bookmarks, ribbon pins, thank-you cards</li>
                      <li>Tribute QR-code cards</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#411548] uppercase mb-2">Enhanced Service & Family Review</h4>
                    <p className="text-slate-600">Dedicated tribute planning consultation, personalization/design consultation, coordinated setup, memorial presentation assistance, and family review prior to final production.</p>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    const pkg = selectedPackageModal;
                    setSelectedPackageModal(null);
                    openCustomOrderModal(`${pkg} Tribute Package`, 2);
                  }}
                  className="flex-1 bg-[#411548] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-md cursor-pointer"
                >
                  Confirm & Request Package
                </button>
                <button
                  onClick={() => setSelectedPackageModal(null)}
                  className="bg-slate-100 text-slate-700 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
