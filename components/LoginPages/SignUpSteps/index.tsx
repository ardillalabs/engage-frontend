import React, { useState } from 'react'
import styles from './index.module.css'

interface prop {
    step: string
}

const SignUpSteps = ({step}: prop) => {
    const[activeStep, setActiveStep] = useState<string>(step)
    function changeStep(changedStep: string): any {
        setActiveStep(changedStep)
    }
  return (
    <div className={styles.stepsDiv}>
        <div  className={activeStep === "1" ? styles.activeStep : styles.inactiveStep} onClick={() => changeStep("1")}>1</div>
        <hr className={styles.lineDiv} />
        <div className={activeStep === "2" ? styles.activeStep : styles.inactiveStep} onClick={() =>changeStep("2")}>2</div>
        <hr className={styles.lineDiv} />
        <div className={activeStep === "3" ? styles.activeStep : styles.inactiveStep} onClick={() => changeStep("3")}>3</div>
  </div>
  )
}

export default SignUpSteps
