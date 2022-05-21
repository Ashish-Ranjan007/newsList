export const fisherYatesShuffle = (arr) => {
	let last = arr.length - 1;
	while (last > 0) {
		let randIndex = Math.floor(Math.random() * last);
		let temp = arr[last];
		arr[last] = arr[randIndex];
		arr[randIndex] = temp;
		last--;
	}
};
