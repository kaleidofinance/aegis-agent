// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RariMutant {
    mapping(address => uint256) public borrowBalance;
    
    // The TOXIC Mutant logic: 
    // It calls claimRewards (External Interaction) 
    // BEFORE updating the storage (Effect).
    function borrow(uint256 amount) public {
        // 1. Interaction (VULNERABILITY: Rari-style reentrancy)
        (bool success, ) = msg.sender.call(abi.encodeWithSignature("claimRewards()"));
        require(success, "Reward claim failed");

        // 2. Effect (Too late! The attacker has already re-entered)
        borrowBalance[msg.sender] += amount;
        
        // Transfer funds
        payable(msg.sender).transfer(amount);
    }
}
