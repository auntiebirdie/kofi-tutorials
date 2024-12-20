// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Replies to the interaction with the wave emoji or *waves*
  interaction.reply({
    content: interaction.customId == 'button1' ? ':wave:' : '*waves*'
  });
}
