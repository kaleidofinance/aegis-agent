"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { GlowButton } from '../components/GlowButton';
import { MissionProfile } from '../components/MissionProfile';
import { ForensicIntel } from '../components/ForensicIntel';
import { EconomicEngine } from '../components/EconomicEngine';
import { WalletManager } from '../components/WalletManager';
import { SettingsView } from '../components/SettingsView';
import { AegisSovereignty } from '../components/AegisSovereignty';
import { RemediationLab } from '../components/RemediationLab';

export default function AegisDashboard() {
  const [activeMode, setActiveMode] = useState('audit');
  const [showSettings, setShowSettings] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([
    "0x54...2b: CALL -> ProtocolFacet.liquidateBorrow(0x32...1a)",
    "0x54...2b: [FAIL] revert: 'Unauthorized'",
    "[SOVEREIGNTY]: Maturity Level 3 Detected.",
    "[ARCHITECT]: Reentrancy Patch Generated.",
    "[TRAIL]: Analyzing trust boundaries..."
  ]);

  // Telemetry Polling
  React.useEffect(() => {
    const pollStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setStatus(data);
        if (data.current_phase && !logs.includes(`[PHASE]: ${data.current_phase}`)) {
          setLogs(prev => [`[PHASE]: ${data.current_phase}`, ...prev.slice(0, 4)]);
        }
      } catch (err) {
        console.error("Link Failure: Aegis Engine unreachable.");
      }
    };
    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [logs]);


  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white font-sans overflow-hidden relative selection:bg-[#00ff6e] selection:text-black">
      {/* Liquid Organic Orbs */}
      <motion.div 
        animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            translateX: [-50, 50, -50] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 -left-20 w-[800px] h-[800px] bg-[#00ff6e]/10 filter blur-[120px] rounded-full pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
            scale: [1.2, 1, 1.2],
            translateY: [50, -50, 50] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00ff6e]/5 filter blur-[150px] rounded-full pointer-events-none z-0" 
      />

      <nav className="p-10 flex justify-between items-center border-b border-white/5 backdrop-blur-2xl relative z-40">
        <div className="flex flex-col">
            <span className="text-3xl font-black text-[#00ff6e] tracking-tighter filter drop-shadow-[0_0_15px_rgba(0,255,110,0.3)]">AEGIS AGENT</span>
            <span className="text-[10px] font-bold text-white/30 tracking-[0.6em] uppercase mt-1">Sovereign Expert Suite (v11.5)</span>
        </div>
        <div className="flex gap-4">
             <div className="px-4 py-2 bg-[#00ff6e]/10 border border-[#00ff6e]/40 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff6e] animate-ping" />
                <span className="text-[11px] font-black text-[#00ff6e] tracking-widest">MISSION ACTIVE: {activeMode.toUpperCase()}</span>
             </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 py-16 relative z-10 pb-40">
        {showSettings ? (
            <div className="max-w-5xl mx-auto">
                <SettingsView />
            </div>
        ) : (
            <div className="space-y-12">
                <MissionProfile activeMode={activeMode} onModeChange={setActiveMode} />
                
                <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-12 lg:col-span-4 h-full">
                    {activeMode === 'sleuth' ? <ForensicIntel /> : <EconomicEngine />}
                  </div>

                  <div className="col-span-12 lg:col-span-4 h-full">
                     <AegisSovereignty />
                  </div>

                  <div className="col-span-12 lg:col-span-4 h-full">
                    <GlassCard className="h-full bg-black/60 border-white/5">
                      <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.4em] uppercase mb-10">Neural Mission Logs</h3>
                      <div className="font-mono text-[11px] space-y-4 opacity-70">
                        {logs.map((log: string, i: number) => (
                          <div key={i} className={`p-3 rounded-lg border-l-2 ${log.includes('[FAIL]') ? 'bg-red-500/5 border-red-500/40 text-red-100' : 'bg-green-500/5 border-[#00ff6e]/40 text-green-100'}`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                >
                    <RemediationLab status={status} />
                </motion.div>
            </div>
        )}
      </main>

      {!showSettings && (
        <footer className="fixed bottom-0 left-0 right-0 p-16 flex justify-center gap-10 bg-gradient-to-t from-[#0a0f0d] to-transparent z-50 pointer-events-none">
            <div className="pointer-events-auto flex gap-6 p-2 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10">
                <GlowButton variant="secondary" className="px-10 py-5 text-[11px] tracking-[0.2em] font-black">
                    TERMINATE
                </GlowButton>
                <GlowButton variant="primary" className="px-16 py-5 text-[11px] tracking-[0.2em] font-black transform transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(0,255,110,0.3)]">
                    EXECUTE REMEDIATION
                </GlowButton>
            </div>
        </footer>
      )}
    </div>
  );
}
