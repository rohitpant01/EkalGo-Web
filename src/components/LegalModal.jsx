'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Info, ScrollText, Cookie } from 'lucide-react';

const LEGAL_CONTENT = {
  terms: {
    title: 'Terms of Service',
    icon: <ScrollText className="text-primary-500" size={24} />,
    sections: [
      {
        subtitle: '1. Platform Status (Beta)',
        content: 'EkalGo is currently in early-access beta. Our AI-generated itineraries and data are for informational purposes only. Travel at your own risk and verify all routes locally.'
      },
      {
        subtitle: '2. Intellectual Property',
        content: 'All discovery algorithms, UI designs, and brand assets are the exclusive property of EkalGo India. Unauthorized reproduction is strictly prohibited.'
      },
      {
        subtitle: '3. User Responsibility',
        content: 'By using our platform, you agree to maintain respectful conduct and acknowledge that real-time social data is crowdsourced and not verified.'
      },
      {
        subtitle: '4. No Liability',
        content: 'EkalGo is not responsible for travel delays, safety incidents, or data inaccuracies provided by our AI discovery engine.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <Lock className="text-primary-500" size={24} />,
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
        subtitle: '3. Data Security',
        content: 'We use secure database management and encrypted connections to protect all communication between your device and our exploration nodes.'
      }
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    icon: <Cookie className="text-primary-500" size={24} />,
    sections: [
      {
        subtitle: '1. Why We Use Cookies',
        content: 'We use functional cookies and local storage to remember your search history and preferences without requiring a login.'
      },
      {
        subtitle: '2. Third-Party Analytics',
        content: 'We may use anonymized analytics to measure platform performance and speed. These cookies do not contain personally identifiable information.'
      },
      {
        subtitle: '3. Your Choice',
        content: 'You can disable cookies in your browser settings, but please note that some features of EkalGo may not function correctly.'
      }
    ]
  }
};

export default function LegalModal({ isOpen, onClose, type = 'terms' }) {
  const content = LEGAL_CONTENT[type] || LEGAL_CONTENT.terms;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100">
                  {content.icon}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-slate-900 font-display tracking-tight uppercase">{content.title}</h2>
                   <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mt-1">Platform Compliance</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
              {content.sections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{section.subtitle}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed">
                      {section.content}
                   </p>
                </div>
              ))}
              
              <div className="pt-8 border-t border-slate-100">
                 <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                    <Info className="text-primary-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-slate-500 leading-relaxed">
                       For detailed inquiries regarding our {content.title}, please contact our legal team at <span className="text-slate-900 font-bold">ekalgo.app@gmail.com</span>.
                    </p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
