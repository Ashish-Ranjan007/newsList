import { Navigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

export default function IsUserLoggedIn({ user, children }) {
	if (!user) {
		return <Navigate to={ROUTES.LOGIN} />;
	}

	return children;
}
