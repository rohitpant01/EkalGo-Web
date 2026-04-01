import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { redirectToApp } from '../utils/redirect';

export default function Navbar({ onWaitlistOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appAvailable, setAppAvailable] = useState(false);

  useEffect(() => {
    const PLAY = import.meta.env.VITE_PLAY_STORE_URL;
    if (PLAY && PLAY !== 'https://play.google.com/store/apps/details?id=com.ekalgo.app') {
      setAppAvailable(true);
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Routes', href: '/routes' },
    { label: 'Safety', href: '/safety' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="transition-opacity hover:opacity-80 flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-body font-medium text-blue-200/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onWaitlistOpen}
              className="text-sm font-medium text-sand-100/80 hover:text-sand-100 transition-colors px-4 py-2"
            >
              Join Waitlist
            </button>
            <button
              onClick={() => {
                const ok = redirectToApp();
                if (!ok) onWaitlistOpen();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-ocean-900 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
            >
              <Download size={15} />
              {appAvailable ? 'Download App' : 'Get Early Access'}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/5 pb-8 pt-4 px-4 space-y-2 shadow-2xl flex flex-col"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-blue-100/70 hover:text-white hover:bg-white/5 transition-all text-center"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => { onWaitlistOpen(); setMenuOpen(false); }}
                  className="w-full py-4 rounded-xl border border-white/10 text-sm font-medium text-white/70 hover:bg-white/5 transition-all"
                >
                  Join Waitlist
                </button>
                <button
                  onClick={() => {
                    const ok = redirectToApp();
                    if (!ok) { onWaitlistOpen(); }
                    setMenuOpen(false);
                  }}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-ocean-900 shadow-glow-amber"
                  style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
                >
                  {appAvailable ? 'Download App' : 'Get Early Access'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
