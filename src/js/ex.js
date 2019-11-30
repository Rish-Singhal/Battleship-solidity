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