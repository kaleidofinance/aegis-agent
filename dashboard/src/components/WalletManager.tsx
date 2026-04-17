"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Plus, RefreshCw, Copy, CheckCircle2, Lock, Unlock } from 'lucide-react';

interface MultichainWallet {
    label: string;
    eth_address: string;
    dot_address?: string;
    sol_address?: string;
}

export const WalletManager: React.FC = () => {
    const [wallets, setWallets] = useState<MultichainWallet[]>([]);
    const [isLocked, setIsLocked] = useState(true);
    const [isHD, setIsHD] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mnemonic, setMnemonic] = useState<string | null>(null);

    const fetchWallets = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/wallet');
            const data = await res.json();
            if (data.status === 'success' && data.raw) {
                // Simplified parsing of CLI-like output for this demo
                // Ideally, refactor CLI to return JSON
                const parsed: MultichainWallet[] = [];
                const lines = data.raw.split('\n').filter((l: string) => l.includes('|'));
                lines.shift(); // Header
                lines.shift(); // Divider
                lines.forEach((line: string) => {
                    const [label, eth] = line.split('|').map(s => s.trim());
                    if (label && eth) parsed.push({ label, eth_address: eth });
                });
                setWallets(parsed);
                setIsLocked(false);
            }
        } catch (err) {
            console.error("Vault Access Failure.");
        } finally {
            setLoading(false);
        }
    };

    const handleInit = async (mode: 'hd' | 'individual') => {
        setLoading(true);
        try {
            const res = await fetch('/api/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'INIT', mode })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setIsHD(mode === 'hd');
                if (data.output.includes('MASTER MNEMONIC:')) {
                    const found = data.output.match(/MASTER MNEMONIC: (.*)/);
                    if (found) setMnemonic(found[1].split('\n')[0]);
                }
                fetchWallets();
            }
        } catch (err) {
            console.error("Initialization error.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            await fetch('/api/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'GENERATE', count: 1 })
            });
            fetchWallets();
        } catch (err) {
            console.error("Generation error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <GlassCard className="h-full border-[#00ff6e]/20 bg-black/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20">
                {isLocked ? <Lock size={40} className="text-red-500" /> : <Unlock size={40} className="text-[#00ff6e]" />}
            </div>

            <h3 className="text-[#00ff6e] font-black text-[10px] tracking-[0.3em] uppercase mb-8 flex items-center gap-2">
                <Shield size={12} /> Sovereign Identity Explorer
            </h3>

            {isLocked ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
                    <Key size={32} className="mb-4 text-[#00ff6e]" />
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-6">Vault Encrypted</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleInit('hd')}
                            className="px-6 py-2 bg-[#00ff6e]/10 border border-[#00ff6e]/40 text-[#00ff6e] text-[9px] font-black tracking-tighter hover:bg-[#00ff6e]/20"
                        >
                            INIT HD (MASTER SEED)
                        </button>
                        <button 
                             onClick={() => handleInit('individual')}
                            className="px-6 py-2 bg-white/5 border border-white/20 text-white/60 text-[9px] font-black tracking-tighter hover:bg-white/10"
                        >
                            INIT INDIVIDUAL
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {mnemonic && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-6"
                        >
                            <p className="text-[9px] font-black text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <CheckCircle2 size={12} /> SECURE THIS MNEMONIC
                            </p>
                            <code className="text-[11px] text-white/80 font-mono tracking-tight">{mnemonic}</code>
                            <button 
                                onClick={() => setMnemonic(null)}
                                className="mt-3 text-[9px] font-bold text-yellow-500/60 uppercase hover:text-yellow-500"
                            >
                                [ I HAVE SECURED IT ]
                            </button>
                        </motion.div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[#00ff6e] text-[9px] font-black uppercase tracking-widest opacity-60">Derived Audit Identities ({wallets.length})</p>
                        <button 
                            onClick={handleGenerate}
                            disabled={loading}
                            className="p-2 bg-[#00ff6e]/10 border border-[#00ff6e]/30 text-[#00ff6e] rounded-lg hover:bg-[#00ff6e]/20 transition-all"
                        >
                            {loading ? <RefreshCw className="animate-spin" size={12} /> : <Plus size={12} />}
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {wallets.map((w, idx) => (
                                <motion.div 
                                    key={w.label} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff6e]/20 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[11px] font-black text-white">{w.label}</span>
                                        <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter px-2 py-0.5 bg-white/5 rounded">Multichain</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center group/addr">
                                            <span className="text-[9px] font-bold text-cyan-400 opacity-50">ETH</span>
                                            <span className="text-[9px] font-mono text-white/60 group-hover/addr:text-white transition-colors">{w.eth_address}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-bold text-rose-400 opacity-50">DOT</span>
                                            <span className="text-[9px] font-mono text-white/30">LOCKED_HD_DERIVATION</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-bold text-purple-400 opacity-50">SOL</span>
                                            <span className="text-[9px] font-mono text-white/30">LOCKED_HD_DERIVATION</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </GlassCard>
    );
};
