// Import & create client, command & cooldown collection
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Load in commands & maps commands to the collection in client
const Commands = require('./commands');

Object.keys(Commands).map(key => {
	client.commands.set(Commands[key].name, Commands[key]);
});

// Executed on login
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Executed every message
client.on('message', message => {

	// If prefix && not bot, else return
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Split message into command & arguments[]
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// If command valid, load, else return
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	// If GuildOnly, return
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Check args
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe correct usage of \`${prefix}${commandName}\` is: \`\`\`${prefix}${command.name} ${command.usage}\`\`\``;
		}

		return message.channel.send(reply);
	}

	// Check cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	// Make variables
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Execute the command
	try {
		command.execute(message, args);
	}
	catch (e) {
		console.error(e);
		message.reply('oopsie poopsie we did a funky wunky!!');
	}
});

// Login
client.login(token);
