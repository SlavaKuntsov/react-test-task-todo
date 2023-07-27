import { TbLogout2 } from 'react-icons/tb'

import style from './Logout.module.scss'

import store from '../../redux/store'
import userAction from '../../redux/actions/user'
import taskAction from '../../redux/actions/task'

export default function Logout() {

	const removeUser = () => {
		localStorage.removeItem('token');
		store.dispatch(userAction.removeAuth())
		store.dispatch(taskAction.removeAllItems())
	}

	return (
		<div className={style.logout} onClick={() => removeUser()}>
			<TbLogout2 size={22} />
			<h3>Logout</h3>
		</div>
	)
}
