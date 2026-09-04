import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { 
  FileEdit, LayoutDashboard, PlusCircle, CheckCircle2, Eye, Trash2, Edit3, LogOut, 
  BookOpen, Users, FileText, Image as ImageIcon, Settings, Search, Filter, 
  TrendingUp, Download, ShieldCheck, Tag, Calendar, ArrowUpRight, Check, X,
  ExternalLink, Layers, Sparkles, MessageSquare, AlertCircle, BarChart3, RefreshCw,
  Briefcase, UserCheck, Mail, Phone, Clock, Plus, ChevronRight, Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OBITUARIES_DATA, ObituaryItem } from '../data/obituariesData';

interface BlogPostDraft {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft' | 'Pending Review';
  excerpt: string;
  content: string;
  featured: boolean;
  views: number;
  imageUrl?: string;
}

interface ResourceGuide {
  id: number;
  title: string;
  category: string;
  fileSize: string;
  downloads: number;
  updatedDate: string;
}

interface MediaAsset {
  id: number;
  name: string;
  category: string;
  dimensions: string;
  url: string;
}

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: 'Active' | 'Filled' | 'Draft';
  description: string;
  postedDate: string;
}

interface JobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  department: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  message: string;
  submittedDate: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Hired' | 'Rejected';
}

export default function CmsDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'articles' | 'obituaries' | 'careers' | 'resources' | 'media' | 'team' | 'settings'
  >('overview');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter & Search states
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Blog Posts State with LocalStorage Persistence
  const [blogPosts, setBlogPosts] = useState<BlogPostDraft[]>(() => {
    const saved = localStorage.getItem('middleton_cms_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CMS posts', e);
      }
    }
    return [
      { 
        id: 1, 
        title: 'Understanding Ambiguous Loss in Modern Grief Support', 
        category: 'Grief Support', 
        author: 'Elsie Kiboma', 
        date: '2026-08-15', 
        status: 'Published', 
        excerpt: 'Exploring emotional recovery strategies for grieving families in Minnesota.',
        content: 'Ambiguous loss occurs when a loved one is physically present but psychologically absent, or vice versa. In modern grief care, acknowledging this unresolved grief is essential for emotional healing...',
        featured: true,
        views: 1240,
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800'
      },
      { 
        id: 2, 
        title: 'The Essential Pre-Planning Checklist for 2026', 
        category: 'Pre-Planning', 
        author: 'Mwansa Kamangala', 
        date: '2026-08-10', 
        status: 'Published', 
        excerpt: 'A step-by-step roadmap for securing family wishes and locking in transparent rates.',
        content: 'Pre-planning your funeral service provides immense financial and emotional relief for your family. This comprehensive checklist covers legal directives, cemetery plot selection, and ceremonial wishes...',
        featured: true,
        views: 890,
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800'
      },
      { 
        id: 3, 
        title: 'Honoring Veterans: Special Ceremonial Arrangements', 
        category: 'Community', 
        author: 'Editorial Team', 
        date: '2026-08-01', 
        status: 'Draft', 
        excerpt: 'Guiding military families through full military honors, flags, and national cemetery filings.',
        content: 'Every military veteran is entitled to honorable funeral recognitions, including presidential certificate presentation, folding of the American flag, and taps played by honor guards...',
        featured: false,
        views: 310,
        imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
      }
    ];
  });

  // Careers / Job Openings State
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem('middleton_cms_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CMS jobs', e);
      }
    }
    return [
      { id: 1, title: 'Licensed Funeral Director & Mortician', department: 'Mortuary Care', location: 'Apple Valley, MN', type: 'Full-Time', salary: '$75k - $95k', status: 'Active', description: 'Oversee ceremonial coordination, embalming, care arrangements, and funeral service execution.', postedDate: '2026-08-20' },
      { id: 2, title: 'Certified Grief Counselor', department: 'Family Guidance', location: 'Apple Valley, MN', type: 'Full-Time', salary: '$65k - $80k', status: 'Active', description: 'Guide grieving families through structured bereavement care and monthly support circles.', postedDate: '2026-08-18' },
      { id: 3, title: 'Funeral Assistant & Care Officer', department: 'Administration', location: 'Apple Valley, MN', type: 'Full-Time', salary: '$22 - $28 / hr', status: 'Active', description: 'Welcome families, manage chapel reception, and coordinate obituary publishing.', postedDate: '2026-08-15' },
      { id: 4, title: 'Mortuary Logistics Specialist', department: 'Logistics', location: 'Twin Cities, MN', type: 'Full-Time', salary: '$24 - $30 / hr', status: 'Active', description: 'Perform prompt, dignified transfers and maintain executive service fleet.', postedDate: '2026-08-12' }
    ];
  });

  // Applications State
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('middleton_cms_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse applications', e);
      }
    }
    return [
      { id: 101, jobId: 1, jobTitle: 'Licensed Funeral Director', department: 'Mortuary Care', name: 'Alexander Wright', email: 'a.wright@example.com', phone: '(952) 555-0192', experience: '5+ Years Senior Experience', message: 'Licensed in MN for 6 years. Specialized in green burials and family care.', submittedDate: '2026-08-25', status: 'Pending' },
      { id: 102, jobId: 2, jobTitle: 'Certified Grief Counselor', department: 'Family Guidance', name: 'Maria Santos', email: 'maria.santos@example.com', phone: '(612) 555-0144', experience: '3-5 Years', message: 'Master in Social Work with certified thanatology background.', submittedDate: '2026-08-24', status: 'Reviewed' }
    ];
  });

  // Careers Form State
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState('');
  const [jobDeptInput, setJobDeptInput] = useState('Mortuary Care');
  const [jobLocInput, setJobLocInput] = useState('Apple Valley, MN');
  const [jobTypeInput, setJobTypeInput] = useState('Full-Time');
  const [jobSalaryInput, setJobSalaryInput] = useState('');
  const [jobDescInput, setJobDescInput] = useState('');

  // Resource Guides State
  const [resources] = useState<ResourceGuide[]>([
    { id: 1, title: '2026 Comprehensive Funeral Pre-Planning Guide', category: 'Pre-Planning', fileSize: '2.4 MB PDF', downloads: 342, updatedDate: '2026-08-01' },
    { id: 2, title: 'Grief Recovery & Healing Roadmap for Families', category: 'Grief Support', fileSize: '1.8 MB PDF', downloads: 512, updatedDate: '2026-08-12' },
    { id: 3, title: 'Minnesota Estate Finalization & Probate Checklist', category: 'Legal', fileSize: '3.1 MB PDF', downloads: 289, updatedDate: '2026-07-20' },
    { id: 4, title: 'Veterans Military Honors Application Pack', category: 'Community', fileSize: '1.2 MB PDF', downloads: 195, updatedDate: '2026-08-05' }
  ]);

  // Media Library State
  const [mediaAssets] = useState<MediaAsset[]>([
    { id: 1, name: 'Middleton Chapel Exterior.jpg', category: 'Venues', dimensions: '1920x1080', url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Floral Wreath Sympathy.jpg', category: 'Flowers', dimensions: '1200x800', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Peaceful Memorial Garden.jpg', category: 'Green Burial', dimensions: '1600x900', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Executive Director Desk.jpg', category: 'Staff', dimensions: '1200x800', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' }
  ]);

  // Article Form State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Grief Support');
  const [postAuthor, setPostAuthor] = useState('Staff Writer');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postFeatured, setPostFeatured] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState('');

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('middleton_cms_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('middleton_cms_jobs', JSON.stringify(jobPostings));
  }, [jobPostings]);

  useEffect(() => {
    localStorage.setItem('middleton_cms_applications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Article Handlers
  const handleCreateOrUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      showToast('Article title is required!');
      return;
    }

    if (editingPostId) {
      setBlogPosts(prev => prev.map(p => {
        if (p.id === editingPostId) {
          return {
            ...p,
            title: postTitle,
            category: postCategory,
            author: postAuthor,
            excerpt: postExcerpt,
            content: postContent,
            featured: postFeatured,
            imageUrl: postImageUrl || p.imageUrl
          };
        }
        return p;
      }));
      showToast(`Article "${postTitle}" updated successfully!`);
      setEditingPostId(null);
    } else {
      const newPost: BlogPostDraft = {
        id: Date.now(),
        title: postTitle,
        category: postCategory,
        author: postAuthor,
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
        excerpt: postExcerpt || 'Custom editorial article published via Middleton CMS.',
        content: postContent || 'Detailed article content discussing family guidance, bereavement recovery, and service options.',
        featured: postFeatured,
        views: 1,
        imageUrl: postImageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800'
      };
      setBlogPosts([newPost, ...blogPosts]);
      showToast(`Article "${newPost.title}" published!`);
    }

    setPostTitle('');
    setPostExcerpt('');
    setPostContent('');
    setPostImageUrl('');
    setPostFeatured(false);
    setIsCreatingPost(false);
  };

  const deletePost = (id: number) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    showToast('Article deleted from CMS database');
  };

  // Careers Handlers
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitleInput.trim()) return;

    const newJob: JobPosting = {
      id: Date.now(),
      title: jobTitleInput,
      department: jobDeptInput,
      location: jobLocInput,
      type: jobTypeInput,
      salary: jobSalaryInput || '$25 - $35 / hr',
      status: 'Active',
      description: jobDescInput || 'Join Middleton Funeral Services as an essential team member.',
      postedDate: new Date().toISOString().split('T')[0]
    };

    setJobPostings([newJob, ...jobPostings]);
    showToast(`Job opening "${newJob.title}" published!`);
    setIsCreatingJob(false);
    setJobTitleInput('');
    setJobDescInput('');
    setJobSalaryInput('');
  };

  const toggleJobStatus = (id: number) => {
    setJobPostings(prev => prev.map(j => {
      if (j.id === id) {
        const nextStatus = j.status === 'Active' ? 'Filled' : 'Active';
        showToast(`Job status changed to ${nextStatus}`);
        return { ...j, status: nextStatus as 'Active' | 'Filled' };
      }
      return j;
    }));
  };

  const deleteJob = (id: number) => {
    setJobPostings(prev => prev.filter(j => j.id !== id));
    showToast('Job posting removed from CMS');
  };

  const updateAppStatus = (id: number, status: JobApplication['status']) => {
    setJobApplications(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status };
      }
      return a;
    }));
    showToast(`Applicant status updated to ${status}`);
  };

  const filteredPosts = blogPosts.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(articleSearch.toLowerCase()) || 
                         p.excerpt.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesQuery && matchesCat && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#fdfbfd] text-gray-900 flex font-sans overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 max-w-md bg-[#411548] text-white p-4 rounded-2xl shadow-2xl border border-purple-300/40 flex items-center gap-3 text-xs font-bold uppercase tracking-wider"
          >
            <CheckCircle2 size={18} className="text-green-400 shrink-0" />
            <span className="flex-1">{notification}</span>
            <button onClick={() => setNotification(null)} className="text-white/60 hover:text-white">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR NAVIGATION WITH ALL MODULES */}
      <aside className={`bg-[#411548] text-white flex flex-col justify-between transition-all duration-300 z-40 sticky top-0 h-screen ${
        isSidebarOpen ? 'w-64 min-w-[16rem]' : 'w-20 min-w-[5rem]'
      }`}>
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <img src={HEADER_FOOTER_LOGO} alt="Middleton Logo" className="h-8 w-auto invert brightness-0 shrink-0" referrerPolicy="no-referrer" />
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-serif font-black text-base tracking-tight leading-none text-white whitespace-nowrap">MIDDLETON</span>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/50 font-bold mt-1">CMS Control Hub</span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all hidden md:block"
              title="Toggle Sidebar"
            >
              <Menu size={16} />
            </button>
          </div>

          {/* Module Navigation List */}
          <nav className="p-3 space-y-6">
            
            {/* Core Content Group */}
            <div>
              {isSidebarOpen && (
                <span className="px-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/40 block mb-2">
                  Core Management
                </span>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === 'overview' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard size={18} className="shrink-0" />
                  {isSidebarOpen && <span>Overview</span>}
                </button>

                <button
                  onClick={() => setActiveTab('articles')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                    activeTab === 'articles' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="shrink-0" />
                    {isSidebarOpen && <span>Articles</span>}
                  </div>
                  {isSidebarOpen && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'articles' ? 'bg-purple-100 text-[#411548]' : 'bg-white/20 text-white'
                    }`}>
                      {blogPosts.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('obituaries')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                    activeTab === 'obituaries' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="shrink-0" />
                    {isSidebarOpen && <span>Obituaries</span>}
                  </div>
                  {isSidebarOpen && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'obituaries' ? 'bg-purple-100 text-[#411548]' : 'bg-white/20 text-white'
                    }`}>
                      {OBITUARIES_DATA.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('careers')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                    activeTab === 'careers' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="shrink-0 text-amber-300" />
                    {isSidebarOpen && <span>Careers & Hiring</span>}
                  </div>
                  {isSidebarOpen && (
                    <span className="text-[10px] bg-amber-400 text-gray-900 font-black px-2 py-0.5 rounded-full">
                      {jobApplications.filter(a => a.status === 'Pending').length} New
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Assets & Downloads Group */}
            <div>
              {isSidebarOpen && (
                <span className="px-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/40 block mb-2">
                  Assets & Media
                </span>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === 'resources' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Download size={18} className="shrink-0" />
                  {isSidebarOpen && <span>Resources</span>}
                </button>

                <button
                  onClick={() => setActiveTab('media')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === 'media' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <ImageIcon size={18} className="shrink-0" />
                  {isSidebarOpen && <span>Media Library</span>}
                </button>
              </div>
            </div>

            {/* Administration Group */}
            <div>
              {isSidebarOpen && (
                <span className="px-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/40 block mb-2">
                  Administration
                </span>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('team')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === 'team' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users size={18} className="shrink-0" />
                  {isSidebarOpen && <span>Team Members</span>}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === 'settings' ? 'bg-white text-[#411548] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Settings size={18} className="shrink-0" />
                  {isSidebarOpen && <span>System Settings</span>}
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-xs shrink-0">
                  MF
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold truncate">Senior CMS Editor</span>
                  <span className="text-[9px] text-white/50 truncate">editor@middleton.com</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Exit CMS"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              title="Exit CMS"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-100 p-6 sticky top-0 z-30 shadow-sm flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#411548] block">
              Middleton Management Module
            </span>
            <h1 className="text-2xl font-serif font-black text-[#411548] uppercase tracking-tight">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'articles' && 'Articles & Editorial Blog'}
              {activeTab === 'obituaries' && 'Digital Obituaries Directory'}
              {activeTab === 'careers' && 'Careers & Hiring Portal'}
              {activeTab === 'resources' && 'Downloadable Educational Resources'}
              {activeTab === 'media' && 'Media & Asset Library'}
              {activeTab === 'team' && 'Editorial Staff & Permissions'}
              {activeTab === 'settings' && 'CMS Platform Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/careers"
              target="_blank"
              className="hidden sm:flex items-center gap-2 bg-purple-50 text-[#411548] hover:bg-purple-100 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-200 transition-all"
            >
              <Eye size={14} /> View Careers Page
            </Link>

            <Link
              to="/blog"
              target="_blank"
              className="flex items-center gap-2 bg-[#411548] text-white hover:bg-[#300f35] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md transition-all"
            >
              <ExternalLink size={14} /> Live Blog
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#411548] flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Published Articles</span>
                    <h3 className="text-3xl font-serif font-black text-[#411548]">{blogPosts.length}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Active Job Postings</span>
                    <h3 className="text-3xl font-serif font-black text-[#411548]">{jobPostings.filter(j => j.status === 'Active').length}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center shrink-0">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Job Applicants</span>
                    <h3 className="text-3xl font-serif font-black text-[#411548]">{jobApplications.length}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Digital Obituaries</span>
                    <h3 className="text-3xl font-serif font-black text-[#411548]">{OBITUARIES_DATA.length}</h3>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#411548] uppercase">Recent Editorial Articles</h3>
                  <button onClick={() => setActiveTab('articles')} className="text-xs font-bold text-[#411548] hover:underline uppercase tracking-wider">
                    View All Articles &rarr;
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-[#411548]">{post.title}</h4>
                        <span className="text-[10px] text-gray-500">{post.category} &bull; By {post.author} &bull; {post.date}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={articleSearch}
                      onChange={e => setArticleSearch(e.target.value)}
                      placeholder="Search articles..."
                      className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-xs font-medium border border-gray-200 outline-none focus:border-[#411548]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEditingPostId(null);
                    setPostTitle('');
                    setPostExcerpt('');
                    setPostContent('');
                    setPostImageUrl('');
                    setIsCreatingPost(true);
                  }}
                  className="bg-[#411548] hover:bg-[#300f35] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} /> New Article
                </button>
              </div>

              {/* Create/Edit Post Form Modal */}
              {isCreatingPost && (
                <form onSubmit={handleCreateOrUpdatePost} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg space-y-6">
                  <h3 className="font-serif font-black text-xl text-[#411548] uppercase">
                    {editingPostId ? 'Edit Article' : 'Publish New Article'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={e => setPostTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548]"
                        placeholder="Article Headline..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Category</label>
                      <select
                        value={postCategory}
                        onChange={e => setPostCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548] bg-white"
                      >
                        <option value="Grief Support">Grief Support</option>
                        <option value="Pre-Planning">Pre-Planning</option>
                        <option value="Community">Community</option>
                        <option value="Legal">Legal & Heritage</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Excerpt Summary</label>
                    <textarea
                      rows={2}
                      value={postExcerpt}
                      onChange={e => setPostExcerpt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-light focus:border-[#411548]"
                      placeholder="Short summary for readers..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Full Article Content</label>
                    <textarea
                      rows={5}
                      value={postContent}
                      onChange={e => setPostContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-light focus:border-[#411548]"
                      placeholder="Write full article body text..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPost(false)}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase text-gray-500 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#411548] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md"
                    >
                      Save & Publish
                    </button>
                  </div>
                </form>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-[#411548] text-[10px] font-black uppercase">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">{post.date}</span>
                      </div>
                      <h3 className="font-serif font-black text-lg text-[#411548] mb-2">{post.title}</h3>
                      <p className="text-xs text-gray-600 font-light line-clamp-2">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[10px] text-gray-500 font-bold">By {post.author}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CAREERS & HIRING MODULE */}
          {activeTab === 'careers' && (
            <div className="space-y-8">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#411548] block mb-1">Careers & Talent Portal</span>
                  <h3 className="text-xl font-serif font-black text-[#411548]">Manage Job Openings & Applicant Submissions</h3>
                </div>

                <button
                  onClick={() => setIsCreatingJob(true)}
                  className="bg-[#411548] hover:bg-[#300f35] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} /> Add Job Posting
                </button>
              </div>

              {/* Create Job Form Modal */}
              {isCreatingJob && (
                <form onSubmit={handleCreateJob} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
                  <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Post New Career Opening</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={jobTitleInput}
                        onChange={e => setJobTitleInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548]"
                        placeholder="e.g. Lead Funeral Director"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Department</label>
                      <select
                        value={jobDeptInput}
                        onChange={e => setJobDeptInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548] bg-white"
                      >
                        <option value="Mortuary Care">Mortuary Care</option>
                        <option value="Family Guidance">Family Guidance</option>
                        <option value="Administration">Administration</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Floral & Decor">Floral & Decor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Location</label>
                      <input
                        type="text"
                        value={jobLocInput}
                        onChange={e => setJobLocInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Job Type</label>
                      <select
                        value={jobTypeInput}
                        onChange={e => setJobTypeInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548] bg-white"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Salary Range</label>
                      <input
                        type="text"
                        value={jobSalaryInput}
                        onChange={e => setJobSalaryInput(e.target.value)}
                        placeholder="e.g. $70,000 - $85,000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-medium focus:border-[#411548]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={jobDescInput}
                      onChange={e => setJobDescInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-xs font-light focus:border-[#411548]"
                      placeholder="Overview of duties and qualifications required..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCreatingJob(false)}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase text-gray-500 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#411548] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md"
                    >
                      Publish Job
                    </button>
                  </div>
                </form>
              )}

              {/* SECTION: ACTIVE JOB POSTINGS */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Active Career Opportunities ({jobPostings.length})</h3>

                <div className="divide-y divide-gray-100">
                  {jobPostings.map(job => (
                    <div key={job.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#411548] text-[9px] font-black uppercase">
                            {job.department}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">{job.type} &bull; {job.salary}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#411548]">{job.title}</h4>
                        <p className="text-xs text-gray-500 font-light max-w-xl">{job.description}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleJobStatus(job.id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                            job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {job.status}
                        </button>
                        <button onClick={() => deleteJob(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: APPLICANT SUBMISSIONS */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-black text-xl text-[#411548] uppercase">
                    Received Applications ({jobApplications.length})
                  </h3>
                  <span className="text-xs text-gray-400">Applications submitted from website candidates</span>
                </div>

                <div className="space-y-4">
                  {jobApplications.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No job applications submitted yet.</p>
                  ) : (
                    jobApplications.map(app => (
                      <div key={app.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-[9px] font-black uppercase text-[#411548] tracking-wider block">
                              Applied for: {app.jobTitle}
                            </span>
                            <h4 className="font-bold text-base text-gray-900">{app.name}</h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={e => updateAppStatus(app.id, e.target.value as any)}
                              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold uppercase bg-white text-[#411548]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Interview">Interview Scheduled</option>
                              <option value="Hired">Hired</option>
                              <option value="Rejected">Archived</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 font-medium">
                          <span className="flex items-center gap-1"><Mail size={12} className="text-[#411548]" /> {app.email}</span>
                          <span className="flex items-center gap-1"><Phone size={12} className="text-[#411548]" /> {app.phone}</span>
                          <span>Experience: <strong>{app.experience}</strong></span>
                          <span className="text-gray-400">Submitted: {app.submittedDate}</span>
                        </div>

                        {app.message && (
                          <p className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-200/60 font-light italic">
                            "{app.message}"
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: OBITUARIES */}
          {activeTab === 'obituaries' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-xl text-[#411548] uppercase">
                Digital Obituary Records ({OBITUARIES_DATA.length})
              </h3>
              <div className="divide-y divide-gray-100">
                {OBITUARIES_DATA.map(item => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#411548]">{item.name}</h4>
                      <span className="text-[10px] text-gray-500">{item.years} &bull; {item.location}</span>
                    </div>
                    <Link to={`/obituary/${item.id}`} target="_blank" className="p-2 text-[#411548] hover:bg-purple-50 rounded-full">
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Educational Downloads & Guides</h3>
              <div className="divide-y divide-gray-100">
                {resources.map(res => (
                  <div key={res.id} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#411548]">{res.title}</h4>
                      <span className="text-[10px] text-gray-500">{res.category} &bull; {res.fileSize} &bull; {res.downloads} Downloads</span>
                    </div>
                    <button className="px-4 py-2 bg-purple-50 text-[#411548] rounded-full text-xs font-bold uppercase">
                      Manage PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Media Library</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {mediaAssets.map(asset => (
                  <div key={asset.id} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <img src={asset.url} alt={asset.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h5 className="font-bold text-xs truncate text-[#411548]">{asset.name}</h5>
                      <span className="text-[9px] text-gray-400">{asset.dimensions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TEAM */}
          {activeTab === 'team' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-xl text-[#411548] uppercase">Editorial Staff Directory</h3>
              <p className="text-xs text-gray-600">Senior CMS Editors & Licensed Director contributors for Middleton Funeral Services.</p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-[#411548]">Elsie Kiboma</h5>
                    <span className="text-[10px] text-gray-500">Senior CMS Editor & Care Specialist</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold uppercase">Superadmin</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-xl text-[#411548] uppercase">CMS System Preferences</h3>
              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span>Auto-save draft revisions to LocalStorage</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#411548]" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span>Notify editorial team when new job applications arrive</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#411548]" />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
