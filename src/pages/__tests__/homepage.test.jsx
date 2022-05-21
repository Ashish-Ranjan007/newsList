import { describe, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import HomePage from '../HomePage';
import { render } from '../../../test-utils';

// Context Values
const firestore = {
	firestore: {},
};

// Mock
global.IntersectionObserver = vi.fn(function () {
	this.observe = vi.fn();
	this.unobserve = vi.fn();
	this.disconnect = vi.fn();
});
vi.mock('../../lib/newsApi', () => ({
	getTopHeadlines: vi.fn(() =>
		Promise.resolve([
			{
				source: 'NDTV',
				isFollowing: false,
				urlToImage: '',
				title: '',
				url: '',
				description: 'lorem ipsum dolor sit amet',
				publishedAt: '',
				content: '',
			},
		])
	),
}));
vi.mock('../../services/firebase', () => ({
	getFollowings: vi.fn(() => Promise.resolve([])),
}));
vi.mock('../../helpers/formatResponse', () => ({
	formatResponse: vi.fn(() => [
		{
			source: 'NDTV',
			isFollowing: false,
			urlToImage: '',
			title: '',
			url: '',
			description: 'lorem ipsum dolor sit amet',
			publishedAt: '',
			content: '',
		},
	]),
}));

// Mock localStorage
Storage.prototype.getItem = vi.fn((key) => true);

describe('Home Page', () => {
	it('should fetch articles when user first render', async () => {
		// Arrange
		render(<HomePage />, { firestore });
		const source = await screen.findByText('NDTV');

		// Assert
		await waitFor(() => expect(source).toBeInTheDocument());
	});
});
