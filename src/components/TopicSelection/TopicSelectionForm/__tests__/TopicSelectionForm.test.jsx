import { describe, vi } from 'vitest';
import { updateDoc } from 'firebase/firestore';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { render } from '../../../../../test-utils';
import TopicSelectionForm from '../TopicSelectionForm';

// Context Values
const firestore = {
	firestore: {},
};

// Mocks
vi.mock('firebase/firestore', () => ({
	doc: vi.fn((firestore, collection, docId) => Promise.resolve(true)),
	updateDoc: vi.fn((docRef, updatedData) => Promise.resolve(true)),
}));
vi.mock('../../../../services/firebase', () => ({
	getDocId: vi.fn((email, firestore) => Promise.resolve(true)),
	func: vi.fn(() => 1),
}));
// Mock localStorage
Storage.prototype.getItem = vi.fn((key) => true);

const submit = () => {
	// Arrange
	const topicBtn = screen.getByText(/Agriculture/);
	const continueBtn = screen.getByText(/Continue/);

	// Act
	fireEvent.click(topicBtn);
	fireEvent.click(continueBtn);
};

describe('Topic Selection Form', () => {
	test('should call updateDoc when user clicks continue', async () => {
		render(<TopicSelectionForm />, { firestore });
		submit();

		// Assert
		await waitFor(() => expect(updateDoc).toHaveBeenCalled());
	});

	test('should disable the continue button once user clicks it', async () => {
		render(<TopicSelectionForm />, { firestore });
		submit();
		const continueBtn = screen.getByText(/Continue/);

		// Assert
		expect(continueBtn).toBeDisabled();
	});
});
