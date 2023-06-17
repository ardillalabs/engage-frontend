import React from 'react'
import { useState } from 'react'
import styles from "./index.module.css";
import Link from 'next/link';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import SubHeader from '../../SubHeader';

const quiz = {
    totalQuestions: 2,
    questions: [
        {
            questionNumber: 1,
            question:
                'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
            questionWord: 'Positive Activation',
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
            questionWord: 'Negative Activation',
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

const DailyQuizQuestions = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [activeStep, setActiveStep] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
    const [showStart, setStart] = useState(true)
    const [showQuiz, setShowQuiz] = useState(false)

    const showDailyQuestions = () => {
        setStart(false)
        setShowQuiz(true)
    }

    const onClickNext = () => {
        if (activeStep < questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
            setActiveStep((prev) => prev + 1)
            console.log(activeStep, questions.length)
        }
        else {
            setShowQuiz(false)
            console.log('Quiz is finished')
        }
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
                {showStart && <SubHeader text="Let's establish your baseline mood for this day." />}
            </>
            <div className={`${showQuiz ? styles.stepsDiv : styles.hideSteps}`}>
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className={questionNumber === index + 1 ? styles.activeQuestion : styles.inactiveQuestion}
                    ></div>
                ))}
            </div>
            <div className={`${!showQuiz && !showStart ? styles.stepsDiv : styles.hideSteps}`}></div>
            {showStart ? (
                <div className={styles.componentDiv}>
                    <div className={styles.bodyDiv}>Please fill out this 2 question quiz to see where you are at!</div>
                    <div className={styles.questionNoDiv}>
                        {Array.from({ length: 2 }, (_, index) => (
                            <button key={index + 1}>{index + 1}</button>
                        ))}
                    </div>
                    <div className={styles.buttonDiv}>
                        <button onClick={showDailyQuestions}>Start Quiz</button>
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
                                        <li key={option.id}>
                                            {option.text}
                                        </li>
                                    ))}
                                </ul>
                                <button className={styles.nextButton} onClick={onClickNext}>Next</button>
                            </div>
                        </section>
                    ) :
                        <div className={styles.componentDiv}>
                            <div className={styles.wrapperDiv}>
                                <div className={styles.circleDiv}>
                                    <div className={styles.innerCircleDiv}>
                                        {/* <AiOutlineCheckCircle size={60}/> */}
                                        <AiFillCheckCircle />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.finishDiv}>
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

export default DailyQuizQuestions