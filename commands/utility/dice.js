const { SlashCommandBuilder, bold, codeBlock } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('d')
        .setDescription('roll dice')
        .addIntegerOption(option =>
            option
                .setName('value')
                .setDescription('Value of the dice to be rolled')
                .setRequired(true)
                .setMinValue(0))
        .addIntegerOption(option =>
            option
                .setName('quantity')
                .setDescription('The amount of dice to roll')
                .setMinValue(0)),
    async execute(interaction) {
        const val = interaction.options.getInteger('value');
        const number = interaction.options.getInteger('quantity') ?? 1;
        var total = 0;
        var rolls = []
        for (let i = 0; i < number; i++) {
            const roll = (Math.floor((Math.random() * val) + 1));
            rolls.push(roll)
            total += roll;
        }
        const reply = codeBlock(`Rolling ${number}d${val} for total: ${total}
details: ${rolls}`);
        await interaction.reply(reply);
    },
};