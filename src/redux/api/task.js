import axios from '../axios'

export default {
	getAll: () => axios.get('/task/show')	,
	createTask: postData => axios.post('/task/create', postData)	,
	removeTask: id => axios.delete(`/task/delete/${id}`)	
}