export default function log(...args) {

	console.log.apply(console, args); /* eslint no-console:0 */

}