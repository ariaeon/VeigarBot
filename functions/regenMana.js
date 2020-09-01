const { maxMana } = require('../config.json');
module.exports = async function regenMana(db) {
	console.log('regen mana called');
	const col = db.collection('users');

	// TODO Learn MongoDB, check if this can be done in 1 call
	let filter = { mana: { $lt: maxMana } };
	let updateDoc = {
		$inc: {
			mana: 2,
		},
	};

	let res = await col.updateMany(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);

	filter = { mana: { $gt: maxMana } };
	updateDoc = {
		$set: {
			mana: maxMana,
		},
	};

	res = await col.updateMany(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);
};
