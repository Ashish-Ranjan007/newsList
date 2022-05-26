import React from 'react';

import Input from './Input';
import ImageInput from './ImageInput';
import SettingsInput from './SettingsInput';
import CheckBoxGroup from './CheckBoxGroup';

const FormControl = (props) => {
	const { control, ...rest } = props;

	switch (control) {
		case 'input':
			return <Input {...rest} />;
		case 'imageInput':
			return <ImageInput {...rest} />;
		case 'settingsInput':
			return <SettingsInput {...rest} />;
		case 'checkboxGroup':
			return <CheckBoxGroup {...rest} />;
		default:
			return null;
	}
};

export default FormControl;
