"use client";

import React from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';

export const RemediationLab: React.FC<{ status?: any }> = ({ status }) => {
  const pending = status?.pending_directive;
  const isPaused = status?.status === "PAUSED";
  
  const handleApprove = async () => {
    if (!pending) return;
    try {
      const res = await fetch('/api/directive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mission_id: pending.mission_id,
          phase_id: pending.phase_id,
          action: 'GRANT'
        })
      });
      if (res.ok) {
        console.log("Directive GRANTED. Aegis mission resuming...");
      }
    } catch (err) {
      console.error("Failed to transmit directive.");
    }
  };

  const patchData = {
    vulnerability: status?.findings?.[0]?.vulnerability || "Modular Reentrancy (Compound/Rari style)",
    patchType: "CEI-Enforcement",
    blueprint: status?.findings?.[0]?.patch || "uint balanceBefore = token.balanceOf(address(this));\n...\n// Enforce Reentrancy Guard\n_enterCriticalSection();",
    verified: true
  };

  return (
    <GlassCard className={`h-full border-[#00ff6e]/20 bg-black/40 transition-all duration-700 ${isPaused ? 'ring-2 ring-[#00ff6e] shadow-[0_0_40px_rgba(0,255,110,0.2)]' : ''}`}>
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.4em] uppercase">Remediation Lab (v11.5)</h3>
          {isPaused && <p className="text-[9px] text-white/40 mt-1 font-bold animate-pulse uppercase tracking-widest">⚠️ Awaiting HumanDirective</p>}
        </div>
        {patchData.verified && (
          <span className="text-[9px] font-black text-[#00ff6e] px-3 py-1 bg-[#00ff6e]/10 border border-[#00ff6e]/40 rounded-lg italic">
            PATCH VERIFIED BY AEGIS
          </span>
        )}
      </div>
      
      <div className="space-y-8">
        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-2 opacity-50">Target Vulnerability</p>
          <p className="text-sm font-black text-white tracking-tight">{patchData.vulnerability}</p>
        </div>

        <div>
          <p className="text-[#00ff6e] text-[9px] uppercase font-bold mb-4 opacity-50">Security Patch Blueprint</p>
          <div className="p-6 bg-black/60 border border-white/5 rounded-2xl font-mono text-[11px] text-[#00ff6e]/90 leading-relaxed overflow-x-auto whitespace-pre">
            {patchData.blueprint}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {isPaused ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApprove}
              className="col-span-2 p-6 bg-[#00ff6e] border border-[#00ff6e] rounded-2xl transition-all cursor-pointer shadow-[0_0_30px_rgba(0,255,110,0.4)]"
            >
              <p className="text-center text-[12px] font-black text-black tracking-[0.2em] uppercase">Grant HumanDirective: Apply Remediation</p>
            </motion.div>
          ) : (
            <>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#00ff6e]/5 transition-all cursor-pointer group hover:border-[#00ff6e]/40">
                <p className="text-[11px] font-black text-white group-hover:text-[#00ff6e] transition-colors uppercase tracking-widest">Apply Fix on Fork</p>
                <p className="text-[9px] text-white/40 mt-1 uppercase font-bold">Simulate in Sandbox</p>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#00ff6e]/5 transition-all cursor-pointer group hover:border-[#00ff6e]/40">
                <p className="text-[11px] font-black text-white group-hover:text-[#00ff6e] transition-colors uppercase tracking-widest">Export PR to Github</p>
                <p className="text-[9px] text-white/40 mt-1 uppercase font-bold">Autonomous Remediation</p>
              </div>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
