module.exports = async function updateAP(user, db, ap) {
	console.log('update ap called');
	const col = db.collection('users');

	const filter = { id: user.id };
	// create a document that increases the ap
	const updateDoc = {
		$set: {
			ap: user.ap + ap,
		},
	};

	const res = await col.updateOne(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);
};
