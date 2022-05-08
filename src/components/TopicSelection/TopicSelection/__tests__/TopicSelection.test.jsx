import { render } from '../../../../../test-utils';
import TopicSelection from '../TopicSelection';
import { screen } from '@testing-library/react';

const firestore = {
	firestore: {},
};

describe('Topic Selection', () => {
	it('should render a heading', async () => {
		render(<TopicSelection />, { firestore });
		const heading = screen.getByText('Select Interests');

		expect(heading).toBeInTheDocument();
	});
});
