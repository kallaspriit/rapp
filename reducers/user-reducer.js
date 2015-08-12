import * as constants from '../constants/actions';

const initialState = {
	loading: false,
	error: null,
	info: {
		id: null,
		name: 'n/a'
	},
	isLoggedIn: false
};

const actions = {
	[constants.FETCH_USER]: (state, action) => ({ loading: action.id, error: null }),
	[constants.FETCH_USER_DONE]: (state, action) => ({ info: action.user, loading: false, error: null }),
	[constants.FETCH_USER_FAIL]: (state, action) => ({ loading: false, error: action.error })
};

export default function user(state = initialState, action) {
	const reducer = actions[action.type];

	if (!reducer) {
		return state;
	}

	return { ...state, ...reducer(state, action) };
}