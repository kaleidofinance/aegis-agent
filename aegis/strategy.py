import json

class StrategyGenerator:
    """
    Omnibus Neural Strategy Generator v14.0.
    Insects live recon data and performs Neural Pashov-Filtering.
    """
    
    def __init__(self, recall_module, neural_bridge, active_model):
        self.recall = recall_module
        self.neural = neural_bridge
        self.model = active_model
        self.pashov_vectors = {
            "reentrancy": {
                "D": "Contract calls external address before updating state.",
                "FP": "Function is protected by NonReentrant modifier or trusted protocol target."
            },
            "access_control": {
                "D": "Missing onlyOwner/Role check on sensitive state change.",
                "FP": "Checked via internal require logic or role-based modifier."
            },
            "arithmetic": {
                "D": "Division before multiplication or unsafe scaling.",
                "FP": "Precision loss is documented as expected behavior (< 1 wei)."
            }
        }

    def generate_tactical_plan(self, recon_data):
        """Creates a mission plan based on REAL Recon findings."""
        plan = []
        # Dynamic Findings from Recon
        findings = recon_data.get("potential_vulnerabilities", [])
        
        if not findings:
            print("[Strategy] No high-risk anomalies detected in Recon phase.")
            return []

        for f in findings:
            vector = self.pashov_vectors.get(f.get("type"))
            if vector:
                print(f"[Strategy] Applying Neural Filter ({self.model}) for {f.get('type')} finding...")
                # Live Neural Analysis Pass
                if self._check_for_fp_condition(f, vector["FP"]):
                    print(f" > Discarded as likely False Positive: {f.get('id')}")
                    continue
            plan.append(f)
            
        print(f"[Strategy] Managed tactical plan finalized with {len(plan)} verified vectors.")
        return plan

    def _check_for_fp_condition(self, finding, fp_info):
        """Verify code safety using the Neural Core (Local or Cloud)."""
        code_context = finding.get("code", "Source not provided")
        prompt = (f"Security Audit: Is this {finding.get('type')} finding a False Positive?\n"
                  f"Criteria: {fp_info}\n"
                  f"Code: {code_context}\n"
                  f"Answer ONLY 'YES' or 'NO'.")
        
        response = self.neural.generate(prompt, model=self.model)
        return "YES" in response.upper()
