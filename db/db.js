const sqlite3 = require('sqlite3').verbose()
const i18n = require('i18n')

// Initialize DB, creating table if it doesn't exist
const db = new sqlite3.Database('./db/reminders.db', error => {
	if(error)
		return console.log(error.message)
	
	console.log(i18n.__mf('db.connected'))
})

db.run('CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY AUTOINCREMENT, authorId TEXT, authorUsername TEXT, reminder TEXT, created_at DATETIME, remind_at DATETIME)', error => {
	if(error) {
		console.log(i18n.__mf('db.error_creating'))
		console.log(error)
		return
	}

	console.log(i18n.__mf('db.success_created'))
})

module.exports = db