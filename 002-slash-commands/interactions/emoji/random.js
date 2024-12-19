// Exports a function that is given an interaction.
module.exports = (interaction) => {
  // Creates an array of emoji to pull from.
  const emoji = [":wave:", ":sob:", ":smiling_imp:", ":face_holding_back_tears:", ":pleading_face:", ":joy:", ":open_mouth:", ":neutral_face:"];
  // Fetches a random index from the array based on its length.
  const index = Math.floor(Math.random() * emoji.length);

  // Replies to the interaction with the emoji at the randomly chosen index.
  interaction.reply(emoji[index]);
}
