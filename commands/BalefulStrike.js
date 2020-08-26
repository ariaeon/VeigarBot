const Discord = require('discord.js');

module.exports = {
	name: 'BalefulStrike',
	description: 'qqqqqqqq',
	cooldown: 5,
	aliases: ['q'],
	args: true,
	mention: true,
	usage: '<@mention>',
	// eslint-disable-next-line
	execute(msg, args,db) {
		const col = db.collection('users');

		// else check amount of stacks
		col.findOne({ id:msg.author.id })
			.then(async function(myDoc) {
				if(myDoc === null) {
					const userDocument = {
						'id' : msg.author.id,
						'name': msg.author.username,
						'ap': 0,
						'joindate': Date.now(),
					};


					// Insert a single document, wait for promise so we can read it back
					await col.insertOne(userDocument);
					// Find one document
					myDoc = await col.findOne({ id:msg.author.id });
					// Print to the console
					console.log(`User added to db: ${myDoc.name}`);
				}

				// create a filter
				const filter = { id: msg.author.id };

				// create a document that increases the ap
				const updateDoc = {
					$set: {
						ap: ++myDoc.ap,
					},
				};

				col.updateOne(filter, updateDoc)
					.then(function(res) {
						console.log(
							`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
						);
						// TODO	randomise messages
						// TODO format
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Baleful Strike')
							.setDescription(`${msg.author.username} hits ${msg.mentions.users.first()} for ${(240 + myDoc.ap * 0.6).toFixed(0)} (+ 60% AP) damage`)
							.setThumbnail('https://vignette.wikia.nocookie.net/leagueoflegends/images/f/fd/Baleful_Strike.png')
							.setFooter(`You have ${myDoc.ap} stacks of Phenomenal Evil!`, 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Phenomenal_Evil_Power.png');

						msg.channel.send(exampleEmbed);


						// msg.channel.send(`${msg.author.username} hits ${msg.mentions.users.first()} with ${myDoc.ap} AP`);
						// msg.reply(`You have ${myDoc.ap} stacks of Phenomenal Evil!`);
					})
					.catch(function(err) {
						console.log(err);
					});

			})
			.catch(function(err) {
				console.log(err);
			});

	},
};
