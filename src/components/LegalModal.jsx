'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Info, ScrollText, Cookie } from 'lucide-react';

const LEGAL_CONTENT = {
  terms: {
    title: 'Terms of Service',
    icon: <ScrollText className="text-accent-gold" size={24} />,
    sections: [
      {
        subtitle: '1. Platform Status (Beta)',
        content: 'EkalGo is currently in early-access beta. Our AI-generated itineraries and data are for informational purposes only. travel at your own risk and verify all routes locally.'
      },
      {
        subtitle: '2. Intellectual Property',
        content: 'All discovery algorithms, UI designs, and brand assets are the exclusive property of EkalGo India. Unauthorized reproduction is strictly prohibited.'
      },
      {
        subtitle: '3. User Responsibility',
        content: 'By using our "Pulse Network" or "Global Explorer", you agree to maintain respectful conduct and acknowledge that real-time social data is crowdsourced and not verified.'
      },
      {
        subtitle: '4. No Liability',
        content: 'EkalGo is not responsible for travel delays, safety incidents, or data inaccuracies provided by our AI discovery engine.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <Lock className="text-accent-gold" size={24} />,
    sections: [
      {
        subtitle: '1. Data Collection',
        content: 'We only collect your email address if you voluntarily join our Waitlist. This data is used exclusively for platform updates and early access invitations.'
      },
      {
        subtitle: '2. Guest Identities',
        content: 'To provide a "Login-Free" experience, we use ephemeral guest IDs. This data is stored locally on your device and is not sold to third parties.'
      },
      {
        subtitle: '3. Real-time Presence',
        content: 'When using the "Pulse Network", your approximate location (within 10km) may be broadcast anonymously to other nearby explorers to facilitate discovery.'
      },
      {
        subtitle: '4. Data Security',
        content: 'We use Supabase for secure database management and encrypted connections to protect all communication between your device and our exploration nodes.'
      }
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    icon: <Cookie className="text-accent-gold" size={24} />,
    sections: [
      {
        subtitle: '1. Why We Use Cookies',
        content: 'We use functional cookies and local storage to remember your "Traveler Profile", search history, and guest ID without requiring a login.'
      },
      {
        subtitle: '2. Session Management',
        content: 'Functional cookies help us maintain your active discovery tabs and ensure the "Interactive Map" loads your current resonance center across page refreshes.'
      },
      {
        subtitle: '3. Third-Party Analytics',
        content: 'We may use anonymized analytics to measure platform performance and speed. These cookies do not contain personally identifiable information.'
      },
      {
        subtitle: '4. Your Choice',
        content: 'You can disable cookies in your browser settings, but please note that the "Login-Free" features of EkalGo may not function correctly.'
      }
    ]
  }
};

export default function LegalModal({ isOpen, onClose, type = 'terms' }) {
  const content = LEGAL_CONTENT[type] || LEGAL_CONTENT.terms;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#010912]/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20">
                  {content.icon}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-white font-display tracking-tight uppercase">{content.title}</h2>
                   <p className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] mt-1">EkalGo Platform Compliance</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-8 custom-scrollbar">
              {content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">{section.subtitle}</h3>
                   <p className="text-blue-100/40 text-sm leading-relaxed font-body">
                      {section.content}
                   </p>
                </div>
              ))}
              
              <div className="pt-12 border-t border-white/5 pb-8">
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                    <Info className="text-accent-gold shrink-0 mt-1" size={16} />
                    <p className="text-xs text-blue-100/40 leading-relaxed font-body">
                       For detailed inquiries regarding our {content.title}, please contact our Legal Resonance team at <span className="text-white font-bold">ekalgo.app@gmail.com</span>. We respond to all compliance requests within 48 exploration cycles.
                    </p>
                 </div>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
