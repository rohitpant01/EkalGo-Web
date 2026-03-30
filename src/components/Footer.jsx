import React from 'react';
import Logo from './Logo';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';

const LINKS = {
  Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer({ onWaitlistOpen }) {
  return (
    <footer className="border-t pt-16 pb-8 px-4"
      style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(1,13,22,0.8)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-blue-200/40 leading-relaxed max-w-xs">
              EkalGo — Find your travel soulmate. AI-powered solo travel companion for India's boldest explorers.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <button key={i}
                  onClick={i === 3 ? onWaitlistOpen : undefined}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-200/30 hover:text-white hover:bg-white/8 transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-200/40 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#"
                      className="text-sm text-blue-200/50 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-blue-200/25 font-body">
            © {new Date().getFullYear()} EkalGo. Built with ✈️ for solo travelers.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-blue-200/25">Made in India 🇮🇳</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
              <span className="text-xs text-jade/60">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
