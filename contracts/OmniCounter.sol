// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;
pragma abicoder v2;

import "./lzApp/NonblockingLzApp.sol";
import "../interfaces/ILayerZeroEndpoint.sol";

/// @title A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter
contract OmniCounter is NonblockingLzApp {
    uint256 public counter;

    ILayerZeroEndpoint public immutable lzEndpoint;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {
        lzEndpoint = ILayerZeroEndpoint(_endpoint);
    }

    function _nonblockingLzReceive(
        uint16,
        bytes memory,
        uint64,
        bytes memory
    ) internal override {
        counter += 1;
    }

    function incrementCounter(uint16 _dstChainId) public payable {
        _lzSend(
            _dstChainId,
            bytes(""),
            payable(msg.sender),
            address(0x0),
            bytes("")
        );
    }
}
