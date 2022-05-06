export const initialState = {
	email: { value: '', error: null },
	password: { value: '', error: null },
	isDisabled: true,
	loginError: '',
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'email':
			return { ...state, email: action.payload };
		case 'password':
			return { ...state, password: action.payload };
		case 'isDisabled':
			return { ...state, isDisabled: action.payload };
		case 'loginError':
			return { ...state, loginError: action.payload };
		default:
			return state;
	}
};

export const validate = (type, string) => {
	if (string === '') return 'Required!';

	if (type === 'email') {
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!regex.test(string)) {
			return 'Not a valid Email';
		} else {
			return '';
		}
	}

	if (type === 'password') {
		if (string.length < 8) {
			return 'Password must be atleast 8 characters long';
		} else {
			return '';
		}
	}
};

export const isDisabled = (state) => {
	if (state.email.value.length === 0 || state.password.value.length === 0) {
		return true;
	} else if (state.email.value.length > 0 && state.email.error) {
		return true;
	} else if (state.password.value.length > 0 && state.password.error) {
		return true;
	}

	return false;
};
