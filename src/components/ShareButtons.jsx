'use client';

import React from 'react';
import { Share2, MessageCircle, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButtons({ url, title, city = "" }) {
  const [copied, setCopied] = React.useState(false);

  const fullUrl = `https://ekalgo.com${url}`;
  const shareText = `Check out this amazing ${city ? city + ' ' : ''}itinerary I found on EkalGo! 🚀 ${fullUrl}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={shareWhatsApp}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-bold text-xs"
      >
        <MessageCircle size={16} />
        WhatsApp
      </button>

      <button
        onClick={shareTwitter}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all font-bold text-xs"
      >
        <Twitter size={16} />
        Twitter
      </button>

      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold text-xs relative"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={16} className="text-primary-500" />
              Copied!
            </motion.div>
          ) : (
            <motion.div
              key="link"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <LinkIcon size={16} />
              Copy Link
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
