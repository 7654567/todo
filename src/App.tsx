import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type  FilterValueTypes = "all" | "active" | "completed"
type TodolistsType = {
	id: string
	title: string
	filter: FilterValueTypes
}
type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	// let task_1: TaskType[] = [
	// 	{id: v1(), title: "HTML&CSS", isDone: false},
	// 	{id: v1(), title: "JS", isDone: true},
	// 	{id: v1(), title: "React", isDone: false},
	// 	{id: v1(), title: "task_4", isDone: true},
	// ]
	// let task_2: TaskType[] = [
	// 	{id: 3, task: "task_4", isDone: true},
	// 	{id: 4, task: "task_5", isDone: true},
	// 	{id: 5, task: "task_6", isDone: false},
	// ]

	// let arr = useState(task_1)
	// let tasks = arr[0]
	// let setTasks = arr[1]
	// let [tasks, setTasks] = useState<Array<TaskType>>(task_1)


	// let [todolists, setTodolists] = useState<Array<TodolistsType>>(
	// 	[
	// 		{id: v1(), title: 'What to learn', filter: 'all'},
	// 		{id: v1(), title: 'What to buy', filter: 'all'},
	// 	]
	// )
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TaskStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},

		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		]
	})


	function changeFilter(value: FilterValueTypes, todolistId: string) {
		let todolist = todolists.find(el => el.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	function addTask(title: string, todolistId: string) {
		const task = {id: v1(), title: title, isDone: false};
		tasks[todolistId] = [task, ...tasks[todolistId]];
		setTasks({...tasks})
	}

	function removeTask(id: string, todolistId: string) {
		// // task_1 = task_1.filter(t => t.id !== id)
		let filteredTasks = tasks[todolistId].filter(t => t.id !== id)
		setTasks({...tasks, [todolistId]: filteredTasks})
	}

	function changeTaskStatus(id: string, todolistId: string) {
		const task = tasks[todolistId].find(t => t.id === id)
		//TODO
		if (task) {
			// task.isDone = isDone
			task.isDone = !task.isDone
			console.log("=>(App.tsx:86) task", task);
			// setTasks({...tasks, [todolistId]: task})
			setTasks({...tasks})
		}
	}

	function removeToDoList(id: string) {
		// debugger
		setTodolists(todolists.filter(todolist => todolist.id !== id))
		console.log(todolists)
		delete tasks[id]

		setTasks({...tasks})
	}

	return (
		<div className="App">
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
					/>
				}
			)}
			{/*<TodoList*/}
			{/*	title="What to do?"*/}
			{/*	tasks={tasksForTodolist}*/}
			{/*	removeTask={removeTask}*/}
			{/*	changeFilter={changeFilter}*/}
			{/*	addTask={addTask}*/}
			{/*	changeTaskStatus={changeTaskStatus}*/}
			{/*	filter={filter}*/}
			{/*/>*/}
			{/*<TodoList title="What to buy?" tasks={task_2} removeTask={removeTask} changeFilter={changeFilter}/>*/}
			{/*<TodoList title="What to learn?" tasks={task_1} removeTask={removeTask} changeFilter={changeFilter}/>*/}
		</div>
	);
}

export default App;
