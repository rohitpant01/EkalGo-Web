import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Sparkles, MapPin, Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { getPlaceWithPhoto } from '../services/api';
import PlaceCard from '../components/PlaceCard';
import PreviewModal from '../components/PreviewModal';
import WaitlistModal from '../components/WaitlistModal';

const DESTINATIONS = [
  // Beach Group
  { title: 'Goa', type: 'Beach', budget: 'Moderate', duration: '4-5 Days', tags: ['Party', 'Chill'] },
  { title: 'Varkala', type: 'Beach', budget: 'Budget', duration: '3-4 Days', tags: ['Cliffs', 'Surf'] },
  { title: 'Gokarna', type: 'Beach', budget: 'Budget', duration: '3-4 Days', tags: ['Hidden', 'Peace'] },
  
  // Mountains Group
  { title: 'Manali', type: 'Mountains', budget: 'Budget', duration: '3-4 Days', tags: ['Adventure', 'Snow'] },
  { title: 'Ladakh', type: 'Mountains', budget: 'Premium', duration: '7-10 Days', tags: ['Trek', 'Extreme'] },
  { title: 'Spiti Valley', type: 'Mountains', budget: 'Moderate', duration: '6-8 Days', tags: ['Cold Desert', 'Gompas'] },
  
  // Heritage/Culture Group
  { title: 'Udaipur', type: 'Heritage', budget: 'Premium', duration: '3-4 Days', tags: ['Lakes', 'Royal'] },
  { title: 'Jaipur', type: 'Heritage', budget: 'Moderate', duration: '3-4 Days', tags: ['Forts', 'Culture'] },
  { title: 'Hampi', type: 'Heritage', budget: 'Budget', duration: '3-4 Days', tags: ['History', 'Boulders'] },
  
  // Nature/Nature Group
  { title: 'Munnar', type: 'Nature', budget: 'Moderate', duration: '3-4 Days', tags: ['Tea', 'Hills'] },
  { title: 'Waynad', type: 'Nature', budget: 'Moderate', duration: '3-4 Days', tags: ['Forest', 'Waterfalls'] },
  { title: 'Coorg', type: 'Nature', budget: 'Moderate', duration: '2-3 Days', tags: ['Coffee', 'Mist'] },
];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      const enriched = await Promise.all(
        DESTINATIONS.map(async (d) => {
          const details = await getPlaceWithPhoto(d.title);
          return { ...d, ...details };
        })
      );
      setPlaces(enriched);
      setLoading(false);
    }
    loadPlaces();
  }, []);

  const handlePreview = (place) => {
    setActiveDestination({
      name: place.title,
      type: place.type,
      photoUrl: place.photoUrl,
    });
    setIsPreviewOpen(true);
  };

  const handleLockedClick = () => {
    setIsWaitlistOpen(true);
  };

  // Grouping logic for "3+1" strategy
  const categories = [...new Set(DESTINATIONS.map(d => d.type))];
  
  const groupedData = categories.map(cat => ({
    name: cat,
    items: places.filter(p => p.type === cat).slice(0, 3)
  }));

  const filteredGroups = groupedData.map(group => ({
    ...group,
    items: group.items.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-brand-900 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-neon/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 glass-panel border border-accent-gold/20"
            style={{ background: 'rgba(245,185,66,0.05)' }}>
            <Sparkles size={14} className="text-accent-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">
              Elite Curatory Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Explore <span className="text-gradient-gold">Legendary</span> Routes.
          </h1>
          <p className="text-blue-100/40 text-lg max-w-2xl mx-auto font-body">
            AI-orchestrated journeys tailored for the modern explorer. <br />
            Select a destination to preview its smart path.
          </p>
        </motion.div>

        {/* Enhanced Search */}
        <div className="max-w-2xl mx-auto mb-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold/20 to-accent-neon/20 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-brand-800/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden focus-within:border-accent-gold/40 transition-all">
            <Search className="ml-6 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by destination or niche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent py-5 px-6 text-white outline-none font-body placeholder-gray-500"
            />
          </div>
        </div>

        {/* Categorized Sections */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-24 gap-6">
              <div className="relative">
                 <Loader2 className="text-accent-gold animate-spin" size={48} />
                 <div className="absolute inset-0 blur-xl bg-accent-gold/20 animate-pulse" />
              </div>
              <p className="text-gray-400 font-mono animate-pulse uppercase tracking-[0.3em] text-[10px] text-center">
                 Accessing Global Travel Nodes...
              </p>
           </div>
        ) : (
          <div className="space-y-24">
            {filteredGroups.map((group, gIdx) => (
              <section key={group.name} className="space-y-10">
                <div className="flex items-end justify-between border-b border-white/5 pb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold/60">
                       <Compass size={16} />
                       <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Category: {group.name}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-4">
                      {group.name === 'Beach' ? 'Coastal Escapes' : 
                       group.name === 'Mountains' ? 'Mountain Highs' : 
                       group.name === 'Heritage' ? 'Ancient Wonders' : 'Natural Sanctuaries'}
                      <div className="h-[1px] w-12 bg-accent-gold/20" />
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-blue-100/30">
                    <ShieldCheck size={12} className="text-green-500/50" />
                    AI VERIFIED SELECTION
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* The 3 Real Cards */}
                  {group.items.map((place, idx) => (
                    <motion.div
                      key={place.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <PlaceCard 
                        onClick={() => handlePreview(place)}
                        place={{
                          name: place.title || place.name || 'Premium Route',
                          type: (place.type || 'default').toLowerCase(),
                          photoUrl: place.photoUrl,
                          address: (place.tags || []).join(' • ') || 'Elite Selection',
                          rating: place.rating || '5.0',
                          description: place.description || `AI-optimized path for ${place.title || 'this destination'}. Discover hidden gems and curated routes with EkalGo Intelligence.`,
                          duration: place.duration || '3-4 Days'
                        }} 
                      />
                    </motion.div>
                  ))}

                  {/* The 4th Locked Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <PlaceCard 
                      locked={true}
                      onLockedClick={handleLockedClick}
                      place={{
                        name: 'Secret Place',
                        type: group.name.toLowerCase(),
                        photoUrl: null,
                        address: 'APP EXCLUSIVE ACCESS',
                        rating: 'Premium',
                        description: 'This legendary route is locked for elite app members. Download EkalGo to reveal secret paths.',
                        duration: '4-7 Days'
                      }} 
                    />
                  </motion.div>
                </div>
              </section>
            ))}
          </div>
        )}

        {!loading && filteredGroups.length === 0 && (
           <div className="text-center py-24 glass-panel border border-white/5 rounded-3xl">
              <Zap className="text-accent-gold/20 mx-auto mb-6" size={48} />
              <p className="text-gray-400 text-lg font-body">No legendary routes match your current search.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-accent-gold hover:text-white transition-colors underline underline-offset-8 decoration-accent-gold/30"
              >
                Reset Search Filters
              </button>
           </div>
        )}

      </div>

      {/* Modals */}
      <PreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        destination={activeDestination}
        onWaitlistOpen={() => {
          setIsPreviewOpen(false);
          setIsWaitlistOpen(true);
        }}
      />
      
      <WaitlistModal 
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </div>
  );
}
