import React from 'react';
import Router from 'react-router';

import routes from './config/routes';
import log from './services/Log';

import css from './gfx/app.css';

// setup react router
let router = Router.create({
	routes: routes,
	//location: Router.HashLocation
	location: Router.HistoryLocation
})

// run the application
router.run((Root, state) => {
	let routesWithData = state.routes.filter((route) => route.handler.fetchData),
		promises = routesWithData.reduce((promises, route) => {
			promises.push(route.handler.fetchData(state.params));

			return promises;
		}, []);

	log('matched route', state, promises);

	// render the view in loading state if there is data to fetch
	if (promises.length > 0) {
		React.render(<Root data={null} loading={true}/>, document.getElementById('app'));
	}

	// TODO handle aborting loading data if view is changed before data is loaded
	Promise.all(promises).then((data) => {
		React.render(<Root data={data} loading={false}/>, document.getElementById('app'));
	})
});