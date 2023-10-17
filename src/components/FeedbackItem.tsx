import {Feedback} from '../models/Feedback';
import React from 'react';
import {Card} from './shared/Card';
import {FaTimes} from 'react-icons/fa';
import {UUID} from 'crypto';

interface FeedbackItemProps {
	item: Feedback,
	handleDelete: (id: UUID) => void
}

export default function FeedbackItem({item, handleDelete}: FeedbackItemProps) {
	return (
		<Card>
			<div className="num-display">{item.rating}</div>
			<button onClick={()=>handleDelete(item.id)} className="close">
				<FaTimes color="purple"/>
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	);
}
