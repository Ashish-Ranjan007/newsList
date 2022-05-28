import { Link } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { useContext, useState, useEffect } from 'react';

import logoName from '../../assets/logo2.svg';
import FirebaseContext from '../../context/firebase';
import { getProfilePic } from '../../services/firebase';
import logoSymbol from '../../assets/newslist-logos.jpeg';
import { getColor } from '../../helpers/colorPicker';

const Drawer = ({ extended, setExtended }) => {
	const [username, setUsername] = useState('');
	const [profilePic, setProfliePic] = useState('');
	const { firestore } = useContext(FirebaseContext);
	const userEmail = JSON.parse(localStorage.getItem('user')).email;
	console.log(userEmail);
	useEffect(() => {
		getProfilePic(userEmail, firestore).then((result) => {
			setProfliePic(result[0]);
			setUsername(result[1]);
		});
	}, []);

	return (
		<div className="grow-0 border-b-2">
			<div className="hidden md:flex">
				<div className="flex flex-row items-center tracking-wide">
					<img
						onClick={() => setExtended((prev) => !prev)}
						src={logoSymbol}
						className="h-12 w-12 cursor-pointer"
						alt="logo"
					/>
					<Link to="/">
						<img
							src={logoName}
							className={`h-12 ${extended ? '' : 'md:hidden'}`}
							alt="extended logo"
						/>
					</Link>
				</div>
			</div>
			<div>
				<Link
					to="profile"
					className="flex flex-row items-center p-4 md:p-2 gap-5 md:gap-2 tracking-wide hover:bg-slate-200 transition-colors"
				>
					{profilePic?.length > 0 ? (
						<img className="icon rounded-full" src={profilePic} />
					) : (
						<div
							style={{ backgroundColor: getColor(userEmail[0]) }}
							className="flex justify-center items-center text-white font-bold icon rounded-full"
						>
							{userEmail[0]?.toUpperCase()}
						</div>
					)}
					<span className={extended ? '' : 'md:hidden'}>Profile</span>
				</Link>
			</div>
		</div>
	);
};

export default Drawer;
