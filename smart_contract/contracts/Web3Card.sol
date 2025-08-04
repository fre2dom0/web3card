// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";

contract Web3Card is ERC2771Context {
    mapping(address => string) internal cid;

    constructor(ERC2771Forwarder forwarder)
        ERC2771Context(address(forwarder)) {
    }

    function getCid(address _addr) public view returns(string memory) {
        return cid[_addr];
    }

    function setCID(string calldata _cid) public {
        cid[_msgSender()] = _cid;
    }
}
