import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueTypes} from "./App";


type TodoListPropsTypes = {
	title: string
	tasks: TaskType[]
	removeTask: (id: string) => void
	changeFilter: (id: FilterValueTypes) => void
	addTask: (title: string) => void
}
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export const TodoList = (props: TodoListPropsTypes) => {
	let [title, setTitle] = useState("")

	const addTask = () => {
		props.addTask(title)
		setTitle("")
	}
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			addTask()
		}
	}
	//TODO onClickHandler
	// const onClickHandler = (item: TaskType) => props.removeTask(item.id)
	const onAllClickHandler = () => props.changeFilter("all")
	const onActiveClickHandler = () => props.changeFilter("active")
	const onCompletedClickHandler = () => props.changeFilter("completed")
	// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
	// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

	return (
		<div className="todoList">
			<h3>{props.title}</h3>
			<div>
				<input
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
				/>
				<button onClick={addTask}>+</button>
			</div>
			<ul>
				{props.tasks.map((item, index) => {
					return (
						<li>
							<input type="checkbox" key={index} checked={item.isDone}/>

							<span>{item.title}</span>
							<button onClick={() => props.removeTask(item.id)}>X</button>
							{/*<button onClick={}>X</button>*/}
						</li>
					)

				})}

			</ul>
			<div>
				<button onClick={onAllClickHandler}>All</button>
				<button onClick={onActiveClickHandler}>Active</button>
				<button onClick={onCompletedClickHandler}>Completad</button>
			</div>
		</div>
	);
};
