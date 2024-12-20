// Set up the environment.
require('dotenv').config();

const { REST, Routes } = require('discord.js')

// Creates a client for interacting with the Discord REST API.
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN)

// Sends a PUT request to the Application Commands endpoint of the Discord REST API.
rest.put(
  Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), {
    body: [{
      "name": "hello",
      "description": "Hello world!",
      "options": [{
        "type": 3, // 3 = string
        "name": "name",
        "description": "What name should I call you?"
      }]
    }, {
      "name": "echo",
      "description": "Is there an echo in here?"
    }]
  }
)
