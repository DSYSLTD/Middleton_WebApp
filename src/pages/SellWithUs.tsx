import React from 'react';
import { motion } from 'motion/react';
import { useModals } from '../context/ModalContext';
import CustomIcon from '../components/CustomIcon';
import { 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  DollarSign,
  Package,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function SellWithUs() {
  const { openVendorAppModal } = useModals();

  return (
    <div className="bg-white min-h-screen">
      {/* Standard Header Hero Banner */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> Middleton Partnership Program
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Grow Your Business With Us
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-8">
              List your flowers, urns, caskets, keepsakes, and commemorative items in our trusted Minnesota marketplace.
            </p>
            <button
              onClick={openVendorAppModal}
              className="inline-flex items-center gap-3 bg-white text-[#411548] px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-2xl cursor-pointer"
            >
              Apply as Vendor <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  title: "Extensive Reach", 
                  desc: "Connect with families actively seeking memorial products, flower arrangements, and commemorative gifts.", 
                  icon: <TrendingUp className="text-[#411548]" /> 
                },
                { 
                  title: "Trusted Platform", 
                  desc: "Leverage Middleton's generational reputation for dignity and excellence in funeral services.", 
                  icon: <ShieldCheck className="text-[#411548]" /> 
                },
                { 
                  title: "Seamless Integration", 
                  desc: "Easy listing tools, secure payments, and a streamlined commission-based model.", 
                  icon: <Store className="text-[#411548]" /> 
                }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-xl transition-all">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                      {benefit.icon}
                   </div>
                   <h3 className="text-xl font-black text-[#411548] mb-4 uppercase tracking-tight">{benefit.title}</h3>
                   <p className="text-gray-500 font-light leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-serif font-black text-[#411548] uppercase tracking-tight text-center mb-20">How The <span className="text-gray-400">Partnership Works</span></h2>
            <div className="space-y-12">
               {[
                 { step: "01", title: "Apply Online", desc: "Submit your multi-step vendor application with details about your products and service area.", icon: <Package size={24} /> },
                 { step: "02", title: "Vetting & Setup", desc: "Our team reviews your portfolio to ensure alignment with our quality standards.", icon: <ShieldCheck size={24} /> },
                 { step: "03", title: "List Products", desc: "Upload your items to our dedicated Flowers or General Shop marketplaces.", icon: <Store size={24} /> },
                 { step: "04", title: "Fulfill Orders", desc: "Receive orders through our platform, fulfill them, and earn your share: Middleton takes a small commission on every sale.", icon: <Truck size={24} /> }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-8 group">
                    <div className="shrink-0">
                       <div className="text-5xl font-serif font-black text-gray-200 group-hover:text-[#411548] transition-colors">{item.step}</div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex-1 flex items-center gap-6 group-hover:shadow-md transition-all">
                       <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-[#411548]">
                          {item.icon}
                       </div>
                       <div>
                          <h3 className="font-bold text-[#411548] mb-1">{item.title}</h3>
                          <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Commission Structure & CTA */}
      <section className="py-24">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-[#411548] rounded-[3rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-4xl font-serif font-black uppercase mb-8">Fair Commission <br/> <span className="text-white">Win-Win Model</span></h2>
                  <p className="text-white font-light text-xl leading-relaxed mb-10">
                     Our commission-based model ensures we only succeed when you do. We provide the infrastructure, marketing, and customer trust required to grow your brand.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                        <DollarSign className="mb-4" />
                        <h4 className="font-bold mb-2">Platform Fee</h4>
                        <p className="text-xs text-white font-light">Small percentage per sale to cover maintenance and hosting.</p>
                     </div>
                     <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                        <Users className="mb-4" />
                        <h4 className="font-bold mb-2">Targeted Marketing</h4>
                        <p className="text-xs text-white font-light">Product placement in relevant obituaries and service pages.</p>
                     </div>
                  </div>
               </div>
               <div className="lg:w-1/2 w-full text-center bg-white/5 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10">
                  <CustomIcon size={48} variant="white" className="mx-auto mb-6" />
                  <h3 className="text-3xl font-serif font-black uppercase mb-4 text-white">Ready to Partner?</h3>
                  <p className="text-white/80 font-light text-base mb-8">
                     Complete our official 3-step partner onboarding application to start listing your memorial products.
                  </p>
                  <button
                    onClick={openVendorAppModal}
                    className="w-full bg-white text-[#411548] py-5 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                     Apply as Vendor <ArrowRight size={18} />
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
