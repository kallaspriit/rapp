import * as constants from '../constants/actions';
import reducer from '../services/reducer';

export default reducer(
	{
		loading: false,
		error: null,
		info: {
			id: null,
			name: 'n/a'
		},
		isLoggedIn: false
	}, {
		[constants.FETCH_USER]: (state, action) => ({ loading: action.id, error: null }),
		[constants.FETCH_USER_DONE]: (state, action) => ({ info: action.user, loading: false, error: null }),
		[constants.FETCH_USER_FAIL]: (state, action) => ({ loading: false, error: action.error })
	}
);