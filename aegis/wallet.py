from eth_account import Account
import os
import json
import hashlib
import base64
from web3 import Web3
from cryptography.fernet import Fernet

# Optional multichain imports
try:
    from bip_utils import (
        Bip39SeedGenerator, Bip44, Bip44Coins, Substrate, SubstrateCoins, 
        Bip39MnemonicGenerator, Bip39Languages, Bip44Changes
    )
except ImportError:
    pass

class AegisVault:
    """
    Secure Encrypted Persistence for Aegis Wallets.
    Uses AES-128 (Fernet) to protect the wallet state.
    """
    def __init__(self, vault_path, password=None):
        self.path = vault_path
        self.password = password or os.getenv("AEGIS_VAULT_KEY", "default-insecure-key")
        self.key = self._derive_key(self.password)
        self.data = {"type": "individual", "wallets": {}, "mnemonic": None}

    def _derive_key(self, password):
        """Derives a Fernet-compatible key from a password."""
        digest = hashlib.sha256(password.encode()).digest()
        return base64.urlsafe_b64encode(digest)

    def encrypt(self, plaintext):
        f = Fernet(self.key)
        return f.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext):
        f = Fernet(self.key)
        return f.decrypt(ciphertext.encode()).decode()

    def save(self):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        encrypted_data = self.encrypt(json.dumps(self.data))
        with open(self.path, 'w') as f:
            f.write(encrypted_data)

    def load(self):
        if not os.path.exists(self.path):
            return False
        try:
            with open(self.path, 'r') as f:
                encrypted_data = f.read()
            self.data = json.loads(self.decrypt(encrypted_data))
            return True
        except Exception as e:
            print(f"[Vault] Failed to load vault: {e}")
            return False

class AegisWallet:
    """
    Multichain Wallet Manager for Aegis.
    Supports HD (Master Seed) and Individual key strategies.
    """
    def __init__(self, vault_path="aegis/state/vault.enc", password=None, provider_url=None):
        self.w3 = Web3(Web3.HTTPProvider(provider_url)) if provider_url else None
        self.vault = AegisVault(vault_path, password)
        self.vault.load()
        self.wallets = self.vault.data["wallets"]
        
        # Ensure a persistent Relay Identity exists for MEV/Flashbots
        if "relay_identity" not in self.vault.data:
            self.vault.data["relay_identity"] = Account.create().key.hex()
            self.vault.save()

    def get_relay_signer(self):
        """Returns the Account object for the MEV Relay Identity."""
        return Account.from_key(self.vault.data["relay_identity"])

    def init_hd_mode(self, mnemonic=None):
        """Initializes the wallet manager in HD Mode with a Master Seed."""
        if not mnemonic:
            mnemonic = Bip39MnemonicGenerator().FromWordsNumber(12)
        
        self.vault.data["type"] = "hd"
        self.vault.data["mnemonic"] = str(mnemonic)
        self.vault.save()
        print(f"[AegisWallet] HD Mode Initialized with Master Mnemonic.")
        return mnemonic

    def generate_batch(self, count=1, prefix="audit"):
        """Generates a batch of wallets based on the current strategy."""
        if self.vault.data["type"] == "hd":
            return self._derive_hd_batch(count, prefix)
        else:
            return self._generate_individual_batch(count, prefix)

    def _derive_hd_batch(self, count, prefix):
        mnemonic = self.vault.data["mnemonic"]
        seed_bytes = Bip39SeedGenerator(mnemonic).Generate()
        
        results = []
        for i in range(count):
            label = f"{prefix}_{len(self.wallets) + 1}"
            
            # 1. Ethereum (BIP44)
            eth_ctx = Bip44.FromSeed(seed_bytes, Bip44Coins.ETHEREUM).Purpose().Coin().Account(0).Change(Bip44Changes.CHAIN_EXT).AddressIndex(i)
            
            # 2. Polkadot (Substrate)
            dot_ctx = Substrate.FromSeed(seed_bytes, SubstrateCoins.POLKADOT).DerivePath(f"//hard//{i}")
            
            # 3. Solana (BIP44 Ed25519)
            sol_ctx = Bip44.FromSeed(seed_bytes, Bip44Coins.SOLANA).Purpose().Coin().Account(0).Change(Bip44Changes.CHAIN_EXT).AddressIndex(i)

            wallet_entry = {
                "eth_address": eth_ctx.PublicKey().ToAddress(),
                "eth_key": eth_ctx.PrivateKey().Raw().ToHex(),
                "dot_address": dot_ctx.PublicKey().ToAddress(),
                "dot_key": dot_ctx.PrivateKey().Raw().ToHex(),
                "sol_address": sol_ctx.PublicKey().ToAddress(),
                "sol_key": sol_ctx.PrivateKey().Raw().ToHex()
            }
            self.wallets[label] = wallet_entry
            results.append({label: wallet_entry})

        self.vault.save()
        return results

    def _generate_individual_batch(self, count, prefix):
        results = []
        for i in range(count):
            label = f"{prefix}_{len(self.wallets) + 1}"
            acct = Account.create()
            wallet_entry = {
                "eth_address": acct.address,
                "eth_key": acct.key.hex()
            }
            self.wallets[label] = wallet_entry
            results.append({label: wallet_entry})
        
        self.vault.save()
        return results

    def get_wallet(self, label):
        return self.wallets.get(label)

    def sign_transaction(self, label, tx_dict, chain="eth"):
        wallet = self.get_wallet(label)
        if not wallet:
            raise Exception(f"Wallet '{label}' not found.")
        
        key = wallet.get(f"{chain}_key")
        if not key:
            raise Exception(f"No key for chain '{chain}' in wallet '{label}'.")
        
        if chain == "eth":
            return Account.sign_transaction(tx_dict, key)
        # Add signers for DOT/SOL here as needed
        return None
