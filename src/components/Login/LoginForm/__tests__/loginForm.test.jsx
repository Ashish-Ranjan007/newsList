import { it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from '../LoginForm';
import FirebaseContext from '../../../../context/firebase';
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
// Resolve promise in another file to test for when authentication passes
vi.mock('firebase/auth', () => ({
	signInWithEmailAndPassword: vi.fn(() => Promise.reject(true)),
}));

const auth = {
	auth: {
		authenticated: true,
	},
};

describe('LoginForm', () => {
	it('should render a form', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});

	it('should have submit button disabled before user interacts for the first time', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });

		// Assert
		await waitFor(() => {
			expect(screen.getByText('Submit')).toBeDisabled();
		});
	});

	it('should call signInWithEmailAndPassword when user submits', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Password');

		// Act
		fireEvent.change(emailInput, {
			target: { value: 'testuser123@gmail.com' },
		});
		fireEvent.change(passwordInput, { target: { value: '12345678' } });
		fireEvent.click(button);

		// Assert
		await waitFor(() => {
			expect(signInWithEmailAndPassword).toHaveBeenCalled();
		});
	});

	it('should disable the submit button immediately after user submits the form', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Password');

		// Act
		fireEvent.change(emailInput, {
			target: { value: 'testuser123@gmail.com' },
		});
		fireEvent.change(passwordInput, { target: { value: '12345678' } });
		fireEvent.click(button);

		// Assert
		expect(screen.getByText('Submit')).toBeDisabled();
	});

	it('it should enable the submit button after form submission is completed', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Password');

		// Act
		fireEvent.change(emailInput, {
			target: { value: 'testuser123@gmail.com' },
		});
		fireEvent.change(passwordInput, { target: { value: '12345678' } });
		fireEvent.click(button);

		// Assert
		await waitFor(() => {
			expect(screen.getByText('Submit')).toBeEnabled();
		});
	});

	it('should render error message when authentication fails', async () => {
		// Arrange
		customRender(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Password');

		// Act
		fireEvent.change(emailInput, {
			target: { value: 'testuser123@gmail.com' },
		});
		fireEvent.change(passwordInput, { target: { value: '12345678' } });
		fireEvent.click(button);

		// Arrange
		const loginError = await screen.findByText(
			'*Invalid Email or Password'
		);

		// Assert
		expect(loginError).toBeInTheDocument();
	});
});
