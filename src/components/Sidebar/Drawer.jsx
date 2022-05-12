import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { BsFillBellFill } from 'react-icons/bs';

import logoName from '../../assets/logo2.svg';
import * as ROUTES from '../../constants/routes';
import profilePic from '../../assets/profile.avif';
import logoSymbol from '../../assets/newslist-logos.jpeg';

const tabs = [
	{
		name: 'Profile',
		route: ROUTES.PROFILE,
		icon: () => <img className="icon rounded-full" src={profilePic} />,
	},
	{
		name: 'Saved',
		route: ROUTES.SAVED,
		icon: () => <FaBookmark className="icon" size={24} />,
	},
	{
		name: 'Notification',
		route: ROUTES.NOTIFICATIONS,
		icon: () => <BsFillBellFill className="icon" size={24} />,
	},
];

const Drawer = ({ extended, setExtended }) => {
	return (
		<div className="grow-0 border-b-2">
			<div className="hidden md:flex">
				<div className="flex flex-row items-center tracking-wide">
					<img
						onClick={() => setExtended((prev) => !prev)}
						src={logoSymbol}
						className="h-12 w-12 cursor-pointer"
					/>
					<Link to={ROUTES.HOME}>
						<img
							src={logoName}
							className={`h-12 ${extended ? '' : 'md:hidden'}`}
						/>
					</Link>
				</div>
			</div>
			{tabs.map((tab) => {
				return (
					<div key={tab.name}>
						<Link
							to={tab.route}
							className="flex flex-row items-center p-4 md:p-2 gap-5 md:gap-2 tracking-wide hover:bg-slate-200 transition-colors"
						>
							{tab.icon()}
							<span className={extended ? '' : 'md:hidden'}>
								{tab.name}
							</span>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Drawer;
