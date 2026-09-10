import React, { useState } from 'react';
import { 
  FileText, Activity, Globe, Search, Share2, TrendingUp, Plus, 
  ArrowUp, ArrowUpRight, Eye, PenTool
} from 'lucide-react';
import { BlogPostItem, BlogCategory, BeneficiaryRecord, Vacancy } from '../../lib/blogStore';

interface Props {
  posts: BlogPostItem[];
  categories: BlogCategory[];
  beneficiaries: BeneficiaryRecord[];
  vacancies: Vacancy[];
  onNavigate: (nav: any) => void;
  onQuickAddPost: (title: string, cat: string, excerpt: string) => void;
}

export default function CmsDashboardOverview({
  posts,
  categories,
  beneficiaries,
  vacancies,
  onNavigate,
  onQuickAddPost
}: Props) {
  const [quickPublishTitle, setQuickPublishTitle] = useState('');
  const [quickPublishCategory, setQuickPublishCategory] = useState(categories[0]?.name || 'Pre-Planning Guidance');

  const handleQuickPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPublishTitle.trim()) return;
    onQuickAddPost(
      quickPublishTitle.trim(),
      quickPublishCategory,
      `${quickPublishTitle.trim()} - Essential guidance and insights for families.`
    );
    setQuickPublishTitle('');
  };

  const topPerformingArticles = [...posts]
    .filter(p => p.status !== 'Trash')
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* TOP ROW: 4 TRAFFIC & PERFORMANCE KPI CARDS DIRECTLY FROM ATTACHED DESIGN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Bounce Rate */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs border-t-4 border-t-[#C5A059] space-y-3 relative overflow-hidden group hover:border-[#C5A059]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bounce Rate</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#411548]">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">28.4%</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-1">
              <TrendingUp className="w-3.5 h-3.5 rotate-180" />
              <span>-2.1% exit reduction</span>
            </div>
          </div>
          <svg className="w-full h-8 stroke-emerald-600 fill-emerald-50/30" viewBox="0 0 100 25">
            <path d="M0,8 Q25,18 50,12 T100,22 L100,25 L0,25 Z" strokeWidth="2" />
          </svg>
        </div>

        {/* 2. Direct Visits */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs border-t-4 border-t-[#411548] space-y-3 relative overflow-hidden group hover:border-[#411548]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Direct Visits</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#411548]">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">14,850</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#411548] mt-1">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>34% overall traffic</span>
            </div>
          </div>
          <svg className="w-full h-8 stroke-[#411548] fill-purple-50/40" viewBox="0 0 100 25">
            <path d="M0,20 Q15,5 30,15 T60,8 T90,18 T100,5 L100,25 L0,25 Z" strokeWidth="2" />
          </svg>
        </div>

        {/* 3. Organic Search */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs border-t-4 border-t-[#C5A059] space-y-3 relative overflow-hidden group hover:border-[#C5A059]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Organic Search</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#C5A059]">
              <Search className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">28,420</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C5A059] mt-1">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>52% search engine traffic</span>
            </div>
          </div>
          <svg className="w-full h-8 stroke-[#C5A059] fill-amber-50/40" viewBox="0 0 100 25">
            <path d="M0,18 Q20,22 40,10 T70,12 T100,3 L100,25 L0,25 Z" strokeWidth="2" />
          </svg>
        </div>

        {/* 4. Social Media */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs border-t-4 border-t-purple-600 space-y-3 relative overflow-hidden group hover:border-purple-600/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Social Media</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">11,290</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 mt-1">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>14% social referral traffic</span>
            </div>
          </div>
          <svg className="w-full h-8 stroke-purple-600 fill-purple-50/40" viewBox="0 0 100 25">
            <path d="M0,15 Q30,18 60,12 T100,8 L100,25 L0,25 Z" strokeWidth="2" />
          </svg>
        </div>

      </div>

      {/* MAIN CONTENT GRID: TOP PERFORMING ARTICLES & QUICK PUBLISH STUDIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Top Performing Articles (Spans 7 cols on lg) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#411548]" />
                <h3 className="font-extrabold text-sm text-gray-900">Top Performing Articles</h3>
              </div>
              <button 
                onClick={() => onNavigate('articles')} 
                className="text-xs font-bold text-[#C5A059] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View All Posts</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topPerformingArticles.map((art, idx) => (
                <div key={art.id} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200">
                  <span className={`text-xs font-black w-5 shrink-0 text-center ${idx === 0 ? 'text-[#C5A059]' : 'text-gray-400'}`}>#{idx + 1}</span>
                  <img src={art.image} alt={art.title} className="w-11 h-11 rounded-xl object-cover shrink-0 border border-gray-200 shadow-2xs" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-gray-900 line-clamp-1 leading-snug">{art.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{art.date} • <span className="text-[#411548] font-bold">{art.category}</span></p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-600 shrink-0 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{(art.views || 0) > 999 ? `${((art.views || 0) / 1000).toFixed(1)}K` : (art.views || 0)}</span>
                  </div>
                </div>
              ))}
              {topPerformingArticles.length === 0 && (
                <p className="text-xs text-gray-400 italic py-6 text-center">No active articles available.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Showing top 5 published stories</span>
            <button 
              onClick={() => onNavigate('analytics')} 
              className="text-[#411548] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
            </button>
          </div>
        </div>

        {/* 2. Quick Article Publisher Box (Spans 5 cols on lg) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-extrabold text-sm text-gray-900">Quick Article Publisher</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-[#C5A059]/15 text-[#411548] text-[10px] font-black uppercase tracking-wider rounded-md">
                Express Studio
              </span>
            </div>

            <form onSubmit={handleQuickPublish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Article Title</label>
                <input 
                  type="text" 
                  value={quickPublishTitle}
                  onChange={(e) => setQuickPublishTitle(e.target.value)}
                  placeholder="e.g., Guide to Woodland Eco-Burial and Pre-Planning..." 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:ring-2 focus:ring-[#C5A059] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Primary Category</label>
                <select 
                  value={quickPublishCategory}
                  onChange={(e) => setQuickPublishCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:ring-2 focus:ring-[#C5A059] transition-all cursor-pointer"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#411548] hover:bg-[#2e0933] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all border-b-2 border-b-[#C5A059] group"
              >
                <Plus className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span>Create &amp; Open Editor</span>
              </button>
            </form>
          </div>

          {/* Quick Shortcut Buttons */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
            <button 
              onClick={() => onNavigate('add_post')}
              className="py-2 px-3 bg-gray-50 hover:bg-purple-50 hover:text-[#411548] border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 transition-all cursor-pointer"
            >
              Full Article Studio
            </button>
            <button 
              onClick={() => {
                setQuickPublishTitle('A Gentle Guide to Honoring Your Loved One with Dignity');
              }}
              className="py-2 px-3 bg-gray-50 hover:bg-amber-50 hover:text-[#C5A059] border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 transition-all cursor-pointer"
            >
              Load Quick Template
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
