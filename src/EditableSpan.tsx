import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsTypes = {
	value: string
	onChange: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsTypes) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.value)

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
			? <input value={title} onChange={onChangeHandler} onBlur={activeteViewMode} autoFocus/>
			: <span onDoubleClick={activateEditMode}>{props.value}</span>
	);
};
