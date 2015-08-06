import React from 'react';
import userStore from '../stores/UserStore';

export default React.createClass({

	statics: {
		fetchData: function(params) {
			return userStore.loadUser(params.id);
		}
	},

	render() {
		if (this.props.loading) {
			return (
				<div>
					Loading...
				</div>
			);
		}

		return (
			<div>
				User #{this.props.params.id} ({this.props.data[0].name})
			</div>
		);
	}

});