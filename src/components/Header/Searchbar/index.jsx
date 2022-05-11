import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Searchbar = () => {
	const [query, setQuery] = useState('');
	return (
		<form className="flex flex-row flex-nowrap items-center border-b-2 border-black p-2 min-w-fit shrink-0">
			<BsSearch size={24} />
			<input
				type="text"
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				placeholder="Search anything..."
				title="Search Articles"
				className="text-base ml-4 tracking-wide w-full pr-8 outline-transparent"
			/>
		</form>
	);
};

export default Searchbar;
