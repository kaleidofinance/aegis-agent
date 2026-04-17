import requests
import json
import os
try:
    import fickling
    # Bio-Security Hook: Protect the Neural Bridge from poisoned weights/pickles
    fickling.hook.activate_safe_ml_environment()
except ImportError:
    fickling = None

class AegisNeuralBridge:
    """
    Sovereign Intelligence Router v16.0.
    Neural Sandbox: Protected via Trail of Bits' Fickling.
    Bridges Aegis to both Local Ollama and Cloud Provider APIs.
    """
    
    def __init__(self, keys=None, ollama_host="http://localhost:11434", also_allow_imports=None):
        self.keys = keys or {}
        self.ollama_host = ollama_host
        if fickling and also_allow_imports:
            fickling.hook.activate_safe_ml_environment(also_allow=also_allow_imports)

    def generate(self, prompt, model="gemini-3.1-pro", temperature=0.1):
        """Routes the generation request based on the model name and licensing tags."""
        
        # 1. Detection: Explicit Cloud Overrides
        if "(Cloud)" in model or "gpt" in model.lower() or "gemini" in model.lower() or "claude" in model.lower():
            return self._generate_cloud(prompt, model, temperature)

        # 2. Local Pattern Matcher (Ollama)
        local_patterns = ["llama", "gemma", "deepseek", "cogito", "minimax", "glm", "kimi"]
        is_local = any(p in model.lower() for p in local_patterns)
        
        if is_local:
            return self._generate_local(prompt, model, temperature)
        else:
            return self._generate_cloud(prompt, model, temperature)

    def _generate_local(self, prompt, model, temperature):
        """Direct bridge to local Ollama API."""
        print(f"[Neural] Routing to Local Ollama -> {model}")
        try:
            url = f"{self.ollama_host}/api/generate"
            payload = {
                "model": model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": temperature
                }
            }
            response = requests.post(url, json=payload, timeout=60)
            response.raise_for_status()
            return response.json().get("response", "[Error: Empty Local Response]")
        except Exception as e:
            return f"[Neural Error: Local Bridge Failed] {str(e)}"

    def _generate_cloud(self, prompt, model, temperature):
        """Bridge to Cloud Providers (Gemini / OpenAI / Claude)."""
        print(f"[Neural] Routing to Cloud Provider -> {model}")
        # Simplified for demonstration - would use relevant SDKs based on self.keys
        key = self.keys.get("gemini") or os.getenv("GOOGLE_API_KEY")
        if not key:
            return "[Neural Error: Missing API Key for Cloud Model]"
        
        return f"[Cloud Logic Reflected] Auditing via {model}..."
