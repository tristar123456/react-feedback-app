import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

describe('App Test', () => {
	test('renders routing', () => {
		// Given
		render(<App/>);
		const headerElement = screen.getByTestId('routing-container');
		// Then
		expect(headerElement).toBeInTheDocument();
	});
})