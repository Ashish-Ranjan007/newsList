import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import ProtectedRoute from './helpers/ProtectedRoute';
import useAuthListener from './hooks/useAuthListener/useAuthListener';

const Password = lazy(() => import('./components/Password'));
const MyDetails = lazy(() => import('./components/MyDetails'));
const Interests = lazy(() => import('./components/Interests'));
const Followings = lazy(() => import('./components/Followings'));
const DeleteAccount = lazy(() => import('./components/DeleteAccount'));

const Main = lazy(() => import('./pages/Main'));
const HomePage = lazy(() => import('./pages/HomePage'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const SourcePage = lazy(() => import('./pages/SourcePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TopicSelectionPage = lazy(() => import('./pages/TopicSelectionPage'));

const App = () => {
	const { user } = useAuthListener();
	// console.log('user', user);

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
							<Main />
						</ProtectedRoute>
					}
				>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.TOPIC} element={<TopicPage />} />
					<Route path={ROUTES.SEARCH} element={<SearchPage />} />
					<Route path={ROUTES.SOURCE} element={<SourcePage />} />
					<Route path={ROUTES.PROFILE} element={<ProfilePage />}>
						<Route path="password" element={<Password />} />
						<Route path="interests" element={<Interests />} />
						<Route path="followings" element={<Followings />} />
						<Route
							path="delete-account"
							element={<DeleteAccount />}
						/>
						<Route index element={<MyDetails />} />
					</Route>
				</Route>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
};

export default App;
