import {useContext} from 'react';
import {FeedbackContext} from '../context/FeedbackContext';

interface FeedbackStatsProps {
}

export const FeedbackStats = ({}: FeedbackStatsProps) => {
	const feedbackContext = useContext(FeedbackContext);
	const average =
		feedbackContext.data.length === 0
			? 0
			: feedbackContext.data.reduce((acc, {rating}) => acc + rating, 0) / feedbackContext.data.length

	return (
		<div className="feedback-stats">
			<h4>{feedbackContext.data.length} Reviews</h4>
			<h4>Average Rating: {average.toFixed(1).replace(/[.,]0$/, '')}</h4>
		</div>
	)
};