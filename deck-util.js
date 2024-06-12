const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

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

function displayCard(id) {
    let card;
    switch (id.charAt(0)){
        case '0':
            card = spell_deck.cards[parseInt(id.substring(1))];
            break;
        case '1':
            card = minion_deck.cards[parseInt(id.substring(1))];
            break;
        case '2':
            card = item_deck.cards[parseInt(id.substring(1))];
            break;
        default:
            throw new Error('Array passed into display card not a valid id');
    }
    console.log(card);
    const embed = new EmbedBuilder()
        .setTitle(`${card.name} - ${card.id}`)
        .setDescription(card.description)
        .setImage('https://imgur.com/sLAmkry.png')
    if (card.image) {
        embed.setImage(card.image);
    }
    return embed;
}

// Export the functions
module.exports = {
    readDeck,
    drawRandomCard,
    displayCard
};