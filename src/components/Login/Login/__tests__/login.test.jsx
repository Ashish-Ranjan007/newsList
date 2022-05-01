import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import FirebaseContext from '../../../../context/firebase';
import { vi } from 'vitest';

const customRender = (ui, { providerProps }) => {
	return render(
		<BrowserRouter>
			<FirebaseContext.Provider value={{ providerProps }}>
				{ui}
			</FirebaseContext.Provider>
		</BrowserRouter>
	);
};

// Mock firebase functions
vi.mock('firebase/auth', () => ({
	getAuth: vi.fn(() => Promise.resolve(true)),
}));

const firebase = {
	firebase: {
		authenticated: true,
	},
};

describe('LoginForm', () => {
	it('should render the component', async () => {
		// Arrange
		customRender(<Login />, { firebase });
		const main = screen.getByRole('main');

		// Assert
		expect(main).toBeInTheDocument();
	});
});
