import React, {useState} from 'react';
import {PayrollSetupStyles} from './styles';
import {PayCodeType ,PayCodeTable} from "./paycodeType/";
import { OvertimeTable, OvertimeSettings } from "./overtimeSettings";

export const PayrollSetup = ({globalOvertimeSettings, globalPayCodes}) => {
    const classes = PayrollSetupStyles()

    const [activeStep, setActiveStep] = useState(0);

    const showActiveStep = (activeStep) => {
        if (activeStep === 0) {
            return (
                <div className={classes.wrapper}>
                    <PayCodeType marginTop='30px' marginRight='16px' maxWidth='508px' />
                    <PayCodeTable globalPayCodes={globalPayCodes} />
                </div>
            )
        } else if (activeStep === 1) {
            return (
                <div className={classes.wrapper}>
                    <OvertimeSettings marginTop='30px' marginRight='16px' maxWidth='508px' />
                    <OvertimeTable globalOvertimeSettings={globalOvertimeSettings} />
                </div>
            )
        } else if (activeStep === 2) {
            return <div>Mileage Compensation third screen</div>
        }
    }
    const changeActiveStep = (stepNumber) => {
        setActiveStep(stepNumber)
    }

    const tabNavigation = () => {
        return (
            <>
                <p className={activeStep === 0 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveStep(0)}>PayCode Types</p>
                <p className={activeStep === 1 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveStep(1)}>OverTiming
                    Settings</p>
                <p className={activeStep === 2 ? [`${classes.activeStepText} ${classes.stepText}`] : classes.stepText}
                   onClick={() => changeActiveStep(2)}>Mileage
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