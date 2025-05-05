// Set up the environment.
require('dotenv').config();

const {
  Client,
  GatewayIntentBits
} = require('discord.js');

// Creates a client for interacting with Discord.
// See https://discordjs.guide/popular-topics/intents.html for more information on Gateway Intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Logs in with the provided token.
client.login(process.env.DISCORD_BOT_TOKEN);

const Chance = require('chance').Chance();

const {
  GoogleSpreadsheet
} = require('google-spreadsheet');
const {
  JWT
} = require('google-auth-library');

// Create an authentication token with the Service Account email and private key.
const jwt = new JWT({
  email: process.env.GOOGLE_AUTH_EMAIL,
  key: process.env.GOOGLE_AUTH_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ]
});

// Load the Google Spreadsheet with the authentication token.
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, jwt);

// Fires when the client is connected to Discord.
client.on('ready', async () => {
  // Loads the information about the spreadsheet into memory.
  await doc.loadInfo();
});

// Fires when a message is created.
client.on('messageCreate', async (message) => {
  // Ensure we don't respond to our own messages.
  if (message.author.id != client.user.id) {
    // Fetch the Responses sheets.
    const sheet = doc.sheetsByTitle['Responses'];

    // Load the rows.
    const rows = await sheet.getRows();

    // An array to store generic resposnes in.
    const generic = [];
    // An array to store specific resposnes in.
    const specific = [];

    // For each row...
    for (let row of rows) {
      try {
        // Fetch the trigger(s) for this row.
        const triggerData = row.get('trigger').trim();
        // Fetch the response for this row.
        const response = row.get('response').trim();

        // Assuming there is a response...
        if (response) {
          // If no trigger is defined, consider it a generic response.
          if (!triggerData) {
            generic.push(response);
          } else {
            // Split the triggers by commas.
            const triggers = triggerData.split(',');

            // For each trigger...
            for (let trigger of triggers) {
              trigger = trigger.trim();

              // If the trigger is an asterisk, it's a generic response.
              if (trigger == "*") {
                generic.push(response);
                // If there is a trigger and the message content contains it...
              } else if (trigger && message.content.match(new RegExp(`(^|[^A-Za-z])${trigger}([^A-Za-z]|$)`, 'gi'))) {
                // We found a specific response.
                specific.push(response);
              }
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    // If there are any specific responses, use those; otherwise, use generic responses.
    const responses = specific.length > 0 ? specific : generic;

    // Double-check there are any responses available...
    if (responses.length > 0) {
      // Reply to the message with a random response.
      message.reply(Chance.pickone(responses));
    }
  }
});
