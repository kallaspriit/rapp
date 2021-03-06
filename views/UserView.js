import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { transitionTo } from 'redux-react-router';
import listen from '../decorators/listen';

@connect(state => ({
	user: state.user
}))
@listen(['id'], (params, actions) => {
	actions.api.fetchUser({ id: Number.parseInt(params.id, 10) });
})
export default class UserView extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		actions: PropTypes.object.isRequired
	};

	/*
	static contextTypes = {
		router: PropTypes.object.isRequired
	};
	*/

	handleNavigateIndex = () => {
		this.props.dispatch(transitionTo('/index'));
	}

	handleLoad = () => {
		this.props.dispatch(this.props.actions.api.fetchUser({ id: 10 }));
	}

	render() {
		const { user } = this.props;

		if (user.loading) {
			return (
				<div>
					Loading user #{user.info.id}...
				</div>
			);
		} else if (user.error) {
			return (
				<div>
					ERROR: {user.error.message}
				</div>
			);
		}

		return (
			<div>
				<p>
					{user.info.name}
				</p>
				<p>
					<button onClick={this.handleNavigateIndex}>Go to index</button>
					<button onClick={this.handleLoad}>Load user #10</button>
				</p>
			</div>
		);
	}

}