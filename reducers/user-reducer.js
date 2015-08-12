import * as constants from '../constants/actions';
import log from '../services/log';

const initialState = {
	loading: false,
	info: {
		id: null,
		name: 'n/a'
	},
	isLoggedIn: false
};

const actions = {
	[constants.FETCHING_USER]: (state, action) => ({ loading: action.id }),
	[constants.FETCHED_USER]: (state, action) => ({ info: action.user, loading: false })
};

export default function user(state = initialState, action) {
	const reducer = actions[action.type];

	if (!reducer) {
		return state;
	}

	const newState = reducer(state, action);

	log('reduced', action, newState, state);

	return { ...state, ...reducer(state, action) };
}