import { Promise } from 'bluebird';
import log from './log';

export default {

	fetchUser(info) {
		log('loading user #' + info.id);

		return new Promise((resolve, reject) => {
			setTimeout(() => {

				// fail half of the times..
				if (Math.random() > 0.25) {
					log('user #' + info.id + ' loaded');

					resolve({
						name: 'User #' + info.id
					});
				} else {
					log('loading user #' + info.id + ' failed');

					reject('api simulates failing requests 25% of the times, try again');
				}
			}, 2000);
		});
	}

};