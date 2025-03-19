var fs = require('fs')
var data = {}

data.push({user: 1, balance: 3})
let json = JSON.stringify(data)
fs.writeFile('data.json', json, 'utf8', callback)
