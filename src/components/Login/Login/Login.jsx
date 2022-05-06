import React from 'react';

import logo from '../../../assets/newslist-logos_black.png';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
	return (
		<main className="w-full h-full flex flex-row bg-white">
			<div
				role="img"
				aria-label="Background image of a newspaper"
				className="invisible sm:visible w-0 sm:w-full sm:h-full h-auto bg-[url('https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')] bg-cover"
			></div>
			<div className="w-full h-full px-8 flex flex-col justify-center  sm:px-4 md:px-8">
				<figure className="w-32 mt-4 mb-14 md:mb-6">
					<img src={logo} alt="logo" />
				</figure>

				<h1 className="font-medium text-2xl tracking-wide mb-8 md:mb-6">
					Login
				</h1>
				<h6 className="font-normal mb-6 md:mb-6 text-base">
					Login to your account
				</h6>
				<aside className="text-gray-400 mb-6 md:mb-8 md:w-96 text-sm">
					Newslist is a site covering news, culture, politics and
					everything that matters the most.
				</aside>
				<LoginForm />
			</div>
		</main>
	);
};

export default Login;
