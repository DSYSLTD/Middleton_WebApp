import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PreFooterContact from '../components/PreFooterContact';
import CookieConsent from '../components/CookieConsent';
import CustomIcon from '../components/CustomIcon';

export default function Layout() {
  const location = useLocation();
  const isPrePlanningPage = location.pathname === '/pre-planning';
  const isContactPage = location.pathname === '/contact';
  const isGriefSupportPage = location.pathname === '/grief-support' || location.pathname.startsWith('/grief') || location.pathname === '/join-support-group';
  const isResourcesPage = location.pathname === '/resources' || location.pathname.startsWith('/resources');
  const isShopOrFlowersPage = location.pathname === '/shop' || location.pathname.startsWith('/shop') || location.pathname === '/flowers' || location.pathname.startsWith('/flowers');

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Navbar />
      <main className={`flex-grow ${isShopOrFlowersPage ? '' : 'pb-16 md:pb-0'}`}>
        <Outlet />
      </main>

      {!isPrePlanningPage && (
        <section className="bg-white py-16 border-t border-gray-100">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="bg-[#411548] rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight mb-4 text-white"><span className="text-white">Plan Today.</span> <br/> <span className="text-white">Protect Tomorrow.</span></h2>
                    <p className="text-white/80 font-light text-lg md:text-xl leading-relaxed">
                       Ease future burdens, preserve your wishes, and give your family the gift of clarity and peace of mind with our Smart Pre-Planning Form.
                    </p>
                 </div>
                 <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/book-appointment?step=2&service=Pre-Planning%20Consultation" 
                      className="bg-white text-[#411548] px-8 py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95"
                    >
                       Schedule Appointment <Calendar size={18} />
                    </Link>
                    <Link 
                      to="/pre-planning" 
                      className="bg-white/10 text-white border border-white/20 px-8 py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-md"
                    >
                       Begin Pre-Planning <ArrowRight size={18} />
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      )}

      <PreFooterContact />
      <Footer />
      <CookieConsent />
      
      {/* Mobile Bottom Bar (Legal & Compliance) */}
      {!isContactPage && !isShopOrFlowersPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around z-40 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <Link to="/privacy-policy" className="flex flex-col items-center gap-1 text-[10px] font-bold text-gray-500 text-center">
             <CustomIcon size={18} /> Privacy <br/> policy
          </Link>
          <Link to="/terms" className="flex flex-col items-center gap-1 text-[10px] font-bold text-gray-500 text-center">
             <CustomIcon size={18} /> Terms and <br/> conditions
          </Link>
          <Link to="/regulatory-disclosure" className="flex flex-col items-center gap-1 text-[10px] font-bold text-gray-500 text-center">
             <CustomIcon size={18} /> Regulatory <br/> disclosure
          </Link>
        </div>
      )}
      
      {/* STICKY ACTION (MOBILE UX REPLICA) */}
      {!isContactPage && !isGriefSupportPage && !isResourcesPage && !isShopOrFlowersPage && (
        <div className="fixed bottom-[72px] md:bottom-8 right-6 z-40 flex flex-col space-y-3">
          <Link
            to="/book-appointment"
            className="bg-[#411548] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform border border-purple-300"
            title="Schedule Appointment"
          >
            <Calendar size={18} /> <span className="hidden sm:inline">Schedule Appointment</span>
          </Link>
          <a href="https://wa.me/19524862871" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform text-white self-end">
            <MessageCircle size={24} />
          </a>
          <a href="tel:+19524862871" className="w-12 h-12 bg-black rounded-full shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform text-white self-end">
            <Phone size={20} />
          </a>
        </div>
      )}
    </div>
  );
}
