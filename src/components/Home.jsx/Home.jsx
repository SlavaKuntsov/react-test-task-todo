import { HamburgerIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import style from './Home.module.scss'

import Card from '../Card/Card'
import Sidebar from '../Sidebar/Sidebar'
import BurgerMenu from './BurgerMenu'

import taskAction from '../../redux/actions/task'
import store from '../../redux/store'

function Home({ userToken }) {
	window.history.pushState(null, null, window.location.pathname)
	window.addEventListener('popstate', function () {
		window.history.pushState(null, null, window.location.pathname)
	})

	const [menuClick, setMenu] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		console.log('userToken: ', userToken)
		if (userToken === null) {
			console.log(111)
			navigate('/')
		}

		store.dispatch(taskAction.fetchTasks({ user: userToken }))
	}, [userToken])

	return (
		<div className={style.home}>
			<Sidebar />

			<BurgerMenu menuClick={menuClick} />

			<div className={style.mainSection}>
				<nav>
					<div className={style.name}>
						<img src='/vite.svg' alt='avatar' />
						{/* <img src='../../../src/assets/react.svg' alt='avatar' /> */}
						<p>{userToken}</p>
						{/* <p>email@gmail.com</p> */}
					</div>
					<HamburgerIcon
						boxSize={26}
						onClick={() => setMenu(prev => !prev)}
					/>
				</nav>

				<div className={style.mainSection__cards}>
					<section className={style.info}>
						<h1 className={style.categoryName}>Work</h1>

						<p className={style.categoryDescription}>Описание...</p>
					</section>

					<section className={style.main}>
						<Card task='do' />
						<Card task='progress' />
						<Card task='closed' />
					</section>
				</div>
			</div>
		</div>
	)
}

export default connect(
	({ user }) =>
		console.log() || {
			userToken: user.token
		},
	taskAction
)(Home)
