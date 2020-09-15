const Functions = require('../functions');
const { skin } = require('../config.json');
module.exports = {
	name: 'setskin',
	description: 'Set a skin for your profile',
	cooldown: 0,
	args : true,
	usage: '[skinname]',
	aliases: ['ss'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.getUser(msg, db);
		if (!user) {
			await Functions.createUser(msg, db);
		}

		const skinName = args.join('').toLowerCase();
		const newskin = skin.filter(s => s.name == skinName);
		if(!newskin.length) return msg.channel.send('That is not a valid skin!');

		await Functions.updateSkin(user, db, newskin[0].name);

		msg.channel.send('Skin updated! Use `!profile` to check it out!');

	},
};
