import React from 'react';
import { Field, ErrorMessage } from 'formik';

import TextError from './TextError';

const CheckBoxGroup = ({ label, name, options, interests, ...rest }) => {
	return (
		<div>
			<h1 className="p-2.5 border-b-2 text-lg font-medium text-font-gray tracking-wide">
				{label}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
				<Field name={name}>
					{({ field }) => {
						return options.map((option) => {
							return (
								<div
									className="flex items-center gap-8"
									key={option.key}
								>
									<input
										{...rest}
										{...field}
										type="checkbox"
										id={option.value}
										value={option.value}
										checked={field.value.includes(
											option.value
										)}
										className="cursor-pointer"
									/>
									<label
										className={`font-medium ${
											interests.includes(option.value)
												? 'text-gray-400'
												: ''
										}`}
										htmlFor={option.value}
									>
										{option.key}
									</label>
								</div>
							);
						});
					}}
				</Field>
				<ErrorMessage component={TextError} name={name} />
			</div>
		</div>
	);
};

export default CheckBoxGroup;
