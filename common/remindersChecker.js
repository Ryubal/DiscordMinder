const client = require('../client')
const Reminder = require('../db/models/reminder')
const {MessageEmbed} = require('discord.js')
const i18n = require('i18n')

const checker = () => {
	console.log(i18n.__mf('reminderChecker.checking'))

	// Get all reminders that are expired (meaning we should remind now)
	Reminder.getAllExpired(function(err, rows) {
		if(err) {
			console.log(i18n.__mf('reminderChecker.error_getting'))
			console.log(err)
			return
		}

		// Now, for each reminder we got...
		rows.forEach(reminder => {
			// Get the corresponding user, by author ID (in order to be able to DM him)
			client.users.fetch(reminder.authorId).then(user => {
				console.log(i18n.__mf('reminderChecker.reminding', { author: reminder.authorUsername}))

				const prettyDate = new Date(reminder.created_at).toLocaleString()

				// Send reminder!
				const embed = new MessageEmbed()
					.setColor('#FF0000')
					.setTitle(reminder.reminder)
					.addField('\u200b', i18n.__mf('reminderChecker.created_on', { date: prettyDate }))

				user.send(embed).catch(() => {
					console.log(i18n.__mf('reminderChecker.error_reminding'))
				})

				// Delete message!
				Reminder.deleteRow(reminder.id, err2 => {
					if(err2)
						console.log(i18n.__mf('reminderChecker.error_removing'))
				})

			}).catch(error => {
				console.log(i18n.__mf('reminderChecker.error_finding_user'))

				// Delete message!
				Reminder.deleteRow(reminder.id, err2 => {
					if(err2)
					console.log(i18n.__mf('reminderChecker.error_removing'))
				})
			})
		})
	})
}

module.exports = checker