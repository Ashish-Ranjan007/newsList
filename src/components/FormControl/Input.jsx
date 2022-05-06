import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const Input = ({ label, name, ...rest }) => {
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<Field
				className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
				id={name}
				name={name}
				{...rest}
			/>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Input;
