const { SlashCommandBuilder, parseResponse, codeBlock } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('leave')
        .setDescription("Leaves the current game"),
    async execute(interaction) {
        let reply = ``;
        if (global.games.has(interaction.guild.id)) {
            let gameUsers = global.games.get(interaction.guild.id);
            let index = gameUsers.indexOf(interaction.user);
            if(index === -1) {
                reply = {content : `You're not in this game!`, ephemeral : true};
            } else {
                gameUsers.splice(index, 1);
                reply = {content : `${interaction.user} has left the game!`};
            }
        } else {
            reply = {content : `There is no game in this server!`, ephemeral : true};
        }
        await interaction.reply(reply);
    },
};