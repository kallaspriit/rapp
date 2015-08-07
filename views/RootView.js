import React from 'react';
import { RouteHandler } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from '../build/gen/reducers';

import MenuComponent from './components/MenuComponent';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

// REDUX
// https://www.youtube.com/watch?v=xsSnOQynTHs
// http://gaearon.github.io/redux/index.html
// https://github.com/gaearon/redux
export default React.createClass({
	render() {
		return (
			<div>
				<h1>RAPP - The React Application Framework</h1>
				<MenuComponent/>
				<Provider store={store}>
					{() => <RouteHandler {...this.props}/>}
				</Provider>
			</div>
		);
	}

});