import React from 'react';
import { Camera, Compass, MapPin, Sparkles, Shield, Clock, TrendingUp, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';

export async function generateStaticParams() {
  // Phase A Rollout: All Curated Cities
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

  // Phase 4: Dynamic Quality Content Engine
  const seo = generateSEOContent(city, 'hidden-gems');

  // FAQ Schema for SEO Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seo.faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-slate-100 bg-slate-50/50">
        <div className="absolute inset-0 z-0">
          <img 
            src={city.image} 
            alt={`${city.name} hidden gems`}
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary-100/30 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Hidden Gems', href: `/hidden-gems/${citySlug}` }
            ]} 
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200">
            <Sparkles size={16} className="text-primary-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">2026 Hidden Gems List</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight text-slate-900">
            Secret <span className="text-gradient-primary italic">{city.name}.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
             {seo.intro}
          </p>
        </div>
      </section>

      {/* Content Depth Section */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {seo.blocks.map((block, i) => (
             <div key={i} className="space-y-4">
                <h2 className="text-3xl font-display font-bold text-slate-900">{block.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-body">
                   {block.text}
                </p>
             </div>
          ))}

          {/* Local Tip Box */}
          <div className="p-8 rounded-[2rem] bg-primary-50 border border-primary-200 flex flex-col md:flex-row items-center gap-8 group">
             <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-glow-primary">
                <Shield size={32} className="text-white" />
             </div>
             <div className="space-y-2 text-center md:text-left">
                <h4 className="text-primary-700 font-bold uppercase tracking-widest text-xs">Insider Tip Verified by EkalGo</h4>
                <p className="text-slate-700 font-medium italic">"{seo.localTip}"</p>
             </div>
          </div>
        </div>
      </section>

      {/* Discovery Feed */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {city.hidden_gems.map((gem, idx) => (
            <div key={idx} className="group bg-white border border-slate-100 p-8 space-y-6 hover:border-primary-200 transition-all duration-500 overflow-hidden relative shadow-soft hover:shadow-card rounded-[2.5rem]">
               {idx > 2 && (
                 <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Shield size={32} className="text-primary-500" />
                    <h4 className="font-bold text-slate-900">Premium Pin Locked</h4>
                    <p className="text-xs text-slate-500">This hidden location is only available in the EkalGo App for verified explorers.</p>
                    <button className="btn-primary py-2 px-6 rounded-lg text-xs font-bold">Get Access</button>
                 </div>
               )}
               
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                     <Camera size={20} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                     <TrendingUp size={12} className="text-emerald-500" />
                     <span className="text-[10px] font-bold text-slate-400">TOP RATED</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-slate-900">{gem}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    A secluded node in {city.name} identified as a top tier discovery for 2026. Optimized for morning visits to avoid crowds.
                  </p>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
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
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
               <p className="text-slate-500 text-sm">Everything you need to know about exploring hidden spots in {city.name}.</p>
            </div>
            
            <div className="space-y-6">
               {seo.faqs.map((item, idx) => (
                 <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 shadow-soft">
                    <div className="flex items-center gap-4 text-primary-500">
                       <HelpCircle size={18} />
                       <h4 className="font-bold text-lg text-slate-900">{item.q}</h4>
                    </div>
                    <p className="pl-8 text-slate-500 leading-relaxed text-sm">
                       {item.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-slate-100">
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-900">Share this Discovery</h3>
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
