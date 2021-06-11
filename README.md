# DiscordMinder
Discord bot that lets everyone set their own reminders

## Requirements
- NodeJS (developed with v12.17.0)
- Discord bot token (added to the channel of your liking)

## Getting started
1. Clone this repo `git clone https://github.com/Ryubal/DiscordMinder`
2. Rename the `config.txt` file to `config.json`
3. Open the `config.json` file with your preferred editor, and set your Discord Bot `token`
4. Install dependencies `npm install`
4. 🚀 Run! `node index.js`

## Usage
The functionality of this bot is pretty specific: it lets any user create a reminder, so it will be reminded in a future time. To set a reminder, all you need is a single command that you can send in a channel or through DM. When it's time to remind the user, it will be reminded through DM.

Below is a description of available commands.

`!remind in [AMOUNT] [UNIT] [REMINDER]`
> Sets a new reminder. All parameters are required.

> `[AMOUNT]` - In how many seconds/minutes/hours/etc you'd like to be reminded

> `[UNIT]` - Unit of amount. This can be `seconds`, `minutes`, `hours`, `days` or `weeks`

> `[REMINDER]` - The actual content of the reminder

> Examples: `!remind in 2 weeks Go buy new clothes`, `!remind in 1 hour Do my homework`, `!remind in 3 days Buy some coffee`

`!help [COMMAND]`
> If no **command** provided, will return a list of available commands

> If **command** is provided, will return information about that specific command

`!author`
> Will return author information (link to this repo)

## Configuring
All settings can be changed by editing the `config.json` file. As of now, only 4 settings can be changed:
- `prefix` - This must be present before a command, in order to be recognized by the bot.
- `defaultLang` - Default language for the bot. Options available: `en`, `es`. Chosen language has to exist in the `./locales` directory.
- `token` - Discord bot token
- `checkInterval` - Interval, in seconds, to be scanning saved reminders.

## Details
This project was created using NodeJS (with the Discord.js library). Reminders are saved locally with SQLite.

## Future plans
This bot is fully functional, though I'll be in the process of adding new features:
- !version command
- Ability to remove a reminder you saved
- Since you can save as many reminders as you'd like, we need a way to show a list of the reminders you've set.

## Contributing
Contributions are very welcome! Here's how:
1. [Fork this repo](https://github.com/ryubal/DiscordMinder/fork) 🍴
2. Clone your fork `git clone https://github.com/YOUR-USERNAME/discordminder.git`
3. Create your feature branch `git checkout -b MY-FEATURE-NAME`
4. Commit your changes `git commit -m 'MY FEATURE DESCRIPTION'
5. Push to the branch `git push origin MY-FEATURE-NAME`
6. Submit a pull request! 🔌
