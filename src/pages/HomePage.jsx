import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

function Home() {
	const navigate = useNavigate();
	const { auth } = useContext(FirebaseContext);

	const handleClick = async () => {
		try {
			await signOut(auth);
			navigate('/login');
		} catch (error) {
			console.log(error.message);
		}
	};
	console.log('at home');
	return (
		<div>
			<button onClick={handleClick}>Signout</button>
		</div>
	);
}

export default Home;
