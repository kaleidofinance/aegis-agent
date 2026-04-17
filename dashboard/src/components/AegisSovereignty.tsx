"use client";

import React from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';

export const AegisSovereignty: React.FC = () => {
  const maturityData = {
    level: 3,
    status: "INSTITUTIONAL GRADE",
    hazards: ["Single-Step Ownership (Alert)"],
    trustZones: ["Admin (High)", "User (Low)", "Oracle (Med)"]
  };

  return (
    <GlassCard className="h-full border-[#00ff6e]/20 bg-black/40">
      <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.3em] uppercase mb-8">Architectural Sovereignty (v11.5)</h3>
      
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-1 opacity-50">Protocol Maturity Level</p>
            <p className="text-2xl font-black text-white tracking-tight">Level {maturityData.level}</p>
          </div>
          <div className="px-4 py-2 bg-[#00ff6e]/10 border border-[#00ff6e]/40 rounded-full text-[10px] font-black text-[#00ff6e]">
             {maturityData.status}
          </div>
        </div>

        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-3 opacity-50">Operational Trust Zones (TRAIL)</p>
          <div className="flex gap-2 flex-wrap">
            {maturityData.trustZones.map((zone: string) => (
              <div key={zone} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-white/90">
                {zone}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-3 opacity-50">Governance Hazards</p>
          <div className="space-y-2">
            {maturityData.hazards.map((hazard: string) => (
              <div key={hazard} className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-between">
                <span className="text-xs font-bold text-orange-200">{hazard}</span>
                <span className="text-[9px] uppercase font-black text-orange-400">Hazard Fix Needed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
