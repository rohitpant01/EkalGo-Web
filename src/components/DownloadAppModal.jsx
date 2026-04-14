"use client";

import React from 'react';
import { X, Smartphone, Download, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { redirectToAPK } from '@/utils/redirect';

export default function DownloadAppModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    redirectToAPK();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(1,13,22,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{ 
          background: 'linear-gradient(160deg, #043358 0%, #021A2C 100%)', 
          border: '1px solid rgba(228,178,80,0.2)' 
        }}>

        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, #F9A826, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10 pointer-events-none pb-12"
          style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 65%)' }} />

        <div className="relative p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow-gold/20"
              style={{ background: 'rgba(249,168,38,0.1)', border: '1px solid rgba(249,168,38,0.2)' }}>
              <Smartphone size={40} className="text-accent-gold" />
            </motion.div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Sparkles size={14} className="text-accent-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200/60">Experience the App</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Get the <span className="text-accent-gold italic">EkalGo App</span> 🚀
            </h2>
            <p className="text-blue-200/60 text-base max-w-sm mx-auto">
              Your personal AI travel architect is now in your pocket. Experience seamless exploration, offline maps, and more.
            </p>
          </div>

          {/* Features Mini-Grid */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { icon: ShieldCheck, text: "Safe & Verified" },
              { icon: CheckCircle, text: "Direct Download" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                <feature.icon size={18} className="text-accent-gold/60" />
                <span className="text-xs font-semibold text-blue-100/80">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleDownload}
            className="w-full relative group overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-ocean-900 shadow-glow-gold/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Download size={20} className="relative z-10" />
            <span className="relative z-10 text-lg">Download APK Now</span>
            <ArrowRight size={18} className="relative z-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
          </button>

          <p className="mt-6 text-center text-[11px] text-blue-200/30 uppercase tracking-[0.2em]">
            Android Version 1.0.0 • 45MB
          </p>
        </div>
        
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/10 transition-all z-[200]">
          <X size={24} />
        </button>
      </motion.div>
    </div>
  );
}
