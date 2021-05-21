import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'
import { getMessage } from './data/messages.js'

const App = () => {

  // state variables
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  // score doesn't really need to be held, but we'll use it later for handling Summary data/delighters
  const [score, setScore] = useState(0);

  const [nextButton, setNextButton] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState(null)

  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo (() => {
    const incorrectOptions = quizzes[currentQuiz].questions[currentQuestion].incorrectAnswers
    const correctOptions = quizzes[currentQuiz].questions[currentQuestion].correctAnswer

    const combinedOptions = [...incorrectOptions, correctOptions]

    return shuffle(combinedOptions)

  }, [currentQuiz, currentQuestion])
  console.log(answers)


  // handle Next Question Click
  const handleNextQuestionClick = () => {

    const nextQuestion = currentQuestion + 1
      setAnswerFeedback(null)
      setCurrentQuestion(nextQuestion)

    if(nextQuestion < quizzes[currentQuiz].questions.length){
      setCurrentQuestion(nextQuestion)
      setNextButton(false)
	
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
      setNextButton(false)
      setShowSummary(false)

    }else{
      setCurrentQuiz(0)
      setScore(0)
      setNextButton(false)
      setShowSummary(false)
    }
  }


  // Handle clicking an answer 
  const handleAnswerClick = (e, answer) => {
    const theCorrectAnswer = quizzes[currentQuiz].questions[currentQuestion].correctAnswer
    setNextButton(true)
  
    if( answer === theCorrectAnswer ){
      e.target.style.borderColor = 'green'
      setScore(score + 1)
      setAnswerFeedback('Correct!')

    } else {
      e.target.style.borderColor = 'red'
      e.target.style.textDecoration = 'line-through'
      e.target.style.textDecorationColor = 'black'
      setAnswerFeedback('...incorrect')

    }
  }


  return (
    <div className='app'>
       <div className='quiz-title'>{quizzes[currentQuiz].title}</div>
        {showSummary ? (
      <Summary score={score} quizTotal={quizzes[currentQuiz].questions} totalCorrect={''} handleNextQuizClick={handleNextQuizClick} getMessage={getMessage}/>
    ) : (
      <>
      <br></br>
        <div className='question-section'>
        <div className='question-text'>{quizzes[currentQuiz].questions[currentQuestion].text}</div>
      <br></br>
        <div className='answer-section'>
        {answers.map((answer) => 
            <li className='answer-list' key={answer} onClick={(e) => handleAnswerClick(e, answer)}>{answer}</li>
        )}
      </div>
      </div>
        <h3 className='correct-incorrect-message' style={{display : answerFeedback ? 'block' : 'none'}}>{answerFeedback}</h3>
        <h3 className='next-question' style={{display: nextButton ? 'block' : 'none'}} onClick={() => handleNextQuestionClick()}> Next </h3>
      </>
    )} 
  </div>
  )
};


export default App;

