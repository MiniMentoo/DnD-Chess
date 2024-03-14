const { SlashCommandBuilder, codeBlock, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

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
        tuple = roll(val, number);
        const total = tuple[0];
        const rolls = tuple[1];

        const reply = codeBlock('md',`Rolling ${number}d${val} for: 
#   ${total}
details: ${rolls}`);
        
        const advantage = new ButtonBuilder()
            .setCustomId('advantage')
            .setLabel('Advantage')
            .setStyle(ButtonStyle.Success);
        
        const disadvantage = new ButtonBuilder()
            .setCustomId('disadvantage')
            .setLabel('Disadvantage')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(advantage, disadvantage);
        
        const response = await interaction.reply({ 
            content : reply, 
            components : [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const reroll = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
            
            if (reroll.customId === 'advantage') {
                tuple = roll(val, number);
                const total2 = tuple[0];
                const rolls2 = tuple[1];
                var finalTotal = 0;

                if (total2 > total){
                    finalTotal = total2;
                } else {
                    finalTotal = total;
                }
                const reply = codeBlock('md',`Rolling ${number}d${val} with advantage for: 
#   ${finalTotal}
first roll: ${rolls} = ${total}
second roll: ${rolls2} = ${total2}`)
                await reroll.update({ content: reply, components: []});
            } else if (reroll.customId === 'disadvantage') {
                tuple = roll(val, number);
                const total2 = tuple[0];
                const rolls2 = tuple[1];
                var finalTotal = 0;
                if (total2 < total){
                    finalTotal = total2;
                } else {
                    finalTotal = total;
                }
                const reply = codeBlock('md',`Rolling ${number}d${val} with disadvantage for: 
#   ${finalTotal}
first roll: ${rolls} = ${total}
second roll: ${rolls2} = ${total2}`)
                await reroll.update({ content: reply, components: []});
            }
        } catch (e) {
            await interaction.editReply({ components : []});
        }
    },
};


function roll(val, number) {
    var total = 0;
    var rolls = []
    for (let i = 0; i < number; i++) {
        const roll = (Math.floor((Math.random() * val) + 1));
        rolls.push(roll)
        total += roll;
    }
    return [total, rolls];
}