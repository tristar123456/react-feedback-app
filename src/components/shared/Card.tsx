import React, {ReactElement} from 'react';

interface CardProps {
	children?: ReactElement<any, any>[] | ReactElement<any, any>,
	reverse?: boolean
}

export const Card = ({children, reverse = false}: CardProps) => {
	return (
		<div className={`card ${reverse && 'reverse'}`}>
			{children}
		</div>
	);
};