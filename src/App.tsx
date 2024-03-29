import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";

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
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
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
		const newTodoList: TodolistType = {id: newTodoListId, title: title, filter: "all"}
		setTodolists([...todolists, newTodoList])
		setTasks({
			...tasks,
			[newTodoListId]: []
		})
	}

	function editTask(val: string, taskId: string, listId: string) {
		const task = tasks[listId].find(t => t.id === taskId)

		if (task) {
			task.title = val
			setTasks({...tasks})
		}
	}

	function editTodoListHeader(value: string, listId: string) {
		const list = todolists.find(t => t.id === listId)

		if (list) {
			list.title = value
			setTasks({...tasks})
		}
	}

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
