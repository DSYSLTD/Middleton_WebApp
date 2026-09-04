import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { LogIn, ShieldCheck, Store, ArrowRight, Mail, Lock, ChevronRight, FileEdit, LayoutDashboard, PlusCircle, CheckCircle2, Eye, Trash2, Edit3, LogOut, BookOpen, UserPlus, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BlogPostDraft {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft';
  excerpt: string;
}

export default function Login() {
  const { login: authLogin, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'member' | 'cms' | 'vendor' | 'admin'>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cmsRole, setCmsRole] = useState<'editor' | 'author' | 'publisher'>('editor');
  const [isCmsLoggedIn, setIsCmsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // CMS Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPostDraft[]>([
    { id: 1, title: 'Understanding Ambiguous Loss in Modern Grief Support', category: 'Grief Support', author: 'Elsie Kiboma', date: '2026-08-15', status: 'Published', excerpt: 'Exploring emotional recovery strategies for grieving families in Minnesota.' },
    { id: 2, title: 'The Essential Pre-Planning Checklist for 2026', category: 'Pre-Planning', author: 'Mwansa Kamangala', date: '2026-08-10', status: 'Published', excerpt: 'A step-by-step roadmap for securing family wishes and locks in transparent rates.' },
    { id: 3, title: 'Honoring Veterans: Special Ceremonial Arrangements', category: 'Community', author: 'Editorial Team', date: '2026-08-01', status: 'Draft', excerpt: 'Guiding military families through full military honors, flags, and national cemetery filings.' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Grief Support');
  const [newAuthor, setNewAuthor] = useState('Staff Writer');
  const [newExcerpt, setNewExcerpt] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'member') {
      authLogin(email || 'member@middletonfunerals.com', 'member', 'Registered Family Member');
      setNotification('Logged in as Registered Member! You can now post obituaries and condolences.');
      setTimeout(() => navigate('/submit-obituary'), 1500);
    } else if (activeTab === 'admin') {
      authLogin(email || 'admin@middletonfunerals.com', 'superadmin', 'Super Administrator');
      setNotification('Logged in as Super Admin! Full administrative privileges granted.');
      setTimeout(() => navigate('/submit-obituary'), 1500);
    } else if (activeTab === 'cms') {
      authLogin(email || 'cms-editor@middletonfunerals.com', 'superadmin', 'Senior CMS Editor');
      setNotification(`Welcome back! Logged in as CMS ${cmsRole.toUpperCase()}`);
      setTimeout(() => navigate('/cms'), 1000);
    } else if (activeTab === 'vendor') {
      authLogin(email || 'vendor@middletonfunerals.com', 'member', 'Partner Vendor');
      navigate('/shop');
    }
  };

  const handleDemoCmsLogin = () => {
    setEmail('editor@middletonfunerals.com');
    setPassword('cms-editor-2026');
    setActiveTab('cms');
    authLogin('editor@middletonfunerals.com', 'superadmin', 'Senior CMS Editor');
    setNotification('Logged in using CMS Editor Demo Credentials');
    setTimeout(() => navigate('/cms'), 1000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: BlogPostDraft = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      date: new Date().toISOString().split('T')[0],
      status: 'Published',
      excerpt: newExcerpt || 'Custom blog post created via Middleton Blogging CMS.'
    };

    setBlogPosts([newPost, ...blogPosts]);
    setNewTitle('');
    setNewExcerpt('');
    setNotification(`Article "${newPost.title}" published successfully!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const togglePostStatus = (id: number) => {
    setBlogPosts(prev => prev.map(post => {
      if (post.id === id) {
        const nextStatus = post.status === 'Published' ? 'Draft' : 'Published';
        return { ...post, status: nextStatus };
      }
      return post;
    }));
  };

  const deletePost = (id: number) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-[#411548] py-10 md:py-14 px-4 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff_0.1%,transparent_70%)] opacity-20"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <img src={HEADER_FOOTER_LOGO} alt="Logo" className="h-10 w-auto invert brightness-0" referrerPolicy="no-referrer" />
              <div className="text-left flex flex-col">
                <span className="text-white font-serif text-lg font-black tracking-tighter">MIDDLETON</span>
                <span className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-black">Portal Access</span>
              </div>
            </Link>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white mb-2 tracking-tight">
              Client & Staff <span className="text-white/40 italic font-light lowercase">Portal</span>
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto">
              Secure gateway for Registered Families, Blogging CMS Editors, Vendor Partners, and Executive Directors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Notification Banner */}
      {notification && (
        <div className="max-w-xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-[#411548] text-white px-6 py-4 rounded-2xl shadow-xl border border-purple-300 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-400" /> {notification}
            </span>
            <button onClick={() => setNotification(null)} className="opacity-60 hover:opacity-100">✕</button>
          </div>
        </div>
      )}

      {/* SECTION: CMS DASHBOARD (WHEN LOGGED IN) */}
      {isCmsLoggedIn ? (
        <section className="py-16 px-4 bg-gray-50 min-h-[70vh]">
          <div className="container mx-auto max-w-6xl">
            {/* Dashboard Header */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
                  <FileEdit size={14} /> Active Session &bull; {cmsRole.toUpperCase()} ROLE
                </span>
                <h2 className="text-3xl font-serif font-black text-[#411548] uppercase">Blogging CMS Administration</h2>
                <p className="text-gray-500 text-sm font-light mt-1">Publish news articles, obituaries, and grief support guides directly to the public website.</p>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/blog" target="_blank" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-all flex items-center gap-2">
                  <Eye size={16} /> View Live Blog
                </Link>
                <button
                  onClick={() => setIsCmsLoggedIn(false)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-all flex items-center gap-2 border border-red-200"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FORM: CREATE NEW POST */}
              <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-lg h-fit space-y-6">
                <h3 className="text-xl font-serif font-black text-[#411548] uppercase flex items-center gap-2 border-b border-gray-100 pb-4">
                  <PlusCircle size={20} className="text-[#411548]" /> Publish New Post
                </h3>

                <form onSubmit={handleCreatePost} className="space-y-5 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block mb-2">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Navigating Grief During Holidays..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#411548] transition-all text-sm font-light"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block mb-2">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#411548] transition-all text-sm font-light"
                    >
                      <option value="Grief Support">Grief Support</option>
                      <option value="Pre-Planning">Pre-Planning</option>
                      <option value="Community">Community</option>
                      <option value="Obituaries">Obituaries & Tributes</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block mb-2">Author Name</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#411548] transition-all text-sm font-light"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block mb-2">Article Excerpt / Summary</label>
                    <textarea
                      rows={3}
                      placeholder="Brief article summary for readers..."
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#411548] transition-all text-sm font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#411548] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <FileEdit size={16} /> Publish Post Now
                  </button>
                </form>
              </div>

              {/* LIST: MANAGED POSTS */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-lg space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-serif font-black text-[#411548] uppercase flex items-center gap-2">
                    <BookOpen size={20} className="text-[#411548]" /> Managed Articles ({blogPosts.length})
                  </h3>
                  <span className="text-xs text-gray-400 font-light">Sorted by date</span>
                </div>

                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-purple-50/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{post.category}</span>
                          <span className="text-[10px] text-gray-300">&bull; {post.date}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">{post.title}</h4>
                        <p className="text-gray-500 text-xs font-light max-w-xl">{post.excerpt}</p>
                        <p className="text-[10px] text-gray-400 font-medium">By {post.author}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => togglePostStatus(post.id)}
                          className="bg-white hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-700 transition-all"
                        >
                          {post.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="bg-red-50 hover:bg-red-100 border border-red-200 p-2.5 rounded-xl text-red-600 transition-all"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* SECTION: LOGIN FORM (UNAUTHENTICATED) */
        <section className="py-6 px-4 -mt-4 pb-16">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Four Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-50 p-1.5 m-3 rounded-[1.5rem] border border-gray-100 gap-1">
                <button
                  onClick={() => setActiveTab('member')}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-[1.2rem] font-black text-[10px] uppercase tracking-wider transition-all ${
                    activeTab === 'member' 
                      ? 'bg-[#411548] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <UserCheck size={14} /> Member
                </button>
                <button
                  onClick={() => setActiveTab('cms')}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-[1.2rem] font-black text-[10px] uppercase tracking-wider transition-all ${
                    activeTab === 'cms' 
                      ? 'bg-[#411548] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <FileEdit size={14} /> CMS
                </button>
                <button
                  onClick={() => setActiveTab('vendor')}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-[1.2rem] font-black text-[10px] uppercase tracking-wider transition-all ${
                    activeTab === 'vendor' 
                      ? 'bg-[#411548] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Store size={14} /> Vendor
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-[1.2rem] font-black text-[10px] uppercase tracking-wider transition-all ${
                    activeTab === 'admin' 
                      ? 'bg-[#411548] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <ShieldCheck size={14} /> Admin
                </button>
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'member' && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-[#411548] leading-relaxed flex items-center justify-between gap-4">
                    <div>
                      <strong className="font-serif font-black text-sm block mb-0.5">Registered Member Portal</strong>
                      Sign in to submit obituaries, post condolences, or track memorial services.
                    </div>
                    <Link to="/register" className="shrink-0 bg-[#411548] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-1">
                      <UserPlus size={12} /> Register
                    </Link>
                  </div>
                )}
                {activeTab === 'cms' && (
                  <div className="mb-8 p-5 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-[#411548] leading-relaxed">
                    <strong className="font-serif font-black text-sm block mb-1">Blogging & Content CMS Login</strong>
                    Authorized access for editorial staff, grief counselors, and obituary publishers to write, edit, and publish content.
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                  {activeTab === 'cms' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548]/60 ml-2">CMS Editorial Role</label>
                      <select
                        value={cmsRole}
                        onChange={(e: any) => setCmsRole(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[1.8rem] px-6 py-4 outline-none focus:bg-white focus:border-[#411548] transition-all text-xs font-bold text-gray-700"
                      >
                        <option value="editor">Senior Content Editor</option>
                        <option value="author">Staff Writer / Grief Counselor</option>
                        <option value="publisher">Obituary & Tributes Manager</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548]/60 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={activeTab === 'cms' ? 'editor@middletonfunerals.com' : 'name@example.com'}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[1.8rem] pl-16 pr-6 py-4 outline-none focus:bg-white focus:border-[#411548] transition-all font-light text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548]/60">Password</label>
                      <button type="button" className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#411548] transition-colors">Forgot?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-[1.8rem] pl-16 pr-6 py-4 outline-none focus:bg-white focus:border-[#411548] transition-all font-light text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#411548] text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    {activeTab === 'cms' ? 'Sign In to Blogging CMS' : 'Secure Sign In'} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>

                {activeTab === 'cms' && (
                  <div className="mt-8 pt-8 border-t border-gray-100 text-center space-y-4">
                    <p className="text-gray-500 text-xs font-light">Testing the Blogging CMS?</p>
                    <button
                      onClick={handleDemoCmsLogin}
                      className="w-full bg-purple-50 hover:bg-purple-100 text-[#411548] py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 border border-purple-200"
                    >
                      <CheckCircle2 size={16} /> Demo Quick Sign-In as CMS Editor
                    </button>
                  </div>
                )}

                {activeTab === 'vendor' && (
                  <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-xs font-light mb-4">Not a registered vendor yet?</p>
                    <Link
                      to="/sell-with-us"
                      className="inline-flex items-center gap-2 text-[#411548] font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Apply for Partnership <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            <p className="text-center mt-12 text-gray-300 text-[10px] font-bold uppercase tracking-[0.4em]">
              Middleton Protective Services &bullet; Established 2026
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
