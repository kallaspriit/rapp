import React from 'react';
import { Connector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerStateReducer } from 'redux-react-router';
import { batchedUpdates } from 'redux-batched-updates';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

// components
import MenuComponent from './components/MenuComponent';

// setup the combined reducer and store, also export them
export const reducer = combineReducers({
	router: routerStateReducer,
	...reducers
});

// redux dev tools support https://github.com/gaearon/redux-devtools
let DebugPanel, DevTools, LogMonitor;
let debugPanel = null;
export let store = null;

// only setup dev tools in debug mode (defined by webpack config)
if (window.debug) {
	const { devTools, persistState } = require('redux-devtools');
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

	// enable react dev-tools
	window.React = React;
} else {
	store = batchedUpdates(compose(
		applyMiddleware(thunk),
		createStore
	))(reducer);
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
				<Connector select={s => s}>{(/* { router } */) => (
					<div>
						<h1>RAPP - The React Application Framework</h1>
						<MenuComponent/>
						{this.props.children}
					</div>
				)}</Connector>
				{debugPanel}
			</div>
		);
	}

}