// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Fetches the optional name, defaulting to "world"
  const name = interaction.options.getString('name') || 'world';

  // Replies to the interaction with "Hello {name}!"
  interaction.reply({
    content: `Hello ${name}!`,
    components: [{
      type: 1, // 1 = row
      components: [{
        type: 2, // 2 = button
        style: 1, // 1 = primary blurple
        custom_id: 'wave_button1',
        label: 'Wave 1'
      }, {
        type: 2, // 2 = button
        style: 1, // 1 = primary blurple
        custom_id: 'wave_button2',
        label: 'Wave 2'
      }]
    }, {
      type: 1, // 1 = row
      components: [{
        type: 5, // 5 = user select
        custom_id: 'greet_user'
      }]
    }, {
      type: 1, // 1 = row
      components: [{
        type: 3, // 3 = string/custom select
        custom_id: 'greet_custom',
        options: [{
          label: 'Everybody',
          value: 'everybody'
        }, {
          label: 'Somebody',
          value: 'somebody'
        }, {
          label: 'Nobody',
          value: 'nobody'
        }]
      }]
    }]
  });
}
