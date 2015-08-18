import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { store } from './views/RootView';
import routes from './config/routes';
import css from './gfx/app.css'; // eslint-disable-line no-unused-vars
import * as actions from './actions';
import logger from './services/logger';

const log = logger.get('app');

log('bootstrapping application');

// creates the component element, providing actions prop
function createElement(Component, props) {
	return (
		<Component {...props} actions={actions}/>
	);
}

// bootstrap the application
ReactDOM.render((
	<Router createElement={createElement} history={history}>
		<Route component={reduxRouteComponent(store)}>
			{routes}
		</Route>
	</Router>
), document.getElementById('app'));

log('bootstrap complete');