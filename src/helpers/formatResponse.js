export const formatResponse = (response, followings) => {
	let result = response.articles.map((article) => {
		return {
			source: article.source.name,
			isFollowing: followings.includes(article.source.name),
			urlToImage: article.urlToImage,
			title: article.title,
			url: article.url,
			description: article.description,
			publishedAt: article.publishedAt,
			content: article.content,
		};
	});

	return result;
};
