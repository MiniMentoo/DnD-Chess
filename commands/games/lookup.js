const { SlashCommandBuilder } = require('discord.js');
const { displayCard } = require('../../deck-util.js');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('lookup')
        .setDescription('Displays card with given id')
        .addStringOption(option => 
            option
                .setName('id')
                .setDescription('ID of the card your looking up')
                .setRequired(true)),
    async execute(interaction) {
        const id = interaction.options.getString('id');
        let reply = {content : `ID found!` , ephemeral : true};
        try{
            embed = displayCard(id);
            interaction.channel.send({ embeds: [embed]});
        } catch (err) {
            reply = {content : `Invalid ID given (should be a 4 digit number starting with 0 1 or 2!)`, ephemeral : true};
        }
        await interaction.reply(reply);
    },
};