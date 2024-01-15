import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
	value: string
	addItem: (value: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
	let [title, setTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

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
		setError(null)
		if (event.key === "Enter") addItem()
	}


	return (
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<button onClick={addItem}>+</button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}