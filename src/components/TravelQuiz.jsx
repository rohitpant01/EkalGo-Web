import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Zap, Map, Users, ChevronRight, CheckCircle2, Heart, Sparkles } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'vibe',
    title: "What's your travel vibe?",
    options: [
      { id: 'adventure', label: 'Adrenaline & High Peaks', icon: '🏔️', description: 'Treks, climbs, and raw nature' },
      { id: 'peace', label: 'Slow & Soulful', icon: '🧘', description: 'Cafés, views, and local art' },
      { id: 'culture', label: 'History & Heritage', icon: '🕌', description: 'Old towns, markets, and stories' },
      { id: 'social', label: 'Party & People', icon: '💃', description: 'Beaches, clubs, and new friends' },
    ]
  },
  {
    id: 'companion',
    title: "Who are you traveling with?",
    options: [
      { id: 'solo', label: 'Traveling Solo', icon: '🚶‍♀️', description: 'Seeking independence & soul-searching' },
      { id: 'friends', label: 'With Friends', icon: '👯‍♂️', description: 'Group fun and shared memories' },
      { id: 'couple', label: 'Romantic Partner', icon: '❤️', description: 'Intimacy and beautiful escapes' },
    ]
  },
  {
    id: 'pace',
    title: "What's your ideal pace?",
    options: [
      { id: 'fast', label: 'Hyper-Action', icon: '🏃', description: 'See everything, no time for sleep' },
      { id: 'balanced', label: 'Balanced Flow', icon: '⚖️', description: 'One big activity, then relax' },
      { id: 'slow', label: 'Leisurely Slow', icon: '🍹', description: 'Sleep in, soak it in' },
    ]
  }
];

const RESULTS = {
  adventure: {
    title: "The Himalayan Nomad",
    match: "12 Hidden Peaks matched",
    icon: <Compass className="text-amber-400" />,
    desc: "You crave the unknown. Your perfect trip involves high altitudes and places where Google Maps stops working."
  },
  peace: {
    title: "The Soul Searcher",
    match: "8 Secret Cafés matched",
    icon: <Heart className="text-teal-400" />,
    desc: "You find magic in the silence. We've matched you with peaceful retreats and sunrise spots."
  },
  culture: {
    title: "The Heritage Hunter",
    match: "15 Historic Spots matched",
    icon: <Map className="text-blue-400" />,
    desc: "You want to live the story. We've found the oldest guesthouses and hidden artisans for you."
  },
  social: {
    title: "The Social Butterfly",
    match: "20 Meetup Hubs matched",
    icon: <Users className="text-pink-400" />,
    desc: "Travel is about people. You belong in hostels with rooftop bars and group expeditions."
  }
};

export default function TravelQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (optionId) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: optionId };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const result = RESULTS[answers.vibe] || RESULTS.adventure;

  return (
    <section className="py-24 px-4 bg-ocean-950/50">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-3xl relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 blur-[80px] pointer-events-none" />

          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-2 mb-8">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-amber-400' : 'bg-white/5'}`} />
                  ))}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200/40 mb-2 block">
                  Discovery Phase
                </span>
                <h3 className="text-3xl md:text-4xl text-white font-display font-bold mb-10 leading-tight">
                  {QUESTIONS[step].title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUESTIONS[step].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="group flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:border-amber-400/50 hover:bg-white/[0.08] transition-all text-left"
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                        {option.icon}
                      </span>
                      <div>
                        <p className="text-white font-bold mb-1">{option.label}</p>
                        <p className="text-[10px] text-blue-200/40 font-body leading-relaxed">{option.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative z-10"
            >
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8">
                {result.icon}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                 <Sparkles size={14} className="text-teal-400" />
                 <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Persona Identified</span>
                 <Sparkles size={14} className="text-teal-400" />
              </div>

              <h2 className="text-4xl md:text-5xl text-white font-display font-bold mb-4 tracking-tight">
                 {result.title}
              </h2>

              <p className="text-blue-100/60 text-lg max-w-xl mx-auto mb-10 italic">
                "{result.desc}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-amber-400 font-bold text-2xl mb-1">{result.match.split(' ')[0]}</div>
                    <div className="text-[10px] text-blue-200/50 uppercase font-bold tracking-widest">Matched Spots</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-teal-400 font-bold text-2xl mb-1">98%</div>
                    <div className="text-[10px] text-blue-200/50 uppercase font-bold tracking-widest">Soulmate Match</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-blue-400 font-bold text-2xl mb-1">4.9/5</div>
                    <div className="text-[10px] text-blue-200/50 uppercase font-bold tracking-widest">Vibe Score</div>
                 </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="group flex items-center justify-center gap-3 px-10 py-5 rounded-[1.5rem] font-bold text-ocean-900 mx-auto transition-all shadow-glow-amber"
                style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
              >
                Reveal My Hidden Gems
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-blue-200/30">
                 <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px]">Private Results</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px]">No Signup Required</span>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
