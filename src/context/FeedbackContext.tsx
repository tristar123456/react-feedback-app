import {createContext, PropsWithChildren, useState} from 'react';
import FeedbackData from '../data/FeedbackData';
import {Feedback} from '../models/Feedback';
import {UUID} from 'crypto';
import {v4} from 'uuid';

export const FeedbackContext = createContext<{
	data: Feedback[],
	feedbackEdit: { item: Feedback | null, edit: boolean },
	delete: (id: UUID) => void,
	add: (feedback: Omit<Feedback, 'id'>) => void,
	edit: (feedback?: Feedback) => void,
	update: (id: UUID, feedback: Omit<Feedback, 'id'>) => void,
}>({
	data: [],
	feedbackEdit: {
		item: null,
		edit: false
	},
	delete: () => {
	},
	add: () => {
	},
	edit: () => {
	},
	update: () => {
	},
});

export const FeedbackProvider = ({children}: PropsWithChildren) => {
	const [feedbacks, setFeedback] = useState<Feedback[]>([FeedbackData[0]]);

	const [feedbackEdit, setFeedbackEdit] = useState<{ item: Feedback | null, edit: boolean }>({
		item: null,
		edit: false
	})

	const deleteFeedback = (deleteId: UUID) => window.confirm(`Are you sure to delete the item ${deleteId}?`)
		&& setFeedback(feedbacks.filter(({id}) => deleteId !== id));

	const addFeedback = (newFeedback: Omit<Feedback, 'id'>) => {
		setFeedback([{id: v4() as UUID, ...newFeedback}, ...feedbacks])
	};

	const editFeedback = (item?: Feedback) => {
		if (!item) {
			setFeedbackEdit({item: null, edit: false});
		} else {
			setFeedbackEdit({item, edit: true});
		}
	};

	const updateFeedback = (id: UUID, updItem: Omit<Feedback, 'id'>) => {
		setFeedback(feedbacks.map((feedback) => feedback.id === id ? {...feedback, ...updItem} : feedback))
	}

	return <FeedbackContext.Provider value={{
		data: feedbacks,
		feedbackEdit,
		delete: deleteFeedback,
		add: addFeedback,
		edit: editFeedback,
		update: updateFeedback
	}}>
		{children}
	</FeedbackContext.Provider>
};
