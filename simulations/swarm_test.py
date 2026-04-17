import time
from aegis.swarm import AegisSwarmRegistry
from aegis.engine import AegisEngine
from aegis.sandbox import AegisSandbox

def run_swarm_simulation():
    print("="*60)
    print("  AEGIS v2.0: MULTI-AGENT SWARM SIMULATION  ")
    print("="*60)
    
    # 1. Initialize Registry & Sandbox
    swarm = AegisSwarmRegistry()
    sandbox = AegisSandbox()
    if not sandbox.start():
        return

    # 2. Simulate Agent 1 (Recon) Discovery
    print("[Swarm] Agent-Recon: Mapping Diamond Facets...")
    time.sleep(2)
    swarm.publish_belief(
        "Agent-Recon", 
        "vulnerability_found", 
        {"facet": "LendingFacet", "type": "Reentrancy", "confidence": 0.98}
    )

    # 3. Simulate Agent 2 (Sniper) Interception
    print("[Swarm] Agent-Sniper: Querying Hive Consensus...")
    intelligence = swarm.query_consensus("vulnerability_found")
    
    if intelligence:
        print(f"[Swarm] Agent-Sniper: INTERRUPT! Finding confirmed by Hive.")
        print(f" > Source:   {intelligence['value']['facet']}")
        print(f" > Strategy: Synthesizing attack for {intelligence['value']['type']}")
        
        # Launch Agent 2 to finalize the exploit
        engine = AegisEngine(
            target_address="0x54...2b",
            rpc_url=sandbox.rpc_url
        )
        engine.run_loop(iterations=2)

    print("="*60)
    print("[Swarm] Simulation Complete.")
    print("="*60)
    
    sandbox.stop()

if __name__ == "__main__":
    run_swarm_simulation()
