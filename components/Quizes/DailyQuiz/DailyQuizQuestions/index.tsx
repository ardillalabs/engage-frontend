import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import SubHeader from "../../SubHeader";
import { Quiz } from "@/tsc-types/Quiz";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RootState } from "../../../../store";
import { getQuestionList, quizMarksSubmit } from "../../../../actions/Quiz";
import { getCookie } from 'cookies-next';
import { getCurrentUserDetails } from "@/actions/Auth";

// const quiz = {
//     totalQuestions: 2,
//     questions: [
//         {
//             questionNumber: 1,
//             question:
//                 'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
//             questionWord: 'Positive Activation',
//             options: [
//                 { id: 0, text: 'Not at all', score: 1 },
//                 { id: 1, text: 'Slightly', score: 2 },
//                 { id: 2, text: 'Moderately', score: 3 },
//                 { id: 3, text: 'Considerably', score: 4 },
//                 { id: 4, text: 'A great deal', score: 5 }],
//             type: 'MCQs'
//         },
//         {
//             questionNumber: 2,
//             question:
//                 'Thinking about yourself, on average, to what extent have you felt this way during the past few hours?',
//             questionWord: 'Negative Activation',
//             options: [
//                 { id: 0, text: 'Not at all', score: 5 },
//                 { id: 1, text: 'Slightly', score: 4 },
//                 { id: 2, text: 'Moderately', score: 3 },
//                 { id: 3, text: 'Considerably', score: 2 },
//                 { id: 4, text: 'A great deal', score: 1 }],
//             type: 'MCQs'
//         }
//     ],
// }

interface Props {
  getCurrentUserDetails: (...args: any[]) => any;
  getQuestionList: (quizId: number) => any;
  quiz: Quiz;
  quizMarksSubmit: (quizId: number, userId: number, marks: number) => any;
  auth: any;
}

