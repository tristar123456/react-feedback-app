import {UUID} from 'crypto';

export interface Feedback {
	id: UUID,
	rating: number,
	text: string
}
