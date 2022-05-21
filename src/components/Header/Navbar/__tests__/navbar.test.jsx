import { describe } from 'vitest';
import { screen } from '@testing-library/react';

import Navbar from '../';
import { render } from '../../../../../test-utils';

describe('Navbar', () => {
	it('should render a menubar', async () => {
		// Arrange
		render(<Navbar />, {});
		const menubar = screen.getByRole('menubar');

		// Assert
		expect(menubar).toBeInTheDocument();
	});
});
