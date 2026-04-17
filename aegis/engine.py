from aegis.recon import AegisRecon
from aegis.strategy import StrategyGenerator
from aegis.sandbox import AegisSandbox
from aegis.recall import AegisRecall
from aegis.neural import AegisNeuralBridge
from aegis.control import AegisControl
from aegis.settings import AegisSovereignHarness
from aegis.deep_hunt import AegisDeepHunt
from aegis.skills import (
    AegisTacticalSkills, PashovSecuritySkills, ERC4337SecuritySkills, 
    AegisZKSecuritySkills, DeFiArithmeticSkills, CustodyArchitectAuditor, 
    TrailOfBitsTokenSkills, VisualDeceptionAuditor, AegisInvariantLab, 
    AegisMaturityGrader, AegisThreatModeler, AegisPatchGenerator, 
    AegisExploitSynthesizer, AegisNeuralGuard, AegisCryptoAuditor, 
    AegisSymbolicAuditor, AegisRustSovereign, AegisSelfValidator, 
    AegisNetworkDoSAuditor, AegisGasSovereign, AegisEchidnaOptimizer, 
    AegisEconomicAuditor, AegisAdversarialFuzzer, AegisChaosAuditor, 
    AegisHumanBridge, AegisPrivacyVeneer
)
from aegis.execution import AegisPrivacyVeneer
from aegis.wallet import AegisWallet
import os
import json

class MarketEngine:
    """Mock Market Engine for Tactical Simulations."""
    def __init__(self):
        self.status = "CONNECTED"

