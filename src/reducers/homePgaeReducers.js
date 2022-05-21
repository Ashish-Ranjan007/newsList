export const initialState = {
	page: 1,
	error: false,
	articles: [],
	loading: true,
	hasMore: true,
	fetching: false,
	followings: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'page':
			return { ...state, page: action.payload };
		case 'error':
			return { ...state, error: action.payload };
		case 'articles':
			return {
				...state,
				articles: [...state.articles, ...action.payload],
			};
		case 'loading':
			return { ...state, loading: action.payload };
		case 'hasMore':
			return { ...state, hasMore: action.payload };
		case 'fetching':
			return { ...state, fetching: action.payload };
		case 'followings':
			return { ...state, followings: action.payload };
		default:
			return state;
	}
};
