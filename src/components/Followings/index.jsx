import React, { useContext, useEffect, useState } from 'react';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

import FirebaseContext from '../../context/firebase';
import { getDocId, getFollowings } from '../../services/firebase';

const Followings = () => {
	const [followings, setFollowings] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const { firestore } = useContext(FirebaseContext);

	const userEmail = JSON.parse(localStorage.getItem('user')).email;

	useEffect(() => {
		getFollowings(userEmail, firestore).then((res) => {
			res.sort();
			setFollowings(res);
		});
	}, []);

	const handleClick = async (e) => {
		setIsDisabled(true);
		console.log(e.target.value);
		try {
			const docId = await getDocId(userEmail, firestore);
			const docRef = doc(firestore, 'users', docId);
			await updateDoc(docRef, {
				followings: arrayRemove(e.target.value),
			});
			setFollowings((followings) => {
				return followings.filter(
					(following) => following != e.target.value
				);
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<div>
			<h1 className="p-2.5 border-b-2 text-lg font-medium text-font-gray tracking-wide">
				Followings
			</h1>
			{followings &&
				followings.map((following, index) => {
					return (
						<div
							key={index}
							className="flex justify-between items-center w-full p-2.5"
						>
							<p className="tracking-wide font-medium">
								{following}
							</p>
							<button
								disabled={isDisabled ? true : false}
								onClick={handleClick}
								value={following}
								className={`bg-sky-blue text-white text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-50 transition-all ${
									isDisabled ? 'opacity-50' : ''
								}`}
							>
								Unfollow
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Followings;
