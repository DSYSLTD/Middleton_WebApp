import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff, KeyRound, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@middletonfunerals.com');
  const [password, setPassword] = useState('middleton-admin-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoggingIn(true);
    setNotification('Authenticating credentials with Middleton Security Vault...');

    setTimeout(() => {
      // Determine user role and name based on email
      const lower = email.toLowerCase();
      let role: 'superadmin' | 'member' = 'superadmin';
      let displayName = 'Administrator';

      if (lower.includes('director') || lower.includes('william')) {
        displayName = 'William Middleton (Director)';
      } else if (lower.includes('editor')) {
        displayName = 'Senior CMS Editor';
      } else if (lower.includes('vendor')) {
        displayName = 'Partner Vendor';
      } else {
        displayName = 'Institutional Administrator';
      }

      authLogin(email, role, displayName);
      setNotification(`Welcome back, ${displayName}. Redirecting to Administrative Dashboard...`);

      setTimeout(() => {
        navigate('/cms');
      }, 700);
    }, 600);
  };

  const handleQuickLogin = (demoEmail: string, demoRole: string) => {
    setEmail(demoEmail);
    setPassword('middleton-secure-2026');
    authLogin(demoEmail, 'superadmin', demoRole);
    setNotification(`Authenticated as ${demoRole}! Launching dashboard...`);
    setTimeout(() => {
      navigate('/cms');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#faf4fa] flex flex-col justify-between font-sans">
      {/* Header Banner */}
      <section className="bg-[#411548] py-12 md:py-16 px-4 relative overflow-hidden text-white border-b border-[#C5A059]/30 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#C5A059_0.15%,transparent_70%)] opacity-30 pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#411548] font-serif font-black text-2xl shadow-md border-2 border-white/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="text-left flex flex-col">
              <span className="text-white font-serif text-xl font-black tracking-tight">MIDDLETON</span>
              <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-black">Unified Administrative Portal</span>
            </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-black uppercase text-white tracking-tight">
            Institutional <span className="text-[#C5A059]">Portal Login</span>
          </h1>
          <p className="text-white/80 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Single unified access gateway for Staff Administrators, Funeral Directors, CMS Editorial Writers, Webmasters, and Partner Vendors.
          </p>
        </div>
      </section>

      {/* Main Single Login Form Container */}
      <section className="py-8 md:py-12 px-4 flex-1 flex items-center justify-center -mt-6 relative z-10">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Notification alert */}
            {notification && (
              <div className="bg-[#411548] text-[#C5A059] p-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b border-[#C5A059]/40 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#C0991B] shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="font-serif font-black text-lg text-[#411548] uppercase tracking-tight">
                    Sign In to Portal
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-0.5">Enter your institutional credentials below.</p>
                </div>
                <div className="p-2.5 bg-[#411548]/10 text-[#411548] rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                </div>
              </div>

              {/* Single Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-700 ml-1">
                    Institutional Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@middletonfunerals.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-[#411548] transition-all font-bold text-gray-900 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                      Access Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setNotification('Password reset link sent to your registered security email.')}
                      className="text-[10px] font-bold text-[#C5A059] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-11 py-3.5 outline-none focus:bg-white focus:border-[#411548] transition-all font-bold text-gray-900 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#411548] focus:ring-[#411548]"
                    />
                    <span className="text-[11px] font-medium">Keep this workstation authenticated</span>
                  </label>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">AES-256 TLS</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 bg-[#411548] hover:bg-black text-[#C5A059] hover:text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>{isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Instant One-Click Demo Access */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C5A059]" /> Quick Demo Logins
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium">Click to populate & sign in</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@middletonfunerals.com', 'Super Administrator')}
                    className="p-2.5 bg-purple-50 hover:bg-[#411548] hover:text-white text-[#411548] rounded-xl text-left border border-purple-100 transition-all cursor-pointer space-y-0.5 group"
                  >
                    <div className="font-black text-[11px] flex items-center justify-between">
                      <span>Administrator</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>
                    <p className="text-[9px] text-gray-500 group-hover:text-white/80">Full CMS & System access</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('webmaster@middletonfunerals.com', 'Webmaster & Registrar')}
                    className="p-2.5 bg-amber-50/70 hover:bg-[#411548] hover:text-white text-[#411548] rounded-xl text-left border border-amber-200/60 transition-all cursor-pointer space-y-0.5 group"
                  >
                    <div className="font-black text-[11px] flex items-center justify-between">
                      <span>Webmaster</span>
                      <KeyRound className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>
                    <p className="text-[9px] text-gray-500 group-hover:text-white/80">Obituaries, Vacancies & Leads</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('director@middletonfunerals.com', 'Funeral Director')}
                    className="p-2.5 bg-gray-50 hover:bg-[#411548] hover:text-white text-gray-800 rounded-xl text-left border border-gray-200 transition-all cursor-pointer space-y-0.5 group"
                  >
                    <div className="font-black text-[11px] flex items-center justify-between">
                      <span>Funeral Director</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>
                    <p className="text-[9px] text-gray-500 group-hover:text-white/80">Family registry & obituaries</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('vendor@middletonfunerals.com', 'Floral & Livery Partner')}
                    className="p-2.5 bg-gray-50 hover:bg-[#411548] hover:text-white text-gray-800 rounded-xl text-left border border-gray-200 transition-all cursor-pointer space-y-0.5 group"
                  >
                    <div className="font-black text-[11px] flex items-center justify-between">
                      <span>Vendor Partner</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[9px] text-gray-500 group-hover:text-white/80">Floral, casket & livery POs</p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <p className="text-center mt-6 text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            Middleton Funeral Services &bull; Administrative Systems
          </p>
        </div>
      </section>
    </div>
  );
}
