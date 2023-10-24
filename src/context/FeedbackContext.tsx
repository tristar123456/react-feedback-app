import {createContext, PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {Feedback} from '../models/Feedback';
import {UUID} from 'crypto';
import {v4} from 'uuid';

export const FeedbackContext = createContext<{
	data: Feedback[],
	feedbackEdit: { item: Feedback | null, edit: boolean },
	isLoading: boolean,
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
	isLoading: true,
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
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [feedbacks, setFeedback] = useState<Feedback[]>([]);
	const [feedbackEdit, setFeedbackEdit] = useState<{ item: Feedback | null, edit: boolean }>({
		item: null,
		edit: false
	});

	// Fetch Feedback
	const fetchFeedback = async () => {
		const res = await fetch(`/feedback`);
		const data: Feedback[] = await res.json();

		setFeedback(data);
		setIsLoading(false);
	}

	const deleteFeedback = async (deleteId: UUID) => {
		setIsLoading(true);
		if (window.confirm(`Are you sure to delete the item ${deleteId}?`)) {
			return fetch(`/feedback/${deleteId}`, {
				method: 'DELETE'
			}).then(() => setIsLoading(false));
		} else {
			setIsLoading(false)
			return new Promise((resolve) => resolve(undefined))
		}
	};

	const addFeedback = (newFeedback: Omit<Feedback, 'id'>) => {
		setIsLoading(true);
		return fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: v4() as UUID, ...newFeedback})
		}).then(() => setIsLoading(false));
	};

	const editFeedback = (item?: Feedback) => {
		if (!item) {
			setFeedbackEdit({item: null, edit: false});
		} else {
			setFeedbackEdit({item, edit: true});
		}
	};

	const updateFeedback = useCallback((id: UUID, updItem: Omit<Feedback, 'id'>) => {
		setIsLoading(true);
		return fetch(`/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updItem)
		}).then(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		!isLoading && fetchFeedback()
	}, [isLoading]);

	return <FeedbackContext.Provider value={{
		data: feedbacks,
		feedbackEdit,
		isLoading,
		delete: deleteFeedback,
		add: addFeedback,
		edit: editFeedback,
		update: updateFeedback
	}}>
		{children}
	</FeedbackContext.Provider>
};
