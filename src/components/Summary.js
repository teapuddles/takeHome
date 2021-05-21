import React from 'react';

const Summary = (props) => {

    const onNextQuiz = () => {
        props.handleNextQuizClick()
    }

    return(
        <div>
        <h3 className='score'>You scored {props.score} of {props.quizTotal.length} questions right! </h3>
        {props.getMessage()}
        <br></br>
        <h3 className='next-quiz-button' onClick={onNextQuiz}>Next Quiz</h3>
        </div>
    )
}

export default Summary