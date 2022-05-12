import React from 'react';
import { CgProfile } from 'react-icons/cg';

import profilePic from '../../assets/profile.avif';

const channels = [
	'CNN',
	'Times of India',
	'Washington Post',
	'Indian Post',
	'NDTV',
	'The Times of India',
];

const Followings = ({ extended }) => {
	return (
		<div className="hide-scrollbar grow overflow-auto tracking-wide">
			<h2
				className={`sticky top-0 p-3 text-font-gray shadow bg-white ${
					extended ? '' : 'md:hidden'
				}`}
			>
				Followings
			</h2>
			{channels.map((channel) => {
				return (
					<div
						key={channel}
						className="flex flex-shrink-0 items-center p-4 md:p-2 gap-5 md:gap-2 cursor-pointer hover:bg-slate-200 transition-colors"
					>
						<img
							className="h-9 md:h-7 w-9 md:w-7 rounded-full"
							src={profilePic}
						/>
						<p className={`${extended ? '' : 'md:hidden'}`}>
							{channel}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Followings;
