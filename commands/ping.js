module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	// eslint-disable-next-line no-unused-vars
	execute(msg, args) {
		// console.info(`Message is: ${msg}`);
		// console.info(`Args is: ${args}`);
		// console.log('test');

		msg.reply('pong');
		msg.channel.send('pong2');
	},
};
