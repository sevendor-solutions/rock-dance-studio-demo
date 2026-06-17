import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Target, Eye, Instagram, Facebook, Youtube, Flame } from 'lucide-react';
import { db } from '../data/db';
import { IInstructor } from '../types';

export const About: React.FC = () => {
  const [instructors, setInstructors] = useState<IInstructor[]>([]);

  useEffect(() => {
    setInstructors(db.getInstructors());
  }, []);

  const timelineItems = [
    { year: '2014', title: 'Studio Founded', desc: 'Rock Dance Studio opened its first room in Brooklyn with just two trainers and 15 students, sharing a unified dream of energetic expression.' },
    { year: '2017', title: 'District Expansion', desc: 'Moved to our current state-of-the-art facility. Expanded to three customized dance floors and launched dedicated kids batches.' },
    { year: '2020', title: 'V-Academy Launch', desc: 'Pivoted during global closures to launch online live classes, keeping our student family fit and connected from home.' },
    { year: '2023', title: 'National Champions', desc: 'Our hip-hop mega-crew took first place at the National Street Battle. We also launched guest masterclasses with overseas choreographers.' },
    { year: '2026', title: 'Igniting the Future', desc: 'Now training over 5,000 active students. Continuing to break barriers and push creative storytelling boundaries.' }
  ];

  const accomplishments = [
    { title: 'Best Dance Academy', organization: 'Metro Art Awards 2022 & 2024', icon: <Award className="w-6 h-6 text-brand-pink" /> },
    { title: '1st Place Megacrew', organization: 'National Street Dance Battle 2023 & 2025', icon: <Flame className="w-6 h-6 text-brand-purple" /> },
    { title: 'Certified Training Center', organization: 'International Dance Council CID Member', icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 1. STUDIO OVERVIEW */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight font-sans"
          >
            Our Dance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 leading-relaxed font-sans text-md"
          >
            At Rock Dance Studio, we believe dancing is more than just learning choreographic steps—it is a pathway to physical wellness, self-discovery, and community. We welcome students of all age groups and skill levels, providing a premium space to grow under the guidance of industry-leading coaches.
          </motion.p>
        </div>

        {/* Studio Image & Brief Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/80 aspect-video lg:aspect-auto h-96 relative border border-white/5 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80"
              alt="Dance Class Session"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">A Home for Every Dancer</h2>
            <p className="text-zinc-400 font-sans leading-relaxed text-sm">
              Our studio features floating sprung hardwood floors designed to absorb impact and protect joints, professional audio equipment, full-length mirrors, and ambient lighting to emulate real stage environments.
            </p>
            <p className="text-zinc-400 font-sans leading-relaxed text-sm">
              Whether you are enrolling your child in their first dance class, looking for a high-intensity cardio workout, or seeking elite performance training for national competitions, we have a specialized program tailored for you.
            </p>
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-6">
              <div>
                <span className="block text-brand-pink text-3xl font-bold font-sans">100%</span>
                <span className="text-zinc-400 text-xs uppercase tracking-wider font-sans font-medium">Safe & Sprung Floors</span>
              </div>
              <div>
                <span className="block text-brand-purple text-3xl font-bold font-sans">20+</span>
                <span className="text-zinc-400 text-xs uppercase tracking-wider font-sans font-medium">Certified Instructors</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass-panel glow-border-pink relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-brand-pink" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-zinc-400 font-sans leading-relaxed text-sm">
              To inspire, educate, and empower individuals through the transformative art of dance. We strive to provide high-quality dance training in a supportive, positive environment that fosters creativity, discipline, and mutual respect.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-8 rounded-2xl glass-panel glow-border-purple relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-zinc-400 font-sans leading-relaxed text-sm">
              To be recognized as a world-class dance academy that nurtures exceptional talent, produces innovative stage productions, and cultivates a lifelong appreciation for arts and physical wellness in our communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. TIMELINE OF STUDIO STORY */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3">Our History</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-sans">The Studio Timeline</h3>
        </div>

        <div className="relative border-l border-zinc-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-12">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-brand-cyan border-4 border-[#09090b] shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
              
              <div className="glass-panel p-6 rounded-2xl glow-border-cyan">
                <span className="inline-block px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan rounded-md text-xs font-bold mb-3 font-sans">
                  {item.year}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. INSTRUCTOR PROFILES */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-3">Meet the Masters</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-sans">Our Choreographers</h3>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto font-sans text-sm">
            Learn from certified global instructors with extensive background in professional commercial productions, movies, and classical academies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden glow-border-pink group flex flex-col h-full"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden border-b border-white/5">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-grow text-center items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{trainer.name}</h4>
                  <span className="text-xs text-brand-pink font-semibold uppercase tracking-wider font-sans">
                    {trainer.specialization}
                  </span>
                  <p className="text-zinc-500 text-xs mt-3 font-sans">Experience: {trainer.experience}</p>
                </div>

                {/* Trainer Social links */}
                <div className="flex justify-center gap-3 mt-6">
                  {trainer.socialLinks.instagram && (
                    <a
                      href={trainer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {trainer.socialLinks.facebook && (
                    <a
                      href={trainer.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {trainer.socialLinks.youtube && (
                    <a
                      href={trainer.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & CERTIFICATIONS */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-purple mb-3">Our Triumphs</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-sans">Studio Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accomplishments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="p-6 rounded-2xl glass-panel glow-border-purple text-center flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">{item.organization}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
