'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Wallet, Globe, Compass, 
  MapPin, Clock, Camera, Heart, CheckCircle2 
} from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';

const FEATURES = [
  {
    icon: Wallet,
    title: "Smart Budget Tracking",
    desc: "Set a budget and watch EkalGo optimize your trip in real-time. We account for every rupee spent on hotels, food, and transport.",
    color: "bg-emerald-50 text-emerald-500"
  },
  {
    icon: Compass,
    title: "Hidden Gem Discovery",
    desc: "Our AI skips the tourist traps and finds secret spots, quiet cafes, and local favorites that regular guides miss.",
    color: "bg-primary-50 text-primary-500"
  },
  {
    icon: Shield,
    title: "Verified Safety Scores",
    desc: "Every route and destination comes with a real-time safety score, ensuring peace of mind for solo and group travelers.",
    color: "bg-blue-50 text-blue-500"
  },
  {
    icon: Globe,
    title: "Offline Itineraries",
    desc: "No signal? No problem. Access your entire trip plan, maps, and booking details even when you're off the grid.",
    color: "bg-accent-50 text-accent"
  },
  {
    icon: Clock,
    title: "Real-time Adapting",
    desc: "Missed a bus or stayed too long at a cafe? EkalGo instantly reshuffles your day to keep you on track.",
    color: "bg-purple-50 text-purple-500"
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book highly-rated stays and experiences directly through the app with curated budget-friendly options.",
    color: "bg-amber-50 text-amber-500"
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge badge-primary mb-6"
            >
              Powering Your Adventures
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight"
            >
              Everything You Need to <br />
              <span className="text-gradient-primary">Explore Fearlessly.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              EkalGo combines cutting-edge AI with deep travel data to ensure every trip is perfectly balanced, safe, and strictly within your budget.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card bg-white p-10 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Detailed Section */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="badge badge-accent mb-6">Unfair Advantage</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8">
                The First AI That Actually <br />
                <span className="text-gradient-accent">Cares About Your Wallet.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Adaptive Pricing Engine</h4>
                    <p className="text-slate-500 leading-relaxed">Our engine scans thousands of local data points to give you the most accurate cost estimates for your specific travel dates.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary-50 text-primary flex items-center justify-center flex-shrink-0">
                    <Heart size={24} className="fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">High Vibe Selection</h4>
                    <p className="text-slate-500 leading-relaxed">We don't just find "cheap" places. We find spots that offer the best "vibe-to-cost" ratio, so your trip feels expensive without being so.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover"
                  alt="Traveler exploring"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                <p className="text-slate-900 font-bold mb-2">"EkalGo saved me ₹8k on my Himachal trip."</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                  <span className="text-xs text-slate-500 font-medium">Siddharth K.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
