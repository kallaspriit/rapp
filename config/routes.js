import React from 'react';
import {Route, NotFoundRoute, DefaultRoute} from 'react-router';

import RootView from '../views/RootView';
import IndexView from '../views/IndexView';
import AboutView from '../views/AboutView';
import UserView from '../views/UserView';
import CounterView from '../views/CounterView';

import NotFoundView from '../views/NotFoundView';

// http://rackt.github.io/react-router/
export default (
	<Route handler={RootView}>
		<Route name="index" path="index" handler={IndexView}/>
		<Route name="about" path="about" handler={AboutView}/>
		<Route name="user" path="user/:id" handler={UserView}/>
		<Route name="counter" path="counter" handler={CounterView}/>

		<DefaultRoute name="default" handler={IndexView}/>
		<NotFoundRoute name="not-found" handler={NotFoundView}/>
	</Route>
);