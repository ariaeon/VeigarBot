module.exports = async function CheckUserExists(msg, db) {
	const col = db.collection('users');

	await col.findOne({ id:msg.author.id })
		.then(function(myDoc) {
			if(myDoc === null) console.log('mydoc is null');

			if(myDoc === null) return false;
			return true;
		});
};