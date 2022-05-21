import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Main = () => {
	const [toggle, setToggle] = useState(true);

	return (
		<div className="md:flex flex-row-reverse gap-2">
			<div className="w-full grow">
				<Header setToggle={setToggle} />
				<div className="h-content w-full p-2 overflow-y-auto">
					<Outlet />
				</div>
			</div>
			<div className="flex-none">
				<Sidebar toggle={toggle} />
			</div>
		</div>
	);
};

export default Main;
