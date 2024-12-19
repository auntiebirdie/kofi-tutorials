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
  let filePath = `interactions/${interaction.commandName}`;

  // If the interaction is a slash command, check for subcommand groups and subcommands.
  if (interaction.isChatInputCommand()) {
    if (interaction.options.getSubcommandGroup()) {
      filePath += `/${interaction.options.getSubcommandGroup()}`;
    }

    if (interaction.options.getSubcommand()) {
      filePath += `/${interaction.options.getSubcommand()}`;
    }
  }

  require(`./${filePath}.js`)(interaction);
});
