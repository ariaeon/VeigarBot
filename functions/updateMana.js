const { maxMana } = require('../config.json');
module.exports = async function updateMana(user, db, manacost) {
	console.log('update mana called');
	const col = db.collection('users');

	const currentmana = user.mana === undefined ? maxMana : user.mana;
	const newmana = currentmana + manacost;

	if(newmana < 0) {return false;}

	const filter = { id: user.id };
	const updateDoc = {
		$inc: {
			mana: manacost,
		},
	};

	const res = await col.updateOne(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);
	return newmana;
};
