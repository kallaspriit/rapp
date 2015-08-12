import { Promise } from 'bluebird';
import log from './log';

export default {

	fetchUser(id) {
		log('loading user #' + id);

		return new Promise((resolve, reject) => {
			setTimeout(() => {

				// fail half of the times..
				if (Math.random() > 0.25) {
					log('user #' + id + ' loaded');

					resolve({
						id: id,
						name: 'User #' + id
					});
				} else {
					log('loading user #' + id + ' failed');

					reject({
						message: 'Simulated error'
					});
				}
			}, 2000);
		});
	}

};