const {MessageEmbed} = require('discord.js')
const {prefix} = require('../../config.json')
const i18n = require('i18n')

module.exports = {
	name: i18n.__('c.help.name'),
	description: i18n.__('c.help.description'),
	execute(message, args) {
		const {commands} = message.client

		// If we have an argument, then the user might be trying to get help about that command..
		if(args.length > 0) {
			// If our current lang is NOT english, then we need to find the key of this command
			// in our translation file
			var commandNameDefault = args[0]
			var commandNameEn = args[0]
			if(i18n.getLocale() != 'en') {
				const catalog = i18n.getCatalog(i18n.getLocale())
				for(const [key, val] of Object.entries(catalog.c)) {
					if(val.name == commandNameDefault)
						commandNameEn = key
				}
			}
			
			// At this point, commandNameDefault has the default command sent by the user, and
			// commandNameEn has the key we need to look for in our translation file
			// Make sure the command exists
			if(!commands.has(commandNameDefault))
				return message.channel.send(i18n.__mf('c.help.error_missing_command', {command: commandNameDefault}))

			// Should help be shown?
			if(!commands.get(commandNameDefault).showInHelp) return

			// ... and return the help!
			const commandDescription = i18n.__(`c.${commandNameEn}.description`)
			const commandUsage = prefix + i18n.__(`c.${commandNameEn}.usage`)
			const commandHelpMsg = i18n.__mf(`c.${commandNameEn}.help_msg`, {prefix: prefix})

			const embed = new MessageEmbed()
				.setColor('#3076ff')
				.setTitle(commandNameDefault)
				.addField('Description', commandDescription)
				.addField('Usage', commandUsage)
				.addField('More', commandHelpMsg)

			return message.channel.send(embed)
		}

		// At this point, return help for all commands
		const embed = new MessageEmbed()
			.setColor('#3076ff')
			.setTitle(i18n.__('c.help.help'))

		commands.forEach(command => {
			if(!command.showInHelp) return

			embed.addField(`${prefix}${command.usage}`, command.description)
		})

		embed.addField('\u200b', i18n.__mf('c.help.specific_help_msg', {prefix: prefix}))

		message.channel.send(embed)
	}
}