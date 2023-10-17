interface HeaderProps {
	title: string,
	bgColor: string,
	textColor: string
}

function Header({title, bgColor, textColor}: HeaderProps) {
	const headerStyle = {backgroundColor: bgColor, color: textColor};
	return (
		<header data-testid='header' style={headerStyle}>
			<div className="container">
				<h2 data-testid='header-title'>{title}</h2>
			</div>
		</header>
	);
}

Header.defaultProps = {
	title: 'FEEDBACK UI',
	bgColor: 'rgba(0,0,0,0, 0.4)',
	textColor: '#ff6a95'
} as HeaderProps

export default Header;