import React, {useContext} from 'react';
import {Feedback} from '../models/Feedback';
import FeedbackItem from './FeedbackItem';
import {UUID} from 'crypto';
import {AnimatePresence, motion} from 'framer-motion';
import {FeedbackContext} from '../context/FeedbackContext';

interface FeedbackListProps {
}

export const FeedbackList = ({}: FeedbackListProps) => {
	const feedbackContext = useContext(FeedbackContext);

	if (!feedbackContext.data || feedbackContext.data.length <= 0) {
		return (<p>No Feedback yet!</p>)
	}
	return (
		<div className="feedback-list">
			<AnimatePresence>
				{feedbackContext.data.map((item) =>
					<motion.div
						key={item.id}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						<FeedbackItem key={item.id} item={item} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
FeedbackList.defaultProps = {
	feedback: []
}
