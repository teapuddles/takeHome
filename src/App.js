import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'

const App = () => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	// sets state to false so we can flip it with a click
	const [showSummary, setShowSummary] = useState(false);
	const [score, setScore] = useState(0);


  return (
    <div className='app'>
    {/* {showSummary ? (
      // ternary for showing the Summary page. 
    )}  */}
  <h1>HELLO</h1>
  </div>
  )
};


export default App;
