import React from 'react'
import { useState } from 'react'
import styles from "./index.module.css";
import Link from 'next/link';
import { AiFillCheckCircle } from 'react-icons/ai';
import SubHeader from '../../SubHeader';

const quiz = {
    totalQuestions: 10,
    questions: [
        {
            questionNumber: 1,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Active',
            options: [
                { id: 0, text: 'Not at all', score: 1 },
                { id: 1, text: 'Slightly', score: 2 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 4 },
                { id: 4, text: 'A great deal', score: 5 }],
            type: 'MCQs'
        },
        {
            questionNumber: 2,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Determined',
            options: [
                { id: 0, text: 'Not at all', score: 5 },
                { id: 1, text: 'Slightly', score: 4 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 2 },
                { id: 4, text: 'A great deal', score: 1 }],
            type: 'MCQs'
        },
        {
            questionNumber: 3,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Attentive',
            options: [
                { id: 0, text: 'Not at all', score: 1 },
                { id: 1, text: 'Slightly', score: 2 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 4 },
                { id: 4, text: 'A great deal', score: 5 }],
            type: 'MCQs'
        },
        {
            questionNumber: 4,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Inspired',
            options: [
                { id: 0, text: 'Not at all', score: 5 },
                { id: 1, text: 'Slightly', score: 4 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 2 },
                { id: 4, text: 'A great deal', score: 1 }],
            type: 'MCQs'
        },
        {
            questionNumber: 5,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Alert',
            options: [
                { id: 0, text: 'Not at all', score: 1 },
                { id: 1, text: 'Slightly', score: 2 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 4 },
                { id: 4, text: 'A great deal', score: 5 }],
            type: 'MCQs'
        },
        {
            questionNumber: 6,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Afraid',
            options: [
                { id: 0, text: 'Not at all', score: 5 },
                { id: 1, text: 'Slightly', score: 4 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 2 },
                { id: 4, text: 'A great deal', score: 1 }],
            type: 'MCQs'
        },
        {
            questionNumber: 7,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Nerves',
            options: [
                { id: 0, text: 'Not at all', score: 1 },
                { id: 1, text: 'Slightly', score: 2 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 4 },
                { id: 4, text: 'A great deal', score: 5 }],
            type: 'MCQs'
        },
        {
            questionNumber: 8,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Upset',
            options: [
                { id: 0, text: 'Not at all', score: 5 },
                { id: 1, text: 'Slightly', score: 4 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 2 },
                { id: 4, text: 'A great deal', score: 1 }],
            type: 'MCQs'
        },
        {
            questionNumber: 9,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Hostile',
            options: [
                { id: 0, text: 'Not at all', score: 1 },
                { id: 1, text: 'Slightly', score: 2 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 4 },
                { id: 4, text: 'A great deal', score: 5 }],
            type: 'MCQs'
        },
        {
            questionNumber: 10,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Ashamed',
            options: [
                { id: 0, text: 'Not at all', score: 5 },
                { id: 1, text: 'Slightly', score: 4 },
                { id: 2, text: 'Moderately', score: 3 },
                { id: 3, text: 'Considerably', score: 2 },
                { id: 4, text: 'A great deal', score: 1 }],
            type: 'MCQs'
        }
    ],
}

const WeeklyQuizQuestions = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
    const [showQuiz, setShowQuiz] = useState(false)
    const [showStart, setStart] = useState(true)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(0)

    const showWeeklyQuestions = () => {
        setStart(false)
        setShowQuiz(true)
    }

    const onClickNext = () => {
        console.log('score', score)
        console.log(result)
        setResult((prevResult) => prevResult + score); // Add the current score to the result
        if (activeStep < questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
            setActiveStep((prev) => prev + 1)
            console.log(activeStep, questions.length)
        }
        else {
            setShowQuiz(false)
            setResult((prevResult) => prevResult + score); // Add the current score to the final result
            console.log('Quiz is finished');
            console.log('Final Result:', result + score); // Log the final result
        }
    }

    const onAnswerSelected = (score: any, id: any) => {
        setSelectedAnswerIndex(id)
        setSelectedAnswer(true)
        setScore(score)
        console.log(score, result)
    }

    if (showStart) {
        console.log(showStart);
        <SubHeader text="Let's establish your baseline mood for this week." />
    }

    console.log('index', selectedAnswerIndex)
    const { questions } = quiz
    const { questionNumber, question, questionWord, options } = questions[activeQuestion]
    return (
        <div className={styles.mainDiv}>
            <>
                {showStart && <SubHeader text="Let's establish your baseline mood for this week." />}
            </>
            <div className={`${showQuiz ? styles.stepsDiv : styles.hideSteps}`}>
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className={questionNumber === index + 1 ? styles.activeQuestion : styles.inactiveQuestion}
                    ></div>
                ))}
            </div>
            <div className={`${!showQuiz && !showStart ? styles.stepsDiv : styles.hideSteps}`}></div>
            {showStart ? (
                <div className={styles.componentDiv}>
                    <div className={styles.bodyDiv}>Please fill out this 10 question quiz to see where you are at!</div>
                    <div className={styles.questionNoDiv}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <button key={index + 1}>{index + 1}</button>
                        ))}
                    </div>
                    <div className={styles.questionNoDivMobile}>
                        <div className={styles.topQuesNoDiv}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <button key={index + 1}>{index + 1}</button>
                            ))}
                        </div>
                        <div className={styles.bottomQuesNoDiv}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <button key={index + 6}>{index + 6}</button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.buttonDiv}>
                        <button onClick={showWeeklyQuestions}>Start Quiz</button>
                    </div>
                </div>) :
                <>
                    {showQuiz ? (
                        <section>
                            <div className={styles.componentDiv}>
                                <div className={styles.quetionText}>{question}</div>
                                <div className={styles.questionWord}><button disabled>{questionNumber}. {questionWord}</button></div>
                                <ul>
                                    {options.map((option) => (
                                        <li
                                            onClick={() => onAnswerSelected(option.score, option.id)}
                                            key={option.id}
                                            className={selectedAnswerIndex === option.id ? styles.selectedAnswer : ''}>
                                            {option.text}
                                        </li>
                                    ))}
                                </ul>
                                <button className={styles.nextButton} onClick={onClickNext}>Next</button>
                            </div>
                        </section>
                    ) :
                        <div className={styles.componentDiv}>
                            <div className={`${styles.wrapperDiv} ${!showQuiz && !showStart ? '' : styles.hideFinishDiv}`}>
                                <div className={styles.circleDiv}>
                                    <div className={styles.innerCircleDiv}>
                                        {/* <AiOutlineCheckCircle size={60}/> */}
                                        <AiFillCheckCircle />
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.finishDiv} ${!showQuiz && !showStart ? '' : styles.hideFinishDiv}`}>
                                <div className={styles.title}>Finished</div>
                                <div className={styles.bodyText}>Thanks for your time!</div>
                                <Link href='/dashboard'>
                                    <div className={styles.finishButton}>
                                        <button>Back to Profile</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    }

                </>
            }
        </div>
    )
}

export default WeeklyQuizQuestions