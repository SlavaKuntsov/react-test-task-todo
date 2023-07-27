import userApi from '../../../src/redux/api/user'

const actions = {
	setUser: data => ({
		type: 'USER:SET_DATA',
		payload: data
	}),
	setAuth: data => ({
		type: 'USER:SET_AUTH',
		payload: data
	}),
	removeAuth: () => ({
		type: 'USER:REMOVE_AUTH'
	}),
	fetchMe:
		({ postData }) => dispatch => {
			console.log('postData: me ', postData);
			window.axios.defaults.headers.common['token'] = postData.email
			localStorage.token = postData.email

			userApi
				.getMe()
				.then(({ data }) => {
					console.log('me: ', data)

					if (data === null) {
						dispatch(
							actions.fetchUserRegister({ postData: postData })
						)
					}
					if (data !== null) {
						dispatch(actions.setAuth(data))
					}
				})
				.catch(err => {
					console.log('not me')
					console.log(err)
				})
		},
	fetchUserRegister:
		({ postData }) =>
		dispatch => {
			console.log('postData reg: ', postData)
			userApi
				.registration(postData)
				.then(data => {
					console.log('data: ', data)
					dispatch(actions.fetchMe({ postData: { email: data.data.user.email, password: data.data.user.password } }))
				})
				.catch(err => {
					console.log(err)
				})
		}
}

export default actions