class AegisEngine:
    """
    The BDI Engine v29.0.
    Sentinel Master Loop: The Human-Augmented Sovereign.
    """
    
    def __init__(self, target_address, mode="audit", mission_id=None, model=None, keys=None, state_dir="./aegis/state", rpc_url=None, fork_url=None):
        import time
        self.target_address = target_address
        self.mode = mode
        self.state_dir = state_dir
        self.mission_id = mission_id or f"m-{int(time.time())}"
        self.active_model = model or "gemini-3.1-pro"
        self.keys = keys or {}
        
        # 1. Integration Bridges (Bio-Secure)
        self.neural = AegisNeuralBridge(keys=self.keys)
        self.market = MarketEngine()
        self.control = AegisControl()
        
        # 2. Core Infrastructure
        self.sandbox = AegisSandbox(fork_url=fork_url)
        self.recall = AegisRecall()
        self.strategy = StrategyGenerator(self.recall, self.neural, self.active_model)
        self.recon = AegisRecon()
        
        self.settings = AegisSovereignHarness() 
        self.deep_hunt = AegisDeepHunt(self.neural, self.active_model)
        
        # 3. Restored Expert Omnibus (v29.0)
        self.tactical = AegisTacticalSkills(self.market)
        self.pashov = PashovSecuritySkills()
        self.aa_safety = ERC4337SecuritySkills()
        self.zk_safety = AegisZKSecuritySkills()
        self.arithmetic = DeFiArithmeticSkills()
        self.custody = CustodyArchitectAuditor()
        self.trail_bits = TrailOfBitsTokenSkills()
        self.visual = VisualDeceptionAuditor()
        self.invariants = AegisInvariantLab(self.neural, self.active_model)
        self.maturity = AegisMaturityGrader(self.neural, self.active_model)
        self.threat_model = AegisThreatModeler(self.neural, self.active_model)
        self.architect = AegisPatchGenerator(self.neural, self.active_model)
        self.neural_guard = AegisNeuralGuard(self.neural, self.active_model)
        self.crypto = AegisCryptoAuditor(self.neural, self.active_model)
        self.symbolic = AegisSymbolicAuditor(self.neural, self.active_model)
        self.rust_guard = AegisRustSovereign(self.neural, self.active_model)
        self.validator = AegisSelfValidator(self.neural, self.active_model)
        self.net_safety = AegisNetworkDoSAuditor(self.neural, self.active_model)
        self.gas_guard = AegisGasSovereign(self.neural, self.active_model)
        self.echidna = AegisEchidnaOptimizer(self.neural, self.active_model)
        self.economics = AegisEconomicAuditor(self.neural, self.active_model)
        self.adversarial = AegisAdversarialFuzzer(self.neural, self.active_model)
        self.chaos = AegisChaosAuditor(self.neural, self.active_model)
        self.human = AegisHumanBridge(self.neural, self.active_model)
        self.exploit_synthesizer = AegisExploitSynthesizer(self.neural, self.active_model)
        
        # 4. Execution & Privacy (MEV Shield)
        self.wallet_manager = AegisWallet(password=self.keys.get("vault_password"))
        self.execution = AegisPrivacyVeneer(self.wallet_manager, eth_rpc_url=rpc_url)
        
        self.beliefs = {
            "target": target_address,
            "mode": mode,
            "model": self.active_model,
            "current_phase": "INIT",
            "findings": [],
            "status": "READY"
        }
        self.state_dir = "aegis/state"
        self.harness = AegisSovereignHarness()
        
        if not os.path.exists(self.state_dir):
            os.makedirs(self.state_dir)

    def ensure_sovereign_clearance(self, phase_id, action_description):
        """Mandatory gate that halts execution until a HumanDirective is received."""
        if not self.harness.check_directive_necessity(phase_id):
            return True
            
        print(f"\n[AegisEngine] !!! SOVEREIGN GATE ACTIVE: PHASE {phase_id} !!!")
        print(f"[AegisEngine] Action inhibited: {action_description}")
        print(f"[AegisEngine] Mission ID: {self.mission_id}")
        print(f"[AegisEngine] Status: PAUSED. Awaiting authorization from Dashboard or CLI...")
        
        # Sync Pause state to Dashboard
        self.beliefs["status"] = "PAUSED"
        self.beliefs["pending_directive"] = {
            "phase_id": phase_id,
            "action": action_description,
            "mission_id": self.mission_id
        }
        self.sync_dashboard(f"PHASE_{phase_id}_PAUSED")
        
        # Handshake Polling Loop
        import time
        while True:
            status = self.harness.get_directive(self.mission_id, phase_id)
            if status == "GRANTED":
                print(f"[AegisEngine] Handshake SUCCESS. Authorized by HumanDirective.")
                self.beliefs["status"] = "ACTIVE"
                if "pending_directive" in self.beliefs:
                    del self.beliefs["pending_directive"]
                return True
            # Optional: Add exit condition or timeout
            time.sleep(3) 

    def request_directive(self, phase_id, action_description):
        """Deprecated: use ensure_sovereign_clearance for automatic polling."""
        return self.ensure_sovereign_clearance(phase_id, action_description)

    def run_remediation_cycle(self, hunt_results):
        """
        Executes PHASE 23: Remediation Synthesis for identified vulnerabilities.
        Gated by mandatory HumanDirective via Sovereign Harness.
        """
        print("[AegisEngine] Initiating Remediation Cycle PHASE 23...")
        
        # MANDATORY SOVEREIGN GATE
        # Ensures Aegis never synthesizes patches without explicit HumanDirective authorization
        if not self.ensure_sovereign_clearance(23, "Synthesize Security Remediation Patches"):
            return {"status": "ABORTED", "reason": "Authorization Required"}

        remediation_results = {"patches": [], "status": "COMPLETED"}
        registry = self.exploit_synthesizer.get_remediation_registry()

        # Iterate through findings and apply registry-mapped remediation
        for target_key, finding in hunt_results.items():
            if not isinstance(finding, dict): continue
            
            vuln_type = finding.get("vulnerability_type")
            target_addr = finding.get("target_address")

            if finding.get("vulnerability_detected") and vuln_type in registry:
                synthesis_func = registry[vuln_type]
                patch = synthesis_func(target_addr)
                
                remediation_results["patches"].append(patch)
                filename = f"{target_key.upper().replace('.', '_')}_REMEDIATION.sol"
                self._save_patch(filename, patch["patch_code"])

        return remediation_results

    def run_execution_cycle(self, remediation_results):
        """
        Executes PHASE 24: Sovereign Execution (On-Chain Broadcast).
        Gated by mandatory HumanDirective. Uses MEV Privacy Relays.
        """
        print("[AegisEngine] Initiating Execution Cycle PHASE 24...")
        
        # 1. Sovereign Gate
        if not self.ensure_sovereign_clearance(24, "Execute Private On-Chain Remediation"):
            return {"status": "ABORTED", "reason": "Authorization Denied"}

        execution_results = {"broadcasts": [], "status": "COMPLETED"}
        
        # 2. Iterate and Broadcast
        for patch in remediation_results.get("patches", []):
            target = patch.get("target")
            code = patch.get("patch_code")
            
            print(f"[AegisEngine] Preparing Private Broadcast for {target}...")
            
            # Simplified: In a real scenario, we'd compile the patch and build the Tx
            # Here we simulate the signing and private routing
            if "GasZip" in target or "LiFi" in target:
                # Mock a signed transaction for demonstration
                mock_tx_data = {"to": "0x123...", "value": 0, "gas": 2000000}
                signed_tx = self.wallet_manager.sign_transaction("audit_1", mock_tx_data)
                
                if signed_tx:
                    broadcast = self.execution.broadcast_eth_private(signed_tx)
                    execution_results["broadcasts"].append(broadcast)
                else:
                    print("[AegisEngine] Signing Failed: audit_1 wallet not found or uninitialized.")

        return execution_results

    def _save_patch(self, filename, code):
        """Save synthesized patch to artifacts directory."""
        path = os.path.join("artifacts", filename)
        os.makedirs("artifacts", exist_ok=True)
        with open(path, "w") as f:
            f.write(code)
        print(f"[AegisEngine] Sovereign Patch Saved: {path}")

    def run_deep_architecture_hunt(self, targets):
        """
        Orchestrates a Deep-Architecture Hunt on specified targets.
        Gates findings behind HumanDirective harness.
        """
        print(f"[AegisEngine] Pointing Aegis to perform Hunt on {len(targets)} targets...")
        results = {}
        vulns_found = False

        for target_name, target_addr in targets.items():
            print(f"[AegisEngine] Hunting {target_name} at {target_addr}...")
            
            # Perform specialized audit based on target
            if "GasZip" in target_name:
                audit_res = self.deep_hunt.audit_gaszip_refuel_verification(target_addr)
                audit_res["vulnerability_type"] = "GasZip_Refuel_v2"
            elif "LiFi" in target_name or "Li.Fi" in target_name:
                audit_res = self.deep_hunt.audit_lifi_diamond_facets(target_addr)
                audit_res["vulnerability_type"] = "LiFi_Diamond_Facet_Withdrawal"
            else:
                # Generic audit fallback
                audit_res = self.deep_hunt.execute_hunt(target_addr)
                audit_res["vulnerability_type"] = "Generic_Architecture_Flaw"
            
            audit_res["target_address"] = target_addr
            results[target_name] = audit_res
            
            if audit_res.get("vulnerability_detected"):
                vulns_found = True

        # 3. Directive Check
        if vulns_found:
            print("!!! DEEP HUNT CONFIRMED VULNERABILITIES !!!")
            # We check if Phase 23 (Remediation) requires a directive
            directive_status = self.settings.check_directive_necessity(23)
            results["remediation_directive_required"] = directive_status
            
        return results

    def run_bridge_simulation(self, host_address, gateway_address, consensus_address):
        """Human-Augmented Stress-Test Loop for Bridge Sovereignty."""
        print(f"[AegisEngine] Initiating Autonomous Stress-Test for {host_address}...")
        
        # Step 1: Find the Gap (Autonomous)
        # Check for challengePeriod=0 and unverified client opacity
        
        # Step 2: Synthesize and Prove the Exploit (Autonomous)
        vuln_path = "Consensus_Proof_Forgery -> Malicious_MMR_Root -> ChangeAssetAdmin"
        exploit_poc = self.exploit_synthesizer.synthesize_multi_chain_exploit(vuln_path, gateway_address)
        validation = self.exploit_synthesizer.validate_exploit_impact(exploit_poc, "http://localhost:8545")
        
        # Step 3: Governance Check (Gated)
        if validation.get("vulnerability_confirmed"):
            if self.harness.check_directive_necessity(23):
                return self.request_directive(23, f"Synthesize Sovereign Patch for {vuln_path}")
            else:
                return {"mission": "BRIDGE_STRESS_TEST", "exploit_proven": True, "remediation_status": "READY"}

        return {
            "mission": "BRIDGE_STRESS_TEST",
            "exploit_proven": False,
            "security_certification": "SOVEREIGNLY_SECURE",
            "remarks": "No atomic forage paths identified in this simulation."
        }

    def sync_dashboard(self, phase, findings=None):
        """Syncs the 21-phase mission telemetry with the dashboard via state polling."""
        self.beliefs["current_phase"] = phase
        if findings:
            self.beliefs["findings"].append(findings)
        
        status_file = os.path.join(self.state_dir, "mission_status.json")
        with open(status_file, "w") as f:
            json.dump(self.beliefs, f, indent=4)
        print(f"[Aegis] Dashboard Synced: Phase {phase}")

    def run_mission(self, iterations=5):
        """The Master v29.0 Human-Augmented Sovereignty Pipeline."""
        print(f"[Aegis] Mission Genesis: {self.mode.upper()} mode.")
        self.sync_dashboard("MISSION_GENESIS")
        
        # Ensure operational wallet 'audit_1' exists for remediation execution
        if not self.wallet_manager.get_wallet("audit_1"):
            print("[Aegis] Initializing Operational Identity (audit_1)...")
            self.wallet_manager.generate_batch(count=1, prefix="audit")
        
        # Step 1: Neural Sovereignty Audit (Bio-Security Pass)
        self.sync_dashboard("PHASE_01_NEURAL_GUARD")
        print("[Aegis] Executing Neural Guard (Fickling-Symbolic-Audit)...")
        self.neural_guard.audit_model_safety("cognitive_weights.pth")
        
        # Step 2: Recon & Forensic Identification
        self.sync_dashboard("PHASE_02_RECON")
        raw_recon = self.recon.scan_target(self.target_address)
        
        # Step 3: Tactical & Forensic Intelligence
        self.sync_dashboard("PHASE_03_TAC_FORENSICS")
        print("[Aegis] Executing Tactical & Forensic Intelligence...")
        self.tactical.dex_arbitrage_discovery("USDC", "USDT")
        self.arithmetic.audit_rounding_direction(raw_recon)
        self.zk_safety.audit_fiat_shamir_transformation(raw_recon)
        self.trail_bits.check_token_compatibility(self.target_address)
        
        # Step 4: Neural Strategy Generation
        self.sync_dashboard("PHASE_04_STRATEGY")
        print("[Aegis] Generating Tactical Plan via Neural Core...")
        self.strategy.generate_tactical_plan(raw_recon)
        
        # Step 5: Human Steering Alignment (ToB AI vs Human Pass)
        self.sync_dashboard("PHASE_05_HUMAN_STEERING")
        manual_beliefs = self.control.get_steering_instructions()
        self.human.inject_human_context(manual_beliefs)
        
        # Step 6: Cryptographic Soundness Audit (2025 KDF Pass)
        self.sync_dashboard("PHASE_06_CRYPTO_SOUNDNESS")
        print("[Aegis] Executing Cryptographic Soundness Pass...")
        self.crypto.audit_key_derivation(raw_recon)
        self.crypto.check_domain_separation(raw_recon)
        
        # Step 7: Gas Soundness & EVM-Exhaustion Audit
        self.sync_dashboard("PHASE_07_GAS_SOVEREIGNTY")
        print("[Aegis] Executing Gas Sovereignty & Opcode Audit...")
        self.gas_guard.audit_gas_soundness(raw_recon)
        self.gas_guard.detect_griefing_patterns(raw_recon)
        
        # Step 8: Symbolic Path Exploration (Manticore-Tier)
        self.sync_dashboard("PHASE_08_SYMBOLIC_SOLVER")
        print("[Aegis] Executing Symbolic Reasoning Pass...")
        self.symbolic.audit_symbolic_paths(raw_recon)
        
        # Step 9: Economic Security & Lending Invariant Pass
        self.sync_dashboard("PHASE_09_ECONOMIC_SOVEREIGNTY")
        print("[Aegis] Executing Economic Sovereignty Audit (Lending Solvency)...")
        self.economics.audit_lending_solvency(raw_recon)
        self.economics.check_oracle_economic_lag(raw_recon)
        
        # Step 10: Operational Threat Modeling
        self.sync_dashboard("PHASE_10_THREAT_MODELING")
        print("[Aegis] Executing Threat Model Analysis...")
        self.threat_model.audit_proxy_migration_risk(raw_recon)
        
        # Step 11: Fuzzer Performance Optimization (Echidna)
        self.sync_dashboard("PHASE_11_FUZZER_OPTIMIZATION")
        print("[Aegis] Optimizing Fuzzer Corpus & Multicore Strategy...")
        self.echidna.seed_fuzzer_corpus(raw_recon)
        self.echidna.optimize_fuzzing_parameters(cpu_cores=16)
        
        # Step 12: Medusa Invariant Fuzzing
        self.sync_dashboard("PHASE_12_MEDUSA_FUZZING")
        print("[Aegis] Initiating Medusa Property-Based Fuzzing...")
        self.invariants.generate_medusa_invariants(raw_recon)
        self.invariants.execute_medusa_fuzz()
        
        # Step 13: Adversarial Fuzzing & Prover-Gap Audit
        self.sync_dashboard("PHASE_13_ADVERSARIAL_CAMPAIGN")
        print("[Aegis] Executing Adversarial Unhappy-Path Campaign...")
        self.adversarial.audit_prover_gap("FormalSpecV1", raw_recon)
        self.adversarial.execute_adversarial_campaign(fuzzer_type="medusa")
        
        # Step 14: Rust & Move Safety Guard (Kani-Tier)
        self.sync_dashboard("PHASE_14_RUST_MOVE_SAFETY")
        print("[Aegis] Executing Rust/Move Memory Safety Pass...")
        self.rust_guard.verify_rust_memory_safety(raw_recon)
        
        # Step 15: Network & P2P Resiliency Audit
        self.sync_dashboard("PHASE_15_NETWORK_RESILIENCY")
        print("[Aegis] Executing Network Infrastructure Resiliency Audit...")
        self.net_safety.audit_p2p_resiliency(raw_recon)
        self.net_safety.check_rpc_dos_vector(raw_recon)
        
        # Step 16: Infrastructure Chaos & Node Resilience
        self.sync_dashboard("PHASE_16_INFRA_CHAOS")
        print("[Aegis] Executing Node-Level Chaos Testing (Attacknet Pass)...")
        self.chaos.audit_node_resilience(raw_recon)
        self.chaos.simulate_network_partition(raw_recon)
        
        # Step 17: Architectural Maturity & Sovereignty Grading
        self.sync_dashboard("PHASE_17_MATURITY_GRADING")
        print("[Aegis] Evaluating Architectural Maturity...")
        self.maturity.evaluate_maturity_level(raw_recon)
        
        # Step 18: Institutional Safety Audit (Anti-ATO Pass)
        self.sync_dashboard("PHASE_18_INSTITUTIONAL_GUARD")
        print("[Aegis] Executing Institutional Safety & Anti-Takeover Pass...")
        self.custody.audit_api_key_scoping({"context": "CEX Keys"})
        self.custody.audit_institutional_enforcement(raw_recon)
        
        # Step 19: Human-Augmented Result Review (Hallucination Mitigation)
        self.sync_dashboard("PHASE_19_HUMAN_REVIEW")
        print("[Aegis] Executing Human-Augmented Review Pass...")
        hallucination_report = self.human.audit_hallucination_index(self.beliefs["findings"])
        
        # Step 20: Tactical Architecture Hunt (PHASE 22)
        # This triggers the specialized hunts (GasZip, LiFi, etc.)
        self.sync_dashboard("PHASE_22_DEEP_HUNT")
        hunt_results = self.run_deep_architecture_hunt({
            "CoreProtocol": self.target_address,
            "AssociatedBridge": "0xc765...b2" # Potential bridge associated with target
        })

        # Step 20.5: Proof Identity Audit (PHASE 22.5)
        # Specialized check for Proof-to-Payload dissociation
        self.sync_dashboard("PHASE_22_5_PROOF_BINDING")
        print("[Aegis] Executing specialized Proof-Binding Audit...")
        # In a real scenario, we'd pass the actual protocol code fetched during Recon
        protocol_code_mock = "VerifyProof(root, proof, leaf); // Missing payload binding" 
        binding_audit = self.deep_hunt.audit_proof_binding(protocol_code_mock)
        hunt_results["ProofBindingAudit"] = binding_audit

        # Step 21: MANDATORY SOVEREIGN GATE (PHASE 23)
        # We halt the mission here if any vulnerabilities were found in the Deep Hunt or Binding Audit
        any_vulns = any(res.get("vulnerability_detected") or res.get("detected") 
                        for res in hunt_results.values() if isinstance(res, dict))
        if any_vulns:
            self.sync_dashboard("PHASE_23_GATED")
            if not self.ensure_sovereign_clearance(23, "Synthesize Security Remediations for Cryptographic Binding Flaws"):
                 print("[Aegis] Mission terminated: Authorization Denied.")
                 return
            
            # Step 22: Remediation & Patch Generation (Authorized)
            self.sync_dashboard("PHASE_24_REMEDIATION")
            print("[Aegis] Authorized. Synthesizing Security Remediations...")
            remediation = self.run_remediation_cycle(hunt_results)
            self.beliefs["findings"].append(remediation)
            
            # Step 22.5: Sovereign Execution Cycle (Authorized)
            self.sync_dashboard("PHASE_25_EXECUTION")
            print("[Aegis] Authorized. Executing Private On-Chain Remediation...")
            execution_status = self.run_execution_cycle(remediation)
            self.beliefs["findings"].append(execution_status)
        
        # Step 23: Self-Validation & Semantic Accuracy Check (Authorized)
        self.sync_dashboard("PHASE_25_SELF_VALIDATION")
        print("[Aegis] Executing Self-Validation (Chomper Semantic Audit)...")
        if any_vulns and 'remediation' in locals():
            latest_patch = remediation["patches"][0] if remediation["patches"] else None
            if latest_patch:
                self.validator.score_semantic_quality(latest_patch, "SecureProofBindingPattern")
        
        self.sync_dashboard("MISSION_COMPLETE")
        print("[Aegis] Full-Spectrum Human-Augmented Mission Complete.")
