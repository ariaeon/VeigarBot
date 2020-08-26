module.exports = function CreateUser(msg, db) {
	const col = db.collection('users');

	console.log('Create User called');

	const userDocument = {
		'id' : msg.author.id,
		'name': msg.author.username,
		'ap': 0,
		'joindate': Date.now(),
	};

	// Insert a single document, wait for promise
	col.insertOne(userDocument)
		.then(console.log(`User added to db: ${userDocument.name}`));

};