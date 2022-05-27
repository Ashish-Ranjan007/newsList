import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	signOut,
	updatePassword,
} from 'firebase/auth';

import FormControl from '../FormControl';
import FirebaseContext from '../../context/firebase';
import TextError from '../FormControl/TextError';

const Password = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const { auth } = useContext(FirebaseContext);

	const initialValues = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	};

	const validationSchema = Yup.object({
		oldPassword: Yup.string()
			.min(8, 'Password must have atleast 8 characters')
			.required('Required!'),
		newPassword: Yup.string()
			.min(8, 'Password must have atleast 8 characters')
			.required('Required!'),
		confirmNewPassword: Yup.string()
			.oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
			.required('Required!'),
	});

	const onSubmit = async (values) => {
		const userEmail = JSON.parse(localStorage.getItem('user')).email;
		const credentials = EmailAuthProvider.credential(
			userEmail,
			values.oldPassword
		);

		try {
			await reauthenticateWithCredential(auth.currentUser, credentials);
			updatePassword(auth.currentUser, values.newPassword);
			await signOut(auth).then(() => {
				localStorage.removeItem('user');
				navigate('/login');
			});
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};

	return (
		<div className="max-w-3xl">
			<Formik
				validateOnMount
				onSubmit={onSubmit}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<Form>
							<FormControl
								control="settingsInput"
								type="password"
								name="oldPassword"
								label="Old Password"
							/>
							<FormControl
								control="settingsInput"
								type="password"
								name="newPassword"
								label="New Password"
							/>
							<FormControl
								control="settingsInput"
								type="password"
								name="confirmNewPassword"
								label="Confirm New Password"
							/>
							{/* snackbar goes here */}
							{error && <TextError>Wrong Password</TextError>}
							<div className="w-full flex flex-row justify-end">
								<button
									type="submit"
									disabled={
										!formik.isValid || formik.isSubmitting
									}
									className={`w-32 bg-sky-blue text-white text-sm font-semibold p-2 rounded-lg ${
										!formik.isValid || formik.isSubmitting
											? 'select-none opacity-50'
											: ''
									}`}
								>
									Submit
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Password;
