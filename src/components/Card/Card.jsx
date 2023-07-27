import { SmallAddIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import taskAction from '../../redux/actions/task'
import store from '../../redux/store'

import { DeleteIcon } from '@chakra-ui/icons'
import style from './Card.module.scss'

const Card = ({ task, allTasksArray, userToken, _id }) => {
	// const tasks = [
	// 	{
	// 		category: 'do',
	// 		name: 'work',
	// 		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptatum.',
	// 		status: 'low'
	// 	},
	// 	{
	// 		category: 'progress',
	// 		name: 'chill',
	// 		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptatum.',
	// 		status: 'medium'
	// 	},
	// 	{
	// 		category: 'closed',
	// 		name: 'chill',
	// 		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, voluptatum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, rem. Quis praesentium iste tempore necessitatibus.',
	// 		status: 'high'
	// 	}
	// ]

	const [allTasks, setAllTasks] = useState([])
	console.log('allTasks: ', allTasks)

	useEffect(() => {
		setAllTasks(allTasksArray.filter(item => item.category === task))
	}, [allTasksArray, task])

	// ------------- add the task -------------
	const [addClick, setAddClick] = useState(false)

	const addTask = category => {
		if (addClick && activeCreate) {
			setAllTasks([
				...allTasks,
				{
					category: category,
					name: taskName,
					text: taskText,
					status: taskStatus
				}
			])

			store.dispatch(
				taskAction.createTask({
					postData: {
						user: userToken,
						category: category,
						name: taskName,
						text: taskText,
						status: taskStatus
					}
				})
			)

			setAddClick(false)
			setActiveCreate(false)

			setTaskName('')
			setTaskText('')
		}
	}

	// ------------- remove the task -------------

	const [removeTask, setRemoveTask] = useState(false)

	// ------------- input value -------------

	const [taskName, setTaskName] = useState('')
	const [taskText, setTaskText] = useState('')
	const [taskStatus, setTaskStatus] = useState('low')
	console.log('taskStatus: ', taskStatus)

	const [activeCreate, setActiveCreate] = useState(false)

	useEffect(() => {
		if (taskName !== '' && taskText !== '') {
			setActiveCreate(true)
		}
		if (taskName === '' || taskText === '') {
			setActiveCreate(false)
		}
		if (!addClick) {
			setTaskName('')
			setTaskText('')
		}
		if (removeTask) {
			setAllTasks(allTasksArray.filter(item => item._id !== _id))
			store.dispatch(taskAction.removeTask(_id))
			setRemoveTask(false)
		}
	}, [taskName, taskText, addClick, removeTask])

	// ------------- click outside the task -------------

	const taskInputRef = useRef(null)
	const ref = useRef(null)

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	function handleClickOutside(event) {
		if (
			taskInputRef.current &&
			!taskInputRef.current.contains(event.target) &&
			!ref.current.contains(event.target)
		) {
			setAddClick(false)
		}
	}

	return (
		<div className={style.card}>
			<div className={style.cardInfo}>
				<h3 className={style.status}>
					{
						{
							do: <>To do</>,
							progress: <>In progress</>,
							closed: <>Closed</>
						}[task]
					}
				</h3>
				<div
					className='add'
					onClick={() => {
						setAddClick(prev => !prev)
					}}
					ref={ref}
				>
					<SmallAddIcon boxSize={22} color='#FFF' />
				</div>
			</div>
			<div className={style.allTasks}>
				{allTasks.length !== 0 ? (
					allTasks
						.filter(item => item.category === task)
						.map((item, id) => {
							return (
								<div
									key={id}
									className={style.task}
									onClick={() => {
										store.dispatch(
											taskAction.setCurrentsTaskId(
												item._id
											)
										)
									}}
								>
									<h4>
										{item.name}{' '}
										<Status status={item.status} />
									</h4>
									<p>{item.text}</p>
									{_id === item._id && (
										<div className={style.taskRemove}>
											<DeleteIcon
												boxSize={20}
												onClick={() => {
													setRemoveTask(true)
												}}
											/>
										</div>
									)}
								</div>
							)
						})
				) : (
					<p className={style.emptyTask}>No tasks in this category</p>
				)}
				{addClick && (
					<div className={style.taskInput} ref={taskInputRef}>
						<input
							className={style.taskName}
							placeholder='Name...'
							value={taskName}
							onChange={e => setTaskName(e.target.value)}
						/>
						<input
							className={style.taskText}
							placeholder='Text...'
							value={taskText}
							onChange={e => setTaskText(e.target.value)}
						/>
						<div className={style.statusSelection}>
							{/* <Status click={true} setStatus={status => setTaskStatus(status)} status='low' />
							<Status click={true} setStatus={status => setTaskStatus(status)} status='medium' />
							<Status click={true} setStatus={status => setTaskStatus(status)} status='high' /> */}
							<select
								name='priority'
								value={taskStatus}
								onChange={e => setTaskStatus(e.target.value)}
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</div>
						<div
							className={`${style.taskCreate} ${
								activeCreate ? style.active : style.inactive
							}`}
							onClick={() => {
								addTask(task) // создание
							}}
						>
							Create
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

const Status = ({ status, click = false, setStatus }) => {
	return (
		<span
			className={`
				${style.status} 
				${status === 'low' && style.low} 
				${status === 'medium' && style.medium} 
				${status === 'high' && style.high}
			`}
			onClick={() => {
				click && setStatus(status)
			}}
		>
			{
				{
					low: <>low</>,
					medium: <>medium</>,
					high: <>high</>
				}[status]
			}
		</span>
	)
}

export default connect(
	({ task, user, items }) =>
		console.log() || {
			allTasksArray: task.items,
			_id: task.currentTaskId,
			userToken: user.token
		},
	taskAction
)(Card)
