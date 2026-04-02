'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Github, Twitter, Instagram, MessageSquare, Shield, Lock, ScrollText } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function Footer() {
  const { openWaitlist, openLegal } = useModal();
  return (
    <footer className="py-20 border-t border-white/5 bg-brand-900 relative overflow-hidden"
      style={{ background: 'var(--brand-900)' }}>
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col items-start gap-4">
              <Logo size="md" />
              <p className="text-blue-100/60 leading-relaxed max-w-sm font-body">
                EkalGo is an AI-powered travel platform designed to help you explore smarter. From hidden gems to optimized routes, we aim to make travel effortless and intelligent.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              <h4 className="text-xs font-bold text-accent-gold uppercase tracking-widest font-display">About EkalGo</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-800 border border-white/10 flex items-center justify-center text-accent-teal font-bold text-xs">ET</div>
                  <div>
                    <p className="text-sm font-bold text-white">EkalGo Team</p>
                    <p className="text-[10px] text-blue-100/40 uppercase tracking-widest">Founder & Architects</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/50 italic leading-relaxed">
                  "Our mission is to revolutionize travel planning by making hidden intelligence accessible to every explorer."
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-display">Platform</h4>
            <div className="flex flex-col gap-4">
              <Link href="/explore" className="text-sm text-blue-100/40 hover:text-white transition-colors">Discovery Engine</Link>
              <Link href="/ai-planner" className="text-sm text-blue-100/40 hover:text-white transition-colors">AI Route Planner</Link>
              <Link href="/safety" className="text-sm text-blue-100/40 hover:text-white transition-colors">Safety Index</Link>
              <button onClick={openWaitlist} className="text-sm text-blue-100/40 hover:text-accent-gold transition-colors text-left">Early Access</button>
            </div>
          </div>

          {/* Legal & Trust */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-display">Trust Center</h4>
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={() => openLegal('privacy')}
                className="text-sm text-blue-100/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <Lock size={14} /> Privacy
              </button>
              <button 
                onClick={() => openLegal('terms')}
                className="text-sm text-blue-100/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <Shield size={14} /> Terms
              </button>
              <button 
                onClick={() => openLegal('cookies')}
                className="text-sm text-blue-100/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <ScrollText size={14} /> Cookies
              </button>
              <a href="https://wa.me/918474972007" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-100/40 hover:text-accent-teal transition-colors flex items-center gap-2">
                <MessageSquare size={14} /> Support
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-right">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-display">Get in Touch</h4>
            <div className="space-y-4">
              <a href="mailto:ekalgo.app@gmail.com" className="text-sm text-blue-100/60 hover:text-accent-gold transition-colors block">ekalgo.app@gmail.com</a>
              <div className="flex items-center justify-center lg:justify-end gap-3 font-display">
                <a href="https://x.com/ekal_go" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-100/40 hover:text-white hover:bg-white/5 transition-all border border-white/5 bg-brand-800">
                  <Twitter size={18} />
                </a>
                <a href="https://instagram.com/ekalgo.app" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-100/40 hover:text-white hover:bg-white/5 transition-all border border-white/5 bg-brand-800">
                  <Instagram size={18} />
                </a>
                <a href="https://github.com/rohitpant01/EkalGo-Web" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-100/40 hover:text-white hover:bg-white/5 transition-all border border-white/5 bg-brand-800">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <p className="text-[10px] text-blue-100/20 font-mono uppercase tracking-widest leading-loose">
            © {new Date().getFullYear()} EkalGo. AI-Powered Discovery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent-gold" />
              <span className="text-[10px] text-blue-100/40 uppercase tracking-widest font-mono">Made by Team EkalGo India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
