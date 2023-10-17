import {Feedback} from '../models/Feedback';
import React, {useContext} from 'react';
import {Card} from './shared/Card';
import {FaEdit, FaTimes} from 'react-icons/fa';
import {FeedbackContext} from '../context/FeedbackContext';

interface FeedbackItemProps {
	item: Feedback,
}

export default function FeedbackItem({item}: FeedbackItemProps) {
	const feedbackContext = useContext(FeedbackContext);

	return (
		<Card>
			<div className="num-display">{item.rating}</div>
			<button onClick={() => feedbackContext.delete(item.id)} className="close">
				<FaTimes color="purple"/>
			</button>
			<button className="edit">
				<FaEdit color="purple" onClick={() => feedbackContext.edit(item)}/>
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	);
}
