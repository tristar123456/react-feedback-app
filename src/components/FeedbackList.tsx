import React, {useContext} from 'react';
import FeedbackItem from './FeedbackItem';
import {AnimatePresence, motion} from 'framer-motion';
import {FeedbackContext} from '../context/FeedbackContext';

export const FeedbackList = () => {
	const feedbackContext = useContext(FeedbackContext);

	if (!feedbackContext.isLoading && (!feedbackContext.data || feedbackContext.data.length <= 0)) {
		return (<p>No Feedback yet!</p>)
	}
	return feedbackContext.isLoading ? (<h3>Loading...</h3>) : (
		<div className="feedback-list">
			<AnimatePresence>
				{feedbackContext.data.map((item) =>
					<motion.div
						key={item.id}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						<FeedbackItem key={item.id} item={item}/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
FeedbackList.defaultProps = {
	feedback: []
}
