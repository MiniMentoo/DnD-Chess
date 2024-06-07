const { SlashCommandBuilder, codeBlock} = require('discord.js');
const { readDeck, drawRandomCard } = require('./deckUtils');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('draw spell')
        .setDescription('draws a spell from deck and adds it to your hand'),
    async execute(interaction) {
        
        await interaction.reply(reply);
    },
};