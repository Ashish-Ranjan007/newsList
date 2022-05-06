import React, { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import {
	doesEmailExists,
	doesUsernameExists,
} from '../../../services/firebase';
import {
	reducer,
	initialState,
	validate,
	isDisabled,
} from '../../../helpers/signUpFormHelpers';
import * as ROUTES from '../../../constants/routes';
import FirebaseContext from '../../../context/firebase';

const SignupForm = () => {
	const navigate = useNavigate();
	const { auth, firestore } = useContext(FirebaseContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleBlur = (type, event) => {
		const errorState = validate(type, event.target.value);

		if (type === 'confirmPassword' && event.target.value !== '') {
			if (event.target.value !== state.password.value) {
				dispatch({
					type: type,
					payload: {
						value: state.confirmPassword.value,
						error: 'Password does not match',
					},
				});
			} else {
				dispatch({
					type: type,
					payload: {
						value: state.confirmPassword.value,
						error: null,
					},
				});
			}
		} else {
			dispatch({
				type: type,
				payload: { value: state[`${type}`].value, error: errorState },
			});
		}
	};

	const handleChange = (type, event) => {
		dispatch({
			type: type,
			payload: {
				value: event.target.value,
				error: null,
			},
		});
	};

	const handleLogin = async () => {
		const usernameExists = await doesUsernameExists(
			state.username.value,
			firestore
		);
		const emailExists = await doesEmailExists(state.email.value, firestore);

		if (usernameExists) {
			dispatch({
				type: 'username',
				payload: {
					value: state.username.value,
					error: 'Username already exists',
				},
			});
		} else if (emailExists) {
			dispatch({
				type: 'email',
				payload: {
					value: state.email.value,
					error: 'This Email is already in use',
				},
			});
		} else {
			try {
				const createdUser = await createUserWithEmailAndPassword(
					auth,
					state.email.value,
					state.password.value
				);

				const colRef = collection(firestore, 'users');
				await addDoc(colRef, {
					userId: createdUser.user.uid,
					username: state.username.value.toLowerCase(),
					email: state.email.value,
					firstName: state.fName.value,
					lastName: state.lName.value,
					followers: [],
					following: [],
					savedArticles: [],
					likedArticles: [],
					likedComments: [],
					comments: [],
					replies: [],
					notifications: [],
					dateCreated: Date.now(),
				});
			} catch (error) {}
		}
	};

	return (
		<div className="font-body text-base text-gray-400 font-medium tracking-wide flex flex-col justify-around w-full">
			<form role="form" className="2xl:w-11/12 mb-4 text-xs">
				<div className="lg:flex lg:flex-row mb-2">
					<div className="lg:w-full lg:mr-4 mb-2">
						<label htmlFor="username">First Name</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.fName.value}
							onChange={(e) => handleChange('fName', e)}
							onBlur={(e) => handleBlur('fName', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.fName.error}
						</p>
					</div>
					<div className="lg:w-full mb-2">
						<label htmlFor="username">Last Name</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.lName.value}
							onChange={(e) => handleChange('lName', e)}
							onBlur={(e) => handleBlur('lName', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.lName.error}
						</p>
					</div>
				</div>
				<div className="lg:flex lg:flex-row mb-2">
					<div className="lg:w-full lg:mr-4 mb-2">
						<label htmlFor="username">Username</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.username.value}
							onChange={(e) => handleChange('username', e)}
							onBlur={(e) => handleBlur('username', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.username.error}
						</p>
					</div>
					<div className="lg:w-full mb-2">
						<label htmlFor="username">Email</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.email.value}
							onChange={(e) => handleChange('email', e)}
							onBlur={(e) => handleBlur('email', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.email.error}
						</p>
					</div>
				</div>
				<div className="lg:flex lg:flex-row mb-2">
					<div className="lg:w-full lg:mr-4 mb-2">
						<label htmlFor="username">Password</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.password.value}
							onChange={(e) => handleChange('password', e)}
							onBlur={(e) => handleBlur('password', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.password.error}
						</p>
					</div>
					<div className="lg:w-full mb-2">
						<label htmlFor="username">Confirm Password</label>
						<input
							className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
							type="text"
							name="username"
							id="username"
							required
							aria-required="true"
							value={state.confirmPassword.value}
							onChange={(e) => handleChange('confirmPassword', e)}
							onBlur={(e) => handleBlur('confirmPassword', e)}
						/>
						<p className="text-xs text-red-600 font-normal">
							{state.confirmPassword.error}
						</p>
					</div>
				</div>
			</form>

			<button
				type="submit"
				className={`w-52 bg-sky-blue text-white text-sm font-semibold p-4 rounded-lg ${
					isDisabled(state)
						? 'select-none pointer-events-none opacity-50'
						: ''
				}`}
				onClick={handleLogin}
			>
				Create Account
			</button>

			<p className="my-4 lg:my-2 text-xs">
				Already have an account ?
				<span
					role="link"
					aria-label="Signup if you don't already have an account"
					className="text-sky-blue cursor-pointer ml-1 text-sm"
					onClick={() => navigate(ROUTES.LOGIN)}
				>
					Login In
				</span>
			</p>
		</div>
	);
};

export default SignupForm;

/*
 *Validate Every field (done)
 *On Blur validate (done)
 *if invalid display error below input field (done)
 *Create Account button should be unclickable from the start (done)
 *Once every field is validated button should be clickable (done)
 *Before creating a new account check if another user with same name exist (done)
 *if it does display an error under username (done)
 *Remove any error from a field once user inputs into it (done)
 */
