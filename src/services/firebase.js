import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { fisherYatesShuffle } from '../helpers/fisherYates';

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

export const getInterests = async (email, firestore) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);
	const docSnap = await getDoc(docRef);
	const result = docSnap.data().interests;

	fisherYatesShuffle(result);
	return result;
};

export const getFollowings = async (email, firestore) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);
	const docSnap = await getDoc(docRef);

	const result = docSnap.data().following;

	fisherYatesShuffle(result);
	return result;
};

export const getProfilePic = async (email, firestore) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);
	const docSnap = await getDoc(docRef);

	return [docSnap.data().profilePic, docSnap.data().username];
};

export const updateProfilePic = async (email, firestore, imageUrl) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);

	await updateDoc(docRef, {
		profilePic: imageUrl,
	});
};

export const updateEmailFirestore = async (email, firestore, newEmail) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);

	await updateDoc(docRef, {
		email: newEmail,
	});
};

export const updateUsername = async (email, firestore, username) => {
	const docId = await getDocId(email, firestore);
	const docRef = doc(firestore, 'users', docId);

	await updateDoc(docRef, {
		username: username,
	});
};
