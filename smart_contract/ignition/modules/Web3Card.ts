import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Web3Card = buildModule("Web3Card", (m) => {
    const forwarder = m.contract("ERC2771Forwarder", ["Web3Card Trusted Forwarder"]);
    
    const web3card = m.contract("Web3Card", [forwarder]);
    
    return { web3card, forwarder };
});

export default Web3Card;