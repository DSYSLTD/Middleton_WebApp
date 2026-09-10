import React, { useState, useMemo } from 'react';
import { 
  Lock, KeyRound, ShieldCheck, ShieldAlert, Eye, EyeOff, 
  CheckCircle2, XCircle, AlertTriangle, Wand2, Copy, Check, 
  Info, History, Sliders, Shield, RefreshCw, BookOpen, AlertCircle
} from 'lucide-react';

const COMMON_DICTIONARY_PASSWORDS = [
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', 
  '111111', '1234567', 'dragon', 'welcome', 'admin', 'admin123', 'password1',
  'middleton', 'middleton2026', 'middleton123', 'funeral', 'pass123', 'guest',
  'master', 'letmein', 'p@ssword', 'iloveyou', 'abc123', 'change123', 'superman'
];

export interface SecurityRulesConfig {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  enforceDictionaryCheck: boolean;
  historyCheckCount: number;
  expirationDays: number;
}

const DEFAULT_SECURITY_RULES: SecurityRulesConfig = {
  minLength: 8,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  enforceDictionaryCheck: true,
  historyCheckCount: 3,
  expirationDays: 90
};

const MOCK_PASSWORD_HISTORY = [
  'MiddletonAdmin2026!',
  'StaffSecureMiddleton2026!',
  'OldPassword123!',
  'Admin@2025'
];

interface Props {
  onShowToast: (msg: string) => void;
  username?: string;
}

