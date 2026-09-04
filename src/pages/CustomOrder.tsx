import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, ChevronRight, ChevronLeft, Send, 
  Lock, ArrowRight, KeyRound, Check, Copy, HelpCircle, Package
} from 'lucide-react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import DoveIcon from '../components/DoveIcon';
import FormProgressBar from '../components/FormProgressBar';

export default function CustomOrder() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [coStep, setCoStep] = useState(1);
  const [coCategory, setCoCategory] = useState('Sympathy Gifts');
  const [coPackageDetails, setCoPackageDetails] = useState('');
  const [coItemVision, setCoItemVision] = useState('');
  
  // Personalization
  const [coDeceasedName, setCoDeceasedName] = useState('');
  const [coDates, setCoDates] = useState('');
  const [coInscription, setCoInscription] = useState('');
  const [coSignature, setCoSignature] = useState('');
  const [coMaterial, setCoMaterial] = useState('Marble & Gold Inlay');
  const [coCardText, setCoCardText] = useState('With deepest sympathy during this difficult time. Wishing your family peace and comfort.');
  
  // Custom package components
  const [coBundleItems, setCoBundleItems] = useState<string[]>([
    'Sympathy Floral Arrangement',
    'Laser Engraved Inscription',
    'Letterpress Card'
  ]);

  // Delivery state
  const [coDeliveryType, setCoDeliveryType] = useState('Funeral Home / Service Chapel');
  const [coDeliveryAddress, setCoDeliveryAddress] = useState('Middleton Funeral Chapel, 14850 Garret Ave, Apple Valley MN 55124');
  const [coDeliveryDate, setCoDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [coNotes, setCoNotes] = useState('');

  // Contact & OTP
  const [coName, setCoName] = useState('');
  const [coEmail, setCoEmail] = useState('');
  const [coPhone, setCoPhone] = useState('');
  const [coOtp, setCoOtp] = useState('');
  const [coOtpSent, setCoOtpSent] = useState(false);
  const [coOtpVerified, setCoOtpVerified] = useState(false);
  const [coConsent, setCoConsent] = useState(false);
  const [coError, setCoError] = useState('');

  // Result state
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Initialize from search params or router location state
  useEffect(() => {
    const categoryParam = searchParams.get('category') || location.state?.initialCategory || location.state?.category;
    const stepParam = searchParams.get('step') || location.state?.initialStep || location.state?.step;
    const detailsParam = searchParams.get('details') || searchParams.get('package') || location.state?.initialPackageDetails || location.state?.packageDetails;

    if (categoryParam) {
      setCoCategory(categoryParam);
    }
    if (stepParam) {
      const s = parseInt(stepParam, 10);
      if (!isNaN(s) && s >= 1 && s <= 5) {
        setCoStep(s);
      }
    }
    if (detailsParam) {
      setCoPackageDetails(detailsParam);
    }
  }, [searchParams, location]);

  const changeStep = (nextStep: number) => {
    setCoStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'Sympathy Gifts',
      title: 'Sympathy Gifts',
      desc: 'Comfort care boxes, candles & sympathy gift sets',
      badge: 'Popular'
    },
    {
      id: 'Flowers',
      title: 'Flowers & Sprays',
      desc: 'Funeral sprays, wreaths, baskets & bouquets',
      badge: 'Fresh Floral'
    },
    {
      id: 'Personalized Tributes',
      title: 'Personalized Tributes',
      desc: 'Laser-etched plaques & photo frames',
      badge: 'Laser Engraved'
    },
    {
      id: 'Remembrance Keepsakes',
      title: 'Remembrance Keepsakes',
      desc: 'Cremation urns, jewelry & memory orbs',
      badge: 'Cherished'
    },
    {
      id: 'Memorial Décor',
      title: 'Memorial Décor',
      desc: 'Windchimes, memory benches & stones',
      badge: 'Sanctuary'
    },
    {
      id: 'Tribute Accessories',
      title: 'Tribute Accessories',
      desc: 'Guest registry books & pallbearer gloves',
      badge: 'Ceremonial'
    },
    {
      id: 'Memorial Essentials',
      title: 'Memorial Essentials',
      desc: 'Service programs, stationery & bookmarks',
      badge: 'Essentials'
    },
    {
      id: 'Sympathy Package Bundle',
      title: 'Sympathy Package Bundle',
      desc: 'Tailored flexibility for custom package',
      badge: 'Bundle & Save'
    }
  ];

  const cardTemplates = [
    "With deepest sympathy during this difficult time. Wishing your family peace and comfort.",
    "In loving memory of a wonderful soul. May cherished memories bring you solace.",
    "Sharing in your sorrow with love and friendship. Our thoughts and prayers are with you always.",
    "May the love of those around you help you through the days ahead."
  ];

  const toggleBundleItem = (item: string) => {
    if (coBundleItems.includes(item)) {
      setCoBundleItems(coBundleItems.filter(i => i !== item));
    } else {
      setCoBundleItems([...coBundleItems, item]);
    }
  };

  const handleSendOtp = () => {
    if (!coPhone || coPhone.trim().length < 7) {
      setCoError('Please enter a valid phone number before requesting an SMS verification code.');
      return;
    }
    setCoError('');
    setCoOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (coOtp === '849201' || coOtp.trim().length >= 4) {
      setCoOtpVerified(true);
      setCoError('');
    } else {
      setCoError('Invalid code. Please use demo code 849201 to verify.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coName.trim() || !coPhone.trim() || !coEmail.trim()) {
      setCoError('Please fill out your contact details before submitting.');
      return;
    }
    if (!coOtpVerified) {
      setCoError('Please complete SMS OTP verification before submitting.');
      return;
    }
    if (!coConsent) {
      setCoError('Please accept the consent terms before submitting.');
      return;
    }

    setCoError('');
    const refNum = 'MFO-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(refNum);
    changeStep(5);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <DoveIcon size={12} variant="white" />
              <span>Compassionate Care • Custom Personalization • Dedicated Support</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white leading-tight">
              Custom Tribute & Personalization Form
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Design custom sympathy gifts, inscribed keepsakes, tailored floral arrangements, or personalized memorial bundles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-slate-200">
          <FormProgressBar
            steps={[
              { num: 1, label: 'Item Type' },
              { num: 2, label: 'Personalize' },
              { num: 3, label: 'Delivery' },
              { num: 4, label: 'Verification' },
              { num: 5, label: 'Confirmed' }
            ]}
            currentStep={coStep}
            className="mb-8"
          />

          {coPackageDetails && coStep < 5 && (
            <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-2xl mb-6 flex items-center justify-between text-xs font-bold text-[#1A081D]">
              <span className="flex items-center gap-2">
                <Package size={16} className="text-[#411548]" />
                Selected Package / Item: <strong className="text-[#411548] font-black">{coPackageDetails}</strong>
              </span>
              <button 
                onClick={() => setCoPackageDetails('')} 
                className="text-[10px] text-slate-500 hover:text-red-600 underline uppercase"
              >
                Clear Selection
              </button>
            </div>
          )}

          {coStep < 5 && (
            <div className="text-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] flex items-center justify-center gap-1.5 mb-1">
                <DoveIcon size={14} className="text-[#411548]" /> Custom Tribute & Personalization
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1A081D] uppercase">
                {coStep === 1 && "Step 1: Select Item Category"}
                {coStep === 2 && "Step 2: Personalize & Customize"}
                {coStep === 3 && "Step 3: Schedule & Delivery Venue"}
                {coStep === 4 && "Step 4: Contact & Verification"}
              </h2>
              <p className="text-slate-500 text-xs font-light mt-1 max-w-md mx-auto">
                {coStep === 1 && "Choose from sympathy gifts, flowers, personalized tributes, or custom memorial package bundles."}
                {coStep === 2 && "Customize laser engraving details, choose card wording templates, or select custom bundle items."}
                {coStep === 3 && "Specify funeral chapel or residence delivery location and required service date."}
                {coStep === 4 && "Verify your phone number via SMS OTP to confirm your custom order request."}
              </p>
            </div>
          )}

          {/* STEP 1: CATEGORY SELECTION */}
          {coStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-2">
                  Select Request Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((item) => {
                    const isSelected = coCategory === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setCoCategory(item.id)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1A081D] bg-[#1A081D] text-white shadow-lg'
                            : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-[#411548]'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#411548]'
                            }`}>
                              {item.badge}
                            </span>
                            {isSelected && <CheckCircle2 size={18} className="text-white" />}
                          </div>
                          <h4 className="font-serif font-bold text-base mt-2 uppercase">{item.title}</h4>
                          <p className={`text-xs mt-1 font-light ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Item Vision or Specific Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bronze keepsake urn with laser engraving, or standing funeral spray with white lilies..."
                  value={coItemVision}
                  onChange={(e) => setCoItemVision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => changeStep(2)}
                  className="bg-[#1A081D] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#411548] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Personalization</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONALIZATION & ENGRAVING */}
          {coStep === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 flex items-center justify-between text-xs font-bold text-[#1A081D]">
                <span className="flex items-center gap-2">
                  <DoveIcon size={14} className="text-[#411548]" /> Selected Category: <strong>{coCategory}</strong>
                </span>
                <button onClick={() => changeStep(1)} className="text-[10px] text-[#411548] underline uppercase font-black cursor-pointer">Change</button>
              </div>

              {/* Laser Engraving Section */}
              <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-100 space-y-4">
                <div className="flex items-center gap-2">
                  <DoveIcon size={16} className="text-[#411548]" />
                  <h4 className="font-bold text-xs uppercase text-[#411548] tracking-wider">
                    Laser Engraving & Inscription Studio
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Deceased Name / In Memory Of
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. In Loving Memory of Robert Middleton"
                      value={coDeceasedName}
                      onChange={(e) => setCoDeceasedName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Memory Dates
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1948 — 2026"
                      value={coDates}
                      onChange={(e) => setCoDates(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Material / Finish Preference
                    </label>
                    <select
                      value={coMaterial}
                      onChange={(e) => setCoMaterial(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                    >
                      <option>Marble & Gold Inlay</option>
                      <option>Solid Brass Inscription</option>
                      <option>Polished Walnut / Mahogany</option>
                      <option>Brushed Stainless Steel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Custom Laser Inscription
                    </label>
                    <input
                      type="text"
                      placeholder='e.g. "Forever In Our Hearts"'
                      value={coInscription}
                      onChange={(e) => setCoInscription(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                    />
                  </div>
                </div>

                {/* Live Laser Engraving Preview Box */}
                <div className="bg-gradient-to-br from-[#1A081D] via-[#2A0D30] to-[#411548] text-white p-6 rounded-2xl border-2 border-white/20 shadow-xl text-center space-y-2 relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full shadow-sm">
                    Engraving Preview
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#411548] border border-white/30 text-white flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <DoveIcon size={18} variant="white" />
                  </div>
                  <div className="text-base font-serif font-black uppercase text-white tracking-wide">
                    {coDeceasedName || "In Loving Memory of Eleanor"}
                  </div>
                  <div className="text-xs font-serif italic text-purple-100/90">
                    "{coInscription || "Forever In Our Hearts"}"
                  </div>
                  <div className="text-[11px] font-bold text-purple-200 tracking-wider">
                    {coDates || "1948 — 2026"}
                  </div>
                </div>
              </div>

              {/* Card Wording Generator */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase text-[#1A081D] tracking-wider flex items-center gap-1.5">
                    <DoveIcon size={14} className="text-[#411548]" /> Card Wording Assistant
                  </h4>
                  <span className="text-[10px] font-bold text-[#411548] uppercase bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Click preset to populate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cardTemplates.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoCardText(tmpl)}
                      className="text-left text-[11px] p-2.5 bg-white hover:bg-purple-50 border border-slate-200 hover:border-[#411548] rounded-xl text-slate-700 transition-all font-light cursor-pointer"
                    >
                      "{tmpl.substring(0, 58)}..."
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Personal Sympathy Message / Card Wording
                  </label>
                  <textarea
                    rows={2}
                    value={coCardText}
                    onChange={(e) => setCoCardText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              {/* Tailored Package Checkboxes */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs uppercase text-[#1A081D] tracking-wider">
                  Select Custom Bundle Items (Tailored Flexibility)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Sympathy Floral Arrangement',
                    'Laser Engraved Inscription',
                    'Letterpress Sympathy Card',
                    'Memorial Candle & Frame',
                    'Cremation Keepsake Urn',
                    'Guest Registry Book',
                    'Coordinated Chapel Easels',
                    'Custom Service Program Books'
                  ].map((item) => {
                    const checked = coBundleItems.includes(item);
                    return (
                      <label key={item} className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${checked ? 'bg-purple-100/70 border border-[#411548] text-[#1A081D] font-bold' : 'bg-slate-50 border border-slate-200 text-slate-700'}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBundleItem(item)}
                          className="w-4 h-4 text-[#411548] rounded border-slate-300 focus:ring-[#411548]"
                        />
                        <span className="text-xs font-medium">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => changeStep(1)}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold uppercase hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => changeStep(3)}
                  className="bg-[#1A081D] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#411548] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Delivery</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY DETAILS */}
          {coStep === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-2">
                  Delivery Location Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Funeral Home / Service Chapel', 'Family Home / Residence'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCoDeliveryType(type)}
                      className={`p-4 rounded-xl border-2 font-bold text-xs uppercase tracking-wider cursor-pointer ${
                        coDeliveryType === type
                          ? 'border-[#1A081D] bg-[#1A081D] text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                  Delivery Address / Service Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full chapel name or residential address..."
                  value={coDeliveryAddress}
                  onChange={(e) => setCoDeliveryAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                    Required Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={coDeliveryDate}
                    onChange={(e) => setCoDeliveryDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                    Service Time / Viewing Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Service starts at 10:00 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                  Special Setup Instructions / Ribbon Text
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify ribbon inscription, placement location, or timing requirements..."
                  value={coNotes}
                  onChange={(e) => setCoNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => changeStep(2)}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold uppercase hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => changeStep(4)}
                  className="bg-[#1A081D] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#411548] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Verification</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & OTP VERIFICATION */}
          {coStep === 4 && (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={coName}
                    onChange={(e) => setCoName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A081D] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={coEmail}
                    onChange={(e) => setCoEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              {/* Phone & Phone OTP Verification */}
              <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-[#411548] uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound size={14} /> Phone Number & SMS Verification *
                  </label>
                  {coOtpVerified ? (
                    <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Lock size={10} /> Verification Required
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="(952) 555-0199"
                    value={coPhone}
                    onChange={(e) => {
                      setCoPhone(e.target.value);
                      setCoOtpVerified(false);
                    }}
                    className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#411548]"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className={`px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer ${
                      coOtpSent
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#1A081D] hover:bg-[#411548] text-white'
                    }`}
                  >
                    {coOtpSent ? 'Resend SMS' : 'Send Code'}
                  </button>
                </div>

                {coOtpSent && !coOtpVerified && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-2">
                    <p className="text-[11px] text-slate-600 font-light">
                      Enter the SMS verification code sent to {coPhone}. <span className="text-[#411548] font-bold">(Demo Code: 849201)</span>
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="849201"
                        value={coOtp}
                        onChange={(e) => setCoOtp(e.target.value)}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono tracking-widest outline-none focus:border-[#411548]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoOtp('849201');
                          setCoOtpVerified(true);
                          setCoError('');
                        }}
                        className="bg-purple-100 text-[#411548] hover:bg-purple-200 px-3 py-2 rounded-xl text-[10px] font-bold uppercase cursor-pointer shrink-0"
                      >
                        Fill Demo Code
                      </button>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer shrink-0"
                      >
                        Verify
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="co-consent-check"
                  required
                  checked={coConsent}
                  onChange={(e) => setCoConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#411548] focus:ring-[#411548] cursor-pointer"
                />
                <label htmlFor="co-consent-check" className="text-xs text-slate-600 font-light cursor-pointer">
                  I consent to Middleton Funeral Services processing my custom order details and contacting me via phone/SMS to confirm tribute specifications in accordance with the <Link to="/privacy-policy" className="underline font-bold text-[#411548]">Privacy Policy</Link>.
                </label>
              </div>

              {coError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {coError}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => changeStep(3)}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold uppercase hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  className="bg-[#1A081D] hover:bg-[#411548] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Custom Order</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {coStep === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-4 border-emerald-50 shadow-inner">
                <CheckCircle2 size={44} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 text-[#411548] text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                  <span>Reference: {orderNumber}</span>
                  <button onClick={handleCopyRef} className="hover:text-black cursor-pointer ml-1" title="Copy Reference">
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1A081D] uppercase">
                  Custom Tribute Request Submitted
                </h2>
                <p className="text-slate-600 text-xs md:text-sm font-light max-w-lg mx-auto mt-2">
                  Thank you, <strong className="text-[#411548] font-bold">{coName || "Valued Family"}</strong>. Our director and floral personalization team have received your request and will contact you at <strong className="text-[#411548] font-bold">{coPhone || "your phone number"}</strong> to finalize details.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-200 max-w-xl mx-auto space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 uppercase font-bold">Category:</span>
                  <span className="font-bold text-[#1A081D]">{coCategory}</span>
                </div>
                {coPackageDetails && (
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 uppercase font-bold">Package / Item:</span>
                    <span className="font-bold text-[#411548]">{coPackageDetails}</span>
                  </div>
                )}
                {coDeceasedName && (
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 uppercase font-bold">In Memory Of:</span>
                    <span className="font-bold text-[#411548]">{coDeceasedName}</span>
                  </div>
                )}
                {coInscription && (
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 uppercase font-bold">Laser Inscription:</span>
                    <span className="font-bold text-slate-900 italic">"{coInscription}"</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 uppercase font-bold">Delivery Venue:</span>
                  <span className="font-bold text-slate-900">{coDeliveryAddress}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 uppercase font-bold">Service Date:</span>
                  <span className="font-bold text-[#411548]">{coDeliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 uppercase font-bold">Contact Email:</span>
                  <span className="font-bold text-slate-900">{coEmail}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/shop"
                  className="bg-[#411548] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md flex items-center gap-2"
                >
                  Browse Shop Catalog <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
