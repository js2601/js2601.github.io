const fs = require('fs')
function readData() {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    fs.readFile(aPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        return JSON.parse(data);
    });ß

    
}

module.exports = { readData }