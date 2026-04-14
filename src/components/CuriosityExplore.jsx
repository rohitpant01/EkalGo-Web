import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin, ArrowRight, Download } from 'lucide-react';
import PlaceCard from './PlaceCard';
import FeatureTeaser from './FeatureTeaser';
import { useModal } from '@/context/ModalContext';
import { useTabStore } from '@/context/tabStore';
import { redirectToAPK } from '@/utils/redirect';

const DISPLAY_DESTINATIONS = [
  {
    name: "Udaipur",
    type: "temple",
    photoUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600",
    address: "LAKES • ROYAL",
    rating: "4.9",
    description: "Experience the best of Udaipur. Budget: Premium | Duration: 3-4 Days",
    duration: "3-4 DAYS"
  },
  {
    name: "Jaipur",
    type: "market",
    photoUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600",
    address: "FORTS • CULTURE",
    rating: "4.8",
    description: "Experience the best of Jaipur. Budget: Moderate | Duration: 3-4 Days",
    duration: "3-4 DAYS"
  }
];

const LOCKED_DESTINATION = {
  name: "Hidden Gems Itinerary",
  type: "trek",
  photoUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600",
  address: "OFFBEAT • EXCLUSIVE",
  rating: "5.0",
  description: "Discover hidden places & smart itineraries curated by our high-speed AI engine.",
  duration: "4-5 DAYS"
};

export default function CuriosityExplore({ onExplore }) {
  const { openPreview } = useModal();
  const { addTab, setActiveTab } = useTabStore();

  const handleFeatureClick = () => {
    redirectToAPK();
  };

  return (
    <section id="explore-preview" className="py-8 relative overflow-hidden bg-brand-900 border-t border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-neon/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-panel border border-accent-gold/20"
            >
              <Compass size={14} className="text-accent-gold" />
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-gold">
                Elite Curation
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white font-display tracking-tight"
            >
              Explore the <span className="text-gradient-gold">Unseen.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-100/40 text-lg leading-relaxed font-body"
            >
              Showing the best of India. Unlock our AI engine to discover the secret stories and hidden corners tourist maps miss.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={handleFeatureClick}
              className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors font-medium border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 backdrop-blur-md shadow-glow-gold/10 active:scale-95 transition-all"
            >
              Download App <ArrowRight className="ml-1" size={16} />
            </button>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {DISPLAY_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <PlaceCard 
                place={dest} 
                travelersCount={idx === 0 ? 5 : 11} 
                onClick={() => handlePreview(dest)}
              />
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <PlaceCard 
              place={LOCKED_DESTINATION} 
              onClick={() => handlePreview(LOCKED_DESTINATION)}
            />
          </motion.div>
        </div>


        {/* Horizontal Feature Teasers */}
        <div className="pt-24 border-t border-white/5 space-y-12">
           <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                 <h3 className="text-2xl font-bold text-white font-display">Premium AI Features</h3>
                 <p className="text-blue-100/40 text-sm">Powerful travel modules coming in early access.</p>
              </div>
              <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase tracking-widest animate-pulse">
                 <Sparkles size={14} />
                 Beta Version Active
              </div>
           </div>

           <FeatureTeaser />
        </div>

      </div>
    </section>
  );
}
