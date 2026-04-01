import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Navbar({ onWaitlistOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
      }
    } else {
      // Navigate to home first, then scroll
      // We can use a hash or just navigate
      // Navigating to / with a hash is usually fine with browsers
      // setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'AI Planner', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Explore', id: 'explore-preview' },
    { label: 'Safety', id: 'safety' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 ${
        scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-20">
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
          <Logo size="md" />
        </Link>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            isHome ? (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-gold rounded-full" 
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ) : (
              <Link
                key={link.label}
                to={`/#${link.id}`}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-gold transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            )
          ))}
        </div>

        {/* Right: CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/ai-planner"
            className="text-xs font-bold tracking-widest uppercase text-accent-gold hover:text-white transition-colors px-4 py-2 border border-accent-gold/20 rounded-full hover:bg-accent-gold/5"
          >
            Launch Planner
          </Link>
          <button
            onClick={onWaitlistOpen}
            className="btn-primary py-2.5 flex items-center gap-2 group text-sm"
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            Get Early Access
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
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
             className="md:hidden absolute top-full left-0 right-0 glass-panel border-t-0 rounded-t-none pb-8 pt-4 px-4 space-y-2 shadow-2xl flex flex-col"
          >
            {navLinks.map((link) => (
              isHome ? (
                <a
                  key={link.label}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all text-center"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={`/#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all text-center"
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/ai-planner"
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 rounded-xl border border-accent-gold/20 text-sm font-bold tracking-widest uppercase text-accent-gold hover:bg-accent-gold/5 transition-all text-center"
              >
                Launch Planner
              </Link>
              <button
                onClick={() => { onWaitlistOpen(); setMenuOpen(false); }}
                className="w-full py-4 rounded-xl text-sm font-semibold text-brand-900 btn-primary flex justify-center items-center gap-2"
              >
                <Rocket size={18} />
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
