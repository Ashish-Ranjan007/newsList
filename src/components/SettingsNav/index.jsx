import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navs = [
	{ name: 'My Details', route: '/profile', end: true },
	{ name: 'Followings', route: '/profile/followings', end: false },
	{ name: 'Interests', route: '/profile/interests', end: false },
	{ name: 'Password', route: '/profile/password', end: false },
	{ name: 'Delete Account', route: '/profile/delete-account', end: false },
];

const SettingsNav = () => {
	const horizontalScroll = (event) => {
		const delta = Math.max(-1, Math.min(1, event.nativeEvent.wheelDelta));
		event.currentTarget.scrollLeft -= delta * 20;
	};

	return (
		<div className="my-2.5">
			<nav
				role="navigation"
				onWheel={horizontalScroll}
				className="hide-scrollbar flex shrink h-12 w-full overflow-x-auto border-b-[1px]"
			>
				{navs.map((nav) => {
					return (
						<NavLink
							key={nav.name}
							to={nav.route}
							end={nav.end}
							className="shrink-0 inline-block p-3 text-base font-medium text-font-gray hover:text-light-red transition-colors"
						>
							{nav.name}
						</NavLink>
					);
				})}
			</nav>
		</div>
	);
};

export default SettingsNav;
