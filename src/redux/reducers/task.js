const initialState = {
	items: [],
	currentTaskId: null,
}

export default (state = initialState, { type, payload, user }) => {
	switch (type) {
		case 'TASKS:SET_ITEMS': {
				const concatArr = state.items.concat(payload)
				return {
					...state,
					items: concatArr.filter(item => item.user === user),
				}
			}
		case 'TASKS:CURRENT_CLICK_ITEMS':
			return {
				...state,
				currentTaskId: payload
			}
		case 'TASKS:REMOVE_ALL_ITEMS':
			return {
				...state,
				items: [],
				currentTaskId: null,
			}
		case 'TASKS:REMOVE_ITEM': {
				const updatedTasks = state.items.filter(item => item._id !== payload)
				console.log('updatedTasks: ', updatedTasks);
				return {
					...state,
					items: updatedTasks,
					currentTaskId: null,
				}
			}
		default:
			return state
	}
}

// case 'TASKS:REMOVE_ID_ITEM':
// 	return {
// 		...state,
// 		removeTaskId: payload
// 	}