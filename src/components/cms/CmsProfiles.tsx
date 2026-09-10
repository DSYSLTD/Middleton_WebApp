import React, { useState, useMemo } from 'react';
import { 
  User, Users, Globe, CheckCircle2, X, Edit3, Trash2, 
  Search, Mail, Phone, ImageIcon, FileText, Briefcase, GraduationCap, 
  Award, TrendingUp, Eye, LayoutGrid, List, ShieldCheck, Check, Plus,
  Lock, ArrowUpRight, ShieldAlert, BookOpen, Clock, Heart
} from 'lucide-react';
import { blogStore, BlogAuthor } from '../../lib/blogStore';

interface ExtendedProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  role: 'Super Admin' | 'Editor' | 'Author' | 'Funeral Director';
  status: 'Active' | 'Suspended';
  verificationStatus: 'Verified' | 'Pending';
  profilePhoto: string;
  coverPhoto: string;
  bio: string;
  shortBio: string;
  levelOfEducation: string;
  yearsOfExperience: string;
  publicHeadline: string;
  publicBio: string;
  publicPagePublished: boolean;
  expertise: string[];
  stats: {
    articlesPublished: number;
    readingCount: number;
    guidedServicesCount: number;
    memberSince: string;
  };
}

interface Props {
  onShowToast: (msg: string) => void;
}

const INITIAL_PROFILES: ExtendedProfile[] = [
  {
    id: 'usr-1',
    firstName: 'William',
    middleName: 'E.',
    lastName: 'Middleton',
    displayName: 'William Middleton',
    username: 'wmiddleton',
    email: 'william@middletonfunerals.com',
    phone: '(651) 555-0142',
    jobTitle: 'Managing Funeral Director & Founder',
    department: 'Executive Leadership & Liturgies',
    employeeId: 'MFS-DIR-001',
    role: 'Super Admin',
    status: 'Active',
    verificationStatus: 'Verified',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
    bio: 'Dedicated to serving Minnesota families with sacred reverence and transparent guidance. Third-generation funeral service preceptor with decades of commitment to compassionate bereavement care.',
    shortBio: 'Managing Funeral Director & Founder at Middleton Funeral Services.',
    levelOfEducation: 'Master of Mortuary Science (M.M.S.), University of Minnesota',
    yearsOfExperience: '28+ Years of Service in Funeral Direction & Care',
    publicHeadline: 'Managing Director, Licensed Embalmer & Celebrant',
    publicBio: 'Walking alongside Twin Cities families through loss, advance pre-planning, and sacred memorial liturgies with quiet dignity.',
    publicPagePublished: true,
    expertise: ['Liturgical Bereavement Care', 'Veterans Ceremonial Honors', 'Casket & Urn Craftsmanship', 'Advance Heritage Trusts'],
    stats: {
      articlesPublished: 16,
      readingCount: 38400,
      guidedServicesCount: 840,
      memberSince: '1998'
    }
  },
  {
    id: 'usr-2',
    firstName: 'Hannah',
    middleName: 'Rae',
    lastName: 'Lindstrom',
    displayName: 'Hannah Lindstrom',
    username: 'hlindstrom',
    email: 'hannah@middletonfunerals.com',
    phone: '(612) 555-0182',
    jobTitle: 'Bereavement Counselor & Aftercare Coordinator',
    department: 'Family Care & Grief Support',
    employeeId: 'MFS-STF-014',
    role: 'Editor',
    status: 'Active',
    verificationStatus: 'Verified',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    bio: 'Certified grief support specialist helping families navigate ambiguous loss, child grief, and memorial aftercare programs in Apple Valley and St. Paul.',
    shortBio: 'Family Care Counselor & Aftercare Support Lead.',
    levelOfEducation: 'M.A. Counseling Psychology & Thanatology Certification',
    yearsOfExperience: '11+ Years in Bereavement Therapy & Care Guidance',
    publicHeadline: 'Bereavement Specialist & Memorial Celebrant',
    publicBio: 'Empowering grieving hearts with gentle guidance, therapeutic workshops, and community healing support.',
    publicPagePublished: true,
    expertise: ['Grief Recovery Workshops', 'Pediatric Bereavement Support', 'Holiday Memorial Vigils', 'Memorial Eulogies'],
    stats: {
      articlesPublished: 12,
      readingCount: 29100,
      guidedServicesCount: 420,
      memberSince: '2015'
    }
  }
];

export default function CmsProfiles({ onShowToast }: Props) {
  // Sub-tabs: 'my_profile' | 'my_public_page' | 'other_profiles'
  const [activeSubTab, setActiveSubTab] = useState<'my_profile' | 'my_public_page' | 'other_profiles'>('my_profile');
  const [profiles, setProfiles] = useState<ExtendedProfile[]>(INITIAL_PROFILES);

  const loggedUserId = 'usr-1';
  const loggedProfile = useMemo(() => {
    return profiles.find(p => p.id === loggedUserId) || profiles[0];
  }, [profiles]);

  // Selected Profile state when inspecting another user in "Other Profiles"
  const [inspectingUser, setInspectingUser] = useState<ExtendedProfile | null>(null);

  // Modals
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditPublicPageModalOpen, setIsEditPublicPageModalOpen] = useState(false);
  const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] = useState(false);
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false);
  const [isCoverStudioOpen, setIsCoverStudioOpen] = useState(false);
  const [isReaderModeActive, setIsReaderModeActive] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Temporary studio urls
  const [tempPhotoUrl, setTempPhotoUrl] = useState(loggedProfile.profilePhoto);
  const [tempCoverUrl, setTempCoverUrl] = useState(loggedProfile.coverPhoto);

  // Form State for Editing Own Profile
  const [editFormData, setEditFormData] = useState<ExtendedProfile>(loggedProfile);
  const [newExpertiseTag, setNewExpertiseTag] = useState('');

  // Form State for Editing Public Page
  const [publicPageFormData, setPublicPageFormData] = useState({
    publicHeadline: loggedProfile.publicHeadline,
    publicBio: loggedProfile.publicBio
  });

  // New Profile Form
  const [newProfileForm, setNewProfileForm] = useState<Partial<ExtendedProfile>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: 'Family Care',
    role: 'Author',
    bio: ''
  });

  const handleSaveOwnProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = profiles.map(p => p.id === loggedUserId ? editFormData : p);
    setProfiles(updated);
    setIsEditUserModalOpen(false);
    onShowToast('Personal profile credentials updated!');
  };

  const handleSavePublicPage = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = profiles.map(p => p.id === loggedUserId ? {
      ...p,
      publicHeadline: publicPageFormData.publicHeadline,
      publicBio: publicPageFormData.publicBio,
      publicPagePublished: true
    } : p);
    setProfiles(updated);
    setIsEditPublicPageModalOpen(false);
    onShowToast('Public author page published and saved!');
  };

  const handleCreateNewProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileForm.firstName?.trim() || !newProfileForm.lastName?.trim()) return;

    const newProf: ExtendedProfile = {
      id: `usr-${Date.now()}`,
      firstName: newProfileForm.firstName.trim(),
      lastName: newProfileForm.lastName.trim(),
      displayName: `${newProfileForm.firstName.trim()} ${newProfileForm.lastName.trim()}`,
      username: `${newProfileForm.firstName.toLowerCase()}${newProfileForm.lastName.toLowerCase()}`,
      email: newProfileForm.email || 'director@middletonfunerals.com',
      phone: newProfileForm.phone || '(651) 555-0100',
      jobTitle: newProfileForm.jobTitle || 'Associate Funeral Director',
      department: newProfileForm.department || 'Liturgical Services',
      employeeId: `MFS-EMP-${Math.floor(100 + Math.random() * 900)}`,
      role: newProfileForm.role as any || 'Funeral Director',
      status: 'Active',
      verificationStatus: 'Verified',
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      coverPhoto: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
      bio: newProfileForm.bio || 'Serving families with dignity.',
      shortBio: `${newProfileForm.jobTitle || 'Director'} at Middleton Funeral Services.`,
      levelOfEducation: 'Mortuary Science Certification',
      yearsOfExperience: '5+ Years in Care',
      publicHeadline: newProfileForm.jobTitle || 'Funeral Director & Celebrant',
      publicBio: newProfileForm.bio || 'Compassionate care for Minnesota families.',
      publicPagePublished: true,
      expertise: ['Bereavement Guidance', 'Memorial Liturgies'],
      stats: {
        articlesPublished: 0,
        readingCount: 0,
        guidedServicesCount: 15,
        memberSince: '2026'
      }
    };

    setProfiles([...profiles, newProf]);
    setIsCreateProfileModalOpen(false);
    onShowToast(`Created staff profile for ${newProf.displayName}`);
  };

  const filteredOtherProfiles = useMemo(() => {
    return profiles.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = p.displayName.toLowerCase().includes(q) ||
                          p.email.toLowerCase().includes(q) ||
                          p.jobTitle.toLowerCase().includes(q);
      const matchRole = selectedRoleFilter === 'ALL' || p.role === selectedRoleFilter;
      return matchSearch && matchRole;
    });
  }, [profiles, searchQuery, selectedRoleFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Main Header Banner (Title -> Text -> Tabs) */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl border border-[#C5A059]/40 shadow-xl text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <User className="w-7 h-7 text-[#C5A059] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-white">
              Profiles & Staff Directory
            </h2>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#C5A059] text-[#411548] uppercase shadow-xs">
            Institutional Registry
          </span>
        </div>

        <p className="text-xs md:text-sm text-white/80 font-light max-w-4xl leading-relaxed">
          Manage your personal funeral director credentials, author bio & public memorial page, and inspect team profiles across Middleton Funeral Services.
        </p>

        {/* Submodule Navigation Tabs */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'my_profile', label: 'My Profile', icon: User },
            { id: 'my_public_page', label: 'My Public Author Page', icon: Globe },
            { id: 'other_profiles', label: 'Other Profiles Directory', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-[#C5A059] text-[#411548] shadow-md font-extrabold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeSubTab === tab.id ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Creation Notice & Action */}
      <div className="bg-[#faf4fa] rounded-2xl border border-[#411548]/15 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#411548] shadow-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <span className="font-serif font-black uppercase tracking-wider block text-xs text-[#411548]">
              Staff Profile Governance & Authorization
            </span>
            <p className="text-gray-600 font-light text-[11px] leading-relaxed mt-0.5">
              Staff profiles can be created by the Super Administrator or managing directors. Licensed directors are authorized to edit their personal credentials and aftercare articles.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateProfileModalOpen(true)}
          className="px-4 py-2.5 bg-[#411548] hover:bg-black text-[#C5A059] hover:text-white font-black rounded-full uppercase text-xs flex items-center gap-2 shadow-sm shrink-0 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" /> Create Staff Profile
        </button>
      </div>

      {/* ================= SUBTAB 1: MY PROFILE ================= */}
      {activeSubTab === 'my_profile' && (
        <div className="space-y-6">
          {/* Top Cover Banner */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden relative">
            <div 
              className="h-52 w-full bg-cover bg-center relative group" 
              style={{ backgroundImage: `url(${loggedProfile.coverPhoto})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/90 via-[#411548]/30 to-transparent"></div>
              
              <button 
                onClick={() => {
                  setTempCoverUrl(loggedProfile.coverPhoto);
                  setIsCoverStudioOpen(true);
                }}
                className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#411548]/80 hover:bg-[#411548] text-[#C5A059] border border-[#C5A059]/40 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <ImageIcon className="w-3.5 h-3.5" /> Change Header Photo
              </button>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#411548]/90 text-[#C5A059] border border-[#C5A059]/40 rounded-full text-xs font-black uppercase">
                  {loggedProfile.role}
                </span>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-black uppercase flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {loggedProfile.status}
                </span>
              </div>
            </div>

            {/* Profile Avatar & Info */}
            <div className="p-6 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative group shrink-0 -mt-16 z-10">
                  <img 
                    src={loggedProfile.profilePhoto} 
                    alt={loggedProfile.displayName} 
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl bg-gray-100"
                  />
                  <button 
                    onClick={() => {
                      setTempPhotoUrl(loggedProfile.profilePhoto);
                      setIsPhotoStudioOpen(true);
                    }}
                    className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-bold transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-[#C5A059] mb-1" />
                    <span>Change Photo</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-serif font-black text-gray-900">{loggedProfile.displayName}</h2>
                    <span className="text-xs font-bold text-gray-400">(@{loggedProfile.username})</span>
                  </div>
                  <p className="text-xs font-bold text-[#411548] uppercase flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" /> {loggedProfile.jobTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  onClick={() => {
                    setEditFormData(loggedProfile);
                    setIsEditUserModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#411548] hover:bg-black text-[#C5A059] hover:text-white rounded-full text-xs font-black uppercase flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile Credentials
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#411548] border-x border-b border-gray-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400">Bereavement Articles</span>
              <p className="text-2xl font-serif font-black text-[#411548]">{loggedProfile.stats.articlesPublished}</p>
              <span className="text-[10px] text-gray-500 font-medium">Published Family Guides</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#C5A059] border-x border-b border-gray-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400">Total Family Reads</span>
              <p className="text-2xl font-serif font-black text-[#C5A059]">{loggedProfile.stats.readingCount.toLocaleString()}</p>
              <span className="text-[10px] text-gray-500 font-medium">Bereavement Readership</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#411548] border-x border-b border-gray-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400">Services Guided</span>
              <p className="text-2xl font-serif font-black text-[#411548]">{loggedProfile.stats.guidedServicesCount}+</p>
              <span className="text-[10px] text-gray-500 font-medium">Memorial Liturgies Directed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#C5A059] border-x border-b border-gray-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400">Tenure in Service</span>
              <p className="text-2xl font-serif font-black text-[#C5A059]">Since {loggedProfile.stats.memberSince}</p>
              <span className="text-[10px] text-gray-500 font-medium">Dedicated Caregiver</span>
            </div>
          </div>

          {/* Biography & Expertise */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A059]" /> Biography Overview
                  </h3>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-light">{loggedProfile.bio}</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C5A059]" /> Core Memorial Specializations
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loggedProfile.expertise.map((exp, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 bg-[#faf4fa] text-[#411548] border border-[#411548]/15 text-xs font-bold rounded-full">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
                <h3 className="font-serif font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-2">
                  Education & Licensure
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] font-bold block">Academic Degree</span>
                    <p className="font-bold text-gray-900">{loggedProfile.levelOfEducation}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] font-bold block">Professional Experience</span>
                    <p className="font-bold text-gray-900">{loggedProfile.yearsOfExperience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 2: MY PUBLIC AUTHOR PAGE ================= */}
      {activeSubTab === 'my_public_page' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden space-y-6">
            <div 
              className="h-64 w-full bg-cover bg-center relative" 
              style={{ backgroundImage: `url(${loggedProfile.coverPhoto})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/90 via-[#411548]/40 to-transparent"></div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={() => {
                    setPublicPageFormData({
                      publicHeadline: loggedProfile.publicHeadline,
                      publicBio: loggedProfile.publicBio
                    });
                    setIsEditPublicPageModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#411548]/90 text-[#C5A059] border border-[#C5A059]/50 rounded-full text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Customize Page
                </button>
                <button 
                  onClick={() => setIsReaderModeActive(!isReaderModeActive)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-md ${
                    isReaderModeActive ? 'bg-[#C5A059] text-[#411548]' : 'bg-[#411548]/90 text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> {isReaderModeActive ? 'Exit Reader Mode' : 'View as Reader'}
                </button>
              </div>

              <div className="absolute bottom-6 left-8 right-8 flex items-end gap-5">
                <img 
                  src={loggedProfile.profilePhoto} 
                  alt={loggedProfile.displayName} 
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-2xl bg-gray-100"
                />
                <div className="text-white space-y-1">
                  <h2 className="text-2xl font-serif font-black">{loggedProfile.displayName}</h2>
                  <p className="text-xs font-bold text-[#C5A059] uppercase">{loggedProfile.publicHeadline}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-[#faf4fa] p-6 rounded-2xl border border-[#411548]/15 space-y-2">
                <h3 className="font-serif font-black text-base text-[#411548] uppercase">About the Author</h3>
                <p className="text-xs text-gray-700 font-light leading-relaxed">{loggedProfile.publicBio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 3: OTHER PROFILES DIRECTORY ================= */}
      {activeSubTab === 'other_profiles' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search staff directory by name, role, email..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                {['ALL', 'Super Admin', 'Funeral Director', 'Editor'].map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRoleFilter(role)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedRoleFilter === role ? 'bg-[#411548] text-[#C5A059]' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOtherProfiles.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={p.profilePhoto} alt={p.displayName} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#C5A059]" />
                    <div>
                      <h4 className="font-serif font-black text-sm text-gray-900">{p.displayName}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">@{p.username}</p>
                      <span className="px-2 py-0.5 bg-[#411548]/10 text-[#411548] text-[9px] font-black uppercase rounded-full mt-1 inline-block">
                        {p.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-light line-clamp-2">{p.bio}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setInspectingUser(p)}
                    className="px-4 py-2 bg-[#411548] hover:bg-black text-[#C5A059] rounded-full text-xs font-black uppercase cursor-pointer"
                  >
                    View Profile
                  </button>
                  <span className="text-[10px] text-gray-400 font-bold">{p.stats.articlesPublished} Articles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE PROFILE MODAL */}
      {isCreateProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Create Staff Profile</h3>
              <button onClick={() => setIsCreateProfileModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newProfileForm.firstName}
                    onChange={e => setNewProfileForm({ ...newProfileForm, firstName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newProfileForm.lastName}
                    onChange={e => setNewProfileForm({ ...newProfileForm, lastName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newProfileForm.jobTitle}
                    onChange={e => setNewProfileForm({ ...newProfileForm, jobTitle: e.target.value })}
                    placeholder="Associate Funeral Director"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Role Privilege</label>
                  <select
                    value={newProfileForm.role}
                    onChange={e => setNewProfileForm({ ...newProfileForm, role: e.target.value as any })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#411548]"
                  >
                    <option value="Funeral Director">Funeral Director</option>
                    <option value="Author">Author</option>
                    <option value="Editor">Editor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsCreateProfileModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-full font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase">Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PERSONAL PROFILE MODAL */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Edit Personal Credentials</h3>
              <button onClick={() => setIsEditUserModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOwnProfile} className="space-y-4 text-xs">
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={editFormData.displayName}
                  onChange={e => setEditFormData({ ...editFormData, displayName: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  value={editFormData.jobTitle}
                  onChange={e => setEditFormData({ ...editFormData, jobTitle: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={e => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditUserModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-full font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PUBLIC AUTHOR PAGE MODAL */}
      {isEditPublicPageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Customize Public Author Page</h3>
              <button onClick={() => setIsEditPublicPageModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePublicPage} className="space-y-4 text-xs">
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Public Author Headline</label>
                <input
                  type="text"
                  value={publicPageFormData.publicHeadline}
                  onChange={e => setPublicPageFormData({ ...publicPageFormData, publicHeadline: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Public Author Bio</label>
                <textarea
                  rows={4}
                  value={publicPageFormData.publicBio}
                  onChange={e => setPublicPageFormData({ ...publicPageFormData, publicBio: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditPublicPageModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-full font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase">Publish Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSPECT USER MODAL */}
      {inspectingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Staff Profile: {inspectingUser.displayName}</h3>
              <button onClick={() => setInspectingUser(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 bg-[#faf4fa] rounded-2xl">
                <img src={inspectingUser.profilePhoto} alt={inspectingUser.displayName} className="w-14 h-14 rounded-xl object-cover border-2 border-[#C5A059]" />
                <div>
                  <h4 className="font-serif font-black text-sm text-gray-900">{inspectingUser.displayName}</h4>
                  <p className="text-xs text-[#411548] font-bold">{inspectingUser.jobTitle}</p>
                  <p className="text-[10px] text-gray-500 font-mono">{inspectingUser.email}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-700 block uppercase text-[10px] mb-1">Biography</span>
                <p className="text-gray-700 font-light leading-relaxed">{inspectingUser.bio}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button onClick={() => setInspectingUser(null)} className="px-5 py-2 bg-[#411548] text-white rounded-full text-xs font-black uppercase">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
