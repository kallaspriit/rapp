// base configuration
export default {

	version: {
		major: 0,
		minor: 1,
		patch: 0
	},

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