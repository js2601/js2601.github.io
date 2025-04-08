var fs = require('fs')
var data = []

data.push({username: "donovan", balance: 1000})
let json = JSON.stringify(data)
fs.writeFile('data.json', json, 'utf8', (error) => {
    if (error) throw error;
    console.log('Data saved');
})
