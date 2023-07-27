import style from './Layout.module.scss'

export default function Layout ({ children }) {
	
	return (
		<div className={style.wrapper}>
			{children}
		</div>
	)
}

