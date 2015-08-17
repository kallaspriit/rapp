/*
// start
const actionStart = {
	type: actions.FETCH_USER,
	error: null,
	loading: true,
	payload: {
		id: 1
	}
};

// success
const actionSuccess = {
	type: actions.FETCH_USER,
	error: null,
	loading: false,
	payload: {
		id: 1,
		name: 'Jack Sparrow'
	}
};

// error
const actionError = {
	type: actions.FETCH_USER,
	error: new Error('Loading user failed'),
	loading: false,
	payload: {
		id: 1
	}
};
*/

export function start(type, payload) {
	return {
		type: type,
		error: null,
		loading: true,
		payload: payload || {}
	};
}

export function success(type, payload) {
	return {
		type: type,
		error: null,
		loading: false,
		payload: payload || {}
	};
}

export function error(type, error, payload) {
	return {
		type: type,
		error: typeof error === 'string' ? new Error(error) : error,
		loading: false,
		payload: payload || {}
	};
}