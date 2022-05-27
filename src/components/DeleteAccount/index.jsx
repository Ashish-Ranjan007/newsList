import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import {
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';

import FormControl from '../FormControl';
import { getDocId } from '../../services/firebase';
import TextError from '../FormControl/TextError';
import FirebaseContext from '../../context/firebase';
import { deleteDoc } from 'firebase/firestore';

const DeleteAccount = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [errorMesssage, setErrorMessage] = useState('');
	const { auth, firestore } = useContext(FirebaseContext);

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

	const onSubmit = async (values) => {
		setIsDisabled(true);
		const docId = await getDocId(values.email, firestore);
		const docRef = doc(firestore, 'users', docId);
		const credentials = EmailAuthProvider.credential(
			values.email,
			values.password
		);

		try {
			await reauthenticateWithCredential(auth.currentUser, credentials);
			await deleteUser(auth.currentUser);
			await deleteDoc(docRef);

			localStorage.removeItem('user');
			navigate('/login');
		} catch (error) {
			setError(true);
			if (error.code === 'auth/user-mismatch') {
				setErrorMessage('Credentials does not match!');
			} else {
				setErrorMessage('Cannot delete user now!');
			}
		}

		setIsDisabled(false);
	};

	return (
		<div className="max-w-lg">
			<h1 className="text-lg text-light-red font-medium tracking-wider">
				Are you sure you want to delete this account?
			</h1>
			<aside className="mt-5 text-sm">
				This action cannot be undone. This will permanently delete all
				information related to your account on our platform.
			</aside>
			<p className="my-5 text-sm">
				Please fill-in the required information to continue.
			</p>
			<Formik
				onSubmit={onSubmit}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<Form className="text-base font-medium text-gray-400 tracking-wider">
							<FormControl
								type="email"
								control="input"
								name="email"
								label="Email"
							/>
							<FormControl
								type="password"
								control="input"
								name="password"
								label="Password"
							/>
							<button
								type="submit"
								disabled={isDisabled ? true : false}
								className="w-full my-2 px-4 py-2 text-light-red tracking-wider border border-light-red rounded-lg transition-all hover:bg-light-red hover:text-white"
							>
								Delete this Account
							</button>
						</Form>
					);
				}}
			</Formik>
			{error && <TextError>{errorMesssage}</TextError>}
		</div>
	);
};

export default DeleteAccount;
