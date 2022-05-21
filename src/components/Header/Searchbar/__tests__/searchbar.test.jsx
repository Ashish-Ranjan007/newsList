import { describe } from 'vitest';
import { screen } from '@testing-library/react';

import Searchbar from '../index';
import { render } from '../../../../../test-utils';

describe('Searchbar', () => {
	it('should render an input form', async () => {
		// Arrange
		render(<Searchbar />, {});
		const form = screen.getByRole('form');

		// Assert
		expect(form).toBeInTheDocument();
	});
});
