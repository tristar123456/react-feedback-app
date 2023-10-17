import {ChangeEvent, ChangeEventHandler, useState} from 'react';

interface RatingSelectProps {
	select: (rating: number) => void
}

export const RatingSelect = ({select}: RatingSelectProps) => {
	const [selected, setSelected] = useState(10);

	const handleChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setSelected(+event.currentTarget.value);
		select(+event.currentTarget.value)
	};

	return (
		<ul className="rating">
			{Array.from({length: 10}, (_, i) => (
				<li key={`rating-${i + 1}`}>
					<input
						type="radio"
						id={`num${i + 1}`}
						name="rating"
						value={i + 1}
						onChange={handleChange}
						checked={selected === i + 1}
					/>
					<label htmlFor={`num${i + 1}`}>{i + 1}</label>
				</li>
			))}
		</ul>
	);
};