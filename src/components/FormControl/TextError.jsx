import React from 'react';

const TextError = ({ children, className }) => {
	return (
		<div className={`text-xs text-red-600 font-normal ${className}`}>
			{children}
		</div>
	);
};

export default TextError;
