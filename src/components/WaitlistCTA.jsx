'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, CheckCircle, Smartphone, Download, Mail } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function WaitlistCTA() {
  const { openWaitlist } = useModal();
  return (
    <section className="py-20 relative overflow-hidden bg-brand-900 border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-neon/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-accent-gold/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl glass-panel border border-accent-gold/30 flex items-center justify-center shadow-glow-gold animate-float">
            <Smartphone size={32} className="text-accent-gold" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg"
        >
          The Journey <br className="hidden md:block" />
          <span className="text-gradient-gold italic">starts here.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Exploration is evolving. Join the EkalGo waitlist to be among the first to experience our next-gen travel discovery engine and social matching features.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={() => openWaitlist()}
            className="group relative flex items-center justify-center gap-4 py-5 px-10 rounded-2xl font-bold text-ocean-900 shadow-glow-gold transition-all hover:scale-105 active:scale-95 text-lg"
            style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
          >
            <Mail size={22} />
            Join the Waitlist
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent-teal" /> Verified & Safe</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent-teal" /> 45 MB • Android 1.0+</span>
            <span className="flex items-center gap-1.5"><Rocket size={14} className="text-accent-gold" /> Instant Access</span>
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center gap-6">
           <a href="https://x.com/ekal_go" target="_blank" rel="noopener noreferrer" className="text-blue-100/30 hover:text-accent-gold transition-colors text-xs font-mono uppercase tracking-widest">Twitter (X)</a>
           <span className="text-white/10">/</span>
           <a href="https://instagram.com/ekalgo.app" target="_blank" rel="noopener noreferrer" className="text-blue-100/30 hover:text-accent-gold transition-colors text-xs font-mono uppercase tracking-widest">Instagram</a>
        </div>
      </div>
    </section>
  );
}
