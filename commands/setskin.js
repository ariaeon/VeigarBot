const Functions = require('../functions');
const { skin } = require('../config.json');
module.exports = {
	name: 'Set Skin',
	description: 'Set a skin for your profile',
	cooldown: 0,
	args : true,
	aliases: ['ss'],
	// eslint-disable-next-line
	async execute(msg, args,db) {

		const user = await Functions.getUser(msg, db);
		if (!user) {
			await Functions.createUser(msg, db);
		}

		const skinName = args.join('').toLowerCase();
		console.log(args);
		console.log(skinName);
		if(!skin[skinName]) return msg.channel.send('That is not a valid skin!');

		const newskin = skin[skinName];
		console.log(`newskin: ${newskin}`);

		await Functions.updateSkin(user, db, skinName);

		msg.channel.send('Skin updated! Use `!profile` to check it out!');

	},
};
