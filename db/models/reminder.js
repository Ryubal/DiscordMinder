const db = require('../../db/db')

// Model
const Reminder = function(reminder) {
	this.authorId = reminder.authorId
	this.authorUsername = reminder.authorUsername
	this.reminder = reminder.reminder
	this.created_at = reminder.created_at
	this.remind_at = reminder.remind_at
}

// Methods
Reminder.create = (newReminder, result) => {
	db.run("INSERT INTO reminders(authorId, authorUsername, reminder, created_at, remind_at) VALUES(?, ?, ?, ?, ?)", [
		newReminder.authorId,
		newReminder.authorUsername,
		newReminder.reminder,
		newReminder.created_at,
		newReminder.remind_at
	], function(err) {
		if(err)
			result(err, null)
		else
			result(null, { id: this.lastID, ...newReminder })
	})
}

Reminder.getAllExpired = result => {
	db.all("SELECT * FROM reminders WHERE remind_at < DATETIME()", function (err, rows) {
		if(err)
			result(err, null)
		else
			result(null, rows)
	})
}

Reminder.deleteRow = (id, result) => {
	db.run(`DELETE FROM reminders WHERE id = ${id}`, result)
}

module.exports = Reminder