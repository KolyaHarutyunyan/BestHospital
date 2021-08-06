import React from 'react';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import generalIcon from '@eachbase/assets/images/icons/generalInfo.svg';
import address from '@eachbase/assets/images/icons/address.svg';
import otherDetails from '@eachbase/assets/images/icons/otherDetails.svg';
import {stepStyles, useStyles, useColorlibStepIconStyles, ColorlibConnector} from "./styles";
import checkmark from "@eachbase/assets/images/icons/checkmark.svg";
import {CreateChancel} from "@eachbase/components";

export const Steps = ({disableSecond,disabledOne, handleClick, stepTitles, handleClose, firstStep, secondStep, thirdStep}) => {

    const classes = useStyles();
    const stepsStyles = stepStyles()
    const [activeStep, setActiveStep] = React.useState(0);
    console.log(disableSecond,'disabledOne');
    const handleNext = () => {
        if (activeStep !== stepTitles.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            console.log('aaaa')
        }
        else {
            handleClick()
        }
    };

    const handleBack = (step) => {
        setActiveStep(step - 1);
    };

    function ColorlibStepIcon(props) {
        const classes = useColorlibStepIconStyles();
        const {active, completed} = props;

        const icons = {
            1: completed ? <img src={checkmark} alt={"checked"}/> : <img src={generalIcon} alt={"generalIcon"}/>,
            2: completed ? <img src={checkmark} alt={"checked"}/> : <img src={address} alt={"address"}/>,
            3: completed ? <img src={checkmark} alt={"checked"}/> : <img src={otherDetails} alt={"otherDetails"}/>,
        };
        // change icons

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
                onClick={() => {
                    completed && handleBack(props.icon)
                }
                }
            >
                {icons[String(props.icon)]}
            </div>

        );

    }
    return (
        <div className={classes.root}>
            <Stepper className={stepsStyles.stepHeader} alternativeLabel activeStep={activeStep}
                     connector={<ColorlibConnector/>}>
                {stepTitles.map((label) => (
                    <Step key={label}>
                        <StepLabel classes={{label: classes.step_label_root}} StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className={stepsStyles.stepBody}>
                {activeStep === 0 ?
                    <React.Fragment>{firstStep}</React.Fragment> : activeStep === 1 ?
                        <React.Fragment>{secondStep}</React.Fragment> :
                        <React.Fragment>{thirdStep}</React.Fragment>}
                <div className={stepsStyles.buttonsContainer}>
                    <CreateChancel
                        buttonWidth='224px'
                        create={activeStep === stepTitles.length - 1 ? 'Add' : 'Next'}
                        chancel={"Cancel"}
                        onClose={handleClose}
                        onCreate={handleNext}
                        disabled={activeStep === 0 ? !disabledOne : activeStep === 1 ? disableSecond : false}
                    />
                </div>
            </div>

            {/*<CreateChancel  />*/}

        </div>
    );
}

