const Functions = require('../functions');
module.exports = {
	name: 'Phenomenal Evil',
	description: 'Shows the stacks of the user',
	cooldown: 5,
	aliases: ['ap'],
	// eslint-disable-next-line
	async execute(msg, args,db) {
		const col = db.collection('users');

		const userExists = await Functions.CheckUserExists(msg, db);
		if (!userExists) {
			// Functions.CreateUser(msg, db)
			console.log('Call Create user');
		}


		const myDoc = await col.findOne({ id:msg.author.id });
		console.log('test');
		msg.reply(`You have ${myDoc.ap} stacks of Phenomenal Evil!`) ;


	},
};
