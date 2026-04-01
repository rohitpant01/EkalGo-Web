import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle, MessageSquare, Zap } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      title: "🔒 Data Security",
      icon: <Lock className="text-accent-gold" size={20} />,
      content: [
        "All data is encrypted using HTTPS protocols",
        "Secure backend architecture",
        "Regular monitoring and updates"
      ]
    },
    {
      title: "🧠 AI Safety",
      icon: <Zap className="text-accent-neon" size={20} />,
      content: [
        "AI-generated itineraries are optimized but users should verify details",
        "No sensitive personal data is used in AI processing"
      ]
    },
    {
      title: "📍 Travel Safety",
      icon: <Shield className="text-accent-teal" size={20} />,
      content: [
        "Routes are generated based on available data",
        "Users are advised to follow local guidelines and safety measures"
      ]
    },
    {
      title: "🛡️ Account Protection",
      icon: <CheckCircle2 className="text-green-400" size={20} />,
      content: [
        "Secure authentication systems (Future)",
        "Encrypted credentials"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-neon/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-neon/10 border border-accent-neon/20 mb-6 font-mono text-[10px] font-bold text-accent-neon uppercase tracking-[0.2em]">
            <Shield size={12} /> Privacy & Safety HUD
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            EkalGo <span className="text-gradient-gold">Security</span>
          </h1>
          <p className="text-blue-100/60 font-body max-w-2xl mx-auto">
            At EkalGo, we prioritize your safety and data security. We implement multi-layer protection to ensure your travel intelligence remains private and your adventures remain secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-accent-gold/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-800 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-display font-bold text-white tracking-tight">{feature.title}</h2>
              </div>
              <ul className="space-y-4">
                {feature.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-blue-100/60 text-sm font-body leading-relaxed">
                    <CheckCircle2 size={14} className="text-accent-gold/40 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer & Report */}
        <div className="mt-12 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-red-400/5 border border-red-400/10 flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-400/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">⚠️ Disclaimer</h3>
              <p className="text-sm text-blue-100/50 leading-relaxed font-body">
                EkalGo provides recommendations and does not guarantee safety, availability, or accuracy of locations. Users are advised to exercise their own judgment.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl border border-accent-teal/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-bold text-white mb-2 font-display">📩 Report Security Issues</h3>
              <p className="text-sm text-blue-100/60 font-body">Found a bug or safety concern? Let our elite response team know immediately.</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/918474972007" 
                target="_blank"
                className="btn-primary py-3 px-6 flex items-center gap-2 font-bold"
              >
                <MessageSquare size={18} /> WhatsApp Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
