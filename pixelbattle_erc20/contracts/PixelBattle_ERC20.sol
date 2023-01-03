//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelBattle_ERC20 is ERC20PresetMinterPauser("PixelBattle_test_token", "PXB") {

    constructor() {
        _mint(msg.sender, 1000 * 10 ** decimals()); // == 1 000  ///  000 000 000 000 000 000
    }
}