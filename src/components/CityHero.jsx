'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CityHero({ data }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600";

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <img 
        src={imgError ? fallbackImage : data.image} 
        className="absolute inset-0 w-full h-full object-cover"
        alt={`${data.name} Travel Guide`}
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      
      <div className="container-tight relative z-10 text-center text-white">
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Explore
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="badge border-white/20 bg-white/10 text-white mb-4">Destination Guide</div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight uppercase">
            Explore <span className="text-primary-400">{data.name}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-body">
            Plan your perfect {data.name} trip within a budget of {data.budget_range}.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
