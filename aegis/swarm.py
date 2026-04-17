import json
import os
import time

class AegisSwarmRegistry:
    """
    The 'Swarm Intelligence' core for Aegis v2.0.
    Manages shared mental states across multiple specialized agents.
    """
    
    def __init__(self, registry_file="./aegis/state/swarm_consensus.json"):
        self.registry_file = registry_file
        if not os.path.exists(os.path.dirname(self.registry_file)):
            os.makedirs(os.path.dirname(self.registry_file))
        if not os.path.exists(self.registry_file):
            self._save_consensus({})

    def _read_consensus(self):
        try:
            with open(self.registry_file, "r") as f:
                return json.load(f)
        except:
            return {}

    def _save_consensus(self, data):
        with open(self.registry_file, "w") as f:
            json.dump(data, f, indent=4)

    def publish_belief(self, agent_id, belief_key, belief_value, confidence=1.0):
        """Allows an agent to contribute a finding to the swarm."""
        consensus = self._read_consensus()
        consensus[f"{agent_id}:{belief_key}"] = {
            "value": belief_value,
            "confidence": confidence,
            "timestamp": time.time()
        }
        self._save_consensus(consensus)
        print(f"[Swarm] Agent {agent_id} published belief: {belief_key}")

    def query_consensus(self, belief_key):
        """Agents call this to see what the swarm collectively knows."""
        consensus = self._read_consensus()
        # Returns the most confident belief across all agents for this key
        relevant = {k: v for k, v in consensus.items() if k.split(":")[1] == belief_key}
        if not relevant:
            return None
        return max(relevant.values(), key=lambda x: x["confidence"])

if __name__ == "__main__":
    swarm = AegisSwarmRegistry()
    swarm.publish_belief("ReconAgent-01", "reentrancy_found", True, confidence=0.95)
    print(f"Swarm Consensus: {swarm.query_consensus('reentrancy_found')}")
