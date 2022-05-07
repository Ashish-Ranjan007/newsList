import { it, vi } from 'vitest';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import LoginForm from '../LoginForm';
import { render } from '../../../../../test-utils';

// Mock firebase functions
// Resolve promise in another file to test for when authentication passes
vi.mock('firebase/auth', () => ({
	signInWithEmailAndPassword: vi.fn(() => Promise.reject(true)),
}));

// Context Values
const auth = {
	auth: {
		authenticated: true,
	},
};

const submitForm = () => {
	// Arrange
	const button = screen.getByText('Submit');
	const emailInput = screen.getByLabelText('Email');
	const passwordInput = screen.getByLabelText('Password');

	// Act
	fireEvent.change(emailInput, {
		target: { value: 'testuser123@gmail.com' },
	});
	fireEvent.change(passwordInput, { target: { value: '12345678' } });
	fireEvent.click(button);
};

describe('LoginForm', () => {
	it('should render a form', async () => {
		// Arrange
		render(<LoginForm />, { auth });
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});

	it('should have submit button disabled before user interacts for the first time', async () => {
		// Arrange
		render(<LoginForm />, { auth });

		// Assert
		await waitFor(() => expect(screen.getByText('Submit')).toBeDisabled());
	});

	it('should call signInWithEmailAndPassword when user submits', async () => {
		// Arrange
		render(<LoginForm />, { auth });
		submitForm();

		// Assert
		await waitFor(() => {
			expect(signInWithEmailAndPassword).toHaveBeenCalled();
		});
	});

	it('should disable the submit button immediately after user submits the form', async () => {
		// Arrange
		render(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		submitForm();

		// Assert
		expect(screen.getByText('Submit')).toBeDisabled();
	});

	it('it should enable the submit button after form submission is completed', async () => {
		// Arrange
		render(<LoginForm />, { auth });
		const button = screen.getByText('Submit');
		submitForm();

		// Assert
		await waitFor(() => {
			expect(button).toBeEnabled();
		});
	});

	it('should render error message when authentication fails', async () => {
		// Arrange
		render(<LoginForm />, { auth });
		submitForm();
		const loginError = await screen.findByText(
			'*Invalid Email or Password'
		);

		// Assert
		expect(loginError).toBeInTheDocument();
	});
});
