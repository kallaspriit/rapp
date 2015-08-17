import constants from '../constants/actions';
import reducer from '../services/reducer';

export default reducer(
	{
		info: {
			id: null,
			name: 'n/a'
		}
	},
	{
		[constants.FETCH_USER]: (state, action) => ({ info: action.payload })
	}
);