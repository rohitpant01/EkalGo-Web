'use client';

import React from 'react';
import { Shield, Check, Lock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SafetyPage() {
  const safetyFeatures = [
    {
      title: "Verified Places",
      desc: "Every recommendation in your itinerary is cross-verified against real-time data and safety ratings.",
      icon: Shield
    },
    {
      title: "Smart SOS",
      desc: "One-tap emergency assistance that shares your precise location with local authorities and EkalGo support.",
      icon: Info
    },
    {
      title: "Privacy First",
      desc: "Your travel patterns are yours. We encrypt everything and never sell your personal data.",
      icon: Lock
    },
    {
      title: "Community Trust",
      desc: "Real-time safety alerts from fellow EkalGo travelers on the ground.",
      icon: Check
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-brand-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-neon/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-teal/10 text-accent-teal text-xs font-bold tracking-wider uppercase mb-4 border border-accent-teal/20">
            Trust & Security
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Your Safety is Our <span className="text-gradient-gold">North Star</span>
          </h1>
          <p className="text-blue-100/60 text-lg md:text-xl max-w-2xl mx-auto font-body">
            We're building the world's first AI travel companion that prioritizes your peace of mind over everything else.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {safetyFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold/80 flex items-center justify-center mb-6">
                <feature.icon className="text-brand-900" size={24} />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100/50 font-body leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-panel p-10 rounded-[2.5rem] border-dashed border-white/10 text-center"
        >
          <h2 className="text-2xl font-display font-semibold text-white mb-4">Coming Full-Force in 2026</h2>
          <p className="text-blue-100/50 mb-8">Full safety features will be available in the version 2.0 update of the mobile app.</p>
          <Link
            href="/ai-planner"
            className="btn-primary inline-flex items-center gap-2"
          >
            Back to Planner
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
