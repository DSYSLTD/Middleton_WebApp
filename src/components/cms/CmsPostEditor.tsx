import React, { useState } from 'react';
import { 
  Save, Eye, ArrowLeft, Plus, Trash2, MoveUp, MoveDown, 
  Image as ImageIcon, Type, MessageSquare, AlertCircle, Quote, Sparkles, X, Check
} from 'lucide-react';
import { BlogPostItem, BlogBlock, BlogCategory, BlogAuthor } from '../../lib/blogStore';

interface Props {
  editingPost: BlogPostItem | null;
  categories: BlogCategory[];
  authors: BlogAuthor[];
  onSave: (post: BlogPostItem) => void;
  onCancel: () => void;
  onShowToast: (msg: string) => void;
}

const PRESET_IMAGES = [
  { label: 'Chapel Sanctuary', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Memorial Dove Crest', url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200' },
  { label: 'White Lilies & Floral', url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Peaceful Nature Memorial', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Candlelight Remembrance', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Family Consultation Suite', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200' },
];

export default function CmsPostEditor({
  editingPost,
  categories,
  authors,
  onSave,
  onCancel,
  onShowToast
}: Props) {
  const [title, setTitle] = useState(editingPost ? editingPost.title : '');
  const [slug, setSlug] = useState(editingPost ? editingPost.slug : '');
  const [excerpt, setExcerpt] = useState(editingPost ? editingPost.excerpt : '');
  const [category, setCategory] = useState(editingPost ? editingPost.category : (categories[0]?.name || 'Bereavement Guidance'));
  const [authorName, setAuthorName] = useState(editingPost ? editingPost.authorName : (authors[0]?.name || 'William Middleton'));
  const [featuredImage, setFeaturedImage] = useState(editingPost ? editingPost.image : PRESET_IMAGES[0].url);
  const [status, setStatus] = useState<'Published' | 'Draft'>(editingPost?.status === 'Draft' ? 'Draft' : 'Published');
  const [readTime, setReadTime] = useState(editingPost ? (editingPost.readTime || '5 min read') : '5 min read');
  const [tags, setTags] = useState<string[]>(editingPost?.tags || ['Memorial Planning', 'Care Support']);
  const [newTagInput, setNewTagInput] = useState('');
  
  // Blocks state
  const [blocks, setBlocks] = useState<BlogBlock[]>(() => {
    if (editingPost?.blocks && editingPost.blocks.length > 0) {
      return editingPost.blocks;
    }
    return [
      { id: 'b-1', type: 'headline', content: 'Compassionate Care When You Need It Most' },
      { id: 'b-2', type: 'text', content: 'At Middleton Funeral Services, we walk beside families with gentle clarity, transparent guidance, and deep reverence for your cherished traditions.' },
      { id: 'b-3', type: 'tip', content: 'Director Tip: Take time to reflect together as a family before choosing a service style. There is never any rush when honoring a beloved life.' }
    ];
  });

  // SEO state
  const [metaTitle, setMetaTitle] = useState(editingPost?.seo?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(editingPost?.seo?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(editingPost?.seo?.focusKeyword || '');

  // Live preview modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Auto-generate slug if new post
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost || !slug) {
      const generated = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  const handleAddBlock = (type: BlogBlock['type']) => {
    const newBlock: BlogBlock = {
      id: `blk-${Date.now()}`,
      type,
      content: type === 'tip' ? 'Director Guidance: ' : type === 'headline' ? 'Section Heading' : 'Enter your compassionate content here...'
    };
    setBlocks([...blocks, newBlock]);
    onShowToast(`Added ${type} block`);
  };

  const handleUpdateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const handleRemoveBlock = (id: string) => {
    if (blocks.length <= 1) {
      onShowToast('Must retain at least one content block');
      return;
    }
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIdx, 0, moved);
    setBlocks(newBlocks);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags([...tags, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSavePost = (publishStatus: 'Published' | 'Draft') => {
    if (!title.trim()) {
      onShowToast('Please provide an article headline');
      return;
    }
    const cleanSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const selectedAuthor = authors.find(a => a.name === authorName) || authors[0];

    const postToSave: BlogPostItem = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      slug: cleanSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || 'A compassionate resource from the directors at Middleton Funeral Services.',
      category,
      tags,
      authorName: selectedAuthor?.name || authorName,
      authorId: selectedAuthor?.id,
      authorAvatar: selectedAuthor?.avatar,
      authorRole: selectedAuthor?.role,
      date: editingPost ? editingPost.date : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime,
      image: featuredImage,
      views: editingPost?.views || 140,
      likes: editingPost?.likes || 12,
      status: publishStatus,
      blocks,
      seo: {
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        focusKeyword: focusKeyword.trim()
      }
    };

    onSave(postToSave);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="bg-[#411548] p-6 rounded-3xl text-white shadow-lg border border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2.5 bg-white/10 hover:bg-white text-white hover:text-[#411548] rounded-full transition-colors cursor-pointer"
            title="Return to Articles"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">
              {editingPost ? 'Edit Memorial Article' : 'Compose New Memorial Article'}
            </h2>
            <p className="text-xs text-white/80 font-light">
              Craft rich educational resources and bereavement guides with our structured block editor.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>
          <button
            type="button"
            onClick={() => handleSavePost('Draft')}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSavePost('Published')}
            className="px-6 py-2.5 bg-[#C5A059] hover:bg-white text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 stroke-[3]" /> Publish Live
          </button>
        </div>
      </div>

      {/* Editor Grid: Main Content Blocks (left 2/3) & Metadata Sidebar (right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Core Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Title & Excerpt */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-gray-600 mb-1.5">Article Headline *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Understanding Green Burials and Natural Memorial Choices"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base font-serif font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#411548] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-600 mb-1.5">Custom URL Slug</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs text-gray-500 font-mono">
                <span>/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                  className="bg-transparent text-gray-900 font-bold focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-600 mb-1.5">Summary Excerpt</label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary displayed on archive index cards and social media shares..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-light text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#411548] outline-none"
              />
            </div>
          </div>

          {/* Block-Based Content Composer */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 gap-3">
              <div>
                <h3 className="font-serif font-black text-lg text-[#411548] uppercase">Structured Article Content</h3>
                <p className="text-xs text-gray-500 font-light">Add formatted headings, reflective paragraphs, quotes, and tip boxes.</p>
              </div>

              {/* Add Block Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddBlock('headline')}
                  className="px-3 py-1.5 bg-[#411548]/10 hover:bg-[#411548] hover:text-white text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Type className="w-3.5 h-3.5" /> + Heading
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('text')}
                  className="px-3 py-1.5 bg-[#411548]/10 hover:bg-[#411548] hover:text-white text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> + Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('tip')}
                  className="px-3 py-1.5 bg-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#411548] text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5" /> + Care Tip
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('quote')}
                  className="px-3 py-1.5 bg-[#411548]/10 hover:bg-[#411548] hover:text-white text-[#411548] rounded-full text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Quote className="w-3.5 h-3.5" /> + Quote
                </button>
              </div>
            </div>

            {/* Blocks List */}
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div 
                  key={block.id} 
                  className="p-5 bg-[#faf4fa]/60 border border-[#411548]/15 rounded-2xl space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-[#411548]/10 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#411548] flex items-center gap-1.5">
                      {block.type === 'headline' && <Type className="w-3 h-3 text-[#C5A059]" />}
                      {block.type === 'text' && <MessageSquare className="w-3 h-3 text-[#411548]" />}
                      {block.type === 'tip' && <AlertCircle className="w-3 h-3 text-[#C5A059]" />}
                      {block.type === 'quote' && <Quote className="w-3 h-3 text-[#411548]" />}
                      Block {index + 1}: {block.type}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-[#411548] disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(index, 'down')}
                        disabled={index === blocks.length - 1}
                        className="p-1 text-gray-400 hover:text-[#411548] disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(block.id)}
                        className="p-1 text-red-400 hover:text-red-700 cursor-pointer ml-2"
                        title="Remove Block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {block.type === 'headline' && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                      placeholder="Enter subheading..."
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl font-serif font-black text-sm text-[#411548] outline-none focus:ring-2 focus:ring-[#411548]"
                    />
                  )}

                  {block.type === 'text' && (
                    <textarea
                      rows={4}
                      value={block.content}
                      onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                      placeholder="Write paragraph content..."
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-light text-gray-800 leading-relaxed outline-none focus:ring-2 focus:ring-[#411548]"
                    />
                  )}

                  {block.type === 'tip' && (
                    <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                      <textarea
                        rows={3}
                        value={block.content}
                        onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                        placeholder="Guidance tip for grieving families..."
                        className="w-full p-2 bg-transparent border-0 text-xs font-bold text-amber-950 outline-none"
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <div className="bg-white p-3 rounded-xl border-l-4 border-l-[#C5A059] border border-gray-200">
                      <textarea
                        rows={2}
                        value={block.content}
                        onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                        placeholder="Inspirational reflection or memorial quote..."
                        className="w-full p-1 bg-transparent border-0 font-serif italic text-xs text-gray-800 outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Metadata, Featured Image, Category, SEO */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-serif font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-2">
              Publishing Controls
            </h4>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Published' | 'Draft')}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none"
              >
                <option value="Published">Published Live</option>
                <option value="Draft">Save as Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Resource Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Author / Director</label>
              <select
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none"
              >
                {authors.map(a => (
                  <option key={a.id} value={a.name}>{a.name} ({a.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Estimated Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-serif font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-2 flex items-center justify-between">
              <span>Featured Cover Photo</span>
              <ImageIcon className="w-4 h-4 text-[#C5A059]" />
            </h4>

            {featuredImage && (
              <div className="h-36 rounded-2xl overflow-hidden border border-gray-200 relative">
                <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 mb-2">Preset Memorial Imagery</p>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFeaturedImage(img.url)}
                    className={`h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      featuredImage === img.url ? 'border-[#411548] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    title={img.label}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <h4 className="font-serif font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-2">
              Topic Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-[#411548]/10 text-[#411548] rounded-full text-[10px] font-bold flex items-center gap-1">
                  #{t}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(t)}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and hit Enter..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
            />
          </div>

          {/* Search Engine Optimization (SEO) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-serif font-black text-sm text-[#411548] uppercase border-b border-gray-100 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A059]" /> SEO & Social Metadata
            </h4>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Page title for search engines...'}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-600 mb-1">Focus Keyword</label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. funeral pre-planning minneapolis"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#411548] text-white text-[10px] font-black uppercase rounded-full">
                  {category}
                </span>
                <span className="text-xs text-gray-400 font-bold">{readTime}</span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {featuredImage && (
              <div className="h-64 rounded-2xl overflow-hidden">
                <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-3">
              <h1 className="font-serif text-2xl md:text-3xl font-black text-[#411548] leading-tight">
                {title || 'Untitled Article'}
              </h1>
              <p className="text-xs text-gray-500 font-medium">By {authorName} • Middleton Funeral Services</p>
              {excerpt && <p className="text-sm text-gray-700 italic border-l-2 border-[#C5A059] pl-3">{excerpt}</p>}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              {blocks.map((b) => (
                <div key={b.id}>
                  {b.type === 'headline' && (
                    <h3 className="font-serif font-black text-lg text-gray-900 mt-4 mb-2">{b.content}</h3>
                  )}
                  {b.type === 'text' && (
                    <p className="text-sm text-gray-700 leading-relaxed font-light">{b.content}</p>
                  )}
                  {b.type === 'tip' && (
                    <div className="p-4 bg-[#faf4fa] border-l-4 border-l-[#411548] rounded-xl text-xs text-gray-800">
                      {b.content}
                    </div>
                  )}
                  {b.type === 'quote' && (
                    <blockquote className="font-serif italic text-base text-[#411548] border-l-4 border-[#C5A059] pl-4 my-2">
                      "{b.content}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-6 py-2.5 bg-[#411548] text-white font-black text-xs uppercase tracking-widest rounded-full cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
