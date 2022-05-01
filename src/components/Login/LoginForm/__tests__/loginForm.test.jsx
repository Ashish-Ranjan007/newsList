import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import FirebaseContext from '../../../../context/firebase';
import { vi } from 'vitest';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
	signInWithEmailAndPassword: vi.fn(() => Promise.resolve(true)),
}));

const firebase = {
	firebase: {
		authenticated: true,
	},
};

describe('LoginForm', () => {
	it('should render the component', async () => {
		// Arrange
		customRender(<LoginForm />, { firebase });
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});

	it('should call signInWithEmailAndPassword when user exist', async () => {
		// Arrange
		customRender(<LoginForm />, { firebase });
		const button = screen.getByRole('button');

		// Act
		fireEvent.click(button);

		// Assert
		expect(signInWithEmailAndPassword).toHaveBeenCalled(1);
	});
});
