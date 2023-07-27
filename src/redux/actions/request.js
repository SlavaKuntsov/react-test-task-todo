import tasksApi from '../api/task'

const actions = {
	setTasks: items => ({
		type: 'TASKS:SET_ITEMS', 
		payload: items
	}),
	removeDialogs: () => ({
		type: 'TASKS:REMOVE_ITEMS', 
	}),
	fetchCurrent: id => dispatch => {
		tasksApi
			.getCurrent({ dialog: id })
			.then(({data }) => {

				// dispatch(actions.setCurrentDialog({ data: data }));
			})
			.catch((err) => {
				console.log(err)
			})
	},
	fetchTasks: () => dispatch => {
		// dispatch(actions.setIsLoading(true))

		tasksApi
			.getAll()
			.then(({data}) => {
				console.log('data: ', data);
				dispatch(actions.setTasks(data))
				// dispatch(actions.setIsLoading(false))
			})
			.catch((err) => {
				console.log(err)
				// dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions