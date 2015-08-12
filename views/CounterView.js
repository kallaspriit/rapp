import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CounterComponent from './components/CounterComponent';

@connect(state => ({
	counter: state.counter
}))
export default class CounterView extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		counter: PropTypes.number.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	handleTest() {
		this.props.actions.counter.increment();
	}

	render() {
		const { actions, counter, dispatch } = this.props;

		return (
			<div>
				<button onClick={this.handleTest}>Test</button>
				<CounterComponent
					counter={counter}
					{...bindActionCreators(actions.counter, dispatch)}
				/>
			</div>
		);
	}

}