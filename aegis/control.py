import json
import os

class AegisControl:
    """
    The 'Human-in-the-Loop' core for Aegis v2.0.
    Allows engineers to steer the agent's research focus via 
    strategic belief injection.
    """
    
    def __init__(self, steering_file="./aegis/state/steering.json"):
        self.steering_file = steering_file
        if not os.path.exists(self.steering_file):
            with open(self.steering_file, "w") as f:
                json.dump({"manual_beliefs": []}, f)

    def inject_belief(self, belief_statement, confidence=1.0):
        """Injects a human hunch directly into the agent's belief system."""
        with open(self.steering_file, "r") as f:
            steering = json.load(f)
        
        steering["manual_beliefs"].append({
            "statement": belief_statement,
            "confidence": confidence,
            "source": "Human-In-The-Loop"
        })
        
        with open(self.steering_file, "w") as f:
            json.dump(steering, f, indent=4)
        print(f"[Control] Strategic belief injected: '{belief_statement}'")

    def get_steering_instructions(self):
        """Called by the Engine to see if there are new human instructions."""
        if not os.path.exists(self.steering_file):
            return []
        with open(self.steering_file, "r") as f:
            return json.load(f).get("manual_beliefs", [])
