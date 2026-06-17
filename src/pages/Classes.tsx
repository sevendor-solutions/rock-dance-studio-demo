import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Award, Monitor, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { db } from '../data/db';
import { IClass, IEvent } from '../types';

export const Classes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStyleFilter = searchParams.get('style') || '';

  const [classes, setClasses] = useState<IClass[]>([]);
  const [workshops, setWorkshops] = useState<IEvent[]>([]);

  // Filters state
  const [styleFilter, setStyleFilter] = useState(initialStyleFilter);
  const [levelFilter, setLevelFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Styles list
  const stylesList = [
    'Hip-Hop',
    'Bollywood Dance',
    'Contemporary',
    'Classical Dance',
    'Freestyle',
    'Kids Dance',
    'Fitness Dance'
  ];

  useEffect(() => {
    // Sync style filter with URL params
    const styleParam = searchParams.get('style');
    if (styleParam !== null) {
      setStyleFilter(styleParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setClasses(db.getClasses());
    // Filter events to find workshops and masterclasses
    const events = db.getEvents();
    setWorkshops(events.filter(e => e.category === 'Workshop' || e.category === 'Masterclass'));
  }, []);

  const handleStyleChange = (style: string) => {
    setStyleFilter(style);
    if (style) {
      setSearchParams({ style });
    } else {
      searchParams.delete('style');
      setSearchParams(searchParams);
    }
  };

  const handleResetFilters = () => {
    setStyleFilter('');
    setLevelFilter('');
    setAgeFilter('');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesStyle = styleFilter ? cls.style === styleFilter : true;
    const matchesLevel = levelFilter ? cls.level === levelFilter : true;
    const matchesAge = ageFilter ? cls.ageGroup === ageFilter : true;
    const matchesSearch = searchQuery
      ? cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesStyle && matchesLevel && matchesAge && matchesSearch;
  });

  // Separate regular and online
  const regularClasses = filteredClasses.filter(c => !c.isOnline);
  const onlineClasses = filteredClasses.filter(c => c.isOnline);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Our Dance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Batches</span>
        </h1>
        <p className="text-zinc-400 font-sans text-sm leading-relaxed">
          Choose from weekly regular sessions, short-term expert workshops, or high-definition online classes you can practice from home.
        </p>
      </div>

      {/* FILTER BAR PANEL */}
      <section className="glass-panel p-6 rounded-2xl glow-border-pink mb-16">
        <div className="flex flex-col gap-6">
          {/* Top row: search + reset */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search classes, trainers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-pink transition-colors text-sm font-sans"
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-brand-pink hover:text-white transition-colors flex items-center gap-1 self-end md:self-center"
            >
              Clear All Filters
            </button>
          </div>

          {/* Bottom row: select drop downs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Style Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider font-sans">Dance Style</label>
              <select
                value={styleFilter}
                onChange={e => handleStyleChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-300 focus:outline-none focus:border-brand-pink transition-colors text-sm font-sans"
              >
                <option value="">All Dance Styles</option>
                {stylesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider font-sans">Skill Level</label>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-300 focus:outline-none focus:border-brand-pink transition-colors text-sm font-sans"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            {/* Age Group Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider font-sans">Age Group</label>
              <select
                value={ageFilter}
                onChange={e => setAgeFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-300 focus:outline-none focus:border-brand-pink transition-colors text-sm font-sans"
              >
                <option value="">All Age Groups</option>
                <option value="Kids">Kids (Ages 4-12)</option>
                <option value="Teens">Teens (Ages 13-17)</option>
                <option value="Adults">Adults (Ages 18+)</option>
                <option value="All Ages">All Ages</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* REGULAR CLASSES SECTION */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-pink/10 flex items-center justify-center border border-brand-pink/20">
            <Users className="w-4 h-4 text-brand-pink" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Regular Batches</h2>
        </div>

        {regularClasses.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/5 text-zinc-400 font-sans">
            No regular classes match your filter criteria. Try resetting.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularClasses.map(cls => (
              <motion.div
                key={cls.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel rounded-2xl overflow-hidden glow-border-pink group flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden border-b border-white/5">
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#09090b]/80 border border-white/10 backdrop-blur-md rounded-md text-xs font-semibold text-zinc-300 font-sans">
                    {cls.level}
                  </div>
                  <img
                    src={cls.imageUrl}
                    alt={cls.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-1 font-sans">
                    {cls.style}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{cls.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-sans flex-grow line-clamp-2">
                    {cls.description}
                  </p>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-zinc-500 font-sans">
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-500 tracking-wider">Age Group</span>
                      <span className="text-zinc-300 font-semibold">{cls.ageGroup}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-500 tracking-wider">Schedule</span>
                      <span className="text-zinc-300 font-semibold">{cls.schedule[0].split(' ')[0]}s +</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-500 tracking-wider">Fees</span>
                      <span className="text-brand-pink font-bold">{cls.fees.split(' ')[0]}</span>
                    </div>
                  </div>

                  <Link
                    to={`/classes/${cls.id}`}
                    className="w-full mt-6 py-2.5 bg-white/5 hover:bg-brand-pink hover:text-white border border-white/10 hover:border-brand-pink text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ONLINE CLASSES SECTION */}
      {onlineClasses.length > 0 && (
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20">
              <Monitor className="w-4 h-4 text-brand-purple" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Online Live Academy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {onlineClasses.map(cls => (
              <motion.div
                key={cls.id}
                layout
                className="glass-panel p-6 sm:p-8 rounded-2xl glow-border-purple grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
              >
                <div className="sm:col-span-5 h-44 sm:h-full rounded-xl overflow-hidden border border-white/5">
                  <img
                    src={cls.imageUrl}
                    alt={cls.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-brand-purple/20 border border-brand-purple/30 text-brand-purple rounded-md text-[10px] font-bold uppercase tracking-wider">
                        Online
                      </span>
                      <span className="text-xs text-zinc-400">{cls.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{cls.name}</h3>
                    <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-4 line-clamp-2">
                      {cls.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs border-t border-white/5 pt-4 mb-4 font-sans text-zinc-400">
                    <p className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                      {cls.onlineDetails?.liveSessions}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                      {cls.onlineDetails?.recordedAccess}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-brand-purple font-bold text-lg">{cls.fees}</span>
                    <Link
                      to={`/classes/${cls.id}`}
                      className="px-4 py-2 bg-brand-purple text-white text-xs font-bold uppercase rounded-lg hover:shadow-lg hover:shadow-brand-purple/20 transition-all hover:scale-105"
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* WORKSHOPS SECTION */}
      {workshops.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
              <Calendar className="w-4 h-4 text-brand-cyan" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Short-Term Workshops</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map(w => (
              <motion.div
                key={w.id}
                className="glass-panel p-6 rounded-2xl glow-border-cyan flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              >
                {/* Date stamp */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex flex-col items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-brand-cyan/15 text-white">
                  <span className="text-2xl font-bold font-sans tracking-tight">
                    {new Date(w.date).getDate()}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest font-sans">
                    {new Date(w.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-brand-cyan font-bold uppercase tracking-wider font-sans">
                      {w.category}
                    </span>
                    <span className="text-zinc-600 text-xs">|</span>
                    <span className="text-zinc-400 text-xs font-sans">{w.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
                  <p className="text-zinc-500 text-xs font-sans mb-3 line-clamp-1">{w.venue}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4 font-sans">
                    {w.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-sm font-bold text-white">{w.price}</span>
                    <Link
                      to="/events"
                      className="text-xs font-bold text-brand-cyan hover:text-white transition-colors uppercase tracking-wider"
                    >
                      Book Ticket &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
