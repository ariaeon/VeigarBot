const Functions = require('../functions');
module.exports = {
	name: 'Phenomenal Evil',
	description: 'Shows the stacks of the user',
	cooldown: 5,
	aliases: ['ap'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.CheckUserExists(msg, db);
		if (!user) {
			await Functions.CreateUser(msg, db);
		}

		msg.reply(`You have ${user.ap} stacks of Phenomenal Evil!`) ;


	},
};
