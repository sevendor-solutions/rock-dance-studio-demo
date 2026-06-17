import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Instagram, Facebook, Youtube, Compass, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Studio Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-tr from-brand-pink to-brand-purple rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                <Flame className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold font-sans tracking-wider text-white">
                ROCK<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">DANCE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Ignite your passion, master dynamic movement, and step onto the stage with unshakeable confidence. Training dancers from beginners to elite performers.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-brand-purple hover:text-brand-purple flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-brand-cyan hover:text-brand-cyan flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-brand-pink hover:text-brand-pink flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="TikTok"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-pink transition-colors duration-200">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-pink transition-colors duration-200">About Our Studio</Link>
              </li>
              <li>
                <Link to="/classes" className="hover:text-brand-pink transition-colors duration-200">Dance Classes</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-pink transition-colors duration-200">Workshops & Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-pink transition-colors duration-200">Photo & Video Gallery</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-pink transition-colors duration-200">Dance Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Dance Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Class Categories</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/classes?style=Hip-Hop" className="hover:text-brand-purple transition-colors duration-200">Hip-Hop Street Grooves</Link>
              </li>
              <li>
                <Link to="/classes?style=Bollywood+Dance" className="hover:text-brand-purple transition-colors duration-200">Bollywood Fusion</Link>
              </li>
              <li>
                <Link to="/classes?style=Contemporary" className="hover:text-brand-purple transition-colors duration-200">Contemporary Flow</Link>
              </li>
              <li>
                <Link to="/classes?style=Classical+Dance" className="hover:text-brand-purple transition-colors duration-200">Indian Classical</Link>
              </li>
              <li>
                <Link to="/classes?style=Fitness+Dance" className="hover:text-brand-purple transition-colors duration-200">Zumba Fit Cardio</Link>
              </li>
              <li>
                <Link to="/classes?style=Kids+Dance" className="hover:text-brand-purple transition-colors duration-200">Little Stars (Kids)</Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contact Studio</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                <span>101 Rhythmic Boulevard, Dance District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-pink shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-pink shrink-0" />
                <span>info@rockdancestudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} Rock Dance Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin CMS Portal</Link>
            <span className="text-zinc-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-zinc-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
