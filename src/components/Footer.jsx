'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, MessageCircle, Mail, 
  ArrowRight, Globe, Shield, MapPin, Zap, AtSign 
} from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import { useModal } from '@/context/ModalContext';

import destinationsData from '@/data/destinations.json';

const FOOTER_LINKS = {
  product: [
    { label: 'Explore', href: '/explore' },
    { label: 'Hidden Gems', href: '/hidden-gems/manali' },
    { label: 'Getaways', href: '/getaways/manali' },
  ],
  destinations: destinationsData.destinations.slice(0, 8).map(d => ({
    label: `${d.name} Guide`,
    href: `/explore/${d.id}`
  })).concat([{ label: 'View All', href: '/explore' }]),
  discovery: [
    { label: 'Budget Trips', href: '/explore/manali/budget' },
    { label: 'Solo Adventures', href: '/explore/rishikesh/solo' },
    { label: 'Romantic Getaways', href: '/explore/pondicherry/romantic' },
    { label: 'Hidden Gems Hub', href: '/explore' },
  ],
  company: [
    { label: 'Contact', href: '/contact' },
    { label: 'Support', href: 'mailto:ekalgo.app@gmail.com' },
    { label: 'Top 2026', href: '/top-destinations-2026' },
  ],
  legal: [
    { label: 'Privacy Policy', action: 'privacy' },
    { label: 'Terms of Service', action: 'terms' },
    { label: 'Cookie Policy', action: 'cookie' },
  ]
};

export default function Footer() {
  const { openLegal, openWaitlist } = useModal();

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Visual Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-tight pt-16 pb-8 md:pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo size="md" variant="light" />
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-xs">
              The AI-first travel platform for the modern nomad. Plan, track, and explore with confidence.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {/* X (Twitter) */}
              <a 
                href="https://x.com/ekal_go" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.487h2.039L6.486 3.24H4.298l13.311 17.399z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/ekalgo.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all"
              >
                <Instagram size={18} />
              </a>

              {/* Message / Support */}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ekalgo.app@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all"
              >
                <AtSign size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
                The Ecosystem
              </h4>
              <ul className="space-y-6">
                {FOOTER_LINKS.product.map((link, idx) => (
                  <li key={idx} className="group">
                    <Link 
                      href={link.href} 
                      className="flex items-center gap-3 text-sm font-medium text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500/20 group-hover:bg-primary-500 group-hover:scale-125 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
                Top Destinations
              </h4>
              <ul className="space-y-6">
                {FOOTER_LINKS.destinations.map((link, idx) => (
                  <li key={idx} className="group">
                    <Link 
                      href={link.href} 
                      className="flex items-center gap-3 text-sm font-medium text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-500/20 group-hover:bg-accent-500 group-hover:scale-125 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
                Travel Discovery
              </h4>
              <ul className="space-y-6">
                {FOOTER_LINKS.discovery.map((link, idx) => (
                  <li key={idx} className="group flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/20 group-hover:bg-primary-500 group-hover:scale-125 transition-all duration-300" />
                    <Link 
                      href={link.href} 
                      className="text-sm font-medium text-slate-400 group-hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
                Legal & Safety
              </h4>
              <ul className="space-y-6">
                <li className="group flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300" />
                   <Link href="/privacy" className="text-sm font-medium text-slate-400 group-hover:text-white transition-all duration-300">Privacy Policy</Link>
                </li>
                <li className="group flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300" />
                   <Link href="/terms" className="text-sm font-medium text-slate-400 group-hover:text-white transition-all duration-300">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={40} className="text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Join the Future.</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Get notified when we launch new secret destinations and AI features.
              </p>
              <button 
                onClick={() => openWaitlist()}
                className="w-full py-4 rounded-2xl bg-primary-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-500 transition-all"
              >
                Join the Waitlist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-4 text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-6">
              <span>© 2026 EkalGO Inc.</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Globe size={12} />
                <span>International (EN)</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookie" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 order-3 md:order-2">
            <span>Made with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-primary-500"
            >
              ♥
            </motion.span>
            <span>by <span className="text-white font-bold tracking-tight">Team EkalGO</span></span>
          </div>

          <div className="flex items-center gap-4 order-2 md:order-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.1em]">Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

