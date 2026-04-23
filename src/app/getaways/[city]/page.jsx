import React from 'react';
import { MapPin, Zap, Clock, ArrowRight, Shield, Compass, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import WaitlistCTA from '@/components/WaitlistCTA';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';
import Link from 'next/link';

export async function generateStaticParams() {
  // Phase A Rollout: All Curated Cities
  return destinationsData.destinations.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug) || { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), getaways: [] };
  const topGetaway = city.getaways?.[0] || 'nearby spots';
  
  return {
    title: `15+ Weekend Getaways from ${city.name} (Short Trips 2026) | EkalGo`,
    description: `Ultimate list of best weekend getaways from ${city.name} - including ${topGetaway} and other hill stations and heritage spots for your next quick escape.`,
    alternates: {
       canonical: `https://ekalgo.com/getaways/${citySlug}`
    }
  };
}

export default async function GetawaysPage({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!city) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">Base city not found for getaways generation.</div>;
  }

  // Phase 4: Dynamic Quality Content Engine
  const seo = generateSEOContent(city, 'getaways');

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100 bg-slate-50/50">
        <div className="absolute inset-0 z-0">
          <img 
            src={city.image} 
            alt={`Getaways from ${city.name}`}
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Getaways', href: `/getaways/${citySlug}` }
            ]} 
          />
          <div className="text-center space-y-6 mt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 border border-primary-200">
              <Zap size={14} className="text-primary-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">Short Escapes</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900">
              Getaways from <span className="text-gradient-primary">{city.name}.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
               {seo.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Content Depth Section */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="space-y-4">
             <h2 className="text-3xl font-display font-bold text-slate-900">{seo.blocks[1].title}</h2>
             <p className="text-lg text-slate-600 leading-relaxed font-body">
                {seo.blocks[1].text}
             </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-primary-50 border border-primary-100 flex flex-col md:flex-row items-center gap-8 group">
             <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-glow-primary">
                <Shield size={32} className="text-white" />
             </div>
             <div className="space-y-2">
                <h4 className="text-primary-700 font-bold uppercase tracking-widest text-xs">Verified Local Insight</h4>
                <p className="text-slate-700 font-medium italic">"{seo.localTip}"</p>
             </div>
          </div>
        </div>
      </section>

      {/* Getaway List */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {city.getaways.map((getawaySlug, idx) => {
            const getaway = destinationsData.destinations.find(d => d.slug === getawaySlug.toLowerCase().replace(/\s+/g, '-')) || { name: getawaySlug, tagline: 'Explore the unexplored route.' };
            return (
              <div key={idx} className="group border border-slate-100 hover:border-primary-200 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white shadow-soft hover:shadow-card">
                <div className="flex flex-col lg:flex-row gap-8 p-6 items-center">
                  <div className="lg:w-1/3 aspect-video lg:aspect-square rounded-2xl overflow-hidden shrink-0">
                    <img 
                      src={getaway.image || city.image} 
                      alt={getaway.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="lg:w-2/3 space-y-6">
                    <div className="flex items-center gap-2 text-primary-600">
                       <MapPin size={24} />
                       <h3 className="text-3xl font-display font-bold text-slate-900">{getaway.name}</h3>
                    </div>
                    <p className="text-slate-500 text-lg">
                      {getaway.tagline}. Perfect for a quick recharge escape from {city.name}.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-6">
                       <Link 
                         href={`/explore/${getawaySlug.toLowerCase().replace(/\s+/g, '-')}`}
                         className="btn-primary py-3 px-8 rounded-full font-bold inline-flex items-center gap-3 transition-transform group-hover:scale-105"
                       >
                         View Full Guide
                         <ArrowRight size={18} />
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking Bridge */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-display font-bold text-slate-900">More Discovery Silos for {city.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
               <Link href={`/hidden-gems/${citySlug}`} className="bg-white border border-slate-100 p-10 rounded-[2rem] hover:border-primary-300 transition-all group shadow-soft">
                  <Camera size={32} className="text-primary-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Hidden Gems near {city.name}</h3>
                  <p className="text-xs text-slate-500">Avoid the crowds with AI-pinpointed secret nodes near the city.</p>
               </Link>
               <Link href={`/explore/${citySlug}`} className="bg-white border border-slate-100 p-10 rounded-[2rem] hover:border-primary-300 transition-all group shadow-soft">
                  <Compass size={32} className="text-primary-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Complete {city.name} Guide</h3>
                  <p className="text-xs text-slate-500">The central authority hub for culture, history and daily vibes.</p>
               </Link>
            </div>
         </div>
      </section>

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-slate-100">
        <div className="space-y-8">
          <h3 className="text-xl font-bold font-display text-slate-900">Share these Getaways</h3>
          <div className="flex justify-center">
            <ShareButtons 
               url={`/getaways/${citySlug}`} 
               title={`15+ Weekend Getaways from ${city.name}`} 
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
