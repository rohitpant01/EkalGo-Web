import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import { Sparkles, HelpCircle, Shield, TrendingUp } from 'lucide-react';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';

export async function generateMetadata({ params }) {
  const { city: citySlug, vibe } = await params;
  const cityData = destinationsData.destinations.find(d => d.slug === citySlug);
  
  if (!cityData) return { title: 'Explore | EkalGo' };

  const seo = generateSEOContent(cityData, vibe);
  
  return {
    title: seo.title,
    description: seo.meta,
    alternates: {
       canonical: `https://ekalgo.com/explore/${citySlug}/${vibe}`
    }
  };
}

export async function generateStaticParams() {
  const vibes = ['solo', 'romantic', 'budget'];
  // Phase A Rollout: All Curated Cities x 3 Vibes
  return destinationsData.destinations.flatMap((city) => 
    vibes.map(vibe => ({
      city: city.slug,
      vibe: vibe
    }))
  );
}

export default async function VibeExplorePage({ params }) {
  const { city: citySlug, vibe } = await params;
  const cityData = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!cityData) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">Destination not found.</div>;
  }

  const seo = generateSEOContent(cityData, vibe);
  const city = cityData.name;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-amber-500/30">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <img 
          src={cityData.image} 
          alt={`${city} ${vibe} guide`}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">{vibe} Travel Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9]">
               {vibe.charAt(0).toUpperCase() + vibe.slice(1)} <br />
              <span className="text-gradient-accent">Resonance in {city}.</span>
            </h1>
            
            <p className="text-blue-100/40 text-lg md:text-xl font-body leading-relaxed max-w-xl">
               {seo.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
             {seo.blocks.map((block, idx) => (
                <div key={idx} className="space-y-6">
                   <h2 className="text-4xl font-display font-bold">{block.title}</h2>
                   <p className="text-xl text-blue-100/50 leading-relaxed font-body">
                      {block.text}
                   </p>
                </div>
             ))}

             <div className="p-10 rounded-[2.5rem] bg-accent-gold/5 border border-accent-gold/10 flex items-start gap-8 shadow-2xl relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-accent-gold flex items-center justify-center shrink-0 shadow-glow-gold">
                   <Shield size={28} className="text-brand-900" />
                </div>
                <div className="space-y-3 relative z-10">
                   <h4 className="text-accent-gold font-bold uppercase tracking-widest text-[10px]">AI {vibe} Safety Protocol</h4>
                   <p className="text-blue-100/80 font-medium italic text-lg leading-relaxed">
                      "{seo.localTip}"
                   </p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <TrendingUp size={120} />
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-800/20 border-y border-white/5">
         <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-display font-bold">{vibe.toUpperCase()} Intelligence FAQ</h2>
               <p className="text-blue-100/40 text-sm">Key insights for {vibe} explorers in {city}.</p>
            </div>
            
            <div className="space-y-6">
               {seo.faqs.map((item, idx) => (
                 <div key={idx} className="glass-panel p-8 space-y-3">
                    <div className="flex items-center gap-4 text-accent-gold">
                       <HelpCircle size={24} />
                       <h4 className="font-bold text-xl">{item.q}</h4>
                    </div>
                    <p className="pl-10 text-blue-100/40 leading-relaxed text-lg font-body">
                       {item.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <WaitlistCTA />
      <Footer />
    </div>
  );
}
