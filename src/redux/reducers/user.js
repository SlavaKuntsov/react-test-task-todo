const initialState = {
	data: null,
	token: localStorage.getItem('token') || null
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'USER:SET_AUTH':
			return {
				...state,
				data: payload,
				token: localStorage.getItem('token')
			}
		case 'USER:REMOVE_AUTH':
			return {
				...state,
				data: null,
				token: null
			}
		case 'USER:SET_DATA':
			return {
				...state,
				data: payload
			}
		default:
			return state
	}
}
