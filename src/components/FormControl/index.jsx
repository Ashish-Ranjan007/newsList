import React from 'react';

import Input from './Input';
import ImageInput from './ImageInput';
import SettingsInput from './SettingsInput';

const FormControl = (props) => {
	const { control, ...rest } = props;

	switch (control) {
		case 'input':
			return <Input {...rest} />;
		case 'settingsInput':
			return <SettingsInput {...rest} />;
		case 'imageInput':
			return <ImageInput {...rest} />;
		default:
			return null;
	}
};

export default FormControl;
