import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Plus, Trash2, Eye, Edit3, Lock,
  ChevronLeft, ChevronRight, ChevronDown, Award, BookOpen,
  X, RefreshCw, Briefcase, Mail, KeyRound, ArrowUpRight,
  Menu, HardDrive, Calendar as CalendarIcon, ExternalLink,
  Layers, LayoutGrid, CheckCircle2, AlertCircle, Search, User, LogOut,
  Clock, MapPin, Send, Quote, TrendingUp, Heart, ShieldCheck,
  UserCheck, Database, Share2, Target, Tag, Building2, Package, DollarSign,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  blogStore, BlogPostItem, BlogCategory, BlogAuthor, 
  BeneficiaryRecord, Vacancy 
} from '../lib/blogStore';

// Modular CMS Sub-components
import CmsDashboardOverview from '../components/cms/CmsDashboardOverview';
import CmsAnalytics from '../components/cms/CmsAnalytics';
import CmsPosts from '../components/cms/CmsPosts';
import CmsPostEditor from '../components/cms/CmsPostEditor';
import CmsMediaManager from '../components/cms/CmsMediaManager';
import CmsCategories from '../components/cms/CmsCategories';
import CmsProfiles from '../components/cms/CmsProfiles';
import CmsObituaries from '../components/cms/CmsObituaries';
import CmsVacancies from '../components/cms/CmsVacancies';
import CmsJobApplications from '../components/cms/CmsJobApplications';
import CmsComments from '../components/cms/CmsComments';
import CmsMessages from '../components/cms/CmsMessages';
import CmsVendor from '../components/cms/CmsVendor';
import CmsSystemAdmin from '../components/cms/CmsSystemAdmin';
import CmsRolesManager from '../components/cms/CmsRolesManager';
import CmsBackups from '../components/cms/CmsBackups';
import CmsSocialMedia from '../components/cms/CmsSocialMedia';
import CmsTracking from '../components/cms/CmsTracking';
import CmsPasswordManager from '../components/cms/CmsPasswordManager';

export type CmsNavId =
  // Main dashboard
  | 'overview' 
  | 'analytics' 
  | 'media'
  // Blogging
  | 'articles' 
  | 'add_post'
  | 'categories' 
  | 'profiles' 
  | 'passwords'
  // Webmaster
  | 'obituaries' 
  | 'vacancies' 
  | 'comments' 
  | 'leads'
  // Vendor
  | 'vendor'
  | 'vendor_orders'
  | 'vendor_invoices'
  // Site administration
  | 'administration' 
  | 'role_manager' 
  | 'social_media'
  // Backward-compatibility Aliases
  | 'dashboard'
  | 'posts'
  | 'categories_tags'
  | 'authors'
  | 'beneficiaries'
  | 'job_applications'
  | 'messages'
  | 'system_admin'
  | 'roles_manager'
  | 'backups'
  | 'tracking_manager'
  | 'password_manager';

