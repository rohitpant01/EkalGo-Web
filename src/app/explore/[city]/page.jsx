import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ShieldCheck, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import SampleItinerary from '@/components/SampleItinerary';
import AppShowcase from '@/components/AppShowcase';
import destinations from '@/data/destinations.json';

// 1. Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const cityId = params.city?.toLowerCase();
  const data = destinations.find(d => d.id === cityId) || destinations[0];
  
  return {
    title: `Budget Trip to ${data.name} | AI Itinerary & Cost Breakdown`,
    description: `Discover how to explore ${data.name} under budget. Get AI-generated itineraries, hidden gems, and travel partner matching for ${data.name}.`,
    alternates: {
      canonical: `https://ekalgo.com/explore/${data.id}`,
    },
    openGraph: {
      title: `Plan Your ${data.name} Adventure with EkalGo`,
      description: data.desc,
      images: [data.image],
    }
  };
}

export default function CityPage({ params }) {
  const cityId = params.city?.toLowerCase();
  const data = destinations.find(d => d.id === cityId) || destinations[0];

  // 2. Schema Markup (TouristDestination)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": data.name,
    "description": data.desc,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.state,
      "addressCountry": "IN"
    }
  };

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={data.image} 
          className="absolute inset-0 w-full h-full object-cover"
          alt={`${data.name} Travel Guide`}
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        
        <div className="container-tight relative z-10 text-center text-white">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white mb-8 transition-colors">
            <ChevronLeft size={16} /> Back to Explore
          </Link>
          <div>
            <div className="badge border-white/20 bg-white/10 text-white mb-4">Destination Guide</div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
              Explore <span className="text-primary-400">{data.name}</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Plan your perfect {data.name} trip within a budget of {data.budget_range}.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-y border-slate-100 py-8">
        <div className="container-tight">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">State</p>
              <p className="text-2xl font-display font-bold text-slate-900">{data.state}</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Hidden Spots</p>
              <p className="text-2xl font-display font-bold text-slate-900">{data.highlights.length}+ Verified</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Daily Budget</p>
              <div className="flex items-center justify-center gap-1">
                <p className="text-2xl font-display font-bold text-slate-900">₹{data.avg_cost_daily}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <div>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8">
                 Budget Traveling in {data.name}
               </h2>
               <p className="text-lg text-slate-500 leading-relaxed mb-10">
                 {data.name} is a breathtaking destination located in {data.state}. If you're planning a trip during its best time ([data.best_time]), EkalGo helps you uncover {data.highlights.length} secret spots that traditional guides miss.
               </p>
               
               <div className="space-y-6 mb-12">
                 <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Must Visit Places</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {data.highlights.map(spot => (
                     <div key={spot} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-bold text-slate-700">{spot}</span>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">AI-Verified Safety</h4>
                      <p className="text-sm text-slate-500">Every trail and stay in {data.name} is verified by our AI and community trust scores.</p>
                    </div>
                 </div>
               </div>
             </div>

             {/* Quick Plan Card */}
             <div className="lg:sticky lg:top-32 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white shadow-2xl overflow-hidden relative">
               <div className="noise-bg absolute inset-0 opacity-10" />
               <div className="relative z-10">
                  <div className="badge bg-primary-500 text-white border-none mb-6">Plan in 10 Seconds</div>
                  <h3 className="text-3xl font-display font-bold mb-6">Ready for {data.name}?</h3>
                  <p className="text-white/60 mb-10 leading-relaxed">
                    Generate a personalized {data.best_time} itinerary for {data.name} within your budget limit.
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                       <span className="text-sm font-medium opacity-60">Avg. Daily Budget</span>
                       <span className="font-bold">{data.budget_range}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                       <span className="text-sm font-medium opacity-60">Best Time to Visit</span>
                       <span className="font-bold">{data.best_time}</span>
                    </div>
                  </div>

                  <Link href="/demo" className="w-full h-14 rounded-2xl bg-primary-500 text-white font-bold text-sm flex items-center justify-center gap-2 group hover:bg-primary-600 transition-all">
                    Generate My Plan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Internal Linking to Nearby Cities */}
                  <div className="mt-10 pt-10 border-t border-white/10">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Nearby Destinations</p>
                     <div className="flex flex-wrap gap-3">
                        {data.nearby.map(nearbyId => {
                          const nearbyCity = destinations.find(d => d.id === nearbyId);
                          return (
                            <Link 
                              key={nearbyId}
                              href={`/explore/${nearbyId}`}
                              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold"
                            >
                              {nearbyCity?.name || nearbyId}
                            </Link>
                          );
                        })}
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Reuse High-Impact Components */}
      <SampleItinerary />
      <TrustBar />
      <AppShowcase />
    </main>
  );
}
