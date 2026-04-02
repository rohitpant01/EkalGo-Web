'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, MapPin, Search, Filter, X, Zap, Trophy, Award, Ghost } from 'lucide-react';
import PlaceCard from '../PlaceCard';
import { useTabStore } from '@/context/tabStore';
import { useModal } from '@/context/ModalContext';
import { cn } from '@/utils/cn';

const ALL_DESTINATIONS = [
  { id: 1, name: 'Udaipur', type: 'temple', address: 'Lakes • Royal', rating: '4.9', photoUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600', duration: '3-4 Days' },
  { id: 2, name: 'Jaipur', type: 'market', address: 'Forts • Culture', rating: '4.8', photoUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600', duration: '3-4 Days' },
  { id: 3, name: 'Manali', type: 'mountains', address: 'Peaks • Snow', rating: '4.7', photoUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=600', duration: '4-5 Days' },
  { id: 4, name: 'Alleppey', type: 'nature', address: 'Backwaters • Peace', rating: '4.9', photoUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600', duration: '2-3 Days' },
  { id: 5, name: 'Rishikesh', type: 'spiritual', address: 'Ganges • Yoga', rating: '4.8', photoUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600', duration: '3-4 Days' },
  { id: 6, name: 'Hampi', type: 'heritage', address: 'Ruins • History', rating: '4.9', photoUrl: 'https://images.unsplash.com/photo-1605650130638-3f5f848b3017?auto=format&fit=crop&q=80&w=600', duration: '3-4 Days' },
  { id: 7, name: 'Varanasi', type: 'spiritual', address: 'Culture • Ancient', rating: '5.0', photoUrl: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=600', duration: '2-3 Days' },
  { id: 8, name: 'Goa', type: 'beach', address: 'Party • Coastal', rating: '4.6', photoUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600', duration: '4-5 Days' },
];

const CATEGORIES = [
  { id: 'all', label: 'All India', icon: <Compass size={14} /> },
  { id: 'spiritual', label: 'Spiritual', icon: <Sparkles size={14} /> },
  { id: 'mountains', label: 'Mountains', icon: <Trophy size={14} /> },
  { id: 'nature', label: 'Nature', icon: <Award size={14} /> },
  { id: 'beach', label: 'Beaches', icon: <Zap size={14} /> },
];

export default function ExploreView() {
  const { addTab } = useTabStore();
  const { openWaitlist } = useModal();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredPlaces = useMemo(() => {
    return ALL_DESTINATIONS.filter(p => {
      const matchFilter = filter === 'all' || p.type === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const handlePlaceClick = (place) => {
     openWaitlist({
       title: "Detailed Itinerary",
       description: "For detailed itinerary, download the app or join the waitlist to get the exciting rewards!"
     });
  };

  return (
    <div className="w-full h-full flex flex-col pt-8 px-8 space-y-12">
      
      {/* Header & Search */}
      <section className="space-y-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
               <h2 className="text-4xl font-bold text-white font-display tracking-tight uppercase">
                 Global <span className="text-gradient-gold">Explorer</span>
               </h2>
               <p className="text-blue-100/40 text-sm font-medium tracking-wide">
                 Browse our elite curation of {ALL_DESTINATIONS.length}+ major nodes in India.
               </p>
            </div>
            
            <div className="relative w-full md:w-80 group">
               <div className="absolute inset-y-0 left-4 flex items-center text-blue-100/20 group-focus-within:text-accent-gold transition-colors">
                  <Search size={18} />
               </div>
               <input 
                 type="text" 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search destinations..."
                 className="w-full bg-white/[0.03] border border-white/5 focus:border-accent-gold/40 focus:bg-white/[0.08] transition-all rounded-2xl py-3.5 pl-12 pr-6 text-sm outline-none font-medium"
               />
               {search && (
                 <button 
                   onClick={() => setSearch('')}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                 >
                   <X size={14} />
                 </button>
               )}
            </div>
         </div>

         {/* Filters Bar */}
         <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all shrink-0 active:scale-95",
                  filter === cat.id 
                  ? "bg-accent-gold text-brand-900 border-accent-gold shadow-glow-gold" 
                  : "bg-white/5 text-blue-100/40 border-white/5 hover:border-white/10 hover:text-white"
                )}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
         </div>
      </section>

      {/* Places Grid */}
      <section className="flex-1 min-h-0 pb-32">
        <AnimatePresence mode="popLayout">
           {filteredPlaces.length > 0 ? (
             <motion.div 
               layout
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
             >
                {filteredPlaces.map((place, idx) => (
                  <motion.div
                    layout
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <PlaceCard 
                      place={place} 
                      onClick={() => handlePlaceClick(place)}
                    />
                  </motion.div>
                ))}
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center justify-center py-24 text-center space-y-6"
             >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                   <Ghost size={40} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-xl font-bold text-white">No nodes detected</h4>
                   <p className="text-blue-100/40 text-sm">Expand center of resonance or reset filters.</p>
                </div>
                <button 
                  onClick={() => { setFilter('all'); setSearch(''); }}
                  className="px-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-accent-gold hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                  Reset Discovery
                </button>
             </motion.div>
           )}
        </AnimatePresence>
      </section>
    </div>
  );
}
