// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  switch (interaction.customId) {
    case 'user':
      // Gets the selected user ID from the interaction values.
      const selectedUserId = interaction.values.pop();
      // Fetches the user data from the interaction guild members.
      const selectedUser = await interaction.guild.members.fetch(selectedUserId);

      // Replies to the interaction by saying hello to the selected user.
      interaction.reply(`Hello ${selectedUser.displayName}!`);
      break;
    case 'custom':
      interaction.reply(`Hello ${interaction.values.pop()}!`);
      break;
  }
}