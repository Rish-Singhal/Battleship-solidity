App = {
  web3Provider: null,
  contracts: {},
  state: null,
  store: new Store(),
  el: document.getElementById('app'),
  gamest: -1,
  gameply: -1,
  mid: -1,
  ply: null,

  init: async function () {
    return await App.initWeb3();
  },

  startSetUp: function () {
    App.store.setGameState(gameState.SETUP);
    App.ply = new Player();
    // console.log(App.ply.setUpRotate);
    App.state = new SetUpScreen(App.store, App, document.getElementById('setboard'), App.ply);
  },

  startGame: function () {
    App.store.setGameState(gameState.PLAY);
    App.state = new GameScreen(App.store, App, document.getElementById('game'));
  },

  setWinner: function (player) {
    App.store.setGameState(gameState.WIN);
    App.state = new WinnerScreen(App.store, App, App.el, player);
  },

  reRender: function () {
    document.getElementById('setboard').innerHTML = '';
    App.state.render();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (typeof window.ethereum !== 'undefined') {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Battleship.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var BattleshipArtifact = data;
      App.contracts.Battleship = TruffleContract(BattleshipArtifact);

      // Set the provider for our contract
      App.contracts.Battleship.setProvider(App.web3Provider);
      // Use our contract to retrieve and mark the adopted pets
      return App.gamestate();
    });
    return App.bindEvents();
  },
  gamestate: function () {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.gamestate.call();
    }).then(function (value) {
      value = value.toNumber();
      console.log(value);
      console.log()
      App.gamest = value;
      if (value == 0) {
        $('.startgame').show();
        $('.game').hide();
        $('.setup2').hide();
      } else if (value == 1) {
        $('.startgame').hide();
        $('.setup2').show();
        $('.game').hide();
        return App.myid();
      } else {
        $('.startgame').hide();
        $('.setup2').hide();
        $('.game').show();
        return App.myid();
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  myid: function () {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.addtoid.call();
    }).then(function (value) {
      value = value.toNumber();
      console.log(value);
      App.mid = value;
      console.log(App.gamest);
      if (App.gamest == 1) {
        console.log(App.mid);
        return App.getplyr();
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  newgame: function (val) {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Battleship.deployed().then(function (instance) {
        gameInstance = instance;
        return gameInstance.iniadd({
          from: account
        });
      }).then(function () {
        console.log(account);
        return App.gamestate();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },
  getplyr: function () {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.currply.call();
    }).then(function (value) {
      value = value.toNumber();
      console.log(App.gamest);
      App.gameply = value;
      if (App.gamest == 1) {
        $('#setupval').text('Player ' + value.toString() + ' is setting up...');
        $('.setup2').show();
        console.log(App.mid);
        console.log(value);
        if (App.mid == value) {
          $('.setuppvt').show();
        } else {
          $('.setuppvt').hide();
        }
        return App.startSetUp();
      } else if (App.gamest == 2) {
        $('#plyrturn').text('Player ' + value.toString() + ' turn');
        $('.game').show();
        console.log(App.mid);
        console.log(value);
        // if (App.mid == value) {
        //   $('.setuppvt').show();
        // } else {
        //   $('.setuppvt').hide();
        // }
        return App.startGame();
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  donesetup: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Battleship.deployed().then(function (instance) {
        gameInstance = instance;
        return gameInstance.donesetup({
          from: account
        });
      }).then(function () {
        console.log(account);
        return App.gamestate();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },
  render: function () {
    App.store = new Store(App);
    App.store.clearState();
    App.store.setGameState(gameState.INIT);
    App.state = new InitialScreen(App.store, App, App.el);
  },

  checkSink: function (pdx, index) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.checkSink(pdx, index);
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  incrementHit: function (pdx, index) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.incrementHit(pdx, index);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  incrementSink: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.incrementSink(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  checkWin: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.checkWin(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  applySink: function (pdx, index) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.applySink(pdx, index);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  ///e323433
  getSetUpComplete: function (pdx) {
    var BattleshipInstance;
    return App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getSetUpComplete(pdx);
    });
    // }).catch(function (err) {
    //   console.log(err.message);
    // });
  },
  getSetUpRotate: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getSetUpRotate(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  getSetUpStage: function (pdx) {
    var BattleshipInstance;
    return App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getSetUpStage.call(pdx);
    });
    // }).then(function (val) {
    //   console.log(val.toNumber());
    //   ret = val.toNumber();
    //   return ret;
    // }).catch(function (err) {
    //   console.log(err.message);
    // });
    // return ret;
  },
  setSetUpComplete: function (pdx, index) {
    var BattleshipInstance;
    return App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.setSetUpComplete(pdx, index);
    });
  },
  setSetUpRotate: function () {
    App.ply.setUpRotate = !App.ply.setUpRotate;
    console.log(App.ply.setUpRotate);
  },
  incrementSetUpStage: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.incrementSetUpStage(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  setMap: function (pdx, x, y, val) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.setMap(pdx, x, y, val);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  getMap: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getMap(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  getMapAtPos: function (pdx, x, y) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getMapAtPos(pdx, x, y);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  setState: function (pdx, x, y, st) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.setState(pdx, x, y, st);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  getStateAtPos: function (pdx, x, y) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getStateAtPos(pdx, x, y);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  getState: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getState(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  clrply: function (pdx) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.clrply(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  bindEvents: function () {
    $(document).on('click', '#startgame', App.newgame);
    $(document).on('click', '#rotate', App.setSetUpRotate);
    $(document).on('click', '#done', App.donesetup);
    $(document).on('click', '#restart', App.donesetup);
  }
};


$(function () {
  $(window).load(function () {
    App.init();
  });
});