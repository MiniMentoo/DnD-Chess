const fs = require('fs');

// Function to read a JSON file and parse it
function readDeck(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const deck = JSON.parse(data);
                    resolve(deck);
                } catch (parseErr) {
                    reject(parseErr);
                }
            }
        });
    });
}

// Function to randomly pick a card from a deck
function drawRandomCard(deck) {
    const cards = deck.cards;
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

// Export the functions
module.exports = {
    readDeck,
    drawRandomCard
};