const Discord = require('discord.js');
const Functions = require('../functions');
const { skin, maxMana } = require('../config.json');


module.exports = {
	name: 'BalefulStrike',
	description: 'qqqqqqqq',
	cooldown: 6,
	aliases: ['q'],
	usage: '<@user>',
	mana: -60,
	// eslint-disable-next-line
	async execute(msg, args,db) {
		// get user or create
		let user = await Functions.getUser(msg, db);
		if (!user) {
			user = await Functions.createUser(msg, db);
		}

		// check mana
		const mana = await Functions.updateMana(user, db, this.mana);
		if (!mana) {
			return msg.channel.send('You do not have enough mana!');
		}

		// vars
		let target = 'nothing';
		let incrementap = 0;
		let kill = false;
		let miss = false;
		let dmgBool = false;
		let action = 'hits';
		const ratio = 0.08;
		let killchance = 5 + user.ap * ratio;
		if((killchance) > 90) { killchance = 90;}
		const misschance = 20;

		function calculateHit() {
			target = msg.mentions.users.first();
			if((Math.random() * 100) < misschance) miss = true;
			if(miss) return action = 'misses';

			// hit
			dmgBool = true;

			if((Math.random() * 100) < killchance) kill = true;
			kill ? incrementap = 7 : incrementap = 1;
			kill ? action = 'kills' : action = 'hits';

		}

		// if mention, calculate hit or not + dmg//
		if(msg.mentions.users.first()) {
			calculateHit();
		}

		// Update the users AP and mana
		// check if this has to be async
		if(incrementap != 0) Functions.updateAP(user, db, incrementap);

		// TODO	randomise messages
		// TODO more efficient?
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor(dmgBool ? kill ? '#FF0000' : '#0099ff' : '#000000')
			.setTitle('Baleful Strike')
			.setAuthor(msg.author.username, skin.filter(s => s.name === user.skin)[0].url)
			.setDescription(`${msg.author.username} ${action} ${target} ${dmgBool ? `${kill ? 'with' : 'for'} **${(240 + (user.ap) * 0.6).toFixed(0)} (60% AP)** damage` : '' } and gains ${incrementap} AP ${kill ? '(5 + 2)' : ''}`)
			.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/f/fd/Baleful_Strike.png')
			.addFields(
				{ name: '<:PE:750663057767661600> **Phenomenal Evil**', value: `${user.ap + incrementap} **(+${incrementap})**`, inline: true },
				{ name: '<:mana:750663678432641124> **Mana**', value: `${mana}/${maxMana} **(${this.mana})**`, inline: true },
			);
			// .setFooter(`You have ${user.ap + incrementap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

		msg.channel.send(exampleEmbed);

	},
};
