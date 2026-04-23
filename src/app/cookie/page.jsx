'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cookie, Settings, ShieldCheck, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function CookiePage() {
  const cookieTables = [
    {
      category: "Essential Cookies",
      description: "These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or logging in.",
      cookies: [
        { name: "__Host-next-auth.csrf-token", purpose: "Security / CSRF Protection", duration: "Session" },
        { name: "next-auth.session-token", purpose: "Authentication & User Session", duration: "30 Days" },
        { name: "ekalgo_settings", purpose: "Saves your theme and language preferences", duration: "1 Year" }
      ]
    },
    {
      category: "Performance & Analytics",
      description: "These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.",
      cookies: [
        { name: "_ga", purpose: "Google Analytics — User Identification", duration: "2 Years" },
        { name: "_gid", purpose: "Google Analytics — Session Differentiation", duration: "24 Hours" },
        { name: "_gat", purpose: "Used to throttle request rate", duration: "1 Minute" }
      ]
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="badge badge-primary mb-6">Transparency Report</div>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight">
              Detailed <span className="text-gradient-primary">Cookie Policy.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              This policy provides detailed information about how and when EkalGo uses cookies on our platform. 
              <span className="block mt-4 text-sm font-bold text-slate-900 uppercase tracking-widest">Effective Date: April 23, 2026</span>
            </p>
          </motion.div>

          {/* Section 1: Introduction */}
          <section className="mb-20">
            <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Info size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Approach to Cookies</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  At EkalGo, we believe in being clear and open about how we collect and use data related to you. In the spirit of transparency, this policy provides detailed information about how and when we use cookies.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By continuing to visit or use our Services, you are agreeing to the use of cookies and similar technologies for the purposes we describe in this policy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Cookie Categories & Tables */}
          <div className="space-y-16">
            {cookieTables.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{cat.category}</h3>
                  <p className="text-slate-500 text-base leading-relaxed">{cat.description}</p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 font-bold text-slate-900">Cookie Name</th>
                        <th className="px-6 py-4 font-bold text-slate-900">Purpose</th>
                        <th className="px-6 py-4 font-bold text-slate-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cat.cookies.map((cookie, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-primary-600">{cookie.name}</td>
                          <td className="px-6 py-4 text-slate-600">{cookie.purpose}</td>
                          <td className="px-6 py-4 text-slate-500">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section 3: Managing Cookies */}
          <section className="mt-20 pt-20 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6">
                  <Settings size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">How to Control Cookies</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Most browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                </p>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Browser Specific Instructions:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {['Google Chrome', 'Safari', 'Firefox', 'Microsoft Edge'].map(b => (
                      <li key={b} className="text-sm text-slate-900 font-medium flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <HelpCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Questions about Cookies?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  If you have any questions about our use of cookies or other technologies, please email us at <span className="text-white font-mono">privacy@ekalgo.com</span>.
                </p>
                <Link href="/contact" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 w-full">
                  Contact Support
                </Link>
              </div>
            </div>
          </section>

          <footer className="mt-20 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs">
              © 2026 EkalGo Inc. All rights reserved. Part of our commitment to your digital safety.
            </p>
          </footer>

        </div>
      </div>
    </main>
  );
}
