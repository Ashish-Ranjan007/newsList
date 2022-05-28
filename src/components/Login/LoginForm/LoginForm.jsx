import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import FormControl from '../../FormControl';
import TextError from '../../FormControl/TextError';
import FirebaseContext from '../../../context/firebase';

const LoginForm = () => {
	const navigate = useNavigate();
	const { auth } = useContext(FirebaseContext);
	const [loginError, setLoginError] = useState(false);

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid Email Format').required('Required!'),
		password: Yup.string()
			.min(8, 'Password must have atleast 8 characters')
			.required('Required!'),
	});

	const onSubmit = async (values, onSubmitProps) => {
		try {
			const authUser = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);

			navigate('/', { replace: true });
		} catch (error) {
			setLoginError(true);
			setTimeout(() => {
				setLoginError(false);
			}, 10000);
			onSubmitProps.setSubmitting(false);
		}
	};

	return (
		<div className="font-body text-base text-gray-400 font-medium tracking-wide flex flex-col justify-around lg:w-3/4">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				validateOnMount
			>
				{(formik) => {
					return (
						<Form className="mb-2 text-xs" role="form">
							<FormControl
								control="input"
								type="email"
								name="email"
								label="Email"
							/>
							<FormControl
								control="input"
								type="password"
								name="password"
								label="Password"
							/>
							<button
								type="submit"
								disabled={
									!formik.isValid || formik.isSubmitting
								}
								className={`w-full bg-sky-blue text-white text-sm font-semibold p-2 rounded-lg ${
									!formik.isValid || formik.isSubmitting
										? 'select-none opacity-50'
										: ''
								}`}
							>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>

			{loginError && <TextError>*Invalid Email or Password</TextError>}

			<p className="my-2 text-center text-xs">
				Don't have an account ?
				<Link
					to="/signup"
					role="link"
					aria-label="Signup if you don't already have an account"
					className="text-sky-blue cursor-pointer ml-1 text-sm"
				>
					Sign Up
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
