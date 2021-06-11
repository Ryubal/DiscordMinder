const i18n = require('i18n')

module.exports = {
	name: i18n.__('c.author.name'),
	description: i18n.__('c.author.description'),
	usage: i18n.__('c.author.usage'),
	showInHelp: true,
	execute(message, args) {
		message.channel.send(i18n.__('c.author.author_msg'))
		message.channel.send('http://github.com/ryubal')
	}
}