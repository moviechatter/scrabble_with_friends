const fs = require('fs');

fs.readFile("scrabble_2019.json", 'ascii', function(err, data) {
    if (err) throw err;
    const words = JSON.parse(data);
    const scrabbleSet = new Set(words);
    console.log(scrabbleSet.has('SANGHA'));
});