import React from 'react';
import { RouteHandler } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from '../build/gen/reducers'; // TODO include files in directory?

// components
import MenuComponent from './components/MenuComponent';

// redux dev tools support https://github.com/gaearon/redux-devtools
let finalCreateStore;
let DebugPanel, DevTools, LogMonitor;
let debugPanel = null;

// only setup dev tools in debug mode (defined by webpack config)
if (window.debug) {
	const { devTools, persistState } = require('redux-devtools');
	const { applyMiddleware, compose } = require('redux');
	const thunk = require('redux-thunk');
	const ReduxReactTools = require('redux-devtools/lib/react');

	DevTools = ReduxReactTools.DevTools;
	DebugPanel = ReduxReactTools.DebugPanel;
	LogMonitor = ReduxReactTools.LogMonitor;

	finalCreateStore = compose(
		applyMiddleware(thunk),
		devTools(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
		createStore
	);

	// enable React dev-tools
	window.React = React;
} else {
	finalCreateStore = createStore;
}

// setup the combined reducer and store
const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

// create debug panel in debug mode
if (window.debug) {
	debugPanel = (
		<DebugPanel
			bottom
			right
			top
		>
			<DevTools
				monitor={LogMonitor}
				store={store}
			/>
		</DebugPanel>
	);
}

// Render the application using react-router and REDUX
// https://www.youtube.com/watch?v=xsSnOQynTHs
// http://gaearon.github.io/redux/index.html
// https://github.com/gaearon/redux
export default class RootView extends React.Component {

	render() {
		return (
			<div>
				<h1>RAPP - The React Application Framework</h1>
				<MenuComponent/>
				<Provider store={store}>
					{() => <RouteHandler {...this.props}/>}
				</Provider>
				{debugPanel}
			</div>
		);
	}

}