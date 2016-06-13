var BigNumber = require('bignumber.js');

contract('Premium', function(accounts) {
    var premium;
    function toEther(value) {
        return web3.fromWei(value, "ether");
    }

    function toWei(value) {
        return web3.toWei(value, "ether");
    }

    before(function() {
        premium = Premium.deployed();
        web3.eth.defaultAccount = accounts[0];
    });

    it("should return 2 ether as price from getPrice()", function(done) {
        premium.getPrice.call().then(function(value) {
            const priceInEther = toEther(value.valueOf())
            assert.equal(priceInEther, 2);
        }).then(done).catch(done);
    });

    it("should be able to set new price with setPrice()", function(done) {
        const newPrice = toWei(5);
        premium.setPrice(newPrice)
            .then(function(){
                return premium.getPrice.call();
            }).then(function(value) {
                assert.equal(value.valueOf(), newPrice, "Was not able to change the price.");
            }).then(done).catch(done);
    });

    it("setPrice() should not be able to set new price with an account that is not the owner", function(done) {
        premium.setPrice(toWei(9), { from: accounts[1] })
            .catch(() => {})
            .then(function(){
                return premium.getPrice.call();
            }).then(function(value) {
                assert.equal(value.valueOf(), toWei(5), "The price has been changed!");
            }).then(done).catch(done);
    });

     it("should return the balance on the contract when getProfit() is called", function (done){
        web3.eth.sendTransaction({
            to: premium.address,
            value: toWei(100)
        }, function(err, address) {
            premium.getProfit.call()
                .then(function(res) {
                    assert.equal(res.valueOf(), toWei(100));
                }).then(done).catch(done);
        });
    });

    it("extractProfit() should send all the balance on the account to the owner", function (done){
        const transactionOpts = {
            from: accounts[0]
        };

        const balanceBefore = web3.eth.getBalance(accounts[0]);
        premium.extractProfit(transactionOpts)
            .catch(() => {})
            .then(function() {
                const balanceAfter = web3.eth.getBalance(accounts[0]);
                const earned = balanceAfter.minus(balanceBefore);
                assert.equal(toEther(earned).toNumber() > 9.9, true, "Did not extract all the ether");
            }).then(done).catch(done);
    });

    it("should not send the balance on the contract when extractProfit() is called by someone else than the owner", function (done){
        web3.eth.sendTransaction({
            to: premium.address,
            from: accounts[2],
            value: toWei(100)
        }, function(err, address) {
            const account = accounts[2];

            const balanceBeforeSender = web3.eth.getBalance(account);
            const balanceBeforeOwner = web3.eth.getBalance(accounts[0]);
            premium.extractProfit({ from: account })
                .catch(() => {})
                .then(function() {
                    const balanceAfterSender = web3.eth.getBalance(account);
                    const balanceAfterOwner = web3.eth.getBalance(accounts[0]);
                    const earnedSender = balanceAfterSender.minus(balanceBeforeSender);
                    const earnedOwner = balanceAfterOwner.minus(balanceBeforeOwner);
                    assert.equal(toEther(earnedSender).toNumber() <= 0, true, "Money was extracted to the person asking");
                    assert.equal(toEther(earnedOwner).toNumber() <= 0, true, "Money was extracted to the owner");
                }).then(done).catch(done);
        });
    });

    it("isUserPremium should return false for unregistered user", function(done) {
        premium.isUserPremium.call("enepost@bekk.no")
            .then(function(result){
                assert.equal(result.valueOf() === false, true, "Did not return false for unregistered user");
            }).then(done).catch(done);
    });

    it("should become premium user if I register with becomePremiumUser", function(done) {
        const transactionOpts = {
            from: accounts[1],
            value: toWei(5)
        };
        premium.becomePremiumUser("bruker1", transactionOpts)
            .then(function(){
                return premium.isUserPremium.call("bruker1");
            }).then(function(result) {
                assert.equal(result.valueOf(), true, "Was not registered as a new user.");
            }).then(done).catch(done);
    });

    it("should not become premium user if I register with becomePremiumUser without paying", function(done) {
        const transactionOpts = {
            from: accounts[1],
            value: toWei(2)
        };

        premium.becomePremiumUser("bruker2", transactionOpts)
            .catch(() => {})
            .then(function(){
                return premium.isUserPremium.call("bruker2");
            }).then(function(result) {
                assert.equal(result.valueOf() === false, true, "Was registered as a new user");
            }).then(done).catch(done);
    });

    it("becomePremiumUser() should return ether if we did not pay enough", function(done) {
        const transactionOpts = {
            from: accounts[1],
            value: toWei(2)
        };

        const balanceBefore = web3.eth.getBalance(accounts[1]);
        premium.becomePremiumUser("bruker2", transactionOpts)
            .catch(() => {})
            .then(function(){
                return premium.isUserPremium.call("bruker2");
            }).then(function(result) {
                const balanceAfter = web3.eth.getBalance(accounts[1]);
                assert.equal(result.valueOf(), false, "User was mistakenly rigstered!");
                const cost = balanceBefore.minus(balanceAfter);
                assert.equal(toEther(cost).toNumber() < 0.1, true, "Did not return the ether");
            }).then(done).catch(done);
    });

    it("becomePremiumUser() should return all the ether if user is already registered", function(done) {
        const transactionOpts = {
            from: accounts[1],
            value: toWei(1000)
        };

        const balanceBefore = web3.eth.getBalance(accounts[1]);
        premium.becomePremiumUser("bruker1", transactionOpts)
            .catch(() => {})
            .then(function(){
                return premium.isUserPremium.call("bruker1");
            }).then(function(result) {
                const balanceAfter = web3.eth.getBalance(accounts[1]);
                assert.equal(result.valueOf(), true);
                const cost = toEther(balanceBefore.minus(balanceAfter)).toNumber();
                assert.equal(cost < 0.1, true, "The ether was not returned to the account");
            }).then(done).catch(done);
    });

    it("becomePremiumUser() should return the extra ether if we pay to much", function(done) {
        const transactionOpts = {
            from: accounts[1],
            value: toWei(1000)
        };

        const balanceBefore = web3.eth.getBalance(accounts[1]);
        premium.becomePremiumUser("bruker3", transactionOpts)
            .catch(() => {})
            .then(function(){
                return premium.isUserPremium.call("bruker3");
            }).then(function(result) {
                const balanceAfter = web3.eth.getBalance(accounts[1]);
                assert.equal(result.valueOf(), true);
                const cost = toEther(balanceBefore.minus(balanceAfter)).toNumber();
                assert.equal(cost >= 5, true, "Costs less than asking-price");
                assert.equal(cost < 5.1, true, "Costs more than asking-price!");
            }).then(done).catch(done);
    });
});
