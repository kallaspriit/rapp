import api from '../services/api';
import * as actions from '../constants/actions';

export function fetchUser(id) {

	return dispatch => {
		dispatch({
			type: actions.FETCH_USER,
			id: id
		});

		api.fetchUser(id)
			.then(user =>
				dispatch({
					type: actions.FETCH_USER_DONE,
					user: user
				})
			)
			.catch(error =>
				dispatch({
					type: actions.FETCH_USER_FAIL,
					error: error
				})
			)
			.done();
	};

}