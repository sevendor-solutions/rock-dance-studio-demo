import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, ListChecks, Play, MessageSquare, ShieldCheck, CheckCircle, ArrowLeft } from 'lucide-react';
import { db } from '../data/db';
import { IClass, IInstructor } from '../types';

export const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cls, setCls] = useState<IClass | null>(null);
  const [trainer, setTrainer] = useState<IInstructor | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    const foundClass = db.getClasses().find(c => c.id === id);
    if (foundClass) {
      setCls(foundClass);
      
      // Load trainer info
      const foundTrainer = db.getInstructors().find(t => t.id === foundClass.trainerId);
      if (foundTrainer) {
        setTrainer(foundTrainer);
      }
    } else {
      navigate('/classes');
    }
  }, [id, navigate]);

  // Set default package when class loads
  useEffect(() => {
    if (cls && cls.packages && cls.packages.length > 0) {
      setSelectedPackage(cls.packages[0].name);
    }
  }, [cls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cls) return;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Add registration lead to local db
    db.addEnquiry({
      type: 'enrollment',
      name,
      email,
      phone,
      message: `Selected Package: ${selectedPackage}. Client Message: ${message || 'No additional comment'}`,
      targetId: cls.id,
      targetName: cls.name
    });

    setIsSubmitted(true);
    setErrorMsg('');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  if (!cls) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-zinc-400">Loading class details...</p>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hi Rock Dance Studio! I want to join the "${cls.name}" class (${cls.level} level). Please provide details on enrollment.`);
  const whatsappUrl = `https://wa.me/15552345678?text=${whatsappMessage}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Classes */}
      <Link
        to="/classes"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-brand-pink mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Classes Catalog
      </Link>

      {/* Grid: Header details & Cover image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left: Metadata */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink rounded-md text-xs font-bold uppercase tracking-wider font-sans">
              {cls.style}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-md text-xs font-medium font-sans">
              {cls.level}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-md text-xs font-medium font-sans">
              {cls.ageGroup} Group
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{cls.name}</h1>
          <p className="text-zinc-300 font-sans leading-relaxed text-md">{cls.description}</p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/5">
            <div>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2 font-sans">
                <Calendar className="w-4 h-4 text-brand-pink" />
                Schedule Batches
              </span>
              <ul className="space-y-1 text-zinc-300 text-sm font-sans font-medium">
                {cls.schedule.map((time, idx) => (
                  <li key={idx}>{time}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2 font-sans">
                <DollarSign className="w-4 h-4 text-brand-pink" />
                Standard Fees
              </span>
              <span className="text-2xl font-extrabold text-brand-pink">{cls.fees}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-wrap gap-4">
            <a
              href="#enroll-form"
              className="btn-primary flex-1 sm:flex-initial"
            >
              Enroll Online
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/15 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 flex-1 sm:flex-initial"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Quick Join via WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Cover Image */}
        <div className="lg:col-span-5 h-96 sm:h-[450px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/85">
          <img
            src={cls.imageUrl}
            alt={cls.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Grid: Details, benefits, video vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Benefits, Video, Instructor */}
        <div className="lg:col-span-7 space-y-12">
          {/* Student Benefits */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-brand-pink" />
              What You Will Learn
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cls.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm font-sans leading-relaxed text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Packages */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Packages & Memberships</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {cls.packages.map((pkg, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-xl border-white/5 flex flex-col justify-between h-full hover:border-brand-pink/30 transition-colors">
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{pkg.name}</h4>
                    <p className="text-zinc-500 text-[11px] font-sans leading-relaxed mb-4">{pkg.description}</p>
                  </div>
                  <span className="text-brand-pink font-extrabold text-lg mt-auto">{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Online features details */}
          {cls.isOnline && cls.onlineDetails && (
            <div className="glass-panel p-6 rounded-2xl border-brand-purple/20 bg-brand-purple/5">
              <h3 className="text-lg font-bold text-white mb-4">Online Subscription Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-zinc-300">
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="block text-zinc-500 font-bold mb-1 uppercase tracking-wider">Live Batches</span>
                  {cls.onlineDetails.liveSessions}
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="block text-zinc-500 font-bold mb-1 uppercase tracking-wider">Archived Content</span>
                  {cls.onlineDetails.recordedAccess}
                </div>
              </div>
            </div>
          )}

          {/* Video Demonstration */}
          {cls.demoVideo && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Play className="w-5 h-5 text-brand-pink" fill="currentColor" />
                Class Video Demo
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-lg shadow-black/70 bg-zinc-900">
                <iframe
                  src={cls.demoVideo}
                  title={`${cls.name} Demo Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Trainer Details */}
          {trainer && (
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-pink p-0.5">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center sm:text-left flex-grow">
                <span className="text-[10px] uppercase font-bold text-brand-pink tracking-widest font-sans">Your Trainer</span>
                <h4 className="text-xl font-bold text-white mb-1">{trainer.name}</h4>
                <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-1">{trainer.specialization}</p>
                <p className="text-zinc-500 text-xs font-sans">Experience: {trainer.experience}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Enrollment Registration Form */}
        <div id="enroll-form" className="lg:col-span-5">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl glow-border-pink sticky top-28">
            <h3 className="text-xl font-bold mb-2">Class Enrollment</h3>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Fill out the details below to lock in your class batch. Our coordinators will reach back within 24 hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center flex flex-col items-center justify-center space-y-4"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Enrollment Requested!</h4>
                <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                  Thank you, **{name}**. We have logged your request for **{cls.name}** under the **{selectedPackage}** package. We will contact you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-brand-pink hover:text-white font-semibold underline mt-2"
                >
                  Submit Another Form
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                {errorMsg && <p className="text-red-500 text-xs font-bold font-sans">{errorMsg}</p>}
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Select Package *</label>
                  <select
                    value={selectedPackage}
                    onChange={e => setSelectedPackage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-300 focus:outline-none focus:border-brand-pink transition-colors"
                  >
                    {cls.packages.map((pkg, idx) => (
                      <option key={idx} value={pkg.name}>
                        {pkg.name} ({pkg.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Notes / Questions</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about any previous dance experience or queries..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 mt-4"
                >
                  Submit Registration
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
