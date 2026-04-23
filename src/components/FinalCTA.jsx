'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Download } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

export default function FinalCTA() {
  const { openWaitlist } = useModal();
  return (
    <section className="py-20 md:py-40 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-24 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Noise */}
          <div className="noise-bg absolute inset-0 opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Ready to explore?</span>
            </div>

            <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-8 leading-[1.1]">
              Start Planning Your <br />
              Next Adventure Today.
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
              Join thousands of travelers who are exploring the world smarter, safer, and within budget.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore" className="btn-accent w-full sm:w-auto h-14 px-10 rounded-2xl group flex items-center justify-center">
                Plan My Trip <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => openWaitlist()}
                className="flex items-center justify-center gap-3 h-14 px-10 rounded-2xl bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-all w-full sm:w-auto"
              >
                <Download size={20} />
                Download App
              </button>
            </div>
          </div>
          
          {/* Subtle Accent Light */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
