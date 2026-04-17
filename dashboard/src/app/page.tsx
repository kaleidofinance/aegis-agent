"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsView } from '../components/SettingsView';
import {
  Shield, Activity, Search, Zap, AlertTriangle, CheckCircle2,
  ChevronRight, ExternalLink, Clock, TrendingUp, Lock,
  FileCode, Eye, BarChart3, Terminal, Settings, Bell
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────
type Mode = 'overview' | 'audit' | 'forensics' | 'stress';

interface ThreatEntry {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  target: string;
  status: 'blocked' | 'monitoring' | 'resolved';
  timestamp: string;
}

// ── Static Data ────────────────────────────────────────────
const THREATS: ThreatEntry[] = [
  { id: 'THR-001', type: 'Reentrancy', severity: 'critical', target: 'LendingPool.sol', status: 'blocked', timestamp: '2m ago' },
  { id: 'THR-002', type: 'Oracle Manipulation', severity: 'high', target: 'PriceFeed.sol', status: 'monitoring', timestamp: '8m ago' },
  { id: 'THR-003', type: 'Access Control', severity: 'medium', target: 'Governance.sol', status: 'resolved', timestamp: '14m ago' },
  { id: 'THR-004', type: 'Flash Loan Vector', severity: 'high', target: 'VaultProxy.sol', status: 'blocked', timestamp: '21m ago' },
  { id: 'THR-005', type: 'Slippage Exploit', severity: 'low', target: 'Router.sol', status: 'resolved', timestamp: '35m ago' },
];

// ── Severity Styling ───────────────────────────────────────
const severityConfig = {
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-500' },
  medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-500' },
  low: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
};

const statusConfig = {
  blocked: { text: 'text-red-400', label: 'Blocked' },
  monitoring: { text: 'text-yellow-400', label: 'Monitoring' },
  resolved: { text: 'text-emerald-400', label: 'Resolved' },
};

// ── Main Dashboard ─────────────────────────────────────────
export default function AegisDashboard() {
  const [activeMode, setActiveMode] = useState<Mode>('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  // Telemetry Integrations
  const [status, setStatus] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    // Initial deterministic logs
    setLogs([
        "0x54...2b: CALL -> ProtocolFacet.liquidateBorrow(0x32...1a)",
        "0x54...2b: [FAIL] revert: 'Unauthorized'",
        "[SOVEREIGNTY]: Maturity Level 3 Detected.",
        "[ARCHITECT]: Reentrancy Patch Generated.",
        "[TRAIL]: Analyzing trust boundaries..."
    ]);
  }, []);

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  // Poll Telemetry Backend
  useEffect(() => {
    const pollStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) return;
        const data = await res.json();
        setStatus(data);
        if (data.current_phase && logs[0] !== `[PHASE]: ${data.current_phase}`) {
          setLogs(prev => [`[PHASE]: ${data.current_phase}`, ...prev.slice(0, 7)]);
        }
      } catch (err) {
        // Backend offline
      }
    };
    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [logs]);

  // Handle Human Directive Granting to Backend
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
        console.log("Directive GRANTED.");
      }
    } catch (err) {
      console.error("Failed to map directive.");
    }
  };

  const navItems: { id: Mode; icon: React.ElementType; label: string }[] = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'audit', icon: FileCode, label: 'Audit' },
    { id: 'forensics', icon: Search, label: 'Forensics' },
    { id: 'stress', icon: Zap, label: 'Stress Test' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0d0b] text-white overflow-hidden">

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 border-r border-white/[0.06] flex flex-col bg-[#0c0f0d]">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Aegis</h1>
              <p className="text-[10px] text-white/30 font-medium">Sentinel v11.5</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeMode === item.id && !showSettings;
            return (
              <button
                key={item.id}
                onClick={() => {
                    setShowSettings(false);
                    setActiveMode(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <button 
            onClick={() => setShowSettings(true)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                showSettings ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <a href="https://kaleidofi.xyz" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all">
            <ExternalLink className="w-4 h-4" />
            Kaleido DeFi-OS
          </a>
        </div>
      </aside>

      {/* ── Main Content ───────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden relative">

        {/* Top Bar */}
        <header className="h-14 shrink-0 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#0c0f0d]/50 backdrop-blur-sm relative z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-white/80 capitalize">{showSettings ? 'Settings' : activeMode}</h2>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-medium">{isPaused ? 'Awaiting Human Directive' : 'All Systems Nominal'}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/30 font-mono">{currentTime} UTC</span>
            <button className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-all">
              <Bell className="w-4 h-4 text-white/40" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto w-full relative z-10">
          {showSettings ? (
            <div className="h-full w-full p-6">
                <SettingsView />
            </div>
          ) : (
             <div className="p-6 space-y-6">
                {/* ── Metric Cards ────────────────────────── */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                    { label: 'Threats Blocked', value: '48', change: '+3 today', icon: Shield, accent: 'text-emerald-400', bgAccent: 'bg-emerald-500/10' },
                    { label: 'Risk Rating', value: 'AA+', change: 'Institutional', icon: TrendingUp, accent: 'text-emerald-400', bgAccent: 'bg-emerald-500/10' },
                    { label: 'Active Guards', value: '1,250', change: '99.9% uptime', icon: Eye, accent: 'text-blue-400', bgAccent: 'bg-blue-500/10' },
                    { label: 'Vulnerabilities', value: '2', change: '1 critical', icon: AlertTriangle, accent: 'text-orange-400', bgAccent: 'bg-orange-500/10' },
                    ].map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-xl border border-white/[0.06] bg-[#0c0f0d] p-5 hover:border-white/[0.1] transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] text-white/40 font-medium">{metric.label}</span>
                        <div className={`p-1.5 rounded-lg ${metric.bgAccent}`}>
                            <metric.icon className={`w-3.5 h-3.5 ${metric.accent}`} />
                        </div>
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-white">{metric.value}</p>
                        <p className="text-[11px] text-white/30 mt-1">{metric.change}</p>
                    </motion.div>
                    ))}
                </div>

                {/* ── Main Grid ───────────────────────────── */}
                <div className="grid grid-cols-12 gap-4">

                    {/* Threat Monitor — 8 cols */}
                    <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-8 rounded-xl border border-white/[0.06] bg-[#0c0f0d] overflow-hidden"
                    >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-[13px] font-semibold text-white/80">Threat Monitor</h3>
                        </div>
                        <span className="text-[10px] text-white/30 font-medium">Live Feed</span>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 px-5 py-2.5 border-b border-white/[0.04] text-[10px] font-medium text-white/30 uppercase tracking-wider">
                        <span className="col-span-2">ID</span>
                        <span className="col-span-3">Type</span>
                        <span className="col-span-2">Severity</span>
                        <span className="col-span-2">Target</span>
                        <span className="col-span-2">Status</span>
                        <span className="col-span-1">Time</span>
                    </div>

                    {/* Table Rows */}
                    {THREATS.map((threat, i) => {
                        const sev = severityConfig[threat.severity];
                        const stat = statusConfig[threat.status];
                        return (
                        <motion.div
                            key={threat.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="grid grid-cols-12 px-5 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                        >
                            <span className="col-span-2 text-[11px] font-mono text-white/50">{threat.id}</span>
                            <span className="col-span-3 text-[11px] font-medium text-white/70">{threat.type}</span>
                            <span className="col-span-2">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold ${sev.text} ${sev.bg} ${sev.border} border px-2 py-0.5 rounded-full`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                                {threat.severity}
                            </span>
                            </span>
                            <span className="col-span-2 text-[11px] font-mono text-white/50">{threat.target}</span>
                            <span className={`col-span-2 text-[11px] font-medium ${stat.text}`}>{stat.label}</span>
                            <span className="col-span-1 text-[10px] text-white/30">{threat.timestamp}</span>
                        </motion.div>
                        );
                    })}
                    </motion.div>

                    {/* Protocol Health — 4 cols */}
                    <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="col-span-4 rounded-xl border border-white/[0.06] bg-[#0c0f0d] overflow-hidden"
                    >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-[13px] font-semibold text-white/80">Protocol Health</h3>
                        </div>
                    </div>

                    <div className="p-5 space-y-5">
                        {/* Maturity */}
                        <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] text-white/40">Maturity Level</span>
                            <span className="text-xs font-bold text-emerald-400">Level 3</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                            />
                        </div>
                        </div>

                        {/* Trust Zones */}
                        <div>
                        <span className="text-[11px] text-white/40 block mb-3">Trust Zones</span>
                        <div className="space-y-2">
                            {[
                            { zone: 'Admin', level: 'High', color: 'text-red-400' },
                            { zone: 'Oracle', level: 'Medium', color: 'text-yellow-400' },
                            { zone: 'User', level: 'Low', color: 'text-emerald-400' },
                            ].map((z) => (
                            <div key={z.zone} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                <span className="text-[11px] text-white/60 font-medium">{z.zone}</span>
                                <span className={`text-[10px] font-semibold ${z.color}`}>{z.level}</span>
                            </div>
                            ))}
                        </div>
                        </div>

                        {/* Hazards */}
                        <div>
                        <span className="text-[11px] text-white/40 block mb-3">Active Hazards</span>
                        <div className="p-3 rounded-lg bg-orange-500/[0.06] border border-orange-500/15">
                            <div className="flex items-start gap-2.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] font-medium text-orange-300">Single-Step Ownership</p>
                                <p className="text-[10px] text-orange-400/50 mt-0.5">Recommend 2-step transfer pattern</p>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Coverage */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <span className="text-[11px] text-white/40">Coverage</span>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-semibold text-emerald-400">Omni-Chain</span>
                        </div>
                        </div>
                    </div>
                    </motion.div>
                </div>

                {/* ── Bottom Row ──────────────────────────── */}
                <div className="grid grid-cols-12 gap-4">

                    {/* Neural Mission Logs — 5 cols */}
                    <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-5 rounded-xl border border-white/[0.06] bg-[#0c0f0d] overflow-hidden"
                    >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-[13px] font-semibold text-white/80">Neural Mission Logs</h3>
                        </div>
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                        </span>
                    </div>

                    <div className="p-4 space-y-1.5 font-mono text-[11px] max-h-[280px] overflow-y-auto">
                        <AnimatePresence>
                        {logs.map((log, i) => (
                        <motion.div
                            key={i + log}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-3 py-1.5 hover:bg-white/[0.02] px-2 rounded transition-colors"
                        >
                            <span className="text-emerald-400/80 shrink-0 select-none">AEGIS &gt;</span>
                            <span className="text-white/60">{log}</span>
                        </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                    </motion.div>

                    {/* Remediation Lab — 7 cols */}
                    <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className={`col-span-7 rounded-xl border bg-[#0c0f0d] overflow-hidden transition-all duration-700 ${isPaused ? 'border-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-white/[0.06]'}`}
                    >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-[13px] font-semibold text-white/80">Remediation Lab</h3>
                        </div>
                        {isPaused ? (
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">
                                Awaiting Human Directive
                            </span>
                        ) : (
                            <span className="text-[10px] font-medium text-emerald-400 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                Patch Verified
                            </span>
                        )}
                    </div>

                    <div className="p-5 space-y-5">
                        <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[11px] text-white/40 mb-1">Target Vulnerability</p>
                            <p className="text-sm font-semibold text-white">
                                {status?.findings?.[0]?.vulnerability || "Modular Reentrancy (Compound/Rari)"}
                            </p>
                        </div>
                        <span className="text-[10px] font-medium text-red-400 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                            Critical
                        </span>
                        </div>

                        {/* Code Block */}
                        <div className="rounded-lg bg-[#080a09] border border-white/[0.05] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04] bg-white/[0.02]">
                            <span className="text-[10px] text-white/30 font-mono">CEI-Enforcement.sol</span>
                            <span className="text-[10px] text-emerald-400/60">Patch Blueprint</span>
                        </div>
                        <pre className="p-4 font-mono text-[11px] text-emerald-400/80 leading-relaxed overflow-x-auto whitespace-pre">
{status?.findings?.[0]?.patch || `uint balanceBefore = token.balanceOf(address(this));

// Enforce Checks-Effects-Interactions
_enterCriticalSection();
_updateInternalState(amount);
_executeExternalCall(target, data);

require(
  token.balanceOf(address(this)) >= balanceBefore,
  "Aegis: Invariant violation"
);`}
                        </pre>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                        {isPaused && pending ? (
                            <button 
                                onClick={handleApprove}
                                className="w-full py-3 rounded-lg bg-emerald-500 text-black text-[12px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all"
                            >
                                Grant Human Directive: Apply Patch
                            </button>
                        ) : (
                            <>
                                <button className="flex-1 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-white/60 hover:bg-white/[0.06] hover:text-white/80 transition-all">
                                    Simulate on Fork
                                </button>
                                <button className="flex-1 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400 hover:bg-emerald-500/15 transition-all flex items-center justify-center gap-2">
                                    Deploy Patch
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </>
                        )}
                        </div>
                    </div>
                    </motion.div>
                </div>

             </div>
          )}
        </div>
      </main>
    </div>
  );
}
