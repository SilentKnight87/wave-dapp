// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address owner;
    address [] public wavedAtMe;



    constructor() {
        owner = msg.sender;
        console.log("I am a smart contract, and yes I am super smart!");
    }

    function wave() public {
        if (owner == msg.sender){
            console.log("you waved at yourself");
            totalWaves += 1;
        }else{
            totalWaves += 1;
            wavedAtMe.push(payable(msg.sender));
            console.log("%s has waved!", msg.sender);
            }
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function allWhoWaved() public view returns (address [] memory) {
        return wavedAtMe;
    }


}