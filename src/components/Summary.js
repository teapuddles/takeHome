import React from 'react';

const Summary = (props) => {

    const onNextQuiz = () => {
        props.handleNextQuizClick()
    }

    return(
        <div>
        <h1 className='score'>{props.score}</h1>
        <button className='next-quiz-button' onClick={onNextQuiz}>Next Quiz</button>
        </div>
    )
}

export default Summary