import api from '../services/api';
import * as actions from '../constants/actions';
import { start, success, error } from '../services/actions';

let apix = {

	fetchUser(dispatch, info) {
		dispatch(start(actions.FETCH_USER, info));

		api.fetchUser(info)
			.then(response =>
				dispatch(success(actions.FETCH_USER, { ...info, ...response }))
			)
			.catch(message =>
				dispatch(error(actions.FETCH_USER, message, info))
			)
			.done();
	}

};

export function fetchUser(id) {
	return dispatch => apix.fetchUser(dispatch, { id });
}