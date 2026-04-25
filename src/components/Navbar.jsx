'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, MapPin, Compass } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useModal } from '@/context/ModalContext';
import destinations from '@/data/destinations.json';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { 
    label: 'Destinations', 
    href: '#',
    isDropdown: true,
    items: destinations.destinations.slice(0, 8).map(d => ({
      label: d.name,
      href: `/explore/${d.id}`,
      tag: d.category
    }))
  },
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' },
];





export default function Navbar() {
  const { openWaitlist } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === '#' || href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="container-tight flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80 relative z-[60] flex-shrink-0">
            <Logo size="sm" variant={scrolled || menuOpen ? 'default' : (pathname.startsWith('/safety/') ? 'light' : 'default')} className="md:hidden" />
            <Logo size="md" variant={scrolled || menuOpen ? 'default' : (pathname.startsWith('/safety/') ? 'light' : 'default')} className="hidden md:block" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.isDropdown ? (
                  <Link
                    href="/explore"
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-bold transition-all duration-200 ${
                      activeDropdown === link.label ? 'text-primary-600' : 
                      scrolled || menuOpen ? 'text-slate-900' : (pathname.startsWith('/safety/') ? 'text-white' : 'text-slate-950')
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </Link>
                ) : (

                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-bold transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-primary-800'
                        : scrolled || menuOpen 
                          ? 'text-slate-900 hover:text-primary-700' 
                          : (pathname.startsWith('/safety/'))
                            ? 'text-white hover:text-primary-300'
                            : 'text-slate-950 hover:text-primary-700'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-4 right-4 h-[3px] bg-primary-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.isDropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-elevated border border-slate-100 py-3 mt-1 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Popular Destinations</p>
                      </div>
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                              <MapPin size={14} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{item.label}</p>
                              <p className="text-[10px] text-slate-400">{item.tag}</p>
                            </div>
                          </div>
                          <ChevronDown size={14} className="-rotate-90 text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-slate-50 px-2">
                        <Link 
                          href="/explore"
                          className="flex items-center justify-center gap-2 py-2 rounded-xl bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition-colors"
                        >
                          View All Destinations <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>


          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openWaitlist()}
              className="btn-primary text-sm px-5 py-2.5 min-h-[40px]"
            >
              Get Early Access
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-[60] p-2 -mr-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-0 left-0 right-0 bg-white pt-[80px] pb-8 px-5 shadow-elevated rounded-b-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    {link.isDropdown ? (
                      <div className="mb-2">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                            activeDropdown === link.label ? 'text-primary-600 bg-primary-50' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Compass size={20} className="text-primary-400" />
                            {link.label}
                          </div>
                          <ChevronDown size={18} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50/50 rounded-xl mt-1 ml-4"
                            >
                              <div className="py-2 grid grid-cols-2 gap-1">
                                {link.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary-600 flex items-center gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-300" />
                                    {item.label}
                                  </Link>
                                ))}
                                <Link
                                  href="/explore"
                                  onClick={() => setMenuOpen(false)}
                                  className="col-span-2 px-4 py-3 text-sm font-bold text-primary-600 flex items-center gap-2"
                                >
                                  View All <ArrowRight size={14} />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                          isActive(link.href)
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>


              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={() => { openWaitlist(); setMenuOpen(false); }}
                  className="btn-primary w-full text-base"
                >
                  Get Early Access
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
