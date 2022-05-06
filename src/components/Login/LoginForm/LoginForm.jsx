import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import FormControl from '../../FormControl';
import * as ROUTES from '../../../constants/routes';
import FirebaseContext from '../../../context/firebase';
import TextError from '../../FormControl/TextError';

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
			await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			navigate(ROUTES.HOME, { replace: true });
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
				<span
					role="link"
					aria-label="Signup if you don't already have an account"
					className={`text-sky-blue cursor-pointer ml-1 text-sm`}
					onClick={() => navigate(ROUTES.SIGNUP)}
				>
					Sign Up
				</span>
			</p>
		</div>
	);
};

export default LoginForm;
