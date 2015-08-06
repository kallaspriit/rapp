import React from 'react';
import Router from 'react-router';

import routes from './config/routes';

import log from './services/Log';
import Calculator from './services/Calculator';

let calculator = new Calculator();

log('hello world, 4 + 2 = ' + calculator.sum(4, 2));

let router = Router.create({
	routes: routes,
	location: Router.HashLocation
	//location: Router.HistoryLocation
})

router.run((Root, state) => {
	log('matched route', state);

	React.render(<Root/>, document.getElementById('app'));
});

/*Router.run(routes, Router.HashLocation, (Root, state) => {
	log('matched route', state);

	React.render(<Root/>, document.getElementById('app'));
});*/