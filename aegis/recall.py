import json
import os

class AegisRecall:
    """
    The 'Vector Memory' core for Aegis v2.0.
    Stores historical failures and successful fixes to 
    accelerate future research sessions.
    """
    
    def __init__(self, memory_path="./aegis/recall/experience.json"):
        self.memory_path = memory_path
        
        # High-IQ Invariants extracted from training.valvessecurity.com
        self.expert_invariants = {
            "lending": [
                "CollateralValue >= TotalDebt * LiquidationThreshold",
                "InterestAccumulated >= TimeDelta * Rate",
                "TotalProtocolDebt <= GlobalBorrowCap"
            ],
            "amm": [
                "K_Value (X*Y) >= Previous_K",
                "Slippage <= MaxAllowedSlippage",
                "LPTokenSupply matches NetAssetValue"
            ],
            "staking": [
                "TotalRewardsDistributed <= RewardPoolBalance",
                "UserShare <= (UserDeposit / TotalStaked) * TotalRewards"
            ]
        }
        
        # High-Fidelity Dimensional Failure Patterns (Trail of Bits Mar 2024 Research)
        self.dimensional_scenarios = {
            "rate_confusion": {
                "pattern": "[ASSET] + ([ASSET] * [PRICE])",
                "risk": "Incorrect unit normalization leading to balance corruption"
            },
            "temporal_slip": {
                "pattern": "([STAKE] * [TIME]) / [SCALAR]",
                "risk": "Time-scaled rewards missing temporal unit normalization"
            },
            "precision_drift": {
                "pattern": "([USDC_6] * [WETH_18]) / 10**18",
                "risk": "Dimensional mismatch in cross-decimal interactions"
            }
        }

        if not os.path.exists(os.path.dirname(self.memory_path)):
            os.makedirs(os.path.dirname(self.memory_path))
        if not os.path.exists(self.memory_path):
            with open(self.memory_path, "w") as f:
                json.dump([], f)

    def store_lesson(self, error_trace, fix_strategy, impact_usd):
        """Stores a successful fix in the long-term memory."""
        memory = self._load()
        memory.append({
            "error_pattern": error_trace[:200], # Store snippet
            "fix": fix_strategy,
            "impact": impact_usd,
            "success": True
        })
        self._save(memory)

    def query_memory(self, current_error):
        """Checks if a similar error has been fixed before."""
        memory = self._load()
        # In v2.1 this will use Vector Embeddings/Cosine Similarity
        for lesson in memory:
            if lesson["error_pattern"] in current_error:
                return lesson["fix"]
        return None

    def _load(self):
        with open(self.memory_path, "r") as f:
            return json.load(f)

    def _save(self, data):
        with open(self.memory_path, "w") as f:
            json.dump(data, f, indent=4)
