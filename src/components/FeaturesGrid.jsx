'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Map, Compass, Shield, Sparkles, Navigation } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Itinerary Generator',
    desc: 'Generate optimized, day-by-day travel plans tailored exactly to your preferences and pace.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: Compass,
    title: 'Hidden Places Discovery',
    desc: 'Uncover secret spots, local gems, and offbeat trails that aren\'t swarming with tourists.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: Navigation,
    title: 'Smart Route Optimization',
    desc: 'Save time and money with AI-calculated routes that find the most efficient way to explore.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Shield,
    title: 'Real-time Safety Insights',
    desc: 'Travel confidently with live safety alerts, verified paths, and community trust scores.',
    color: 'bg-emerald-50 text-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    desc: 'From foodie tours to adventure sports — recommendations that match your exact vibe.',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Map,
    title: 'Offline Maps & Guides',
    desc: 'Seamlessly visualize your entire journey on interactive maps, even without connectivity.',
    color: 'bg-rose-50 text-rose-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white relative">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-primary mx-auto mb-4"
          >
            <Sparkles size={14} />
            <span>Powerful Features</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4"
          >
            Everything You Need to
            <br className="hidden sm:block" />
            <span className="text-gradient-primary"> Travel Smarter</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg"
          >
            Powered by AI, designed for explorers. Plan the perfect trip in seconds.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="card group cursor-default"
              >
                <div className={`icon-box icon-box-lg rounded-xl ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
