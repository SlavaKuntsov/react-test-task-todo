import axios from '../axios'

export default {
	getMe: () => axios.get('/user/me'),
	registration: postData => axios.post('/user', postData),
	
}