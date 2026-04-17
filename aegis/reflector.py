import re

class AegisReflector:
    """
    The 'Reflective Brain' of Kaleido-Aegis.
    Analyzes execution traces to provide feedback for exploit refinement.
    Implements the Quimera feedback loop.
    """

    def __init__(self):
        # ANSI escape pattern for cleaning terminal output
        self.ansi_escape = re.compile(r"(?:\x1B[@-_]|[\x80-\x9F])[0-?]*[ -/]*[@-~]")

    def clean_output(self, text):
        """Removes ANSI escape codes from Forge output."""
        return self.ansi_escape.sub("", text)

    def extract_failure_reason(self, stdout, stderr):
        """
        Parses Forge output to find specifically why a transaction or compilation failed.
        Returns a dict with the reason and whether it should be a 'negative constraint'.
        """
        raw_text = self.clean_output(stdout + stderr)
        is_hard_failure = False 
        
        # 1. Check for compilation errors
        if "Compilation failed" in raw_text:
            return {
                "reason": "Compilation Error: Solidity syntax or interface mismatch",
                "type": "negative_constraint",
                "feedback": "Do not repeat the specific Solidity syntax used in the previous attempt."
            }

        # 2. Check for Forge [FAIL]
        fail_match = re.search(r"\[FAIL: (.*?)\]", raw_text)
        if fail_match:
            return {
                "reason": f"EVM Revert: {fail_match.group(1)}",
                "type": "execution_failure",
                "feedback": "Analyze the revert reason and adjust the exploit parameters."
            }

        return {"reason": "Unknown failure", "type": "warning", "feedback": "Retry with more verbose logging."}

    def analyze_trace_for_solution(self, trace):
        """
        Analyzes the call trace to suggest a fix (e.g., missing approval, wrong target).
        """
        trace = self.clean_output(trace)
        
        if "transferFrom" in trace and "revert" in trace:
            return "Suggestion: Possible missing ERC20.approve() call before transferFrom."
        
        if "Ownable: caller is not the owner" in trace:
            return "Suggestion: Target function is protected by 'onlyOwner'. Need to impersonate owner or find un-gated alternative."

        if "Panic(0x11)" in trace: # Overflow/Underflow
            return "Suggestion: Arithmetic overflow detected. Check rounding directions or large value transfers."

        return "Reflection: No obvious fix in trace. Requesting strategic pivot from Brain."

if __name__ == "__main__":
    reflector = AegisReflector()
    print("Reflector initialized.")
