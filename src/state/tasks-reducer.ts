import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"
// const ADD_TODOLIST = "ADD_TODOLIST"

// type ActionName = 'REMOVE-TODOLIST' | 'ADD-TODOLIST' | 'CHANGE-TODOLIST-TITLE' | 'CHANGE-TODOLIST-FILTER'

export type RemoveTaskActionType = {
	type: "REMOVE-TASK"
	taskId: string
	todolistId: string
}
export type AddTaskActionType = {
	type: "ADD-TASK"
	title: string
	todolistId: string
}
export type ChangeTaskStatusActionType = {
	type: "CHANGE-TASK-STATUS"
	status: boolean
	todolistId: string
	taskId: string
}

export type ChangeTaskTitleActionType = {
	type: "CHANGE-TASK-TITLE"
	title: string
	todolistId: string
	taskId: string
}


type ActionType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
	switch (action.type) {

		case REMOVE_TASK:
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
			}
		case ADD_TASK:
			return {
				...state,
				[action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
			}
		case CHANGE_TASK_STATUS:
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
					...task,
					isDone: action.status
				} : task)
			}
		case CHANGE_TASK_TITLE:
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
					...task,
					title: action.title
				} : task)
			}
		case "ADD-TODOLIST":
			return {
				...state,
				[action.todolistId]: []
			}
		case "REMOVE-TODOLIST":
			let newState = {...state}
			delete newState[action.id]

			return newState


		default:
			throw new Error('I don\'t understand this type')
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {type: REMOVE_TASK, taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {type: ADD_TASK, title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return {type: CHANGE_TASK_STATUS, status: status, todolistId: todolistId, taskId: taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return {type: CHANGE_TASK_TITLE, title: title, todolistId: todolistId, taskId: taskId}
}

