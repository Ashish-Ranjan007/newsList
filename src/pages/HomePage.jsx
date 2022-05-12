import React, { useState } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Home() {
	const [toggle, setToggle] = useState(true);

	return (
		<div className="md:flex flex-row-reverse gap-2">
			<div className="w-full grow">
				<Header setToggle={setToggle} />
				<div className="content-height flex flex-wrap w-full p-2 overflow-y-auto">
					<p>1Home</p>
					<p>2Home</p>
					<p>2Home</p>
					<p>3Home</p>
					<p>4Home</p>
					<p>5Home</p>
					<p>6Home</p>
					<p>7Home</p>
					<p>8Home</p>
					<p>9Home</p>
					<p>10Home</p>
					<p>11Home</p>
					<p>12Home</p>
					<p>13Home</p>
					<p>14Home</p>
					<p>15Home</p>
					<p>16Home</p>
					<p>17Home</p>
					<p>18Home</p>
					<p>19Home</p>
					<p>20Home</p>
					<p>21Home</p>
					<p>21Home</p>
					<p>23Home</p>
					<p>24Home</p>
					<p>25Home</p>
					<p>26Home</p>
					<p>27Home</p>
					<p>28Home</p>
					<p>29Home</p>
					<p>30Home</p>
					<p>1Home</p>
					<p>2Home</p>
					<p>2Home</p>
					<p>3Home</p>
					<p>4Home</p>
					<p>5Home</p>
					<p>6Home</p>
					<p>7Home</p>
					<p>8Home</p>
					<p>9Home</p>
					<p>10Home</p>
					<p>11Home</p>
					<p>12Home</p>
					<p>13Home</p>
					<p>14Home</p>
					<p>15Home</p>
					<p>16Home</p>
					<p>17Home</p>
					<p>18Home</p>
					<p>19Home</p>
					<p>20Home</p>
					<p>21Home</p>
					<p>21Home</p>
					<p>23Home</p>
					<p>24Home</p>
					<p>25Home</p>
					<p>26Home</p>
					<p>27Home</p>
					<p>28Home</p>
					<p>29Home</p>
					<p>30Home</p>
					<p>1Home</p>
					<p>2Home</p>
					<p>2Home</p>
					<p>3Home</p>
					<p>4Home</p>
					<p>5Home</p>
					<p>6Home</p>
					<p>7Home</p>
					<p>8Home</p>
					<p>9Home</p>
					<p>10Home</p>
					<p>11Home</p>
					<p>12Home</p>
					<p>13Home</p>
					<p>14Home</p>
					<p>15Home</p>
					<p>16Home</p>
					<p>17Home</p>
					<p>18Home</p>
					<p>19Home</p>
					<p>20Home</p>
					<p>21Home</p>
					<p>21Home</p>
					<p>23Home</p>
					<p>24Home</p>
					<p>25Home</p>
					<p>26Home</p>
					<p>27Home</p>
					<p>28Home</p>
					<p>29Home</p>
					<p>30Home</p>
				</div>
			</div>
			<div className="flex-none">
				<Sidebar toggle={toggle} />
			</div>
		</div>
	);
}

export default Home;
