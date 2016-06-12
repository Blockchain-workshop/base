contract('Premium', function(accounts) {
  it("should return true on premium admin account", function(done) {
    var meta = Premium.deployed();

    meta.amIPremium.call('admin', {from:accounts[0]}).then(function(value) {
      assert.equal(value, true);
    }).then(done).catch(done);
  });

  it("should get price of premium memberships", function(done) {
    var meta = Premium.deployed();

    meta.getPrice().then(function(price) {
      console.log(price.valueOf());
    }).then(done).catch(done);
  });


  it("should show false for non premium users", function(done) {
    var meta = Premium.deployed();

    meta.amIPremium.call('test', {from:accounts[1]}).then(function(value) {
      assert.equal(value, false);
    }).then(done).catch(done);
  });
  // it("should call a function that depends on a linked library  ", function(done){
  //   var meta = MetaCoin.deployed();
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;
  //
  //   meta.getBalance.call(accounts[0]).then(function(outCoinBalance){
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth){
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //
  //   }).then(function(){
  //     assert.equal(metaCoinEthBalance,2*metaCoinBalance,"Library function returned unexpeced function, linkage may be broken");
  //
  //   }).then(done).catch(done);
  // });
  // it("should send coin correctly", function(done) {
  //   var meta = MetaCoin.deployed();
  //
  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];
  //
  //   assert.notEqual(account_one, undefined, "You need to have atleast 2 accounts, with the first unlocked");
  //   assert.notEqual(account_two, undefined, "You need to have atleast 2 accounts, with the first unlocked");
  //
  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;
  //
  //   var amount = 10;
  //
  //   meta.getBalance.call(account_one).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();
  //
  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   }).then(done).catch(done);
  // });
});
