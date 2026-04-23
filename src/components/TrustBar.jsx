'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Route, Star } from 'lucide-react';

const STATS = [
  { icon: Users, value: '10,000+', label: 'Active Travelers', color: 'text-primary-500 bg-primary-50' },
  { icon: MapPin, value: '500+', label: 'Destinations', color: 'text-accent-600 bg-accent-50' },
  { icon: Route, value: '1,200+', label: 'Routes Created', color: 'text-blue-500 bg-blue-50' },
  { icon: Star, value: '4.9★', label: 'User Rating', color: 'text-amber-500 bg-amber-50' },
];

export default function TrustBar() {
  return (
    <section className="relative py-12 md:py-16 border-y border-slate-100 bg-white">
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className={`icon-box icon-box-md rounded-xl ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-display font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
