import constants from '../constants/actions';
import reducer from '../services/reducer';

export default reducer(
	0,
	{
		[constants.INCREMENT_COUNTER]: (state/* , action */) => state + 1,
		[constants.DECREMENT_COUNTER]: (state/* , action */) => state - 1
	}
);