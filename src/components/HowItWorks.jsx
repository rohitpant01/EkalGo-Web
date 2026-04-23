'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, Compass, PlaneTakeoff } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Enter Destination',
    desc: 'Tell us where you want to go, your budget, and your travel vibe.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'AI Generates Plan',
    desc: 'Our engine analyzes thousands of possibilities to craft your perfect itinerary.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: Compass,
    number: '03',
    title: 'Discover Hidden Gems',
    desc: 'Explore secret spots and local favorites that most tourists never find.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: PlaneTakeoff,
    number: '04',
    title: 'Travel with Confidence',
    desc: 'Hit the road with verified routes, real-time alerts, and offline access.',
    color: 'bg-emerald-50 text-emerald-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-surface-alt relative overflow-hidden">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4"
          >
            How It <span className="text-gradient-primary">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-base md:text-lg"
          >
            Four simple steps to your dream journey.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line — Desktop Only */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon Circle */}
                  <div className="relative mb-6">
                    <div className={`w-[72px] h-[72px] md:w-20 md:h-20 rounded-2xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                      <Icon size={28} />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center text-xs font-bold text-primary-600 shadow-sm">
                      {idx + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-display font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 max-w-[220px] leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
