// Set up the environment.
require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js');

// Creates a client for interacting with Discord.
// See https://discordjs.guide/popular-topics/intents.html for more information on Gateway Intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Logs in with the provided token.
client.login(process.env.DISCORD_BOT_TOKEN);

// When the client declares that it's ready, log a message letting us know.
client.once('ready', () => {
  console.log('Logged in and ready to go!');
});

// When the client sees a new message, check for a ping and respond.
client.on('messageCreate', (message) => {
  if (message.mentions.has(client.user.id)) {
    message.reply('Hello world.');
  }
});
