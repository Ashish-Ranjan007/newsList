import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

import Drawer from './Drawer';
import Followings from './Followings';

const Sidebar = ({ toggle }) => {
	const [extended, setExtended] = useState(true);
	return (
		<>
			<div className="md:hidden">
				<div
					className={`sidebar-position h-sidebar flex flex-col gap-6 w-full xs:min-w-fit xs:max-w-xs border-r-2 text-2xl font-medium xs:shadow-2xl transition-transform bg-white ${
						toggle ? '-translate-x-full' : ''
					}`}
				>
					<Drawer />
					<Followings />
					<button className="flex items-center gap-5 p-4 border-t-2 font-medium hover:bg-slate-200 transition-colors">
						<AiOutlineLogout className="icon" size={24} />
						Logout
					</button>
				</div>
			</div>
			<div className="hidden md:block bg-white">
				<div className="flex flex-col gap-6 max-w-xs h-screen text-sm font-medium tracking-wide shadow">
					<Drawer extended={extended} setExtended={setExtended} />
					<Followings extended={extended} />
					<button className="flex items-center p-2 gap-2 border-t-2 font-medium hover:bg-slate-200 transition-colors">
						<AiOutlineLogout className="icon" size={24} />
						{extended ? 'Logout' : ''}
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
