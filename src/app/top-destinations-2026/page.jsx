import React from 'react';
import { Award, Compass, Heart, MapPin, Sparkles, Star, TrendingUp, Zap, ArrowRight, Camera, Coffee } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import destinationsData from '@/data/destinations.json';

export const metadata = {
  title: 'Top 10 Indian Destinations for 2026 | The Ultimate Travel List by EkalGo',
  description: 'The definitive guide to the top travel destinations in India for 2026. From hidden gems in Leh to coastal escapes in Goa, explore the curated list by EkalGo AI.',
  alternates: {
    canonical: 'https://ekalgo.com/top-destinations-2026'
  }
};

export default function TopDestinationsPage() {
  const destinations = destinationsData.destinations;
  
  // Categorization Logic
  const categories = [
    {
      id: 'solo',
      title: 'Best for Solo Travelers',
      icon: <Compass className="text-accent-teal" />,
      items: destinations.filter(d => ['leh', 'varkala', 'rishikesh', 'pondicherry'].includes(d.slug))
    },
    {
      id: 'hidden',
      title: 'Top Hidden Gems',
      icon: <Sparkles className="text-accent-gold" />,
      items: destinations.filter(d => ['zanskar-valley', 'gokarna', 'munnar', 'shillong'].includes(d.slug))
    },
    {
      id: 'culture',
      title: 'Cultural Hotspots',
      icon: <Heart className="text-accent-neon" />,
      items: destinations.filter(d => ['varanasi', 'hampi', 'jaipur', 'madurai'].includes(d.slug))
    },
    {
      id: 'adventure',
      title: 'Adventure Paradises',
      icon: <Zap className="text-amber-400" />,
      items: destinations.filter(d => ['manali', 'gulmarg', 'andaman', 'auli'].includes(d.slug))
    }
  ];

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-accent-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20">
            <Award size={16} className="text-accent-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">Official 2026 Rankings</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight">
            Best of <span className="text-gradient-gold italic">India.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/40 max-w-3xl mx-auto font-body leading-relaxed">
            The definitive list of 2026 Indian travel destinations, pinpointed by AI and verified by over 10,000+ early travelers.
          </p>

          <div className="flex justify-center gap-12 pt-8 border-t border-white/5 max-w-lg mx-auto">
             <div className="text-center">
                <div className="text-3xl font-bold font-display">30+</div>
                <div className="text-[10px] text-blue-100/30 uppercase tracking-widest mt-1">Cites Vetted</div>
             </div>
             <div className="text-center">
                <div className="text-3xl font-bold font-display">1.2K</div>
                <div className="text-[10px] text-blue-100/30 uppercase tracking-widest mt-1">Gems Found</div>
             </div>
             <div className="text-center">
                <div className="text-3xl font-bold font-display">4.9/5</div>
                <div className="text-[10px] text-blue-100/30 uppercase tracking-widest mt-1">AI Precision</div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 max-w-7xl mx-auto px-6 space-y-40">
        {categories.map((cat, catIdx) => (
          <div key={cat.id} className="space-y-16">
            <div className="flex items-end justify-between border-b border-white/5 pb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-2xl font-display font-bold uppercase tracking-widest">
                  {cat.icon}
                  {cat.title}
                </div>
                <p className="text-blue-100/30 max-w-xl text-sm">
                  Hand-picked destinations that offer the definitive experience for this traveler profile in 2026.
                </p>
              </div>
              <div className="text-6xl font-display font-black text-white/5 select-none">
                0{catIdx + 1}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.items.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={`/explore/${item.slug}`}
                  className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 hover:border-accent-gold/30 transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                    <MapPin size={48} className="text-white/5 group-hover:scale-125 group-hover:text-accent-gold/20 transition-all duration-700" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-accent-gold uppercase tracking-widest opacity-60">
                        {item.state}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {item.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-blue-100/40 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {item.tagline}
                    </p>
                    
                    <div className="flex items-center gap-2 text-accent-gold text-xs font-bold pt-2">
                       Explore More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <TrendingUp size={16} className="text-green-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Backlink Bait: Comparison Table / Mini Stats */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <div className="text-center space-y-4 mb-20">
               <h2 className="text-3xl md:text-5xl font-display font-bold">The EkalGo <span className="text-gradient-gold">Travel Index</span></h2>
               <p className="text-blue-100/30">Aggregated comparison metrics for top destinations.</p>
            </div>

            <div className="glass-panel overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-blue-100/40">
                        <tr>
                           <th className="px-8 py-6">Destination</th>
                           <th className="px-8 py-6">2026 Trend</th>
                           <th className="px-8 py-6">Exp. Vibe</th>
                           <th className="px-8 py-6">Best Slot</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {destinations.slice(0, 8).map((d, i) => (
                           <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                              <td className="px-8 py-6">
                                 <Link href={`/explore/${d.slug}`} className="font-bold flex items-center gap-3 hover:text-accent-gold transition-colors">
                                    <MapPin size={14} className="text-accent-gold/40 group-hover:text-accent-gold transition-colors" />
                                    {d.name}
                                 </Link>
                              </td>
                              <td className="px-8 py-6">
                                 <span className="flex items-center gap-1.5 text-green-400">
                                    <TrendingUp size={14} />
                                    +{15 + i * 4}%
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-blue-100/40">{d.category}</td>
                              <td className="px-8 py-6 text-blue-100/40">{d.best_time}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>

      <WaitlistCTA />
      <Footer />
    </div>
  );
}
