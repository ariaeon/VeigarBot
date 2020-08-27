const Discord = require('discord.js');
const Functions = require('../functions');

module.exports = {
	name: 'BalefulStrike',
	description: 'qqqqqqqq',
	cooldown: 6,
	aliases: ['q'],
	usage: '<@mention>',
	// eslint-disable-next-line
	async execute(msg, args,db) {
		const col = db.collection('users');
		let user = await Functions.getUser(msg, db);
		if (!user) {
			user = await Functions.createUser(msg, db);
		}

		let target = 'nothing';
		let incrementap = 0;
		let kill = false;
		let miss = false;
		let dmgBool = false;
		let action = 'hits';
		const ratio = 0.08;
		let killchance = 10 + user.ap * ratio;
		if((10 + user.ap * ratio) > 90) { killchance = 90;}
		const misschance = 10;

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

		if(msg.mentions.users.first()) {
			calculateHit();
		}

		// create a filter
		const filter = { id: msg.author.id };
		// create a document that increases the ap
		const updateDoc = {
			$set: {
				ap: user.ap + incrementap,
			},
		};

		const res = await col.updateOne(filter, updateDoc);

		console.log(
			`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
		);
		// TODO	randomise messages
		// TODO more efficient?
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor(dmgBool ? kill ? '#FF0000' : '#0099ff' : '#000000')
			.setTitle('Baleful Strike')
			.setDescription(`${msg.author.username} ${action} ${target} ${dmgBool ? `${kill ? 'with' : 'for'} **${(240 + (user.ap) * 0.6).toFixed(0)} (60% AP)** damage` : '' } and gains ${incrementap} AP ${kill ? '(5 + 2)' : ''}`)
			.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/f/fd/Baleful_Strike.png')
			.setFooter(`You have ${user.ap + incrementap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

		msg.channel.send(exampleEmbed);

	},
};
