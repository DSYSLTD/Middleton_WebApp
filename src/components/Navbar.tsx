import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomIcon from './CustomIcon';
import TikTokIcon from './TikTokIcon';
import PinterestIcon from './PinterestIcon';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { ChevronDown, User, LogIn, ShoppingBag, Gift, Package, Store, Facebook, Instagram, Youtube, Calendar, MapPin } from 'lucide-react';
import { getSubdomainUrl } from '../utils/subdomain';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTopShopOpen, setIsTopShopOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);

  // Close top shop dropdown upon outside click or scroll, keeping it visible otherwise
  useEffect(() => {
    if (!isTopShopOpen) return;

    const handleScroll = (event: Event) => {
      if (shopMenuRef.current && event.target && shopMenuRef.current.contains(event.target as Node)) {
        return;
      }
      setIsTopShopOpen(false);
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target as Node)) {
        setIsTopShopOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTopShopOpen]);

  useEffect(() => {
    setIsTopShopOpen(false);
  }, [location.pathname]);

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      path: '/about',
      hasDropdown: true,
      subItems: [
        { name: 'About Us', path: '/about' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'Services', path: '/services' },
    { name: 'Pre-Planning', path: '/pre-planning' },
    { name: 'Grief Support', path: '/grief-support' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
    { name: 'Obituaries', path: '/obituaries' },
    { name: 'Pricing', path: '/prices' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog', subdomain: 'blog' as const },
  ];

  const shopSubLinks = [
    { name: 'Sympathy gifts', path: '/flowers', subdomain: 'sympathygifts' as const, icon: <Gift size={28} />, desc: 'Flowers, cards & tributes' },
    { name: 'Memorial essentials', path: '/shop', subdomain: 'memorialessentials' as const, icon: <Package size={28} />, desc: 'Caskets, urns & markers' },
    { name: 'Custom Tribute Request', path: '/custom-order', icon: <ShoppingBag size={28} />, desc: 'Personalized memorial & floral requests' },
    { name: 'Vendor registration', path: '/sell-with-us', icon: <Store size={28} />, desc: 'Grow your business' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#411548] text-white py-2 hidden md:block w-full text-xs font-medium tracking-wide border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4 lg:space-x-5 justify-start shrink-0">
            <span className="flex items-center gap-2 font-bold"><CustomIcon size={14} variant="white" /> IMMEDIATE ASSISTANCE 24/7</span>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <a href="tel:9524862871" className="flex items-center gap-2 hover:text-gray-300 transition-colors font-bold uppercase tracking-widest underline underline-offset-4 decoration-white/30">952 486-2871</a>
          </div>

          {/* Location on Top Bar */}
          <div className="flex items-center justify-center space-x-4 shrink-0">
            <a 
              href="https://maps.google.com/?q=14850+Garret+Ave,+Apple+Valley,+MN+55124" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-gray-200 transition-colors text-[11px] font-semibold tracking-normal text-white/95 group"
              title="View Apple Valley Location on Google Maps"
            >
              <MapPin size={13} className="text-white/80 group-hover:text-white shrink-0" />
              <span className="hidden lg:inline">14850 Garret Ave, Apple Valley MN 55124</span>
              <span className="lg:hidden">Apple Valley, MN 55124</span>
            </a>
            <div className="h-3 w-[1px] bg-white/20 hidden xl:block"></div>
            {/* Social Media Icons */}
            <div className="hidden xl:flex items-center space-x-3 text-white/80">
              <a href="https://www.facebook.com/middletonfuneralservicesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook"><Facebook size={14} /></a>
              <a href="https://www.instagram.com/middletonfuneralservicesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram"><Instagram size={14} /></a>
              <a href="https://www.tiktok.com/@middletonfuneralservices" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="TikTok"><TikTokIcon size={14} /></a>
              <a href="https://www.pinterest.com/MiddletonFuneralServices/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Pinterest"><PinterestIcon size={14} /></a>
              <a href="https://www.youtube.com/@Middletonfuneralservicesllc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube"><Youtube size={14} /></a>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 2xl:space-x-4 uppercase tracking-widest font-black text-[9px] whitespace-nowrap shrink-0">
            {/* Shop Categories Dropdown in Top Bar */}
            <div 
              ref={shopMenuRef}
              className="relative" 
              onMouseEnter={() => setIsTopShopOpen(true)}
            >
              <button 
                type="button"
                className="flex items-center gap-1.5 hover:text-gray-200 transition-colors whitespace-nowrap shrink-0 text-white font-black uppercase py-0.5 cursor-pointer"
                onClick={() => setIsTopShopOpen((prev) => !prev)}
                aria-expanded={isTopShopOpen}
                aria-haspopup="true"
              >
                <ShoppingBag size={11} className="shrink-0 text-white/80" />
                <span>Marketplace</span>
                <ChevronDown size={10} className={`transition-transform duration-300 ${isTopShopOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTopShopOpen && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#411548]">Shop Collections</span>
                    <span className="text-[8px] bg-purple-100 text-[#411548] px-2 py-0.5 rounded-full font-bold uppercase">Marketplace</span>
                  </div>
                  <div className="space-y-1">
                    {shopSubLinks.map((sub) => {
                      const targetPath = 'subdomain' in sub && sub.subdomain
                        ? getSubdomainUrl(sub.subdomain as 'sympathygifts' | 'memorialessentials', sub.path)
                        : sub.path;
                      const isExternal = targetPath.startsWith('http');

                      if (isExternal) {
                        return (
                          <a
                            key={sub.name}
                            href={targetPath}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#411548]/5 transition-all group"
                            onClick={() => setIsTopShopOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#411548] group-hover:bg-[#411548] group-hover:text-white transition-all shrink-0">
                              {React.cloneElement(sub.icon, { size: 16 })}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10.5px] font-black uppercase tracking-tight text-gray-900 group-hover:text-[#411548] transition-colors">{sub.name}</span>
                              <span className="text-[8.5px] text-gray-400 font-bold uppercase tracking-wider">{sub.desc}</span>
                            </div>
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={sub.name}
                          to={targetPath}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#411548]/5 transition-all group"
                          onClick={() => setIsTopShopOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#411548] group-hover:bg-[#411548] group-hover:text-white transition-all shrink-0">
                            {React.cloneElement(sub.icon, { size: 16 })}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10.5px] font-black uppercase tracking-tight text-gray-900 group-hover:text-[#411548] transition-colors">{sub.name}</span>
                            <span className="text-[8.5px] text-gray-400 font-bold uppercase tracking-wider">{sub.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="h-2 w-[1px] bg-white/20 shrink-0"></div>
            <Link to="/submit-obituary" className="hover:text-gray-300 transition-colors whitespace-nowrap shrink-0 text-white font-black flex items-center gap-1">
              <Calendar size={10} className="shrink-0" /> Submit Obituary
            </Link>
            <div className="h-2 w-[1px] bg-white/20 shrink-0"></div>
            <Link to="/join-support-group" className="hover:text-gray-300 transition-colors whitespace-nowrap shrink-0 text-white font-black">Join Support Group</Link>
            <div className="h-2 w-[1px] bg-white/20 shrink-0"></div>
            <Link to="/login" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors whitespace-nowrap shrink-0">
              <LogIn size={10} className="shrink-0" /> Login / Register
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100 shadow-xl relative z-40">
        <div className="w-full px-3 md:px-5 lg:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group mr-2 xl:mr-4 2xl:mr-6 pr-2 xl:pr-4 border-r border-gray-100">
              <div className="relative shrink-0">
                <img src={HEADER_FOOTER_LOGO} alt="Middleton Funeral Services Logo" className="h-9 xl:h-10 2xl:h-11 w-auto object-contain transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col hidden sm:flex shrink-0">
                <span className="font-serif text-xs xl:text-sm 2xl:text-base font-black text-[#411548] leading-none tracking-tighter">MIDDLETON</span>
                <span className="text-[6.5px] xl:text-[7px] 2xl:text-[7.5px] uppercase tracking-[0.1em] font-black text-gray-400 mt-0.5 whitespace-nowrap">Funeral Services</span>
              </div>
            </Link>

            {/* Desktop Nav - Main menu items with About Us dropdown */}
            <nav className="hidden xl:flex items-center justify-end gap-0.5 xl:gap-0.5 2xl:gap-1 flex-1 min-w-0">
              {mainNavLinks.map((link, index) => {
                const targetPath = 'subdomain' in link && link.subdomain 
                  ? getSubdomainUrl(link.subdomain, link.path)
                  : link.path;
                const isExternal = targetPath.startsWith('http');
                const isSubActive = 'subItems' in link && link.subItems ? link.subItems.some(sub => location.pathname === sub.path) : false;
                const isActive = location.pathname === link.path || isSubActive;

                return (
                  <React.Fragment key={link.name}>
                    {index > 0 && (
                      <div className="w-[1px] h-2.5 bg-gray-200/60 rounded-full mx-0.5 shrink-0"></div>
                    )}
                    {'hasDropdown' in link && link.hasDropdown && 'subItems' in link && link.subItems ? (
                      <div className="relative group shrink-0">
                        <Link 
                          to={targetPath}
                          className={`font-black text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] tracking-tight uppercase transition-all py-1.5 px-1 xl:px-1.5 2xl:px-2 rounded-lg relative flex items-center gap-0.5 shrink-0 whitespace-nowrap ${
                            isActive ? 'text-[#411548] bg-[#411548]/5' : 'text-gray-900 hover:text-[#411548] hover:bg-gray-50'
                          }`}
                        >
                          {isActive && <CustomIcon size={8} className="shrink-0" />}
                          <span>{link.name}</span>
                          <ChevronDown size={8} className="transition-transform duration-200 group-hover:rotate-180 text-gray-400 group-hover:text-[#411548] shrink-0" />
                        </Link>
                        <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 space-y-1">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className={`block px-3.5 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-colors ${
                                  location.pathname === sub.path
                                    ? 'bg-[#411548]/10 text-[#411548]'
                                    : 'text-gray-800 hover:bg-[#411548]/5 hover:text-[#411548]'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : isExternal ? (
                      <a 
                        href={targetPath}
                        className={`font-black text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] tracking-tight uppercase transition-all py-1.5 px-1 xl:px-1.5 2xl:px-2 rounded-lg relative group whitespace-nowrap flex items-center gap-0.5 shrink-0 ${
                          isActive ? 'text-[#411548] bg-[#411548]/5' : 'text-gray-900 hover:text-[#411548] hover:bg-gray-50'
                        }`}
                      >
                        {isActive && <CustomIcon size={8} className="shrink-0" />}
                        {link.name}
                        <span 
                          className={`absolute bottom-0 left-1 right-1 h-[2px] bg-[#411548] rounded-full transition-transform origin-left ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        ></span>
                      </a>
                    ) : (
                      <Link 
                        to={targetPath}
                        className={`font-black text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] tracking-tight uppercase transition-all py-1.5 px-1 xl:px-1.5 2xl:px-2 rounded-lg relative group whitespace-nowrap flex items-center gap-0.5 shrink-0 ${
                          isActive ? 'text-[#411548] bg-[#411548]/5' : 'text-gray-900 hover:text-[#411548] hover:bg-gray-50'
                        }`}
                      >
                        {isActive && <CustomIcon size={8} className="shrink-0" />}
                        {link.name}
                        <span 
                          className={`absolute bottom-0 left-1 right-1 h-[2px] bg-[#411548] rounded-full transition-transform origin-left ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        ></span>
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Separator before CTA */}
              <div className="w-[1.5px] h-3.5 bg-gray-200/80 rounded-full mx-1 shrink-0"></div>

              {/* Primary Schedule Appointment CTA */}
              <Link
                to="/book-appointment"
                className="bg-[#411548] text-white hover:bg-[#300f35] px-2.5 xl:px-3 2xl:px-4 py-1.5 xl:py-2 rounded-full text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1 whitespace-nowrap shrink-0 border border-purple-300/30 ml-0.5"
              >
                <Calendar size={11} className="shrink-0 text-amber-300" />
                <span>Schedule Appointment</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2 shrink-0 xl:hidden">
              {/* Mobile CTA Button */}
              <Link
                to="/book-appointment"
                className="bg-[#411548] text-white px-3 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
              >
                <Calendar size={12} className="text-amber-300 shrink-0" />
                <span className="hidden sm:inline">Schedule Appointment</span>
                <span className="sm:hidden">Schedule</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="p-2.5 bg-[#411548]/5 rounded-2xl text-[#411548] hover:bg-[#411548] hover:text-white transition-all shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation"
              >
                <CustomIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-2xl absolute top-full left-0 w-full z-50 overflow-hidden animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="container mx-auto px-4 py-10 max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#411548]/30 ml-4">Service Navigation </span>
                <div className="grid grid-cols-1 gap-2">
                  {mainNavLinks.map((link) => {
                    const targetPath = 'subdomain' in link && link.subdomain 
                      ? getSubdomainUrl(link.subdomain, link.path)
                      : link.path;
                    const isExternal = targetPath.startsWith('http');

                    if ('hasDropdown' in link && link.hasDropdown && 'subItems' in link && link.subItems) {
                      return (
                        <div key={link.name} className="py-2 border-b border-gray-50">
                          <Link 
                            to={targetPath}
                            className="block py-3 px-6 text-xs font-black uppercase tracking-[0.2em] text-[#411548]"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                          <div className="pl-6 space-y-1">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="block py-2 px-6 text-[11px] font-bold uppercase tracking-wider text-gray-700 hover:text-[#411548]"
                                onClick={() => setIsOpen(false)}
                              >
                                • {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return isExternal ? (
                      <a 
                        key={link.name}
                        href={targetPath}
                        className="block py-5 px-6 text-xs font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50 rounded-3xl transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        key={link.name}
                        to={targetPath}
                        className="block py-5 px-6 text-xs font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50 rounded-3xl transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6 bg-gray-50 p-8 rounded-[3.5rem] border border-gray-100">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#411548]/30 ml-4">Marketplace & Portal</span>
                <div className="grid grid-cols-1 gap-4">
                  {shopSubLinks.map((sub) => {
                    const targetPath = 'subdomain' in sub && sub.subdomain 
                      ? getSubdomainUrl(sub.subdomain as 'sympathygifts' | 'memorialessentials', sub.path)
                      : sub.path;
                    const isExternal = targetPath.startsWith('http');

                    if (isExternal) {
                      return (
                        <a 
                          key={sub.name}
                          href={targetPath}
                          className="flex items-center gap-5 p-5 bg-white rounded-3xl shadow-sm border border-gray-100 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#411548]">
                            {sub.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-tight">{sub.name}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{sub.desc}</span>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <Link 
                        key={sub.name}
                        to={targetPath}
                        className="flex items-center gap-5 p-5 bg-white rounded-3xl shadow-sm border border-gray-100 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#411548]">
                          {sub.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-tight">{sub.name}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{sub.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 flex flex-col items-center gap-4 bg-[#411548] rounded-[3rem] text-white text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">24/7 Support Line</span>
                 <a href="tel:9524862871" className="flex items-center gap-4 font-serif text-3xl font-black">
                   952.486.2871
                 </a>
                 <a 
                   href="https://maps.google.com/?q=14850+Garret+Ave,+Apple+Valley,+MN+55124" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-xs text-white/90 hover:text-white transition-colors pt-3 border-t border-white/10 w-full justify-center"
                 >
                   <MapPin size={14} className="text-white/70 shrink-0" />
                   <span>14850 Garret Ave, Apple Valley MN 55124</span>
                 </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
