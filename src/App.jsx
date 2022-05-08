import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import ProtectedRoute from './helpers/ProtectedRoute';
import useAuthListener from './hooks/useAuthListener/useAuthListener';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TopicSelectionPage = lazy(() => import('./pages/TopicSelectionPage'));

const App = () => {
	const { user } = useAuthListener();
	console.log(user);

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Routes>
				<Route
					path={ROUTES.LOGIN}
					element={
						<IsUserLoggedIn user={user} loggedInPath={ROUTES.HOME}>
							<LoginPage />
						</IsUserLoggedIn>
					}
				/>
				<Route
					path={ROUTES.SIGNUP}
					element={
						<IsUserLoggedIn user={user} loggedInPath={ROUTES.HOME}>
							<SignupPage />
						</IsUserLoggedIn>
					}
				/>
				<Route
					path={ROUTES.TOPIC_SELECTION}
					element={
						<ProtectedRoute user={user}>
							<TopicSelectionPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path={ROUTES.HOME}
					element={
						<ProtectedRoute user={user}>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
};

export default App;
