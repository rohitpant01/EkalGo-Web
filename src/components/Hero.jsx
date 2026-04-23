'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Sparkles, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Noise Background Overlay */}
      <div className="noise-bg absolute inset-0 opacity-[0.015]" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-accent-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">v2.0 Now Live — AI Itineraries Reinvented</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-slate-900 mb-6 md:mb-8 tracking-tight leading-[1.1] md:leading-[1.05]"
          >
            Plan Smart Trips <br />
            <span className="text-gradient-primary">Within Your Budget.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-slate-500 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
          >
            AI-powered travel planning with real-time budget tracking. Discover hidden gems, book curated stays, and never overspend again.
          </motion.p>

          {/* Search Input Hero */}
          <motion.div
             initial={{ opacity: 0, y: 24 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="max-w-2xl mx-auto mb-10 md:mb-12 px-4 md:px-0"
          >
            <form onSubmit={handleSearch} className="relative group flex flex-col md:block gap-3">
              <div className="relative md:static">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors z-10">
                  <Search size={20} className="md:w-6 md:h-6" />
                </div>
                <input 
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 md:h-20 pl-14 md:pl-16 pr-6 md:pr-44 rounded-2xl md:rounded-3xl bg-white border-2 border-slate-100 shadow-premium focus:border-primary focus:outline-none transition-all text-base md:text-lg font-medium text-slate-900 placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  className="hidden md:flex absolute right-3 top-3 bottom-3 px-8 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all items-center gap-2"
                >
                  Let's Go <ArrowRight size={18} />
                </button>
              </div>
              
              {/* Mobile Only Button */}
              <button 
                type="submit"
                className="md:hidden w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                Let's Go <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/explore" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Or browse popular destinations
            </Link>
            <Link 
              href="/demo"
              className="btn-outline w-full sm:w-auto group"
            >
              <Play size={18} className="fill-slate-900" />
              View Demo
            </Link>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-[2rem] md:rounded-[3rem] bg-white shadow-premium overflow-hidden border border-slate-100 p-2">
              <div className="aspect-[16/9] bg-slate-50 rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000" 
                  alt="EkalGo AI Travel Dashboard Preview - Smart Budget Tracking" 
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row gap-6 items-end justify-between">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40 w-full md:w-80">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Budget</span>
                      <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                         <TrendingUp size={14} /> Tracking
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ delay: 1, duration: 2 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>₹6,500 SPENT</span>
                      <span>₹10,000 LIMIT</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      <span className="text-xs font-bold text-slate-900">AI Curated</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span className="text-xs font-bold text-slate-900">Safe Routes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-50/30 rounded-full blur-[100px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
