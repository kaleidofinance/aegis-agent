"use client";

import React from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';

export const ForensicIntel: React.FC = () => {
  const forensicData = {
    entity: "Lazarus Cluster (Linked)",
    fundingSource: "Tornado.Cash v2",
    risk: 0.94,
    hops: 3,
    explorerLinks: ["Etherscan", "BaseScan", "MantleScan"]
  };

  return (
    <GlassCard className="h-full border-[#00ff6e]/20 bg-black/40">
      <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.3em] uppercase mb-8">Forensic OSINT (ZachXBT Style)</h3>
      
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-1 opacity-50">Attributed Entity</p>
            <p className="text-sm font-black text-white tracking-tight">{forensicData.entity}</p>
          </div>
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/40 rounded-md text-[9px] font-bold text-red-500">
             HIGH ADVERSARY SCORE
          </div>
        </div>

        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-2 opacity-50">Money Flow Logic</p>
          <div className="flex gap-2 items-center">
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/80">
                {forensicData.fundingSource}
            </div>
            <span className="text-white/20">→</span>
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/80">
                {forensicData.hops} Hops
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-3 opacity-50">Risk Exposure Gauge</p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden flex">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${forensicData.risk * 100}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
            />
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-[10px] font-bold text-white/30 uppercase">Low Risk</span>
            <span className="text-[10px] font-bold text-red-500 uppercase">{forensicData.risk * 100}% Threat</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-3 opacity-50">Cross-Chain Surveillance</p>
          <div className="flex gap-3 flex-wrap">
            {forensicData.explorerLinks.map((link) => (
              <span key={link} className="text-[10px] text-white/60 hover:text-[#00ff6e] cursor-pointer transition-colors underline decoration-white/10">
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
