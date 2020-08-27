const Discord = require('discord.js');
const Functions = require('../functions');

module.exports = {
	name: 'BalefulStrike',
	description: 'qqqqqqqq',
	cooldown: 5,
	aliases: ['q'],
	args: true,
	mention: true,
	usage: '<@mention>',
	// eslint-disable-next-line
	async execute(msg, args,db) {
		const col = db.collection('users');

		const user = await Functions.CheckUserExists(msg, db);
		if (!user) {
			await Functions.CreateUser(msg, db);
		}

		// create a filter
		const filter = { id: msg.author.id };

		// create a document that increases the ap
		const updateDoc = {
			$set: {
				ap: ++user.ap,
			},
		};

		const res = await col.updateOne(filter, updateDoc);

		console.log(
			`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
		);
		// TODO	randomise messages
		// TODO format
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Baleful Strike')
			.setDescription(`${msg.author.username} hits ${msg.mentions.users.first()} for ${(240 + user.ap * 0.6).toFixed(0)} (60% AP) damage`)
			.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/f/fd/Baleful_Strike.png')
			.setFooter(`You have ${user.ap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

		msg.channel.send(exampleEmbed);

	},
};
