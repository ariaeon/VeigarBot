const Discord = require('discord.js');
const Functions = require('../functions');
const { skin, maxMana } = require('../config.json');
module.exports = {
	name: 'Profile',
	description: 'Shows profile',
	cooldown: 0,
	aliases: ['p'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.getUser(msg, db);
		if (!user) {
			await Functions.createUser(msg, db);
		}

		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(msg.author.username)
			.setThumbnail(skin.filter(s => s.name === user.skin)[0].url)
			.addFields(
				{ name: '<:PE:750663057767661600> **Phenomenal Evil**', value: `${user.ap}`, inline: true },
				{ name: '<:mana:750663678432641124> **Mana**', value: `${user.mana}/${maxMana}`, inline: true },
			);

		msg.channel.send(exampleEmbed);


	},
};
