import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueTypes} from "./App";


type TodoListPropsTypes = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (id: FilterValueTypes, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, todolistId: string) => void
	removeToDoList: (id: string) => void
	filter: FilterValueTypes
}
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export const TodoList = (props: TodoListPropsTypes) => {
	let [title, setTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (title.trim() !== '') {
			props.addTask(title.trim(), props.id)
			setTitle('')
		} else {
			setError("Title is required")
		}
	}
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === "Enter") addTask()
	}
	const onRemoveToDoList = () => props.removeToDoList(props.id)
	//TODO onClickHandler
	// const onClickHandler = (item: TaskType) => props.removeTask(item.id)
	const onAllClickHandler = () => props.changeFilter("all", props.id)
	const onActiveClickHandler = () => props.changeFilter("active", props.id)
	const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
	// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
	// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

	/*TODO onKeyPress deprecated*/
	return (
		<div className="todoList">
			<h3>{props.title}
				<button onClick={onRemoveToDoList}>X</button>
			</h3>
			<div>
				<input
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<button onClick={addTask}>+</button>
				{error && <div className='error-message'>{error}</div>}
			</div>
			<ul>
				{props.tasks && props.tasks.map((item, index) => {
					const onClickHandler = () => props.removeTask(item.id, props.id)
					const onChangeHandler = () => props.changeTaskStatus(item.id, props.id)
					return (
						<li key={item.id} className={item.isDone ? 'is-done' : ''}>
							<input
								type="checkbox"
								key={index}
								checked={item.isDone}
								onChange={onChangeHandler}
							/>
							<span>{item.title}</span>
							<button onClick={onClickHandler}>X</button>
						</li>
					)
				})}

			</ul>
			<div>
				<button onClick={onAllClickHandler}
						className={props.filter === 'all' ? 'active-filter' : ''}>All
				</button>
				<button onClick={onActiveClickHandler}
						className={props.filter === 'active' ? 'active-filter' : ''}>Active
				</button>
				<button onClick={onCompletedClickHandler}
						className={props.filter === 'completed' ? 'active-filter' : ''}>Completad
				</button>
			</div>
		</div>
	);
};
