import React from 'react';

const Summary = (props) => {

    const onNextQuiz = () => {
        props.handleNextQuizClick()
    }

    const onRetake = () => {
        props.handleRetakeClick()
    }

    return(
        <div>
            <h3 className='score'>You scored {props.score} of {props.quizTotal.length} questions right! </h3>
            <h3 className='attempts'> This was attempt number {props.attempts} </h3>
            {props.getMessage()}
        <br></br>
        <div className='summary-buttons'>
            <h3 className='next-quiz-button' onClick={onNextQuiz}>Next Quiz</h3>
            <h3 className='retake-quiz-button' onClick={onRetake}>Retake{console.log(onRetake)}</h3>
        </div>
        </div>
    )
}

export default Summary