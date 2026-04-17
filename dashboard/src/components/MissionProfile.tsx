"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MissionProfileProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

export const MissionProfile: React.FC<MissionProfileProps> = ({ activeMode, onModeChange }) => {
  const modes = [
    { id: 'audit', label: 'AUDIT', icon: '🔍', desc: 'Secure Code Analysis' },
    { id: 'sleuth', label: 'SLEUTH', icon: '🕵️', desc: 'Forensic OSINT' },
    { id: 'stress', label: 'STRESS', icon: '⚡', desc: 'Market Simulation' },
    { id: 'full', label: 'FULL', icon: '🛡️', desc: 'War Room Mode' },
  ];

  return (
    <div className="flex gap-4 mb-8">
      {modes.map((mode) => (
        <motion.button
          key={mode.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onModeChange(mode.id)}
          className={`flex-1 p-4 rounded-xl border transition-all text-left relative overflow-hidden ${
            activeMode === mode.id 
            ? 'bg-[#00ff6e]/20 border-[#00ff6e] shadow-[0_0_30px_rgba(0,255,110,0.15)]' 
            : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl">{mode.icon}</span>
            <span className={`text-[10px] font-black tracking-widest ${activeMode === mode.id ? 'text-[#00ff6e]' : 'text-white/60'}`}>
              {mode.label}
            </span>
          </div>
          <p className="text-[9px] text-white/30 font-bold uppercase tracking-tighter">
            {mode.desc}
          </p>
          
          {activeMode === mode.id && (
            <motion.div 
              layoutId="glow"
              className="absolute inset-0 bg-gradient-to-r from-[#00ff6e]/5 to-transparent pointer-events-none"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
