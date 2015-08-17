import constants from '../constants/actions';
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
	},
	{
		[constants.FETCH_USER]: (state, action) => ({ info: action.payload })
	}
);