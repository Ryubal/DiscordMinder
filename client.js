/**
 * Since we'll need to get the client in the reminders checking script,
 * we will be separating it from the index.js file.
 */
const {Client} = require('discord.js')

// Create the instance and export it
module.exports = new Client()