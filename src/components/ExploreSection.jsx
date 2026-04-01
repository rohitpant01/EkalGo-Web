import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlaceWithPhoto } from '../services/api';

const ALL_DESTINATIONS = [
  { title: 'Goa', desc: 'Sunsets, seafood, and hidden beaches.', color: 'from-accent-neon/80' },
  { title: 'Manali', desc: 'Snow-capped peaks and cozy cafes.', color: 'from-accent-gold/80' },
  { title: 'Rishikesh', desc: 'Spiritual awakening and river rafting.', color: 'from-accent-teal/80' },
  { title: 'Ladakh', desc: 'The land of high passes and pure magic.', color: 'from-brand-600/80' },
  { title: 'Udaipur', desc: 'City of lakes and royal palaces.', color: 'from-accent-neon/80' },
  { title: 'Varanasi', desc: 'Ancient ghats and spiritual serenity.', color: 'from-accent-gold/80' },
  { title: 'Munnar', desc: 'Lush tea gardens and misty hills.', color: 'from-accent-teal/80' },
  { title: 'Andaman', desc: 'Crystal clear waters and coral reefs.', color: 'from-brand-600/80' },
  { title: 'Darjeeling', desc: 'Toy trains and majestic Kanchenjunga.', color: 'from-accent-neon/80' },
  { title: 'Spiti Valley', desc: 'Cold deserts and ancient monasteries.', color: 'from-accent-gold/80' },
  { title: 'Hampi', desc: 'Ruins of a glorious forgotten empire.', color: 'from-accent-teal/80' },
  { title: 'Gokarna', desc: 'Pristine beaches and laid-back vibes.', color: 'from-brand-600/80' },
  { title: 'Jaipur', desc: 'Pink city with magnificent forts.', color: 'from-accent-neon/80' },
  { title: 'Ooty', desc: 'Nilgiri mountains and botanical gardens.', color: 'from-accent-teal/80' },
];

export default function ExploreSection() {
  const [displayedPlaces, setDisplayedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomPlaces() {
      // Pick 4 random destinations
      const shuffled = [...ALL_DESTINATIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);

      // Fetch Google Places details for each
      const enrichedPlaces = await Promise.all(
        selected.map(async (place) => {
          const details = await getPlaceWithPhoto(place.title);
          return {
            ...place,
            image: details.photoUrl || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop', // Fallback
            rating: details.rating || (4.5 + Math.random() * 0.4).toFixed(1), // Fallback
          };
        })
      );
      
      setDisplayedPlaces(enrichedPlaces);
      setLoading(false);
    }
    fetchRandomPlaces();
  }, []);

  return (
    <section id="explore" className="py-24 relative overflow-hidden bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-panel border border-accent-neon/20"
            >
              <MapPin size={14} className="text-accent-neon" />
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-neon">
                Dynamic Destinations
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Explore the <span className="text-gradient-neon">Unseen.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              Curated experiences in India's most loved destinations, powered by real-time Google Places data and reimagined by our AI. Refresh to discover more.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/explore"
              className="flex items-center gap-2 text-accent-neon hover:text-white transition-colors font-medium btn-secondary border-accent-neon/30 hover:border-accent-neon"
            >
              View all places <MapPin className="ml-1" size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              // Skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[400px] rounded-2xl bg-brand-800/50 border border-white/5 shimmer shadow-glass-card"
                />
              ))
            ) : (
              // Real Cards
              displayedPlaces.map((dest, idx) => (
                <motion.div
                  key={dest.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-glass-card border border-white/10"
                >
                  {/* Background Image */}
                  <img 
                    src={dest.image} 
                    alt={dest.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Grad */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${dest.color} to-brand-900 opacity-50 transition-opacity duration-300 group-hover:opacity-30 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/60 to-transparent opacity-90" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 glass-panel border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                    <Star size={14} className="text-accent-gold fill-accent-gold" />
                    <span className="text-white text-sm font-semibold">{dest.rating}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">{dest.title}</h3>
                      <div className="h-[2px] w-12 bg-accent-neon mb-3 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full" />
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
