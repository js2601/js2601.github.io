const fs = require('fs')
var data = []

module.exports = {
    getBalance: function(user) {

        const path = require("path");
        const aPath = path.resolve(__dirname, '../data.json')
        const fileData = JSON.parse(fs.readFileSync(aPath, 'utf8'))

        let foundArray = fileData.find(({ username }) => {
            return username === user
        })
        
        return foundArray;
    }
}