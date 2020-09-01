const Functions = require('../functions');
const { maxMana } = require('../config.json');

module.exports = {
	name: 'resetMana',
	description: 'Gain full mana',
	cooldown: 5,
	aliases: ['rm'],
	// eslint-disable-next-line no-unused-vars
	async execute(msg, args, db) {
		const col = db.collection('users');
		let user = await Functions.getUser(msg, db);
		if (!user) {
			user = await Functions.createUser(msg, db);
		}

		const filter = { id: user.id };
		const updateDoc = {
			$set: {
				mana: maxMana,
			},
		};

		const res = await col.updateOne(filter, updateDoc);

		console.log(
			`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
		);

		return msg.channel.send(`You now have ${maxMana} mana!`);


	},
};
