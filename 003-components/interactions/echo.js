// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // If this interaction is a slash command...
  if (interaction.isChatInputCommand()) {
    // "Replies" to the interaction with a modal.
    interaction.showModal({
      custom_id: 'echo',
      title: 'Echo Input',
      components: [{
        type: 1, // 1 = row
        components: [{
          type: 4, // 4 = text input
          style: 2, // 2 = paragraph
          custom_id: 'message', // Used to reference this later to fetch the value.
          label: 'What do you want me to say?'
        }]
      }]
    });
  // If this interaction is a modal submit...
  } else if (interaction.isModalSubmit()) {
    // Retrieves the submitted value for the message field.
    const message = interaction.fields.getTextInputValue('message');

    // Sends the message.
    interaction.reply(message);
  } else {
    console.log('this should not happen');
  }
}
