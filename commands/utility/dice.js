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
                .setMinValue(0))
        .addIntegerOption(option =>
            option
                .setName('take_highest')
                .setDescription('The top x number of dice taken from result, negatives give lowest number instead')),
    async execute(interaction) {
        const val = interaction.options.getInteger('value');
        const number = interaction.options.getInteger('quantity') ?? 1;
        const takeHighest = interaction.options.getInteger('take_highest') ?? 0;
        tuple = roll(val, number);
        const total = tuple[0];
        const rolls = tuple[1];
        const reply = creteOutput(total, rolls, takeHighest, number, val);
        
        const advantage = new ButtonBuilder()
            .setCustomId('advantage')
            .setLabel('Advantage')
            .setStyle(ButtonStyle.Success);
        
        const disadvantage = new ButtonBuilder()
            .setCustomId('disadvantage')
            .setLabel('Disadvantage')
            .setStyle(ButtonStyle.Danger);

        var row = new ActionRowBuilder();
        if (takeHighest === 0){
            row = row.addComponents(advantage, disadvantage);      
        } else {
            row = row.addComponents(new ButtonBuilder().setLabel('No advantage for you :(').setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ').setStyle(ButtonStyle.Link))
        }
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
        rolls.push(roll);
        total += roll;
    }
    return [total, rolls];
}

function takeHighest(rolls, number) {
    rolls.sort();
    rolls.reverse();
    var total = 0;
    var highest = [];
    const limit = Math.min(number, rolls.length);
    for (let i = 0; i < limit; i++) {
        highest.push(rolls[i]);
        total += rolls[i];
    }
    return [total, highest];
}

function takeLowest(rolls, number) {
    rolls.sort();
    var total = 0;
    var lowest = [];
    const limit = Math.min(number, rolls.length);
    for (let i = 0; i < limit; i++) {
        lowest.push(rolls[i]);
        total += rolls[i];
    }
    return [total, lowest];
}

function creteOutput(total, rolls, highest, number, val) {
    var reply = '';
    if (highest > 0) {
        const tuple = takeHighest(rolls, highest);
        reply = codeBlock('md', `Rolling ${number}d${val} and taking highest ${highest} for:
#   ${tuple[0]}
details: ${tuple[1]} (${rolls})`);
    } else if (highest < 0) {
        const lowest = highest * -1;
        const tuple = takeLowest(rolls, lowest);
        reply = codeBlock('md', `Rolling ${number}d${val} and taking lowest ${lowest} for:
#   ${tuple[0]}
details: ${tuple[1]} (${rolls})`);
    } else {
        reply = codeBlock('md',`Rolling ${number}d${val} for: 
#   ${total}
details: ${rolls}`);
    }
    return reply;
}