import { logger, ConsoleLog, SocketLog } from 'logviking';
import config from '../config';

if (config.logger && config.debug === true) {
	for (let loggerName in config.logger) {
		if (config.logger.hasOwnProperty(loggerName)) {
			let loggerInfo = config.logger[loggerName];

			if (loggerInfo.enabled !== false) {
				switch (loggerName) {
					case 'console':
						logger.addReporter(new ConsoleLog(loggerInfo.options));
						break;

					case 'socket':
						logger.addReporter(new SocketLog(
							loggerInfo.options.host,
							loggerInfo.options.port
						));
						break;

					default:
						throw new Error('Unexpected logger "' + loggerName + '" requested');
				}
			}
		}
	}
}

export default logger;