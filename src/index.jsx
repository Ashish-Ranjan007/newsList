import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './styles/index.css';
import { auth, firestore } from './lib/firebase';
import FirebaseContext from './context/firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
	<FirebaseContext.Provider value={{ auth, firestore }}>
		<Router>
			<App />
		</Router>
	</FirebaseContext.Provider>
);
