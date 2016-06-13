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
                assert.equal(value.valueOf(), newPrice);
            }).then(done).catch(done);
    });

    it("should not be able to set new price with an account that is not the owner", function(done) {
        premium.setPrice(toWei(9), { from: accounts[1] })
            .catch(() => {})
            .then(function(){
                return premium.getPrice.call();
            }).then(function(value) {
                assert.equal(value.valueOf(), toWei(5));
            }).then(done).catch(done);
    });

    it("isUserPremium should return false for unregistered user", function(done) {
        premium.isUserPremium.call("enepost@bekk.no")
            .then(function(result){
                assert.equal(result.valueOf(), false);
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
                assert.equal(result.valueOf(), true);
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
                assert.equal(result.valueOf(), false);
            }).then(done).catch(done);
    });

    it("should return ether if we did not pay enough", function(done) {
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

    it("should return the extra ether if we pay to much", function(done) {
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
