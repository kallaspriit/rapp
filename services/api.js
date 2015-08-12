import { Promise } from 'bluebird';
import log from './log';

export default {

	fetchUser(id) {
		log('loading user #' + id);

		return new Promise((resolve) => {
			setTimeout(() => {
				log('data loaded', id);

				resolve({
					id: id,
					name: 'User #' + id
				});
			}, 2000);
		});
	}

};