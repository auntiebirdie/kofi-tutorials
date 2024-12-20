const JSONdb = require('simple-json-db');

// Exports a function that is given an interaction.
module.exports = async (interaction) => {
  // Builds an array of the three options: rock, paper, and scissors.
  const options = [{
    id: 'rock',
    emoji: '🪨',
    defeats: 'scissors'
  }, {
    id: 'paper',
    emoji: '📰',
    defeats: 'rock'
  }, {
    id: 'scissors',
    emoji: '✂️',
    defeats: 'paper'
  }];
  // Builds the button components based on the above options.
  const components = [{
    type: 1, // 1 = row
    components: options.map((option) => {
      return {
        type: 2, // 2 = button
        style: 1, // 1 = primary blurple
        custom_id: `play/rock-paper-scissors_${option.id}`,
        emoji: {
          name: option.emoji
        }
      }
    })
  }];

  // If the interaction is a slash command...
  if (interaction.isChatInputCommand()) {
    interaction.reply({
      content: 'What is your move?',
      components,
      ephemeral: true
    });
  }
  // If the interaction is a message component...
  else if (interaction.isMessageComponent()) {
    interaction.deferUpdate();

    await interaction.webhook.deleteMessage(interaction.message.id);

    // Fetches what the user selected.
    const userSelected = options.find((option) => option.id == interaction.customId);
    // Randomly selects for the bot.
    const botSelected = options[Math.floor(Math.random() * options.length)];

    // Displays what the user and bot selected.
    let content = `Your ${userSelected.emoji} vs. my ${botSelected.emoji}\r\n\r\n`;
    let outcome;

    // Determine who won or if it was a tie.
    if (userSelected.defeats == botSelected.id) {
      content += ':tada: You win!';
      outcome = 'win';
    } else if (botSelected.defeats == userSelected.id) {
      content += ':smirk: I win!';
      outcome = 'lose';
    } else {
      content += ':handshake: It\'s a tie!';
      outcome = 'tie';
    }

    // Fetches the user's database file.
    const db = new JSONdb(`db/${interaction.user.id}.json`);

    // Increments the count for this outcome.
    db.set(outcome, (db.get(outcome) || 0) + 1);

    // Fetches the current score for the user.
    const score = {
      win: db.get('win') || 0,
      lose: db.get('lose') || 0,
      tie: db.get('tie') || 0
    };

    content += `\r\n\r\nScore: `;
    content += `${score.win.toLocaleString()} win${score.win == 1 ? '' : 's'}, `;
    content += `${score.lose.toLocaleString()} loss${score.lose == 1 ? '' : 'es'}, `;
    content += `${score.tie.toLocaleString()} tie${score.tie == 1 ? '' : 's'}`

    // Replies with the results.
    interaction.followUp({
      content,
      components,
      ephemeral: true
    });
  }
  // This shouldn't happen...
  else {
    interaction.reply({
      content: 'Something went wrong.',
      ephemeral: true
    });
  }
}