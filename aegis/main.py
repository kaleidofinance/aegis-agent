import argparse
import sys
import os
from aegis.engine import AegisEngine

def main():
    parser = argparse.ArgumentParser(
        description="Aegis Agent: Industrial Autonomous Security Agent powered by Kaleido Finance",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example:
  python -m aegis.main --target 0x1234...5678 --mode audit --iterations 5
        """
    )
    
    parser.add_argument("--input", help="Multimodal input: English prompt, GitHub link, or Protocol URL")
    parser.add_argument("--target", help="Explicit target smart contract address")
    parser.add_argument("--mode", choices=["audit", "sleuth", "stress", "full"], default="audit", 
                        help="Mission Mode: audit (Code), sleuth (Forensics), stress (Economics), or full (War-Room)")
    parser.add_argument("--model", help="Specify Neural Core (e.g., minimax-m2.7, llama-3.3-70b, gpt-5)")
    
    # Provider Key Registry (CLI Flags)
    parser.add_argument("--gemini-key", help="Google Gemini API Key override")
    parser.add_argument("--openai-key", help="OpenAI / DeepSeek API Key override")
    parser.add_argument("--anthropic-key", help="Anthropic Claude API Key override")
    parser.add_argument("--minimax-key", help="MiniMax / GLM API Key override")

    parser.add_argument("--rpc", help="Live RPC URL for on-chain execution (requires --live)")
    parser.add_argument("--fork-url", help="RPC URL to clone for the local Sandbox")
    parser.add_argument("--live", action="store_true", help="⚠️ WARNING: Enable real on-chain execution with a live signer")
    parser.add_argument("--iterations", type=int, default=5, help="Maximum number of BDI loop iterations")
    # 1. HANDLE SUBCOMMANDS (wallet, authorize)
    if len(sys.argv) > 1 and sys.argv[1] in ["wallet", "authorize"]:
        subcmd = sys.argv[1]
        
        if subcmd == "wallet":
            if len(sys.argv) < 3:
                print("Usage: aegis wallet [init|generate|list|balance]")
                sys.exit(1)
            
            from aegis.wallet import AegisWallet
            password = os.getenv("AEGIS_VAULT_KEY")
            wallet_mgr = AegisWallet(password=password)
            
            op = sys.argv[2]
            if op == "init":
                is_hd = "--hd" in sys.argv
                if is_hd:
                    mnemonic = wallet_mgr.init_hd_mode()
                    print(f"[Aegis] Initialized in HD mode.")
                    print(f"⚠️  MASTER MNEMONIC: {mnemonic}")
                    print("SAVE THIS MNEMONIC SECURELY. IT CANNOT BE RECOVERED.")
                else:
                    print(f"[Aegis] Initialized in INDIVIDUAL mode.")
            elif op == "generate":
                count = 1
                if "--count" in sys.argv:
                    idx = sys.argv.index("--count")
                    count = int(sys.argv[idx+1])
                prefix = "audit"
                if "--prefix" in sys.argv:
                    idx = sys.argv.index("--prefix")
                    prefix = sys.argv[idx+1]
                
                res = wallet_mgr.generate_batch(count, prefix)
                print(f"[Aegis] Generated {count} wallet(s) with prefix '{prefix}'.")
                for r in res:
                    label = list(r.keys())[0]
                    addr = r[label].get("eth_address")
                    print(f" > {label}: {addr}")
            elif op == "list":
                print(f"{'Label':<15} | {'ETH Address':<42} | {'Chain Type'}")
                print("-" * 75)
                for label, data in wallet_mgr.wallets.items():
                    chain_type = "MULTICHAIN" if data.get('dot_address') else "EVM"
                    print(f"{label:<15} | {data.get('eth_address'):<42} | {chain_type}")
            sys.exit(0)

        elif subcmd == "authorize":
            if len(sys.argv) < 3:
                print("Usage: aegis authorize <mission_id> [phase_id]")
                sys.exit(1)
            mission_id = sys.argv[2]
            phase_id = int(sys.argv[3]) if len(sys.argv) > 3 else 23
            
            from aegis.settings import AegisSovereignHarness
            harness = AegisSovereignHarness()
            harness.grant_directive(mission_id, phase_id)
            sys.exit(0)

    # 2. HANDLE MISSION ARGUMENTS
    args = parser.parse_args()
    target_address = args.target
    if args.input:
        from aegis.ingestor import AegisIngestor
        scout = AegisIngestor()
        
        if "github.com" in args.input:
            result = scout.ingest_from_github(args.input)
        elif "http" in args.input:
            result = scout.ingest_from_url(args.input)
        else:
            result = scout.ingest_from_prompt(args.input)
            
        if result and "address" in result:
            target_address = result["address"]
            print(f"[Aegis] Scout resolved target address: {target_address}")
        else:
            print("[Aegis] Scout could not resolve an address. Please provide an explicit --target.")
            if not target_address:
                sys.exit(1)

    # Safety Check for Live Mode
    if args.live:
        confirm = input("⚠️ CAUTION: You are about to enable LIVE execution on a real blockchain. Proceed? (y/N): ")
        if confirm.lower() != 'y':
            print("[Aegis] Live execution aborted.")
            sys.exit(0)

    # Print Aegis Banner
    print("="*60)
    print("      A E G I S   A G E N T      ")
    print("    Powered by Kaleido Finance   ")
    print("="*60)
    print(f"Mission: {args.mode.upper()}")
    print(f"Target:  {target_address}")
    print(f"Iters:   {args.iterations}")
    print("-"*60)

    try:
        # Initialize the Engine with the chosen Mission Mode and Keys
        engine = AegisEngine(
            target_address=target_address, 
            mode=args.mode,
            mission_id=args.mission_id,
            model=args.model,
            keys={
                "gemini": args.gemini_key,
                "openai": args.openai_key,
                "anthropic": args.anthropic_key,
                "minimax": args.minimax_key
            },
            state_dir=args.state_dir, 
            rpc_url=args.rpc,
            fork_url=args.fork_url
        )
        
        # Execute the Mission
        engine.run_mission(iterations=args.iterations)
        
        # Final Reporting
        print("-"*60)
        print("[Aegis] Mission Complete.")
        print(f" > Research recorded to: {args.state_dir}")
        print("="*60)

    except KeyboardInterrupt:
        print("\n[Aegis] User interrupted. Saving mental states...")
        sys.exit(0)
    except Exception as e:
        print(f"\n[Aegis] CRITICAL ENGINE ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
