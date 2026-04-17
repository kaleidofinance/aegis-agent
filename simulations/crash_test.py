import time
from aegis.market import AegisMarket
from aegis.engine import AegisEngine
from aegis.sandbox import AegisSandbox

def run_economic_stress_test():
    print("="*60)
    print("  AEGIS v2.0: BLACK SWAN ECONOMIC STRESS TEST  ")
    print("="*60)
    
    # 1. Initialize Safe Environment
    sandbox = AegisSandbox()
    if not sandbox.start():
        return

    # 2. Warp the Market (The 'Black Swan')
    # Mocking a Chainlink Oracle at 0x... with price at Slot 1
    market = AegisMarket()
    ETH_ORACLE = "0x5FbDB2315678afecb367f032d93F642f64180aa3" # Example Mock
    CRASH_PRICE = "0x00000000000000000000000000000000000000000000000000000000000005DC" # $1500
    
    market.warp_price_oracle(ETH_ORACLE, "0x01", CRASH_PRICE)
    
    # 3. Launch Aegis to exploit the Bad Debt
    print("[Simulation] Launching Aegis Agent to hunt under-collateralized debt...")
    engine = AegisEngine(
        target_address="0x54...2b", # Target ProtocolFacet
        rpc_url=sandbox.rpc_url
    )
    
    # Inject Strategic Belief via Control
    engine.control.inject_belief(
        "Market prices have shifted by >50%. Prioritize liquidation logic.", 
        confidence=1.0
    )
    
    # Run the loop
    engine.run_loop(iterations=3)
    
    print("="*60)
    print("[Simulation] Test Complete.")
    print(" > Protocol State: EVALUATING INSOLVENCY")
    print("="*60)
    
    sandbox.stop()

if __name__ == "__main__":
    run_economic_stress_test()
