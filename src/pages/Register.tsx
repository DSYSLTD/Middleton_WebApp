import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  RefreshCw,
  UploadCloud,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { useAuth } from '../context/AuthContext';
import FormProgressBar from '../components/FormProgressBar';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Step 1 Form State
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Family Representative');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const registrationYear = new Date().getFullYear().toString();
  
  // Step 2 OTP State
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        setErrors(prev => ({ ...prev, photo: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleAutoFillOtp = () => {
    setEmailOtp('5824');
    setPhoneOtp('5824');
    setOtpError('');
  };

  const handleResendOtp = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtpError('');
    }, 1000);
  };

  const handleStep2Verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOtp || !phoneOtp) {
      setOtpError('Please enter both email and phone OTP codes.');
      return;
    }
    setOtpError('');

    // Register user in Auth Context
    registerUser({
      name,
      email,
      phone,
      password,
      relationship: relationship || 'Family Representative',
      memberSince: registrationYear,
      role: 'member',
      profilePic: profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });

    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Standardized Hero Header */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden text-center">
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <User size={12} className="text-white" /> Member Registration
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight text-white mb-4">
              Join Middleton Community
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Create an account to submit obituaries, share condolences, and coordinate funeral services with full security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multistep Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-20 mb-12">
        <FormProgressBar
          steps={[
            { num: 1, label: 'Details & Representative Photo' },
            { num: 2, label: 'Verification Code (OTP)' },
            { num: 3, label: 'Registration Complete' }
          ]}
          currentStep={step}
        />
      </div>

      {/* Main Multistep Container */}
      <div className="max-w-xl mx-auto px-4">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-200"
          >
            <h2 className="text-2xl font-serif font-black text-[#411548] uppercase mb-2">
              Step 1: Account Information
            </h2>
            <p className="text-gray-500 text-xs font-light mb-8">
              Fill in your contact information and upload an optional profile photo.
            </p>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full border-4 border-[#411548]/10 overflow-hidden bg-gray-50 flex items-center justify-center shadow-md">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={36} className="text-gray-400" />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#411548] text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                    <Camera size={14} />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                  Click to Upload Profile Picture
                </span>
                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#411548] focus:bg-white transition-all"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Relationship to Deceased / Family Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Relation to Family / Deceased <span className="text-red-500">*</span>
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#411548] focus:bg-white transition-all font-medium text-gray-800"
                >
                  <option value="Daughter">Daughter</option>
                  <option value="Son">Son</option>
                  <option value="Spouse / Partner">Spouse / Partner</option>
                  <option value="Family Representative">Family Representative</option>
                  <option value="Grandchild">Grandchild</option>
                  <option value="Parent / Guardian">Parent / Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Close Relative / Friend">Close Relative / Friend</option>
                  <option value="Funeral Director / Coordinator">Funeral Director / Coordinator</option>
                </select>
                <p className="text-[11px] text-gray-400 mt-1 font-light">
                  This relation will be displayed on the Family Member card when you submit an obituary.
                </p>
              </div>

              {/* Automatic Member Since Badge */}
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] block">Membership Status</span>
                  <p className="text-xs text-gray-600 font-light mt-0.5">Automatic verification per registration year</p>
                </div>
                <span className="bg-[#411548] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  Member Since {registrationYear}
                </span>
              </div>

              {/* Live Card Preview */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3 text-center">
                  Family Representative Card Preview
                </span>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#411548]/20 bg-purple-50 flex items-center justify-center">
                    {profilePic ? (
                      <img src={profilePic} alt="Representative" className="w-full h-full object-cover" />
                    ) : (
                      <User size={28} className="text-gray-400" />
                    )}
                  </div>
                  <h4 className="font-bold text-base text-gray-900">{name || 'Your Full Name'}</h4>
                  <p className="text-xs font-semibold text-[#411548]">{relationship || 'Family Representative'}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Member Since : {registrationYear}</p>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#411548] focus:bg-white transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (952) 486-2871"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#411548] focus:bg-white transition-all"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Preferred Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#411548] focus:bg-white transition-all"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed To OTP Verification <ChevronRight size={16} />
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-500">
                Already registered?{' '}
                <Link to="/portal" className="text-[#411548] font-bold underline">
                  Access Portal here
                </Link>
              </p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-200"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 text-[#411548] rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound size={28} />
              </div>
              <h2 className="text-2xl font-serif font-black text-[#411548] uppercase mb-1">
                Step 2: Confirm OTP Codes
              </h2>
              <p className="text-gray-500 text-xs font-light">
                We've sent a 4-digit verification code to <span className="font-bold text-gray-900">{email}</span> and <span className="font-bold text-gray-900">{phone}</span>.
              </p>
            </div>

            {otpError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 text-xs font-bold mb-6 text-center">
                {otpError}
              </div>
            )}

            <form onSubmit={handleStep2Verify} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Email OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter 4-digit email code"
                  className="w-full text-center py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-mono font-bold tracking-widest focus:outline-none focus:border-[#411548]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Phone SMS OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="Enter 4-digit SMS code"
                  className="w-full text-center py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-mono font-bold tracking-widest focus:outline-none focus:border-[#411548]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="flex-1 bg-purple-50 text-[#411548] py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-purple-100 transition-colors"
                >
                  Demo Fill OTP (5824)
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#411548] hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                Confirm OTP & Create Account <CheckCircle2 size={16} />
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-200 text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>

            <h2 className="text-3xl font-serif font-black text-[#411548] uppercase mb-3">
              Registration Confirmed!
            </h2>
            <p className="text-gray-600 text-sm font-light max-w-md mx-auto mb-8 leading-relaxed">
              Your email and phone number have been verified. You are now logged in as a registered member and can post obituaries, submit condolences, or manage memorial requests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit-obituary"
                className="bg-[#411548] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                Post An Obituary <ArrowRight size={16} />
              </Link>
              <Link
                to="/obituaries"
                className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2"
              >
                View Obituaries & Leave Condolence
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
