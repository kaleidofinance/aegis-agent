import json
import os

class AegisSovereignHarness:
    """
    Institutional Governance Harness for Aegis.
    Dictates the level of human-augmented control over autonomous missions.
    """
    def __init__(self, config_path="aegis/settings.json"):
        self.config_path = config_path
        self.defaults = {
            "OFFENSIVE_AUTONOMY": "HIGH",         # Search/Fuzzing
            "REMEDIATION_GOVERNANCE": "MANUAL",   # Patch Generation
            "DEPLOYMENT_GUARD": "STRICT",         # Live State Changes
            "DIRECTIVE_REQUIRED_PHASES": [23, 25] # Remediation and Final Certification
        }
        self.settings = self._load_settings()

    def _load_settings(self):
        if os.path.exists(self.config_path):
            with open(self.config_path, "r") as f:
                return {**self.defaults, **json.load(f)}
        return self.defaults

    def check_directive_necessity(self, phase_id):
        """Check if a HumanDirective is required for the given phase."""
        return phase_id in self.settings["DIRECTIVE_REQUIRED_PHASES"]

    def get_directive(self, mission_id, phase_id):
        """Check the status of a specific human directive."""
        path = "aegis/state/directives.json"
        if not os.path.exists(path):
            return "PENDING"
        
        try:
            with open(path, "r") as f:
                directives = json.load(f)
                key = f"{mission_id}_{phase_id}"
                return directives.get(key, "PENDING")
        except Exception:
            return "PENDING"

    def grant_directive(self, mission_id, phase_id):
        """Programmatically grant a directive (CLI/API)."""
        os.makedirs("aegis/state", exist_ok=True)
        path = "aegis/state/directives.json"
        directives = {}
        if os.path.exists(path):
            try:
                with open(path, "r") as f:
                    directives = json.load(f)
            except Exception:
                directives = {}
        
        key = f"{mission_id}_{phase_id}"
        directives[key] = "GRANTED"
        
        with open(path, "w") as f:
            json.dump(directives, f, indent=4)
        print(f"[SovereignHarness] Directive GRANTED: {key}")

    def update_setting(self, key, value):
        """Update a harness rule via CLI or Dashboard."""
        self.settings[key] = value
        with open(self.config_path, "w") as f:
            json.dump(self.settings, f, indent=4)
        print(f"[SovereignHarness] Rule Updated: {key} -> {value}")
