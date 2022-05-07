import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import FirebaseContext from './src/context/firebase';

// This is to supress formik bug warning
const originalError = console.error;
beforeAll(() => {
	console.error = (...args) => {
		if (/Warning.*not wrapped in act/.test(args[0])) {
			return;
		}
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});

const customRender = (ui, { providerProps }) => {
	return render(
		<BrowserRouter>
			<FirebaseContext.Provider value={{ providerProps }}>
				{ui}
			</FirebaseContext.Provider>
		</BrowserRouter>
	);
};

// override render export
export { customRender as render };
