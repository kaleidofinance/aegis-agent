"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { WalletManager } from '../../components/WalletManager';
import { GlowButton } from '../../components/GlowButton';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function WalletsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white font-sans overflow-hidden relative selection:bg-[#00ff6e] selection:text-black p-10">
      {/* Liquid Organic Orbs */}
      <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
            translateX: [-30, 30, -30] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 -left-20 w-[600px] h-[600px] bg-[#00ff6e]/5 filter blur-[100px] rounded-full pointer-events-none z-0" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex justify-between items-center">
            <div className="flex items-center gap-6">
                 <Link href="/">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
                        <ChevronLeft size={20} className="text-[#00ff6e]" />
                    </button>
                </Link>
                <div>
                     <h1 className="text-4xl font-black text-[#00ff6e] tracking-tighter filter drop-shadow-[0_0_15px_rgba(0,255,110,0.3)]">SOVEREIGN IDENTITY VAULT</h1>
                     <p className="text-[10px] font-bold text-white/30 tracking-[0.6em] uppercase mt-1">Sovereign Wallet Management & Multichain Scaling</p>
                </div>
            </div>

            <div className="px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black text-red-500 tracking-widest">LOCAL ENCRYPTION ACTIVE</span>
            </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
           <div className="col-span-12 lg:col-span-8">
              <WalletManager />
           </div>

           <div className="col-span-12 lg:col-span-4 space-y-8">
               <section className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl">
                    <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.4em] uppercase mb-6">Security Directives</h3>
                    <ul className="space-y-4 text-[11px] text-white/50 leading-relaxed font-mono">
                        <li className="flex gap-3">
                            <span className="text-[#00ff6e] mt-1">▸</span>
                            <span>All private keys are encrypted locally using AES-128 via the <b>AEGIS_VAULT_KEY</b>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00ff6e] mt-1">▸</span>
                            <span>HD Derivation paths follow BIP-44 (EVM/SVM) and Substrate (DOT) standards.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00ff6e] mt-1">▸</span>
                            <span>Mnemonic phrases are generated in-memory and deleted immediately after secure display.</span>
                        </li>
                    </ul>
               </section>

               <section className="p-8 bg-[#00ff6e]/5 border border-[#00ff6e]/20 rounded-3xl backdrop-blur-2xl">
                    <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.4em] uppercase mb-6">Batch Operations</h3>
                    <p className="text-[11px] text-[#00ff6e]/70 mb-8 font-bold italic">"Scale your architectural footprint across untrusted protocols."</p>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="text-[9px] font-black text-white/40 block mb-3 uppercase tracking-widest">Generation Count</label>
                            <input type="range" className="w-full accent-[#00ff6e]" min="1" max="25" defaultValue="5" />
                        </div>
                        <GlowButton variant="primary" className="w-full py-4 text-[10px] font-black tracking-widest">
                            TRIGGER IDENTITY EXPANSION
                        </GlowButton>
                    </div>
               </section>
           </div>
        </div>
      </div>
    </div>
  );
}
