pragma solidity ^0.5.0;

contract Battleship {

    // defining player structure
    struct Player {
      uint _id;
      uint[10][] map;
      uint[10][] state;
      uint[] hitCount;
      uint sinkCount;
      uint setUpComplete;
      uint setUpRotate;
      uint setUpStage;
    }

    uint[] shiplen = new uint[](6);
    enum State { Initial, InitBoard, Game, Done }

    // player[0] : player0 and [1] : player 2

    uint public numOfPlayers;
    uint currentPlayer;
    Player[] players;
    Player plyn;
    State state;
    address[2] public plyradd;

    constructor() public{
       shiplen[0] = 0;
       shiplen[1] = 5;
       shiplen[2] = 4;
       shiplen[3] = 3;
       shiplen[4] = 3;
       shiplen[5] = 2;
       currentPlayer = 0;
       counter = 0;
       state = State.Initial;
       numOfPlayers = 2;
       plyn.sinkCount = 0;
        plyn.setUpComplete = 0;
        plyn.setUpRotate = 0;
        plyn.setUpStage = 1;
      for(uint256 i = 0; i<10; i++){
      // plyn.map.push([0,0,0,0,0,0,0,0,0,0]);
       plyn.state.push([0,0,0,0,0,0,0,0,0,0]);
      }
      for(uint256 i = 0; i<10; i++){
       plyn.map.push([0,0,0,0,0,0,0,0,0,0]);
      }
      for(uint256 i = 0; i<6;i++){
               plyn.hitCount.push(0);
           }
      players.push(plyn);
      players.push(plyn);

    }


    function gamestate() public view returns(uint){
      if(state == State.Initial){
        return 0;
      }
      if(state == State.InitBoard){
        return 1;
      }
      if(state == State.Game){
        return 2;
      }
      if(state == State.Done){
        return 3;
      }
    }

    function setgamestate(uint ind) public view{
      if(ind == 0){
        state == State.Initial;
      }
      else if(ind == 1){
        state == State.InitBoard;
      }
      else if(ind == 2){
        state == State.Game;
      }
      else if(ind == 3){
        state == State.Done;
      }
    }

    function iniadd() public returns(uint){
        plyradd[currentPlayer] = msg.sender;
        currentPlayer = currentPlayer + 1;
        if(currentPlayer == 2){
          state = State.InitBoard;
          currentPlayer = 0;
        }
        return currentPlayer;
    }

    function currply() public view returns(uint){
      return currentPlayer;
    }

    function addtoid() public view returns(uint){
      if(plyradd[0]==msg.sender){
        return 0;
      }
      else{
        return 1;
      }
    }

    function addinternal(address) internal view returns(uint){
      if(plyradd[0]==msg.sender){
        return 0;
      }
      else{
        return 1;
      }
    }

    uint counter = 0;
    function donesetup() public returns(string memory){  
        counter = counter + 1;
        string memory mssg = "next player to setup";
        if(counter==2){
          currentPlayer = currentPlayer + 1;      
        }
        if(counter == 4){
          counter = 0;
          state = State.Game;
          mssg = "game started!!!";
        }
        currentPlayer = currentPlayer%2;
        return mssg;
    }

    function nextP() internal{
        currentPlayer = (currentPlayer + 1)%2;
    }

   function initgame() public{
       currentPlayer = 0;
       state = State.Initial;
       numOfPlayers = 2;
       counter = 2;
       for(uint256 p = 0; p < 2; p++) {
           players[p].sinkCount = 0;
           players[p].setUpComplete = 0;
           players[p].setUpRotate = 0;
           players[p].setUpStage = 1;
           for(uint256 i = 0; i<6;i++){
               players[p].hitCount[i] = 0;
           }
           for(uint256 i = 0; i<10; i++){
             for(uint256 j = 0; j<10;j++)
             players[p].state[i][j] = 0;
               // players[p].map[i][j] = 0;
           }
           for(uint256 i = 0; i<10; i++){
             for(uint256 j = 0; j<10;j++)
             //players[p].state[i][j] = 0;
                players[p].map[i][j] = 0;
           }
       }
    }

     function clrply(uint p) public{
           players[p].sinkCount = 0;
           players[p].setUpComplete = 0;
           players[p].setUpRotate = 0;
           players[p].setUpStage = 1;
           for(uint256 i = 0; i<6;i++){
               players[p].hitCount[i] = 0;
           }
           for(uint256 i = 0; i<10; i++){
             for(uint256 j = 0; j<10;j++)
             players[p].state[i][j] = 0;
               // players[p].map[i][j] = 0;
           }
           for(uint256 i = 0; i<10; i++){
             for(uint256 j = 0; j<10;j++)
             //players[p].state[i][j] = 0;
                players[p].map[i][j] = 0;
           }
       }

   function checkSink(uint pdx, uint index) public view returns(bool){
         return players[pdx].hitCount[index] == shiplen[index];
     }
  /**
   * incrementHit(index)
   * increment the hit count for the ship that got hit
   * type of ship that got hit
   */

  function incrementHit(uint pdx, uint index) public {
    players[pdx].hitCount[index] += 1;
  }

  /**
   * incrementSink()
   * increment the sink count
  */
  function incrementSink(uint pdx) public {
    players[pdx].sinkCount += 1;
  }

  /**
   * checkWin()
   * returns true if sinkCount is 5, congratulations!
  */
  function checkWin(uint pdx) public view returns(bool) {

    return players[pdx].sinkCount == 5;
  }

  /**
   * applySink(index)
   * iterate through state and change the value to SUNK
   */
  function applySink(uint pdx, uint index) public {
    for (uint256 i = 0; i < 10; i += 1) {
      for (uint256 j = 0; j < 10; j += 1) {
        if (players[pdx].map[i][j] == index) {
          players[pdx].state[i][j] = 3;
        }
      }
    }
  }

  function getSetUpComplete(uint pdx) public view returns(uint) {
    return players[pdx].setUpComplete;
  }

  function getSetUpRotate(uint pdx) public view returns(uint){
    return players[pdx].setUpRotate;
  }

  function getSetUpStage(uint pdx) public view returns(uint){
    return players[pdx].setUpStage;
  }
   //return p;

  function setSetUpComplete(uint pdx, uint val) public{
    players[pdx].setUpComplete = val;
  }

  function setSetUpRotate(uint pdx, uint val) public {
    players[pdx].setUpRotate = val;
  }

  function incrementSetUpStage(uint pdx) public{
    players[pdx].setUpStage = players[pdx].setUpStage + 1;
  }

  function setMap(uint pdx, uint  x, uint  y,uint  val) public{
    players[pdx].map[x][y] = val;
  }

  function getMap(uint pdx) public view returns(uint[10][] memory){
    return players[pdx].map;
  }

  function getMapAtPos(uint pdx, uint x,uint y) public view returns(uint) {
    return players[pdx].map[x][y];
  }

  function setState(uint pdx, uint x,uint y, uint st) public {
    players[pdx].state[x][y] = st;
  }

  function getStateAtPos(uint pdx, uint x,uint y) public view returns(uint){
    return players[pdx].state[x][y];
  }

  function getState(uint pdx) public view returns(uint[10][] memory){
    return players[pdx].state;
  }
}

