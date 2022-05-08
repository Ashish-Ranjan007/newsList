const colors = ['#E91E63', '#9900F0'];

export const colorPicker = () => {
	return colors[Math.floor(Math.random() * 2)];
};
