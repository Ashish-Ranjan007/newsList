import React from 'react';
import { NavLink } from 'react-router-dom';

const topics = [
	'Business',
	'Education',
	'Entertainment',
	'Jobs',
	'Politics',
	'Popular',
	'Science',
	'Sports',
	'Technology',
	'World',
];

const Navbar = () => {
	const horizontalScroll = (event) => {
		const delta = Math.max(-1, Math.min(1, event.nativeEvent.wheelDelta));
		event.currentTarget.scrollLeft -= delta * 20;
	};

	return (
		<nav
			role="menubar"
			onWheel={horizontalScroll}
			className="hide-scrollbar flex shrink h-12 max-w-xs lg:max-w-2xl xl:max-w-none overflow-x-auto"
		>
			{topics.map((topic) => {
				return (
					<NavLink
						to={`/topic/${topic}`}
						key={topic}
						className="inline-block shrink-0 p-3 text-base font-medium text-font-gray hover:text-light-red transition-colors"
					>
						{`# ${topic}`}
					</NavLink>
				);
			})}
		</nav>
	);
};

export default Navbar;
