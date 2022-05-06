import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB6LTBnH-K3W2dUFM7cS0F4J1kQIn6zdSs',
	authDomain: 'newslist-f36de.firebaseapp.com',
	projectId: 'newslist-f36de',
	storageBucket: 'newslist-f36de.appspot.com',
	messagingSenderId: '960144027270',
	appId: '1:960144027270:web:c8fa99108053bd0e52ab07',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
