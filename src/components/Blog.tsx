import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, User, ArrowRight, X, BookOpen, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">Industry Insights</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Industry & Technical Blogs
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-posts-grid">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-[#0f172a] rounded-2xl border border-slate-800/80 overflow-hidden hover:border-sky-500/30 transition-all duration-300 flex flex-col h-full shadow-lg cursor-pointer group"
              id={`blog-card-${post.id}`}
            >
              {/* Image Banner */}
              <div className="relative overflow-hidden aspect-[16/10] bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-[10px] font-mono text-sky-400 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Text body */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-3">
                {/* Meta details */}
                <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-sky-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-sky-400" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base sm:text-lg text-slate-100 group-hover:text-sky-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light line-clamp-3">
                  {post.summary}
                </p>

                {/* Subfooter */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-800/80">
                  <span className="text-xs text-slate-350 font-medium flex items-center gap-1 group-hover:text-sky-400 transition-colors">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    By {post.author.split(' ')[0]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Portal to read a post */}
        <AnimatePresence>
          {activePost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePost(null)}
                className="absolute inset-0 bg-[#090d16]/80 backdrop-blur-sm"
              />

              {/* Bounding main article modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl relative z-10 flex flex-col text-left max-h-[85vh]"
                id="blog-detail-modal"
              >
                {/* Close handle button */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 bg-slate-950/85 p-2 text-slate-340 hover:text-white rounded-full border border-slate-800/50 z-20 transition cursor-pointer hover:bg-slate-850 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Scrollable container for reading */}
                <div className="overflow-y-auto w-full">
                  {/* Photo Banner aspect of the post */}
                  <div className="relative aspect-[21/9] w-full bg-slate-950">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
                  </div>

                  {/* Core contents of article */}
                  <div className="p-6 sm:p-10 space-y-6">
                    {/* Tags and categories row */}
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[10px] bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider font-mono font-semibold">
                        {activePost.category}
                      </span>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-sky-400" />
                          {activePost.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-sky-400" />
                          {activePost.readTime}
                        </span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight text-left">
                      {activePost.title}
                    </h1>

                    {/* Author block citation */}
                    <div className="flex items-center space-x-3 py-3 border-y border-slate-800/80">
                      <div className="p-2 bg-slate-850 rounded-lg text-sky-400">
                        <User className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono text-left">Article authored by</span>
                        <strong className="text-slate-200 text-sm font-semibold block text-left">{activePost.author}</strong>
                      </div>
                    </div>

                    {/* Blog Body content */}
                    <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 font-light whitespace-pre-wrap text-left">
                      {activePost.content}
                    </div>

                    {/* Footer Keywords */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/60">
                      <Tag className="h-3.5 w-3.5 text-slate-500" />
                      {activePost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-800 text-slate-400 border border-slate-800 font-mono px-2.5 py-0.5 rounded-md"
                        >
                          #{tag.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
