App = {
  web3Provider: null,
  contracts: {},
  state: null,
  store: new Store(),
  el: document.getElementById('app'),

  init: async function () {
    // Load pets.


    return await App.initWeb3();
  },

  startSetUp: function (player) {
    App.store.setGameState(gameState.SETUP);
    App.state = new SetUpScreen(App.store, App, App.el, player);
  },

  startGame: function () {
    App.store.setGameState(gameState.PLAY);
    App.state = new GameScreen(App.store, App, App.el);
  },

  setWinner: function (player) {
    App.store.setGameState(gameState.WIN);
    App.state = new WinnerScreen(App.store, App, App.el, player);
  },

  reRender: function () {
    App.el.innerHTML = '';
    App.state.render();
  },

  initWeb3: async function () {
    /*
     * Replace me...
     */
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
    /*
     * Replace me...
     */
    $.getJSON('Battleship.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var BattleshipArtifact = data;
      App.contracts.Battleship = TruffleContract(BattleshipArtifact);

      // Set the provider for our contract
      App.contracts.Battleship.setProvider(App.web3Provider);
      console.log("yesss")
      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
      return App.render();
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
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      return BattleshipInstance.getSetUpComplete(pdx);
    }).catch(function (err) {
      console.log(err.message);
    });
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
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.setSetUpComplete(pdx, index);
    }).catch(function (err) {
      console.log(err.message);
    });
  },
  setSetUpRotate: function (pdx, index) {
    var BattleshipInstance;
    App.contracts.Battleship.deployed().then(function (instance) {
      BattleshipInstance = instance;
      BattleshipInstance.setSetUpRotate(pdx, index);
    }).catch(function (err) {
      console.log(err.message);
    });
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
  }
  // bindEvents: function() {
  //   $(document).on('click', '.btn-adopt', App.handleAdopt);
  // },
  // markAdopted: function(adopters, account) {
  //   /*
  //    * Replace me...
  //    */
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function(instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  // //   },

  // markAdopted: function(adopters, account) {
  //   /*
  //    * Replace me...
  //    */
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function(instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  //   },

  // handleAdopt: function(event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));
  //   var adoptionInstance;

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.Adoption.deployed().then(function(instance) {
  //       adoptionInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return adoptionInstance.adopt(petId, {from: account});
  //     }).then(function(result) {
  //       return App.markAdopted();
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   });
  // }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});