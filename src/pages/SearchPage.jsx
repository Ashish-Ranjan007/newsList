import React from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroller from '../components/InfiniteScroller';

const SearchPage = () => {
	const { query } = useParams();

	return (
		<div>
			<div className="w-full mb-2">
				<span className="text-base font-medium">Searched:</span>
				<span className="text-font-gray ml-2">{query}</span>
			</div>
			<InfiniteScroller query={query} />
		</div>
	);
};

export default SearchPage;
