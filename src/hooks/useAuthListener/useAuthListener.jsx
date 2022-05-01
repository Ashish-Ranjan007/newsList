import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, useContext } from 'react';

import FirebaseContext from '../../context/firebase';

// Wrapper providing context for testing
export const FirebaseContextProvider = ({ firebase, children }) => (
	<FirebaseContext.Provider value={{ firebase }}>
		{children}
	</FirebaseContext.Provider>
);

/*
 * Subscribe to onAuthStateChanged listener from firebase
 * Return user object if user exists
 * Else return null.
 * Unsubscribe from onAuthStateChanged listener when the component unmounts
 */
function useAuthListener() {
	const { firebase } = useContext(FirebaseContext);
	const auth = getAuth(firebase);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	useEffect(() => {
		const unSubscribeAuth = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				localStorage.setItem('user', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				localStorage.removeItem('user');
				setUser(null);
			}
		});

		return () => unSubscribeAuth();
	}, [auth]);

	return { user };
}

export default useAuthListener;
