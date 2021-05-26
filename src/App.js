import React, { useState, useMemo } from 'react';
import Summary from './components/Summary.js';

import { shuffle } from './helpers.js';
import { quizzes } from './data/quizzes.js';
import { getMessage } from './data/messages.js';

const App = () => {
  // state variables
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const [showSummary, setShowSummary] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  // combines and shuffles answers with Fischer/Yates helper
  const answers = useMemo(() => {
    const incorrectOptions =
      quizzes[currentQuiz].questions[currentQuestion].incorrectAnswers;
    const correctOptions =
      quizzes[currentQuiz].questions[currentQuestion].correctAnswer;

    const combinedOptions = [...incorrectOptions, correctOptions];

    return shuffle(combinedOptions);
  }, [currentQuiz, currentQuestion]);

  // getClasses adds the classes of correct/incorrect
  const getClasses = (currentAnswer) => {
    if (nextButton) {
      if (
        currentAnswer ===
        quizzes[currentQuiz].questions[currentQuestion].correctAnswer
      ) {
        return ' correct-answer';
      } else if (userAnswer === currentAnswer) {
        return ' incorrect-answer';
      }
    }
    return '';
  };

  // handleAnswerClick sends to handleAnswer
  const handleAnswerClick = (e, answer) => {
    if (!answerFeedback) {
      handleAnswer(e, answer);
    }
  };

  const handleAnswer = (e, answer) => {
    e.target.style.pointerEvents = 'none';
    setUserAnswer(answer);
    setNextButton(true);
    const theCorrectAnswer =
      quizzes[currentQuiz].questions[currentQuestion].correctAnswer;

    if (answer === theCorrectAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      setAnswerFeedback('Correct!');
    } else {
      setAnswerFeedback('Incorrect...');
    }
  };

  // Move to Next Question Click
  const handleNextQuestionClick = () => {
    const nextQuestion = currentQuestion + 1;
    setUserAnswer('');
    setAnswerFeedback(null);
    setCurrentQuestion(nextQuestion);

    if (nextQuestion < quizzes[currentQuiz].questions.length) {
      setCurrentQuestion(nextQuestion);
      setNextButton(false);
    } else {
      setCurrentQuestion(0);
      setShowSummary(true);
      // at the end of quiz add to attempts
      const newAttempt = attempts + 1;
      setAttempts(newAttempt);
    }
  };

  // Move to Next Quiz click, passed to Summary
  const handleNextQuizClick = () => {
    const nextQuiz = currentQuiz + 1;
    setCurrentQuiz(nextQuiz);

    if (nextQuiz < quizzes.length) {
      setCurrentQuiz(nextQuiz);
      setScore(0);
      setAttempts(0);
      setNextButton(false);
      setShowSummary(false);
    } else {
      setCurrentQuiz(0);
      setScore(0);
      setAttempts(0);
      setNextButton(false);
      setShowSummary(false);
    }
  };

  // Retake Click, passed to Summary
  const handleRetakeClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setNextButton(false);
    setShowSummary(false);
  };

  return (
    <div className="app">
      <div className="quiz-title">{quizzes[currentQuiz].title}</div>
      {showSummary ? (
        <Summary
          score={score}
          attempts={attempts}
          quizTotal={quizzes[currentQuiz].questions}
          handleNextQuizClick={handleNextQuizClick}
          handleRetakeClick={handleRetakeClick}
          getMessage={getMessage}
        />
      ) : (
        <>
          <br></br>
          <div className="question-section">
            <div className="question-text">
              {quizzes[currentQuiz].questions[currentQuestion].text}
            </div>
            <br></br>
            <div className="answer-section">
              {answers.map((answer) => (
                <li
                  className={`answer-list${getClasses(answer)}`}
                  key={`${currentQuestion}-${answer}`}
                  onClick={(e) => handleAnswerClick(e, answer)}
                >
                  {answer}
                </li>
              ))}
            </div>
          </div>
          <div className="feedback-and-button">
            <h3
              className="correct-incorrect-message"
              style={{ display: answerFeedback ? 'block' : 'none' }}
            >
              {answerFeedback}
            </h3>
            <button
              className="next-question"
              style={{ display: nextButton ? 'block' : 'none' }}
              onClick={() => handleNextQuestionClick()}
            >
              {' '}
              Next{' '}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
