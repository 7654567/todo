import React from 'react';
import {Button} from "./Button";


type TodoListPropsTypes = {
	title:string
	tasks:TaskType[]
}
export type TaskType = {
	id:number
	task:string
	isDone:boolean
}
export const TodoList = (props:TodoListPropsTypes) => {
	return (
		<div className="todoList">
			<h3>{props.title}</h3>
			<div>
				<input/>
				<Button title="+" />
			</div>
			<ul>
				{props.tasks.map((item, index)=>{
					return <li><input type="checkbox" key={index} checked={item.isDone}/> <span>{item.task}</span></li>
				})}

			</ul>
			<div>
				<Button title="All" />
				<Button title="Active" />
				<Button title="Completed" />

			</div>
		</div>
	);
};
