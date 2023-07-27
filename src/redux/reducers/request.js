const initialState = {
	requests: [],
	currentRequest: null
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'REQ:ADD_REQUEST':
			return {
				...state,
				requests: [...state.requests, payload]
			}
		case 'REQ:UPDATE_CURRENT_REQUEST':
			return {
				...state,
				currentRequest: payload
			}
		case 'REQ:REMOVE_REQUEST':
			return {
				...state,
				requests: state.requests.filter(
					request => request !== payload
				)
			}
		default:
			return state
	}
}
