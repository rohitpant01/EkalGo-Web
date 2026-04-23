'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function WaitlistCTA() {
  const { openWaitlist } = useModal();

  return (
    <section className="relative overflow-hidden noise-bg">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-cta-gradient" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-400/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-accent-400/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="container-tight py-20 md:py-28 relative z-10 text-center">

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-glow-primary animate-float">
            <Sparkles size={28} className="text-primary-300" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5"
        >
          Ready to Explore <br className="hidden md:block" />
          <span className="text-gradient-primary">Differently?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Join thousands of travelers who are discovering the world smarter. Be among the first to access our AI-powered travel engine.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-5"
        >
          <button
            onClick={() => openWaitlist()}
            className="group btn-primary-dark text-base px-10 py-4 rounded-2xl shadow-glow-primary hover:shadow-[0_0_40px_rgba(45,212,191,0.4)] transition-all hover:scale-105 active:scale-[0.98]"
          >
            <Mail size={20} />
            Join the Waitlist
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-primary-400" /> Free to join</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-primary-400" /> No spam, ever</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-primary-400" /> Early access perks</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
