import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

import FormControl from '../FormControl';
import FirebaseContext from '../../context/firebase';
import { checkboxOptions } from '../../helpers/checkboxOptions';
import { getDocId, getInterests } from '../../services/firebase';

const Interests = () => {
	const navigate = useNavigate();
	const [interests, setInterests] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const { firestore } = useContext(FirebaseContext);
	const userEmail = JSON.parse(localStorage.getItem('user')).email;

	useEffect(() => {
		getInterests(userEmail, firestore).then((res) => {
			setInterests(res);
		});
	}, []);

	const initialValues = {
		interests: [],
	};

	const onSubmit = async (values) => {
		setIsDisabled(true);

		try {
			const docId = await getDocId(userEmail, firestore);
			const docRef = doc(firestore, 'users', docId);
			await updateDoc(docRef, {
				interests: [...values.interests],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsDisabled(false);
			navigate('/');
		}
	};

	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{(formik) => {
					return (
						<Form>
							<FormControl
								control="checkboxGroup"
								label="Interests"
								name="interests"
								interests={interests}
								options={checkboxOptions}
							/>
							<button
								disabled={isDisabled ? true : false}
								className={`py-2 px-4 ml-2 mt-4 bg-sky-blue text-white text-sm font-semibold rounded-lg hover:opacity-50 transition-all ${
									isDisabled ? 'opacity-50' : ''
								}`}
								type="submit"
							>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Interests;
