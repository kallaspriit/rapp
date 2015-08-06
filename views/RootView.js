import React from 'react';
import { RouteHandler } from 'react-router';

// https://www.youtube.com/watch?v=xsSnOQynTHs
// http://gaearon.github.io/redux/index.html
// https://github.com/gaearon/redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import MenuComponent from './components/MenuComponent';

// TODO load all in directory, how?
//import * as reducers from '../reducers';
import counter from '../reducers/counter-reducer';

const reducer = combineReducers({ counter });
const store = createStore(reducer);

export default React.createClass({
	render() {
		return (
			<div>
				<h1>RAPP</h1>
				<MenuComponent/>
				<Provider store={store}>
					{() => <RouteHandler {...this.props}/>}
				</Provider>
			</div>
		);
	}

});