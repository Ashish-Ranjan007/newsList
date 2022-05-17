import Masonry from 'react-masonry-css';
import { useEffect, useContext, useRef, useCallback, useReducer } from 'react';

import Article from '../components/Article';
import Spinner from '../components/Spinner';
import FirebaseContext from '../context/firebase';
import { getFollowings } from '../services/firebase';
import { formatResponse } from '../helpers/formatResponse';
import { getTopHeadlines, fetchOnScroll } from '../lib/newsApi';
import { reducer, initialState } from '../reducers/homePgaeReducers';

const breakpointColumnsObj = {
	default: 4,
	1280: 3,
	1024: 2,
	500: 1,
};

function Home() {
	const { firestore } = useContext(FirebaseContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	const pageRef = useRef();
	const observer = useRef();
	const hasMoreRef = useRef();

	// Since current states cannot be accessed from within callback function of useCallback Hook
	pageRef.current = state.page;
	hasMoreRef.current = state.hasMore;

	useEffect(() => {
		async function fetchArticles() {
			dispatch({ type: 'error', payload: false });
			dispatch({ type: 'loading', payload: true });

			const userEmail = JSON.parse(localStorage.getItem('user')).email;

			try {
				const followings = await getFollowings(userEmail, firestore);
				const response = await getTopHeadlines();

				dispatch({ type: 'followings', payload: followings });

				const articles = formatResponse(response.data, followings);

				dispatch({ type: 'articles', payload: articles });
			} catch (error) {
				dispatch({ type: 'error', payload: true });
			} finally {
				dispatch({ type: 'loading', payload: false });
			}
		}

		fetchArticles();
	}, []);

	const lastArticleRef = useCallback(
		(node) => {
			if (state.loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting && hasMoreRef.current) {
					try {
						dispatch({ type: 'fetching', payload: true });

						const response = await fetchOnScroll(pageRef.current);
						const articles = formatResponse(
							response.data,
							state.followings
						);

						dispatch({
							type: 'page',
							payload: pageRef.current + 1,
						});
						dispatch({ type: 'articles', payload: articles });
						dispatch({
							type: 'hasMore',
							payload:
								response.data.articles.length > 0
									? true
									: false,
						});
						dispatch({ type: 'fetching', payload: false });
					} catch (error) {
						dispatch({ type: 'error', payload: true });
					}
				}
			});
			if (node) observer.current.observe(node);
		},
		[state.loading, state.hasMore]
	);

	console.log('home', state.articles);

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
					if (!article.description || article.description.length < 10)
						return;
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

export default Home;
