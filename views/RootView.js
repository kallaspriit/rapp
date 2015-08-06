import React from 'react';
import {RouteHandler} from 'react-router';

import MenuComponent from './components/MenuComponent';

export default React.createClass({

	render() {
		return (
			<div>
				<h1>RAPP</h1>
				<MenuComponent/>
				<RouteHandler/>
			</div>
		);
	}

});