'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Map, Compass, Shield, Sparkles, Navigation } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'Hyper-Personalized AI',
    desc: 'Our AI engine calculates every detail of your itinerary based on your specific budget limits and pace. No more generic templates.',
    color: 'bg-primary-50 text-primary-500',
    tags: ['Next-Gen AI', 'Custom']
  },
  {
    icon: Compass,
    title: 'Hidden Gem Discovery',
    desc: 'Uncover secret spots in Himachal and Goa that are verified by our community but invisible to traditional travel agents.',
    color: 'bg-accent-50 text-accent-600',
    tags: ['Verified', 'Off-beat']
  },
  {
    icon: Navigation,
    title: 'Real-Time Cost Tracking',
    desc: 'See exactly where your money goes. EkalGo optimizes your routes and bookings to keep you under your daily budget limit.',
    color: 'bg-blue-50 text-blue-500',
    tags: ['Budget-first', 'Live']
  },
  {
    icon: Shield,
    title: 'Verified Community Trust',
    desc: 'Connect with a private network of travelers. Every profile is verified, ensuring a safe and reliable discovery experience.',
    color: 'bg-emerald-50 text-emerald-500',
    tags: ['Safe', 'Social']
  },
  {
    icon: Sparkles,
    title: 'Vibe-Based Matching',
    desc: 'Find travel partners who match your adventure style. From slow-paced explorers to extreme trek enthusiasts.',
    color: 'bg-purple-50 text-purple-500',
    tags: ['Social', 'Vibe']
  },
  {
    icon: Map,
    title: 'Smart Offline Guides',
    desc: 'Access your optimized plans and maps even in remote areas. Perfect for high-altitude treks where connectivity is low.',
    color: 'bg-rose-50 text-rose-500',
    tags: ['Offline-Ready', 'Hills']
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[400px] h-[400px] bg-primary-100/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[500px] h-[500px] bg-accent-100/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 w-fit mb-6"
          >
            <Sparkles size={14} className="text-primary-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Core Engine Features</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 tracking-tight"
          >
            Everything You Need to <br />
            <span className="text-gradient-primary">Explore with Confidence</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Powered by next-gen AI and designed for the modern explorer. We've removed the stress of planning so you can focus on the journey.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {feature.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {feature.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 text-[9px] font-black tracking-widest text-slate-400 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtle Arrow on hover */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                     <Navigation size={14} className="rotate-45" />
                   </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
