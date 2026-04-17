import requests
import re
import os

class AegisIngestor:
    """
    The 'Scout' module for Aegis v2.0.
    Converts English prompts, Web URLs, and GitHub links into 
    actionable target addresses and source code.
    """
    
    def __init__(self):
        self.eth_address_pattern = r'0x[a-fA-F0-9]{40}'

    def ingest_from_prompt(self, prompt):
        """
        Parses a plain English prompt to find a target.
        Matches addresses or triggers a web-search for the protocol.
        """
        addresses = re.findall(self.eth_address_pattern, prompt)
        if addresses:
            print(f"[Scout] Found target address in prompt: {addresses[0]}")
            return {"address": addresses[0], "source": "prompt"}
        
        # In a full implementation, this calls an LLM to find the address 
        # based on the protocol name mentioned in the prompt.
        print(f"[Scout] No address found. Triggering protocol search for: '{prompt}'")
        return None

    def ingest_from_github(self, github_url):
        """
        Clones a repository and extracts contract source code
        to feed into the Strategist.
        """
        print(f"[Scout] Cloning repository: {github_url}")
        # Logic to clone and walk the filesystem for .sol files
        return {"repo_path": "./aegis/temp_repo", "source": "github"}

    def ingest_from_url(self, url):
        """
        Scrapes a protocol website or documentation for 
        deployed contract addresses.
        """
        print(f"[Scout] Scrapping URL for contract endpoints: {url}")
        try:
            response = requests.get(url, timeout=10)
            addresses = re.findall(self.eth_address_pattern, response.text)
            if addresses:
                # Prioritizes common naming conventions like 'Proxy' or 'Vault'
                return {"address": addresses[0], "source": "web_scrape"}
        except Exception as e:
            print(f"[Scout] Scraping failed: {str(e)}")
        return None
