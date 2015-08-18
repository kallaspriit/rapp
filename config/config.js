import developer from './developer';

// base configuration
let base = {

	debug: false,
	logger: {
		console: {
			enabled: true,
			options: {
				componentNameWidth: 40
			}
		},
		socket: {
			enabled: false,
			options: {
				host: 'localhost',
				port: 2222
			}
		}
	}

};

// base configuration values can be overridden by the developer config
export default developer(base);