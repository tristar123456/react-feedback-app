import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import FeedbackData from './data/FeedbackData';
import {FeedbackList} from './components/FeedbackList';
import {FeedbackStats} from './components/FeedbackStats';
import {FeedbackForm} from './components/FeedbackForm';
import {Feedback} from './models/Feedback';
import {UUID} from 'crypto';
import {v4} from 'uuid';

function App() {
	const title = 'Feedback UI'
	const [feedback, setFeedback] = useState(FeedbackData);

	const deleteItem = (deleteId: UUID) => window.confirm(`Are you sure to delete the item ${deleteId}?`) && setFeedback(feedback.filter(({id}) => deleteId !== id))

	function addFeedback(newFeedback: Omit<Feedback, 'id'>) {
		setFeedback([{id: v4() as UUID, ...newFeedback}, ...feedback])
	}

	return (
		<>
			<Header title={title}/>
			<div className="container">
				<FeedbackForm handleAdd={addFeedback}/>
				<FeedbackStats feedbacks={feedback}/>
				<FeedbackList handleDelete={deleteItem} feedback={feedback}/>
			</div>
		</>
	);
}

export default App;
