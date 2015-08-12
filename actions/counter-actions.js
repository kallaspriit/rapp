import constants from '../constants/actions';

export function increment() {
	return {
		type: constants.INCREMENT_COUNTER
	};
}

export function decrement() {
	return {
		type: constants.DECREMENT_COUNTER
	};
}