import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import { getDocId } from '../../../services/firebase';
import FirebaseContext from '../../../context/firebase';
import { topicsList } from '../../../helpers/topicsList';
import { colorPicker } from '../../../helpers/colorPicker';

const TopicSelectionForm = () => {
	const navigate = useNavigate();
	const [topics, setTopics] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const { firestore } = useContext(FirebaseContext);

	const handleClick = async () => {
		if (topics.length > 0) {
			try {
				setIsDisabled(true);
				const userEmail = JSON.parse(
					localStorage.getItem('user')
				).email;
				const docId = await getDocId(userEmail, firestore);
				const docRef = doc(firestore, 'users', docId);
				await updateDoc(docRef, { interests: topics });
			} catch (error) {
				console.log(error.message);
			} finally {
				setIsDisabled(false);
			}
		}

		navigate('/', { replace: true });
	};

	return (
		<div className="font-body text-base font-medium tracking-wide">
			<div className="flex flex-row flex-wrap gap-x-3 gap-y-2 my-2">
				{topicsList.map((topic) => {
					const color = colorPicker();
					return (
						<button
							key={topic}
							style={{
								color: topics.includes(topic) ? 'white' : color,
								backgroundColor: topics.includes(topic)
									? color
									: 'transparent',
								border: `1px solid ${color}`,
							}}
							className={`px-4 py-2 border rounded-3xl text-sm font-medium`}
							onClick={(e) =>
								setTopics([
									...topics,
									e.target.textContent.split(' ')[1],
								])
							}
						>
							{`# ${topic}`}
						</button>
					);
				})}
			</div>
			<div className="w-full flex flex-row justify-end">
				<button
					disabled={isDisabled ? true : false}
					className={`w-40 bg-sky-blue text-white text-sm font-semibold p-3 rounded-lg mt-8 ${
						isDisabled ? 'opacity-50' : ''
					}`}
					onClick={handleClick}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default TopicSelectionForm;
