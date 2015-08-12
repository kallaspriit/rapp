import api from '../services/api';
import * as actions from '../constants/actions';

export function fetchUser(id) {

	return dispatch => {
		dispatch({
			type: actions.FETCHING_USER,
			id: id
		});

		api.fetchUser(id)
			.then(user => dispatch({
				type: actions.FETCHED_USER,
				user: user
			}));
	};

}