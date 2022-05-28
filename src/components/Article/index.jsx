import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { getDocId } from '../../services/firebase';
import FirebaseContext from '../../context/firebase';
import { getColor } from '../../helpers/colorPicker';
import { getDiffInDays } from '../../helpers/getDiffInDays';

const Article = ({ article, innerRef }) => {
	const { firestore } = useContext(FirebaseContext);
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleFollow, setToggleFollow] = useState(article.isFollowing);

	const handleToggleFollow = async () => {
		setIsDisabled(true);
		const userEmail = JSON.parse(localStorage.getItem('user')).email;

		try {
			const docId = await getDocId(userEmail, firestore);
			const docRef = doc(firestore, 'users', docId);

			await updateDoc(docRef, {
				followings: toggleFollow
					? arrayRemove(article.source)
					: arrayUnion(article.source),
			});

			setToggleFollow((toggleFollow) => !toggleFollow);
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<div
			ref={innerRef}
			className="flex flex-col gap-4 w-full mb-2 sm:mb-4 p-2 border"
		>
			<div className="flex items-center gap-2">
				<div
					style={{ backgroundColor: getColor(article.source[0]) }}
					className={`icon rounded-full text-center text-white font-bold`}
				>
					{article.source[0]}
				</div>
				<Link
					to={`/source/${article.source}`}
					className="text-sm font-medium tracking-wide"
				>
					{article.source}
				</Link>
				<button
					role="button"
					disabled={isDisabled ? true : false}
					onClick={handleToggleFollow}
					className={`text-xs  px-2 py-0.5 rounded-full border  tracking-wide active:scale-90 ${
						toggleFollow
							? 'border-font-gray text-font-gray'
							: 'border-sky-blue text-sky-blue'
					}`}
				>
					{toggleFollow ? 'Following' : 'Follow'}
				</button>
			</div>
			{article.urlToImage?.length > 0 && (
				<figure>
					<img
						className="w-full"
						src={article.urlToImage}
						alt="article image"
					/>
				</figure>
			)}
			<div>
				<a
					className="block text-xl md:text-base font-medium py-1 cursor-pointer hover:text-sky-blue hover:underline transition"
					href={article.url}
					target="_blank"
				>
					{article.title}
				</a>
				{/* If description contains html render content insted */}
				<p className="text-sm text-font-gray py-1">
					{/[</|/>]/.test(article.description)
						? article.content
						: article.description}
				</p>
			</div>
			<div className="flex items-center gap-3 text-base mt-auto sm:text-sm">
				<span className="text-xs text-font-gray">
					{getDiffInDays(article.publishedAt)}
				</span>
			</div>
		</div>
	);
};

export default Article;
