const Discord = require('discord.js');
const Functions = require('../functions');
const { skin } = require('../config.json');
module.exports = {
	name: 'Skinlist',
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
			.setDescription(skin.map(s => `•   ${s.name}`));

		// .setFooter(`You have ${user.ap + incrementap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

		msg.channel.send(exampleEmbed);


	},
};