export default function CmsPasswordManager({
  onShowToast,
  username = 'middleton_admin'
}: Props) {
  // Core Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility Toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Status & Feedback
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generator State
  const [showGenerator, setShowGenerator] = useState(false);
  const [genLength, setGenLength] = useState(16);
  const [genIncludeUpper, setGenIncludeUpper] = useState(true);
  const [genIncludeLower, setGenIncludeLower] = useState(true);
  const [genIncludeNumbers, setGenIncludeNumbers] = useState(true);
  const [genIncludeSymbols, setGenIncludeSymbols] = useState(true);
  const [copiedGenerated, setCopiedGenerated] = useState(false);

  // Rules Configuration State
  const [rules, setRules] = useState<SecurityRulesConfig>(DEFAULT_SECURITY_RULES);
  const [showRulesConfig, setShowRulesConfig] = useState(false);

  // Show status helper
  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    onShowToast(text);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // PASSWORD EVALUATION ENGINE
  const evaluation = useMemo(() => {
    const pass = newPassword;
    const len = pass.length;

    const hasMinLen = len >= rules.minLength;
    const hasMaxLen = len <= rules.maxLength;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

    const lowerPass = pass.toLowerCase();
    const isCommonDictionary = COMMON_DICTIONARY_PASSWORDS.some(dict => lowerPass.includes(dict));
    const isRepeatedChar = /^(.)\1+$/.test(pass);
    const isSequential = /(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef)/i.test(pass);
    const hasDictionaryIssue = isCommonDictionary || isRepeatedChar || isSequential;

    const matchesHistory = MOCK_PASSWORD_HISTORY.slice(0, rules.historyCheckCount).includes(pass);

    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSpecial) poolSize += 32;
    const entropyBits = len > 0 && poolSize > 0 ? Math.round(len * Math.log2(poolSize)) : 0;

    let score = 0;
    if (len >= rules.minLength) score += 20;
    if (len >= 12) score += 15;
    if (len >= 16) score += 10;
    if (hasUpper) score += 10;
    if (hasLower) score += 10;
    if (hasNumber) score += 10;
    if (hasSpecial) score += 15;
    if (entropyBits >= 60) score += 10;

    if (hasDictionaryIssue) score = Math.max(10, score - 35);
    if (matchesHistory) score = Math.max(5, score - 40);
    if (len < rules.minLength) score = Math.min(score, 25);

    score = Math.min(100, Math.max(0, score));

    let level: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Excellent' = 'Very Weak';
    let colorClass = 'bg-red-50 text-red-700 border-red-200';
    let barColor = 'bg-red-500';

    if (score <= 20) {
      level = 'Very Weak';
      colorClass = 'bg-red-50 text-red-700 border-red-200';
      barColor = 'bg-red-500';
    } else if (score <= 40) {
      level = 'Weak';
      colorClass = 'bg-orange-50 text-orange-700 border-orange-200';
      barColor = 'bg-orange-500';
    } else if (score <= 65) {
      level = 'Moderate';
      colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
      barColor = 'bg-amber-500';
    } else if (score <= 85) {
      level = 'Strong';
      colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      barColor = 'bg-emerald-500';
    } else {
      level = 'Excellent';
      colorClass = 'bg-emerald-100 text-[#411548] border-emerald-300';
      barColor = 'bg-[#411548]';
    }

    return {
      score,
      level,
      colorClass,
      barColor,
      entropyBits,
      hasMinLen,
      hasMaxLen,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      hasDictionaryIssue,
      matchesHistory,
      isValid: hasMinLen && hasMaxLen && 
               (!rules.requireUppercase || hasUpper) &&
               (!rules.requireLowercase || hasLower) &&
               (!rules.requireNumbers || hasNumber) &&
               (!rules.requireSpecialChars || hasSpecial) &&
               (!rules.enforceDictionaryCheck || !hasDictionaryIssue) &&
               !matchesHistory
    };
  }, [newPassword, rules]);

  // Handle Smart Generator
  const handleGeneratePassword = () => {
    let chars = '';
    if (genIncludeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (genIncludeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (genIncludeNumbers) chars += '0123456789';
    if (genIncludeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    let generated = '';
    for (let i = 0; i < genLength; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setNewPassword(generated);
    setConfirmPassword(generated);
    showStatus('success', 'Smart secure password generated and applied to form!');
  };

  const handleCopyGenerated = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      setCopiedGenerated(true);
      setTimeout(() => setCopiedGenerated(false), 2000);
    }
  };

  // Submit Password Change Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!currentPassword) {
      showStatus('error', 'Please enter your current portal password.');
      return;
    }

    if (!newPassword) {
      showStatus('error', 'Please enter a new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showStatus('error', 'New password and confirm password do not match.');
      return;
    }

    if (!evaluation.isValid) {
      showStatus('error', 'Password does not satisfy enterprise security policy requirements.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showStatus('success', `Password updated successfully for account (${username}) under AES-256 policy.`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. MODULE HEADER BANNER DIRECTLY FROM ATTACHED DESIGN */}
      <div className="bg-gradient-to-r from-[#411548] via-[#2f0d34] to-[#411548] text-white rounded-2xl border border-[#C5A059]/30 shadow-lg p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-[#C5A059] shrink-0" />
            <span>PASSWORD EVALUATOR &amp; SECURITY MODULE</span>
          </h2>
          <span className="px-3.5 py-1.5 bg-[#C5A059]/20 text-[#C5A059] text-xs font-black rounded-full border border-[#C5A059]/40 uppercase shadow-2xs">
            AES-256 Evaluator
          </span>
        </div>

        <p className="text-xs md:text-sm text-gray-200 font-medium leading-relaxed max-w-4xl">
          Live password strength evaluation, security rule compliance, dictionary breach checks, and history validator.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowGenerator(!showGenerator)}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#a88414] text-[#411548] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Wand2 className="w-4 h-4 stroke-[2.5]" /> Password Generator
          </button>

          <button
            type="button"
            onClick={() => setShowRulesConfig(!showRulesConfig)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider border border-white/20 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#C5A059]" /> Security Policy Rules
          </button>
        </div>
      </div>

      {/* 2. GLOBAL STATUS BANNER */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 animate-in fade-in duration-200 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
              : 'bg-red-50 text-red-900 border-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-black text-xs uppercase block">
              {statusMsg.type === 'success' ? 'Security Action Complete' : 'Validation Error'}
            </span>
            <p className="text-xs font-bold leading-relaxed mt-0.5">{statusMsg.text}</p>
          </div>
        </div>
      )}

      {/* 3. EXPANDABLE SMART GENERATOR TOOL */}
      {showGenerator && (
        <div className="bg-gradient-to-br from-[#411548] to-[#250829] text-white p-6 rounded-2xl border border-[#C5A059] space-y-4 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-black text-sm uppercase text-[#C5A059]">Smart Password Generator</h3>
            </div>
            <span className="text-[10px] font-bold text-amber-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
              Instant Compliant Fill
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold">
            <label className="flex items-center gap-2 bg-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/20">
              <input
                type="checkbox"
                checked={genIncludeUpper}
                onChange={(e) => setGenIncludeUpper(e.target.checked)}
                className="rounded text-[#411548] focus:ring-[#C5A059]"
              />
              <span>Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center gap-2 bg-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/20">
              <input
                type="checkbox"
                checked={genIncludeLower}
                onChange={(e) => setGenIncludeLower(e.target.checked)}
                className="rounded text-[#411548] focus:ring-[#C5A059]"
              />
              <span>Lowercase (a-z)</span>
            </label>

            <label className="flex items-center gap-2 bg-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/20">
              <input
                type="checkbox"
                checked={genIncludeNumbers}
                onChange={(e) => setGenIncludeNumbers(e.target.checked)}
                className="rounded text-[#411548] focus:ring-[#C5A059]"
              />
              <span>Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-2 bg-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/20">
              <input
                type="checkbox"
                checked={genIncludeSymbols}
                onChange={(e) => setGenIncludeSymbols(e.target.checked)}
                className="rounded text-[#411548] focus:ring-[#C5A059]"
              />
              <span>Symbols (!@#$)</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-200 whitespace-nowrap">Length: {genLength} chars</span>
              <input
                type="range"
                min={8}
                max={32}
                value={genLength}
                onChange={(e) => setGenLength(Number(e.target.value))}
                className="w-full sm:w-40 accent-[#C5A059] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {newPassword && (
                <button
                  type="button"
                  onClick={handleCopyGenerated}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedGenerated ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
                  {copiedGenerated ? 'Copied!' : 'Copy'}
                </button>
              )}
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-4 py-2.5 bg-[#C5A059] hover:bg-amber-500 text-[#411548] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-[#411548]" /> Generate &amp; Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONFIGURABLE SECURITY RULES MODAL */}
      {showRulesConfig && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#411548]" />
              <h3 className="font-black text-sm uppercase text-[#411548]">Configure Password Security Policy Rules</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowRulesConfig(false)}
              className="text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer"
            >
              Close Rules
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Min Length (Chars)</label>
              <input
                type="number"
                min={6}
                max={32}
                value={rules.minLength}
                onChange={(e) => setRules({ ...rules, minLength: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Max History Retention</label>
              <input
                type="number"
                min={1}
                max={10}
                value={rules.historyCheckCount}
                onChange={(e) => setRules({ ...rules, historyCheckCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Expiration Period (Days)</label>
              <input
                type="number"
                min={30}
                max={365}
                value={rules.expirationDays}
                onChange={(e) => setRules({ ...rules, expirationDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rules.requireUppercase}
                onChange={(e) => setRules({ ...rules, requireUppercase: e.target.checked })}
                className="rounded text-[#411548]"
              />
              <span className="font-bold text-gray-800">Require Uppercase Letter</span>
            </label>

            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rules.requireLowercase}
                onChange={(e) => setRules({ ...rules, requireLowercase: e.target.checked })}
                className="rounded text-[#411548]"
              />
              <span className="font-bold text-gray-800">Require Lowercase Letter</span>
            </label>

            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rules.requireNumbers}
                onChange={(e) => setRules({ ...rules, requireNumbers: e.target.checked })}
                className="rounded text-[#411548]"
              />
              <span className="font-bold text-gray-800">Require Digits</span>
            </label>

            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rules.requireSpecialChars}
                onChange={(e) => setRules({ ...rules, requireSpecialChars: e.target.checked })}
                className="rounded text-[#411548]"
              />
              <span className="font-bold text-gray-800">Require Special Symbols</span>
            </label>

            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rules.enforceDictionaryCheck}
                onChange={(e) => setRules({ ...rules, enforceDictionaryCheck: e.target.checked })}
                className="rounded text-[#411548]"
              />
              <span className="font-bold text-gray-800">Enforce Dictionary &amp; Leak Check</span>
            </label>
          </div>
        </div>
      )}

      {/* 5. PASSWORD EVALUATOR & CHANGE FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#411548] uppercase flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#C5A059]" /> Account Credential Details
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Updating portal password for user account: <strong className="text-gray-900 font-extrabold">{username}</strong>
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-[10px] font-black uppercase">
                Active User Session
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 flex items-center justify-between">
                  <span>Current Portal Password *</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-[#411548] focus:ring-2 focus:ring-[#411548]/20 outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 flex items-center justify-between">
                  <span>New Security Password *</span>
                  <span className="text-[10px] text-gray-400 font-bold">Min {rules.minLength} characters</span>
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Type or generate a strong password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-[#411548] focus:ring-2 focus:ring-[#411548]/20 outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* REAL-TIME STRENGTH METER & EVALUATOR CARD */}
              {newPassword && (
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#411548]" />
                      <span className="text-xs font-black uppercase text-gray-800">Password Strength Evaluator</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase flex items-center gap-1.5 ${evaluation.colorClass}`}>
                      <span>{evaluation.level}</span>
                      <span className="opacity-60">({evaluation.score}/100)</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${evaluation.barColor}`} 
                      style={{ width: `${evaluation.score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 pt-1 border-t border-gray-200">
                    <span>Calculated Entropy: <strong className="text-[#411548] font-black">{evaluation.entropyBits} bits</strong></span>
                    <span>Policy Verification: {evaluation.isValid ? <strong className="text-emerald-700 font-black">Compliant ✓</strong> : <strong className="text-red-600 font-black">Incomplete ✗</strong>}</span>
                  </div>

                  {/* REQUIREMENT CHECKLIST GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-bold pt-2 border-t border-gray-200">
                    <div className={`flex items-center gap-2 ${evaluation.hasMinLen ? 'text-emerald-700' : 'text-gray-400'}`}>
                      {evaluation.hasMinLen ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                      <span>Minimum {rules.minLength} characters</span>
                    </div>

                    {rules.requireUppercase && (
                      <div className={`flex items-center gap-2 ${evaluation.hasUpper ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {evaluation.hasUpper ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                        <span>Uppercase letter (A-Z)</span>
                      </div>
                    )}

                    {rules.requireLowercase && (
                      <div className={`flex items-center gap-2 ${evaluation.hasLower ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {evaluation.hasLower ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                        <span>Lowercase letter (a-z)</span>
                      </div>
                    )}

                    {rules.requireNumbers && (
                      <div className={`flex items-center gap-2 ${evaluation.hasNumber ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {evaluation.hasNumber ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                        <span>Digit / Number (0-9)</span>
                      </div>
                    )}

                    {rules.requireSpecialChars && (
                      <div className={`flex items-center gap-2 ${evaluation.hasSpecial ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {evaluation.hasSpecial ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                        <span>Special Symbol (!@#$)</span>
                      </div>
                    )}

                    {rules.enforceDictionaryCheck && (
                      <div className={`flex items-center gap-2 ${!evaluation.hasDictionaryIssue ? 'text-emerald-700' : 'text-red-600 font-black'}`}>
                        {!evaluation.hasDictionaryIssue ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />}
                        <span>No dictionary / common patterns</span>
                      </div>
                    )}

                    <div className={`flex items-center gap-2 ${!evaluation.matchesHistory ? 'text-emerald-700' : 'text-red-600 font-black'}`}>
                      {!evaluation.matchesHistory ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />}
                      <span>Not in recent password history</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-[#411548] focus:ring-2 focus:ring-[#411548]/20 outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#411548] hover:bg-[#2e0933] text-[#C5A059] font-black text-xs uppercase tracking-[0.15em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-[#C5A059]" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                )}
                {isSubmitting ? 'Verifying & Updating Password...' : 'Update Security Password'}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: SECURITY POLICIES & BEST PRACTICES */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border-t-4 border-t-[#C5A059] border-x border-b border-gray-200 shadow-xs space-y-4">
            <h3 className="font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Security Best Practices
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-[#C5A059]/30 space-y-1">
                <span className="font-black text-[#411548] uppercase text-[10px] block">Passphrase Method</span>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Combine 3 to 4 random memorable words (e.g. <code>Memorial#Quiet2026!Dignity</code>) for maximum entropy.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-black text-gray-800 uppercase text-[10px] block">No Account Reuse</span>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Never reuse your administrator studio password on external websites or personal social accounts.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-black text-gray-800 uppercase text-[10px] block">Password Expiration</span>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Portal passwords automatically expire every {rules.expirationDays} days to ensure compliance with enterprise privacy standards.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#411548] to-[#250829] p-6 rounded-2xl border border-[#C5A059] text-white space-y-3 shadow-md">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C5A059]" />
              <h4 className="font-black text-sm uppercase text-[#C5A059]">Enterprise Access Policy</h4>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-medium">
              Middleton Funeral Services administrative logins enforce strict brute-force lockout, session isolation, and cryptographic hashing.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
