export const initialState = {
	fName: { value: '', error: null },
	lName: { value: '', error: null },
	username: { value: '', error: null },
	email: { value: '', error: null },
	password: { value: '', error: null },
	confirmPassword: { value: '', error: '' },
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'fName':
			return {
				...state,
				fName: action.payload,
			};
		case 'lName':
			return {
				...state,
				lName: action.payload,
			};
		case 'username':
			return {
				...state,
				username: action.payload,
			};
		case 'email':
			return {
				...state,
				email: action.payload,
			};
		case 'password':
			return {
				...state,
				password: action.payload,
			};
		case 'confirmPassword':
			return {
				...state,
				confirmPassword: action.payload,
			};
		default:
			return state;
	}
};

export const validate = (type, string) => {
	if (string === '') {
		return 'Required!';
	}

	if (type === 'email') {
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!regex.test(string)) {
			return 'Not a valid Email';
		} else {
			return null;
		}
	}

	if (type === 'password') {
		const hasSpecialChar = /[^a-zA-Z0-9]/;
		const hasLCaseChar = /[a-z]/;
		const hasUpperCase = /[A-Z]/;
		const hasNumber = /[0-9]/;

		if (string.length < 8) {
			return 'Password should be atleast 8 characters';
		} else if (
			!(
				hasSpecialChar.test(string) &&
				hasLCaseChar.test(string) &&
				hasUpperCase.test(string) &&
				hasNumber.test(string)
			)
		) {
			return '*Password must have uppercase letters, lowercase letters, numbers and special characters.';
		} else {
			return null;
		}
	}

	return null;
};

export const isDisabled = (state) => {
	if (state.confirmPassword.value !== state.password.value) {
		return true;
	}

	for (let key in state) {
		if (state[key].value.length > 0 && !state[key].error) {
			continue;
		} else {
			return true;
		}
	}

	return false;
};
