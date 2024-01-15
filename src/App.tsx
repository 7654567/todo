import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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
		let filteredTasks = tasks[todolistId].filter(t => t.id !== id)
		setTasks({...tasks, [todolistId]: filteredTasks})
	}

	function changeTaskStatus(id: string, todolistId: string) {
		const task = tasks[todolistId].find(t => t.id === id)
		//TODO
		if (task) {
			task.isDone = !task.isDone
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

	function addTodoList(title: string) {
		const newTodoListId = v1()
		const newTodoList: TodolistsType = {id: newTodoListId, title: title, filter: "all"}
		setTodolists([...todolists, newTodoList])
		setTasks({
			...tasks,
			[newTodoListId]: []
		})
	}

	return (
		<div className="App">
			<AddItemForm value={'ewrt'} addItem={addTodoList}/>

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
		</div>
	);
}

export default App;
