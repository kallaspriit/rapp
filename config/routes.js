import React from 'react';
import { Route } from 'react-router';

import RootView from '../views/RootView';
import IndexView from '../views/IndexView';
import AboutView from '../views/AboutView';
import CounterView from '../views/CounterView';
import UserView from '../views/UserView';
import NotFoundView from '../views/NotFoundView';

// http://rackt.github.io/react-router/
/* eslint-disable react/jsx-sort-props */
export default (
	<Route component={RootView}>
		<Route name="default" path="/" component={IndexView}/>
		<Route name="index" path="/index" component={IndexView}/>
		<Route name="about" path="/about" component={AboutView}/>
		<Route name="counter" path="/counter" component={CounterView}/>
		<Route name="user" path="/user/:id" component={UserView}/>
		<Route name="default" path="*" component={NotFoundView}/>
	</Route>
);