import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
	addItem: (value: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	let [title, setTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	console.log("AddItemForm called")
	const addItem = () => {
		if (title.trim() !== '') {
			props.addItem(title.trim())
			setTitle('')
		} else {
			setError("Title is required")
		}
	}
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) setError(null)
		if (event.key === "Enter") addItem()
	}


	return (

		<div className={"addTodoList"}>
			<TextField
				variant="outlined"
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				// className={error ? 'error' : ''}
				error={!!error}
				label={"Title"}
				// style={{"height": "20px"}}
				className={"titleInput"}
			/>
			{/*<input*/}
			{/*	value={title}*/}
			{/*	onChange={onChangeHandler}*/}
			{/*	onKeyPress={onKeyPressHandler}*/}
			{/*	className={error ? 'error' : ''}*/}
			{/*/>*/}
			{/*<button onClick={addItem}>+</button>*/}
			<Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
			        onClick={addItem} variant="contained">+</Button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
})