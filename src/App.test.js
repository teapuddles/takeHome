import React from 'react'
import App from './App'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
// can't test methods in functional components
// instead we'll test around what happens on the click
describe("My App", () => {

  it('Changes element style and renders "Correct!" on correct answer', () => {
   render(<App />)
   const rightAnswer = screen.getByText('h1')
   userEvent.click(rightAnswer)
   const feedbackElement = screen.getByText('Correct!')
    expect(rightAnswer.style.pointerEvents).toBe('none')
    expect(rightAnswer.style.borderColor).toBe('green')
    expect(feedbackElement).toBeInTheDocument()
  })


  it('Changes element style and renders "Incorrect..." on incorrect answer', () => {
   render(<App />)
   const wrongAnswer = screen.getByText('p')
   userEvent.click(wrongAnswer)
   const feedbackElement = screen.getByText('Incorrect...')
    expect(wrongAnswer.style.pointerEvents).toBe('none')
    expect(wrongAnswer.style.borderColor).toBe('red')
    expect(wrongAnswer.style.textDecoration).toBe('line-through')
    expect(wrongAnswer.style.textDecorationColor).toBe('black')
    expect(feedbackElement).toBeInTheDocument()
  })

// I know this doesn't work in app
// but this is how I would have tested for it
  it('Shows correct answer on wrong answer click', () => {
   render(<App />)
   const rightAnswer = screen.getByText('h1')
   const wrongAnswer = screen.getByText('p')
   userEvent.click(wrongAnswer)
    expect(rightAnswer.style.borderColor).toBe('green')
  })
})
