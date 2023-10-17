import {ReactElement} from 'react';

interface ButtonProps {
	children?: ReactElement<any, any>[] | ReactElement<any, any> | string,
	version?: string,
	type?: "submit" | "reset" | "button" | undefined,
	isDisabled?: boolean
}

export const Button = ({children, version = 'primary', type = 'button', isDisabled = false}: ButtonProps) => {
	return (
		<button disabled={isDisabled} className={`btn btn-${version}`} type={type}>
			{children}
		</button>
	);
};