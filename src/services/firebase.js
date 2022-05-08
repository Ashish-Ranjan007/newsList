import { collection, getDocs, query, where } from 'firebase/firestore';

export const doesUsernameExists = async (username, firestore) => {
	const colRef = collection(firestore, 'users');

	const q = query(colRef, where('username', '==', username));
	const querySnapshot = await getDocs(q);

	const result = querySnapshot.docs.map((doc) => {
		if (doc.data().username === username) {
			return true;
		}
	});

	return result.length > 0 ? true : false;
};

export const doesEmailExists = async (email, firestore) => {
	const colRef = collection(firestore, 'users');

	const q = query(colRef, where('email', '==', email));
	const querySnapshot = await getDocs(q);

	const result = querySnapshot.docs.map((doc) => {
		if (doc.data().email === email) {
			return true;
		}
	});

	return result.length > 0 ? true : false;
};

export const getDocId = async (email, firestore) => {
	const colRef = collection(firestore, 'users');
	const q = query(colRef, where('email', '==', email));
	const querySnapshot = await getDocs(q);

	let result;
	querySnapshot.docs.forEach((doc) => {
		if (doc.data().email === email) {
			result = doc.id;
		}
	});

	return result;
};
