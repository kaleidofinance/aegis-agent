from aegis.polyglot import LogicCrossCompiler

def run_reality_test():
    print("🚀 Initiating Aegis v10.0 Reality Audit...")
    
    # 1. Load the Toxic Blood (The Mutant Code)
    with open("./scratch/RariMutant.sol", "r") as f:
        mutant_code = f.read()

    # 2. Initialize the Cross-VM Bridge
    aegis_bridge = LogicCrossCompiler()
    
    # 3. Trigger the Rari-Forensic Skill
    print("🔍 Analyzing RariMutant.sol for Modular Reentrancy...")
    result = aegis_bridge.audit_compound_reentrancy(mutant_code)
    
    # 4. Final Mission Report
    print("-" * 50)
    if "vulnerability" in result:
        print(f"✅ MUTANT KILLED: {result['vulnerability']}")
        print("STATUS: Aegis Intelligence Validated.")
    else:
        print("❌ MISSION FAILED: Mutant Survived.")
    print("-" * 50)

if __name__ == "__main__":
    run_reality_test()
