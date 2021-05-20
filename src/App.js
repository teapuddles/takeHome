import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'

const App = () => {

  // state variables
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  // score doesn't really need to be held, but we'll use it later for handling delighters
  const [score, setScore] = useState(0);


  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo (() => {
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
      setCurrentQuestion(0)
			setShowSummary(true)
		}
  }

  // next quiz click passed to Summary
  const handleNextQuizClick = () => {

    const nextQuiz = currentQuiz + 1
    setCurrentQuiz(nextQuiz)

    if(nextQuiz < quizzes.length){
      setCurrentQuiz(nextQuiz)
      setScore(0)
      setShowSummary(false)

    }else{
      setCurrentQuiz(0)
      setScore(0)
      setShowSummary(false)
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
      <Summary score={score} handleNextQuizClick={handleNextQuizClick} />
    ) : (
      <>
      <div className='quiz-title'>{quizzes[currentQuiz].title}</div>
      <br></br>
        <div className='question-section'>
        <div className='question-text'>{quizzes[currentQuiz].questions[currentQuestion].text}</div>
      <br></br>
        <div className='answer-section'>
        {answers.map((answer) => 
            <li key={answer} onClick={() => handleAnswerClick(answer)}>{answer}</li>
        )}
      </div>
      </div>
       <h3 className='next-question' onClick={() => handleNextQuestionClick()}> Next </h3>
      </>
    )} 
  </div>
  )
};


export default App;

