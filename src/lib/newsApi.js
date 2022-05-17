import axios from 'axios';

export const getTopHeadlines = () => {
	return axios({
		method: 'GET',
		url: 'https://newsapi.org/v2/top-headlines',
		params: { country: 'in', page: 1 },
		headers: {
			Authorization: '4df3c8b831e64cd4bce972c3ee4de08d',
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
			Authorization: '4df3c8b831e64cd4bce972c3ee4de08d',
		},
	});
};
