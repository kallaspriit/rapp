import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter-actions';

import CounterComponent from './components/CounterComponent';

@connect(state => ({
	counter: state.counter
}))
export default class CounterView {

	render() {
		const { counter, dispatch } = this.props;

		return (
			<div>
				<CounterComponent
					counter={counter}
               		{...bindActionCreators(CounterActions, dispatch)}
				/>
			</div>
		);
	}

};