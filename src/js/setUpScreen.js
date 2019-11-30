/* global ships Board */

class SetUpScreen {
  constructor(store, game, el, player) {
    this.store = store;
    this.game = game;
    this.el = el;
    this.player = player;
    this.render();
  }
  /**
   * handleRotateClick()
   * Click to rotate the ship you are about to place down
   */
  handleRotateClick() {
    this.player.setSetUpRotate(!this.player.getSetUpRotate());
  }

  /**
   * handleClick()
   * - if Both player's set up is complete, start the game
   * - if Player 2 has not set up, start setup screen for player 2
   */
  handleClick() {

    // this.player.setSetUpComplete(1).then(function (res) {
    //   this.store.player2.getSetUpComplete().then(function (val) {
    //     val = val.toNumber();
    //     console.log("setup complete recieved");
    //     if (!val) {
    //       this.game.startSetUp(this.store.player2);
    //     } else {
    //       this.game.startGame();
    //     }
    //   });
    // });
  }



  render() {
    this.el.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'setup';
    // Display title
    // const title = document.createElement('h2');
    // const subTitle = document.createElement('p');
    if (this.player.getSetUpComplete()) {
      $('#setupval').text('Setup Complete!');
      $('#instruc').text('Press Done Button');
      $('#done').show();
      $('#rotate').hide();
      //title.appendChild(titleText);
      // subTitle.appendChild(subTitleText);
    } else {
      //const titleText = document.createTextNode(`${this.player.getName()} is Setting up...`);
      $('#instruc').text(`Place your ${ships[this.player.getSetUpStage()]}`);
      $('#done').hide();
      $('#rotate').show();
      //subTitle.appendChild(subTitleText);
      // const subTitleText = document.createTextNode(`Place your ${ships[value]}`);
      // subTitle.appendChild(subTitleText);
      //title.appendChild(titleText);

    }

    // container.appendChild(title);
    // container.appendChild(subTitle);

    // display board to setup the ships
    const board = new Board(this.store, this.game, this.player);
    container.append(board.getEl());


    // create element that will hold the action buttons
    // const buttons = document.createElement('div');
    // buttons.className = 'setup__buttons';
    // container.appendChild(buttons);

    // // display rotate button
    // const rotateButton = document.createElement('button');
    // const rotateButtonText = document.createTextNode('Rotate');
    // rotateButton.appendChild(rotateButtonText);
    // rotateButton.onclick = () => {
    //   this.handleRotateClick();
    // };
    // buttons.appendChild(rotateButton);

    // // display next or done button
    // const nextButton = document.createElement('button');
    // const nextButtonText = document.createTextNode('Done');
    // nextButton.appendChild(nextButtonText);
    // if (this.player.getSetUpComplete()) {
    //   nextButton.onclick = () => {
    //     this.handleClick();
    //   };
    // } else {
    //   nextButton.classList.add('setup__button-disabled');
    // }
    // buttons.appendChild(nextButton);

    this.el.appendChild(container);
  }
}