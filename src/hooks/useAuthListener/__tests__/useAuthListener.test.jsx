import React from 'react';
import { describe, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import useAuthListener, { FirebaseContextProvider } from '../useAuthListener';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Mock firebase functions
vi.mock('firebase/auth', () => ({
	getAuth: vi.fn(() => Promise.resolve(true)),
	onAuthStateChanged: vi.fn(() => () => Promise.resolve(true)),
}));

describe('useAuthListener', () => {
	test('should call onAuthStateChanged when user object changes', async () => {
		// Arrange
		const firebase = { auth: true, user: true };
		const wrapper = ({ children }) => (
			<FirebaseContextProvider firebase={{ firebase }}>
				{children}
			</FirebaseContextProvider>
		);

		const { waitForNextUpdate } = renderHook(() => useAuthListener(), {
			wrapper,
		});

		waitForNextUpdate();

		// Assert
		expect(getAuth).toHaveBeenCalledTimes(1);
		expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
	});
});