export default function CmsDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Navigation State strictly aligned with user specifications
  const [activeNav, setActiveNav] = useState<CmsNavId>('overview');

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Core Data Stores
  const [posts, setPosts] = useState<BlogPostItem[]>(() => blogStore.getPosts());
  const [categories, setCategories] = useState<BlogCategory[]>(() => blogStore.getCategories());
  const [authors, setAuthors] = useState<BlogAuthor[]>(() => blogStore.getAuthors());
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryRecord[]>(() => blogStore.getBeneficiaries());
  const [vacancies, setVacancies] = useState<Vacancy[]>(() => blogStore.getVacancies());

  // Post Editor State
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);

  // Toast Feedback State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Header Dropdowns
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Live Date
  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Post Actions Handlers
  const handleOpenNewPost = () => {
    setEditingPost(null);
    setActiveNav('add_post');
  };

  const handleOpenEditPost = (post: BlogPostItem) => {
    setEditingPost(post);
    setActiveNav('add_post');
  };

  const handleSavePost = (savedPost: BlogPostItem) => {
    const existingIndex = posts.findIndex(p => p.id === savedPost.id);
    let updated: BlogPostItem[];
    if (existingIndex >= 0) {
      updated = posts.map(p => p.id === savedPost.id ? savedPost : p);
    } else {
      updated = [savedPost, ...posts];
    }
    blogStore.savePosts(updated);
    setPosts(updated);
    setActiveNav('articles');
    setEditingPost(null);
    showToast(`Saved article: "${savedPost.title}"`);
  };

  const handleTrashPost = (postId: string) => {
    const updated = posts.map(p => p.id === postId ? { ...p, status: 'Trash' as const } : p);
    blogStore.savePosts(updated);
    setPosts(updated);
    showToast('Moved article to Trash');
  };

  const handleRestorePost = (postId: string) => {
    const updated = posts.map(p => p.id === postId ? { ...p, status: 'Published' as const } : p);
    blogStore.savePosts(updated);
    setPosts(updated);
    showToast('Restored article to Published');
  };

  const handleDeletePermanent = (postId: string) => {
    const updated = posts.filter(p => p.id !== postId);
    blogStore.savePosts(updated);
    setPosts(updated);
    showToast('Permanently deleted article');
  };

  const handleQuickAddPost = (title: string, category: string, excerpt: string) => {
    const newPost: BlogPostItem = {
      id: `post-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      excerpt: excerpt || 'A compassionate guide for families.',
      category,
      tags: ['Memorial', 'Guidance'],
      authorName: authors[0]?.name || 'William Middleton',
      authorId: authors[0]?.id,
      authorAvatar: authors[0]?.avatar,
      authorRole: authors[0]?.role,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      views: 0,
      likes: 0,
      status: 'Draft',
      blocks: [
        { id: 'b-1', type: 'headline', content: title },
        { id: 'b-2', type: 'text', content: 'Begin composing your compassionate reflections and guidance here...' }
      ]
    };
    setEditingPost(newPost);
    setActiveNav('add_post');
    showToast(`Draft initiated for "${title}"`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to normalize activeNav for sidebar highlight
  const isNavActive = (id: CmsNavId) => {
    if (activeNav === id) return true;
    if (id === 'overview' && activeNav === 'dashboard') return true;
    if (id === 'articles' && (activeNav === 'posts' || activeNav === 'add_post')) return true;
    if (id === 'categories' && activeNav === 'categories_tags') return true;
    if (id === 'profiles' && activeNav === 'authors') return true;
    if (id === 'passwords' && activeNav === 'password_manager') return true;
    if (id === 'obituaries' && activeNav === 'beneficiaries') return true;
    if (id === 'vacancies' && activeNav === 'job_applications') return true;
    if (id === 'leads' && activeNav === 'messages') return true;
    if (id === 'administration' && (activeNav === 'system_admin' || activeNav === 'backups' || activeNav === 'tracking_manager')) return true;
    if (id === 'role_manager' && activeNav === 'roles_manager') return true;
    return false;
  };

  // Nav item helper
  const NavItem = ({ 
    id, 
    label, 
    icon: Icon, 
    badge 
  }: { 
    id: CmsNavId; 
    label: string; 
    icon: React.ElementType; 
    badge?: number | string; 
  }) => {
    const isActive = isNavActive(id);
    return (
      <button
        onClick={() => {
          setActiveNav(id);
          if (window.innerWidth < 1024) setSidebarOpen(false);
        }}
        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
          isActive 
            ? 'bg-[#C5A059] text-[#411548] shadow-sm font-extrabold translate-x-1' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
          <span className="truncate">{label}</span>
        </div>
        {badge !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            isActive ? 'bg-[#411548] text-white' : 'bg-white/15 text-white'
          }`}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  // Format activeNav for header
  const getNavLabel = (id: CmsNavId) => {
    switch (id) {
      case 'overview':
      case 'dashboard':
        return 'Overview';
      case 'analytics':
        return 'Analytics';
      case 'media':
        return 'Media Asset Manager';
      case 'articles':
      case 'posts':
        return 'Articles';
      case 'add_post':
        return 'Article Studio Editor';
      case 'categories':
      case 'categories_tags':
        return 'Categories';
      case 'profiles':
      case 'authors':
        return 'Profiles & Staff Directory';
      case 'passwords':
      case 'password_manager':
        return 'Passwords & Security';
      case 'obituaries':
      case 'beneficiaries':
        return 'Obituaries';
      case 'vacancies':
      case 'job_applications':
        return 'Vacancies & Recruitment';
      case 'comments':
        return 'Comments Moderation';
      case 'leads':
      case 'messages':
        return 'Leads & Inquiries';
      case 'vendor':
        return 'Vendor Directory';
      case 'vendor_orders':
        return 'Vendor Purchase Orders';
      case 'vendor_invoices':
        return 'Vendor Invoices';
      case 'administration':
      case 'system_admin':
        return 'Site Administration';
      case 'role_manager':
      case 'roles_manager':
        return 'Role Manager';
      case 'social_media':
        return 'Social Media & Broadcast';
      default:
        return String(id).replace('_', ' ');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf4fa] flex font-sans text-gray-800 relative scrollbar-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#411548] text-white px-6 py-3.5 rounded-full shadow-2xl font-bold text-xs flex items-center gap-3 border border-[#C5A059]/40"
          >
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed lg:static top-0 inset-y-0 left-0 w-72 bg-[#411548] text-white flex flex-col justify-between z-30 shadow-2xl border-r border-[#C5A059]/25 transition-transform duration-300 ease-in-out shrink-0 self-stretch min-h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#411548] font-serif font-black text-xl shadow-md border-2 border-white/20 group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <h1 className="font-serif font-black text-base text-white tracking-tight uppercase leading-none">
                  Middleton
                </h1>
                <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-black mt-0.5">
                  Administrative CMS
                </p>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Categories Grouped Strictly by User Request */}
        <div className="p-3 space-y-3.5 flex-1 overflow-visible">
          
          {/* Group 1: Main dashboard */}
          <div className="space-y-1">
            <p className="px-2 text-[9px] font-black uppercase tracking-widest text-[#C5A059]/90 mb-1">
              Main Dashboard
            </p>
            <NavItem id="overview" label="Over view" icon={LayoutDashboard} />
            <NavItem id="analytics" label="Analytics" icon={TrendingUp} />
            <NavItem id="media" label="Media" icon={HardDrive} />
          </div>

          {/* Group 2: Blogging */}
          <div className="space-y-1">
            <p className="px-2 text-[9px] font-black uppercase tracking-widest text-[#C5A059]/90 mb-1">
              Blogging
            </p>
            <NavItem id="articles" label="Articles" icon={FileText} badge={posts.length} />
            <NavItem id="categories" label="Categories" icon={BookOpen} badge={categories.length} />
            <NavItem id="profiles" label="Profiles" icon={UserCheck} badge={authors.length} />
            <NavItem id="passwords" label="Passwords" icon={Lock} />
          </div>

          {/* Group 3: Webmaster */}
          <div className="space-y-1">
            <p className="px-2 text-[9px] font-black uppercase tracking-widest text-[#C5A059]/90 mb-1">
              Webmaster
            </p>
            <NavItem id="obituaries" label="Obituaries" icon={Heart} badge={beneficiaries.length} />
            <NavItem id="vacancies" label="Vacancies" icon={Briefcase} badge={vacancies.length} />
            <NavItem id="comments" label="Comments" icon={Quote} />
            <NavItem id="leads" label="Leads and inquiries" icon={Mail} />
          </div>

          {/* Group 4: Vendor */}
          <div className="space-y-1">
            <p className="px-2 text-[9px] font-black uppercase tracking-widest text-[#C5A059]/90 mb-1">
              Vendor
            </p>
            <NavItem id="vendor" label="Vendor Directory" icon={Building2} />
            <NavItem id="vendor_orders" label="Purchase Orders" icon={Package} />
            <NavItem id="vendor_invoices" label="Invoices & Settlements" icon={DollarSign} />
          </div>

          {/* Group 5: Site administration */}
          <div className="space-y-1">
            <p className="px-2 text-[9px] font-black uppercase tracking-widest text-[#C5A059]/90 mb-1">
              Site Administration
            </p>
            <NavItem id="administration" label="Administration" icon={ShieldCheck} />
            <NavItem id="role_manager" label="Role Manager" icon={User} />
            <NavItem id="social_media" label="Social Media" icon={Share2} />
          </div>
        </div>

        {/* Sidebar Footer: User Card */}
        <div className="p-4 border-t border-white/10 bg-[#300f35] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C5A059] text-[#411548] flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-white/60 truncate">admin@middleton.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP STATUS & ACTION BAR */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="text-[#411548] font-black uppercase">Middleton CMS</span>
              <span>/</span>
              <span className="capitalize text-gray-800">{getNavLabel(activeNav)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#faf4fa] rounded-full text-xs text-[#411548] font-medium border border-[#411548]/10">
              <CalendarIcon className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{currentDateFormatted}</span>
            </div>

            <Link
              to="/blog"
              target="_blank"
              className="px-4 py-2 bg-gray-100 hover:bg-[#411548] hover:text-white text-gray-700 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Public Journal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Quick Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#411548] text-[#C5A059] flex items-center justify-center font-bold text-xs shadow-xs">
                  AD
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => { setActiveNav('passwords'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-[#faf4fa] flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#411548]" /> Passwords & Security
                  </button>
                  <button
                    onClick={() => { setActiveNav('administration'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-[#faf4fa] flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#411548]" /> Site Administration
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DYNAMIC MODULE VIEW ROUTING */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          
          {/* 1. MAIN DASHBOARD: OVERVIEW */}
          {(activeNav === 'overview' || activeNav === 'dashboard') && (
            <CmsDashboardOverview 
              posts={posts}
              categories={categories}
              beneficiaries={beneficiaries}
              vacancies={vacancies}
              onNavigate={(nav) => {
                if (nav === 'posts') setActiveNav('articles');
                else if (nav === 'beneficiaries') setActiveNav('obituaries');
                else if (nav === 'messages') setActiveNav('leads');
                else if (nav === 'authors') setActiveNav('profiles');
                else if (nav === 'categories_tags') setActiveNav('categories');
                else if (nav === 'system_admin') setActiveNav('administration');
                else setActiveNav(nav);
              }}
              onQuickAddPost={handleQuickAddPost}
            />
          )}

          {/* 2. MAIN DASHBOARD: ANALYTICS */}
          {activeNav === 'analytics' && (
            <CmsAnalytics />
          )}

          {/* 3. MAIN DASHBOARD: MEDIA */}
          {activeNav === 'media' && (
            <CmsMediaManager onShowToast={showToast} />
          )}

          {/* 4. BLOGGING: ARTICLES */}
          {(activeNav === 'articles' || activeNav === 'posts') && (
            <CmsPosts 
              posts={posts}
              categories={categories}
              onOpenNewPost={handleOpenNewPost}
              onOpenEditPost={handleOpenEditPost}
              onTrashPost={handleTrashPost}
              onRestorePost={handleRestorePost}
              onDeletePermanent={handleDeletePermanent}
            />
          )}

          {/* ARTICLE STUDIO & BLOCK COMPOSER */}
          {activeNav === 'add_post' && (
            <CmsPostEditor 
              editingPost={editingPost}
              categories={categories}
              authors={authors}
              onSave={handleSavePost}
              onCancel={() => setActiveNav('articles')}
              onShowToast={showToast}
            />
          )}

          {/* 5. BLOGGING: CATEGORIES */}
          {(activeNav === 'categories' || activeNav === 'categories_tags') && (
            <CmsCategories onShowToast={showToast} />
          )}

          {/* 6. BLOGGING: PROFILES */}
          {(activeNav === 'profiles' || activeNav === 'authors') && (
            <CmsProfiles onShowToast={showToast} />
          )}

          {/* 7. BLOGGING: PASSWORDS */}
          {(activeNav === 'passwords' || activeNav === 'password_manager') && (
            <CmsPasswordManager onShowToast={showToast} />
          )}

          {/* 8. WEBMASTER: OBITUARIES */}
          {(activeNav === 'obituaries' || activeNav === 'beneficiaries') && (
            <CmsObituaries onShowToast={showToast} />
          )}

          {/* 9. WEBMASTER: VACANCIES */}
          {(activeNav === 'vacancies' || activeNav === 'job_applications') && (
            <CmsVacancies onShowToast={showToast} />
          )}

          {/* 10. WEBMASTER: COMMENTS */}
          {activeNav === 'comments' && (
            <CmsComments onShowToast={showToast} />
          )}

          {/* 11. WEBMASTER: LEADS AND INQUIRIES */}
          {(activeNav === 'leads' || activeNav === 'messages') && (
            <CmsMessages onShowToast={showToast} />
          )}

          {/* 12. VENDOR: SUBMODULES */}
          {activeNav === 'vendor' && (
            <CmsVendor onShowToast={showToast} initialSubmodule="directory" />
          )}

          {activeNav === 'vendor_orders' && (
            <CmsVendor onShowToast={showToast} initialSubmodule="orders" />
          )}

          {activeNav === 'vendor_invoices' && (
            <CmsVendor onShowToast={showToast} initialSubmodule="invoices" />
          )}

          {/* 13. SITE ADMINISTRATION: ADMINISTRATION */}
          {(activeNav === 'administration' || activeNav === 'system_admin' || activeNav === 'backups' || activeNav === 'tracking_manager') && (
            <CmsSystemAdmin onShowToast={showToast} />
          )}

          {/* 14. SITE ADMINISTRATION: ROLE MANAGER */}
          {(activeNav === 'role_manager' || activeNav === 'roles_manager') && (
            <CmsRolesManager onShowToast={showToast} />
          )}

          {/* 15. SITE ADMINISTRATION: SOCIAL MEDIA */}
          {activeNav === 'social_media' && (
            <CmsSocialMedia onShowToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}
