const fs = require('fs');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

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
    if (!deck || !Array.isArray(deck.cards) || deck.cards.length === 0) {
        throw new Error('Invalid deck structure or empty cards array');
    }
    const cards = deck.cards;
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

function displayCard(card) {
    
}

// Export the functions
module.exports = {
    readDeck,
    drawRandomCard
};