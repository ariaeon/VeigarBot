module.exports = async function createUser(msg, db) {
	console.log('Create User called');
	const col = db.collection('users');
	const userDocument = {
		'id' : msg.author.id,
		'name': msg.author.username,
		'ap': 0,
		'joindate': Date.now(),
	};
	// Insert a single document, wait for promise
	await col.insertOne(userDocument);
	console.log(`User added to db: ${userDocument.name}`);

};
