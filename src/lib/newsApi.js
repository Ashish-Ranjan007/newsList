import axios from 'axios';

export const getTopHeadlines = () => {
	return axios({
		method: 'GET',
		url: 'https://newsapi.org/v2/top-headlines',
		params: { country: 'in', page: 1 },
		headers: {
			Authorization: import.meta.env.VITE_NEWS_API,
		},
	});
};

export const fetchOnScroll = (page) => {
	const params = {
		q: 'science OR entertainment OR sports',
		to: new Date().toISOString(),
		page: page,
	};

	return axios({
		method: 'GET',
		url: 'https://newsapi.org/v2/everything',
		params: params,
		headers: {
			Authorization: import.meta.env.VITE_NEWS_API,
		},
	});
};

export const getQuery = (query, page) => {
	const params = {
		q: query,
		to: new Date().toISOString(),
		page: page,
	};

	return axios({
		method: 'GET',
		url: 'https://newsapi.org/v2/everything',
		params: params,
		headers: {
			Authorization: import.meta.env.VITE_NEWS_API,
		},
	});
};
