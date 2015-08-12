import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchOnUpdate from '../decorators/fetchOnUpdate';

@connect(state => ({
	user: state.user
}))
@fetchOnUpdate(['id'], (params, actions) => {
	const { id } = params;

	actions.user.fetchUser(id);
})
export default class UserView extends React.Component {

	/*
	statics: {
		fetchData: function(params) {
			UserActions.fetchUser(params.id);
		}
	},
	*/

	static propTypes = {
		user: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	render() {
		const { user } = this.props;

		if (!user.info.id) {
			return (
				<div>
					Loading...
				</div>
			);
		}
		return (
			<div>
				USER {user.info.id} {user.info.name} {user.isLoggedIn ? 'logged in' : 'logged out'}
			</div>
		);
	}

}