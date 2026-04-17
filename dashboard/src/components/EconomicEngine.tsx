"use client";

import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';

export const EconomicEngine: React.FC = () => {
    const [priceWarp, setPriceWarp] = useState(-15);
    const [liquidity, setLiquidity] = useState(100);

    return (
        <GlassCard className="h-full border-[#00ff6e]/20 bg-[#111714]">
            <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.3em] uppercase mb-8">Economic Stress Desk</h3>

            <div className="space-y-12">
                <div>
                    <div className="flex justify-between mb-4">
                        <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Oracle Price Warp</p>
                        <span className="text-xs font-black text-red-500">{priceWarp}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="-99" 
                        max="0" 
                        value={priceWarp}
                        onChange={(e) => setPriceWarp(Number(e.target.value))}
                        className="w-full accent-[#00ff6e] bg-white/5 h-1 rounded-full appearance-none transition-all"
                    />
                    <p className="mt-3 text-[9px] text-white/40 leading-relaxed italic">
                        Manipulating Chainlink storage slots to simulate a price crash on {priceWarp === -15 ? 'ETH' : 'Target Asset'}.
                    </p>
                </div>

                <div>
                    <div className="flex justify-between mb-4">
                        <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Liquidity Depth Stress</p>
                        <span className="text-xs font-black text-[#00ff6e]">{liquidity}% Depth</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={liquidity}
                        onChange={(e) => setLiquidity(Number(e.target.value))}
                        className="w-full accent-[#00ff6e] bg-white/5 h-1 rounded-full appearance-none"
                    />
                </div>

                <div className="p-6 bg-[#00ff6e]/5 border border-[#00ff6e]/10 rounded-2xl">
                    <h4 className="text-[10px] font-black text-[#00ff6e] uppercase mb-2">Simulated Impact</h4>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-white">$14.2M</span>
                        <span className="text-[10px] font-bold text-red-500 mb-1">Bad Debt Risk</span>
                    </div>
                </div>

                <button className="w-full py-4 bg-[#00ff6e] text-black font-black text-[10px] tracking-[0.3em] rounded-xl hover:shadow-[0_0_30px_rgba(0,255,110,0.5)] transition-all">
                    TRIGGER MARKET CASCADE
                </button>
            </div>
        </GlassCard>
    );
};
