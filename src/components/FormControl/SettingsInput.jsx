import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const Input = ({ label, name, ...rest }) => {
	return (
		<div className="mb-4 md:flex justify-center items-center">
			<label
				className="md:w-32 md:mr-8 text-right font-semibold tracking-wider"
				htmlFor={name}
			>
				{label}
			</label>
			<Field
				className="w-full md:max-w-lg md:ml-8 p-2 rounded-lg border-2 border-gray-400 text-xs"
				id={name}
				name={name}
				{...rest}
			/>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Input;
