import React from 'react';
import { CgProfile } from 'react-icons/cg';

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
		<div className="tracking-wide grow overflow-auto custom-scrollbar">
			<h2
				className={`p-3 text-font-gray sticky top-0 shadow bg-white ${
					extended ? '' : 'md:invisible md:hidden'
				}`}
			>
				Followings
			</h2>
			{channels.map((channel) => {
				return (
					<div
						key={channel}
						className="flex flex-row flex-shrink-0 items-center p-4 gap-5 md:p-2 md:gap-2 cursor-pointer hover:bg-slate-200 transition-colors"
					>
						<CgProfile className="icon" size={24} />
						<p
							className={`${
								extended ? '' : 'md:invisible md:hidden'
							}`}
						>
							{channel}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Followings;
