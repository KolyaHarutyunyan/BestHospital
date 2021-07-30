import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import generalIcon from '@eachbase/assets/images/icons/generalInfo.svg';
import {stepStyles} from "./styles";
import {useStyles} from "./styles";
import {useColorlibStepIconStyles} from "./styles";
import {Colors} from "../../utils";
import checkmark from "@eachbase/assets/images/icons/checkmark.svg";
import {AddButton,AddCircle,AddModalButton,CloseButton,CreateChancel,DeleteButton,EditButton,EditSaveButtons,SignIn,ButtonsTab} from "../buttons";

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
        left: 'calc(-50% + 38px)',
        right: 'calc(50% + 38px)'
    },

    line: {
        border: `1px dashed ${Colors.TextLight}`,
        borderRadius: 'unset',
    }
})(StepConnector);

function ColorlibStepIcon(props) {

    const classes = useColorlibStepIconStyles();

    const {active, completed} = props;

    const icons = {
        1: completed ? <img src={checkmark} alt={"checked"}/> : <img src={generalIcon} alt={"checked"}/>,
        2: completed ? <img src={checkmark} alt={"checked"}/> : <img src={generalIcon} alt={"checked"}/>,
        3: completed ? <img src={checkmark} alt={"checked"}/> : <img src={generalIcon} alt={"checked"}/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>

    );

}

function Step1() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
            <input type="text"/>
        </div>
    )
}

function Step2() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
            <input type="text"/>
            <input type="text"/>
        </div>
    )
}

function Step3() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
        </div>
    )
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Step1/>;
        case 1:
            return <Step2/>;
        case 2:
            return <Step3/>;
        default:
            return 'Unknown step';
    }
}

export const Steps = ({stepTitles, icon}) => {
    const classes = useStyles();
    const stepsStyles = stepStyles()
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if(activeStep !== stepTitles.length - 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === stepTitles.length - 1 ? 'Add' : 'Next'}
                    </Button>
                </div>
            </div>

            {/*<CreateChancel  />*/}

        </div>
    );
}

