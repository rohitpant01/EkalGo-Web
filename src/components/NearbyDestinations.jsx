'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import destinationsData from '@/data/destinations.json';

export default function NearbyDestinations({ location }) {
  // Find the current destination in the JSON
  const currentDest = destinationsData.destinations.find(
    d => d.name.toLowerCase() === location?.toLowerCase() || 
         d.slug.toLowerCase() === location?.toLowerCase()
  );

  if (!currentDest || !currentDest.getaways || currentDest.getaways.length === 0) {
    return null;
  }

  // Map getaway names to full destination objects if they exist
  const relatedPotentials = currentDest.getaways.map(gName => {
    return destinationsData.destinations.find(d => d.name.toLowerCase() === gName.toLowerCase()) || {
      name: gName,
      slug: gName.toLowerCase().replace(/\s+/g, '-'),
      isPlaceholder: true
    };
  });

  return (
    <section className="py-12 border-t border-white/5 mt-16">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <Compass size={20} className="text-accent-gold" />
            Related Resonance
          </h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Next Discovery Nodes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPotentials.map((dest, idx) => (
          <Link 
            key={idx} 
            href={dest.isPlaceholder ? `/explore/${dest.slug}` : `/explore/${dest.slug}`}
            className="group relative"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="h-full p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-accent-gold/20 hover:bg-accent-gold/[0.02] transition-all overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent-gold transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2 italic">
                      {dest.tagline || `Extend your resonance from ${currentDest.name} to ${dest.name}.`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-gold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Explore Now
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
