import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, MessageCircle, ArrowRight, BookOpen } from 'lucide-react';
import { db } from '../data/db';
import { IBlog } from '../types';

export const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Dance Tips', 'Fitness & Lifestyle', 'Studio News', 'Event Updates'];

  useEffect(() => {
    setBlogs(db.getBlogs());
  }, []);

  // Filter blogs
  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  // Featured blog (usually the first one)
  const featuredBlog = filteredBlogs[0];
  const listBlogs = featuredBlog ? filteredBlogs.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Dance Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Blog</span>
        </h1>
        <p className="text-zinc-400 font-sans text-sm leading-relaxed">
          Stay informed with professional warm-up guides, healthy dancer nutrition plans, academy announcements, and dance history profiles.
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-lg shadow-brand-pink/20'
                : 'bg-white/5 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED POST */}
      {featuredBlog && selectedCategory === 'All' && (
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl glow-border-pink overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image */}
            <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
              <img
                src={featuredBlog.featuredImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink rounded-md text-[10px] font-bold uppercase tracking-wider font-sans inline-block mb-4">
                  Featured: {featuredBlog.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                  <Link to={`/blog/${featuredBlog.id}`} className="hover:text-brand-pink transition-colors">
                    {featuredBlog.title}
                  </Link>
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans line-clamp-3">
                  {featuredBlog.content.split('\n\n')[0].replace(/#|\*/g, '')}
                </p>
              </div>

              {/* Author, date and button */}
              <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-6">
                <div className="flex items-center gap-6 text-xs text-zinc-500 font-sans">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-pink" />
                    <span>{featuredBlog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-pink" />
                    <span>{new Date(featuredBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredBlog.id}`}
                  className="text-xs font-bold uppercase tracking-wider text-brand-pink hover:text-white transition-colors flex items-center gap-1"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* BLOG GRID LIST */}
      <section>
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 text-zinc-400 font-sans">
            No articles published in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* If we are filtering, we show all, else we skip the featured post */}
            {(selectedCategory === 'All' ? listBlogs : filteredBlogs).map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-panel rounded-2xl glow-border-pink overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden border-b border-white/5">
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#09090b]/80 border border-white/10 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider font-sans text-zinc-300">
                    {blog.category}
                  </span>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-brand-pink transition-colors">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-sans line-clamp-3">
                    {blog.content.replace(/#|\*/g, '').split('\n\n')[0]}
                  </p>

                  {/* Footer metadata */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-zinc-500 mt-auto font-sans">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {blog.author.split(' ')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-brand-pink font-bold uppercase tracking-wider flex items-center gap-0.5"
                    >
                      Read &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
