pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Battleship.sol";

contract TestBattleship {
 // The address of the adoption contract to be tested
Battleship battleship = Battleship(DeployedAddresses.Battleship());

 uint pdx = 0;
 uint x = 0;
 uint y = 0;
 uint ex = 0;
 uint zz = 1;

// Testing the adopt() function
function testiniState() public {
  uint returnedId = battleship.getStateAtPos(pdx, x, y);

  Assert.equal(returnedId, ex, "Working Fine.");
}

function test2() public {
  uint returnedId = battleship.getSetUpStage(pdx);
  Assert.equal(returnedId,zz , "Working Fine.");
}

}

