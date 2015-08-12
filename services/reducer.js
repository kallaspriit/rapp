export default function reducer(initialState, actions) {

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
		const reducer = actions[action.type];

		if (!reducer) {
			return state;
		}

		if (typeof state === 'object' && state !== null) {
			return { ...state, ...reducer(state, action) };
		}

		return reducer(state, action);
	};

}