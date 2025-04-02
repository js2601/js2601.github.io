const fs = require('fs')
var data = []

const path = require("path");
const aPath = path.resolve(__dirname, '../data.json')
const fileData = JSON.parse(fs.readFileSync(aPath, 'utf8'))

module.exports = {
    getBalance: function(user) {

        let foundArray = fileData.find(({ username }) => {
            return username === user;
        })
        
        return foundArray;
    },
    setBalance: function(user, bal) {
        let foundArray = fileData.find(({ username }) => {
            return username === user;
        })

        foundArray.balance = bal;

        return foundArray;
    }
}