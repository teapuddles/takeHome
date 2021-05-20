import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'

const App = () => {

  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
	// sets state to false so we can flip it with a click
	const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);
  



  
  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo (() => {
    const incorrectOptions = quizzes[0].questions[currentQuestion].incorrectAnswers
    const correctOptions = quizzes[0].questions[currentQuestion].correctAnswer

    const combinedOptions = [...incorrectOptions, correctOptions]

    return shuffle(combinedOptions)

  }, [currentQuestion])


  const handleNextQuestionClick = () => {
		// if( answerText === quizzes.questions[currentQuestion].correctAnswer){
		// 	setScore(score + 1)
    // }
    
		// This logic for adding score will ^^^^^^
    // likely need to be in a separate function in test. 
    // to handle highlights + score increment 
    
		const nextQuestion = currentQuestion + 1
		setCurrentQuestion(nextQuestion)
		// this will break without this
		if(nextQuestion < quizzes.questions.length){
			setCurrentQuestion(nextQuestion)
			// call answer randomizer? 
		}else{
			setShowSummary(true)
		}
  }
  
  const handleAnswerClick = (answer) => {
    return console.log('hi')
  }

  return (
    <div className='app'>
        {/* {showSummary ? (
      // ternary for showing the Summary page. 
    ) : }  */}
      <div className='quiz-title'>{quizzes[0].title}</div>
    <div className='question-section'>
      <div className='answer-section'>
        {/* map out shuffled answers to buttons here */}
        {answers.map((answer) => 
            <button onClick={() => handleAnswerClick(answer)}>{answer}</button>
        )}
      </div>
    </div>
    {/* next question button */}
  <button onClick={() => handleNextQuestionClick()}>Click Me for Next</button>
  </div>
  )
};


export default App;