const DailyQuizQuestions = ({
  getCurrentUserDetails,
  getQuestionList,
  quiz: { questionList },
  quizMarksSubmit,
  auth
}: Props) => {

  const cookie = getCookie('access_token');

  console.log(cookie);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showStart, setStart] = useState(true);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(0);
  const [isData, setData] = useState(false);

  useEffect(() => {
    getCurrentUserDetails(cookie);
  }, [getCurrentUserDetails]);

  console.log(auth);

  const userId = auth.id

  useEffect(() => {
    getQuestionList(2);
  }, [getQuestionList]);

  console.log(questionList)

  useEffect(() => {
    if (questionList.length > 0) {
      setData(true);
    }
  });

  const showDailyQuestions = () => {
    setStart(false);
    setShowQuiz(true);
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(-1);
    setResult((prevResult) => prevResult + score); // Add the current score to the result
    if (activeStep < questionList.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setActiveStep((prev) => prev + 1);
    } else {
      setShowQuiz(false);
      setResult((prevResult) => prevResult + score); // Add the current score to the final result
      const finalScore = result + score;
      console.log("Final Result:", result + score, finalScore, userId); // Log the final result
      quizMarksSubmit(2, Number(userId), finalScore);
    }
  };

  const onAnswerSelected = (score: any, id: number) => {
    setSelectedAnswerIndex(id);
    setSelectedAnswer(true);
    setScore(score);
    console.log(score, result);
  };

  // console.log('index', selectedAnswerIndex)
  // const { questions } = quiz
  // const { questionNumber, question, questionWord, options } = questions[activeQuestion]
  return (
    <div className={styles.mainDiv}>
      <div>
        {" "}
        {!isData ? (
          <div>
            <div className={styles.componentDiv}>
              <div className={styles.initialDivLoading}>
                <div className={styles.titleLoading}>Loading....</div>
                <div className={styles.bodyText}>Thanks for waiting!</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <>
              {showStart && (
                <SubHeader text="Let's establish your baseline mood for this day." />
              )}
            </>
            <div className={`${showQuiz ? styles.stepsDiv : styles.hideSteps}`}>
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={
                    activeQuestion === index
                      ? styles.activeQuestion
                      : styles.inactiveQuestion
                  }
                ></div>
              ))}
            </div>
            <div
              className={`${
                !showQuiz && !showStart ? styles.stepsDiv : styles.hideSteps
              }`}
            ></div>
            {showStart ? (
              <div className={styles.componentDiv}>
                <div className={styles.bodyDiv}>
                  Please fill out this 2 question quiz to see where you are at!
                </div>
                <div className={styles.questionNoDiv}>
                  {Array.from({ length: 2 }, (_, index) => (
                    <button key={index + 1}>{index + 1}</button>
                  ))}
                </div>
                <div className={styles.buttonDiv}>
                  <button onClick={showDailyQuestions}>Start Quiz</button>
                </div>
              </div>
            ) : (
              <>
                {showQuiz ? (
                  <section>
                    <div className={styles.componentDiv}>
                      <div className={styles.quetionText}>
                        {questionList[activeQuestion]?.description}
                      </div>
                      <div className={styles.questionWord}>
                        <button disabled>
                          {activeQuestion + 1}.
                          {questionList[activeQuestion]?.keyword}
                        </button>
                      </div>
                      <ul>
                        <li
                          onClick={() =>
                            onAnswerSelected(
                              questionList[activeQuestion]?.option1_score,
                              0
                            )
                          }
                          className={
                            selectedAnswerIndex === 0
                              ? `${styles.selectedAnswer} ${styles.selectedAnswerClicked}`
                              : styles.selectedAnswer
                          }
                        >
                          {questionList[activeQuestion]?.option1}
                        </li>
                        <li
                          onClick={() =>
                            onAnswerSelected(
                              questionList[activeQuestion].option2_score,
                              1
                            )
                          }
                          className={
                            selectedAnswerIndex === 1
                              ? `${styles.selectedAnswer} ${styles.selectedAnswerClicked}`
                              : styles.selectedAnswer
                          }
                        >
                          {questionList[activeQuestion]?.option2}
                        </li>
                        <li
                          onClick={() =>
                            onAnswerSelected(
                              questionList[activeQuestion].option3_score,
                              2
                            )
                          }
                          className={
                            selectedAnswerIndex === 2
                              ? `${styles.selectedAnswer} ${styles.selectedAnswerClicked}`
                              : styles.selectedAnswer
                          }
                        >
                          {questionList[activeQuestion]?.option3}
                        </li>
                        <li
                          onClick={() =>
                            onAnswerSelected(
                              questionList[activeQuestion].option4_score,
                              3
                            )
                          }
                          className={
                            selectedAnswerIndex === 3
                              ? `${styles.selectedAnswer} ${styles.selectedAnswerClicked}`
                              : styles.selectedAnswer
                          }
                        >
                          {questionList[activeQuestion]?.option4}
                        </li>
                        <li
                          onClick={() =>
                            onAnswerSelected(
                              questionList[activeQuestion].option5_score,
                              4
                            )
                          }
                          className={
                            selectedAnswerIndex === 4
                              ? `${styles.selectedAnswer} ${styles.selectedAnswerClicked}`
                              : styles.selectedAnswer
                          }
                        >
                          {questionList[activeQuestion]?.option5}
                        </li>
                      </ul>
                      <button
                        className={
                          selectedAnswer
                            ? styles.nextButton
                            : styles.nextButtonDisabled
                        }
                        onClick={onClickNext}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                ) : (
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
                      <div className={styles.bodyText}>
                        Thanks for your time!
                      </div>
                      <Link href="/dashboard">
                        <div className={styles.finishButton}>
                          <button>Back to Profile</button>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// export default DailyQuizQuestions
DailyQuizQuestions.propTypes = {
  getCurrentUserDetails: PropTypes.func.isRequired,
  getQuestionList: PropTypes.func.isRequired,
  quizMarksSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  quiz: state.quiz,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentUserDetails,
  getQuestionList,
  quizMarksSubmit,
})(DailyQuizQuestions);
