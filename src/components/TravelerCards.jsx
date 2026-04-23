'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, Star, Heart, Info, Users } from 'lucide-react';

const TRAVELERS = [
  {
    name: 'Kanika',
    age: 28,
    location: 'Delhi',
    bio: 'Explorer at heart 🌍 Mountains > Everything 🏔️',
    tags: ['Mountains', 'Roadtrips', 'Treks'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600'
  }
];

export default function TravelerCards() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-primary mb-4">New Feature</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Find the Perfect <br />
                <span className="text-gradient-primary">Travel Partner.</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Connect with like-minded travelers who share your vibe. EkalGo matches you based on your destination, budget, and travel interests.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Vibe Matching</h4>
                    <p className="text-sm text-slate-500">Our AI matches you with travelers who have similar pacing and interests.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Card Mockup (Mimicking User Screenshot) */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative w-[340px] aspect-[9/16] bg-white rounded-[2.5rem] shadow-premium overflow-hidden border-[8px] border-white"
            >
              <img 
                src={TRAVELERS[0].image} 
                className="w-full h-full object-cover" 
                alt={TRAVELERS[0].name}
              />
              
              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* User Info */}
              <div className="absolute bottom-24 left-6 right-6 text-white">
                <div className="flex items-end gap-2 mb-1">
                  <h3 className="text-3xl font-bold">{TRAVELERS[0].name}</h3>
                  <span className="text-2xl font-medium opacity-80">{TRAVELERS[0].age}</span>
                </div>
                <div className="flex items-center gap-1 mb-3 opacity-90">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">{TRAVELERS[0].location}</span>
                </div>
                <p className="text-sm leading-relaxed mb-4 line-clamp-2 opacity-90">
                  {TRAVELERS[0].bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRAVELERS[0].tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-xl active:scale-90 transition-transform">
                  <X size={28} strokeWidth={3} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-xl active:scale-90 transition-transform">
                  <Star size={24} fill="currentColor" />
                </button>
                <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-xl active:scale-90 transition-transform">
                  <Heart size={28} fill="currentColor" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Info size={16} />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
