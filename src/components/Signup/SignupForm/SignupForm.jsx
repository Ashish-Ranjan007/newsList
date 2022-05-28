import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import {
	doesEmailExists,
	doesUsernameExists,
} from '../../../services/firebase';
import FormControl from '../../FormControl';
import TextError from '../../FormControl/TextError';
import FirebaseContext from '../../../context/firebase';

const SignupForm = () => {
	const navigate = useNavigate();
	const [signUpError, setSignUpError] = useState(false);
	const { auth, firestore } = useContext(FirebaseContext);

	const initialValues = {
		fName: '',
		lName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object({
		fName: Yup.string().required('Required!'),
		lName: Yup.string().required('Required!'),
		username: Yup.string().required('Required!'),
		email: Yup.string().email('Invalid Email Format').required('Required!'),
		password: Yup.string()
			.min(8, 'Password must have atleast 8 characters')
			.required('Required!'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], 'Passwords must match')
			.required('Required!'),
	});

	const onSubmit = async (values, onSubmitProps) => {
		const usernameExists = await doesUsernameExists(
			values.username,
			firestore
		);
		const emailExists = await doesEmailExists(values.email, firestore);

		if (usernameExists) {
			onSubmitProps.setFieldError('username', 'Username is taken');
			onSubmitProps.setSubmitting(false);
		} else if (emailExists) {
			onSubmitProps.setFieldError('email', 'Email already exists');
			onSubmitProps.setSubmitting(false);
		} else {
			try {
				const createdUser = await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);
				const colRef = collection(firestore, 'users');
				await addDoc(colRef, {
					userId: createdUser.user.uid,
					username: values.username.toLowerCase(),
					email: values.email,
					firstName: values.fName,
					lastName: values.lName,
					followings: [],
					interests: [],
					savedArticles: [],
					profilePic: '',
					dateCreated: Date.now(),
				});
				navigate('/topic-selection', { replace: true });
			} catch (error) {
				setSignUpError(true);
				setTimeout(() => {
					setSignUpError(false);
				}, 10000);
				onSubmitProps.setSubmitting(false);
			}
		}
	};

	return (
		<div className="font-body text-base text-gray-400 font-medium tracking-wide flex flex-col justify-around w-full">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				validateOnMount
			>
				{(formik) => {
					return (
						<Form role="form" className="mb-2 text-xs">
							<div className="lg:flex lg:flex-row lg:justify-between">
								<div className="lg:w-full lg:mr-4">
									<FormControl
										control="input"
										name="fName"
										label="First Name"
									/>
								</div>
								<div className="lg:w-full">
									<FormControl
										control="input"
										name="lName"
										label="Last Name"
									/>
								</div>
							</div>
							<div className="lg:flex lg:flex-row lg:justify-between">
								<div className="lg:w-full lg:mr-4">
									<FormControl
										control="input"
										name="username"
										label="Username"
									/>
								</div>
								<div className="lg:w-full">
									<FormControl
										control="input"
										type="email"
										name="email"
										label="Email"
									/>
								</div>
							</div>
							<div className="lg:flex lg:flex-row lg:justify-between">
								<div className="lg:w-full lg:mr-4">
									<FormControl
										control="input"
										type="password"
										name="password"
										label="Password"
									/>
								</div>
								<div className="lg:w-full">
									<FormControl
										control="input"
										type="password"
										name="confirmPassword"
										label="Confirm Password"
									/>
								</div>
							</div>
							<button
								type="submit"
								disabled={
									!formik.isValid || formik.isSubmitting
								}
								className={`w-40 bg-sky-blue text-white text-sm font-semibold p-3 rounded-lg ${
									!formik.isValid || formik.isSubmitting
										? 'select-none opacity-50'
										: ''
								}`}
							>
								Create Account
							</button>
						</Form>
					);
				}}
			</Formik>

			{signUpError && (
				<TextError>
					*User not Registered. Please try again later.
				</TextError>
			)}

			<p className="my-4 lg:my-2 text-xs">
				Already have an account ?
				<Link
					to="/login"
					role="link"
					aria-label="Signup if you don't already have an account"
					className="text-sky-blue cursor-pointer ml-1 text-sm"
				>
					Log In
				</Link>
			</p>
		</div>
	);
};

export default SignupForm;
