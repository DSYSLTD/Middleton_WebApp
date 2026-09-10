import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Send, Upload, User, Mail, Phone, Briefcase, 
  MapPin, CheckCircle2, ChevronRight, ChevronLeft, FileText, Globe, 
  AlertCircle, ShieldCheck, Lock, Building2, Calendar, 
  Award, BookOpen, Plus, Trash2, Check, Download, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  useJobs, MINNESOTA_COUNTIES, EducationRecord, EmploymentRecord, 
  MembershipRecord, ReferenceRecord 
} from '../hooks/useJobs';
import { COUNTY_DATA } from '../lib/countyData';

export default function JobApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vacancies, submitJobApplication } = useJobs();

  // Read URL params or state
  const queryParams = new URLSearchParams(location.search);
  const vacancyIdFromUrl = queryParams.get('vacancyId') || location.state?.vacancyId;
  const selectedVacancy = vacancies.find(v => v.id === vacancyIdFromUrl) || vacancies[0];

  // Verification Gateway state
  const [verificationDone, setVerificationDone] = useState(false);
  const [initPhone, setInitPhone] = useState('(507) 388-2988');
  const [initEmail, setInitEmail] = useState('applicant@middletonfunerals.com');
  const [otpSent, setOtpSent] = useState(false);
  const [smsOtpInput, setSmsOtpInput] = useState('');
  const [emailOtpInput, setEmailOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [simulatedSmsCode, setSimulatedSmsCode] = useState('');
  const [simulatedEmailCode, setSimulatedEmailCode] = useState('');

  // Multi-Step Form state (Steps 1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Identity & Contact
  const [identity, setIdentity] = useState({
    surname: '',
    firstName: '',
    middleName: '',
    nationalId: '',
    nationalIdDocName: '',
    kraPin: '',
    kraPinCertName: '',
    phone: '',
    email: '',
    county: 'Blue Earth',
    subCounty: 'Mankato',
    ward: 'Downtown Center'
  });

  // Step 2: Education History
  const [educationList, setEducationList] = useState<EducationRecord[]>([
    { id: 'edu-1', level: 'Degree', institution: 'University of Minnesota - Mortuary Science', startYear: '2017', endYear: '2021', docName: 'Mortuary_Science_Degree.pdf' }
  ]);

  // Step 3: Employment History
  const [employmentList, setEmploymentList] = useState<EmploymentRecord[]>([
    { id: 'emp-1', company: 'Minnesota Memorial Care', jobTitle: 'Assistant Funeral Director', startDate: '2021-06', endDate: '2026-02', isCurrent: false, responsibilities: 'Assisted licensed funeral directors with visitation coordination, family care, and memorial logistics.' }
  ]);

  // Step 4: Professional Memberships
  const [membershipList, setMembershipList] = useState<MembershipRecord[]>([
    { id: 'mem-1', bodyName: 'MFDA (Minnesota Funeral Directors Association)', regNumber: 'MN-FD-8941' }
  ]);

  // Step 5: References (Require Exactly 4)
  const [references, setReferences] = useState<ReferenceRecord[]>([
    { id: 'ref-1', fullName: '', titleRelationship: '', company: '', yearsKnown: '', phone: '', email: '' },
    { id: 'ref-2', fullName: '', titleRelationship: '', company: '', yearsKnown: '', phone: '', email: '' },
    { id: 'ref-3', fullName: '', titleRelationship: '', company: '', yearsKnown: '', phone: '', email: '' },
    { id: 'ref-4', fullName: '', titleRelationship: '', company: '', yearsKnown: '', phone: '', email: '' }
  ]);

  // Step 6: CV Upload
  const [cvFile, setCvFile] = useState<{ fileName: string; fileSize: string } | null>(null);

  // Step 7: Declaration
  const [certifiedTrue, setCertifiedTrue] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);

  // Confirmation state
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  // Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    const cleanedPhone = initPhone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setOtpError('Please enter a valid 10-digit contact phone number (e.g. (507) 388-2988).');
      return;
    }
    if (!initEmail.includes('@')) {
      setOtpError('Please enter a valid email address.');
      return;
    }

    const codeSms = String(Math.floor(100000 + Math.random() * 900000));
    const codeEmail = String(Math.floor(100000 + Math.random() * 900000));
    setSimulatedSmsCode(codeSms);
    setSimulatedEmailCode(codeEmail);
    setSmsOtpInput(codeSms); // Auto-fill for friction-free UX
    setEmailOtpInput(codeEmail); // Auto-fill for friction-free UX
    setOtpSent(true);
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsOtpInput !== simulatedSmsCode || emailOtpInput !== simulatedEmailCode) {
      setOtpError('Invalid OTP verification code entered.');
      return;
    }

    setIdentity(prev => ({
      ...prev,
      phone: initPhone,
      email: initEmail
    }));
    setVerificationDone(true);
  };

  // Handle Step 1 Next Validation
  const validateStep1 = () => {
    if (!identity.surname.trim() || !identity.firstName.trim()) {
      setFormError('Please fill in your Last Name / Surname and First Name.');
      return false;
    }
    if (identity.nationalId.trim().length < 5) {
      setFormError("Driver's License / State ID must be at least 5 characters.");
      return false;
    }
    if (identity.kraPin.trim().length < 4) {
      setFormError('Please enter your State License Number or SSN (Last 4 digits).');
      return false;
    }
    setFormError('');
    return true;
  };

  // Handle Step 5 References Validation (Exact 4 Required)
  const validateStep5 = () => {
    for (let i = 0; i < 4; i++) {
      const r = references[i];
      if (!r.fullName.trim() || !r.titleRelationship.trim() || !r.company.trim() || !r.phone.trim() || !r.email.trim()) {
        setFormError(`Please complete all fields for Reference #${i + 1}. Exactly 4 complete references are required.`);
        return false;
      }
    }
    setFormError('');
    return true;
  };

  // Submit Application
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certifiedTrue || !dataConsent) {
      setFormError('You must check both legal declaration checkboxes to complete submission.');
      return;
    }
    if (!cvFile) {
      setFormError('Please upload your Curriculum Vitae (CV) / Resume before submitting.');
      return;
    }

    const created = submitJobApplication({
      vacancyId: selectedVacancy ? selectedVacancy.id : 'vac-gen',
      vacancyTitle: selectedVacancy ? selectedVacancy.title : 'General Funeral Care Application',
      vacancyRef: selectedVacancy ? selectedVacancy.refNumber : 'MFS-VAC-GEN',
      department: selectedVacancy ? selectedVacancy.department : 'Mortuary Services & Family Care',
      status: 'New',
      identity,
      education: educationList,
      employment: employmentList,
      memberships: membershipList,
      references,
      cv: cvFile,
      declaration: {
        certifiedTrue,
        dataConsent
      }
    });

    setSubmittedAppNumber(created.appNumber);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-black text-[#411548] hover:text-[#C5A059] uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers Portal</span>
          </Link>

          <span className="px-3 py-1 bg-[#411548] text-[#C5A059] text-[10px] font-mono font-black rounded-full shadow-xs">
            Ref: {selectedVacancy ? selectedVacancy.refNumber : 'MFS-VAC-2026'}
          </span>
        </div>

        {/* Vacancy Banner Summary */}
        <div className="bg-gradient-to-r from-[#411548] via-[#2C0E32] to-[#411548] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#C5A059]/30 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#C5A059] text-[#2C0E32] font-black text-[10px] uppercase rounded-full">
                {selectedVacancy ? selectedVacancy.employmentType : 'Full-Time'}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white font-bold text-[10px] uppercase rounded-full border border-white/20">
                {selectedVacancy ? selectedVacancy.department : 'Mortuary Services'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
              {selectedVacancy ? selectedVacancy.title : 'Online Job Application'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              Location: <strong>{selectedVacancy ? selectedVacancy.location : 'Mankato / Minneapolis, MN'}</strong> • Application Deadline: <strong className="text-[#C5A059]">{selectedVacancy ? selectedVacancy.deadline : '2026-08-30'}</strong>
            </p>
          </div>
        </div>

        {/* SUCCESS CONFIRMATION SCREEN */}
        {submittedAppNumber ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-4 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-mono font-black rounded-full uppercase">
                Application Code: {submittedAppNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#411548] uppercase pt-2">
                Job Application Submitted Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-xl mx-auto leading-relaxed">
                Thank you for applying for the position of <strong>{selectedVacancy ? selectedVacancy.title : 'Career Opportunity'}</strong> at Middleton Funeral Services. Your application has been logged into our secure portal in compliance with Minnesota Equal Employment Opportunity (EEO) and confidentiality standards.
              </p>
            </div>

            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-lg mx-auto text-left text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-black">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verification & Next Steps</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-emerald-800">
                <li>Confirmation SMS & Email sent to <strong>{identity.phone}</strong> and <strong>{identity.email}</strong>.</li>
                <li>Our Human Resources and Directorship team reviews applications on a rolling basis.</li>
                <li>Shortlisted candidates will be contacted for an introductory interview.</li>
                <li>You can reference your code <strong>{submittedAppNumber}</strong> during any inquiries.</li>
              </ul>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link 
                to="/careers" 
                className="px-6 py-3 bg-[#411548] text-white font-black text-xs uppercase rounded-xl hover:bg-[#2C0E32] shadow-md transition-all"
              >
                Return to Careers Portal
              </Link>
            </div>
          </motion.div>
        ) : !verificationDone ? (
          
          /* GATEWAY: OTP VERIFICATION PORTAL */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6"
          >
            <div className="border-b border-gray-100 pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                <span className="text-xs font-black text-[#411548] uppercase tracking-wider">
                  Applicant Identity Gateway
                </span>
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase">
                Step 0: Secure OTP Phone & Email Verification
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                To prevent fraud and protect applicant data under Minnesota privacy and Equal Employment Opportunity (EEO) standards, verify your phone number and email address before completing the job application form.
              </p>
            </div>

            {otpError && (
              <div className="p-3 bg-red-50 text-red-800 text-xs font-bold rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{otpError}</span>
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4 max-w-md mx-auto py-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Mobile / Contact Phone Number (SMS-Enabled) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input 
                      type="text" 
                      value={initPhone}
                      onChange={e => setInitPhone(e.target.value)}
                      placeholder="e.g. (507) 388-2988 or 507-388-2988"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548] focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Valid formats: (507) 388-2988 or standard 10-digit phone number</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input 
                      type="email" 
                      value={initEmail}
                      onChange={e => setInitEmail(e.target.value)}
                      placeholder="e.g. applicant@middletonfunerals.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl shadow-lg hover:bg-[#2C0E32] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Send Verification OTP Codes</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 max-w-md mx-auto py-2">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> OTP Codes Generated!
                  </span>
                  <p className="text-[11px] text-emerald-800">
                    Codes sent to <strong>{initPhone}</strong> and <strong>{initEmail}</strong>. (Auto-filled below for seamless testing).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">SMS OTP Code</label>
                    <input 
                      type="text" 
                      value={smsOtpInput}
                      onChange={e => setSmsOtpInput(e.target.value)}
                      className="w-full p-3 text-center bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-black text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Email OTP Code</label>
                    <input 
                      type="text" 
                      value={emailOtpInput}
                      onChange={e => setEmailOtpInput(e.target.value)}
                      className="w-full p-3 text-center bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-black text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#411548] text-white font-black text-xs uppercase rounded-xl shadow-lg hover:bg-[#2C0E32] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Verify Identity & Begin Application</span>
                </button>
              </form>
            )}
          </motion.div>
        ) : (

          /* MULTI-STEP APPLICATION FORM (STEPS 1 TO 7) */
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-8">
            {/* Step Wizard Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase text-[#411548]">
                <span>Step {currentStep} of 7: {
                  currentStep === 1 ? 'Identity & Contact' :
                  currentStep === 2 ? 'Education Qualifications' :
                  currentStep === 3 ? 'Employment History' :
                  currentStep === 4 ? 'Professional Memberships' :
                  currentStep === 5 ? 'References (4 Required)' :
                  currentStep === 6 ? 'Curriculum Vitae / Resume' : 'Legal Declaration'
                }</span>
                <span className="text-[#C5A059] font-mono">{Math.round((currentStep / 7) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#411548] to-[#C5A059] transition-all duration-300" 
                  style={{ width: `${(currentStep / 7) * 100}%` }} 
                />
              </div>

              {/* Step Badges Row */}
              <div className="flex items-center justify-between pt-2 overflow-x-auto no-scrollbar gap-1 text-[10px] font-bold">
                {[
                  '1. Identity', '2. Education', '3. Experience', '4. Memberships', '5. References', '6. Resume Upload', '7. Submit'
                ].map((st, idx) => {
                  const sNum = idx + 1;
                  const isDone = currentStep > sNum;
                  const isCurrent = currentStep === sNum;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        if (sNum < currentStep) setCurrentStep(sNum);
                      }}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-all ${
                        isCurrent ? 'bg-[#411548] text-[#C5A059] font-black' :
                        isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 text-red-800 text-xs font-bold rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* STEP 1: IDENTITY & CONTACT */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A059]" /> Step 1: Applicant Identity & Contact
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">As shown on your Official Government ID, Driver's License, or State ID</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Last Name / Surname *</label>
                    <input 
                      type="text" 
                      value={identity.surname}
                      onChange={e => setIdentity(prev => ({ ...prev, surname: e.target.value }))}
                      placeholder="e.g. Anderson"
                      required
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">First Name *</label>
                    <input 
                      type="text" 
                      value={identity.firstName}
                      onChange={e => setIdentity(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="e.g. Sarah"
                      required
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Middle Name (Optional)</label>
                    <input 
                      type="text" 
                      value={identity.middleName}
                      onChange={e => setIdentity(prev => ({ ...prev, middleName: e.target.value }))}
                      placeholder="e.g. Jane"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Driver's License / State ID Number *</label>
                    <input 
                      type="text" 
                      value={identity.nationalId}
                      onChange={e => setIdentity(prev => ({ ...prev, nationalId: e.target.value }))}
                      placeholder="e.g. MN-D12345678"
                      required
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">State License / SSN (Last 4 Digits) *</label>
                    <input 
                      type="text" 
                      value={identity.kraPin}
                      onChange={e => setIdentity(prev => ({ ...prev, kraPin: e.target.value.toUpperCase() }))}
                      placeholder="e.g. MN-FS-1042 or 9876"
                      required
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Verified Mobile Phone</label>
                    <input 
                      type="text" 
                      value={identity.phone}
                      disabled
                      className="w-full p-2.5 bg-gray-200 border border-gray-300 rounded-xl text-xs font-mono font-bold text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Verified Email Address</label>
                    <input 
                      type="text" 
                      value={identity.email}
                      disabled
                      className="w-full p-2.5 bg-gray-200 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Minnesota County *</label>
                      <select
                        value={identity.county}
                        onChange={e => setIdentity(prev => ({ ...prev, county: e.target.value, subCounty: '', ward: '' }))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548] focus:ring-2 focus:ring-[#411548]"
                      >
                        <option value="">Select Minnesota County</option>
                        {MINNESOTA_COUNTIES.map(c => (
                          <option key={c} value={c}>{c} County</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">City / Municipality</label>
                      {identity.county ? (
                        <select
                          value={identity.subCounty}
                          onChange={e => setIdentity(prev => ({ ...prev, subCounty: e.target.value, ward: '' }))}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548] focus:ring-2 focus:ring-[#411548]"
                        >
                          <option value="">Select City / District</option>
                          {(COUNTY_DATA[identity.county]?.subCounties || []).map(sc => (
                            <option key={sc} value={sc}>{sc}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <select disabled className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">
                          <option value="">Select County First</option>
                        </select>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">District / Neighborhood</label>
                      {identity.county && identity.subCounty ? (
                        <select
                          value={identity.ward}
                          onChange={e => setIdentity(prev => ({ ...prev, ward: e.target.value }))}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548] focus:ring-2 focus:ring-[#411548]"
                        >
                          <option value="">Select District</option>
                          {((COUNTY_DATA[identity.county]?.wards?.[identity.subCounty]) || []).map(w => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <select disabled className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">
                          <option value="">Select City First</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setCurrentStep(2);
                    }}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: Education</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: EDUCATION HISTORY */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#C5A059]" /> Step 2: Academic & Professional Qualifications
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Add academic degrees, mortuary science diplomas, or accredited certificates</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEducationList(prev => [
                      ...prev,
                      { id: `edu-${Date.now()}`, level: 'Degree', institution: '', startYear: '2018', endYear: '2022' }
                    ])}
                    className="px-3 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer hover:bg-[#2C0E32] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Qualification</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {educationList.map((edu, index) => (
                    <div key={edu.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-[#411548] uppercase">Qualification #{index + 1}</span>
                        {educationList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setEducationList(prev => prev.filter(e => e.id !== edu.id))}
                            className="text-red-600 p-1 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Level</label>
                          <select
                            value={edu.level}
                            onChange={e => {
                              const val = e.target.value as any;
                              setEducationList(prev => prev.map(item => item.id === edu.id ? { ...item, level: val } : item));
                            }}
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          >
                            <option value="Certificate">Certificate</option>
                            <option value="Associate">Associate Degree</option>
                            <option value="Mortuary Science Diploma">Mortuary Science Diploma</option>
                            <option value="Degree">Bachelor's Degree</option>
                            <option value="Masters">Master's Degree</option>
                            <option value="Doctorate">Doctorate / PhD</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs font-bold text-gray-700">Institution Name</label>
                          <input 
                            type="text" 
                            value={edu.institution}
                            onChange={e => {
                              const val = e.target.value;
                              setEducationList(prev => prev.map(item => item.id === edu.id ? { ...item, institution: val } : item));
                            }}
                            placeholder="e.g. University of Minnesota Mortuary Science"
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700">From</label>
                            <input 
                              type="text" 
                              value={edu.startYear}
                              onChange={e => {
                                const val = e.target.value;
                                setEducationList(prev => prev.map(item => item.id === edu.id ? { ...item, startYear: val } : item));
                              }}
                              className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 text-center"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700">To</label>
                            <input 
                              type="text" 
                              value={edu.endYear}
                              onChange={e => {
                                const val = e.target.value;
                                setEducationList(prev => prev.map(item => item.id === edu.id ? { ...item, endYear: val } : item));
                              }}
                              className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: Employment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EMPLOYMENT HISTORY */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#C5A059]" /> Step 3: Employment & Work Experience
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Add relevant work history starting from your most recent role</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmploymentList(prev => [
                      ...prev,
                      { id: `emp-${Date.now()}`, company: '', jobTitle: '', startDate: '2022-01', endDate: 'Present', isCurrent: false, responsibilities: '' }
                    ])}
                    className="px-3 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer hover:bg-[#2C0E32] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Employment</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {employmentList.map((emp, index) => (
                    <div key={emp.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-[#411548] uppercase">Position #{index + 1}</span>
                        {employmentList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setEmploymentList(prev => prev.filter(e => e.id !== emp.id))}
                            className="text-red-600 p-1 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Company / Organization</label>
                          <input 
                            type="text" 
                            value={emp.company}
                            onChange={e => {
                              const val = e.target.value;
                              setEmploymentList(prev => prev.map(item => item.id === emp.id ? { ...item, company: val } : item));
                            }}
                            placeholder="e.g. Mankato Health Systems or Cedar Memorial"
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Job Title</label>
                          <input 
                            type="text" 
                            value={emp.jobTitle}
                            onChange={e => {
                              const val = e.target.value;
                              setEmploymentList(prev => prev.map(item => item.id === emp.id ? { ...item, jobTitle: val } : item));
                            }}
                            placeholder="e.g. Family Care Coordinator"
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Key Responsibilities & Achievements</label>
                        <textarea 
                          rows={2}
                          value={emp.responsibilities}
                          onChange={e => {
                            const val = e.target.value;
                            setEmploymentList(prev => prev.map(item => item.id === emp.id ? { ...item, responsibilities: val } : item));
                          }}
                          className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#411548]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: Memberships</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PROFESSIONAL MEMBERSHIPS */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#C5A059]" /> Step 4: Professional Body Memberships & Certifications (Optional)
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Add professional accreditations (e.g. MFDA, NFDA, ABFSE, CANA)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMembershipList(prev => [
                      ...prev,
                      { id: `mem-${Date.now()}`, bodyName: 'MFDA (Minnesota Funeral Directors Association)', regNumber: '' }
                    ])}
                    className="px-3 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer hover:bg-[#2C0E32] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Membership</span>
                  </button>
                </div>

                {membershipList.length === 0 ? (
                  <div className="p-6 bg-gray-50 text-center rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500">
                    No professional memberships added. Click "Add Membership" above or proceed to References.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {membershipList.map((mem) => (
                      <div key={mem.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            value={mem.bodyName}
                            onChange={e => {
                              const val = e.target.value;
                              setMembershipList(prev => prev.map(item => item.id === mem.id ? { ...item, bodyName: val } : item));
                            }}
                            placeholder="Professional Body Name (e.g. MFDA, NFDA)"
                            className="p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#411548]"
                          />
                          <input 
                            type="text" 
                            value={mem.regNumber}
                            onChange={e => {
                              const val = e.target.value;
                              setMembershipList(prev => prev.map(item => item.id === mem.id ? { ...item, regNumber: val } : item));
                            }}
                            placeholder="Registration / License Number"
                            className="p-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setMembershipList(prev => prev.filter(m => m.id !== mem.id))}
                          className="text-red-600 p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: 4 References</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REFERENCES (EXACTLY 4 REQUIRED) */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A059]" /> Step 5: Professional References (EXACTLY 4 REQUIRED)
                  </h3>
                  <p className="text-xs text-[#411548] font-bold bg-[#411548]/5 p-2 rounded-xl border border-[#C5A059]/40 mt-1">
                    Requirement: You must provide exactly four (4) verifiable professional references (e.g., former supervisors, managers, or directors).
                  </p>
                </div>

                <div className="space-y-6">
                  {references.map((ref, idx) => (
                    <div key={ref.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <span className="font-black text-xs text-[#411548] uppercase block">
                        Reference #{idx + 1} *
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Full Name *</label>
                          <input 
                            type="text" 
                            value={ref.fullName}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, fullName: val } : item));
                            }}
                            placeholder="e.g. Robert Miller"
                            required
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Title / Relationship *</label>
                          <input 
                            type="text" 
                            value={ref.titleRelationship}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, titleRelationship: val } : item));
                            }}
                            placeholder="e.g. Operations Director"
                            required
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Company / Organization *</label>
                          <input 
                            type="text" 
                            value={ref.company}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, company: val } : item));
                            }}
                            placeholder="e.g. Northstar Care Partners"
                            required
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Years Known</label>
                          <input 
                            type="text" 
                            value={ref.yearsKnown}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, yearsKnown: val } : item));
                            }}
                            placeholder="e.g. 4 Years"
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Phone Number *</label>
                          <input 
                            type="text" 
                            value={ref.phone}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, phone: val } : item));
                            }}
                            placeholder="e.g. (507) 555-0192"
                            required
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700">Email Address *</label>
                          <input 
                            type="email" 
                            value={ref.email}
                            onChange={e => {
                              const val = e.target.value;
                              setReferences(prev => prev.map((item, i) => i === idx ? { ...item, email: val } : item));
                            }}
                            placeholder="e.g. rmiller@northstarcare.org"
                            required
                            className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[#411548]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep5()) setCurrentStep(6);
                    }}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: Upload Resume</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: CV / RESUME UPLOAD */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C5A059]" /> Step 6: Curriculum Vitae / Resume Upload
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Upload your detailed resume in PDF format (Max 2MB)</p>
                </div>

                <div className="p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300 text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#411548] shadow-sm">
                    <Upload className="w-8 h-8 text-[#C5A059]" />
                  </div>

                  {cvFile ? (
                    <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 inline-block space-y-1">
                      <span className="font-black text-xs block">✓ Selected: {cvFile.fileName}</span>
                      <span className="text-[10px] text-emerald-700 font-mono">Size: {cvFile.fileSize}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-800">Drag & drop your Resume PDF file here, or click below</p>
                      <p className="text-[10px] text-gray-400">Supported format: PDF only • Maximum file size: 2MB</p>
                    </div>
                  )}

                  <div>
                    <button
                      type="button"
                      onClick={() => setCvFile({ fileName: `Resume_${identity.surname}_${identity.firstName}.pdf`, fileSize: '1.4 MB' })}
                      className="px-5 py-2.5 bg-[#411548] text-[#C5A059] font-bold text-xs uppercase rounded-xl shadow-xs cursor-pointer hover:bg-[#2C0E32] transition-all"
                    >
                      {cvFile ? 'Change Resume File' : 'Select PDF File'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!cvFile) {
                        setFormError('Please select or upload your Resume PDF file.');
                        return;
                      }
                      setFormError('');
                      setCurrentStep(7);
                    }}
                    className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#2C0E32] transition-all"
                  >
                    <span>Next: Legal Declaration</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: LEGAL DECLARATION & SUBMISSION */}
            {currentStep === 7 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Step 7: Legal Declaration & Confidentiality Consent
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Review your commitments under Minnesota state and Federal employment laws</p>
                </div>

                <div className="p-5 bg-purple-50/50 rounded-2xl border border-[#C5A059]/40 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={certifiedTrue}
                      onChange={e => setCertifiedTrue(e.target.checked)}
                      className="mt-1 rounded text-[#411548] focus:ring-[#411548]"
                    />
                    <span className="text-xs font-bold text-gray-900 leading-relaxed">
                      I hereby certify that all information, documents, and qualifications provided in this online job application are true, complete, and accurate to the best of my knowledge. I understand that any false statement, misrepresentation, or omission may lead to immediate disqualification or termination of employment.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={dataConsent}
                      onChange={e => setDataConsent(e.target.checked)}
                      className="mt-1 rounded text-[#411548] focus:ring-[#411548]"
                    />
                    <span className="text-xs font-bold text-gray-900 leading-relaxed">
                      Pursuant to applicable Minnesota and Federal employment regulations and Equal Employment Opportunity (EEO) standards, I give explicit legal consent to <strong>Middleton Funeral Services</strong> to collect, verify, process, and retain my personal details, references, background credentials, and uploaded documents solely for recruitment and background appraisal purposes.
                    </span>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-1">
                  <span className="font-black text-gray-900 block uppercase">Application Overview Summary:</span>
                  <p>Candidate: <strong>{identity.firstName} {identity.surname}</strong> • Position: <strong>{selectedVacancy ? selectedVacancy.title : 'General Consideration'}</strong></p>
                  <p>Verified Contacts: Phone <strong>{identity.phone}</strong> | Email <strong>{identity.email}</strong> | Residence <strong>{identity.county} County, MN</strong></p>
                  <p>Attachments: Resume File (<strong>{cvFile?.fileName}</strong>) | <strong>4 Verified Professional References Provided</strong></p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(6)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer shadow-xl hover:bg-[#2C0E32] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Job Application Now</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
