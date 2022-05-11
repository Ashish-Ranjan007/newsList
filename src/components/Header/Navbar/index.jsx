import React from 'react';
import { Link } from 'react-router-dom';

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
			onWheel={horizontalScroll}
			className="custom-scrollbar h-12 flex flex-row overflow-x-auto shrink max-w-xs xl:max-w-none"
		>
			{topics.map((topic) => {
				return (
					<Link
						to={`topics/${topic}`}
						key={topic}
						className="p-3 text-base inline-block font-medium text-font-gray hover:text-black shrink-0 transition-colors"
					>
						{`# ${topic}`}
					</Link>
				);
			})}
		</nav>
	);
};

export default Navbar;
