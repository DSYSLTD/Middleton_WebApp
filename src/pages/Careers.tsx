import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Heart, Shield, Users, Award, MapPin, Clock, DollarSign, 
  Send, CheckCircle2, ChevronRight, FileText, Sparkles, ArrowRight, X, PhoneCall, Filter
} from 'lucide-react';
import { HEADER_FOOTER_LOGO } from '../constants/assets';

export interface JobListing {
  id: number;
  title: string;
  department: 'Mortuary Care' | 'Family Guidance' | 'Administration' | 'Logistics' | 'Floral & Decor';
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  urgent?: boolean;
}

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeJobModal, setActiveJobModal] = useState<JobListing | null>(null);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExp, setApplicantExp] = useState('1-3 Years');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initial Job Postings (Synced with localStorage)
  const [jobListings] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem('middleton_cms_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved job listings', e);
      }
    }
    return [
      {
        id: 1,
        title: 'Licensed Funeral Director & Mortician',
        department: 'Mortuary Care',
        location: 'Rogers & Twin Cities Metro, MN',
        type: 'Full-Time',
        salary: '$75,000 - $95,000 / yr',
        experience: '3+ Years Required',
        description: 'Provide compassionate, direct assistance to grieving families. Oversee ceremonial coordination, embalming, care arrangements, and funeral service execution.',
        requirements: [
          'Active Minnesota Mortuary Science License (or eligible for reciprocity)',
          'Demonstrated expertise in empathetic family counseling and care directives',
          'Proficiency with Minnesota state death certificate filing and electronic health databases',
          'Valid Minnesota Driver’s License with clean driving record'
        ],
        responsibilities: [
          'Meet with families to arrange traditional funeral, cremation, and green burial ceremonies',
          'Coordinate logistics with officiants, cemeteries, venues, and honor guards',
          'Ensure strict compliance with Minnesota Department of Health regulatory standards',
          'Provide dignified preparation and presentation care for deceased individuals'
        ],
        postedDate: '2026-08-20',
        urgent: true
      },
      {
        id: 2,
        title: 'Certified Grief Counselor & Family Care Specialist',
        department: 'Family Guidance',
        location: 'Rogers, MN (On-Site & Virtual)',
        type: 'Full-Time',
        salary: '$65,000 - $80,000 / yr',
        experience: '2+ Years Guidance Experience',
        description: 'Guide grieving individuals and families through structured bereavement care, support group sessions, and long-term aftercare resources.',
        requirements: [
          'Master’s degree in Counseling, Social Work, Thanatology, or Divinity',
          'Certified Thanatologist or Grief Support Facilitator preferred',
          'Deep empathy, active listening, and strong group facilitation capabilities',
          'Experience facilitating youth and adult bereavement workshops'
        ],
        responsibilities: [
          'Conduct 1-on-1 grief support sessions for family members after service finalization',
          'Facilitate monthly community grief support circles and memory workshops',
          'Curate personalized reading materials and healing roadmaps for bereaved families',
          'Collaborate with funeral directors to identify families needing urgent aftercare'
        ],
        postedDate: '2026-08-18'
      },
      {
        id: 3,
        title: 'Funeral Assistant & Administrative Care Officer',
        department: 'Administration',
        location: 'Rogers, MN',
        type: 'Full-Time',
        salary: '$22.00 - $28.00 / hr',
        experience: '1+ Years Office / Client Services',
        description: 'Welcoming families, managing chapel reception, coordinating obituary publishing, and providing administrative support for funeral directors.',
        requirements: [
          'Excellent phone etiquette and professional, compassionate interpersonal skills',
          'Proficiency in Microsoft Office, Google Workspace, and digital record systems',
          'High attention to detail when compiling service programs and obituary proofs',
          'Ability to maintain utmost confidentiality and professional decorum'
        ],
        responsibilities: [
          'Greet families and guests during visitations, services, and consultation meetings',
          'Manage incoming calls, schedule appointment requests, and process memorial floral orders',
          'Assist directors with document preparation, death certificates, and obituary uploads',
          'Maintain spotless presentation in chapel reception areas and consultation rooms'
        ],
        postedDate: '2026-08-15'
      },
      {
        id: 4,
        title: 'Mortuary Logistics & Transport Specialist',
        department: 'Logistics',
        location: 'Twin Cities Metro Area, MN',
        type: 'Full-Time',
        salary: '$24.00 - $30.00 / hr',
        experience: 'Clean Driving Record',
        description: 'Provide dignified transportation of deceased individuals, service vehicle maintenance, and cemetery pavilion equipment setup.',
        requirements: [
          'Valid Minnesota Driver’s License with clean driving history',
          'Ability to lift 75+ lbs safely using professional mechanical stretchers',
          'High physical stamina and unwavering respect for deceased individuals',
          'Flexible schedule including rotational weekend or evening availability'
        ],
        responsibilities: [
          'Perform prompt, dignified transfers from healthcare facilities, residences, and care centers',
          'Maintain executive limousine and hearse fleet in pristine ceremonial condition',
          'Set up ceremonial equipment at churches, cemetery gravesites, and outdoor venues',
          'Support funeral directors during procession coordination and burial graveside ceremonies'
        ],
        postedDate: '2026-08-12'
      },
      {
        id: 5,
        title: 'Sympathy Floral & Memorial Keepsake Designer',
        department: 'Floral & Decor',
        location: 'Rogers, MN',
        type: 'Part-Time',
        salary: '$20.00 - $26.00 / hr',
        experience: 'Floral Arrangement Experience',
        description: 'Design elegant sympathy floral arrangements, casket sprays, standing wreaths, and personalized memorial tribute displays.',
        requirements: [
          'Proven experience in professional floral design (sympathy arrangements preferred)',
          'Eye for color balance, typography layout, and ceremonial presentation',
          'Capability to work efficiently during high-volume funeral service schedules',
          'Gentle communication style when consulting with grieving family members'
        ],
        responsibilities: [
          'Design custom floral sprays, standing wreaths, and memorial arrangement baskets',
          'Create laser-inscribed keepsake candles, memory frames, and guest book displays',
          'Inspect incoming floral deliveries for peak freshness and aesthetic excellence',
          'Deliver and position floral displays at chapels, churches, and gravesite services'
        ],
        postedDate: '2026-08-10'
      }
    ];
  });

  const filteredJobs = jobListings.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !activeJobModal) return;

    const newApplication = {
      id: Date.now(),
      jobId: activeJobModal.id,
      jobTitle: activeJobModal.title,
      department: activeJobModal.department,
      name: applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      experience: applicantExp,
      message: applicantMessage,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    // Store application in localStorage for CMS Dashboard retrieval
    const savedApps = localStorage.getItem('middleton_cms_applications');
    let existingApps = [];
    if (savedApps) {
      try {
        existingApps = JSON.parse(savedApps);
      } catch (e) {
        console.error('Error parsing applications', e);
      }
    }
    localStorage.setItem('middleton_cms_applications', JSON.stringify([newApplication, ...existingApps]));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveJobModal(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantMessage('');
    }, 2500);
  };

  return (
    <div className="bg-[#fdfbfd] min-h-screen font-sans text-gray-900 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#411548] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase p-2 px-6 bg-white/10 rounded-full border border-white/20 mb-6 text-white">
              <Briefcase size={14} className="text-white" /> Careers At Middleton Funeral Services
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              Serve With Purpose. <br />
              <span className="text-white/80 italic font-light lowercase">Guide With Compassion.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
              Join Minnesota’s most dedicated family care team. We offer meaningful career pathways for licensed funeral directors, grief counselors, care coordinators, and logistics specialists.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-wider">
              <a href="#open-positions" className="bg-white text-[#411548] hover:bg-gray-100 px-8 py-4 rounded-full shadow-lg transition-all flex items-center gap-2">
                Explore Open Positions <ArrowRight size={14} />
              </a>
              <a href="tel:9524862871" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full border border-white/20 transition-all flex items-center gap-2">
                <PhoneCall size={14} /> Speak With Director
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culture & Pillars Section */}
      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Our Workplace Pillars</span>
            <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">Why Build Your Career With Middleton?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 rounded-[2rem] bg-purple-50/50 border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mb-6">
                  <Heart size={22} />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#411548] mb-2">Empathetic Workplace</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  We prioritize mental wellness, supportive teamwork, and flexible rotational shifts for a balanced personal life.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-purple-50/50 border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mb-6">
                  <Award size={22} />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#411548] mb-2">Competitive Compensation</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Industry-leading salaries, 401(k) matching, comprehensive health & dental coverage, and continuing education stipends.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-purple-50/50 border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mb-6">
                  <Shield size={22} />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#411548] mb-2">Professional Excellence</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Work in state-of-the-art mortuary facilities with modern digital record tools and transparent family care protocols.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-purple-50/50 border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#411548] text-white flex items-center justify-center mb-6">
                  <Users size={22} />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#411548] mb-2">Community Impact</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Directly serve families across Rogers and the Twin Cities, guiding them through moments of deep emotional need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="open-positions" className="py-16 px-4 container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="text-[10px] font-black text-[#411548] uppercase tracking-[0.3em] block mb-2">Current Opportunities</span>
            <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">Explore Open Positions</h2>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Mortuary Care', 'Family Guidance', 'Administration', 'Logistics', 'Floral & Decor'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  selectedDept === dept ? 'bg-[#411548] text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center text-gray-500">
              <Briefcase size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="font-bold text-base">No open job postings found for this category.</p>
              <p className="text-xs text-gray-400 mt-1">Try clearing filters or check back soon for new openings.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider">
                      {job.type}
                    </span>
                    {job.urgent && (
                      <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider animate-pulse">
                        Urgent Hiring
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-black text-[#411548]">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#411548]" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-[#411548]" /> {job.salary}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#411548]" /> {job.experience}</span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed max-w-3xl">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="w-full lg:w-auto bg-[#411548] hover:bg-[#300f35] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    View Job & Apply <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* JOB DETAILS & APPLICATION MODAL */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] max-w-3xl w-full p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100 my-8"
            >
              <button
                onClick={() => setActiveJobModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-black text-[#411548] uppercase">Application Submitted!</h3>
                  <p className="text-xs text-gray-600 font-light max-w-md mx-auto">
                    Thank you for applying for <span className="font-bold text-[#411548]">{activeJobModal.title}</span>. Our hiring care team will review your credentials and contact you directly.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] block mb-2">
                      {activeJobModal.department} &bull; {activeJobModal.type}
                    </span>
                    <h2 className="text-3xl font-serif font-black text-[#411548] mb-3">{activeJobModal.title}</h2>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                      <span>📍 {activeJobModal.location}</span>
                      <span>💰 {activeJobModal.salary}</span>
                      <span>⏱️ {activeJobModal.experience}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed text-gray-700">
                    <h4 className="font-bold text-sm text-[#411548] uppercase tracking-wider">Role Overview</h4>
                    <p className="font-light">{activeJobModal.description}</p>

                    <h4 className="font-bold text-sm text-[#411548] uppercase tracking-wider pt-2">Key Responsibilities</h4>
                    <ul className="list-disc pl-5 space-y-1 font-light text-gray-600">
                      {activeJobModal.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>

                    <h4 className="font-bold text-sm text-[#411548] uppercase tracking-wider pt-2">Requirements & Qualifications</h4>
                    <ul className="list-disc pl-5 space-y-1 font-light text-gray-600">
                      {activeJobModal.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleApplySubmit} className="pt-6 border-t border-gray-100 space-y-4">
                    <h4 className="font-serif font-bold text-lg text-[#411548] uppercase">Submit Your Application</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#411548] outline-none text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="sarah@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#411548] outline-none text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="(952) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#411548] outline-none text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Relevant Experience</label>
                        <select
                          value={applicantExp}
                          onChange={(e) => setApplicantExp(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#411548] outline-none text-xs font-medium bg-white"
                        >
                          <option value="Entry Level">Entry Level (&lt; 1 yr)</option>
                          <option value="1-3 Years">1-3 Years</option>
                          <option value="3-5 Years">3-5 Years</option>
                          <option value="5+ Years">5+ Senior Experience</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Cover Note & Qualifications</label>
                      <textarea
                        rows={3}
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Share a brief overview of your background, licenses, or why you wish to join Middleton..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#411548] outline-none text-xs font-light resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveJobModal(null)}
                        className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#411548] hover:bg-[#300f35] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"
                      >
                        <Send size={14} /> Send Application
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
