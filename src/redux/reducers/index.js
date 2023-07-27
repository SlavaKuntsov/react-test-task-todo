import { combineReducers } from 'redux'

import taskReducer from './task'
import userReducer from './user'

export default combineReducers({
	task: taskReducer,
	user: userReducer
})
