import sys
import os
# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from aegis.engine import AegisEngine

def run_self_audit():
    """
    Sovereign Self-Audit mission.
    Aegis v28.0 audits its own 19-phase master architecture.
    """
    print("="*60)
    print("      A E G I S   S E L F - A U D I T      ")
    print("    Code-to-Code Sovereignty Validation    ")
    print("="*60)
    
    # Target our own tactical skills repository
    target_path = os.path.abspath("./aegis")
    
    engine = AegisEngine(
        target_address=target_path,
        mode="full",
        model="gemini-3.1-pro", # High-fidelity neural core
        state_dir="./aegis/state/self_audit"
    )
    
    # Execute the 19-phase loop once for full architectural verification
    engine.run_mission(iterations=1)
    
    print("="*60)
    print("[Aegis] Self-Audit Mission Complete.")
    print(f"Results recorded to: ./aegis/state/self_audit/mission_status.json")

if __name__ == "__main__":
    run_self_audit()
