import {Card} from './shared/Card';
import {ChangeEvent, ChangeEventHandler, EventHandler, FormEvent, FormEventHandler, useState} from 'react';
import {Button} from './shared/Button';
import {RatingSelect} from './RatingSelect';
import {Feedback} from '../models/Feedback';

interface FeedbackFormProps {
	handleAdd: (feedback: Omit<Feedback, 'id'>) => void
}

export const FeedbackForm = ({handleAdd}: FeedbackFormProps) => {
	const [text, setText] = useState('');
	const [rating, setRating] = useState<number | null>(0);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState<string | null>('');
	const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		if (text === '') {
			setBtnDisabled(true);
			setMessage(null);
		} else if (text !== '' && text.trim().length <= 10) {
			setBtnDisabled(true);
			setMessage('Text must be at least 10 characters.');
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
		event.preventDefault();
		if (text.trim().length > 10 && rating && text) {
			handleAdd({text, rating});
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)}/>
				<div className="input-group">
					<input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
					<Button type="submit" isDisabled={btnDisabled}>Send</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
};