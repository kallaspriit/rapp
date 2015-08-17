/**
 * Extracts defaults response information such as loading state and error from the response.
 *
 * @param {function} extractor User state reducer
 * @returns {function}
 */
export function extract(extractor) {
	return (state, action) => {
		return ({
			loading: typeof action.loading === 'boolean' ? action.loading : false,
			error: action.error || null,
			...extractor(state, action)
		});
	};
}

/**
 * Helper for creating a reducer with initial state and map of actions.
 *
 * @param {*} initialState Initial state
 * @param {object} actions Map of actions to reducers
 * @returns {function}
 */
export default function reducer(initialState, actions) {

	// add some extra default inital state for objects
	if (typeof initialState === 'object' && initialState !== null) {
		initialState.loading = false;
		initialState.error = null;
	}

	// make sure the keys are valid
	for (let key in actions) {
		if (!actions.hasOwnProperty(key)) {
			continue;
		}

		if (typeof key !== 'string' || key === 'undefined') {
			throw new Error('Invalid action map key "' + key + '" provided, check your constants');
		}
	}

	// return the reducer function
	return (state = initialState, action) => {
		const actionFn = actions[action.type];

		if (!actionFn) {
			return state;
		}

		if (typeof state === 'object' && state !== null) {
			return { ...state, ...extract(actionFn)(state, action) };
		}

		return actionFn(state, action);
	};

}