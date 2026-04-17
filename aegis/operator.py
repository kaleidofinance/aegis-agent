from aegis.wallet import AegisWallet
from web3 import Web3
import time

class AegisOperator:
    """
    The Live Execution Engine for Aegis v4.0.
    Handles the actual broadcasting of transactions and 'Autonomous Payment' logic.
    """
    
    def __init__(self, rpc_url, wallet_key=None):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.wallet = AegisWallet(provider_url=rpc_url)
        if wallet_key:
            self.wallet.load_wallet("primary", wallet_key)

    def execute_call(self, to_address, data, value_wei=0, gas_limit=200000):
        """
        Signs and broadcasts a live transaction to the blockchain.
        """
        if not self.w3.is_connected():
            return {"status": "error", "message": "RPC not connected"}

        acct_address = self.wallet.wallets["primary"]["address"]
        nonce = self.w3.eth.get_transaction_count(acct_address)
        
        tx = {
            'nonce': nonce,
            'to': to_address,
            'value': value_wei,
            'gas': gas_limit,
            'gasPrice': self.w3.eth.gas_price,
            'data': data,
            'chainId': self.w3.eth.chain_id
        }
        
        signed_tx = self.wallet.sign_transaction("primary", tx)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        print(f"[Operator] Transaction Broadcasted: {tx_hash.hex()}")
        return {"status": "pending", "hash": tx_hash.hex()}

    def pay_api_fee(self, provider_address, amount_wei):
        """
        Autonomous Payment Logic:
        Transfers funds to a service provider to 'refill' research credits.
        """
        print(f"[Operator] Initiating autonomous fee payment to provider: {provider_address}")
        return self.execute_call(provider_address, data="0x", value_wei=amount_wei)

    def wait_for_execution(self, tx_hash):
        """Blocks until the transaction is mined."""
        print(f"[Operator] Waiting for receipt of {tx_hash}...")
        return self.w3.eth.wait_for_transaction_receipt(tx_hash)

if __name__ == "__main__":
    # Example initialization
    # operator = AegisOperator(rpc_url="https://...", wallet_key="0x...")
    pass
