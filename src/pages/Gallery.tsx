import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, X, Image as ImageIcon, Video, Star } from 'lucide-react';
import { db } from '../data/db';
import { IGalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<IGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Lightbox / Video Popup state
  const [activeItem, setActiveItem] = useState<IGalleryItem | null>(null);

  const categories = ['All', 'Annual Show', 'Workshops', 'Competitions', 'Reels'];

  useEffect(() => {
    setGalleryItems(db.getGallery());
  }, []);

  // Filter items
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Gallery</span>
        </h1>
        <p className="text-zinc-400 font-sans text-sm leading-relaxed">
          Take a look at our training routines, live stage showcases, championships, and popular social media reels highlights.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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

      {/* MASONRY GRID LAYOUT */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 text-zinc-400 font-sans">
          No media items available in this category.
        </div>
      ) : (
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/5 shadow-md shadow-black/40 group cursor-pointer"
              onClick={() => setActiveItem(item)}
            >
              {/* Media element */}
              <div className="relative">
                {/* Media Indicator Label */}
                <div className="absolute top-4 left-4 z-20 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[9px] uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1">
                  {item.type === 'video' ? (
                    <>
                      <Video className="w-3 h-3 text-brand-pink animate-pulse" />
                      <span>Video</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-brand-cyan" />
                      <span>Photo</span>
                    </>
                  )}
                </div>

                {/* Cover Photo / Preview */}
                <img
                  src={item.type === 'video' ? (item.coverImage || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad') : item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
                />

                {/* Hover overlay with action icons */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-4 text-center p-6">
                  {item.type === 'video' ? (
                    <div className="w-14 h-14 rounded-full bg-brand-pink/20 border border-brand-pink flex items-center justify-center text-brand-pink shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-pulse">
                      <Play className="w-6 h-6 fill-brand-pink ml-1" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <Eye className="w-6 h-6" />
                    </div>
                  )}
                  
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider font-sans">
                      {item.category}
                    </span>
                    <h4 className="text-white font-bold text-sm mt-1">{item.title}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* LIGHTBOX AND VIDEO PREVIEW POPUP */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-brand-pink"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10"
            >
              {activeItem.type === 'photo' ? (
                <div className="flex flex-col items-center">
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain border border-white/10"
                  />
                  <div className="text-center mt-4 font-sans">
                    <span className="text-brand-cyan text-[10px] uppercase font-bold tracking-widest">
                      {activeItem.category}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1">{activeItem.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="relative aspect-video w-full max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <video
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-contain"
                      src={activeItem.url}
                    />
                  </div>
                  <div className="text-center mt-4 font-sans">
                    <span className="text-brand-pink text-[10px] uppercase font-bold tracking-widest">
                      {activeItem.category} Video Reel
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1">{activeItem.title}</h3>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
