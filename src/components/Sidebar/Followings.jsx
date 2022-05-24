import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import FirebaseContext from '../../context/firebase';
import { getFollowings } from '../../services/firebase';
import { getRandomColor } from '../../helpers/colorPicker';

const Followings = ({ extended }) => {
	const [following, setFollowing] = useState([]);
	const { firestore } = useContext(FirebaseContext);

	useEffect(() => {
		const userEmail = JSON.parse(localStorage.getItem('user')).email;
		getFollowings(userEmail, firestore).then((result) => {
			result.sort();
			setFollowing(result);
		});
	}, []);

	return (
		<div className="hide-scrollbar grow overflow-auto tracking-wide">
			<h2
				className={`sticky top-0 p-3 text-font-gray shadow bg-white ${
					extended ? '' : 'md:hidden'
				}`}
			>
				Followings
			</h2>
			{following.map((channel) => {
				return (
					<Link
						to={`source/${channel}`}
						key={channel}
						className="flex flex-shrink-0 items-center p-4 md:p-2 gap-5 md:gap-2 cursor-pointer hover:bg-slate-200 transition-colors"
					>
						<div
							style={{ backgroundColor: getRandomColor() }}
							className="h-9 md:h-7 w-9 md:w-7 rounded-full flex justify-center items-center text-white font-bold"
						>
							{channel[0]}
						</div>

						<p className={`${extended ? '' : 'md:hidden'}`}>
							{channel}
						</p>
					</Link>
				);
			})}
		</div>
	);
};

export default Followings;
