import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroller from '../components/InfiniteScroller';

const SourcePage = () => {
	const { source } = useParams();

	return (
		<div>
			<div className="w-full mb-2">
				<span className="text-base font-medium">Source:</span>
				<span className="text-font-gray ml-2">{source}</span>
			</div>
			<InfiniteScroller query={source} />
		</div>
	);
};

export default SourcePage;
