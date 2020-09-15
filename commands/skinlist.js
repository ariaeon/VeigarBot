const Discord = require('discord.js');
const Functions = require('../functions');
const { skin } = require('../config.json');
module.exports = {
	name: 'skinlist',
	description: 'Shows list of skins',
	cooldown: 0,
	aliases: ['sl', 'skins'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.getUser(msg, db);
		if (!user) {
			await Functions.createUser(msg, db);
		}

		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Skin List')
			.setDescription('```' + skin.map(s => `* ${s.name}\n`).join('') + '```' + '\r\nUse `!ss [skinname]` or `!setskin [skinname]` to change skin');

		msg.channel.send(exampleEmbed);


	},
};
