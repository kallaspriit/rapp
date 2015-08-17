import xhr from 'axios';

export default {

	fetchUser: (info) => xhr.get('/data/user-' + info.id + '.json')

};