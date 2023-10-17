import React from 'react';
import {Feedback} from '../models/Feedback';
import FeedbackItem from './FeedbackItem';
import {UUID} from 'crypto';
import {AnimatePresence, motion} from 'framer-motion';

interface FeedbackListProps {
	feedback: Feedback[],
	handleDelete: (id: UUID) => void
}

export const FeedbackList = ({feedback, handleDelete}: FeedbackListProps) => {
	if (!feedback || feedback.length <= 0) {
		return (<p>No Feedback yet!</p>)
	}
	return (
		<div className="feedback-list">
			<AnimatePresence>
				{feedback.map((item) =>
					<motion.div
						key={item.id}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						<FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
FeedbackList.defaultProps = {
	feedback: []
}
