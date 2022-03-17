const GeneralHelper = module.exports;

/**
 * Reduce array to object
 * @param {String} key
 * @param {Array} items
 * @returns {{}}
 */
GeneralHelper.reduceArrayToObject = (key, items) => {
	let reducedObject = {};
	if (key && items && items.length > 0) {
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item[key]) {
				reducedObject[item[key]] = item;
			}
		}
	}
	return reducedObject;
};

/**
 * Test whether email address is valid
 * @param {String} email
 * @returns {Boolean}
 */
GeneralHelper.isValidEmail = (email) => {
	if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(email)) {
		return true;
	}
	return false;
},

/**
 * Extract list of email address from a string
 * @param {String} str
 * @returns {[]}
 */
GeneralHelper.extractTaggedEmails = (str) => {
	const emails = [];
	if (!str || str.length === 0) return emails;
	//Split string by whitespace
	const words = str.split(' ');
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		//Look for '@' in 1st character of a word
		if (word && word.charAt(0) === '@') {
			const possibleEmail = word.substring(1);
			if (GeneralHelper.isValidEmail(possibleEmail)) {
				emails.push(possibleEmail);
			}
		}
	}
	return emails;
}
