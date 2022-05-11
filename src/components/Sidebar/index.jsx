import React, { useState } from 'react';
import Followings from './Followings';
import Drawer from './Drawer';
import { AiOutlineLogout } from 'react-icons/ai';

const Sidebar = ({ toggle }) => {
	const [extended, setExtended] = useState(true);
	return (
		<>
			<div className="md:hidden md:invisible">
				<div
					className={`sidebar-height text-2xl md:text-xl font-medium flex flex-col gap-6 border-r-2 w-full xs:w-1/2 xs:shadow-2xl transition-transform ${
						toggle ? '-translate-x-full' : ''
					} bg-white pos w-full`}
				>
					<Drawer />
					<Followings />
					<button className="flex flex-row grow-0 items-center p-4 gap-5 border-t-2 font-medium">
						<AiOutlineLogout className="icon" size={24} />
						Logout
					</button>
				</div>
			</div>
			<div className="hidden invisible md:visible md:flex bg-white">
				<div className="md:h-screen text-sm font-medium flex flex-col gap-6 max-w-xl shadow tracking-wide">
					<Drawer extended={extended} setExtended={setExtended} />
					<Followings extended={extended} />
					<button className="flex flex-row grow-0 items-center p-2 gap-2 border-t-2 font-medium hover:bg-slate-200 transition-colors">
						<AiOutlineLogout className="icon" size={24} />
						{extended ? 'Logout' : ''}
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
