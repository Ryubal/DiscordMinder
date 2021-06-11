const Discord = require('discord.js')
const client = require('./client')
const {token, defaultLang} = require('./config.json')
const fs = require('fs')
const path = require('path')
const i18n = require('i18n')

// Import DB to set everything up
const db = require('./db/db')

// Discord client was created in ./client.js
// Define commands collection
client.commands = new Discord.Collection()

// Configure i18n
i18n.configure({
	directory: path.join(__dirname, 'locales'),
	defaultLocale: defaultLang,
	objectNotation: true
})

// Load commands from ./commands
const commandFolders = fs.readdirSync('./commands')
for(const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'))
	for(const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`)
		client.commands.set(command.name, command)
	}
}

// Load events from ./events
// We'll start to check for reminders in the ./events/ready.js event
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('js'))
for(const file of eventFiles) {
	const event = require(`./events/${file}`)
	
	// When importing, we'll pass client
	if(event.once)
		client.once(event.name, (...args) => event.execute(...args, client))
	else
		client.on(event.name, (...args) => event.execute(...args, client))
}

// Login!
client.login(token)