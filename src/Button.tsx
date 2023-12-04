import React from 'react';

type ButtonPropsTypes = {
	title:string
}
export const Button = (props:ButtonPropsTypes) => {
	return (
		<button>{props.title}</button>
	);
};
