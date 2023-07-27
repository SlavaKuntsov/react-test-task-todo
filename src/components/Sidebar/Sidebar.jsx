import style from './Sidebar.module.scss'
import toDo from '../../../src/assets/checklist.png'

import Logout from '../Logout/Logout'

export default function Sidebar () {
	
	return (
		<div className={style.sidebar}>
			<div className={style.category}>
				<img src={toDo} alt="to do" width={50} height={50}/>
				<h2>category</h2>
			</div>
			<Logout />
		</div>
	)
}

