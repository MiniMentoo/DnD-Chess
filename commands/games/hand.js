const { SlashCommandBuilder, codeBlock} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('hand')
        .setDescription('shows you your hand'),
    async execute(interaction) {
        let reply = `temp`;
        if (global.hands.has(interaction.guild.id)){
            let serverHands = global.hands.get(interaction.guild.id);
            if (serverHands.has(interaction.user)) {
                let userHand = serverHands.get(interaction.user);
                if (userHand.length == 0){
                    reply = codeBlock('md', `Your hand is currently empty!`)
                } else {
                    reply = codeBlock('md', `Your hand currently has
${userHand}`);}
            } else {
                reply = {content : `You don't have a hand in this server yet! Try joining a game with /join`, ephemeral : false};
            }
        } else {
            reply = {content : `This server doesn't have a game yet! Try making one with /join`, ephemeral : true};
        }
        await interaction.reply(reply);
    },
};