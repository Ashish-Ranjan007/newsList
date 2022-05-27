import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const Input = ({ label, name, ...rest }) => {
	return (
		<div className="mb-4 md:flex items-center">
			<label
				className="md:w-52 md:mr-8 text-right font-medium tracking-wider"
				htmlFor={name}
			>
				{label}
			</label>
			<div className="w-full md:max-w-lg md:ml-8">
				<Field
					className="w-full p-2 rounded-lg border-2 border-gray-400 text-xs"
					id={name}
					name={name}
					{...rest}
				/>
				<ErrorMessage
					className="md:ml-8 py-1"
					name={name}
					component={TextError}
				/>
			</div>
		</div>
	);
};

export default Input;
