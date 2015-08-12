import React from 'react';
import { Connector } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { routerStateReducer } from 'redux-react-router';
import { batchedUpdates } from 'redux-batched-updates';
import * as reducers from '../reducers';

// components
import MenuComponent from './components/MenuComponent';

// redux dev tools support https://github.com/gaearon/redux-devtools
let DebugPanel, DevTools, LogMonitor;
let debugPanel = null;

// setup the combined reducer and store, also export them
export const reducer = combineReducers({
	router: routerStateReducer,
	...reducers
});

export let store = null;
// export const store = batchedUpdates(createStore)(reducer);

// only setup dev tools in debug mode (defined by webpack config)
if (window.debug) {
	const { devTools, persistState } = require('redux-devtools');
	const { applyMiddleware, compose } = require('redux');
	const thunk = require('redux-thunk');
	const ReduxReactTools = require('redux-devtools/lib/react');

	DevTools = ReduxReactTools.DevTools;
	DebugPanel = ReduxReactTools.DebugPanel;
	// LogMonitor = ReduxReactTools.LogMonitor;
	LogMonitor = require('redux-slider-monitor');

	store = batchedUpdates(compose(
		applyMiddleware(thunk),
		devTools(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
		createStore
	))(reducer);

	// enable React dev-tools
	window.React = React;
} else {
	store = batchedUpdates(createStore)(reducer);
}

// create debug panel in debug mode
if (window.debug) {
	debugPanel = (
		<DebugPanel
			bottom
			left
			right
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

	static propTypes = {
		children: React.PropTypes.object.isRequired
	};

	render() {
		return (
			<div>
				<Connector select={s => s}>{({ router }) => (
					<div>
						<h1>RAPP - The React Application Framework</h1>
						<MenuComponent/>
						{this.props.children}
						<p>Location: {JSON.stringify(router)}</p>
					</div>
				)}</Connector>
				{debugPanel}
			</div>
		);
	}

}