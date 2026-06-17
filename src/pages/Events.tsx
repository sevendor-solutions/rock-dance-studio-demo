import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock, CheckCircle, X, ShieldAlert } from 'lucide-react';
import { db } from '../data/db';
import { IEvent, IGalleryItem } from '../types';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [pastGallery, setPastGallery] = useState<IGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Registration Modal states
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Categories helper
  const categories = ['All', 'Workshop', 'Competition', 'Dance Show', 'Masterclass'];

  useEffect(() => {
    setEvents(db.getEvents());
    // Get gallery items related to events
    const gallery = db.getGallery();
    setPastGallery(gallery.filter(item => item.category === 'Annual Show' || item.category === 'Competitions'));
  }, []);

  const handleRegisterClick = (evt: IEvent) => {
    setSelectedEvent(evt);
    setIsSuccess(false);
    setErrorMsg('');
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegMessage('');
    setIsSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Add lead enquiry
    db.addEnquiry({
      type: 'event',
      name: regName,
      email: regEmail,
      phone: regPhone,
      message: `Event Registration for: ${selectedEvent.title}. Notes: ${regMessage || 'None'}`,
      targetId: selectedEvent.id,
      targetName: selectedEvent.title
    });

    setIsSuccess(true);
    setErrorMsg('');
  };

  // Filter events
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Workshops & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Events</span>
        </h1>
        <p className="text-zinc-400 font-sans text-sm leading-relaxed">
          Stay updated with upcoming dance battles, seasonal choreo workshops, masterclasses with guest choreographers, and annual theater shows.
        </p>
      </div>

      {/* CATEGORY FILTER TABS */}
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
            {cat === 'All' ? 'All Events' : cat + 's'}
          </button>
        ))}
      </div>

      {/* UPCOMING EVENTS LIST */}
      <section className="mb-24 space-y-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 text-zinc-400 font-sans">
            No upcoming events listed in this category. Check back soon!
          </div>
        ) : (
          filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-panel rounded-2xl glow-border-pink overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Event Banner */}
              <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden min-h-[250px] border-b lg:border-b-0 lg:border-r border-white/5">
                <img
                  src={evt.bannerImage}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Content */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink rounded-md text-[10px] font-bold uppercase tracking-wider font-sans">
                      {evt.category}
                    </span>
                    {evt.isActive ? (
                      <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Booking Open
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-xs font-semibold">Sold Out</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{evt.title}</h3>
                  <p className="text-zinc-300 text-sm font-sans leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                {/* Event meta and Register */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-pink" />
                      <span>{new Date(evt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-pink" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
                      <span className="line-clamp-1">{evt.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    <div className="text-left sm:text-right">
                      <span className="block text-[10px] text-zinc-500 uppercase font-sans tracking-wider">Pass Fee</span>
                      <span className="text-brand-pink font-extrabold text-lg">{evt.price}</span>
                    </div>
                    {evt.isActive && (
                      <button
                        onClick={() => handleRegisterClick(evt)}
                        className="btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* PAST EVENTS GALLERY */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-purple mb-3">Throwback</h2>
          <h3 className="text-2xl sm:text-4xl font-bold font-sans">Past Events & Shows</h3>
          <p className="text-zinc-400 text-xs mt-3 font-sans max-w-xl mx-auto">
            Glimpses of outstanding routines, emotional theater performances, and champion trophy collections from previous seasons.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative h-48 rounded-xl overflow-hidden border border-white/5 shadow-md shadow-black/30"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 z-10 transition-colors" />
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 bg-brand-purple text-white text-[9px] font-bold rounded-md font-sans uppercase">
                  {item.category}
                </span>
                <p className="text-white text-xs font-bold truncate mt-1.5">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f0f13] border border-white/10 p-6 sm:p-8 rounded-2xl z-10 shadow-2xl shadow-black font-sans text-sm"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase font-bold text-brand-pink tracking-widest block mb-1">
                Event Pass
              </span>
              <h3 className="text-xl font-bold text-white mb-6 pr-6 line-clamp-1">
                Register: {selectedEvent.title}
              </h3>

              {isSuccess ? (
                <div className="text-center py-6 flex flex-col items-center justify-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-400" />
                  <h4 className="text-xl font-bold text-white">Registration Logged!</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                    Hi **{regName}**, we have reserved your enquiry for the **{selectedEvent.title}** event. We will contact you soon on details regarding passes.
                  </p>
                  <button
                    onClick={handleModalClose}
                    className="btn-primary w-full py-2.5 mt-6"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                  {errorMsg && <p className="text-red-500 font-bold mb-2">{errorMsg}</p>}

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink placeholder-zinc-700 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink placeholder-zinc-700 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink placeholder-zinc-700 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Special Requests / Group Size</label>
                    <textarea
                      rows={3}
                      value={regMessage}
                      onChange={e => setRegMessage(e.target.value)}
                      placeholder="Group booking, promo codes, or questions..."
                      className="w-full px-3.5 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink placeholder-zinc-700 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between font-sans border-t border-white/5">
                    <div>
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Price</span>
                      <span className="text-brand-pink font-bold text-sm">{selectedEvent.price}</span>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary py-2 px-5"
                    >
                      Confirm Registration
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
