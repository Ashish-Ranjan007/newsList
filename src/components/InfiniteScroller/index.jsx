import Masonry from 'react-masonry-css';
import { useEffect, useContext, useRef, useCallback, useReducer } from 'react';

import { getQuery } from '../../lib/newsApi';
import Article from '../../components/Article';
import Spinner from '../../components/Spinner';
import FirebaseContext from '../../context/firebase';
import { getFollowings } from '../../services/firebase';
import { formatResponse } from '../../helpers/formatResponse';
import { reducer, initialState } from '../../reducers/homePageReducers';

const breakpointColumnsObj = {
	default: 4,
	1280: 3,
	1024: 2,
	500: 1,
};

function InfiniteScroller({ query }) {
	const { firestore } = useContext(FirebaseContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	const pageRef = useRef();
	const observer = useRef();
	const hasMoreRef = useRef();

	// Since current states cannot be accessed from within callback function of useCallback Hook
	pageRef.current = state.page;
	hasMoreRef.current = state.hasMore;

	// Reset articles to [] everytime source changes
	useEffect(() => {
		dispatch({ type: 'resetArticles' });
	}, [query]);

	useEffect(() => {
		async function fetchArticles() {
			dispatch({ type: 'error', payload: false });
			dispatch({ type: 'loading', payload: true });

			const userEmail = JSON.parse(localStorage.getItem('user')).email;

			try {
				const response = await getQuery(query, pageRef.current);
				const followings = await getFollowings(userEmail, firestore);
				const articles = formatResponse(response.data, followings);

				dispatch({ type: 'articles', payload: articles });
				dispatch({ type: 'followings', payload: followings });
				dispatch({
					type: 'hasMore',
					payload: response.data.articles.length > 0 ? true : false,
				});
			} catch (error) {
				console.log(error);
				dispatch({ type: 'error', payload: true });
			} finally {
				dispatch({ type: 'loading', payload: false });
			}
		}

		fetchArticles();
	}, [query, state.page]);

	const lastArticleRef = useCallback(
		(node) => {
			if (state.loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting && hasMoreRef.current) {
					dispatch({
						type: 'page',
						payload: pageRef.current + 1,
					});
				}
			});
			if (node) observer.current.observe(node);
		},
		[state.loading, state.hasMore]
	);

	return (
		<>
			{state.loading && <Spinner />}
			{state.error && <Spinner message="An error has occurred" />}
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_colummn"
			>
				{state.articles.map((article, index) => {
					if (index === state.articles.length - 1) {
						return (
							<Article
								innerRef={lastArticleRef}
								key={index}
								article={article}
							/>
						);
					} else {
						return <Article key={index} article={article} />;
					}
				})}
			</Masonry>

			{!state.hasMore && (
				<p className="text-center text-lg">
					You have viewed all articles
				</p>
			)}
			{state.fetching && <Spinner />}
		</>
	);
}

export default InfiniteScroller;
