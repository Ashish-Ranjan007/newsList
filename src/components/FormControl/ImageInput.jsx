import React from 'react';
import { ErrorMessage, Field } from 'formik';

import TextError from './TextError';

const ImageInput = ({ label, name, ...rest }) => {
	return (
		<div className="w-full md:max-w-lg md:ml-8 py-2 text-xs">
			<label
				className="font-medium text-base text-sky-blue cursor-pointer transition hover:opacity-50"
				htmlFor={name}
			>
				{label}
			</label>
			<Field name={name}>
				{({ field }) => {
					return (
						<input
							type="file"
							id={name}
							{...field}
							{...rest}
							accept="image/*"
						/>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default ImageInput;
