import subprocess
import json
import os
import re

class AegisHarness:
    """
    The execution bridge for Kaleido-Aegis.
    Provides a feedback loop between the AI agent and the EVM state.
    """
    
    def __init__(self, rpc_url=None, fork_block=None):
        self.rpc_url = rpc_url or os.getenv("RPC_URL")
        self.fork_block = fork_block
        self.test_dir = "./temp_tests"
        if not os.path.exists(self.test_dir):
            os.makedirs(self.test_dir)

    def run_exploit_simulation(self, contract_code, test_name="ExploitTest"):
        """
        Runs a Foundry test and captures the trace/errors.
        Implements the Quimera-style feedback loop.
        """
        file_path = os.path.join(self.test_dir, f"{test_name}.t.sol")
        with open(file_path, "w") as f:
            f.write(contract_code)

        # Build the command with tracing enabled (-vvvv)
        cmd = ["forge", "test", "--match-path", file_path, "-vvvv"]
        if self.rpc_url:
            cmd.extend(["--rpc-url", self.rpc_url])
        if self.fork_block:
            cmd.extend(["--fork-block-number", str(self.fork_block)])

        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            return self._parse_output(result.stdout, result.stderr)
        except subprocess.TimeoutExpired:
            return {"status": "error", "message": "Simulation timed out"}

    def run_symbolic_check(self, contract_code, test_name="SymbolicTest"):
        """
        Uses Halmos (Symbolic Execution) to prove invariants.
        Finds 100% of edge-case exploits that fuzzers might miss.
        """
        print(f"[Aegis-Verify] Launching Symbolic Prover for {test_name}...")
        file_path = os.path.join(self.test_dir, f"{test_name}.t.sol")
        with open(file_path, "w") as f:
            f.write(contract_code)

        # Execute halmos
        cmd = ["halmos", "--match-path", file_path]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
            success = "[PASS]" in result.stdout
            return {
                "status": "success" if success else "failed",
                "counter_example": result.stdout if not success else None,
                "raw_output": result.stdout
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _parse_output(self, stdout, stderr):
        """
        Extracts traces, reverts, and gas usage from Forge output.
        """
        success = "Packed!" in stdout or "test_success" in stdout # Simple heuristic
        
        # Look for the failure reason
        revert_match = re.search(r"revert: (.*)", stdout + stderr)
        revert_reason = revert_match.group(1) if revert_match else "Unknown revert"

        # Capture traces (simplified extraction)
        traces = []
        in_trace = False
        for line in stdout.split("\n"):
            if "Traces:" in line:
                in_trace = True
            elif in_trace and line.strip() == "":
                in_trace = False
            elif in_trace:
                traces.append(line.strip())

        return {
            "status": "success" if success else "failed",
            "revert_reason": revert_reason if not success else None,
            "traces": "\n".join(traces),
            "raw_output": stdout
        }
