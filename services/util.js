export function keyMirror(obj) {
	const ret = {};

	if (!(obj instanceof Object && !Array.isArray(obj))) {
		throw new Error('keyMirror(...): Argument must be an object.');
	}

	for (let key of Object.keys(obj)) {
		ret[key] = key;
	}

	return ret;
}