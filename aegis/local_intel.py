import psutil
import platform
import subprocess
import os
import requests

class AegisLocalIntel:
    """
    Hardware-Aware Intelligence & Bootstrap Engine for Aegis v5.4.
    Autonomously installs Ollama, Medusa, and pulls models based on OS.
    """
    
    def __init__(self, ollama_host="http://localhost:11434"):
        self.host = ollama_host
        self.os_type = platform.system()

    def is_ollama_installed(self):
        """Checks if the ollama binary is available in the system PATH."""
        try:
            subprocess.check_output(['ollama', '--version'])
            return True
        except:
            return False

    def is_medusa_installed(self):
        """Checks if the Medusa fuzzer is available in the system."""
        try:
            subprocess.check_output(['medusa', 'version'])
            return True
        except:
            return False

    def bootstrap_ollama(self):
        """[One-Click Bootstrap] Detects OS and performs an autonomous installation."""
        print(f"[AegisBootstrap] Detected OS: {self.os_type}. Initiating Ollama installation...")
        if self.os_type == "Darwin": # macOS
            cmd = "curl -L https://ollama.com/download/Ollama-darwin.zip -o ollama.zip && unzip ollama.zip"
            subprocess.run(cmd, shell=True, check=True)
        elif self.os_type == "Linux":
            cmd = "curl -fsSL https://ollama.com/install.sh | sh"
            subprocess.run(cmd, shell=True, check=True)
        return self.is_ollama_installed()

    def bootstrap_medusa(self):
        """Autonomous Medusa Installation via Go."""
        print("[AegisBootstrap] Medusa fuzzer not detected. Initiating Go-based installation...")
        cmd = "go install github.com/crytic/medusa@latest"
        try:
            subprocess.run(cmd, shell=True, check=True)
            return True
        except Exception as e:
            print(f"[AegisBootstrap] Medusa Install Failed: {str(e)}")
            return False

    def get_system_specs(self):
        """Detects RAM, CPU, and GPU capabilities."""
        total_ram = psutil.virtual_memory().total / (1024**3)
        return {
            "ram_gb": round(total_ram, 2),
            "cpu_cores": psutil.cpu_count(logical=False),
            "os": self.os_type
        }

    def get_recommendation(self):
        ram = self.get_system_specs()["ram_gb"]
        
        # 2026 Intelligence Scaling (RAM-Aware)
        if ram < 16: 
            return {"model": "minimax-m2.7:latest", "reason": "Fast Forensics (Low Latency)"}
        if ram < 32: 
            return {"model": "deepseek-v3.2:latest", "reason": "Mathematical Precision"}
        if ram < 64: 
            return {"model": "gemma-4-31b-it:latest", "reason": "High-Fidelity Interaction"}
        if ram < 128:
            return {"model": "llama-3.3-70b:latest", "reason": "Sovereign Reasoning Tier"}
        
        return {"model": "cogito-671b:latest", "reason": "Ultra-Logic Multi-Expertise Tier"}

    def pull_recommended_model(self):
        model_name = self.get_recommendation()["model"]
        subprocess.run(["ollama", "pull", model_name], check=True)
        return True
