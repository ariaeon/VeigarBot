const Functions = require('../functions');
module.exports = {
	name: 'Phenomenal Evil',
	description: 'Shows the stacks of the user',
	cooldown: 5,
	aliases: ['ap'],
	// eslint-disable-next-line
	execute(msg, args,db) {
		const col = db.collection('users');

		// check if user exists, if not, create
		// if(!Functions.CheckUserExists(msg, db)) {
		// 	Functions.CreateUser(msg, db);
		// }
		Functions.CheckUserExists(msg, db).then(myDoc => {
			if (myDoc) {
			// exists
				console.log('exists');
			}
			else {
			// doesnt exist
				console.log('doesnt exist');

				// Functions.CreateUser(msg, db);

			}
		});

		col.findOne({ id:msg.author.id })
			.then(function(myDoc) {
				msg.reply(`You have ${myDoc.ap} stacks of Phenomenal Evil!`) ;
			});


		// else check amount of stacks
		// col.findOne({ id:msg.author.id })
		// 	.then(async function(myDoc) {

		// 		if(myDoc === null) {
		// 			const userDocument = {
		// 				'id' : msg.author.id,
		// 				'name': msg.author.username,
		// 				'ap': 0,
		// 				'joindate': Date.now(),
		// 			};

		// 			// Insert a single document, wait for promise so we can read it back
		// 			await col.insertOne(userDocument);
		// 			// Find one document
		// 			myDoc = await col.findOne({ id:msg.author.id });
		// 			// Print to the console
		// 			console.log(`User added to db: ${myDoc.name}`);
		// 		}
		// 		msg.reply(`You have ${myDoc.ap} stacks of Phenomenal Evil!`) ;
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err);
		// 	});

	},
};
