import Promise from 'bluebird';

export class UserStore {

	loadUser(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					id: id,
					name: 'User #' + id
				});
			}, 3000)
		});
	}

}

export default new UserStore();