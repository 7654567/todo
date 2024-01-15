import React from 'react';
import {FilterValueTypes} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodoListPropsTypes = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (id: FilterValueTypes, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, todolistId: string) => void
	removeToDoList: (id: string) => void
	editTask: (val: string, taskId: string, listId: string) => void
	editTodoListHeader: (val: string, listId: string) => void
	filter: FilterValueTypes
}
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export const TodoList = (props: TodoListPropsTypes) => {

	const addTask = (title: string) => props.addTask(title, props.id)

	const onRemoveToDoList = () => props.removeToDoList(props.id)
	//TODO onClickHandler
	// const onClickHandler = (item: TaskType) => props.removeTask(item.id)
	const onAllClickHandler = () => props.changeFilter("all", props.id)
	const onActiveClickHandler = () => props.changeFilter("active", props.id)
	const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
	const editTodoListHeader = (val: string) => props.editTodoListHeader(val, props.id)

	/*TODO onKeyPress deprecated*/
	return (
		<div className="todoList">
			<h3><EditableSpan value={props.title} onChange={editTodoListHeader}/>
				<button onClick={onRemoveToDoList}>X</button>
			</h3>
			<AddItemForm addItem={addTask}/>
			<ul>
				{props.tasks && props.tasks.map((item, index) => {
					const onClickHandler = () => props.removeTask(item.id, props.id)
					const onChangeHandler = () => props.changeTaskStatus(item.id, props.id)
					const editTask = (val: string) => props.editTask(val, item.id, props.id)
					return (
						<li key={item.id} className={item.isDone ? 'is-done' : ''}>
							<input
								type="checkbox"
								key={index}
								checked={item.isDone}
								onChange={onChangeHandler}
							/>
							<EditableSpan value={item.title} onChange={editTask}/>
							{/*<span>{item.title}</span>*/}
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



