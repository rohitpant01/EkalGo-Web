'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Twitter, Instagram, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const FOOTER_LINKS = {
  product: [
    { label: 'AI Planner', href: '/explore' },
    { label: 'Explore Destinations', href: '/explore' },
    { label: 'Hidden Gems', href: '/explore' },
    { label: 'Safety Index', href: '/explore' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
  ],
  legal: [
    { label: 'Privacy Policy', action: 'privacy' },
    { label: 'Terms of Service', action: 'terms' },
    { label: 'Cookie Policy', action: 'cookies' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://x.com/ekal_go', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/ekalgo.app', label: 'Instagram' },
  { icon: MessageSquare, href: 'https://wa.me/918474972007', label: 'WhatsApp' },
];

export default function Footer() {
  const { openLegal, openWaitlist } = useModal();

  return (
    <footer className="section-dark relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />
      
      <div className="container-tight py-16 lg:py-20 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <Logo size="md" variant="light" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered travel platform that helps you explore smarter. From hidden gems to optimized routes, making travel effortless.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => openLegal(link.action)}
                    className="text-sm text-slate-500 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="col-span-2 md:col-span-4 md:col-start-9 md:row-start-1">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-4">Get notified when we launch new features and destinations.</p>
            <button
              onClick={() => openWaitlist()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-400/10 text-primary-400 text-sm font-semibold hover:bg-primary-400/20 transition-all border border-primary-400/20"
            >
              <Mail size={16} />
              Join the Waitlist
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} EkalGo. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Made with</span>
            <span className="text-primary-400">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
