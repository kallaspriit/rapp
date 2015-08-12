import React from 'react';
import { Link } from 'react-router';

export default class MenuComponent extends React.Component {

	render() {
		return (
			<ul>
				<li><Link to="/index">Index</Link></li>
				<li><Link to="/about">About</Link></li>
				<li><Link to="/counter">Redux counter example</Link></li>
				<li><Link to="/user/1">User #1</Link> | <Link to="/user/2">User #2</Link></li>
				<li><Link to="/translator">Translator test</Link></li>
				<li><a href="/xxx">Invalid link</a></li>
			</ul>
		);
	}

}