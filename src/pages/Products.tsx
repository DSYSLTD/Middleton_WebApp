import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight,
  Package,
  Boxes,
  Scroll,
  Flower2,
  Bookmark,
  Gem
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { DRIVE_IMAGES } from '../utils/driveImages';

export default function Products() {
  const categories = [
    {
      title: "Caskets & Coffins",
      icon: <CustomIcon size={20} />,
      items: ["Traditional", "Green", "Custom Crafts"],
      desc: "Elegantly crafted vessels in wood, metal, or eco-friendly materials."
    },
    {
      title: "Urns & Vessels",
      icon: <CustomIcon size={20} />,
      items: ["Decorative", "Biodegradable", "Keepsake"],
      desc: "Beautifully designed urns for burial, display, or scattering."
    },
    {
      title: "Headstones & Monuments",
      icon: <CustomIcon size={20} />,
      items: ["Granite", "Bronze", "Plaques"],
      desc: "Permanent markers that tell a story for a lifetime and beyond."
    },
    {
      title: "Memorial Jewelry",
      icon: <CustomIcon size={20} />,
      items: ["Ash jewelry", "Fingerprint", "Lockets"],
      desc: "Wearable tributes to keep your loved one close to your heart."
    },
    {
      title: "Printed Materials",
      icon: <CustomIcon size={20} />,
      items: ["Programs", "Prayer cards", "Bookmarks"],
      desc: "Beautifully designed stationery to guide and thank attendees."
    },
    {
      title: "Flowers & Sympathy",
      icon: <CustomIcon size={20} />,
      items: ["Wreaths", "Sprays", "Gift baskets"],
      desc: "Floral arrangements from local partners to provide solace."
    },
    {
      title: "Keepsakes",
      icon: <CustomIcon size={20} />,
      items: ["Memory books", "Video tributes", "Display cases"],
      desc: "Individual items to cherish the memory of a unique life."
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-24 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border border-white/20">
              Honoring Life with Quality
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6">
              Meaningful <span className="text-white/70">Memorial Products</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore our curated selection of high-quality products designed to provide a dignified and personalized tribute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="max-w-4xl mx-auto mb-16 rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100">
             <img src={DRIVE_IMAGES.STRATEGIC_5} alt="Commemorative Memorial Items" className="w-full h-80 md:h-96 object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col"
                >
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#411548] mb-8">
                      {cat.icon}
                   </div>
                   <h3 className="text-xl font-bold text-[#411548] mb-4 font-serif">{cat.title}</h3>
                   <p className="text-gray-500 text-sm font-light mb-8 flex-grow leading-relaxed">
                      {cat.desc}
                   </p>
                   <div className="flex flex-wrap gap-2 mb-8">
                      {cat.items.map((item, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 text-gray-400 px-3 py-1 rounded-full border border-gray-100">
                           {item}
                        </span>
                      ))}
                   </div>
                   <Link 
                     to="/shop" 
                     className="inline-flex items-center gap-2 text-[#411548] font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
                   >
                     Browse Marketplace <ArrowRight size={14} />
                   </Link>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Shop Marketplace CTA */}
      <section className="py-24 bg-[#411548] text-white">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-xl text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-6 leading-tight">
                    Our Digital <br/> <span className="text-white/70">Marketplace</span>
                  </h2>
                  <p className="text-white/60 font-light text-lg mb-10">
                     Discover hundreds of additional products from partner artisans. Every purchase contributes back to community bereavement support funds.
                  </p>
                  <Link to="/shop" className="inline-flex items-center gap-3 bg-white text-[#411548] px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-all shadow-xl">
                    Enter Shop <ShoppingBag size={18} />
                  </Link>
               </div>
               <div className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80" alt="Shop" className="w-full h-full object-cover" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
