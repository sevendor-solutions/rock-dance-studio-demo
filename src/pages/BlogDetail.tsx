import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, MessageCircle, ArrowLeft, Send, Share2, Facebook, Twitter, Link2, Check } from 'lucide-react';
import { db } from '../data/db';
import { IBlog } from '../types';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([]);

  // Share link copied feedback
  const [copied, setCopied] = useState(false);

  // Comment form states
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const foundBlog = db.getBlogs().find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
      
      // Load related posts (same category, excluding current post)
      const allBlogs = db.getBlogs();
      const filtered = allBlogs.filter(b => b.category === foundBlog.category && b.id !== foundBlog.id);
      // Fallback if no matching categories, show other posts
      if (filtered.length > 0) {
        setRelatedPosts(filtered.slice(0, 3));
      } else {
        setRelatedPosts(allBlogs.filter(b => b.id !== foundBlog.id).slice(0, 3));
      }
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) {
      return;
    }

    db.addCommentToBlog(blog.id, {
      name: commentName,
      email: commentEmail,
      comment: commentText
    });

    // Refresh blog state to load new comment
    const updatedBlog = db.getBlogs().find(b => b.id === blog.id);
    if (updatedBlog) {
      setBlog(updatedBlog);
    }

    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  // Simple Markdown-like formatter for blog body
  const renderFormattedContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Check for headings
      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 font-sans">
            {paragraph.replace('### ', '')}
          </h4>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4 font-sans">
            {paragraph.replace('## ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('* **') || paragraph.startsWith('* ')) {
        // List items
        const items = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc pl-6 space-y-2.5 my-4 font-sans text-sm sm:text-base text-zinc-300">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^\*\s*/, '');
              // Check for bold text inside bullet
              if (cleanItem.includes('**')) {
                const parts = cleanItem.split('**');
                return (
                  <li key={itemIdx}>
                    <strong className="text-white">{parts[1]}</strong>
                    {parts[2]}
                  </li>
                );
              }
              return <li key={itemIdx}>{cleanItem}</li>;
            })}
          </ul>
        );
      }
      if (/^\d+\.\s+\*\*/.test(paragraph) || /^\d+\.\s+/.test(paragraph)) {
        // Numbered List items
        const items = paragraph.split('\n');
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2.5 my-4 font-sans text-sm sm:text-base text-zinc-300">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^\d+\.\s*/, '');
              if (cleanItem.includes('**')) {
                const parts = cleanItem.split('**');
                return (
                  <li key={itemIdx}>
                    <strong className="text-white">{parts[1]}</strong>
                    {parts[2]}
                  </li>
                );
              }
              return <li key={itemIdx}>{cleanItem}</li>;
            })}
          </ol>
        );
      }

      // Check for inline bolds in regular paragraph
      if (paragraph.includes('**')) {
        const parts = paragraph.split('**');
        // Simple alternate builder: text, bold, text, bold...
        return (
          <p key={index} className="text-sm sm:text-base leading-relaxed text-zinc-300 font-sans my-4">
            {parts.map((part, partIdx) => 
              partIdx % 2 === 1 ? <strong key={partIdx} className="text-white">{part}</strong> : part
            )}
          </p>
        );
      }

      // Fallback regular paragraph
      return (
        <p key={index} className="text-sm sm:text-base leading-relaxed text-zinc-300 font-sans my-4">
          {paragraph}
        </p>
      );
    });
  };

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-zinc-400">Loading blog post...</p>
      </div>
    );
  }

  const shareText = encodeURIComponent(`Read this amazing dance blog post: "${blog.title}"`);
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Blog */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-brand-pink mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog Listing
      </Link>

      {/* Meta Header */}
      <header className="mb-8">
        <span className="px-3 py-1 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink rounded-md text-xs font-bold uppercase tracking-wider font-sans inline-block mb-4">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-zinc-500 border-y border-white/5 py-4 font-sans">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-pink" />
            <span className="text-zinc-300">{blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-pink" />
            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <MessageCircle className="w-4 h-4 text-brand-pink" />
            <span>{blog.comments.length} Comments</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl shadow-black/60 mb-12">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none mb-12">
        {renderFormattedContent(blog.content)}
      </article>

      {/* Tags & Sharing */}
      <div className="border-t border-white/5 pt-8 mb-16 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-medium text-zinc-400 font-sans"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-sans font-bold flex items-center gap-1">
            <Share2 className="w-4 h-4 text-brand-pink animate-pulse" />
            Share:
          </span>
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-[#3b5998] hover:text-[#3b5998] flex items-center justify-center transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-[#1da1f2] hover:text-[#1da1f2] flex items-center justify-center transition-colors"
            title="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-[#25d366] hover:text-[#25d366] flex items-center justify-center transition-colors"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-colors focus:outline-none"
            title="Copy Link to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <section className="border-t border-white/5 pt-12 mb-16 font-sans">
        <h3 className="text-xl font-bold text-white mb-8">
          Discussion ({blog.comments.length})
        </h3>

        {/* Comment list */}
        {blog.comments.length === 0 ? (
          <p className="text-zinc-500 text-sm font-sans mb-8">No comments yet. Start the conversation!</p>
        ) : (
          <div className="space-y-6 mb-12">
            {blog.comments.map(c => (
              <div key={c.id} className="p-5 rounded-xl bg-white/5 border border-white/5 flex gap-4">
                {/* Dummy Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-300">{c.name}</span>
                    <span>{new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment form */}
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <h4 className="text-lg font-bold text-white mb-4">Leave a Comment</h4>
          
          {isSuccess && (
            <p className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg mb-4 font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Comment posted successfully!
            </p>
          )}

          <form onSubmit={handleAddComment} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Name *</label>
                <input
                  type="text"
                  required
                  value={commentName}
                  onChange={e => setCommentName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Email (Private) *</label>
                <input
                  type="email"
                  required
                  value={commentEmail}
                  onChange={e => setCommentEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Comment *</label>
              <textarea
                rows={4}
                required
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary py-2.5 px-6"
            >
              Post Comment
            </button>
          </form>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/5 pt-12">
          <h3 className="text-xl font-bold text-white mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <div key={post.id} className="glass-panel rounded-xl overflow-hidden border-white/5 flex flex-col h-full hover:border-brand-pink/30 transition-colors">
                <div className="h-32 overflow-hidden border-b border-white/5 relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h4 className="text-sm font-bold text-white line-clamp-2 hover:text-brand-pink transition-colors mb-4">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h4>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-brand-pink text-xs font-bold uppercase tracking-wider font-sans mt-auto"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
