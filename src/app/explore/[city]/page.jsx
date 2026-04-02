import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Link from 'next/link';
import { Compass, Sparkles, Shield, Camera, Clock, TrendingUp, HelpCircle } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const city = cityParam.charAt(0).toUpperCase() + cityParam.slice(1);
  return {
    title: `Explore ${city} Like a Local: 2026 AI Travel Guide | EkalGo`,
    description: `The definitive guide to ${city}. Discover hidden gems, top attractions, and local secrets in ${city} with EkalGo AI travel intelligence.`,
    alternates: {
       canonical: `https://ekalgo.com/explore/${cityParam}`
    }
  };
}

export async function generateStaticParams() {
  // Phase A Rollout: First 30 Priority Cities
  return destinationsData.destinations.slice(0, 30).map((city) => ({
    city: city.slug,
  }));
}

export default async function CityExplorePage({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const cityData = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!cityData) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">City data not found for SEO.</div>;
  }

  // Phase 4: Dynamic Quality Content Engine
  const seo = generateSEOContent(cityData, 'explore');

  const city = cityData.name;

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
              <Sparkles size={14} className="text-accent-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">Official City Hub</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-display font-bold leading-[0.9]">
              Explore <br />
              <span className="text-gradient-gold">{city}.</span>
            </h1>
            
            <p className="text-blue-100/40 text-lg md:text-xl font-body leading-relaxed max-w-xl">
               {seo.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main Authority Content (Phase 4 Depth) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Left Column: Deep Content */}
          <div className="lg:col-span-8 space-y-20">
             {seo.blocks.map((block, idx) => (
                <div key={idx} className="space-y-6">
                   <h2 className="text-4xl font-display font-bold">{block.title}</h2>
                   <p className="text-xl text-blue-100/50 leading-relaxed font-body">
                      {block.text}
                   </p>
                </div>
             ))}

             {/* Local Tip Box */}
             <div className="p-10 rounded-[2.5rem] bg-accent-gold/5 border border-accent-gold/10 flex items-start gap-8 shadow-2xl relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-accent-gold flex items-center justify-center shrink-0 shadow-glow-gold">
                   <Shield size={28} className="text-brand-900" />
                </div>
                <div className="space-y-3 relative z-10">
                   <h4 className="text-accent-gold font-bold uppercase tracking-widest text-[10px]">EkalGo Pro Recommendation</h4>
                   <p className="text-blue-100/80 font-medium italic text-lg leading-relaxed">
                      "{seo.localTip}"
                   </p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <TrendingUp size={120} />
                </div>
             </div>
          </div>

          {/* Right Column: Silo Navigation */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 space-y-8 sticky top-32">
               <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display uppercase tracking-widest text-[10px] text-blue-100/30">City Navigation</h3>
                  <p className="text-sm font-bold">Deep Dive into {city}</p>
               </div>
               
               <div className="space-y-3">
                  <Link href={`/hidden-gems/${citySlug}`} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-gold/30 hover:bg-accent-gold/5 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold transition-colors group-hover:bg-accent-gold group-hover:text-brand-900">
                           <Camera size={18} />
                        </div>
                        <span className="text-sm font-bold">Hidden Gems</span>
                     </div>
                     <span className="text-blue-100/20 text-xs font-mono uppercase tracking-widest">Explore</span>
                  </Link>

                  <Link href={`/itinerary/${citySlug}/3-day-trip`} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-teal/30 hover:bg-accent-teal/5 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal transition-colors group-hover:bg-accent-teal group-hover:text-brand-900">
                           <Clock size={18} />
                        </div>
                        <span className="text-sm font-bold">3-Day Itinerary</span>
                     </div>
                     <span className="text-blue-100/20 text-xs font-mono uppercase tracking-widest">Plan</span>
                  </Link>

                  <Link href={`/getaways/${citySlug}`} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-neon/30 hover:bg-accent-neon/5 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon transition-colors group-hover:bg-accent-neon group-hover:text-brand-900">
                           <TrendingUp size={18} />
                        </div>
                        <span className="text-sm font-bold">Weekend Trips</span>
                     </div>
                     <span className="text-blue-100/20 text-xs font-mono uppercase tracking-widest">Escapes</span>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-24 bg-brand-800/20 border-y border-white/5">
         <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-display font-bold">Trip Planning Intelligence</h2>
               <p className="text-blue-100/40 text-sm">Commonly asked questions curated by AI for travelers heading to {city}.</p>
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

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-white/5">
        <div className="space-y-8">
          <h3 className="text-xl font-bold font-display">Share this {city} Guide</h3>
          <div className="flex justify-center">
            <ShareButtons 
               url={`/explore/${citySlug}`} 
               title={`AI Travel Guide for ${city}`} 
               city={city} 
            />
          </div>
        </div>
      </section>

      <LiveSocialProof city={city} />
      <WaitlistCTA />
      <Footer />
    </div>
  );
}
