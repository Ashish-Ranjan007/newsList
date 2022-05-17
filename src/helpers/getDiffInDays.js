export const getDiffInDays = (date) => {
	let publishedAt;

	const date1 = new Date();
	const date2 = new Date(date.split('T')[0].split('-').join('/'));

	const diffInTime = Math.abs(date1 - date2);
	const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

	if (diffInDays === 0) {
		publishedAt = 'Today';
	} else if (diffInDays === 1) {
		publishedAt = 'Yesterday';
	} else {
		publishedAt = `${diffInDays} days ago`;
	}

	return publishedAt;
};
