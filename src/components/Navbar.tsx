import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md py-4 border-b border-white/5 shadow-lg shadow-black/50'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 bg-gradient-to-tr from-brand-pink to-brand-purple rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]"
            >
              <Flame className="w-6 h-6 text-white" fill="currentColor" />
            </motion.div>
            <span className="text-xl font-bold font-sans tracking-wider text-white group-hover:text-brand-pink transition-colors duration-300">
              ROCK<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">DANCE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-sm font-semibold tracking-wide transition-colors duration-300"
                  style={{ color: isActive ? '#ec4899' : '#d4d4d8' }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-pink to-brand-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="p-2 border border-brand-purple/50 text-brand-purple hover:bg-brand-purple/10 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs font-bold"
                title="Go to Admin Dashboard"
              >
                <ShieldAlert className="w-4 h-4 text-brand-purple animate-pulse" />
                CMS Active
              </Link>
            )}
            <Link
              to="/classes"
              className="px-5 py-2 bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-[1.03]"
            >
              Join Class
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="p-1.5 border border-brand-purple/50 text-brand-purple hover:bg-brand-purple/10 rounded-lg transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-brand-purple" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#09090b]/95 backdrop-blur-lg border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-pink/20 to-brand-purple/20 text-brand-pink border-l-4 border-brand-pink pl-2'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <Link
                  to="/classes"
                  className="w-full py-3 bg-gradient-to-r from-brand-pink to-brand-purple text-center text-white font-semibold rounded-lg shadow-lg hover:shadow-brand-pink/20 transition-all duration-300"
                >
                  Join Class
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
