import React from 'react';
import { Link } from 'react-router';

export default class MenuComponent extends React.Component {

	render() {
		return (
			<ul>
				<li><Link to="index">Index</Link></li>
				<li><Link to="about">About</Link></li>
				<li><Link to="counter">Redux counter example</Link></li>
				<li><a href="/xxx">Invalid link</a></li>
			</ul>
		);
	}

}