const Discord = require('discord.js');
const Functions = require('../functions');
const { maxMana } = require('../config.json');
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
			// .setDescription(`${msg.author.username} ${action} ${target} ${dmgBool ? `${kill ? 'with' : 'for'} **${(240 + (user.ap) * 0.6).toFixed(0)} (60% AP)** damage` : '' } and gains ${incrementap} AP ${kill ? '(5 + 2)' : ''}`)
			.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/3/37/Veigar_OriginalSquare.png')
			.addFields(
				{ name: '<:PE:750663057767661600> **Phenomenal Evil**', value: `${user.ap}`, inline: true },
				{ name: '<:mana:750663678432641124> **Mana**', value: `${user.mana}/${maxMana}`, inline: true },
			);
			// .setFooter(`You have ${user.ap + incrementap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

		msg.channel.send(exampleEmbed);


	},
};
