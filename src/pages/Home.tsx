import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Play, MessageSquare, Calendar, ChevronLeft, ChevronRight, Star, Users, Award, Trophy, Sparkles } from 'lucide-react';
import { db } from '../data/db';
import { ITestimonial, IEvent, IClass } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Statistics
  const stats = [
    { label: 'Students Trained', value: '5,000+', icon: <Users className="w-6 h-6 text-brand-pink" /> },
    { label: 'Years of Experience', value: '12+', icon: <Sparkles className="w-6 h-6 text-brand-purple" /> },
    { label: 'National Awards', value: '25+', icon: <Trophy className="w-6 h-6 text-brand-cyan" /> },
    { label: 'Workshops Hosted', value: '150+', icon: <Award className="w-6 h-6 text-brand-pink" /> }
  ];

  useEffect(() => {
    setClasses(db.getClasses().slice(0, 4)); // Show top 4 categories on home
    setUpcomingEvents(db.getEvents().slice(0, 3)); // Show top 3 events
    setTestimonials(db.getTestimonials());
  }, []);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(handleNextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  // Categories helper
  const classCategories = [
    { name: 'Hip-Hop', desc: 'Street styles, lock & pop grooves', path: '/classes?style=Hip-Hop', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bollywood', desc: 'High-energy cinematic dance fusion', path: '/classes?style=Bollywood+Dance', image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Contemporary', desc: 'Fluid movement and ballet fusion', path: '/classes?style=Contemporary', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=400&q=80' },
    { name: 'Classical', desc: 'Kathak and Bharatanatyam heritage', path: '/classes?style=Classical+Dance', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#09090b]/60 to-[#09090b] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover scale-105"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-freestyle-in-a-studio-34352-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Flame className="w-4 h-4 text-brand-pink fill-brand-pink animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">New Summer Batches Open</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            Move with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-purple to-brand-cyan">Passion.</span>
            <br />
            Dance with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">Confidence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Unlock your full physical potential at Rock Dance Studio. Professional choreography training, performance certification, and state-of-the-art facilities for all age groups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/classes" className="btn-primary w-full sm:w-auto">
              Join A Class
            </Link>
            <button
              onClick={() => navigate('/contact', { state: { requestTrial: true } })}
              className="btn-secondary w-full sm:w-auto hover:border-brand-purple hover:bg-brand-purple/10"
            >
              <Play className="w-4 h-4 text-brand-purple" fill="currentColor" />
              Book Free Trial
            </button>
            <a
              href="https://wa.me/15552345678?text=Hi%20Rock%20Dance%20Studio!%20I%20have%20an%20enquiry%20regarding%20the%20dance%20batches."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/15 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              WhatsApp Enquiry
            </a>
          </motion.div>
        </div>

        {/* Bottom fading blur */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
      </section>

      {/* 2. QUICK CLASS CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-3">Dance Genres</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-sans">Find Your Rhythm</h3>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto font-sans">
            Explore our diverse collection of dance forms curated for beginners to seasoned stage performers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-96 rounded-2xl overflow-hidden glass-panel glow-border-pink cursor-pointer"
              onClick={() => navigate(cat.path)}
            >
              {/* Card Image */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h4 className="text-2xl font-bold text-white mb-2">{cat.name}</h4>
                <p className="text-zinc-300 text-sm mb-4 leading-relaxed font-sans">{cat.desc}</p>
                <span className="text-brand-pink text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                  Learn More &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-brand-pink transition-colors font-semibold"
          >
            View All Regular, Workshop & Online Classes &rarr;
          </Link>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS */}
      <section className="bg-zinc-950/40 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-purple mb-3">Don't Miss Out</h2>
              <h3 className="text-3xl md:text-5xl font-bold font-sans">Workshops & Events</h3>
            </div>
            <Link
              to="/events"
              className="text-brand-purple hover:text-white transition-colors font-semibold mt-4 md:mt-0"
            >
              View Full Event Calendar &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden glow-border-purple flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-purple rounded-md text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-brand-purple uppercase tracking-wider mb-2">
                    {evt.category}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-3 line-clamp-1">{evt.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                    {evt.description}
                  </p>
                  
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                    <span className="text-white font-semibold text-sm">{evt.price}</span>
                    <Link
                      to="/events"
                      className="text-xs font-bold uppercase tracking-wider text-brand-purple hover:text-white transition-colors"
                    >
                      Book Spot &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel text-center flex flex-col items-center border border-white/5 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{stat.value}</h4>
              <p className="text-zinc-400 text-xs sm:text-sm uppercase tracking-wider font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIAL CAROUSEL */}
      <section className="bg-zinc-950/60 border-t border-white/5 py-24 relative overflow-hidden">
        {/* Glow dots */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3">Feedback</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-sans">Reviews from our Dance Family</h3>
          </div>

          {testimonials.length > 0 && (
            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-center"
                >
                  <div className="flex justify-center mb-6">
                    <img
                      src={testimonials[currentTestimonialIndex].avatar}
                      alt={testimonials[currentTestimonialIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-brand-cyan p-0.5 shadow-lg shadow-black/60"
                    />
                  </div>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl font-sans italic text-zinc-300 leading-relaxed mb-6 max-w-2xl mx-auto">
                    "{testimonials[currentTestimonialIndex].review}"
                  </blockquote>
                  <cite className="not-italic">
                    <span className="block text-white font-semibold text-md">{testimonials[currentTestimonialIndex].name}</span>
                    <span className="block text-brand-cyan text-xs uppercase tracking-wider font-sans font-bold mt-1">
                      {testimonials[currentTestimonialIndex].role}
                    </span>
                  </cite>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <button
                onClick={handlePrevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-6 h-6 text-zinc-400 hover:text-white" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="relative py-28 overflow-hidden">
        {/* Colorful Gradient bg */}
        <div className="absolute inset-0 bg-[#09090b] z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 via-brand-purple/20 to-brand-cyan/20 opacity-60 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Ready to Own the Stage?
            </h3>
            <p className="text-zinc-300 max-w-xl mx-auto font-sans leading-relaxed text-md">
              Whether you want to learn commercial hip-hop, elegant contemporary, or get in shape with Zumba, your dance journey starts today. Sign up for a trial class!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/classes" className="btn-primary w-full sm:w-auto">
                Explore Classes
              </Link>
              <button
                onClick={() => navigate('/contact', { state: { requestTrial: true } })}
                className="btn-secondary w-full sm:w-auto hover:border-brand-pink hover:bg-brand-pink/5"
              >
                Book Free Trial Session
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
