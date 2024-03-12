const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings user')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('the target of the ping')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') ?? interaction.user;
        await interaction.reply(`${user}`);
    },
};