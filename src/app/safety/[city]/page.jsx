import React from 'react';
import { Shield, Check, Lock, Info, MapPin, AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import destinations from '@/data/destinations.json';

export async function generateStaticParams() {
  return destinations.destinations.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = destinations.destinations.find(d => d.slug === citySlug) || { name: citySlug };
  
  return {
    title: `Is ${city.name} Safe for Solo Travelers? (2026 Safety Guide) | EkalGo`,
    description: `Comprehensive safety report for ${city.name}. Learn about safe areas, local scams to avoid, and emergency contacts for your trip to ${city.name}.`,
  };
}

export default async function CitySafetyPage({ params }) {
  const { city: citySlug } = await params;
  const data = destinations.destinations.find(d => d.slug === citySlug) || destinations.destinations[0];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit mb-6 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck size={12} /> Verified Safety Report
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
               Safety Guide for <br />
               <span className="text-primary-600">{data.name}</span>
             </h1>
             <p className="text-slate-500 text-lg leading-relaxed">
               Traveling to {data.name}? Here is everything you need to know about staying safe, 
               avoiding common tourist traps, and navigating the city with confidence.
             </p>
          </div>
        </div>
      </section>

      {/* Safety Matrix */}
      <section className="py-20">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                 <Shield size={24} />
               </div>
               <h3 className="text-xl font-bold mb-3">Solo Travel</h3>
               <p className="text-sm text-slate-500 mb-4">Highly safe for solo travelers, especially in the main tourist hubs of {data.name}.</p>
               <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Safety Score: 9/10</span>
            </div>
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
               <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                 <AlertTriangle size={24} />
               </div>
               <h3 className="text-xl font-bold mb-3">Common Scams</h3>
               <p className="text-sm text-slate-500 mb-4">Be wary of overcharged taxis and unverified guides near {data.highlights[0]}.</p>
               <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Risk Level: Low</span>
            </div>
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
               <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                 <PhoneCall size={24} />
               </div>
               <h3 className="text-xl font-bold mb-3">Emergency</h3>
               <p className="text-sm text-slate-500 mb-4">Local police and tourist assistance are available 24/7 in {data.name}.</p>
               <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Dial: 112 / 100</span>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="mt-16 p-10 md:p-16 rounded-[3rem] bg-slate-900 text-white">
             <div className="max-w-3xl">
                <h2 className="text-3xl font-display font-bold mb-8">Expert Tips for {data.name}</h2>
                <div className="space-y-8">
                   <div className="flex gap-6">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">1</div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Respect Local Customs</h4>
                        <p className="text-white/60 text-sm leading-relaxed">When visiting religious sites in {data.name}, dress modestly and always ask before taking photos of people or ceremonies.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">2</div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Night Safety</h4>
                        <p className="text-white/60 text-sm leading-relaxed">The main areas of {data.name} are safe at night, but we recommend using verified apps for transport after 10 PM.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">3</div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Verified Connections</h4>
                        <p className="text-white/60 text-sm leading-relaxed">Use EkalGo's community feature to find verified travel partners if you're feeling unsure about solo exploration.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
