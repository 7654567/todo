import {FilterValueTypes, TodolistType} from "../App";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./tasks-reducer";


export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
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

const initialState: Array<TodolistType> = [
	{id: todolistId1, title: 'What to learn', filter: 'all'},
	{id: todolistId2, title: 'What to buy', filter: 'all'},
]
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType) => {
	switch (action.type) {

		case 'REMOVE-TODOLIST':
			return state.filter(todolist => todolist.id !== action.id)

		case 'ADD-TODOLIST':
			const newTodoListId = action.todolistId
			const newTodoList: TodolistType = {id: newTodoListId, title: action.title, filter: "all"}
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
			return state
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
	return {type: 'ADD-TODOLIST', title: todolistTitle, todolistId: v1()}
}

export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}


export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueTypes): ChangeTodolistFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
