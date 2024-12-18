// Set up the environment.
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

// Creates a client for interacting with Discord.
// See https://discordjs.guide/popular-topics/intents.html for more information on Gateway Intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Logs in with the provided token.
client.login(process.env.DISCORD_BOT_TOKEN);

// Executes the logic for an interaction based on the command name.
client.on('interactionCreate', (interaction) => {
  require(`./interactions/${interaction.commandName}.js`)(interaction);
});
