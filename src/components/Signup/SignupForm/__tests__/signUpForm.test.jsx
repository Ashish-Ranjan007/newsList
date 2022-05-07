import { describe, vi } from 'vitest';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import SignupForm from '../SignupForm';
import { render } from '../../../../../test-utils';

// Context values
const auth = {
	auth: {},
};
const firestore = {
	firestore: {},
};

// Mocks
vi.mock('firebase/auth', () => ({
	createUserWithEmailAndPassword: vi.fn(() => Promise.reject(true)),
}));
vi.mock('firebase/firestore', () => ({
	collection: vi.fn((firestore, user) => {}),
	addDoc: vi.fn((ref, userInfo) => Promise.resolve(true)),
}));
vi.mock('../../../../services/firebase', () => ({
	doesEmailExists: vi.fn(() => Promise.resolve(false)),
	doesUsernameExists: vi.fn(() => Promise.resolve(false)),
}));

const submitForm = () => {
	// Arrange
	const button = screen.getByText('Create Account');
	const fName = screen.getByLabelText('First Name');
	const lName = screen.getByLabelText('Last Name');
	const username = screen.getByLabelText('Username');
	const email = screen.getByLabelText('Email');
	const password = screen.getByLabelText('Password');
	const confirmPassword = screen.getByLabelText('Confirm Password');

	// Act
	fireEvent.change(fName, { target: { value: 'Ashish' } });
	fireEvent.change(lName, { target: { value: 'Ranjan' } });
	fireEvent.change(username, { target: { value: 'ashishranjan001' } });
	fireEvent.change(email, {
		target: { value: 'testuser7416@gmail.com' },
	});
	fireEvent.change(password, { target: { value: '12345678' } });
	fireEvent.change(confirmPassword, {
		target: { value: '12345678' },
	});
	fireEvent.click(button);
};

describe('signUpForm component', () => {
	it('should render a form', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});

	it('should have submit button disabled before user interacts for the first time', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		const button = screen.getByText('Create Account');

		// Assert
		await waitFor(() => {
			return expect(button).toBeDisabled();
		});
	});

	it('should call createUserWithEmailAndPassword when user submits', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		submitForm();

		// Assert
		await waitFor(() => {
			return expect(createUserWithEmailAndPassword).toHaveBeenCalled();
		});
	});

	it('should disable the submit button immediately after user submits the form', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		const button = screen.getByText('Create Account');
		submitForm();

		// Assert
		expect(button).toBeDisabled();
	});

	it('should enable the submit button after form submission is completed', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		const button = screen.getByText('Create Account');
		submitForm();

		// Assert
		await waitFor(() => expect(button).toBeEnabled());
	});

	it('should render error message when authentication fails', async () => {
		// Arrange
		render(<SignupForm />, { auth, firestore });
		submitForm();
		const registrationError = await screen.findByText(
			'*User not Registered. Please try again later.'
		);

		// Assert
		expect(registrationError).toBeInTheDocument();
	});
});
