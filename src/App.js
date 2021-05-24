import React, {useState, useMemo} from 'react';
import Summary from './components/Summary.js'

import { shuffle } from './helpers.js'
import { quizzes } from './data/quizzes.js'
import { getMessage } from './data/messages.js'

const App = () => {


  // state variables
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const [showSummary, setShowSummary] = useState(false)
  const [nextButton, setNextButton] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState(null)


  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo (() => {
    const incorrectOptions = quizzes[currentQuiz].questions[currentQuestion].incorrectAnswers
    const correctOptions = quizzes[currentQuiz].questions[currentQuestion].correctAnswer

    const combinedOptions = [...incorrectOptions, correctOptions]

    return shuffle(combinedOptions)

  }, [currentQuiz, currentQuestion])


  // handleAnswerClick sends to handleAnswer 
  const handleAnswerClick = (e, answer) => {
    if(!answerFeedback) {
      handleAnswer(e, answer)
    } 
  }


  const handleAnswer = (e, answer) => {
    e.target.style.pointerEvents = 'none'
    e.target.style.borderColor = 'green'

    const theCorrectAnswer = quizzes[currentQuiz].questions[currentQuestion].correctAnswer
    const selectedAnswer = answer

    setNextButton(true)
  
    if( selectedAnswer === theCorrectAnswer ){
      const newScore = score + 1
      setScore(newScore)
      setAnswerFeedback('Correct!')

    } else {
      e.target.style.borderColor = 'red'
      e.target.style.textDecoration = 'line-through'
      e.target.style.textDecorationColor = 'black'
      
      setAnswerFeedback('Incorrect...')

    }
  }


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
      // at the end of quiz add to attempts
      const newAttempt = attempts + 1
      setAttempts(newAttempt)
		}
  }


  // next quiz click passed to Summary
  const handleNextQuizClick = () => {

    const nextQuiz = currentQuiz + 1
    setCurrentQuiz(nextQuiz)

    if(nextQuiz < quizzes.length){
      setCurrentQuiz(nextQuiz)
      setScore(0)
      setAttempts(0)
      setNextButton(false)
      setShowSummary(false)

    }else{
      setCurrentQuiz(0)
      setScore(0)
      setAttempts(0)
      setNextButton(false)
      setShowSummary(false)
    }
  }

// 
  const handleRetakeClick = () => {
    setCurrentQuestion(0)
    setScore(0)
    setNextButton(false)
    setShowSummary(false)
  }
  


  return (
    <div className='app'>
       <div className='quiz-title'>{quizzes[currentQuiz].title}</div>

        {showSummary ? (
      <Summary score={score} attempts={attempts} quizTotal={quizzes[currentQuiz].questions} handleNextQuizClick={handleNextQuizClick} handleRetakeClick={handleRetakeClick} getMessage={getMessage}/>
    ) : (

      <>
      <br></br>
        <div className='question-section'>
        <div className='question-text'>{quizzes[currentQuiz].questions[currentQuestion].text}</div>
      <br></br>
        <div className='answer-section' key={currentQuestion}>
        {answers.map((answer) => 
        // if(answerFeedback ? onClick : console.log())
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

// TO DOS:

// assign attempts to their proper quizzes instead of total attempts for all quizzes  ****I THINK IT COULD BE DONE BETTER BUT ITS DONE******

// write your tests