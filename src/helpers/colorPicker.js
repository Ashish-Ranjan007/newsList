const colors = {
	a: '#E91E63',
	b: '#F71BB9',
	c: '#9900F0',
	d: '#ED39E7',
	e: '#1FE05A',
	f: '#812BE0',
	g: '#4CE0B0',
	h: '#2F8DF7',
	i: '#4CE0D9',
	j: '#000A99',
	k: '#FA3FDE',
	l: '#770BDE',
	m: '#52D5FF',
	n: '#E91E63',
	o: '#F71BB9',
	p: '#9900F0',
	q: '#ED39E7',
	r: '#1FE05A',
	s: '#812BE0',
	t: '#4CE0B0',
	u: '#2F8DF7',
	v: '#4CE0D9',
	w: '#000A99',
	x: '#FA3FDE',
	y: '#770BDE',
	z: '#52D5FF',
};

export const getColor = (letter) => {
	return colors[letter.toLowerCase()];
};
