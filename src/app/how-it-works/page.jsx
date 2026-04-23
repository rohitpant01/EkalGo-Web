'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Brain, Map, Rocket, 
  ChevronRight, Smartphone, Wallet, Compass 
} from 'lucide-react';
import Link from 'next/link';
import FinalCTA from '@/components/FinalCTA';

const STEPS = [
  {
    id: '01',
    icon: Search,
    title: "Define Your Goal",
    desc: "Tell us where you want to go and what your budget is. Whether it's a weekend getaway or a month-long backpacking trip, we've got you covered.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: '02',
    icon: Brain,
    title: "AI Orchestration",
    desc: "Our AI engine scans thousands of hotels, cafes, and secret spots. It builds a perfect itinerary that balances must-see monuments with offbeat hidden gems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: '03',
    icon: Map,
    title: "Real-time Optimization",
    desc: "While you're on the road, EkalGo tracks your spending. If you overspend on a fancy lunch, it automatically suggests a budget-friendly stay for the night.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge badge-accent mb-6"
            >
              Simple. Smart. Seamless.
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight"
            >
              How EkalGo Works <br />
              <span className="text-gradient-accent">In Four Easy Steps.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              We've combined advanced AI with real-time budget tracking to take the stress out of travel planning.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container-tight">
          <div className="space-y-32">
            {STEPS.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img src={step.image} className="w-full h-full object-cover" alt={step.title} />
                  </div>
                  {/* Floating Number */}
                  <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12 text-9xl font-display font-black text-slate-900/5 select-none pointer-events-none">
                    {step.id}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary mb-8">
                    <step.icon size={32} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">{step.title}</h2>
                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm text-xs font-bold text-slate-600">
                      <Smartphone size={14} /> Mobile App
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm text-xs font-bold text-slate-600">
                      <Brain size={14} /> AI Processing
                    </div>
                  </div>
                </motion.div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Step CTA */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-10">
              <Rocket size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8">Ready to Launch Your Next Trip?</h2>
            <p className="text-xl text-slate-500 mb-12">Join EkalGo today and experience the future of travel planning.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore" className="btn-primary w-full sm:w-auto h-14 px-10 rounded-2xl flex items-center justify-center">
                Start Planning Now
              </Link>
              <Link href="/demo" className="btn-outline w-full sm:w-auto h-14 px-10 rounded-2xl flex items-center justify-center">
                View Example Trip
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
