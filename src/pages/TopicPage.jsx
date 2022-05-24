import React from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroller from '../components/InfiniteScroller';

const TopicPage = () => {
	const { topic } = useParams();

	return (
		<div>
			<div className="w-full mb-2">
				<span className="text-base font-medium">Topic:</span>
				<span className="text-font-gray ml-2">{`#${topic}`}</span>
			</div>
			<InfiniteScroller query={topic} />
		</div>
	);
};

export default TopicPage;
