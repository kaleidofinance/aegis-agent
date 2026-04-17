# Aegis v2.0: Architectural Evolution Framework

This document tracks the research, design, and implementation of the 5 "God-Tier" architectural paths for the Aegis Agent.

---

## 📈 [PATH 1] Economic Stressor (Aegis-Market)
**Objective**: Transition from "Code Exploitation" to "Economic Exploitation."
- [ ] Task 1.1: Implement storage-slot manipulation for Price Oracles (Chainlink/UniV3).
- [ ] Task 1.2: Add `MarketStressor` module to perform Brownian motion fuzzing on pool reserves.
- [ ] Task 1.3: Integrate "MEV-Awareness" into the Strategist.

## 🐝 [PATH 2] Swarm Intelligence (Aegis-Swarm)
**Objective**: Distributed multi-agent research.
- [ ] Task 2.1: Implement "Belief Synchronization" via a shared Redis/State-file layer.
- [ ] Task 2.2: Design specialized agent roles (Liquidity Agent, Governance Agent, Logic Agent).

## 🛡️ [PATH 3] Symbolic Execution Bridge (Aegis-Verify)
**Objective**: Infinite precision via formal proofs.
- [ ] Task 3.1: Bridge the Strategist to `hevm` for symbolic execution of discovered payloads.
- [ ] Task 3.1: Automated Invariant Generation (AIG) for target facets.

## 🧠 [PATH 4] Vector Memory (Aegis-Recall)
**Objective**: Long-horizon "Deceptive" research.
- [ ] Task 4.1: Integrate a Vector DB (Chroma/Pinecone) for experience embedding.
- [ ] Task 4.2: Implement "Failure-Recall" to prevent the agent from repeating historical mistakes across sessions.

## 🕹️ [PATH 5] Steering Input (Aegis-Control)
**Objective**: Human-in-the-Loop guidance.
- [ ] Task 5.1: Update Dashboard UI with a "Mental Injection" text area.
- [ ] Task 5.2: Implement "Top-Down Intentions" to override autonomous planning.
