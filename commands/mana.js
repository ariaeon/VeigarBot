const Functions = require('../functions');
module.exports = {
	name: 'Mana',
	description: 'Shows the mana of the user',
	cooldown: 5,
	aliases: ['m'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.getUser(msg, db);
		if (!user) {
			await Functions.createUser(msg, db);
		}

		msg.reply(`You have ${user.mana} mana!`) ;

	},
};
