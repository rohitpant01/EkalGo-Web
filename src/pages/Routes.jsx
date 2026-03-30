import React from 'react';
import { Map, MapPin, Compass, Navigation, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Routes() {
  const routes = [
    { title: "Manali to Leh Highway", type: "Road Trip", distance: "473 km", highlights: ["Rohtang Pass", "Keylong", "Sarchu"], image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800" },
    { title: "Zanskar Frozen River Trek", type: "Expedition", distance: "105 km", highlights: ["Chadar", "Nerak Waterfall", "Tibba"], image: "https://images.unsplash.com/photo-1614094142994-3a95f5146c9a?auto=format&fit=crop&q=80&w=800" },
    { title: "Backwaters of Alappuzha", type: "Canoe Route", distance: "28 km", highlights: ["Vembanad Lake", "Kuttanad", "Marari"], image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-500 text-xs font-bold tracking-wider uppercase mb-4 border border-teal-500/20">
            Explorer's Curated
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Elite <span className="text-gradient-ocean">Destinations</span>
          </h1>
          <p className="text-blue-100/60 text-lg max-w-2xl font-body">
            Browse our hand-picked collection of legendary routes and off-beat expeditions across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, idx) => (
            <motion.div
              key={route.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass overflow-hidden rounded-[2.5rem] group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                    {route.type}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-teal-500 mb-2">
                  <Navigation size={14} />
                  <span className="text-xs font-bold tracking-wider uppercase">{route.distance}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors">
                  {route.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                   {route.highlights.map(h => (
                     <span key={h} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-blue-100/40 uppercase tracking-widest">{h}</span>
                   ))}
                </div>
                <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-white font-medium hover:bg-white/10 transition-all">
                   Explore Route
                   <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-1 bg-gradient-to-r from-teal-500/20 via-blue-500/10 to-transparent rounded-[3rem]"
        >
          <div className="glass p-12 rounded-[2.9rem] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/10 flex items-center justify-center">
                <Compass className="text-teal-500" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-semibold text-white">Need a Custom Route?</h3>
                <p className="text-blue-100/50">Our AI can build a unique path just for you.</p>
              </div>
            </div>
            <a href="/" className="px-10 py-4 rounded-2xl bg-teal-500 text-ocean-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-500/20">
              Start Planning
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
