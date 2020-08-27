module.exports = async function getUser(msg, db) {
	console.log('Check users called');
	const col = db.collection('users');
	const myDoc = await col.findOne({ id: msg.author.id }) ;
	if (myDoc !== null) return myDoc;
	else return false;
};