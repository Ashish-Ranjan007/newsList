import React from 'react';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import logo from '../../assets/logo.svg';
import menuIcon from '../../assets/menu-icon.svg';

const Header = ({ setToggle }) => {
	return (
		<div className="flex flex-row justify-between shadow-sm bg-white">
			<div className="hidden invisible md:visible md:flex flex-row justify-between items-center w-full gap-8 lg:gap-12 relative min-w-0">
				<Navbar />
				<Searchbar />
			</div>
			<div
				style={{ backgroundColor: '#D1D1C8' }}
				className="md:hidden md:invisible flex flex-row justify-between items-center w-full p-3"
			>
				<img src={logo} alt="logo" className="block" />
				<img
					src={menuIcon}
					alt="menu button"
					className="block w-8"
					onClick={() => setToggle((prev) => !prev)}
				/>
			</div>
		</div>
	);
};

export default Header;
