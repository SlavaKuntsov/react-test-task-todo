import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import userAction from '../../redux/actions/user'
import store from '../../redux/store'

import style from './Login.module.scss'

const Login = ({ token }) => {
	console.log('token: ', token);

	// localStorage.clear();

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const handleSubmit = () => {
		event.preventDefault()

		store.dispatch(userAction.fetchMe({ postData: { email, password } }))
		// store.dispatch(userAction.fetchUserRegister({ postData : {email, password}}))
	}
	const navigate = useNavigate()

	useEffect(() => {
		if(token !== null) {
			console.log(222)
			navigate('/home')
		}
	}, [token])

	return (
		<div className={style.login}>
			<h1>Войти в аккаунт</h1>
			<p>Пожалуйста, войдите в аккаунт</p>

			<form onSubmit={e => handleSubmit(e)}>
				<input
					type='email'
					placeholder='Введите email'
					required
					defaultValue={email || ''}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Введите пароль'
					minLength={3}
					required
					defaultValue={password || ''}
					onChange={e => setPassword(e.target.value)}
				/>

				<input type='submit' value='Войти' />
			</form>
		</div>
	)
}

export default connect(
	({ user }) =>
		console.log('user ', user) || {
			token: user.token,
		},
	userAction
)(Login)
