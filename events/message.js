const i18n = require('i18n')
const {prefix} = require('../config.json')

module.exports = {
	name: 'message',
	execute(message, client) {
		// Avoid replying to non-command or bot messages
		if(!message.content.startsWith(prefix) || message.author.bot) return

		// Get command and arguments
		const args = message.content.slice(prefix.length).trim().split(' ')
		const commandName = args.shift().toLowerCase()

		// If message doesn't match a command, end here
		if(!client.commands.has(commandName)) return

		// Get the actual command
		const command = client.commands.get(commandName)

		// Try to execute command
		try {
			command.execute(message, args)
		}catch(error) {
			console.log(error)
			message.reply(i18n.__('e.message.error_command'))
		}
	}
}