import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import CustomIcon from './CustomIcon';
import TikTokIcon from './TikTokIcon';
import PinterestIcon from './PinterestIcon';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { getSubdomainUrl } from '../utils/subdomain';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-20 border-t-4 border-[#411548]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={HEADER_FOOTER_LOGO} alt="Middleton Funeral Services Logo" className="h-16 w-auto object-contain" referrerPolicy="no-referrer" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#411548] leading-none tracking-tight">MIDDLETON</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-600">Funeral Services</span>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed mb-8 text-gray-600">
              We help you focus on honoring your loved one with care and dignity while offering the
              peace of mind you need during this difficult time.
            </p>
            
            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Sign Up for Our Newsletter</h4>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="flex gap-2">
                  <input type="email" required placeholder="Email address..." className="bg-white border border-gray-200 px-4 py-2 rounded-md w-full text-sm focus:outline-none focus:border-[#411548]" />
                  <button type="submit" className="bg-[#411548] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#300f35] transition-colors whitespace-nowrap">Subscribe</button>
                </div>
                <div className="flex items-start gap-2 mt-1">
                  <input type="checkbox" id="footer-consent" required className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#411548] focus:ring-[#411548] cursor-pointer" />
                  <label htmlFor="footer-consent" className="text-[11px] text-gray-500 font-light leading-snug cursor-pointer">
                    I consent to receiving news and updates in accordance with the <Link to="/privacy-policy" className="underline text-[#411548] font-medium">Privacy Policy</Link>.
                  </label>
                </div>
              </form>
            </div>

            <div className="flex space-x-3.5 flex-wrap gap-y-2">
              <a href="https://www.facebook.com/middletonfuneralservicesllc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#411548] hover:border-[#411548] transition-all" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/middletonfuneralservicesllc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#411548] hover:border-[#411548] transition-all" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@middletonfuneralservices" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#411548] hover:border-[#411548] transition-all" aria-label="TikTok"><TikTokIcon size={18} /></a>
              <a href="https://www.pinterest.com/MiddletonFuneralServices/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#411548] hover:border-[#411548] transition-all" aria-label="Pinterest"><PinterestIcon size={18} /></a>
              <a href="https://www.youtube.com/@Middletonfuneralservicesllc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#411548] hover:border-[#411548] transition-all" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h3 className="font-sans font-bold text-lg text-gray-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'How We Work', path: '/how-we-work' },
                { name: 'Schedule Appointment', path: '/book-appointment' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Burial', path: '/services/burials' },
                { name: 'Cremation', path: '/services/cremation' },
                { name: 'Pre-Planning', path: '/pre-planning' },
                { name: 'Grief Support', path: '/grief-support' },
                { name: 'Join Support Group', path: '/join-support-group' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="flex items-center gap-3 text-gray-500 hover:text-[#411548] text-[11px] transition-colors font-bold uppercase tracking-widest">
                    <CustomIcon size={12} className="opacity-30" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="font-sans font-bold text-lg text-gray-900 mb-6 uppercase tracking-wider text-xs">Resources</h3>
            <ul className="space-y-4 mb-6">
              {[
                { name: 'Educational Downloads & Guides', path: '/resources' },
                { name: 'Careers & Opportunities', path: '/careers' },
                { name: 'FAQ & Help Center', path: '/faq' },
                { name: 'Obituaries', path: '/obituaries' },
                { name: 'Pricing', path: '/prices' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Blog', path: '/blog', subdomain: 'blog' as const },
                { name: 'Sympathy Gifts', path: '/flowers', subdomain: 'sympathygifts' as const },
                { name: 'Memorial Essentials', path: '/shop', subdomain: 'memorialessentials' as const },
                { name: 'Register as Vendor', path: '/sell-with-us' },
                { name: 'Client & Staff Portal', path: '/portal' },
              ].map((link, idx) => {
                const targetUrl = link.subdomain 
                  ? getSubdomainUrl(link.subdomain, link.path)
                  : link.path;
                const isExternal = targetUrl.startsWith('http');

                return (
                  <li key={idx}>
                    {isExternal ? (
                      <a href={targetUrl} className="flex items-center gap-3 text-gray-500 hover:text-[#411548] text-[11px] transition-colors font-bold uppercase tracking-widest">
                        <CustomIcon size={12} className="opacity-30" /> {link.name}
                      </a>
                    ) : (
                      <Link to={targetUrl} className="flex items-center gap-3 text-gray-500 hover:text-[#411548] text-[11px] transition-colors font-bold uppercase tracking-widest">
                        <CustomIcon size={12} className="opacity-30" /> {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <h3 className="font-sans font-bold text-[10px] text-gray-900 mb-3 uppercase tracking-[0.2em] opacity-40">Minnesota Service Areas</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Proudly serving Apple Valley and the surrounding Twin Cities metropolitan area.
            </p>
          </div>

          {/* Contact & Emergency CTA */}
          <div>
            <h3 className="font-sans font-bold text-lg text-gray-900 mb-6">Contact Us</h3>
            <div className="space-y-3 text-[14px] text-gray-600 mb-8">
              <p>
                <strong className="text-gray-900 block mb-1">Location:</strong> 
                14850 Garret Ave.<br/>Apple Valley MN 55124
              </p>
              <p>
                <strong className="text-gray-900 block mb-1">Email:</strong>
                <a href="mailto:inquiries@middletonfunerals.com" className="hover:text-[#411548] hover:underline">inquiries@middletonfunerals.com</a>
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                 <CustomIcon size={16} /> Emergency Contact
               </h4>
               <p className="text-xs text-gray-500 mb-3">Available 24/7 for immediate assistance.</p>
               <a href="tel:+19524862871" className="block text-center bg-[#411548] text-white px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide hover:bg-[#300f35] transition-colors">
                 952 486-2871
               </a>
               <Link to="/book-appointment" className="block text-center bg-transparent border border-gray-300 text-gray-700 mt-2 px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide hover:bg-gray-50 transition-colors">
                 Schedule Appointment
               </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#411548] py-6 pb-20 md:pb-6 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/80 text-xs font-medium tracking-wider">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms and conditions</Link>
              <Link to="/regulatory-disclosure" className="hover:text-white transition-colors">Regulatory disclosure</Link>
            </div>
            <p>
              © {new Date().getFullYear()} Middleton Funeral Services | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
