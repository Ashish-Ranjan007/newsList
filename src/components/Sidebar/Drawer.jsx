import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaBookmark } from 'react-icons/fa';
import { BsFillBellFill } from 'react-icons/bs';

import * as ROUTES from '../../constants/routes';
import logo from '../../assets/logo1.svg';
import logo2 from '../../assets/logo2.svg';

const Drawer = ({ extended, setExtended }) => {
	return (
		<div className="grow-0 border-b-2">
			<div className="hidden invisible md:visible md:flex">
				<div className="flex flex-row items-center tracking-wide">
					<img
						onClick={() => setExtended((prev) => !prev)}
						src={logo}
						className="h-12 w-12 cursor-pointer"
					/>
					<Link to={ROUTES.HOME}>
						<img
							src={logo2}
							className={`h-12 ${
								extended ? '' : 'md:hidden md:invisible'
							}`}
						/>
					</Link>
				</div>
			</div>
			<div>
				<Link
					to={ROUTES.PROFILE}
					className="flex flex-row items-center p-4 gap-5 md:p-2 md:gap-2 tracking-wide hover:bg-slate-200 transition-colors"
				>
					<CgProfile className="icon" size={24} />
					<span className={extended ? '' : 'md:hidden md:invisible'}>
						Profile
					</span>
				</Link>
			</div>
			<div>
				<Link
					to={ROUTES.SAVED}
					className="flex flex-row items-center p-4 gap-5 md:p-2 md:gap-2 tracking-wide hover:bg-slate-200 transition-colors"
				>
					<FaBookmark className="icon" size={24} />
					<span className={extended ? '' : 'md:hidden md:invisible'}>
						Saved
					</span>
				</Link>
			</div>
			<div>
				<Link
					to={ROUTES.NOTIFICATIONS}
					className="flex flex-row items-center p-4 gap-5 md:p-2 md:gap-2 tracking-wide hover:bg-slate-200 transition-colors"
				>
					<BsFillBellFill className="icon" size={24} />
					<span className={extended ? '' : 'md:hidden md:invisible'}>
						Notifications
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Drawer;
