import { useNavigate } from 'react-router-dom';
import { signOut, updateEmail } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import {
	doesEmailExists,
	doesUsernameExists,
	getProfilePic,
} from '../../services/firebase';
import {
	updateUsername,
	updateProfilePic,
	updateEmailFirestore,
} from '../../services/firebase';
import ToastContext from '../../context/toast';
import TextError from '../FormControl/TextError';
import FirebaseContext from '../../context/firebase';
import { getColor } from '../../helpers/colorPicker';

const MyDetails = () => {
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState(null);
	const [username, setUsername] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	const { notify } = useContext(ToastContext);
	const { auth, firestore, storage } = useContext(FirebaseContext);
	const userEmail = JSON.parse(localStorage.getItem('user')).email;

	useEffect(() => {
		getProfilePic(userEmail, firestore).then((res) => {
			setProfilePic(res[0]);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsDisabled(true);

		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (image) {
			const imageRef = ref(storage, image.name);
			const uploadTask = uploadBytesResumable(imageRef, image);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				},
				(error) => {
					setError(error.message);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							updateProfilePic(userEmail, firestore, downloadURL);
						}
					);
				}
			);
		}

		if (username.length > 0) {
			const userNameExists = await doesUsernameExists(
				username,
				firestore
			);
			console.log(userNameExists);

			if (userNameExists) {
				setError('Username Exists');
				setIsDisabled(false);
				return;
			}

			updateUsername(userEmail, firestore, username);
		}

		if (email.length > 5 && regex.test(email)) {
			const userEmailExists = await doesEmailExists(userEmail, firestore);

			if (userEmailExists) {
				setError('Email already exists');
				setIsDisabled(false);
				return;
			}

			updateEmail(auth.currentUser, email)
				.then(() => {
					updateEmailFirestore(userEmail, firestore, email);
					signOut(auth).then(() => {
						localStorage.removeItem('user');
						navigate('/login');
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
		notify('Details has been updated!');
		setIsDisabled(false);
		navigate('/');
	};

	return (
		<div>
			<form role="form" className="max-w-2xl" onSubmit={handleSubmit}>
				<div className="mb-4 md:flex items-center">
					{profilePic.length > 0 ? (
						<div className="md:w-32 md:mr-8 md:flex justify-end">
							<img
								className="w-8 h-8 rounded-full"
								src={profilePic}
								alt="profile pic"
							/>
						</div>
					) : (
						<div className="md:w-32 md:mr-8 md:flex justify-end">
							<div
								style={{
									backgroundColor: getColor(userEmail[0]),
								}}
								className="flex justify-center items-center text-white font-bold icon rounded-full"
							>
								{userEmail[0]?.toUpperCase()}
							</div>
						</div>
					)}
					<div className="w-full md:max-w-lg md:ml-8 py-2 text-xs">
						<label
							htmlFor="image"
							className="font-medium text-base text-sky-blue cursor-pointer transition hover:opacity-50"
						>
							Change Profile Picture
						</label>
						<input
							type="file"
							accept="image/*"
							id="image"
							onChange={(e) => {
								setError(false);
								setImage(e.target.files[0]);
							}}
						/>
						{image && (
							<span className="ml-2 text-font-gray">
								{image.name}
							</span>
						)}
					</div>
				</div>
				<div className="mb-4 md:flex justify-center items-center">
					<label
						className="md:w-32 md:mr-8 text-right font-medium tracking-wider"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="w-full md:max-w-lg md:ml-8 p-2 rounded-lg border-2 border-gray-400 text-xs"
						id="username"
						value={username}
						onChange={(e) => {
							setError(false);
							setUsername(e.target.value);
						}}
					/>
				</div>
				<div className="mb-4 md:flex justify-center items-center">
					<label
						className="md:w-32 md:mr-8 text-right font-medium tracking-wider"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="w-full md:max-w-lg md:ml-8 p-2 rounded-lg border-2 border-gray-400 text-xs"
						id="email"
						value={email}
						onChange={(e) => {
							setError(false);
							setEmail(e.target.value);
						}}
					/>
				</div>
				{error && <TextError>{error}</TextError>}
				<div className="w-full flex flex-row justify-end">
					<button
						type="submit"
						disabled={isDisabled}
						className={`w-32 bg-sky-blue text-white text-sm font-semibold p-2 rounded-lg ${
							isDisabled ? 'select-none opacity-50' : ''
						}`}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default MyDetails;
