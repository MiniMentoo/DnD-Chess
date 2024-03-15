const { SlashCommandBuilder, codeBlock } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('fluke')
        .setDescription('rolls dice, normally...')
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
        tuple = roll(val, number);
        const total = tuple[0];
        const rolls = tuple[1];
        await interaction.reply(codeBlock('md',`Rolling ${number}d${val} for: 
#   ${total}
details: ${rolls}`));
    },
};

function roll(val, number) {
    var total = 0;
    var rolls = []
    if (Math.floor(Math.random() * 2) === 1) {
        for (let i = 0; i < number; i++) {
            rolls.push(val);
            total += val;
        }
        return [total, rolls];
    }
    for (let i = 0; i < number; i++) {
        const roll = (Math.floor((Math.random() * val) + 1));
        rolls.push(roll);
        total += roll;
    }
    return [total, rolls];
}