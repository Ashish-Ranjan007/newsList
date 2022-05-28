import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ToastContext from '../context/toast';

const Main = () => {
	const [toggle, setToggle] = useState(true);

	const notify = (message) =>
		toast(message, { position: toast.POSITION.BOTTOM_LEFT });

	return (
		<ToastContext.Provider value={{ notify }}>
			<div className="md:flex flex-row-reverse gap-2">
				<div className="w-full grow">
					<Header setToggle={setToggle} />
					<div className="h-content w-full p-2 overflow-y-auto">
						<Outlet />
						<ToastContainer />
					</div>
				</div>
				<div className="flex-none">
					<Sidebar toggle={toggle} />
				</div>
			</div>
		</ToastContext.Provider>
	);
};

export default Main;
