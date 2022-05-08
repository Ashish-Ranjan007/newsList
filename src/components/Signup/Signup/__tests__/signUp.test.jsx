import { describe } from 'vitest';
import { screen } from '@testing-library/react';

import Signup from '../Signup';
import { render } from '../../../../../test-utils';

// Context Values
const auth = {
	auth: {},
};
const firestore = {
	firestore: {},
};

describe('signUp component', () => {
	it('should render a heading element', async () => {
		// Arrange
		render(<Signup />, { auth, firestore });
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});
});
