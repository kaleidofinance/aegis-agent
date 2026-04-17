#!/bin/bash

echo "===================================================="
echo "    Kaleido-Aegis Environment Initializer"
echo "===================================================="

# 1. Check for Foundry (Forge/Cast)
if ! command -v forge &> /dev/null
then
    echo "[!] Forge could not be found. Please install Foundry (https://book.getfoundry.sh/getting-started/installation)."
    exit 1
else
    echo "[✓] Foundry detected."
fi

# 2. Check for Slither
if ! command -v slither &> /dev/null
then
    echo "[!] Slither could not be found. Please install Slither (pip3 install slither-analyzer)."
    exit 1
else
    echo "[✓] Slither detected."
fi

# 3. Create necessary directories
echo "[*] Creating state and data directories..."
mkdir -p aegis/state data/results

# 4. Initialize mental states
if [ ! -f aegis/state/beliefs.json ]; then
    echo "[*] Initializing default agent mental states..."
    echo '{}' > aegis/state/beliefs.json
    echo '[]' > aegis/state/intentions.json
    echo '[{"id": "D1", "goal": "Maximize Protocol Profit", "priority": 10}]' > aegis/state/desires.json
fi

echo "===================================================="
echo "[SUCCESS] Kaleido-Aegis is ready for operational research."
echo "Run: python3 -m aegis.main --target <ADDRESS>"
echo "===================================================="
