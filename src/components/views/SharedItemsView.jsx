'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, Receipt, Plus, Users, Trash2, 
  DollarSign, PieChart, TrendingUp, Zap, Sparkles
} from 'lucide-react';
import { cn } from '@/utils/cn';

export default function SharedItemsView({ data }) {
  const [activeMode, setActiveMode] = useState('checklist'); // checklist, expenses
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Confirm stay at Zostel', done: true },
    { id: 2, text: 'Book shared taxi for Hunder', done: false },
    { id: 3, text: 'Buy portable oxygen cylinders', done: false },
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Fuel (Leh to Nubra)', amount: 4500, paidBy: 'Rahul' },
    { id: 2, title: 'Dinner at Thiksey', amount: 1200, paidBy: 'Aisha' },
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="w-full min-h-full bg-brand-900/20 pb-24 px-8 pt-10">
      <div className="max-w-4xl mx-auto space-y-12">
         {/* Toggle Navigation */}
         <div className="flex items-center gap-4 p-1.5 bg-white/5 border border-white/5 rounded-3xl w-fit mx-auto md:mx-0 shadow-2xl">
            <button 
              onClick={() => setActiveMode('checklist')}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeMode === 'checklist' ? "bg-accent-gold text-brand-900 shadow-glow-gold" : "text-white/40 hover:text-white"
              )}
            >
               <CheckSquare size={14} />
               Roadmap Checklist
            </button>
            <button 
              onClick={() => setActiveMode('expenses')}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeMode === 'expenses' ? "bg-accent-gold text-brand-900 shadow-glow-gold" : "text-white/40 hover:text-white"
              )}
            >
               <Receipt size={14} />
               Expense Splitter
            </button>
         </div>

         <div className="min-h-[500px]">
           <AnimatePresence mode="wait">
             {activeMode === 'checklist' ? (
               <motion.div 
                 key="checklist"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="space-y-6"
               >
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-xl font-bold text-white">Group Readiness</h3>
                        <p className="text-xs text-white/40 italic">Collaborative tasks for the {data?.title || 'Trip'}.</p>
                     </div>
                     <button className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold shadow-glow-gold/10">
                        <Plus size={20} />
                     </button>
                  </div>

                  <div className="space-y-3">
                     {checklist.map((item) => (
                        <div 
                           key={item.id}
                           onClick={() => toggleCheck(item.id)}
                           className={cn(
                             "glass-panel p-5 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center gap-4 rounded-[1.5rem]",
                             item.done && "opacity-40 grayscale"
                           )}
                        >
                           <div className={cn(
                             "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                             item.done ? "bg-accent-gold border-accent-gold text-brand-900" : "border-white/20"
                           )}>
                              {item.done && <CheckSquare size={14} />}
                           </div>
                           <span className={cn(
                             "text-sm tracking-tight text-white/80",
                             item.done && "line-through text-white/20"
                           )}>
                              {item.text}
                           </span>
                        </div>
                     ))}
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="expenses"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="space-y-8"
               >
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-xl font-bold text-white">Intelligence Splitter</h3>
                        <p className="text-xs text-white/40 italic">Handling the numbers in shadows.</p>
                     </div>
                     <button className="w-10 h-10 rounded-xl bg-accent-gold text-brand-900 shadow-glow-gold">
                        <Plus size={20} />
                     </button>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="glass-panel p-6 border-white/5 bg-brand-900/40 rounded-[2rem] flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-gold">
                           <DollarSign size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Total Spent</p>
                           <p className="text-2xl font-bold text-white">₹5,700</p>
                        </div>
                     </div>
                     <div className="glass-panel p-6 border-accent-gold/20 bg-accent-gold/[0.03] rounded-[2rem] flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-accent-gold/20 flex items-center justify-center text-accent-gold shadow-glow-gold/10">
                           <Users size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-accent-gold/40">Your Share</p>
                           <p className="text-2xl font-bold text-white italic">₹1,900</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {expenses.map((expense) => (
                        <div 
                           key={expense.id}
                           className="glass-panel p-5 border-white/5 bg-white/[0.02] flex items-center justify-between rounded-[2rem]"
                        >
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                                 <Receipt size={18} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-white">{expense.title}</h4>
                                 <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">Paid by {expense.paidBy}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-accent-gold">₹{expense.amount}</p>
                              <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">Shared</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Settlement Teaser */}
                  <div className="p-8 border border-white/5 bg-brand-900/60 rounded-[2.5rem] flex items-center justify-between shadow-2xl relative overflow-hidden group cursor-pointer">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 blur-[40px] pointer-events-none group-hover:bg-accent-gold/10 transition-all" />
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-gold border border-white/10 group-hover:shadow-glow-gold-sm transition-all animate-bounce-slow">
                           <TrendingUp size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white">Settlement Matrix</h4>
                           <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1 italic">Balance the grid in one click.</p>
                        </div>
                     </div>
                     <button className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-bold text-xs group-hover:bg-accent-gold group-hover:text-brand-900 transition-all">
                        Resolve
                     </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
