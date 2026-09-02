import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  HeartHandshake, 
  AlertCircle,
  FileText,
  Users,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import FormProgressBar from '../components/FormProgressBar';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    serviceType: 'Immediate Need Assistance',
    customServiceFocus: '',
    legalSubOption: 'Death Certificate Processing',
    supportGroupSubOption: 'Support Group Referrals',
    meetingFormat: 'In-Person at Rogers, MN Funeral Home',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '10:00 AM',
    fullName: '',
    phone: '',
    email: '',
    lovedOneName: '',
    location: 'Rogers / Twin Cities, MN',
    notes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // 9 Legal Administrative options matching the Administrative Support page
  const legalOptions = [
    { title: 'Death Certificate Processing', desc: 'Speedy and accurate handling of all necessary legal certifications and state filings.' },
    { title: 'Life Insurance Claims', desc: 'Compassionate assistance in filing claims and navigating policy payouts.' },
    { title: 'Veterans Benefits & Honors', desc: 'Helping military families secure military honors, flags, and Fort Snelling filings.' },
    { title: 'Probate & Estate Guidance', desc: 'Connecting families with trusted estate attorneys and probate specialists.' },
    { title: 'Power of Attorney Support', desc: 'Administrative coordination for legal executors and appointed representatives.' },
    { title: 'International Repatriation', desc: 'Managing complex documentation and customs for bringing loved ones home.' },
    { title: 'Notary Services', desc: 'On-site notary support for all funeral-related legal instruments.' },
    { title: 'Social Security Claims', desc: 'Filing official notifications and lump-sum death benefit applications.' },
    { title: 'Burial Permits & Transport', desc: 'Obtaining county burial-transit permits and state authorizations.' }
  ];

  // Support Groups sub options
  const supportGroupOptions = [
    { title: 'Support Group Referrals', desc: 'Personalized matching with specialized local grief support groups in Minnesota.' },
    { title: 'Peer Support Groups', desc: 'Community peer support circles and regular weekly healing group meetings.' },
    { title: 'Online Grief Communities', desc: 'Orientation for digital grief forums, virtual circles, and online support.' },
    { title: 'Anniversary & Holiday Check-ins', desc: 'Follow-up consultations for milestone dates, anniversaries, and holidays.' }
  ];

  const serviceOptions = [
    { title: 'Immediate Need Assistance', desc: 'A death has occurred or is imminent. Requires immediate care & 24/7 transfer.' },
    { title: 'Pre-Planning Consultation', desc: 'Arranging funeral wishes in advance to lock in transparent prices and ease family burden.' },
    { title: 'Funeral & Burial Planning', desc: 'Traditional chapel, church, or graveside ceremony coordination.' },
    { title: 'Cremation Consultation', desc: 'Direct cremation, ceremonial viewing, or memorial urn selection.' },
    { title: 'Legal & Administrative Support', desc: 'End-of-life paperwork, death certificates, insurance claims, probate & veterans benefits.' },
    { title: 'Support Groups', desc: 'Support group referrals, community peer circles, and online grief communities.' },
    { title: 'Professional Grief Counselling', desc: 'Private 1-on-1 sessions with licensed grief counselors and grief therapists.' },
    { title: 'Family Support Services', desc: 'Mediated family support sessions, emotional care, and funeral guidance.' },
    { title: 'Memorial Healing Events', desc: 'Participation in annual remembrance ceremonies and candle-lighting events.' },
    { title: 'Veteran Services & Paperwork', desc: 'Full military honors, flag presentation, and national cemetery filings.' },
    { title: 'General Information Meeting', desc: 'General questions regarding pricing, facility tours, or care services.' },
    { title: 'Other Focus / Custom Request', desc: 'Specify your unique meeting topic, specialized request, or custom consultation.' }
  ];

  const meetingFormats = [
    'In-Person at Rogers, MN Funeral Home',
    'Virtual Video Conference (Zoom / Google Meet)',
    'Phone Consultation',
    'Home Visit (Within Twin Cities Metro)'
  ];

  const timeSlots = [
    '09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '06:00 PM (After-Hours)'
  ];

  // Venue options list
  const venueOptions = [
    'On-Site Chapel Services',
    'Church & Religious Venues',
    'Outdoor & Graveside',
    'Celebration of Life Venues',
    'Reception Venue Planning',
    'Boutique Memorial Parlors & Private Family Suites',
    'Venue Arrangements Planning'
  ];

  // Professional Care options list
  const careOptions = [
    'Washing & Dressing',
    'Cosmetics & Grooming',
    'Restorative Art',
    'Refrigeration Services',
    'Embalming Services',
    'Green Embalming & Bio-Care',
    'Professional Care & Preparation'
  ];

  // Auto-prefill and jump to step 2 when URL parameter is present
  useEffect(() => {
    const serviceParam = searchParams.get('service') || searchParams.get('option');
    const stepParam = searchParams.get('step');

    if (serviceParam) {
      // Check if it's a legal option
      const isLegal = legalOptions.some(l => l.title.toLowerCase() === serviceParam.toLowerCase());
      if (isLegal) {
        setFormData(prev => ({
          ...prev,
          serviceType: 'Legal & Administrative Support',
          legalSubOption: serviceParam
        }));
        setStep(2);
        return;
      }

      // Check if it's a support group option
      const isSupportGroup = supportGroupOptions.some(s => s.title.toLowerCase() === serviceParam.toLowerCase());
      if (isSupportGroup) {
        setFormData(prev => ({
          ...prev,
          serviceType: 'Support Groups',
          supportGroupSubOption: serviceParam
        }));
        setStep(2);
        return;
      }

      // Check if it's a venue option
      const isVenue = venueOptions.some(v => v.toLowerCase() === serviceParam.toLowerCase());
      if (isVenue) {
        setFormData(prev => ({
          ...prev,
          serviceType: 'Other Focus / Custom Request',
          customServiceFocus: serviceParam
        }));
        setStep(2);
        return;
      }

      // Check if it's a care option
      const isCare = careOptions.some(c => c.toLowerCase() === serviceParam.toLowerCase());
      if (isCare) {
        setFormData(prev => ({
          ...prev,
          serviceType: 'Other Focus / Custom Request',
          customServiceFocus: serviceParam
        }));
        setStep(2);
        return;
      }

      // Check main options
      const match = serviceOptions.find(opt => 
        opt.title.toLowerCase() === serviceParam.toLowerCase() ||
        opt.title.toLowerCase().startsWith(serviceParam.toLowerCase()) ||
        serviceParam.toLowerCase().startsWith(opt.title.toLowerCase())
      );
      if (match) {
        setFormData(prev => ({ ...prev, serviceType: match.title }));
      } else {
        setFormData(prev => ({
          ...prev,
          serviceType: 'Other Focus / Custom Request',
          customServiceFocus: serviceParam
        }));
      }
      setStep(2);
    } else if (stepParam && !isNaN(Number(stepParam))) {
      setStep(Number(stepParam));
    }
  }, [searchParams]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const code = 'MFS-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);
      setBookingConfirmed(true);
      setStep(4);
    }
  };

  const getEffectiveServiceTitle = () => {
    if (formData.serviceType === 'Legal & Administrative Support') {
      return `Legal: ${formData.legalSubOption}`;
    }
    if (formData.serviceType === 'Support Groups') {
      return `Support: ${formData.supportGroupSubOption}`;
    }
    if (formData.serviceType === 'Other Focus / Custom Request' && formData.customServiceFocus) {
      return `Other: ${formData.customServiceFocus}`;
    }
    return formData.serviceType;
  };

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
              <HeartHandshake size={12} className="text-white" /> Compassionate & Confidential
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Schedule An Appointment
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Meet personally with our licensed funeral directors in person, virtually, or by phone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form */}
      <div className="container mx-auto px-4 max-w-6xl py-6 md:py-8">
        {/* Progress Tracker */}
        <FormProgressBar
          steps={[
            { num: 1, label: 'Service Selection' },
            { num: 2, label: 'Date & Format' },
            { num: 3, label: 'Your Info' },
            { num: 4, label: 'Appointment Confirmed' }
          ]}
          currentStep={step}
          className="mb-8"
        />

        {/* Form Container */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-gray-200 shadow-xl">
          {!bookingConfirmed ? (
            <form onSubmit={handleNext} className="space-y-6">
              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold text-[#411548] uppercase tracking-[0.2em] block mb-1">Step 1 of 3</span>
                    <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">What type of consultation do you need?</h2>
                    <p className="text-gray-500 text-sm font-light mt-1">Select the primary focus of your meeting so we can prepare accordingly.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceOptions.map((opt) => (
                      <div
                        key={opt.title}
                        onClick={() => setFormData({ ...formData, serviceType: opt.title })}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.serviceType === opt.title
                            ? 'border-[#411548] bg-purple-50/50 shadow-md ring-1 ring-[#411548]'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 text-base">{opt.title}</h3>
                          {formData.serviceType === opt.title && (
                            <CheckCircle2 size={18} className="text-[#411548] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">{opt.desc}</p>
                      </div>
                    ))}
                  </div>

                  {formData.serviceType === 'Other Focus / Custom Request' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl bg-purple-50/80 border border-[#411548]/20 space-y-3"
                    >
                      <label className="text-xs font-bold text-[#411548] uppercase tracking-wider block">
                        Specify Your Primary Meeting Focus / Custom Request *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. International Repatriation, Custom Memorial Video, Specialized Floral Tribute..."
                        value={formData.customServiceFocus}
                        onChange={(e) => setFormData({ ...formData, customServiceFocus: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light text-gray-900 shadow-sm"
                      />
                    </motion.div>
                  )}

                  {formData.serviceType === 'Immediate Need Assistance' && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 leading-relaxed">
                      <AlertCircle size={20} className="shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <strong className="font-bold block uppercase tracking-wider mb-0.5">Need Immediate Assistance Right Now?</strong>
                        If a death has just occurred, please call our 24/7 emergency dispatch directly at{' '}
                        <a href="tel:9524862871" className="font-bold text-[#411548] underline">
                          952 486-2871
                        </a>. Our staff will dispatch transportation immediately.
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: DATE, TIME, FORMAT & SUB-OPTIONS */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Prefilled Banner */}
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex flex-wrap justify-between items-center gap-3 text-xs">
                    <div>
                      <span className="text-gray-500 font-bold uppercase tracking-wider block text-[10px]">Primary Focus Prefilled:</span>
                      <span className="font-bold text-[#411548] text-sm">
                        {getEffectiveServiceTitle()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[#411548] font-bold underline hover:text-black transition-colors"
                    >
                      Change Focus
                    </button>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#411548] uppercase tracking-[0.2em] block mb-1">Step 2 of 3</span>
                    <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">Select Specific Option & Schedule</h2>
                    <p className="text-gray-500 text-sm font-light mt-1">Refine your specific request and choose your preferred date and time.</p>
                  </div>

                  {/* Legal Administrative 9 Sub-Options Selection */}
                  {formData.serviceType === 'Legal & Administrative Support' && (
                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#411548] uppercase tracking-wider">
                        <Scale size={16} /> Select Legal & Administrative Assistance Needed (9 Options):
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {legalOptions.map((leg) => (
                          <div
                            key={leg.title}
                            onClick={() => setFormData({ ...formData, legalSubOption: leg.title })}
                            className={`p-4 rounded-xl border-2 text-xs cursor-pointer transition-all ${
                              formData.legalSubOption === leg.title
                                ? 'border-[#411548] bg-white text-[#411548] font-bold shadow-md'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-200'
                            }`}
                          >
                            <div className="font-bold text-gray-900 mb-1">{leg.title}</div>
                            <div className="text-[11px] font-light text-gray-500 leading-snug">{leg.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Support Groups Sub-Options Selection */}
                  {formData.serviceType === 'Support Groups' && (
                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#411548] uppercase tracking-wider">
                          <Users size={16} /> Select Support Group Focus:
                        </div>
                        <Link
                          to="/join-support-group"
                          className="text-[11px] text-[#411548] font-bold underline hover:text-black"
                        >
                          Direct Registration Form &rarr;
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {supportGroupOptions.map((sg) => (
                          <div
                            key={sg.title}
                            onClick={() => setFormData({ ...formData, supportGroupSubOption: sg.title })}
                            className={`p-4 rounded-xl border-2 text-xs cursor-pointer transition-all ${
                              formData.supportGroupSubOption === sg.title
                                ? 'border-[#411548] bg-white text-[#411548] font-bold shadow-md'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-200'
                            }`}
                          >
                            <div className="font-bold text-gray-900 mb-1">{sg.title}</div>
                            <div className="text-[11px] font-light text-gray-500 leading-snug">{sg.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Format */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">Preferred Meeting Format</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {meetingFormats.map((fmt) => (
                        <div
                          key={fmt}
                          onClick={() => setFormData({ ...formData, meetingFormat: fmt })}
                          className={`p-4 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${
                            formData.meetingFormat === fmt
                              ? 'border-[#411548] bg-purple-50 text-[#411548]'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {fmt}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-2">
                        <Calendar size={16} /> Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-2">
                        <Clock size={16} /> Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                            className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              formData.appointmentTime === slot
                                ? 'bg-[#411548] text-white border-[#411548]'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CONTACT & FAMILY DETAILS */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex flex-wrap justify-between items-center gap-3 text-xs">
                    <div>
                      <span className="text-gray-500 font-bold uppercase tracking-wider block text-[10px]">Primary Focus Prefilled:</span>
                      <span className="font-bold text-[#411548] text-sm">
                        {getEffectiveServiceTitle()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[#411548] font-bold underline hover:text-black transition-colors cursor-pointer"
                    >
                      Change Focus
                    </button>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#411548] uppercase tracking-[0.2em] block mb-1">Step 3 of 3</span>
                    <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">Your Contact & Stored Details</h2>
                    <p className="text-gray-500 text-sm font-light mt-1">Review your prefilled focus and enter your contact information below.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                        Primary Focus of Meeting (Prefilled)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={getEffectiveServiceTitle()}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#411548] cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Phone Number (USA) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Name of Loved One (If Applicable)</label>
                      <input
                        type="text"
                        placeholder="e.g. Thomas Vance"
                        value={formData.lovedOneName}
                        onChange={(e) => setFormData({ ...formData, lovedOneName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Additional Notes / Specific Questions</label>
                    <textarea
                      rows={3}
                      placeholder="Share any special requests, religious traditions, or questions you have for our team..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#411548] transition-all font-light"
                    />
                  </div>

                  {/* Consent declaration */}
                  <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100 mt-4">
                    <input
                      type="checkbox"
                      id="appointment-consent"
                      required
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#411548] focus:ring-[#411548] cursor-pointer shrink-0"
                    />
                    <label htmlFor="appointment-consent" className="text-xs text-gray-600 font-light leading-relaxed cursor-pointer">
                      I consent to Middleton Funeral Services collecting and storing my provided contact information to manage my appointment request in accordance with the <Link to="/privacy-policy" className="underline text-[#411548] font-bold">Privacy Policy</Link>.
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3.5 rounded-2xl border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  className="bg-[#411548] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  {step === 3 ? 'Confirm & Book Appointment' : 'Continue'} <ChevronRight size={16} />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 4: CONFIRMED SUMMARY */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-6"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto border-4 border-green-50 shadow-inner">
                <CheckCircle2 size={44} />
              </div>

              <div>
                <span className="bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
                  Appointment Confirmed &bull; {confirmationCode}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase">Thank You, {formData.fullName}!</h2>
                <p className="text-gray-600 text-base font-light max-w-xl mx-auto mt-2">
                  Your consultation appointment has been scheduled. A confirmation summary has been sent to <strong className="text-[#411548] font-bold">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 md:p-8 text-left border border-gray-200 max-w-xl mx-auto space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-400 uppercase font-bold">Consultation Focus:</span>
                  <span className="font-bold text-[#411548]">{getEffectiveServiceTitle()}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-400 uppercase font-bold">Date & Time:</span>
                  <span className="font-bold text-gray-900">{formData.appointmentDate} at {formData.appointmentTime}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-400 uppercase font-bold">Format:</span>
                  <span className="font-bold text-gray-900">{formData.meetingFormat}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-400 uppercase font-bold">Phone Contact:</span>
                  <span className="font-bold text-gray-900">{formData.phone}</span>
                </div>
                {formData.notes && (
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-400 uppercase font-bold">Additional Notes:</span>
                    <span className="font-medium text-gray-800 italic max-w-[240px] text-right">{formData.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/how-we-work"
                  className="bg-[#411548] text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md flex items-center gap-2"
                >
                  Learn How We Work <ChevronRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
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
