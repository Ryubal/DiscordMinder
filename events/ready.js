const remindersCheckers = require('../common/remindersChecker')
const {checkInterval} = require('../config.json')
const i18n = require('i18n')

module.exports = {
	name: 'ready',
	once: true,
	execute() {
		console.log(i18n.__('e.ready'))

		// Start monitoring reminders
		setInterval(remindersCheckers, checkInterval * 1000)
	}
}