# 🛡️ Aegis Agent
**Powered by Kaleido Finance**

**Aegis Agent** is an industrial-grade, AI-driven security agent designed to autonomously stress-test DeFi protocols, discover exploit paths, and quantify economic risk in a high-fidelity sandbox. 

By combining a **Belief-Desire-Intention (BDI)** cognitive architecture with a **trace-driven feedback loop**, Aegis moves beyond static analysis to perform active, profit-seeking security research.

---

## 🏗️ Project Architecture

Aegis is divided into two primary cores, designed for modularity and open-source flexibility:

### 1. The Logic Engine (Python Backend)
Located in `/aegis`, this is the agent's "Brain."
- **BDI Engine**: Maintains persistent mental states to plan long-horizon attacks.
- **Reflector Module**: Analyzes EVM traces from failed simulations to self-correct exploit code.
- **Sandbox Orchestrator**: Manages local **Anvil** forks for zero-cost, private testing.
- **Global Data Moat**: Leverages datasets from `DeFiHackLabs`, `SmartBugs`, and `Trail of Bits`.

### 2. The War Room (Next.js Dashboard)
Located in `/dashboard`, this is the "Command Center."
- **Liquid UI System**: Reuses Kaleido's signature glassmorphic components (`GlassCard`, `GlowButton`).
- **TEI Ticker**: Visualizes **Total Economic Impact** in real-time.
- **BDI Viewer**: Monitors the agent's "Thought Process" (Beliefs, Desires, Intentions).
- **Intelligence Reports**: Generates professional PDF security audits based on sandbox findings.

---

## 🚀 Quick Start

### Prerequisites
- **Foundry**: Required for the EVM Sandbox (`anvil`) and simulations (`forge`).
- **Python 3.10+**: For the BDI Engine.
- **Node.js 18+**: For the War Room Dashboard.

### Step 1: Initialize the Engine
```bash
# Setup dependencies and datasets
./setup.sh

# Start an autonomous research session against a target
python -m aegis.main --target <CONTRACT_ADDRESS> --fork-url <MAINNET_RPC>
```

### Step 2: Launch the War Room
```bash
cd dashboard
npm install
npm run dev
```
Navigate to `http://localhost:3000` to monitor the agent's live traces and TEI.

---

## 🧠 The Intelligence Loop

1. **Recon**: Aegis fingerprints the target (Diamond Facet, ERC20, Vault, etc.).
2. **Strategy**: Synthesizes a Solidity exploit payload based on global vulnerability datasets.
3. **Simulate**: Executes the payload on a local Anvil fork.
4. **Reflect**: If the exploit fails, the **Reflector** parses the trace, identifies the revert reason, and "fixes" the source code for the next iteration.
5. **Monetize**: Calculates the USD value of the successful drain and reports it to the Dashboard.

---

## 🌐 Open Source & Contribution
Kaleido-Aegis is built with a decoupled architecture. You can contribute to the **Logic Engine** (Python) or the **War Room** (React) independently. 

*For security researchers: Please contribute new exploit patterns to the `/data` directory following the DeFiHackLabs format.*

---
**Maintained by the Kaleido Security Team.**
