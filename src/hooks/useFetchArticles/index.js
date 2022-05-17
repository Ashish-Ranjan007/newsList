import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import FirebaseContext from '../../context/firebase';
import { getFollowings, getInterests } from '../../services/firebase';

const fn = (response, articles, followings) => {
	let result = response.articles.map((article) => {
		return {
			source: article.source.name,
			isFollowing: followings.includes(article.source.name),
			urlToImage: article.urlToImage,
			title: article.title,
			url: article.url,
			description: article.description,
			publishedAt: article.publishedAt,
		};
	});

	return [...articles, ...result];
};

const useFetchArticles = () => {
	const [error, setError] = useState(false);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const { firestore } = useContext(FirebaseContext);

	useEffect(() => {
		async function fetchArticles() {
			setError(false);
			setLoading(true);
			const userEmail = JSON.parse(localStorage.getItem('user')).email;

			try {
				const followings = await getFollowings(userEmail, firestore);
				const interests = await getInterests(userEmail, firestore);

				const params = {
					q:
						interests.length > 0
							? interests.slice(0, 4).join(' OR ')
							: 'science OR entertainment OR sports',
					to: new Date().toISOString(),
					pageSize: 100,
					page: 1,
				};

				const response = await axios({
					method: 'GET',
					// url: 'https://newsapi.org/v2/everything',
					params: params,
					headers: {
						Authorization: '6ac61ba7fc28481289eb8990591a6e62',
					},
				});

				setArticles(() => fn(response.data, articles, followings));
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchArticles();
	}, []);

	return { loading, error, articles };
};

export default useFetchArticles;
