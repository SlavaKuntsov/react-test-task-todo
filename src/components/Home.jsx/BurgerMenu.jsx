import style from './Home.module.scss'

import Logout from '../Logout/Logout'

export default function BurgerMenu ({ menuClick }) {
	
	return (
		<div className={`${style.menu} ${menuClick ? style.active : style.close}`}>
			<div className={style.allCategories}>
				<h2>Categories:</h2>
			</div>
			<Logout />
		</div>
	)
}

