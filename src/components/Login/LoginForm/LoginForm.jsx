import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import * as ROUTES from '../../../constants/routes';
import FirebaseContext from '../../../context/firebase';

const LoginForm = () => {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);
	const auth = getAuth(firebase);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [loginError, setLoginError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const validate = (string, type) => {
		if (type === 'email' && string === '') {
			setEmailError('Required!');
		} else if (
			type === 'email' &&
			!new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').test(string)
		) {
			setEmailError('Not a valid Email');
		} else {
			setEmailError('');
		}

		if (type === 'password' && string.length === 0) {
			setPasswordError('Required!');
		} else if (type === 'password' && string.length < 8) {
			setPasswordError('Password must be atleast 8 characters long');
		} else {
			setPasswordError('');
		}

		setLoginError('');
	};

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate(ROUTES.HOME, { replace: true });
		} catch (error) {
			setEmail('');
			setPassword('');
			setLoginError('Invalid Email or Password');
		}
	};

	return (
		<div className="font-body text-base text-gray-400 font-medium tracking-wide flex flex-col justify-around w-full lg:w-11/12 xl:w-4/5">
			<form role="form">
				<div className=" mb-4">
					<label htmlFor="username">Email</label>
					<input
						className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
						type="text"
						name="username"
						id="username"
						placeholder="Email"
						required
						aria-required="true"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={() => validate(email, 'email')}
					/>
					<p className="text-xs text-red-600 font-normal">
						{emailError !== '' && emailError}
					</p>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						className="p-2 rounded-lg border-2 border-gray-400 w-full text-xs"
						type="password"
						name="username"
						id="password"
						placeholder="Password"
						required
						aria-required="true"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onBlur={() => validate(password, 'password')}
					/>
					<p className="text-xs text-red-600 font-normal">
						{passwordError !== '' && passwordError}
					</p>
					<p className="text-xs text-red-600 font-normal">
						{loginError !== '' && loginError}
					</p>
				</div>
			</form>
			<p role="link" className="text-right text-sky-blue my-2">
				Forgot Password
			</p>
			<button
				type="submit"
				className="w-full bg-sky-blue text-white text-xl font-semibold p-2 rounded-lg"
				onClick={handleLogin}
			>
				Log In
			</button>
			<p className="my-2 text-center">
				Don't have an account ?
				<span
					role="link"
					aria-label="Signup if you don't already have an account"
					className="text-sky-blue text-lg cursor-pointer ml-1"
				>
					Sign Up
				</span>
			</p>
		</div>
	);
};

export default LoginForm;
