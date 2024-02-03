import {FilterValueTypes, TodolistsType} from "../App";
import {v1} from "uuid";


// type ActionType = {
// 	type: string
// 	[key: string]: any
// }

type ActionName = 'REMOVE-TODOLIST' | 'ADD-TODOLIST' | 'CHANGE-TODOLIST-TITLE' | 'CHANGE-TODOLIST-FILTER'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
}


export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}


export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValueTypes
}
type ActionType =
	RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
	switch (action.type) {

		case 'REMOVE-TODOLIST':
			return state.filter(todolist => todolist.id !== action.id)

		case 'ADD-TODOLIST':
			const newTodoListId = v1()
			const newTodoList: TodolistsType = {id: newTodoListId, title: action.title, filter: "all"}
			return [...state, newTodoList]

		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t => {
				if (t.id === action.id) t.title = action.title
				return t
			})

		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t => {
				if (t.id === action.id) t.filter = action.filter
				return t
			})

		default:
			throw new Error('I don\'t understand this type')
	}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => {
	return {type: 'ADD-TODOLIST', title: todolistTitle}
}

export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}


export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueTypes): ChangeTodolistFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
