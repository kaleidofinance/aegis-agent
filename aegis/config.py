import os
import json
from dotenv import load_dotenv

load_dotenv()

class AegisConfig:
    """
    Advanced Governance & Configuration Engine for Aegis v5.5.
    Manages Security, Permissions, Automation tiers, and MCP Customization.
    """
    
    def __init__(self, config_path="./aegis/config.json"):
        self.config_path = config_path
        self.settings = self.load_config()

    def load_config(self):
        default_settings = {
            "general": { "mission_name": "Aegis Prime", "theme": "dark-glass" },
            "intelligence": {
                "active_core": "gemini-3.1-pro",
                "use_local": False,
                "ollama_connection": "auto" # auto | api | cli
            },
            "security": {
                "terminal_auto_run": False, # If True, agent can run certain commands without approval
                "private_key_access": "on_request", # locked | on_request | autonomous
                "file_system_perms": "read_write",
                "max_gas_spend_limit": 0.05
            },
            "automation": {
                "strategy": "co_pilot", # co_pilot | autonomous | research_only
                "max_iterations": 5,
                "self_healing": True
            },
            "skills": {
                "mcp_servers": [],
                "active_tactics": ["dex_arbitrage", "nft_stressor"]
            },
            "advanced": {
                "temperature": 0.1,
                "top_p": 0.9,
                "max_context": 128000
            }
        }
        
        if os.path.exists(self.config_path):
            with open(self.config_path, 'r') as f:
                return json.load(f)
        return default_settings

    def persist(self):
        with open(self.config_path, 'w') as f:
            json.dump(self.settings, f, indent=4)
