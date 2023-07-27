import tasksApi from '../api/task'

const actions = {
	setTasks: ( items, user ) => ({
		type: 'TASKS:SET_ITEMS', 
		payload: items,
		user: user
	}),
	setCurrentsTaskId: id => ({
		type: 'TASKS:CURRENT_CLICK_ITEMS', 
		payload: id
	}),
	setRemoveTaskId: id => ({
		type: 'TASKS:REMOVE_ITEM', 
		payload: id
	}),
	removeAllItems: () => ({
		type: 'TASKS:REMOVE_ALL_ITEMS', 
	}),
	removeTask: ( id ) => dispatch => {
		console.log('id delete: ', id);
		tasksApi
			.removeTask(id)
			.then(() => {
				dispatch(actions.setRemoveTaskId(id));
			})
			.catch(err => {
				console.log(err)
			})
	},
	createTask: ({ postData }) => dispatch => {
		tasksApi
			.createTask(postData)
			.then(({ data }) => {
				console.log('task: ', data);

				dispatch(actions.setTasks(data, data.user));
				console.log('data.email: ', data.email);
				// dispatch(actions.fetchTasks());
			})
			.catch(err => {
				console.log(err)
			})
	},
	fetchTasks: ({ user }) => dispatch => {
		tasksApi
			.getAll()
			.then(({data}) => {
				console.log('data: ', data);
				dispatch(actions.setTasks(data, user))
				// dispatch(actions.setIsLoading(false))
			})
			.catch((err) => {
				console.log(err)
				// dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions