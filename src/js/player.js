/* global SIZE shipLength gridState */

function initMap(size) {
  const array = new Array(size).fill(0);
  array.forEach((val, index) => {
    array[index] = new Array(size).fill(0);
  });
  return array;
}

class Player {
  constructor(name, val, App) {
    this.App = App;
    this.name = name;
    this.map = initMap(SIZE);
    this.state = initMap(SIZE);

    // state for setup
    this.setUpComplete = false;
    this.setUpRotate = false;
    this.setUpStage = 1;

    // state for game
    this.hitCount = new Array(6).fill(0);
    this.sinkCount = 0;
    this.id = val;
    //App.clrply(val);
  }

  /** clear()
   * set everything to back to initial state
   */
  clear() {
    // this.map = initMap(SIZE);
    // this.state = initMap(SIZE);
    // this.setUpComplete = false;
    // this.setUpRotate = false;
    // this.setUpStage = 1;
    // this.hitCount = new Array(6).fill(0);
    // this.sinkCount = 0;
    this.App.clrply(this.id);
  }

  /**
   * checkSink(index)
   * called when a ship is hit
   * checks weather the ship sank or not
   * if ship sank, change the state to sank, and return true
   * @param {number} index
   */
  checkSink(index) {
    // return this.hitCount[index] === shipLength[index];
    return this.App.checkSink(this.id, index);
  }

  /**
   * incrementHit(index)
   * increment the hit count for the ship that got hit
   * @param {number} index
   * type of ship that got hit
   */
  incrementHit(index) {
    // this.hitCount[index] += 1;
    this.App.incrementHit(this.id, index);
  }

  /**
   * incrementSink()
   * increment the sink count
   */
  incrementSink() {
    //  this.sinkCount += 1;
    this.App.incrementSink(this.id);
  }

  /**
   * checkWin()
   * returns true if sinkCount is 5, congratulations!
   */
  checkWin() {
    //return this.sinkCount === 5;
    return this.App.sinkCount(this.id);
  }

  /**
   * applySink(index)
   * iterate through state and change the value to SUNK
   */
  applySink(index) {
    // for (let i = 0; i < SIZE; i += 1) {
    //   for (let j = 0; j < SIZE; j += 1) {
    //     if (this.map[i][j] === index) {
    //       this.state[i][j] = gridState.SUNK;
    //     }
    //   }
    // }
    this.App.applySink(this.id, index);
  }

  getSetUpComplete() {
    //return this.setUpComplete;
    return this.App.getSetUpComplete(this.id);
  }

  getSetUpRotate() {
    return this.App.getSetUpRotate(this.id);
  }

  getSetUpStage() {
    return this.App.getSetUpStage(this.id);
  }

  setSetUpComplete(val) {
    //this.setUpComplete = val;
    this.App.getSetUpComplete(this.id, val);
  }

  setSetUpRotate(val) {
    // this.setUpRotate = val;
    this.App.getSetUpRotate(this.id, val);
  }

  incrementSetUpStage(val) {
    //this.setUpStage = this.setUpStage + 1;
    this.App.incrementSetUpStage(this.id, val);
  }


  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setMap(x, y, val) {
    // this.map[x][y] = val;
    this.App.setMap(this.id, x, y, val);
  }

  getMap() {
    return this.App.getMap(this.id);
  }

  getMapAtPos(x, y) {
    return this.App.getMapAtPos(this.id, x, y);
  }

  setState(x, y, state) {
    //this.state[x][y] = state;
    this.App.setState(this.id, x, y, val);
  }

  getStateAtPos(x, y) {
    //return this.state[x][y];
    return this.App.getStateAtPos(this.id, x, y);
  }

  getState() {
    return this.App.getState(this.id);
  }
}