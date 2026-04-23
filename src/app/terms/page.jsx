'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, AlertCircle, UserCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <ShieldCheck className="text-primary-500" size={24} />,
      content: "By accessing and using EkalGo, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Description of Service",
      icon: <Scale className="text-primary-500" size={24} />,
      content: "EkalGo provides an AI-powered travel planning and budget management platform. While we strive for accuracy, AI-generated itineraries are for informational purposes only and should be verified locally."
    },
    {
      title: "3. User Responsibilities",
      icon: <UserCheck className="text-primary-500" size={24} />,
      content: "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to use the platform in a lawful and respectful manner."
    },
    {
      title: "4. Limitation of Liability",
      icon: <AlertCircle className="text-primary-500" size={24} />,
      content: "EkalGo is not liable for any travel delays, safety incidents, or financial losses incurred while following an AI-generated itinerary. Travel at your own risk."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-slate-50">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto">
          
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="badge badge-primary mb-6">Legal Framework</div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Terms of <span className="text-gradient-primary">Service.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Last Updated: April 23, 2026. Please read these terms carefully before using the EkalGo platform.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-[2rem] bg-slate-900 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              If you have any questions regarding our terms, please contact our legal team.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">
              Contact Support
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
