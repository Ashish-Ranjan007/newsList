module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Poppins', 'sans-serif'],
			},
			colors: {
				'light-red': '#ff0057',
				'sky-blue': '#008DFF',
				'font-gray': '#757575',
			},
			minWidth: {
				md: '700px',
			},
			screens: {
				xs: '500px',
			},
			maxWidth: {
				xs: '400px',
			},
		},
	},
	plugins: [],
};
