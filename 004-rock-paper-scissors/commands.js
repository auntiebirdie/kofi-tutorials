// Set up the environment.
require('dotenv').config();

const { REST, Routes } = require('discord.js')

// Creates a client for interacting with the Discord REST API.
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN)

// Sends a PUT request to the Application Commands endpoint of the Discord REST API.
rest.put(
  Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), {
    body: [{
      "name": "play",
      "description": "Would you like to play a game?",
      "options": [{
        "type": 1, // 1 = subcommand
        "name": "rock-paper-scissors",
        "description": "Let's play Rock Paper Scissors!"
      }]
    }]
  }
)
