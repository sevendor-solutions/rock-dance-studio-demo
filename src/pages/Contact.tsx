import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, Flame, Star, Sparkles } from 'lucide-react';
import { db } from '../data/db';

export const Contact: React.FC = () => {
  const location = useLocation();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState('contact'); // contact vs trial
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if routed from Hero "Book Trial" button
  useEffect(() => {
    if (location.state && (location.state as any).requestTrial) {
      setEnquiryType('trial');
      setMessage('Hi, I would like to book a free trial class session.');
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    // Add lead enquiry
    db.addEnquiry({
      type: enquiryType as any,
      name,
      email,
      phone,
      message
    });

    setIsSuccess(true);
    setErrorMsg('');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const socialLinks = [
    { name: 'Instagram', handle: '@rockdancestudio', url: 'https://instagram.com', color: 'hover:border-brand-pink hover:text-brand-pink' },
    { name: 'Facebook', handle: 'Rock Dance Studio', url: 'https://facebook.com', color: 'hover:border-brand-purple hover:text-brand-purple' },
    { name: 'YouTube', handle: 'Rock Dance TV', url: 'https://youtube.com', color: 'hover:border-brand-cyan hover:text-brand-cyan' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Us</span>
        </h1>
        <p className="text-zinc-400 font-sans text-sm leading-relaxed">
          Have questions about fees, schedule batches, or private lessons? Drop a message or walk in directly to our studio floor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        {/* Left: Contact Info & Map */}
        <div className="lg:col-span-5 space-y-8">
          {/* Info Panels */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="text-xl font-bold mb-4 font-sans">Studio HQ</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-sans">
                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Studio Address</span>
                <p className="text-zinc-300 text-sm leading-relaxed">101 Rhythmic Boulevard, Dance District, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="font-sans">
                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Call Booking</span>
                <p className="text-zinc-300 text-sm leading-relaxed">+1 (555) 234-5678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="font-sans">
                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Email Enquiry</span>
                <p className="text-zinc-300 text-sm leading-relaxed">info@rockdancestudio.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-sans">
                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Working Hours</span>
                <p className="text-zinc-300 text-sm leading-relaxed">Mon - Fri: 7:00 AM - 9:00 PM</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Sat - Sun: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Links List */}
          <div className="glass-panel p-6 rounded-2xl border-white/5">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-sans">Social Feeds</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg bg-zinc-900 border border-white/5 flex flex-col items-center text-center transition-all ${link.color}`}
                >
                  <span className="font-bold text-white mb-1">{link.name}</span>
                  <span className="text-zinc-500 text-[10px]">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl glow-border-pink">
            <h3 className="text-2xl font-bold mb-2">Send Message</h3>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Use this form to send a general enquiry or book a free trial class in any style.
            </p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center flex flex-col items-center justify-center space-y-4"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400 animate-pulse" />
                <h4 className="text-xl font-bold text-white">Message Logged!</h4>
                <p className="text-zinc-300 text-xs font-sans leading-relaxed max-w-sm">
                  We have successfully logged your enquiry. Our team will review your details and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs text-brand-pink hover:text-white font-bold underline mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                {errorMsg && <p className="text-red-500 text-xs font-bold">{errorMsg}</p>}

                {/* Form type tabs */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-zinc-950 p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setEnquiryType('contact')}
                    className={`py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                      enquiryType === 'contact' ? 'bg-brand-pink text-white' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    General Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEnquiryType('trial');
                      if (!message) setMessage('Hi, I would like to book a free trial class session.');
                    }}
                    className={`py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                      enquiryType === 'trial' ? 'bg-brand-pink text-white' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    Book Free Trial
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write details of your query..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-700 focus:outline-none focus:border-brand-pink transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 mt-4"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* GOOGLE MAPS INTEGRATION */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold font-sans">Find Our Studio Floor</h3>
        <div className="h-96 w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl shadow-black/80 bg-zinc-950 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d193595.2528082184!2d-74.11976378413725!3d40.69767006346294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1718534839845!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Rock Dance Studio Location Map"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};
