const Functions = require('../functions');

module.exports = {
	name: 'resetMana',
	description: 'Gain full mana',
	cooldown: 5,
	mana: 480,
	reset: true,
	aliases: ['rm'],
	// eslint-disable-next-line no-unused-vars
	async execute(msg, args, db) {
		const col = db.collection('users');
		let user = await Functions.getUser(msg, db);
		if (!user) {
			user = await Functions.createUser(msg, db);
		}

		const mana = await Functions.updateMana(user, col, this.mana, this.reset);
		if (!mana) {
			return msg.channel.send('You do not have enough mana!');
		}
		return msg.channel.send(`newmana: ${mana}`);


	},
};
