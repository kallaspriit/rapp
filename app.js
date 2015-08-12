import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { store } from './views/RootView';
import routes from './config/routes';
import log from './services/log';
import css from './gfx/app.css'; // eslint-disable-line no-unused-vars

import * as actions from './actions';

log('bootstrapping', routes, actions);

/*
function onUpdate() {
	log('router updated');
}

function createElement(Component, props) {
	log('create element', Component, props);

	if (typeof props.route.component.fetchData === 'function') {
		log('has data');

		props.route.component.fetchData(props.params).then(() => {
			log('all data loaded');
		});

		return (
			<Component {...props} loading={true}/>
		);
	}

	return (
		<Component {...props} loading={false}/>
	);
}
<Router history={history} onUpdate={onUpdate} createElement={createElement}>
*/

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