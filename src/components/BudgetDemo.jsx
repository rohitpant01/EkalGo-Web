'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Utensils, Car, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

const OPTIONS = {
  hotel: [
    { id: 'h1', label: 'Hostel / Pod', cost: 1500, icon: '🏠' },
    { id: 'h2', label: 'Boutique Hotel', cost: 4500, icon: '🏨' },
    { id: 'h3', label: 'Luxury Resort', cost: 12000, icon: '🏰' },
  ],
  food: [
    { id: 'f1', label: 'Street Food', cost: 800, icon: '🍢' },
    { id: 'f2', label: 'Local Cafes', cost: 2500, icon: '☕' },
    { id: 'f3', label: 'Fine Dining', cost: 6000, icon: '🍷' },
  ],
  transport: [
    { id: 't1', label: 'Public / Bus', cost: 500, icon: '🚌' },
    { id: 't2', label: 'Rent a Bike', cost: 1200, icon: '🏍️' },
    { id: 't3', label: 'Private Cab', cost: 3500, icon: '🚗' },
  ]
};

export default function BudgetDemo() {
  const [selections, setSelections] = useState({
    hotel: OPTIONS.hotel[1],
    food: OPTIONS.food[1],
    transport: OPTIONS.transport[1]
  });
  
  const totalBudget = 10000;
  const currentTotal = selections.hotel.cost + selections.food.cost + selections.transport.cost;
  const percentage = Math.min((currentTotal / totalBudget) * 100, 110);
  
  let status = 'safe';
  if (percentage > 90) status = 'danger';
  else if (percentage > 70) status = 'warning';

  const statusColors = {
    safe: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500'
  };

  const statusText = {
    safe: 'Within Budget',
    warning: 'Nearing Limit',
    danger: 'Over Budget'
  };

  return (
    <section id="budget-demo" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-primary mb-4">Interactive Demo</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Watch Your Budget <br />
                <span className="text-gradient-primary">Update in Real-Time</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                EkalGo's smart engine recalculates your entire trip every time you make a change. 
                Switch a hotel or skip a fancy dinner, and see exactly how it affects your wallet.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Dynamic Adjustments</h4>
                    <p className="text-sm text-slate-500">AI suggests alternatives when you go over budget.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Cost Transparency</h4>
                    <p className="text-sm text-slate-500">No hidden fees. Every rupee is accounted for.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive UI */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-slate-100 relative"
            >
              {/* Header / Budget Bar */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Daily Budget</p>
                    <h3 className="text-2xl font-display font-bold text-slate-900">₹{totalBudget.toLocaleString()}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${status === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {status === 'danger' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                    {statusText[status]}
                  </div>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full rounded-full shadow-sm transition-colors duration-500 ${statusColors[status]}`}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Current: ₹{currentTotal.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Limit: ₹{totalBudget.toLocaleString()}</span>
                </div>
              </div>

              {/* Selection Grids */}
              <div className="space-y-8">
                {Object.entries(OPTIONS).map(([key, items]) => (
                  <div key={key}>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      {key === 'hotel' && <Hotel size={14} />}
                      {key === 'food' && <Utensils size={14} />}
                      {key === 'transport' && <Car size={14} />}
                      {key} Selection
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelections(prev => ({ ...prev, [key]: item }))}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                            selections[key].id === item.id 
                              ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5' 
                              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-2xl mb-2">{item.icon}</span>
                          <span className={`text-[10px] font-bold uppercase truncate w-full text-center ${selections[key].id === item.id ? 'text-primary-dark' : 'text-slate-500'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
