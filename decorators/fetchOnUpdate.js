import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';

function mapParams(paramKeys, params) {
	return paramKeys.reduce((acc, key) => {
		// return Object.assign({}, acc, { [key]: params[key] });
		return { ...acc, [key]: params[key] };
	}, {});
}

function shallowEqualScalar(objA, objB) {
	if (objA === objB) {
		return true;
	}

	if (
		typeof objA !== 'object' || objA === null
		|| typeof objB !== 'object' || objB === null
	) {
		return false;
	}

	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Test for A's keys different from B.
	const hasOwn = Object.prototype.hasOwnProperty;

	for (let i = 0; i < keysA.length; i++) {
		if (!hasOwn.call(objB, keysA[i])) {
			return false;
		}

		const valA = objA[keysA[i]];
		const valB = objB[keysA[i]];

		if (valA !== valB || typeof valA === 'object' || typeof valB === 'object') {
			return false;
		}
	}

	return true;
}

export default function fetchOnUpdate(paramKeys, fn) {

	return DecoratedComponent =>
		class FetchOnUpdateDecorator extends React.Component {

			static propTypes = {
				actions: PropTypes.object.isRequired
			}

			componentWillMount() {
				for (let actionNamespace in this.props.actions) {
					if (!this.props.actions.hasOwnProperty(actionNamespace)) {
						continue;
					}

					this.props.actions[actionNamespace] = bindActionCreators(
						this.props.actions[actionNamespace],
						this.props.dispatch
					);
				}

				fn(mapParams(paramKeys, this.props.params), this.props.actions);
			}

			componentDidUpdate(prevProps) {
				const params = mapParams(paramKeys, this.props.params);
				const prevParams = mapParams(paramKeys, prevProps.params);

				if (!shallowEqualScalar(params, prevParams)) {
					fn(params, this.props.actions);
				}
			}

			render() {
				return (
					<DecoratedComponent {...this.props} />
				);
			}
		};
}