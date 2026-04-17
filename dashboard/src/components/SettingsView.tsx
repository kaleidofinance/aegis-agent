"use client";

import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('intelligence');
    const [isLocal, setIsLocal] = useState(false);

    const tabs = [
        { id: 'general', label: 'GENERAL', icon: '⚙️' },
        { id: 'intelligence', label: 'INTELLIGENCE', icon: '🧠' },
        { id: 'security', label: 'SECURITY', icon: '🛡️' },
        { id: 'automation', label: 'AUTOMATION', icon: '🤖' },
        { id: 'skills', label: 'SKILLS & MCP', icon: '⚡' },
    ];

    return (
        <GlassCard className="h-full border-[#00ff6e]/20 bg-[#0d0f0e] flex overflow-hidden p-0">
            {/* Sidebar Tabs */}
            <div className="w-48 border-r border-white/5 bg-black/20 p-4 space-y-2">
                <h4 className="text-[10px] font-black text-[#00ff6e] px-2 mb-6 tracking-widest">GOVERNANCE</h4>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            activeTab === tab.id ? 'bg-[#00ff6e]/20 text-[#00ff6e] border border-[#00ff6e]/20' : 'text-white/40 hover:text-white/60'
                        }`}
                    >
                        <span className="text-sm">{tab.icon}</span>
                        <span className="text-[9px] font-black tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
                <AnimatePresence>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        {activeTab === 'intelligence' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black text-white">Neural Core Configuration</h3>
                                <div className="space-y-4">
                                    <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Intelligence Paradigm</p>
                                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                                        <button onClick={() => setIsLocal(false)} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${!isLocal ? 'bg-[#00ff6e] text-black shadow-[0_0_20px_rgba(0,255,110,0.3)]' : 'text-white/40'}`}>CLOUD (LICENSED)</button>
                                        <button onClick={() => setIsLocal(true)} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${isLocal ? 'bg-[#00ff6e] text-black shadow-[0_0_20px_rgba(0,255,110,0.3)]' : 'text-white/40'}`}>LOCAL (OLLAMA)</button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Active Neural Core</p>
                                    <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80 focus:border-[#00ff6e]/40 outline-none">
                                        {isLocal ? (
                                            <optgroup label="Local Models (Ollama)" className="bg-[#0a0f0d]">
                                                <option>Cogito-671B-Llama-Encoded</option>
                                                <option>Llama-3.3-70b:latest</option>
                                                <option>Gemma-4-31b-it</option>
                                                <option>DeepSeek-v3.2:32b</option>
                                            </optgroup>
                                        ) : (
                                            <optgroup label="Cloud Intelligence (Provider)" className="bg-[#0a0f0d]">
                                                <option>Gemini 3.1 Ultra</option>
                                                <option>GPT-5 Omni (Audit-Tuned)</option>
                                                <option>Claude 4.5 Sonnet</option>
                                                <option>MiniMax M2.7 (Cloud)</option>
                                            </optgroup>
                                        )}
                                    </select>
                                </div>

                                {!isLocal && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4 pt-4 border-t border-white/5"
                                    >
                                        <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Cloud Key Registry</p>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <input type="password" placeholder="Google Gemini (Prime Core) Key" className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] font-mono text-white/60 focus:border-[#00ff6e]/40 outline-none" />
                                                <span className="absolute right-3 top-3.5 text-[8px] font-black text-[#00ff6e]/40 uppercase tracking-tighter">Gemini v3.1</span>
                                            </div>
                                            <div className="relative">
                                                <input type="password" placeholder="OpenAI / DeepSeek Unified Key" className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] font-mono text-white/60 focus:border-[#00ff6e]/40 outline-none" />
                                                <span className="absolute right-3 top-3.5 text-[8px] font-black text-[#00ff6e]/40 uppercase tracking-tighter">GPT-5 / V3.2</span>
                                            </div>
                                            <div className="relative">
                                                <input type="password" placeholder="Anthropic Claude Security Key" className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] font-mono text-white/60 focus:border-[#00ff6e]/40 outline-none" />
                                                <span className="absolute right-3 top-3.5 text-[8px] font-black text-[#00ff6e]/40 uppercase tracking-tighter">Claude 4.5</span>
                                            </div>
                                            <div className="relative">
                                                <input type="password" placeholder="MiniMax / GLM High-Speed Key" className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] font-mono text-white/60 focus:border-[#00ff6e]/40 outline-none" />
                                                <span className="absolute right-3 top-3.5 text-[8px] font-black text-[#00ff6e]/40 uppercase tracking-tighter">M2.7 / GLM 5.1</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div className="space-y-4">
                                    <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Ollama Connection Bridge</p>
                                    <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80">
                                        <option>Auto-Detect (API + CLI)</option>
                                        <option>API Only (Daemon)</option>
                                        <option>CLI Only (Subprocess)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black text-white">Security & Permissions</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <p className="text-[10px] font-black text-white">Terminal Auto-Run</p>
                                            <p className="text-[9px] text-white/30 truncate">Allow agent to execute safe terminal commands</p>
                                        </div>
                                        <div className="w-12 h-6 bg-[#00ff6e]/20 rounded-full p-1 relative cursor-pointer border border-[#00ff6e]/40">
                                            <div className="w-4 h-4 bg-[#00ff6e] rounded-full shadow-[0_0_10px_rgba(0,255,110,0.5)] translate-x-6" />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-[#00ff6e]/5 rounded-xl border border-[#00ff6e]/20 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-black text-[#00ff6e]">MEV Protection (Privacy Veneer)</p>
                                                <p className="text-[9px] text-[#00ff6e]/50">Route remediations via Flashbots/Jito</p>
                                            </div>
                                            <div className="w-12 h-6 bg-[#00ff6e]/40 rounded-full p-1 relative cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <div className="p-2 bg-black/20 rounded-lg border border-white/5 flex justify-between items-center">
                                                <span className="text-[8px] font-bold text-white/40">Flashbots Protect</span>
                                                <span className="text-[8px] font-black text-[#00ff6e]">ACTIVE</span>
                                            </div>
                                            <div className="p-2 bg-black/20 rounded-lg border border-white/5 flex justify-between items-center">
                                                <span className="text-[8px] font-bold text-white/40">Jito Relay</span>
                                                <span className="text-[8px] font-black text-[#00ff6e]">READY</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <p className="text-[10px] font-black text-white">Autonomous Key Management</p>
                                            <p className="text-[9px] text-white/30">Allow signing without manual approval</p>
                                        </div>
                                        <select className="bg-transparent text-[9px] font-bold text-[#00ff6e] border border-[#00ff6e]/20 px-2 py-1 rounded outline-none appearance-none">
                                            <option className="bg-[#0a0f0d]">ON REQUEST</option>
                                            <option className="bg-[#0a0f0d]">AUTONOMOUS</option>
                                            <option className="bg-[#0a0f0d]">LOCKED</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'automation' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black text-white">Automation Strategy</h3>
                                <div className="space-y-4">
                                    <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Operating Mode</p>
                                    <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80">
                                        <option>Co-Pilot (Human-Guided)</option>
                                        <option>Sovereign Agent (High-Autonomy)</option>
                                        <option>Observation (Read-Only)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black text-white">Skill & MCP Registry</h3>
                                <div className="space-y-4">
                                    <p className="text-[#00ff6e] text-[9px] uppercase font-bold opacity-50">Injected Tactical Heuristics</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['DEX_ARBITRAGE', 'NFT_STRESSOR', 'STABLE_DEPEG', 'REENTRANCY_TRAP'].map(s => (
                                            <div key={s} className="p-3 bg-[#00ff6e]/5 border border-[#00ff6e]/20 rounded-xl flex justify-between items-center">
                                                <span className="text-[9px] font-bold text-[#00ff6e]">{s}</span>
                                                <input type="checkbox" defaultChecked className="accent-[#00ff6e]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </GlassCard>
    );
};
