'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Utensils, Compass, ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

const TABS = [
  { id: 'hotels', label: 'Hotels', icon: Hotel },
  { id: 'food', label: 'Local Food', icon: Utensils },
  { id: 'places', label: 'Hidden Places', icon: Compass },
];

import destinations from '@/data/destinations.json';

const CONTENT = {
  hotels: [
    { name: 'The Himalayan Hideout', price: '₹2,500', rating: 4.8, vibe: 'Cozy / Budget', tags: ['Wifi', 'View'] },
    { name: 'Pine View Boutique', price: '₹5,200', rating: 4.9, vibe: 'Premium / Scenic', tags: ['Breakfast', 'Luxury'] },
    { name: 'River Edge Resort', price: '₹9,800', rating: 5.0, vibe: 'Ultra Luxury', tags: ['Pool', 'Spa'] },
  ],
  food: [
    { name: 'The Old Manali Cafe', price: '₹600', rating: 4.7, vibe: 'Backpacker Favorite', tags: ['Trout', 'Vibe'] },
    { name: 'Johnson’s Kitchen', price: '₹1,200', rating: 4.9, vibe: 'Fine Italian', tags: ['Wine', 'Ambience'] },
    { name: 'Street Soul Food', price: '₹250', rating: 4.5, vibe: 'Quick Bites', tags: ['Momos', 'Authentic'] },
  ],
  places: [
    { name: 'Secret Waterfall Trail', price: 'Free', rating: 5.0, vibe: 'Untouched Nature', tags: ['2h Trek', 'Private'] },
    { name: 'Local Weaving Center', price: '₹100', rating: 4.8, vibe: 'Cultural Discovery', tags: ['Workshop', 'Local'] },
    { name: 'Sunset Ridge Point', price: 'Free', rating: 4.9, vibe: 'Epic Views', tags: ['Easy Walk', 'Photos'] },
  ]
};

export default function SmartTravel() {
  const [activeTab, setActiveTab] = useState('hotels');
  const city = destinations[0]; // Manali

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container-tight">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="badge badge-primary mb-4">Smart Recommendations</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Hyper-Personalized <br />
            <span className="text-gradient-primary">for {city.name}</span>
          </h2>
          <p className="text-slate-500 text-lg">
            EkalGo doesn't just show lists. It shows what's best for YOUR budget in {city.name}. 
            Filtered by AI, verified by travelers.
          </p>
        </div>

        {/* Tab System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-[2rem] text-left transition-all min-w-[180px] lg:min-w-0 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                    <Icon size={20} className={isActive ? 'text-white' : 'text-slate-900'} />
                  </div>
                  <div>
                    <span className={`block text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-slate-400'}`}>Category</span>
                    <span className="font-display font-bold text-lg">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {CONTENT[activeTab].map((item, idx) => (
                  <div key={idx} className="card group cursor-default">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                        {activeTab === 'hotels' && <Hotel size={24} />}
                        {activeTab === 'food' && <Utensils size={24} />}
                        {activeTab === 'places' && <Compass size={24} />}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 font-bold text-xs">
                        <Star size={14} className="fill-current" />
                        {item.rating}
                      </div>
                    </div>

                    <h4 className="text-xl font-display font-bold text-slate-900 mb-2">{item.name}</h4>
                    <p className="text-sm text-slate-500 mb-4">{item.vibe}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                      <div className="text-slate-900 font-display font-bold text-lg">
                        {item.price} <span className="text-[10px] font-sans font-medium text-slate-400 uppercase">/ Avg.</span>
                      </div>
                      <Link 
                        href={`/explore/${city.id}`}
                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors"
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Day-wise Insight Card */}
                <div className="card border-dashed border-2 bg-slate-50/50 flex flex-col justify-center p-8">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary mb-6 shadow-sm">
                    <Clock size={24} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-slate-900 mb-3">Plan for {city.name}</h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    EkalGo has reserved 120+ selections for {city.name} based on budget limits between {city.budget_range}.
                  </p>
                  <Link href={`/explore/${city.id}`} className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all">
                    View Full Guide <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
