import subprocess
import json
import os
import re

class AegisRecon:
    """
    The 'Senses' of Kaleido-Aegis.
    Responsible for mapping protocol architecture, facet layouts, and storage slots.
    """
    
    def __init__(self, contract_dir="../smart-contract"):
        self.contract_dir = contract_dir

    def scan_target(self, address, rpc_url="http://localhost:8545"):
        """Unified entry point for protocol reconnaissance."""
        print(f"[Recon] Initiating Full Scan for {address}...")
        results = {
            "address": address,
            "protocol_type": self.detect_general_protocol(address, rpc_url),
            "status": "SCANNED"
        }
        return results

    def map_diamond_facets(self, diamond_address, rpc_url):
        """
        Uses 'cast' to find all facet addresses and selectors.
        Requires the DiamondLoupeFacet to be present on the target.
        """
        print(f"[Recon] Mapping Diamond facets for {diamond_address}...")
        
        # Command to call facets() on the Diamond (Loupe Facet)
        # facets() returns address[], bytes4[][]
        cmd = ["cast", "call", diamond_address, "facets()", "--rpc-url", rpc_url]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
            if result.returncode != 0:
                return {"status": "error", "message": result.stderr}
            
            # Simple parsing of the cast output (hex addresses and selectors)
            # In a production version, we would use a library like 'eth-abi'
            return {"status": "success", "raw_data": result.stdout}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def analyze_storage_layout(self, contract_name):
        """
        Uses 'slither' to extract the storage layout of a specific contract/facet.
        Helps detect AppStorage collisions.
        """
        print(f"[Recon] Analyzing storage layout for {contract_name}...")
        
        # Find the file path for the contract
        contract_path = self._find_contract_path(contract_name)
        if not contract_path:
            return {"status": "error", "message": f"Contract {contract_name} not found"}

        cmd = ["slither", contract_path, "--print", "storage-layout", "--json", "-"]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            if result.returncode != 0:
                return {"status": "error", "message": result.stderr}
                
            return {"status": "success", "data": json.loads(result.stdout)}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def detect_general_protocol(self, address, rpc_url):
        """
        Characterizes a target contract based on standard interfaces.
        Uses 'cast' to probe for function selectors of common DeFi patterns.
        """
        print(f"[Recon] Detecting protocol type for {address}...")
        
        signatures = {
            "ERC20": "totalSupply()",
            "ERC721": "ownerOf(uint256)",
            "ERC4626": "asset()",
            "UniV2Pair": "getReserves()",
            "Diamond": "facets()"
        }
        
        results = {}
        for name, sig in signatures.items():
            cmd = ["cast", "call", address, sig, "--rpc-url", rpc_url]
            res = subprocess.run(cmd, capture_output=True, text=True)
            results[name] = (res.returncode == 0)
            
        print(f"[Recon] Detection Complete: {results}")
        return results

    def _find_contract_path(self, contract_name):
        """Helper to locate .sol files in the smart-contract directory."""
        for root, dirs, files in os.walk(self.contract_dir):
            if f"{contract_name}.sol" in files:
                return os.path.join(root, f"{contract_name}.sol")
        return None

if __name__ == "__main__":
    # Test Recon (Requires forge/slither installed)
    recon = AegisRecon()
    print("Recon module initialized.")
