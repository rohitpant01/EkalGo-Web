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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 modal-backdrop"
      style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100"
      >
        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-3xl bg-accent-50 text-accent-500 flex items-center justify-center mx-auto mb-6 shadow-soft border border-accent-100"
            >
              <Smartphone size={40} />
            </motion.div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <Sparkles size={14} className="text-accent-500" />
              <span>Experience the App</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3 leading-tight">
              Get the EkalGo App 🚀
            </h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Your personal AI travel architect is now in your pocket. Experience seamless exploration, offline maps, and more.
            </p>
          </div>

          {/* Features Mini-Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: ShieldCheck, text: "Safe & Verified" },
              { icon: CheckCircle, text: "Direct Download" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <feature.icon size={18} className="text-emerald-500" />
                <span className="text-xs font-semibold text-slate-600">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleDownload}
            className="w-full relative group overflow-hidden flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Download size={20} className="relative z-10" />
            <span className="relative z-10 text-base">Download APK Now</span>
            <ArrowRight size={18} className="relative z-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
          </button>

          <p className="mt-6 text-center text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            Android Version 1.0.0 • 45MB
          </p>
        </div>
        
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-[200]">
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
}
