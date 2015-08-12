import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/actions';

export function increment() {
	console.log('increment');

	return {
		type: INCREMENT_COUNTER
	};
}

export function decrement() {
	return {
		type: DECREMENT_COUNTER
	};
}