const Discord = require('discord.js');
const Functions = require('../functions');
const { skin, maxMana } = require('../config.json');

module.exports = {
	name: 'PrimordialBurst',
	description: 'BOOM',
	cooldown: 0,
	aliases: ['r'],
	usage: '<@user>',
	mana: -200,
	// eslint-disable-next-line
	async execute(msg, args,db) {
		// get user or create
		const col = db.collection('users');
		let user = await Functions.getUser(msg, db);
		if (!user) {
			user = await Functions.createUser(msg, db);
		}

		// check for mention
		if(!msg.mentions.users.first()) {
			return msg.channel.send('You have to target a user! \n`!r @user`');
		}

		// check if enough mana
		const mana = await Functions.updateMana(user, col, this.mana);
		if (!mana) {
			return msg.channel.send('You do not have enough mana!');
		}

		// vars
		const target = msg.mentions.users.first();
		let incrementap = 0;
		let kill = false;
		let action = 'hits';
		const ratio = 0.08;
		let killchance = 50 + user.ap * ratio;
		if((killchance) > 99) { killchance = 99;}
		const apratio = (Math.random() * (1.5 - 0.75) + 0.75).toFixed(2);

		function calculateHit() {
			if((Math.random() * 100) < killchance) kill = true;
			kill ? incrementap = 7 : incrementap = 1;
			kill ? action = 'kills' : action = 'hits';
		}

		calculateHit();

		// increase ap if hit
		if(incrementap != 0) Functions.updateAP(user, col, incrementap);

		// TODO	randomise messages
		// TODO more efficient?

		// output
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor(kill ? '#FF0000' : '#0099ff')
			.setTitle('Primordial Burst')
			.setAuthor(msg.author.username, skin.filter(s => s.name === user.skin)[0].url)
			.setDescription(`${msg.author.username} ${action} ${target} ${kill ? 'with' : 'for'} **${(325 + (user.ap) * apratio).toFixed(0)} (${(apratio * 100).toFixed(0)}% AP*)** damage and gains ${incrementap} AP ${kill ? '(5 + 2)' : ''}`)
			.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e7/Primordial_Burst.png')
			.addFields(
				{ name: '<:PE:750663057767661600> **Phenomenal Evil**', value: `${user.ap + incrementap} **(+${incrementap})**`, inline: true },
				{ name: '<:mana:750663678432641124> **Mana**', value: `${mana}/${maxMana} **(${this.mana})**`, inline: true },
			)
			.setFooter('*(75%-150% AP)', '');

		msg.channel.send(exampleEmbed);
	},
};
