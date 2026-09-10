import React, { useState, useMemo } from 'react';
import { 
  FileText, Plus, Search, Edit3, Trash2, ExternalLink, 
  Layers, LayoutGrid, RefreshCw, X, Eye, Calendar, User, Tag,
  CheckCircle2, Clock, Check
} from 'lucide-react';
import { BlogPostItem, BlogCategory, BlogAuthor } from '../../lib/blogStore';

interface Props {
  posts: BlogPostItem[];
  categories: BlogCategory[];
  authors?: BlogAuthor[];
  onOpenNewPost: () => void;
  onOpenEditPost: (post: BlogPostItem) => void;
  onTrashPost: (id: string) => void;
  onRestorePost: (id: string) => void;
  onDeletePermanent: (id: string) => void;
}

export default function CmsPosts({
  posts,
  categories,
  authors = [],
  onOpenNewPost,
  onOpenEditPost,
  onTrashPost,
  onRestorePost,
  onDeletePermanent
}: Props) {
  const [postFilterStatus, setPostFilterStatus] = useState<'All' | 'Published' | 'Draft' | 'Scheduled' | 'Archived' | 'Trash'>('All');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('All');
  const [articleAuthorFilter, setArticleAuthorFilter] = useState('All');
  const [articleTagFilter, setArticleTagFilter] = useState('All');
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [articleLayoutType, setArticleLayoutType] = useState<'table' | 'grid'>('table');
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);
  const [previewPost, setPreviewPost] = useState<BlogPostItem | null>(null);

  // All unique tags across posts
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => {
      p.tags?.forEach(t => set.add(t));
    });
    return Array.from(set);
  }, [posts]);

  // All unique authors across posts
  const allAuthors = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => {
      if (p.authorName) set.add(p.authorName);
    });
    return Array.from(set);
  }, [posts]);

  const filteredPostsList = useMemo(() => {
    return posts.filter(p => {
      const matchesStatus = postFilterStatus === 'All' 
        ? p.status !== 'Trash' 
        : p.status === postFilterStatus;
      
      const q = postSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.authorName && p.authorName.toLowerCase().includes(q));

      const matchesCategory = articleCategoryFilter === 'All' || p.category === articleCategoryFilter;
      const matchesAuthor = articleAuthorFilter === 'All' || p.authorName === articleAuthorFilter;
      const matchesTag = articleTagFilter === 'All' || (p.tags && p.tags.includes(articleTagFilter));

      return matchesStatus && matchesSearch && matchesCategory && matchesAuthor && matchesTag;
    });
  }, [posts, postFilterStatus, postSearchQuery, articleCategoryFilter, articleAuthorFilter, articleTagFilter]);

  const publishedCount = posts.filter(p => p.status === 'Published').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP HEADER BANNER DIRECTLY FROM ATTACHED DESIGN */}
      <div className="bg-gradient-to-r from-[#411548] via-[#2f0d34] to-[#411548] p-6 md:p-8 rounded-2xl border border-[#C5A059]/30 text-white shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#C5A059] shrink-0" />
            <span>ARTICLE MANAGEMENT MODULE</span>
          </h3>
          <span className="px-3.5 py-1.5 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 rounded-full text-xs font-black shadow-2xs">
            {publishedCount} Published
          </span>
        </div>

        <p className="text-xs md:text-sm text-gray-200 font-medium leading-relaxed max-w-4xl">
          Browse, filter, edit, and organize all published and draft articles across your website.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenNewPost}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08b43] text-[#411548] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> + New Article
          </button>
        </div>
      </div>

      {/* 2. ARTICLES TABLE & FILTERS CONTROL BAR */}
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap bg-gray-100 p-1 rounded-xl gap-1">
              {(['All', 'Published', 'Draft', 'Scheduled', 'Archived', 'Trash'] as const).map(st => {
                const count = posts.filter(p => st === 'All' ? p.status !== 'Trash' : p.status === st).length;
                return (
                  <button
                    key={st}
                    onClick={() => setPostFilterStatus(st)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                      postFilterStatus === st ? 'bg-[#411548] text-white shadow-xs' : 'text-gray-500 hover:text-[#411548]'
                    }`}
                  >
                    {st} ({count})
                  </button>
                );
              })}
            </div>

            {/* Layout Toggle & Search Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={postSearchQuery}
                  onChange={(e) => setPostSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="flex bg-gray-100 p-1 rounded-xl gap-1 shrink-0">
                <button
                  onClick={() => setArticleLayoutType('table')}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${articleLayoutType === 'table' ? 'bg-white text-[#411548] shadow-2xs' : 'text-gray-400'}`}
                  title="Table View"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setArticleLayoutType('grid')}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${articleLayoutType === 'grid' ? 'bg-white text-[#411548] shadow-2xs' : 'text-gray-400'}`}
                  title="Grid Cards View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Filters Dropdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
            <div>
              <label className="block text-[10px] uppercase text-gray-400 font-black mb-1">Category</label>
              <select
                value={articleCategoryFilter}
                onChange={(e) => setArticleCategoryFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-gray-400 font-black mb-1">Author</label>
              <select
                value={articleAuthorFilter}
                onChange={(e) => setArticleAuthorFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="All">All Authors</option>
                {allAuthors.map(authName => (
                  <option key={authName} value={authName}>{authName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-gray-400 font-black mb-1">Tags</label>
              <select
                value={articleTagFilter}
                onChange={(e) => setArticleTagFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="All">All Tags</option>
                {allTags.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Floating Bar */}
        {selectedArticleIds.length > 0 && (
          <div className="bg-[#411548] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span className="text-xs font-black uppercase tracking-wider text-[#C5A059]">
              {selectedArticleIds.length} Article{selectedArticleIds.length > 1 ? 's' : ''} Selected
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  selectedArticleIds.forEach(id => onRestorePost(id));
                  setSelectedArticleIds([]);
                }}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold cursor-pointer"
              >
                Publish Selected
              </button>
              <button 
                onClick={() => {
                  selectedArticleIds.forEach(id => onTrashPost(id));
                  setSelectedArticleIds([]);
                }}
                className="px-3 py-1.5 bg-red-800 hover:bg-red-700 rounded-lg text-xs font-bold cursor-pointer"
              >
                Move to Trash
              </button>
              <button 
                onClick={() => setSelectedArticleIds([])}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold cursor-pointer"
              >
                Deselect All
              </button>
            </div>
          </div>
        )}

        {/* TABLE VIEW */}
        {articleLayoutType === 'table' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    <th className="py-3.5 px-4 w-10">
                      <input 
                        type="checkbox"
                        checked={selectedArticleIds.length === filteredPostsList.length && filteredPostsList.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedArticleIds(filteredPostsList.map(p => p.id));
                          } else {
                            setSelectedArticleIds([]);
                          }
                        }}
                        className="rounded text-[#411548] focus:ring-[#411548]"
                      />
                    </th>
                    <th className="py-3 px-3">Article Title</th>
                    <th className="py-3 px-3">Author</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold">
                  {filteredPostsList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400">
                        No articles found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPostsList.map((p) => {
                      const isSelected = selectedArticleIds.includes(p.id);
                      return (
                        <tr key={p.id} className={`hover:bg-gray-50/80 transition-colors ${isSelected ? 'bg-purple-50/40' : ''}`}>
                          <td className="py-3 px-3">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedArticleIds([...selectedArticleIds, p.id]);
                                } else {
                                  setSelectedArticleIds(selectedArticleIds.filter(id => id !== p.id));
                                }
                              }}
                              className="rounded text-[#411548] focus:ring-[#411548]"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <img src={p.image} alt={p.title} className="w-10 h-8 rounded-lg object-cover border border-gray-200 shrink-0" />
                              <div className="min-w-0">
                                <h4 className="text-xs font-black text-gray-900 line-clamp-1">{p.title}</h4>
                                <span className="text-[10px] text-gray-400 font-normal">{p.readTime || '3 min read'} • {p.slug}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{p.authorName}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-lg text-[10px] font-bold">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                              p.status === 'Published' ? 'bg-emerald-100 text-emerald-800' :
                              p.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                              p.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-500 font-normal whitespace-nowrap">{p.date}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {p.status !== 'Trash' ? (
                                <>
                                  <button 
                                    onClick={() => onOpenEditPost(p)}
                                    title="Edit Article Studio"
                                    className="p-1.5 bg-gray-100 hover:bg-[#411548] hover:text-white rounded-lg text-gray-600 transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => setPreviewPost(p)}
                                    title="Quick Preview"
                                    className="p-1.5 bg-gray-100 hover:bg-[#C5A059] hover:text-[#411548] rounded-lg text-gray-600 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <a 
                                    href={`/blog/${p.slug}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    title="View Live"
                                    className="p-1.5 bg-gray-100 hover:bg-purple-700 hover:text-white rounded-lg text-gray-600 transition-colors cursor-pointer"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <button 
                                    onClick={() => onTrashPost(p.id)}
                                    title="Move to Trash"
                                    className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg text-red-600 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => onRestorePost(p.id)}
                                    title="Restore"
                                    className="p-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-lg text-emerald-600 transition-colors cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => onDeletePermanent(p.id)}
                                    title="Delete Permanently"
                                    className="p-1.5 bg-red-100 hover:bg-red-700 hover:text-white rounded-lg text-red-700 transition-colors cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {articleLayoutType === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPostsList.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-[#411548] text-[#C5A059] text-[9px] font-black uppercase rounded-lg shadow-xs">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                      p.status === 'Published' ? 'bg-emerald-600 text-white' :
                      p.status === 'Draft' ? 'bg-amber-500 text-white' :
                      p.status === 'Scheduled' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-black text-gray-900 line-clamp-2">{p.title}</h4>
                    <p className="text-xs font-medium text-gray-500 line-clamp-2 mt-1">{p.excerpt}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold text-[11px] truncate max-w-[100px]">{p.authorName}</span>
                    <div className="flex items-center gap-1.5">
                      {p.status !== 'Trash' ? (
                        <>
                          <button 
                            onClick={() => onOpenEditPost(p)}
                            className="px-2.5 py-1 bg-[#411548] text-white text-[10px] font-extrabold rounded-lg uppercase hover:bg-[#2c0a32] cursor-pointer"
                            title="Edit Article"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => setPreviewPost(p)}
                            className="p-1 bg-gray-100 hover:bg-[#C5A059] hover:text-[#411548] rounded-lg text-gray-600 transition-colors cursor-pointer"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a 
                            href={`/blog/${p.slug}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-1 bg-gray-100 hover:bg-purple-700 hover:text-white rounded-lg text-gray-600 transition-colors cursor-pointer"
                            title="View Live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button 
                            onClick={() => onTrashPost(p.id)}
                            className="p-1 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg text-red-600 transition-colors cursor-pointer"
                            title="Move to Trash"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => onRestorePost(p.id)}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-[10px] font-bold rounded-lg cursor-pointer"
                            title="Restore"
                          >
                            Restore
                          </button>
                          <button 
                            onClick={() => onDeletePermanent(p.id)}
                            className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-700 hover:text-white text-[10px] font-bold rounded-lg cursor-pointer"
                            title="Delete Permanently"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500">
          <span>Showing 1 - {filteredPostsList.length} of {posts.length} articles</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#411548] text-white rounded-lg font-black">1</button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">2</button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">Next</button>
          </div>
        </div>

      </div>

      {/* ARTICLE LIVE PREVIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
            <div className="p-4 bg-[#411548] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span className="font-black text-xs uppercase tracking-wider">Live Reader Article Preview</span>
              </div>
              <button 
                onClick={() => setPreviewPost(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#C5A059]">
                <span>{previewPost.category}</span>
                <span>•</span>
                <span className="text-gray-400">Preview Mode</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-serif font-black text-[#411548] leading-tight">
                {previewPost.title}
              </h1>

              <div className="flex items-center gap-4 py-3 border-y border-gray-100 text-xs font-bold text-gray-500">
                <span>Author: {previewPost.authorName || 'Editorial Team'}</span>
                <span>•</span>
                <span>{previewPost.date}</span>
              </div>

              <img 
                src={previewPost.image} 
                alt="Cover Preview" 
                className="w-full max-h-72 object-cover rounded-2xl shadow-xs border border-gray-100" 
              />

              <p className="text-sm font-semibold text-gray-700 italic bg-gray-50 p-4 rounded-xl border-l-4 border-[#411548]">
                {previewPost.excerpt}
              </p>

              <div className="text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                {previewPost.content || previewPost.excerpt}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setPreviewPost(null)}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  setPreviewPost(null);
                  onOpenEditPost(previewPost);
                }}
                className="px-6 py-2 bg-[#411548] text-[#C5A059] rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
              >
                Open in Full Editor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
