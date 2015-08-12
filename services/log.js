export default function log(...args) {
	if (!window.debug) {
		return;
	}

	console.log.apply(console, args); /* eslint no-console:0 */
}

log.warn = (...args) => {
	if (!window.debug) {
		return;
	}

	console.warn.apply(console, args); /* eslint no-console:0 */
};

log.error = (...args) => {
	if (!window.debug) {
		return;
	}

	console.error.apply(console, args); /* eslint no-console:0 */
};