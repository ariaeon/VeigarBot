module.exports = async function updateSkin(user, db, skin) {
	console.log('update skin called');
	const col = db.collection('users');
	const filter = { id: user.id };
	// create a document that increases the ap
	const updateDoc = {
		$set: {
			skin: skin,
		},
	};

	const res = await col.updateOne(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);
};
