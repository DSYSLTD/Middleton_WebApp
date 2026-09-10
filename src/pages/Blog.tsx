import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight, Search, Tag, Filter, X } from 'lucide-react';
import { blogStore, BlogPostItem, BlogAuthor } from '../lib/blogStore';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [createdCategories, setCreatedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadData = () => {
      const allPosts = blogStore.getPosts();
      setPosts(allPosts.filter(p => p.status === 'Published'));
      setAuthors(blogStore.getAuthors());
      const cats = blogStore.getCategories();
      setCreatedCategories(cats.map(c => c.name));
    };

    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('middleton_cms_posts_updated', handleUpdate);
    window.addEventListener('middleton_cms_categories_updated', handleUpdate);
    return () => {
      window.removeEventListener('middleton_cms_posts_updated', handleUpdate);
      window.removeEventListener('middleton_cms_categories_updated', handleUpdate);
    };
  }, []);

  const categories = ['All', ...createdCategories];

  useEffect(() => {
    if (selectedCategory !== 'All' && createdCategories.length > 0 && !createdCategories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [createdCategories, selectedCategory]);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return posts.length;
    return posts.filter((p) => p.category === cat).length;
  };

  const filteredArticles = posts.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      !search ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (article.authorName && article.authorName.toLowerCase().includes(search.toLowerCase())) ||
      (article.category && article.category.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getAuthorDetails = (article: BlogPostItem) => {
    const matched = authors.find(
      (a) => a.id === article.authorId || a.name.toLowerCase() === article.authorName.toLowerCase()
    );
    return {
      name: article.authorName || 'Middleton Care Team',
      role: matched?.role || article.authorRole || 'Funeral Director & Advisor',
      avatar: matched?.avatar || article.authorAvatar,
    };
  };

  return (
    <div className="min-h-screen bg-[#faf4fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero Header */}
        <div className="bg-[#411548] text-white p-8 md:p-14 rounded-3xl space-y-4 shadow-xl relative overflow-hidden border border-[#C5A059]/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-black uppercase tracking-widest text-[#C5A059] bg-white/10 px-4 py-1.5 rounded-full border border-[#C5A059]/30 inline-block shadow-sm">
            Insights, Guidance & Memorial Traditions
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight uppercase leading-tight">
            Middleton Memorial Journal
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl font-light leading-relaxed">
            Thoughtful articles on grief healing, funeral pre-planning, celebration of life ideas, and practical estate guidance from our compassionate directors.
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, authors, topics..."
                className="w-full pl-10 pr-8 py-2.5 text-xs font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#411548] focus:outline-none transition-all bg-gray-50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 w-full md:w-auto justify-between md:justify-end">
              <span className="flex items-center gap-1.5 text-gray-700">
                <Filter className="w-3.5 h-3.5 text-[#411548]" />
                Showing <span className="text-[#411548] font-black">{filteredArticles.length}</span> of {posts.length} articles
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#411548] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#C5A059] text-[#411548]'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const authorInfo = getAuthorDetails(article);
              return (
                <article
                  key={article.id || article.slug}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                >
                  {/* Article Image */}
                  {article.image && (
                    <div className="h-48 w-full overflow-hidden relative bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[#411548] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black border border-[#411548]/20 shadow-sm flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#C5A059]" /> {article.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> {article.date}
                        </span>
                        {article.readTime && (
                          <span className="text-[11px] text-[#411548] font-bold">
                            {article.readTime}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-serif font-black text-gray-900 leading-snug line-clamp-2 group-hover:text-[#411548] transition-colors mb-2">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h2>

                      <p className="text-xs text-gray-600 line-clamp-3 font-light leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Author Section */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {authorInfo.avatar ? (
                          <img
                            src={authorInfo.avatar}
                            alt={authorInfo.name}
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 rounded-full object-cover border border-[#411548]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#411548]/10 text-[#411548] flex items-center justify-center font-bold text-xs">
                            <User className="w-4 h-4 text-[#C5A059]" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-serif font-black text-gray-900 leading-tight">
                            {authorInfo.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-light truncate max-w-[130px]">
                            {authorInfo.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="w-full py-3 bg-[#411548] hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-14 h-14 rounded-full bg-[#411548]/10 text-[#411548] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-serif font-black text-[#411548]">No Articles Found</h3>
            <p className="text-xs text-gray-600 font-light">
              No memorial articles match category "<span className="font-bold text-gray-900">{selectedCategory}</span>"
              {search && <> and search query "<span className="font-bold text-gray-900">{search}</span>"</>}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearch('');
              }}
              className="px-6 py-3 bg-[#411548] text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-black transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
