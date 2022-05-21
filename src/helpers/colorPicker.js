const colors = ['#E91E63', '#9900F0'];

export const colorPicker = () => {
	return colors[Math.floor(Math.random() * 2)];
};

export const colorArr = [
	'#E91E63',
	'#F71BB9',
	'#9900F0',
	'#ED39E7',
	'#1FE05A',
	'#812BE0',
	'#4CE0B0',
	'#2F8DF7',
	'#4CE0D9',
	'#000A99',
];

export const getRandomColor = () => {
	return colorArr[Math.floor(Math.random() * colorArr.length)];
};
