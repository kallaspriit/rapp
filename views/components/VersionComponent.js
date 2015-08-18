import React from 'react';

export default class VersionComponent extends React.Component {

	static propTypes = {
		version: React.PropTypes.object.isRequired
	}

	render() {
		return (
			<div className="application-version">
				Version: {this.props.version.major}.{this.props.version.minor}.{this.props.version.patch}
			</div>
		);
	}

}