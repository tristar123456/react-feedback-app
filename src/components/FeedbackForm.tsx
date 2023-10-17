import {Card} from './shared/Card';
import {ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import {Button} from './shared/Button';
import {RatingSelect} from './RatingSelect';
import {FeedbackContext} from '../context/FeedbackContext';

export const FeedbackForm = () => {
	const [text, setText] = useState('');
	const [rating, setRating] = useState<number | null>(0);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState<string | null>('');

	const feedbackContext = useContext(FeedbackContext);

	useEffect(() => {
		if (feedbackContext.feedbackEdit.edit) {
			setBtnDisabled(false);
			setText(feedbackContext.feedbackEdit.item?.text ?? '');
			setRating(feedbackContext.feedbackEdit.item?.rating ?? 0);
		}
	}, [feedbackContext.edit, feedbackContext.feedbackEdit.edit, feedbackContext.feedbackEdit.item?.rating, feedbackContext.feedbackEdit.item?.text])
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
			if (feedbackContext.feedbackEdit.edit && feedbackContext.feedbackEdit.item?.id) {
				feedbackContext.update(feedbackContext.feedbackEdit.item.id, {text, rating})
			} else {
				feedbackContext.add({text, rating});
			}
			feedbackContext.edit();
			setText('');
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