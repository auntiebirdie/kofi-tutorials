// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Creates an array of emoji to pull from.
  const emoji = [":broken_heart:", ":heart_exclamation:", ":two_hearts:", ":revolving_hearts:", ":heartbeat:", ":heartpulse:", ":sparkling_heart:", ":cupid:", ":gift_heart:", ":mending_heart:", ":heart_on_fire:"];
  // Fetches a random index from the array based on its length.
  const index = Math.floor(Math.random() * emoji.length);

  // Replies to the interaction with the emoji at the randomly chosen index.
  interaction.reply(emoji[index]);
}
