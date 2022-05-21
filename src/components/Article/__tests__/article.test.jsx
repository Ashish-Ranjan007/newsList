import { describe, vi } from 'vitest';
import { updateDoc } from 'firebase/firestore';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import Article from '../index';
import { render } from '../../../../test-utils';

// Context Values
const firestore = {
	firestore: {},
};

// Prop
const article = {
	source: '',
	isFollowing: false,
	urlToImage: '',
	title: '',
	url: '',
	description: '',
	publishedAt: '',
	content: '',
};

// Mocks
vi.mock('firebase/firestore', () => ({
	updateDoc: vi.fn((auth) => Promise.resolve(true)),
	doc: vi.fn(() => Promise.resolve(true)),
	arrayUnion: vi.fn(() => Promise.resolve(true)),
}));
vi.mock('../../../services/firebase', () => ({
	getDocId: vi.fn((email, firestore) => Promise.resolve(true)),
}));

// Mock localStorage
Storage.prototype.getItem = vi.fn((key) => true);

describe('Article', () => {
	it('should call updateDoc when user clicks follow', async () => {
		// Arrange
		render(<Article article={article} />, { firestore });
		const followBtn = screen.getByRole('button');

		// Act
		fireEvent.click(followBtn);

		// Assert
		await waitFor(() => expect(updateDoc).toHaveBeenCalled());
	});
});
