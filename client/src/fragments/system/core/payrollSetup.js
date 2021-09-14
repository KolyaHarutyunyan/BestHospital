import React, {useState} from 'react';
import {systemItemStyles} from './styles'

export const PayrollSetup = () => {

    const classes = systemItemStyles()

    const [activeStep, setActiveStep] = useState(0)

    const showActiveStep = (activeStep) => {
        if (activeStep === 0) {
            return <div>payCode types first screen</div>
        } else if (activeStep === 1) {
            return <div>overTiming Settings second screen</div>
        } else if (activeStep === 2) {
            return <div>Mileage Compensation third screen</div>
        }
    }

    const changeActiveSte = (stepNumber) => {
        setActiveStep(stepNumber)
    }

    return (
        <>
            <div className={classes.tabContainer}>
                <p className={[`${classes.activeStepText} ${classes.stepText}`]} onClick={() => changeActiveSte(0)}>PayCode Types</p>
                <p className={classes.stepText} onClick={() => changeActiveSte(1)}>OverTiming
                    Settings</p>
                <p className={classes.stepText} onClick={() => changeActiveSte(2)}>Mileage
                    Compensation</p>
            </div>

            {showActiveStep(activeStep)}
        </>
    )
}