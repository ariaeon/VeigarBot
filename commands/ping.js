module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	// eslint-disable-next-line no-unused-vars
	execute(msg, args, db) {
		msg.reply('Pong!');
	},
};
