import React from 'react';
import { Camera, Compass, MapPin, Sparkles, Shield, Clock, TrendingUp, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import destinationsData from '@/data/destinations.json';

export async function generateStaticParams() {
  return destinationsData.destinations.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug) || { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), hidden_gems: [] };
  const firstGem = city.hidden_gems?.[0] || 'secret spots';
  
  return {
    title: `10+ Hidden Gems in ${city.name} (Unexplored Places 2026) | EkalGo`,
    description: `Discover ${firstGem} and other best hidden places in ${city.name}. Avoid the crowds and explore the secret spots of ${city.name} with EkalGo AI travel intelligence.`,
    alternates: {
       canonical: `https://ekalgo.com/hidden-gems/${citySlug}`
    }
  };
}

export default async function HiddenGemsPage({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!city) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">City data not found for SEO indexing.</div>;
  }

  // FAQ Schema for SEO Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": city.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-neon/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Hidden Gems', href: `/hidden-gems/${citySlug}` }
            ]} 
          />
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-neon/10 border border-accent-neon/20">
              <Sparkles size={14} className="text-accent-neon" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-neon">Curated Discovery</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight">
              Hidden Gems in <span className="text-gradient-gold">{city.name}.</span>
            </h1>
            <p className="text-blue-100/40 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
               Avoid the tourist traps. We've used AI to identify {city.hidden_gems.length}+ off-beat locations in {city.name} that most travelers miss.
            </p>
          </div>
        </div>
      </section>

      {/* Discovery Feed */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {city.hidden_gems.map((gem, idx) => (
            <div key={idx} className="group glass-panel p-8 space-y-6 hover:border-accent-gold/30 transition-all duration-500 overflow-hidden relative">
               {idx > 1 && (
                 <div className="absolute inset-0 z-20 bg-brand-900/40 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Shield size={32} className="text-accent-gold" />
                    <h4 className="font-bold">Premium Pin Locked</h4>
                    <p className="text-xs text-blue-100/40">This hidden location is only available in the EkalGo App for verified explorers.</p>
                    <button className="btn-primary py-2 px-6 rounded-lg text-xs font-bold shadow-glow-gold">Get Access</button>
                 </div>
               )}
               
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-brand-900 transition-all">
                     <Camera size={20} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                     <TrendingUp size={12} className="text-accent-teal" />
                     <span className="text-[10px] font-bold text-blue-100/40">TOP RATED</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold">{gem}</h3>
                  <p className="text-sm text-blue-100/30 leading-relaxed">
                    A secluded node in {city.name} identified as a top tier discovery for 2026. Optimized for morning visits to avoid crowds.
                  </p>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono text-blue-100/20 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                     <MapPin size={12} />
                     <span>{city.name} Peripheral</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Clock size={12} />
                     <span>Best: 7AM</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
         <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
               <p className="text-blue-100/40 text-sm">Everything you need to know about exploring hidden spots in {city.name}.</p>
            </div>
            
            <div className="space-y-6">
               {city.faq.map((item, idx) => (
                 <div key={idx} className="glass-panel p-6 space-y-3">
                    <div className="flex items-center gap-4 text-accent-gold">
                       <HelpCircle size={18} />
                       <h4 className="font-bold text-lg">{item.q}</h4>
                    </div>
                    <p className="pl-8 text-blue-100/40 leading-relaxed text-sm">
                       {item.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Internal Linking Bridge */}
      <section className="py-24 text-center max-w-4xl mx-auto px-6 space-y-12">
         <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">People Also Explored</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {city.getaways.map((getaway, i) => (
                 <Link 
                   key={i}
                   href={`/explore/${getaway.toLowerCase()}`}
                   className="px-6 py-3 rounded-full bg-white/5 border border-white/5 hover:border-accent-gold/30 hover:text-accent-gold transition-all text-sm font-bold"
                 >
                   {getaway} Guide
                 </Link>
               ))}
            </div>
         </div>
         <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-brand-800 to-brand-900 border border-white/5 relative overflow-hidden group">
            <h3 className="text-2xl font-display font-bold mb-6">Plan your {city.name} trip with AI.</h3>
            <Link href={`/explore/${citySlug}`} className="btn-primary py-4 px-10 rounded-full font-bold shadow-glow-gold inline-block">
               Unlock Full {city.name} Itinerary
            </Link>
         </div>
      </section>

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-white/5">
        <div className="space-y-8">
          <h3 className="text-xl font-bold">Share this Discovery</h3>
          <div className="flex justify-center">
            <ShareButtons 
               url={`/hidden-gems/${citySlug}`} 
               title={`10+ Hidden Gems in ${city.name}`} 
               city={city.name} 
            />
          </div>
        </div>
      </section>

      <LiveSocialProof city={city.name} />
      <WaitlistCTA />
    </div>
  );
}
