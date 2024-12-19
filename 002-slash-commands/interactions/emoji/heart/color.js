// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Creates an array of emoji to pull from.
  const emoji = [":red_heart:", ":orange_heart:", ":yellow_heart:", ":green_heart:", ":blue_heart:", ":purple_heart:", ":black_heart:", ":white_heart:", ":brown_heart:"];
  // Fetches a random index from the array based on its length.
  const index = Math.floor(Math.random() * emoji.length);

  // Replies to the interaction with the emoji at the randomly chosen index.
  interaction.reply(emoji[index]);
}
