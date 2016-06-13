contract Premium {

    struct User {
        address user;
        bool paid;
    }

    uint price;
    mapping(string => User) PremiumUsers;
    address owner;

    function Premium() {
        owner = msg.sender;
        var user = PremiumUsers['admin'];
        user.user = owner;
        user.paid = true;
        price = 2 ether;
    }

    modifier costs(uint _amount) {
        if (msg.value < _amount)
            throw;
        _
        if (msg.value > _amount)
            msg.sender.send(_amount - msg.value);
    }

    modifier onlyBy(address account) {
        if (msg.sender != account)
            throw;
        _
    }

    function setPrice(uint newPrice) onlyBy(owner) {
        price = newPrice;
    }

    function getPrice() constant returns (uint) {
        return price;
    }

    function isUserPremium(string mail) returns (bool) {
        if(PremiumUsers[mail].paid) {
            return true;
        } else {
            return false;
        }
    }

    function becomePremiumUser(string mail) costs(price) {
        if(PremiumUsers[mail].paid) {
            msg.sender.send(msg.value);
        } else {
            var newUser = PremiumUsers[mail];
            newUser.user = msg.sender;
            newUser.paid = true;
        }
    }

    function setMail(string oldMail, string newMail) returns (bool changed) {
        if(PremiumUsers[oldMail].user == msg.sender) {
            var newUser = PremiumUsers[newMail];
            newUser.user = msg.sender;
            newUser.paid = true;
            delete PremiumUsers[oldMail];
            return true;
        } else {
            return false;
        }
    }

    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}
