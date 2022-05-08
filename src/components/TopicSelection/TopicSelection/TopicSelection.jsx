import React from 'react';
import TopicSelectionForm from '../TopicSelectionForm/TopicSelectionForm';

const TopicSelection = () => {
	return (
		<main className="w-full h-full flex flex-row bg-white">
			<div
				role="img"
				aria-label="Background image of a newspaper"
				className="invisible sm:visible w-0 sm:w-full sm:h-full h-auto bg-[url('https://images.unsplash.com/photo-1551406483-3731d1997540?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')] bg-cover md:basis-9/12"
			></div>
			<div className="w-full h-full px-8 flex flex-col sm:justify-center sm:px-4 sm:my-4 md:px-8 font-body mt-8 sm:mt-0">
				<h1 className="font-medium text-2xl tracking-wide mb-8 mt-8 md:mb-6 sm:mt-0">
					Select Interests
				</h1>
				<h6 className="font-normal mb-6 md:mb-6 text-base">
					Pick Topic of your Interest
				</h6>
				<aside className="text-gray-400 mb-6 md:mb-8 md:w-96 text-sm">
					Your feeds will be populated according to your topics of
					interest. You can always change this later.
				</aside>
				<TopicSelectionForm />
			</div>
		</main>
	);
};

export default TopicSelection;
