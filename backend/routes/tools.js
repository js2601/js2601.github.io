var fs = require('fs')
var data = {}

data.push({user: 1, balance: 3})
let json = JSON.stringify(data)
fs.writeFile('data.json', json, 'utf8', callback)

module.exports = {
    getBalance: function(user) {
        let json = fs.readFile('../data.json')
        let data = JSON.parse(json);

        let foundArray = data.find(({username}) => username === user)
        return foundUser.info.balance;
    }
}