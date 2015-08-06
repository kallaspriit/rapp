import React from 'react';
import {Link} from 'react-router';

export default React.createClass({

	render() {
		return (
			<ul>
				<li><Link to="index">Index</Link></li>
				<li><Link to="about">About</Link></li>
				<li><Link to="user" params={{id: 1}}>User #1</Link></li>
				<li><Link to="user" params={{id: 2}}>User #2</Link></li>
				<li><Link to="counter">Redux counter example</Link></li>
				<li><a href="#/xxx">Invalid link</a></li>
			</ul>
		);
	}

});