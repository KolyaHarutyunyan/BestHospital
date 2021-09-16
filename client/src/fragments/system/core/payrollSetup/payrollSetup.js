import React, {useState} from 'react';
import {PayrollSetupStyles} from './styles';
import {PayCodeType ,PayCodeTable} from "./paycodeType/";

export const PayrollSetup = () => {
    const classes = PayrollSetupStyles()

    const [activeStep, setActiveStep] = useState(0);



    const showActiveStep = (activeStep) => {
        if (activeStep === 0) {
            return (
                <div className={classes.payCodeTypeWrapper}>
                    <PayCodeType marginTop='34px' marginRight='16px' maxWidth='508px' />
                    <PayCodeTable />
                </div>
            )
        } else if (activeStep === 1) {
            return <div>overTiming Settings second screen</div>
        } else if (activeStep === 2) {
            return <div>Mileage Compensation third screen</div>
        }
    }
    const changeActiveSte = (stepNumber) => {
        setActiveStep(stepNumber)
    }
    const tabNavigation = () => {
        return (
            <>
                <p className={activeStep === 0 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveSte(0)}>PayCode Types</p>
                <p className={activeStep === 1 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveSte(1)}>OverTiming
                    Settings</p>
                <p className={activeStep === 2 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveSte(2)}>Mileage
                    Compensation</p>
            </>
        )
    }

    return (
        <>
            <div className={classes.tabContainer}>
                {tabNavigation()}
            </div>
            <div className={classes.payrollSetupWrapper}>
                {showActiveStep(activeStep)}
            </div>
        </>
    )
}