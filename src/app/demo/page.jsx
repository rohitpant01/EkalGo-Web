'use client';

import React from 'react';
import EnhancedBudgetDemo from '@/components/EnhancedBudgetDemo';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Shield, Zap, Heart, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import FinalCTA from '@/components/FinalCTA';

export default function DemoPage() {
  return (
    <main className="min-h-screen pt-24 bg-slate-50/50">
      {/* Header Info */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="container-tight">
          <div className="max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-bold text-sm uppercase tracking-widest">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="badge badge-primary mb-6">Interactive Demo</div>
              <h1 className="text-5xl md:text-8xl font-display font-black text-slate-900 mb-8 tracking-tight leading-[1.05]">
                Plan Like a <br />
                <span className="text-gradient-primary">Pro. In Seconds.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed">
                Experience the magic of EkalGo. Use our interactive sandbox to see how AI transforms your travel budget into a premium adventure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Enhanced Demo Section */}
      <section className="pb-32">
        <div className="container-tight">
          <EnhancedBudgetDemo />
        </div>
      </section>

      {/* Deep Dive Features */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">The Tech Behind the Magic</h2>
            <p className="text-lg text-slate-500">Every selection you make triggers a cascade of data processing to ensure your safety and savings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Global Inventory", desc: "Real-time access to 500k+ verified locations.", color: "text-blue-500" },
              { icon: Shield, title: "Safety Matrix", desc: "Adaptive safety scores updated every hour.", color: "text-emerald-500" },
              { icon: Heart, title: "Vibe Matching", desc: "Social sentiment analysis for every venue.", color: "text-rose-500" },
              { icon: Users, title: "Community Driven", desc: "Data backed by millions of real traveler reviews.", color: "text-primary" }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:scale-[1.02] transition-transform">
                <f.icon className={`${f.color} mb-6`} size={32} />
                <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ / How it manages */}
      <section className="py-32 bg-slate-50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Traveler" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs animate-float">
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map(s => <Heart key={s} size={12} className="text-rose-500 fill-current" />)}
                </div>
                <p className="text-sm text-slate-900 font-bold italic">"I thought I couldn't afford Manali this season. EkalGo proved me wrong and made it look easy!"</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-10">Frequently Asked <br />About the Demo</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">How accurate are the costs?</h4>
                  <p className="text-slate-500 leading-relaxed">The costs shown in this demo are based on real-time seasonal averages for popular destinations like Manali and Goa.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">What is the Vibe Score?</h4>
                  <p className="text-slate-500 leading-relaxed">It's our proprietary metric that combines venue popularity, aesthetic quality, and traveler sentiment.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Can I book these directly?</h4>
                  <p className="text-slate-500 leading-relaxed">Yes! Once you generate an itinerary in the app, you can book hotels and transport with one tap.</p>
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
