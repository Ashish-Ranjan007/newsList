import React from 'react';
import { describe, expect, vi } from 'vitest';
import { onAuthStateChanged } from 'firebase/auth';
import { renderHook } from '@testing-library/react';

import useAuthListener, { FirebaseContextProvider } from '../useAuthListener';

// Mock firebase functions
vi.mock('firebase/auth', () => ({
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
		const { result } = renderHook(() => useAuthListener(), {
			wrapper,
		});

		// Assert
		expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
	});
});
