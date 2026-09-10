import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, 
  Briefcase, GraduationCap, Award, BookOpen 
} from 'lucide-react';
import { blogStore, BlogAuthor } from '../lib/blogStore';

export default function AuthorProfile() {
  const { authorId } = useParams<{ authorId: string }>();
  const authors = blogStore.getAuthors();
  const allPosts = blogStore.getPosts().filter(p => p.status === 'Published');

  const normalizedId = (authorId || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const matchedAuthor = authors.find(
    a => a.id.toLowerCase() === normalizedId || 
         a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalizedId
  ) || authors[0];

  const authorArticles = allPosts.filter(
    p => p.authorId === matchedAuthor.id || 
         p.authorName.toLowerCase() === matchedAuthor.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#faf4fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-black text-[#411548] hover:text-black uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> Back to Middleton Memorial Journal
          </Link>
        </div>

        {/* Author Header Banner */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden relative">
          <div 
            className="h-44 md:h-56 bg-cover bg-center relative" 
            style={{ backgroundImage: `url(${matchedAuthor.coverPhoto || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#411548]/90 via-black/40 to-transparent" />
            <div className="absolute top-4 right-4 bg-[#411548]/90 backdrop-blur-md text-[#C5A059] px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#C5A059]/40 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Verified Middleton Care Professional
            </div>
          </div>

          <div className="p-6 md:p-8 pt-0 relative -mt-16 md:-mt-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              <img
                src={matchedAuthor.avatar}
                alt={matchedAuthor.name}
                loading="lazy"
                decoding="async"
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-xl bg-gray-100"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl font-serif font-black text-gray-900">{matchedAuthor.name}</h1>
                  <CheckCircle2 className="w-5 h-5 text-[#411548]" />
                </div>
                <p className="text-xs font-black text-[#411548] uppercase tracking-wider">{matchedAuthor.role}</p>
                <p className="text-xs text-gray-500 font-light">Middleton Funeral Services • Twin Cities Metro</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm transition-all"
              >
                Contact Director
              </Link>
            </div>
          </div>
        </div>

        {/* Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Bio & Credentials */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase text-[#411548] tracking-wider border-b border-gray-100 pb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C5A059]" /> About the Director
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">{matchedAuthor.bio}</p>
            </div>

            {matchedAuthor.education && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase text-[#411548] tracking-wider border-b border-gray-100 pb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#C5A059]" /> Qualifications & Licensure
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-[#411548] shrink-0 mt-0.5" />
                    <span className="font-bold">{matchedAuthor.education}</span>
                  </div>
                  {matchedAuthor.experience && (
                    <div className="flex items-start gap-2 text-gray-700">
                      <Briefcase className="w-4 h-4 text-[#411548] shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-600">{matchedAuthor.experience}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {matchedAuthor.expertise && matchedAuthor.expertise.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase text-[#411548] tracking-wider border-b border-gray-100 pb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C5A059]" /> Core Areas of Care
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchedAuthor.expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-[#411548]/5 text-[#411548] rounded-full text-xs font-bold border border-[#411548]/15">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Authored Articles */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-sm font-serif font-black uppercase text-[#411548] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C5A059]" /> Memorial Articles by {matchedAuthor.name}
                </h2>
                <span className="text-xs font-black text-[#411548] bg-[#411548]/5 px-3 py-1 rounded-full border border-[#411548]/20">
                  {authorArticles.length} Published
                </span>
              </div>

              <div className="space-y-4">
                {authorArticles.length === 0 ? (
                  <p className="text-xs text-gray-500 italic py-6 text-center">No articles currently published by this author.</p>
                ) : (
                  authorArticles.map((art) => (
                    <div key={art.id} className="p-4 bg-gray-50 hover:bg-[#411548]/5 rounded-xl border border-gray-200 hover:border-[#411548]/30 transition-all space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#C5A059]">
                        <span>{art.category}</span>
                        <span className="text-gray-400">{art.date}</span>
                      </div>
                      <h3 className="font-serif font-black text-sm text-gray-900 hover:text-[#411548]">
                        <Link to={`/blog/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 font-light">{art.excerpt}</p>
                      <div className="pt-1 flex items-center justify-end">
                        <Link to={`/blog/${art.slug}`} className="text-xs font-black text-[#411548] hover:underline flex items-center gap-1">
                          Read Full Article <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
