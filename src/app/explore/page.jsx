'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Sparkles, Loader2, MapPin, ArrowRight } from 'lucide-react';
import { getPlaceWithPhoto } from '@/services/api';
import { useModal } from '@/context/ModalContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import destinations from '@/data/destinations.json';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const { openWaitlist, openPreview } = useModal();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState('All');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const DESTINATIONS = destinations.destinations.map(d => ({
    title: d.name,
    type: d.tags[0], // e.g., 'Hill Station', 'Beach'
    budget: d.budget_range.split('-')[0].trim(),
    duration: '3-5 Days',
    tags: d.tags,
    photoUrl: d.image,
    id: d.id
  }));

  const CATEGORY_MAP = {
    'Hill Station': { label: 'Mountain Highs', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    'Beach': { label: 'Coastal Escapes', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    'Heritage': { label: 'Ancient Wonders', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    'Yoga': { label: 'Spiritual Hubs', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    'Nature': { label: 'Natural Sanctuaries', color: 'bg-green-50 text-green-600 border-green-200' },
    'Northeast': { label: 'Northeast Adventures', color: 'bg-rose-50 text-rose-600 border-rose-200' },
    'Desert': { label: 'Desert Magic', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    'Monsoon': { label: 'Monsoon Special', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  };

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      const enriched = await Promise.all(
        DESTINATIONS.map(async (d) => {
          try {
            const details = await getPlaceWithPhoto(d.title);
            return { 
              ...d, 
              photoUrl: details.photoUrl || d.photoUrl,
              rating: details.rating || d.rating 
            };
          } catch (e) {
            return d;
          }
        })
      );
      setPlaces(enriched);
      setLoading(false);
    }
    loadPlaces();
  }, []);

  const handlePreview = (place) => {
    openPreview({ 
      destination: {
        name: place.title,
        type: place.type,
        photoUrl: place.photoUrl,
      }
    });
  };

  const categories = ['All', ...new Set(DESTINATIONS.map(d => d.type))];

  const filteredPlaces = places.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-surface-alt to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="badge badge-primary mx-auto mb-4">
              <Compass size={14} />
              <span>Discovery Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Explore <span className="text-gradient-primary">Destinations</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
              Discover curated routes and hidden gems across India, powered by AI.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-soft focus-within:border-primary-400 focus-within:shadow-card transition-all">
              <Search className="ml-4 text-slate-400 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-3.5 px-4 text-slate-900 outline-none text-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-primary-400 text-white shadow-glow-primary'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-200 hover:text-primary-600'
                }`}
              >
                {cat === 'All' ? 'All Destinations' : CATEGORY_MAP[cat]?.label || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-tight">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="text-primary-400 animate-spin" size={40} />
              <p className="text-slate-400 text-sm">Loading destinations...</p>
            </div>
          ) : filteredPlaces.length === 0 ? (
            searchTerm.trim() !== '' ? (
              <div className="text-center py-20">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-6 shadow-soft border border-primary-100"
                >
                  <Sparkles size={32} />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                  Discover {searchTerm}
                </h3>
                <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
                  We don't have a pre-curated route for this yet, but our AI can generate a custom itinerary for you instantly.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handlePreview({ title: searchTerm, type: 'Custom', photoUrl: null })}
                    className="btn-primary"
                  >
                    Generate AI Itinerary <Sparkles size={16} />
                  </button>
                  <button
                    onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                    className="btn-outline"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <MapPin className="text-slate-200 mx-auto mb-4" size={48} />
                <p className="text-slate-500 text-lg mb-4">No destinations match your filters.</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                  className="btn-outline text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPlaces.map((place, idx) => (
                <motion.div
                  key={place.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={`/explore/${place.id}`}
                    className="card group cursor-pointer overflow-hidden p-0 block"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      {place.photoUrl ? (
                        <img
                          src={place.photoUrl}
                          alt={place.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <MapPin size={32} className="text-primary-400" />
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${CATEGORY_MAP[place.type]?.color || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {place.type}
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/90 backdrop-blur-sm text-slate-700 border border-white/50">
                        {place.duration}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1.5">
                        <h3 className="text-base font-display font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                          {place.title}
                        </h3>
                        {place.rating && (
                          <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md flex-shrink-0">
                            ⭐ {place.rating}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 mb-2">
                        {(place.tags || []).join(' • ')} · {place.budget}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-400">AI Curated Route</span>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Locked Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div
                  onClick={() => openWaitlist()}
                  className="card group cursor-pointer overflow-hidden p-0 border-dashed border-2 border-primary-200 hover:border-primary-400"
                >
                  <div className="h-44 bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles size={28} className="text-primary-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-600">Secret Destinations</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-sm text-slate-500 mb-3">Unlock exclusive hidden gems with early access.</p>
                    <span className="btn-primary text-xs px-4 py-2 min-h-0">
                      Join Waitlist <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary" size={40} /></div>}>
      <ExploreContent />
    </Suspense>
  );
}
