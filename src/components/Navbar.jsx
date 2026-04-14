'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sparkles, User, LogIn, Compass } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useModal } from '@/context/ModalContext';
import { useTabStore } from '@/context/tabStore';

export default function Navbar() {
  const { openLegal, openWaitlist } = useModal();
  const { addTab, setActiveTab } = useTabStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);

    // 1. Handle Tab-based Views
    if (link.type === 'tab') {
      addTab({
        id: link.id,
        title: link.label,
        type: link.tabType,
        pinned: false,
        data: {}
      });
      setActiveTab(link.id);
      return;
    }

    // 2. Handle Scroll-based Sections (Internal to Discover Tab)
    if (link.type === 'scroll') {
      // Always switch to Discover first since these sections live there
      setActiveTab('discover');
      
      // Delay slightly for React to render/switch to the tab
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    // 3. Special: AI Planner focuses the search on the Discover tab
    if (link.id === 'ai-planner') {
      setActiveTab('discover');
      setTimeout(() => {
        const searchEl = document.getElementById('discovery-search-header');
        if (searchEl) searchEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
  };

  const navLinks = [
    { label: 'AI Planner', id: 'ai-planner', type: 'special' },
    { label: 'Explore', id: 'explore-global', type: 'tab', tabType: 'explore' },
    { label: 'Safety', id: 'safety', type: 'scroll' },
    { label: 'How It Works', id: 'how-it-works', type: 'scroll' },
  ];

  const isHome = pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 h-20 border-b border-white/5 flex items-center ${
        scrolled ? 'bg-[#010912]/95 backdrop-blur-xl shadow-2xl' : 'bg-[#020C16]/80 backdrop-blur-md'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Logo size="md" />
          </Link>
        </div>

        {/* Right side group: Nav Links + Buttons */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8 nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={isHome ? `#${link.id}` : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link)}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-gold rounded-full" 
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 border-l border-white/10 pl-10">
             <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <button onClick={() => openLegal('privacy')} className="hover:text-accent-gold transition-colors">Privacy</button>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <button onClick={() => openLegal('terms')} className="hover:text-accent-gold transition-colors">Terms</button>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-accent-gold/5 border border-accent-gold/20 shadow-glow-gold/10 group cursor-default">
                <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse shadow-glow-gold" />
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Pulse Active</span>
             </div>
             
             <button 
               onClick={() => openWaitlist()}
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-gold text-ocean-900 text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-glow-gold/20"
             >
               <Rocket size={14} />
               <span>Join Waitlist</span>
             </button>
          </div>
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
             className="md:hidden absolute top-full left-0 right-0 bg-[#020C16] border-t border-white/5 pb-10 pt-6 px-6 space-y-2 shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl flex flex-col z-[100]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={isHome ? `#${link.id}` : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all text-center"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                <button 
                  onClick={() => { openLegal('privacy'); setMenuOpen(false); }}
                  className="text-white/20 hover:text-accent-gold"
                >
                  Privacy
                </button>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <button 
                  onClick={() => { openLegal('terms'); setMenuOpen(false); }}
                  className="text-white/20 hover:text-accent-gold"
                >
                  Terms
                </button>
              </div>
              <button
                onClick={() => { openWaitlist(); setMenuOpen(false); }}
                className="w-full py-4 rounded-xl bg-accent-gold text-ocean-900 flex justify-center items-center gap-2 text-sm font-bold shadow-glow-gold"
              >
                <Rocket size={16} />
                Join the Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
