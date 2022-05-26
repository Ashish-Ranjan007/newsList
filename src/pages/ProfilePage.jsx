import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingsNav from '../components/SettingsNav';

const ProfilePage = () => {
	return (
		<div>
			<h1 className="text-2xl font-medium tracking-wider m-2.5">
				Profile Settings
			</h1>
			<SettingsNav />
			<Outlet />
		</div>
	);
};

export default ProfilePage;
