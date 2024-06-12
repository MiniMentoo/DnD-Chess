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
                    reply = displayHand(userHand);}
            } else {
                reply = {content : `You don't have a hand in this server yet! Try joining a game with /join`, ephemeral : false};
            }
        } else {
            reply = {content : `This server doesn't have a game yet! Try making one with /join`, ephemeral : true};
        }
        await interaction.reply(reply);
    },
};

function displayHand(hand) {
    let spells = []
    let minions = []
    let items = []
    for (const card of hand) {
        console.log(card);
        switch(card.id.charAt(0)) {
            case '0':
                spells.push(`${card.name}-${card.id}`);
                break;
            case '1':
                minions.push(`${card.name}-${card.id}`);
                break;
            case '2':
                items.push(`${card.name}-${card.id}`);
                break;
            default:
                throw new Error('Array passed into display hand not an array of cards');
        }
    }
    return codeBlock('md', `Your hand contains ${hand.length} card(s)
# Spells
${spells}

# Minions
${minions}

# Items
${items}`)
}