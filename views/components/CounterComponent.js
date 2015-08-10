import React, { PropTypes } from 'react';

export default class Counter extends React.Component {

	static propTypes = {
		counter: PropTypes.number.isRequired,
		decrement: PropTypes.func.isRequired,
		increment: PropTypes.func.isRequired
	};

	render() {
		const { increment, decrement, counter } = this.props;
		return (
			<p>
				Clicked: {counter} times
				{' '}
				<button onClick={increment}>+</button>
				{' '}
				<button onClick={decrement}>-</button>
			</p>
		);
	}

}