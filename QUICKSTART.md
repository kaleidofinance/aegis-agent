# Quickstart Guide: Aegis Agent
**Powered by Kaleido Finance**

Welcome to the future of automated smart contract security. **Aegis Agent** is an industrial-grade BDI agent designed to discover, validate, and quantify DeFi vulnerabilities.

## 🚀 30-Second Installation

1. **System Requirements**: Ensure you have [Foundry](https://book.getfoundry.sh/) and [Slither](https://github.com/crytic/slither) installed.
2. **Run Setup**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

## 🧠 Core Methodology: The "Aegis Cycle"

Aegis operates in a continuous BDI (Belief-Desire-Intention) loop:

1. **Recon**: Maps Diamond Facets (EIP-2535) and identifies storage layouts.
2. **Strategy**: Synthesizes recon data with the **DeFiHackLabs** exploit database to draft a plan.
3. **Execution**: Simulations run in the Forge harness on a forked network.
4. **Reflection**: Uses **Quimera-style** trace analysis to fix reverts and refine the attack.
5. **Monetization**: Calculates the **Total Economic Impact (TEI)** in USD.

## 🛠 Usage Examples

### Stress Test a Local Diamond
```bash
python3 -m aegis.main --target 0x5FbDB2315678afecb367f032d93F642f64180aa3 --rpc http://localhost:8545
```

### High-Intensity Research (Multiple Iterations)
```bash
python3 -m aegis.main --target <ADDRESS> --iterations 20 --rpc <RPC_URL>
```

## 📂 Project Structure
- `/aegis`: The cognitive core (Engine, Strategy, Reflector, Monetizer).
- `/harness`: The execution sanctuary via Foundry.
- `/skills`: Procedural guidance for agent specific tasks.
- `/data`: Historical exploit intelligence and research foundation.

## ⚖️ License & Ethical Use
Kaleido-Aegis is released under the MIT License. It is intended for **defensive security research** and stress-testing your own protocols. Hack ethically.
