const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('d')
        .setDescription('roll dice')
        .addIntegerOption(option =>
            option
                .setName('value')
                .setDescription('Value of the dice to be rolled')
                .setRequired(true)
                .setMinValue(1))
        .addIntegerOption(option =>
            option
                .setName('quantity')
                .setDescription('The amount of dice to roll')
                .setMinValue(1)),
    async execute(interaction) {
        const val = interaction.options.getInteger('value');
        const number = interaction.options.getInteger('quantity') ?? 1;
        var total = 0;
        for (let i = 0; i < number; i++) {
            total += Math.floor((Math.random() * val) + 1);
        }
        await interaction.reply(`Total is ${total}`);
    },
};