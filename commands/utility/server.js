const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('server')
        .setDescription("Says what server it's in"),
    async execute(interaction) {
        await interaction.reply(`I'm in ${interaction.guild.name} server with ${interaction.guild.memberCount} members.`);
    },
};