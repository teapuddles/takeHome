import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'

const App = () => {

  // state variables
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);

  // variables
  const currentQuestionText = quizzes[currentQuiz].questions[currentQuestion]


  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo (() => {
    // will make more dynamic later by replacing quizzes with currentQuiz
    const incorrectOptions = quizzes[currentQuiz].questions[currentQuestion].incorrectAnswers
    const correctOptions = quizzes[currentQuiz].questions[currentQuestion].correctAnswer

    const combinedOptions = [...incorrectOptions, correctOptions]

    return shuffle(combinedOptions)

  }, [currentQuiz, currentQuestion])


  // handle Next Question Click
  const handleNextQuestionClick = () => {

		const nextQuestion = currentQuestion + 1
		setCurrentQuestion(nextQuestion)

    if(nextQuestion < quizzes[currentQuiz].questions.length){
			setCurrentQuestion(nextQuestion)
	
		}else{
      // reset currentQuestion to 0 so it doesn't break before showing summary
      setCurrentQuestion(0)
			setShowSummary(true)
		}
  }


  // Handle clicking an answer 
  const handleAnswerClick = (answer) => {
    const theCorrectAnswer = quizzes[currentQuiz].questions[currentQuestion].correctAnswer
  
    if( answer === theCorrectAnswer ){
			setScore(score + 1)
    }
  }


  return (
    <div className='app'>
        {showSummary ? (
      <Summary score={score}/>
    ) : (
      <>
      <div className='quiz-title'>{quizzes[0].title}</div>
        <div className='question-section'>
        <div className='question-text'>{currentQuestionText.text}</div>
        <div className='answer-section'>
        {answers.map((answer) => 
            <button onClick={() => handleAnswerClick(answer)}>{answer}</button>
        )}
      </div>
      </div>
       <button onClick={() => handleNextQuestionClick()}>Click Me for Next</button>
      </>
    )} 
  </div>
  )
};


export default App;



// TO DO 
// Change quiz on the summary component (using same logic as handleNextQuestionClick)
// 