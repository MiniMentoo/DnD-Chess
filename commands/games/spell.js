const { SlashCommandBuilder, codeBlock} = require('discord.js');
const { readDeck, drawRandomCard } = require('../../deck-util.js');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('draw_spell')
        .setDescription('draws a spell from deck and adds it to your hand'),
    async execute(interaction) {
        let reply = `temp`;
        const spell_deck = await readDeck("commands/games/spell-deck.json");

        if (global.hands.has(interaction.guild.id)){
            let serverHands = global.hands.get(interaction.guild.id);
            if (serverHands.has(interaction.user)) {
                let userHand = serverHands.get(interaction.user);
                card = await drawRandomCard(spell_deck);
                userHand.push(card)
                reply = {content : `You drew the spell ${card.name}`, ephemeral : true};
            } else {
                reply = {content : `You don't have a hand in this server yet! Try joining a game with /join`, ephemeral : false};
            }
        } else {
            reply = {content : `This server doesn't have a game yet! Try making one with /join`, ephemeral : true};
        }
        await interaction.reply(reply);
    },
};