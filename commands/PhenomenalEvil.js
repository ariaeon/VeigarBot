module.exports = {
	name: 'Phenomenal Evil',
	description: 'Shows the stacks of the user',
	cooldown: 5,
	aliases: ['ap'],
	// eslint-disable-next-line
	execute(msg, args,db) {
		const col = db.collection('users');

		// check if user exists, if not, create


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
				msg.reply(`You have ${myDoc.ap} stacks of Phenomenal Evil!`) ;
			})
			.catch(function(err) {
				console.log(err);
			});

	},
};
