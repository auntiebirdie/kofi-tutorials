// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Fetches the optional name, defaulting to "world"
  const name = interaction.options.getString('name') || 'world';

  // Replies to the interaction with "Hello {name}!"
  interaction.reply(`Hello ${name}!`);
}
