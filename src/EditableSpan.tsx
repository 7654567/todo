import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsTypes = {
	value: string
	onChange: (title: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsTypes) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.value)
	console.log("EditableSpan called")
	const activateEditMode = () => {
		setEditMode(true)
	}
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const activeteViewMode = () => {
		props.onChange(title)
		setEditMode(false)
	}

	return (
		editMode
			? <TextField
				variant="outlined"
				value={title} onChange={onChangeHandler}
				onBlur={activeteViewMode}
				autoFocus
			/>
			: <span onDoubleClick={activateEditMode}>{props.value}</span>
	);
});
