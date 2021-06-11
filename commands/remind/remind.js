const {prefix} = require('../../config.json')
const i18n = require('i18n')
const Reminder = require('../../db/models/reminder')

const isInt = (n) => { return /^\d+$/.test(n) }

const units = {
	singular: [
		i18n.__('c.remind.units.singular.second'),
		i18n.__('c.remind.units.singular.minute'),
		i18n.__('c.remind.units.singular.hour'),
		i18n.__('c.remind.units.singular.day'),
		i18n.__('c.remind.units.singular.week')
	],
	plural: [
		i18n.__('c.remind.units.plural.seconds'),
		i18n.__('c.remind.units.plural.minutes'),
		i18n.__('c.remind.units.plural.hours'),
		i18n.__('c.remind.units.plural.days'),
		i18n.__('c.remind.units.plural.weeks')
	]
}

module.exports = {
	name: i18n.__('c.remind.name'),
	description: i18n.__('c.remind.description'),
	usage: i18n.__('c.remind.usage'),
	showInHelp: true,
	execute(message, args) {
		// !remind in [AMOUNT] [UNIT] [REMINDER]

		// Make sure we got arguments
		if(!args.length)
			return message.channel.send(i18n.__mf('c.remind.error_no_args', { author: message.author,prefix: prefix }))

		// Make sure we've got enough arguments
		if(args.length < 4)
			return message.channel.send(i18n.__mf('c.remind.error_missing_args', { author: message.author,prefix: prefix }))

		// Now validate each one.. First arg has to be 'in'
		if(!args[0] || args[0].toLowerCase() != i18n.__('c.remind.in'))
			return message.channel.send(i18n.__mf('c.remind.error_wrong_in', { author: message.author,prefix: prefix }))

		// Second arg is amount... It has to be a valid integer
		const amount = parseInt(args[1])
		if(!isInt(amount))
			return message.channel.send(i18n.__mf('c.remind.error_wrong_amount', { author: message.author,prefix: prefix }))

		// Third arg is unit (seconds, minutes, hours, days, weeks, months, years), make
		// sure it's valid
		if(!args[2] || (!units.singular.includes(args[2].toLowerCase()) && !units.plural.includes(args[2].toLowerCase()))) {
			return message.channel.send(i18n.__mf('c.remind.error_wrong_unit', {
				author: message.author,
				prefix: prefix,
				units: units.plural.join('`, `')
			}))
		}

		const unit = args[2].toLowerCase()

		// Make sure we've got the reminder content
		if(args[3] == '')
			return message.channel.send(i18n.__mf('c.remind.error_wrong_reminder'))

		// Save content.. Joining from index 0 to the end
		const reminder = args.slice(3, args.length).join(' ')

		// Get current date, and calculate future (remind) date
		const currentDate = new Date()
		const futureDate = new Date()

		// Seconds, minutes, hours, days, weeks
		if(unit == units.singular[0] || unit == units.plural[0])
			futureDate.setSeconds(futureDate.getSeconds() + amount)
		else if(unit == units.singular[1] || unit == units.plural[1])
			futureDate.setMinutes(futureDate.getMinutes() + amount)
		else if(unit == units.singular[2] || unit == units.plural[2])
			futureDate.setHours(futureDate.getHours() + amount)
		else if(unit == units.singular[3] || unit == units.plural[3])
			futureDate.setDate(futureDate.getDate() + amount)
		else if(unit == units.singular[4] || unit == units.plural[4])
			futureDate.setDate(futureDate.getDate() + (amount*7))

		const currentDateFormatted = currentDate.toISOString().slice(0, 19).replace('T', ' ')
		const futureDateFormatted = futureDate.toISOString().slice(0, 19).replace('T', ' ')

		// After calculating future date, we're ready to insert the reminder
		const newReminder = new Reminder({
			authorId: message.author.id,
			authorUsername: message.author.username,
			reminder: reminder,
			created_at: currentDateFormatted,
			remind_at: futureDateFormatted
		})
		
		// Insert reminder in the BD and we're done
		Reminder.create(newReminder, (error, insertedReminder) => {
			if(error)
				return message.channel.send(i18n.__mf('c.remind.error_creating'))
			return message.channel.send(i18n.__mf('c.remind.success_created', { author: message.author }))
		})
	}
}