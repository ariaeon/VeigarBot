const { maxMana } = require('../config.json');
module.exports = async function updateMana(user, col, manacost) {
	console.log('update mana called');
	// reset can cleaner;
	const currentmana = user.mana === undefined ? maxMana : user.mana;
	const newmana = currentmana - manacost;

	console.log('current mana: ' + currentmana);
	console.log('newmana: ' + newmana);

	if(newmana < 0) {return false;}

	const filter = { id: user.id };
	const updateDoc = {
		$set: {
			mana: newmana,
		},
	};

	const res = await col.updateOne(filter, updateDoc);

	console.log(
		`${res.matchedCount} document(s) matched the filter, updated ${res.modifiedCount} document(s)`,
	);
	return newmana;
};
