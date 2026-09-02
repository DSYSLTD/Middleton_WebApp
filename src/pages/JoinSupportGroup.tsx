import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MessageSquare 
} from 'lucide-react';

export default function JoinSupportGroup() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    groupFocus: 'Spousal & Partner Loss Support Circle',
    format: 'In-Person',
    fullName: '',
    phone: '',
    email: '',
    relationship: 'Spouse/Partner',
    preferredDay: 'Tuesday Evenings (6:30 PM)',
    urgency: 'Immediate - Ready to join next session',
    additionalNotes: '',
  });

  const [confirmationCode, setConfirmationCode] = useState('');

  const groups = [
    { title: 'Spousal & Partner Loss Support Circle', schedule: 'Tuesdays @ 6:30 PM', desc: 'A safe, compassionate space for those navigating the loss of a life partner.' },
    { title: 'Parent & Child Loss Bereavement', schedule: 'Thursdays @ 7:00 PM', desc: 'Specialized support honoring the unique grief of losing a child or parent.' },
    { title: 'Adult Sibling & Extended Family Loss', schedule: 'Saturdays @ 10:00 AM', desc: 'Guided sharing for adults mourning siblings, grandparents, or close relatives.' },
    { title: 'General Healing & Grief Recovery Circle', schedule: 'Wednesdays @ 5:30 PM', desc: 'An inclusive weekly gathering exploring grief coping strategies and memorialization.' },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
        alert('Please fill out your name, phone number, and email address.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const code = 'SG-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);
      setStep(4);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Standard Header Hero Banner */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <Users size={12} className="text-white" /> Community & Compassionate Healing
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Join A Grief Support Group
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              You do not have to walk through grief alone. Connect with professional grief counselors and compassionate peers in Minnesota.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Multi-Step Form */}
      <div className="container mx-auto px-4 max-w-4xl py-6 md:py-8">
        {/* Progress Step Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-0 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#411548] transition-all duration-500 -z-0 -translate-y-1/2"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all z-10 ${
                  step >= s
                    ? 'bg-[#411548] text-white ring-4 ring-purple-100 shadow-md'
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {step > s ? <CheckCircle2 size={18} /> : s}
              </div>
            ))}
          </div>

          <div className="flex justify-between max-w-2xl mx-auto text-[10px] md:text-xs font-extrabold uppercase tracking-wider text-gray-600 mt-2 px-1 text-center">
            <span className={step >= 1 ? 'text-[#411548]' : ''}>1. Focus & Format</span>
            <span className={step >= 2 ? 'text-[#411548]' : ''}>2. Your Details</span>
            <span className={step >= 3 ? 'text-[#411548]' : ''}>3. Schedule</span>
            <span className={step >= 4 ? 'text-[#411548]' : ''}>4. Registration</span>
          </div>
        </div>

        {/* Form Container with High-Visibility High-Contrast Styling */}
        <div className="bg-white border-2 border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleNext}>
            {/* STEP 1: Select Support Group Focus */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h2 className="text-2xl font-serif font-black text-[#411548] uppercase mb-2">Select Support Group Circle</h2>
                  <p className="text-gray-600 text-sm font-medium">Choose the support group focus that best matches your grief journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groups.map((g) => (
                    <div
                      key={g.title}
                      onClick={() => setFormData({ ...formData, groupFocus: g.title })}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.groupFocus === g.title
                          ? 'border-[#411548] bg-purple-50/70 shadow-md scale-[1.01]'
                          : 'border-gray-200 bg-white hover:border-[#411548]/40 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-serif font-black text-lg text-[#411548] uppercase">{g.title}</span>
                        {formData.groupFocus === g.title && <CheckCircle2 className="text-[#411548] shrink-0" size={20} />}
                      </div>
                      <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full inline-block mb-3">
                        {g.schedule}
                      </span>
                      <p className="text-xs text-gray-700 font-medium leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                    Preferred Attendance *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['In-Person', 'Virtually (Online)', 'Hybrid / Flexible'].map((fmt) => (
                      <button
                        type="button"
                        key={fmt}
                        onClick={() => setFormData({ ...formData, format: fmt })}
                        className={`py-4 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 transition-all ${
                          formData.format === fmt
                            ? 'border-[#411548] bg-[#411548] text-white shadow-lg'
                            : 'border-gray-300 bg-white text-gray-800 hover:border-[#411548]'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#411548] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
                  >
                    Continue to Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Participant Details */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h2 className="text-2xl font-serif font-black text-[#411548] uppercase mb-2">Your Contact Information</h2>
                  <p className="text-gray-600 text-sm font-medium">All registrations are strictly confidential and treated with care.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <User size={14} className="text-[#411548]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Margaret Henderson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Phone size={14} className="text-[#411548]" /> Phone Number (USA) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(952) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Mail size={14} className="text-[#411548]" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="margaret@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                      Relationship to Deceased (Optional)
                    </label>
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                    >
                      <option value="Spouse/Partner">Spouse / Life Partner</option>
                      <option value="Parent">Parent</option>
                      <option value="Child/Adult Child">Child / Adult Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Grandparent/Relative">Grandparent / Relative</option>
                      <option value="Close Friend">Close Friend</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-100 text-gray-800 px-8 py-5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#411548] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
                  >
                    Continue to Schedule <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Preferences & Schedule */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h2 className="text-2xl font-serif font-black text-[#411548] uppercase mb-2">Timing & Special Accommodations</h2>
                  <p className="text-gray-600 text-sm font-medium">Let us know how we can make your group integration comfortable.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                    Preferred Session Day & Time
                  </label>
                  <select
                    value={formData.preferredDay}
                    onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                    className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                  >
                    <option value="Tuesday Evenings (6:30 PM)">Tuesday Evenings (6:30 PM)</option>
                    <option value="Wednesday Late Afternoons (5:30 PM)">Wednesday Late Afternoons (5:30 PM)</option>
                    <option value="Thursday Evenings (7:00 PM)">Thursday Evenings (7:00 PM)</option>
                    <option value="Saturday Mornings (10:00 AM)">Saturday Mornings (10:00 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                    When Would You Like to Start?
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                  >
                    <option value="Immediate - Ready to join next session">Immediate - Ready to join next upcoming session</option>
                    <option value="Next Month - Planning ahead">Next Month - Planning ahead</option>
                    <option value="Request 1-on-1 counselor call first">Request a 1-on-1 grief counselor call prior to group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                    Special Requests or Private Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us anything that will help our group facilitator welcome you..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-white border-2 border-gray-300 rounded-2xl p-5 text-sm font-semibold text-gray-900 outline-none focus:border-[#411548] transition-all"
                  ></textarea>
                </div>

                {/* Consent declaration */}
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <input
                    type="checkbox"
                    id="support-group-consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#411548] focus:ring-[#411548] cursor-pointer shrink-0"
                  />
                  <label htmlFor="support-group-consent" className="text-xs text-gray-600 font-light leading-relaxed cursor-pointer">
                    I consent to Middleton Funeral Services holding my registration data to organize support group sessions in accordance with the <Link to="/privacy-policy" className="underline text-[#411548] font-bold">Privacy Policy</Link>.
                  </label>
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-100 text-gray-800 px-8 py-5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#411548] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
                  >
                    Confirm & Join Support Group <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation */}
            {step === 4 && (
              <div className="text-center py-8 space-y-8 animate-in fade-in duration-500">
                <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={56} />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-green-600 block mb-2">
                    Registration Confirmed &bull; {confirmationCode}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase">Welcome, {formData.fullName}!</h2>
                  <p className="text-gray-700 text-base font-medium max-w-lg mx-auto mt-3 leading-relaxed">
                    You are registered for the <strong className="text-[#411548] font-bold">{formData.groupFocus}</strong> ({formData.format}). A welcome summary has been sent to <strong className="text-black">{formData.email}</strong>.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-3xl border border-purple-200 max-w-md mx-auto text-left space-y-3 text-xs font-medium text-gray-800">
                  <div className="flex items-center gap-2 text-[#411548] font-black uppercase tracking-wider border-b border-purple-200 pb-2">
                    <ShieldCheck size={16} /> Group Details
                  </div>
                  <p><strong className="text-gray-900">Circle:</strong> {formData.groupFocus}</p>
                  <p><strong className="text-gray-900">Format:</strong> {formData.format}</p>
                  <p><strong className="text-gray-900">Session Window:</strong> {formData.preferredDay}</p>
                  <p><strong className="text-gray-900">Location:</strong> 24173 Williams Rd, Rogers, MN 55374</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    to="/grief-support"
                    className="bg-[#411548] text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                  >
                    Return to Grief Support
                  </Link>
                  <Link
                    to="/"
                    className="bg-gray-100 text-gray-800 px-8 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
