'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function WaitlistCTA() {
  const { openWaitlist } = useModal();

  return (
    <section className="relative overflow-hidden bg-white border-t border-slate-100">
      {/* Visual accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-50/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-tight py-24 md:py-32 relative z-10 text-center">

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-[2rem] bg-primary-500 flex items-center justify-center shadow-glow-primary">
            <Sparkles size={32} className="text-white" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight"
        >
          Ready to Explore <br className="hidden md:block" />
          <span className="text-gradient-primary">Differently?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-body"
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
            className="group btn-primary py-5 px-12 rounded-2xl text-lg font-bold shadow-soft hover:shadow-glow-primary transition-all hover:scale-105 active:scale-[0.98]"
          >
            <Mail size={22} />
            Join the Waitlist
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
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
