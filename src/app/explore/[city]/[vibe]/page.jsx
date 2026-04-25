import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import LiveSocialProof from '@/components/LiveSocialProof';
import { Sparkles, HelpCircle, Shield, TrendingUp, Check, ArrowRight, Utensils, Zap, Camera, Compass } from 'lucide-react';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';
import Link from 'next/link';
import { BreadcrumbSchema, FAQSchema, DestinationSchema } from '@/components/SchemaComponents';

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
    return <div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-display font-bold">Destination not found.</div>;
  }

  const seo = generateSEOContent(cityData, vibe);
  const city = cityData;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100">
      <DestinationSchema data={city} />
      <FAQSchema faqs={seo.faqs} />
      <BreadcrumbSchema items={[
        { label: 'Explore', href: '/explore' },
        { label: city.name, href: `/explore/${citySlug}` },
        { label: vibe, href: `/explore/${citySlug}/${vibe}` }
      ]} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100 bg-slate-50/50">
        <div className="absolute inset-0 z-0">
          <img 
            src={city.image} 
            alt={`${vibe} vibes in ${city.name}`}
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: vibe, href: `/explore/${citySlug}/${vibe}` }
            ]} 
          />
          <div className="mt-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200">
              <Sparkles size={14} className="text-primary-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">{vibe} Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 capitalize">
              {vibe} in <span className="text-gradient-primary">{city.name}.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
               {seo.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Content Blocks */}
          <div className="lg:col-span-8 space-y-16">
            {seo.blocks.map((block, i) => (
              <div key={i} className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-slate-900">{block.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-body">
                  {block.text}
                </p>
              </div>
            ))}

            {/* Local Food Bridge */}
            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6 shadow-soft">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-glow-primary">
                     <Utensils size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">Taste the {city.name} Soul</h3>
               </div>
               <p className="text-slate-600 leading-relaxed">
                  While exploring the {vibe} side of {city.name}, you can't miss out on <strong>{city.local_food}</strong>. 
                  Our AI has identified the best artisanal spots to try this traditional delicacy away from the main tourist strips.
               </p>
            </div>
          </div>

          {/* Right: Sidebar Utility */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] sticky top-32 shadow-soft">
              <h4 className="text-lg font-bold mb-6 text-slate-900">Vibe Checklist</h4>
              <div className="space-y-4">
                {['Best in Early Morning', 'High Activity Node', 'Photography Friendly', 'AI Verified Path'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100">
                 <button className="w-full btn-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                    Open in EkalGo App <ArrowRight size={18} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Nav Silos */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-display font-bold text-slate-900">Explore Different Dimensions</h2>
            <div className="grid md:grid-cols-2 gap-6">
               <Link href={`/getaways/${citySlug}`} className="bg-white border border-slate-100 p-10 rounded-[2rem] hover:border-primary-300 transition-all group shadow-soft">
                  <Zap size={32} className="text-primary-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Weekend Escapes</h3>
                  <p className="text-xs text-slate-500">Quick recharges from {city.name} identified by AI.</p>
               </Link>
               <Link href={`/hidden-gems/${citySlug}`} className="bg-white border border-slate-100 p-10 rounded-[2rem] hover:border-primary-300 transition-all group shadow-soft">
                  <Camera size={32} className="text-primary-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Secret Spots</h3>
                  <p className="text-xs text-slate-500">The unmapped, low-crowd nodes in {city.name}.</p>
               </Link>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-display font-bold text-slate-900">{vibe.toUpperCase()} Strategy FAQ</h2>
               <p className="text-slate-500 text-sm">Key insights for {vibe} explorers in {city.name}.</p>
            </div>
            
            <div className="space-y-6">
               {seo.faqs.map((item, idx) => (
                 <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-4 text-primary-500">
                       <HelpCircle size={20} />
                       <h4 className="font-bold text-lg text-slate-900">{item.q}</h4>
                    </div>
                    <p className="pl-9 text-slate-500 leading-relaxed text-sm">
                       {item.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <LiveSocialProof city={city.name} />
      <WaitlistCTA />
    </div>
  );
}
