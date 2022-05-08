import { vi } from 'vitest';
import { screen } from '@testing-library/react';

import Login from '../Login';
import { render } from '../../../../../test-utils';

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
		render(<Login />, { firebase });
		const main = screen.getByRole('main');

		// Assert
		expect(main).toBeInTheDocument();
	});
});
