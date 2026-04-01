import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: <FileText className="text-accent-gold" size={20} />,
      content: [
        "Personal Information: Name, email address (for waitlist or account)",
        "Usage Data: Pages visited, interactions, device/browser info",
        "Location Data: If you use route or travel features"
      ]
    },
    {
      title: "2. How We Use Your Information",
      icon: <ChevronRight className="text-accent-gold" size={20} />,
      content: [
        "Provide AI-generated travel itineraries",
        "Improve user experience and recommendations",
        "Communicate updates and early access information",
        "Ensure platform security"
      ]
    },
    {
      title: "3. Data Protection",
      icon: <Lock className="text-accent-gold" size={20} />,
      content: [
        "Encrypted data transmission (HTTPS)",
        "Secure servers and storage",
        "Limited access to personal data"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-teal/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6 font-mono text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em]">
            <Eye size={12} /> Compliance & Privacy
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-blue-100/60 font-body max-w-2xl mx-auto">
            Welcome to EkalGo. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information. 
            <span className="block mt-2 text-accent-gold/60 font-mono text-xs uppercase tracking-widest">Last Updated: April 2026</span>
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20">
                  {section.icon}
                </div>
                <h2 className="text-xl font-display font-bold text-white tracking-tight">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-blue-100/60 font-body leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Simple sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-white/5"
            >
              <h3 className="text-lg font-bold text-white mb-4">4. Third-Party Services</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed">
                We use analytics, Map APIs (Google), and AI services (Gemini, Groq) to enhance your experience. These services follow their own privacy standards.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-white/5"
            >
              <h3 className="text-lg font-bold text-white mb-4">5. Your Rights</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed">
                You have the right to access your data, request deletion, and opt-out of marketing communications at any time.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pt-12 pb-8 border-t border-white/5"
          >
            <p className="text-blue-100/40 text-sm mb-6 font-body">By using EkalGo, you agree to this Privacy Policy.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-1">Email Queries</span>
                <a href="mailto:ekalgo.app@gmail.com" className="text-white hover:text-accent-gold transition-colors font-mono">ekalgo.app@gmail.com</a>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest text-accent-teal font-bold mb-1">WhatsApp Support</span>
                <a href="https://wa.me/918474972007" className="text-white hover:text-accent-teal transition-colors font-mono">+91 84749 72007</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
