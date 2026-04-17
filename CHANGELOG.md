# Changelog: Aegis Agent

All notable changes to the **Aegis Agent** (Powered by Kaleido Finance) will be documented in this file.

---

## [1.4.0] - 2026-04-12
### 🛡️ Professional Rebrand & Final Polishing
- **Branding**: Officially rebranded from 'Kaleido-Aegis' to **Aegis Agent powered by Kaleido Finance**.
- **Documentation**: Updated `README.md` and `QUICKSTART.md` with new brand hierarchy.
- **UI**: Updated the War Room dashboard header and CLI banners to reflect the new identity.
- **Independence**: Final checks on the standalone `dashboard/` directory for open-source readiness.

## [1.3.0] - 2026-04-12
### 🖼️ The War Room (Dashboard Update)
- **Frontend**: Launched a standalone Next.js dashboard in `/dashboard`.
- **UI Architecture**: Decoupled the UI from the main Kaleido frontend, porting the GlassUI library for independent operation.
- **Visuals**: Implemented **Kaleido Green** glassmorphism, background blobs, and the central **TEI Pulse** visualization.
- **Reporting**: Added on-screen "Security Intelligence Reports" with built-in PDF export controls.

## [1.2.0] - 2026-04-12
### 🏗️ Operational Excellence & Sandbox
- **Sandbox**: Implemented `aegis/sandbox.py` for automated Anvil fork management.
- **Safety**: Added state-snapshotting and instant-rollback capabilities (`evm_snapshot`).
- **Engine**: Integrated the Sandbox into the core BDI loop to prioritize zero-cost, high-fidelity testing.
- **Promotions**: Added the `--live` flag and mandatory safety interlocks for real on-chain execution.

## [1.1.0] - 2026-04-12
### 🧠 Intelligence Expansion
- **Datasets**: Integrated `DeFiHackLabs`, `SmartBugs`, and `Trail of Bits` into the `/data` moat.
- **Reflector**: Finalized the **Reflector** module for trace-driven self-correction.
- **Generalization**: Upgraded the `Recon` module to handle generic Web3 primitives (ERC20, ERC4626, etc.) beyond Diamond facets.
- **Monetizer**: Added the **Total Economic Impact (TEI)** calculation logic for impact quantifying.

## [1.0.0] - 2026-04-12
### 🚀 Initial Release
- **Cognitive Core**: Initial implementation of the BDI (Belief-Desire-Intention) Engine.
- **Harness**: Created `AegisHarness.py` for Foundry/Forge feedback loops.
- **Strategy**: Built the first `StrategyGenerator` for LLM-driven exploit drafting.
- **Architecture**: Laid the foundation for the autonomous DeFi research pipeline.
