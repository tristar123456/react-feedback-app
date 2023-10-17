import {Feedback} from '../models/Feedback';

interface FeedbackStatsProps {
	feedbacks: Feedback[]
}

export const FeedbackStats = ({feedbacks}: FeedbackStatsProps) => {
	const average =
		feedbacks.length === 0
			? 0
			: feedbacks.reduce((acc, {rating}) => acc + rating, 0) / feedbacks.length

	return (
		<div className="feedback-stats">
			<h4>{feedbacks.length} Reviews</h4>
			<h4>Average Rating: {average.toFixed(1).replace(/[.,]0$/, '')}</h4>
		</div>
	)
};