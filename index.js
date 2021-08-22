// imports
const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');

const { guildId, token } = process.env;

// Create Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Command Handler
const commandData = [];
fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	commandData.push(command.data);
});

// Event handler
fs.readdirSync('./events').filter(file => file.endsWith('.js')).forEach(file => {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
});

// Login and register commands
(async () => {
	try {
		await client.login(token);
		await client.application.commands.set(commandData, guildId);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();