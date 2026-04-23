'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CreditCard, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const DAYS = [
  {
    day: 1,
    title: 'Arrival & Cafe Hopping',
    items: ['Check-in at Old Manali', 'Lunch at Lazy Dog Cafe', 'Hadimba Devi Temple visit', 'River side stroll'],
    cost: '₹2,100'
  },
  {
    day: 2,
    title: 'Adventure at Solang',
    items: ['Early bus to Solang Valley', 'Paragliding / Trekking', 'Anjani Mahadev Temple', 'Dinner at Johnson’s'],
    cost: '₹4,800'
  },
  {
    day: 3,
    title: 'Hidden Waterfalls',
    items: ['Jogini Falls Hike', 'Vashisht Hot Springs', 'Mall Road Shopping', 'Evening Departure'],
    cost: '₹3,100'
  }
];

export default function SampleItinerary() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="container-tight">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Map Placeholder Mock */}
            <div className="aspect-[4/5] md:aspect-[1/1.2] rounded-[3rem] bg-white shadow-2xl overflow-hidden border-8 border-white">
              {/* Stylized background only - No inaccurate pins */}
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <img 
                  src="/maps/india_map.png" 
                  alt="India Map" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Cost Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Estimated Trip Cost</span>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <TrendingUp size={14} /> 20% Saved
                  </div>
                </div>
                <div className="text-3xl font-display font-bold text-slate-900">₹10,000 <span className="text-sm font-sans font-medium text-slate-400">/ All inclusive</span></div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
          </motion.div>

          {/* Itinerary Steps */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-accent mb-4">Sample Itinerary</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                3 Days in Manali <br />
                <span className="text-gradient-accent">on a ₹10,000 Budget</span>
              </h2>
              <p className="text-slate-500 text-lg mb-12">
                See how EkalGo structures a real-world trip. We balance iconic landmarks with local secrets, ensuring you never overspend.
              </p>

              <div className="space-y-6">
                {DAYS.map((day, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-900 font-bold text-sm z-10">
                        {day.day}
                      </div>
                      {idx !== DAYS.length - 1 && <div className="w-0.5 h-full bg-slate-200 -mt-2 mb-2" />}
                    </div>
                    <div className="flex-1 pb-10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">{day.title}</h4>
                        <span className="text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{day.cost}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {day.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 size={14} className="text-primary-dark/40" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/explore?city=Manali" className="btn-accent inline-flex w-full md:w-auto mt-4 group">
                Plan My Own Trip <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
