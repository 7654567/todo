import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
// import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type  FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
	id: string
	title: string
	filter: FilterValueTypes
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}


function App() {
	// let todolistID1 = v1()
	// let todolistID2 = v1()

	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const changeFilter = (value: FilterValueTypes, todolistId: string) => dispatch(changeTodolistFilterAC(todolistId, value))

	const addTask = (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId))

	const removeTask = (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId))

	const changeTaskStatus = (id: string, todolistId: string) => dispatch(changeTaskStatusAC(id, todolistId))

	const removeToDoList = (id: string) => dispatch(removeTodolistAC(id))

	const addTodoList = (title: string) => dispatch(addTodolistAC(title))

	const editTask = (val: string, taskId: string, listId: string) => dispatch(changeTaskTitleAC(taskId, val, listId))

	const editTodoListHeader = (value: string, listId: string) => dispatch(changeTodolistTitleAC(listId, value))

	return (
		<div className="App">
			<ButtonAppBar/>

			<AddItemForm addItem={addTodoList}/>

			<div className="listsContainer">


				{todolists.map(todolist => {

						let tasksForTodolist = tasks[todolist.id];

						if (todolist.filter === "completed") tasksForTodolist = tasks[todolist.id].filter(t => t.isDone)
						if (todolist.filter === "active") tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone)

						return <TodoList
							key={todolist.id}
							id={todolist.id}
							title={todolist.title}
							tasks={tasksForTodolist}
							removeTask={removeTask}
							changeFilter={changeFilter}
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
							removeToDoList={removeToDoList}
							filter={todolist.filter}
							editTask={editTask}
							editTodoListHeader={editTodoListHeader}
						/>
					}
				)}
			</div>
		</div>
	);
}

export default App;
