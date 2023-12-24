import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type  FilterValueTypes = "all" | "active" | "completed"

function App() {
	let task_1: TaskType[] = [
		{id: v1(), title: "HTML&CSS", isDone: false},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "React", isDone: false},
		{id: v1(), title: "task_4", isDone: true},
	]
	// let task_2: TaskType[] = [
	// 	{id: 3, task: "task_4", isDone: true},
	// 	{id: 4, task: "task_5", isDone: true},
	// 	{id: 5, task: "task_6", isDone: false},
	// ]

	// let arr = useState(task_1)
	// let tasks = arr[0]
	// let setTasks = arr[1]
	let [tasks, setTasks] = useState<Array<TaskType>>(task_1)
	let [filter, setFilter] = useState<FilterValueTypes>('active')
	let tasksForTodolist = tasks;
	if (filter === "completed") tasksForTodolist = tasks.filter(t => t.isDone)
	if (filter === "active") tasksForTodolist = tasks.filter(t => !t.isDone)

	function changeFilter(value: FilterValueTypes) {
		setFilter(value)
	}

	function addTask(title: string) {
		const task = {id: v1(), title: title, isDone: false};
		const newTasks = [task, ...tasks];
		setTasks(newTasks)
	}

	function removeTask(id: string) {
		// task_1 = task_1.filter(t => t.id !== id)
		let filteredTasks = tasks.filter(t => t.id !== id)
		setTasks(filteredTasks)
	}


	return (
		<div className="App">
			<TodoList title="What to do?" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}
					  addTask={addTask}/>
			{/*<TodoList title="What to buy?" tasks={task_2} removeTask={removeTask} changeFilter={changeFilter}/>*/}
			{/*<TodoList title="What to learn?" tasks={task_1} removeTask={removeTask} changeFilter={changeFilter}/>*/}
		</div>
	);
}

export default App;
