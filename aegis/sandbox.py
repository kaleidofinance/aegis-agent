import subprocess
import time
import requests
import os

class AegisSandbox:
    """
    Manages the local Anvil fork environment.
    Allows the agent to stress-test attacks in a high-fidelity 'Safe Room'
    before promoting them to a real network.
    """
    
    def __init__(self, fork_url=None, port=8545):
        self.fork_url = fork_url
        self.port = port
        self.rpc_url = f"http://127.0.0.1:{self.port}"
        self.process = None

    def start(self):
        """Launches Anvil as a background process."""
        print(f"[Sandbox] Starting Anvil on port {self.port}...")
        
        cmd = ["anvil", "--port", str(self.port)]
        if self.fork_url:
            print(f"[Sandbox] Forking from {self.fork_url}...")
            cmd.extend(["--fork-url", self.fork_url])
            
        # Launch Anvil in the background
        self.process = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Wait for Anvil to be ready
        retries = 10
        while retries > 0:
            try:
                response = requests.post(self.rpc_url, json={"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1})
                if response.status_code == 200:
                    print("[Sandbox] Anvil is live and ready.")
                    return True
            except:
                pass
            time.sleep(1)
            retries -= 1
            
        print("[Sandbox] Error: Anvil failed to start.")
        return False

    def stop(self):
        """Stops the Anvil background process."""
        if self.process:
            print("[Sandbox] Tearing down Anvil environment...")
            self.process.terminate()
            self.process = None

    def create_snapshot(self):
        """Creates an EVM state snapshot for instant rollback."""
        payload = {"jsonrpc": "2.0", "method": "evm_snapshot", "params": [], "id": 1}
        response = requests.post(self.rpc_url, json=payload)
        return response.json().get("result")

    def revert_to_snapshot(self, snapshot_id):
        """Rolls back the entire world state to a previously saved point."""
        print(f"[Sandbox] Rolling back to snapshot {snapshot_id}...")
        payload = {"jsonrpc": "2.0", "method": "evm_revert", "params": [snapshot_id], "id": 1}
        requests.post(self.rpc_url, json=payload)

    def generate_mutants(self, code_snippet):
        """
        Mutation Testing Suite v6.6 (Trail of Bits 'Agentic Era' Logic).
        Injects intentional, subtle logic errors to test the agent's own audit quality.
        """
        print("[AegisSandbox] Generating adversarial mutants for self-testing...")
        mutants = []
        # Logic to subtly change >= to >, transform token.decimals() to 18, etc.
        mutations = [
            code_snippet.replace(">=", ">"),
            code_snippet.replace("msg.sender", "tx.origin"),
            code_snippet.replace("10**18", "10**6")
        ]
        for m in mutations:
            mutants.append({"mutant_code": m, "target_logic": "precision/access"})
        return mutants

if __name__ == "__main__":
    # Test run
    sandbox = AegisSandbox()
    if sandbox.start():
        sid = sandbox.create_snapshot()
        print(f"World Snapshot created: {sid}")
        sandbox.stop()
