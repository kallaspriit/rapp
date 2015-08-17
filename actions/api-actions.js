import api from '../services/api';
import log from '../services/log';
import * as actions from '../constants/actions';
import { start, success, error } from '../services/actions';
import { convertMixedCaseToConstant } from '../services/util';

let dispatchableApi = {},
	apiActions = {};

// creates a special dispatchable version of the API as well as action methods
for (let method in api) {
	if (!api.hasOwnProperty(method) || typeof api[method] !== 'function') {
		continue;
	}

	let actionName = convertMixedCaseToConstant(method);

	if (typeof actions[actionName] !== 'string') {
		log.warn('Action constant "' + actionName + '" not found in constants/actions.js, skipping');

		continue;
	}

	dispatchableApi[method] = (dispatch, info) => {
		dispatch(start(actions[actionName], info));

		api.fetchUser(info)
			.then(response =>
				dispatch(success(actions[actionName], { ...info, ...response }))
			)
			.catch(message =>
				dispatch(error(actions[actionName], message, info))
			)
			.done();
	};

	apiActions[method] = (info) => (dispatch) => dispatchableApi[method](dispatch, info);

	log('generated api action "' + method + '"');
}

export default apiActions;