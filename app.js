import React from 'react';
import Router from 'react-router';
import Promise from 'bluebird';

import routes from './config/routes';
import log from './services/Log';

// enable long stack traces
Promise.longStackTraces();

// setup react router
let router = Router.create({
	routes: routes,
	location: Router.HashLocation
	//location: Router.HistoryLocation
})

// run the application
router.run((Root, state) => {
	let routesWithData = state.routes.filter((route) => route.handler.fetchData),
		promises = routesWithData.reduce((promises, route) => {
			promises.push(route.handler.fetchData(state.params));

			return promises;
		}, []);

	log('matched route', state, promises);

	if (promises.length > 0) {
		log('there is data to load..');

		React.render(<Root data={null} loading={true}/>, document.getElementById('app'));
	} else {
		log('no data to load..');
	}

	// TODO handle aborting loading data if view is changed before data is loaded
	Promise.all(promises).then((data) => {
		log('data loaded', data);

		React.render(<Root data={data} loading={false}/>, document.getElementById('app'));
	})
});