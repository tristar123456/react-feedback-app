import React from 'react';
import './App.css';
import Header from './components/Header';
import {FeedbackList} from './components/FeedbackList';
import {FeedbackStats} from './components/FeedbackStats';
import {FeedbackForm} from './components/FeedbackForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AboutPage} from './pages/AboutPage';
import {AboutIconLink} from './components/AboutIconLink';
import {FeedbackProvider} from './context/FeedbackContext';

function App() {
	const title = 'Feedback UI';

	return (<>
		<FeedbackProvider>
			<Header title={title}/>
			<Router>
				<div className="container">
					<Routes>
						<Route path="/" element={<>
							<FeedbackForm/>
							<FeedbackStats/>
							<FeedbackList/>
						</>}/>
						<Route path="/about" element={<AboutPage/>}/>
					</Routes>

					<AboutIconLink/>
				</div>
			</Router>
		</FeedbackProvider>

	</>)
		;
}

export default App;
