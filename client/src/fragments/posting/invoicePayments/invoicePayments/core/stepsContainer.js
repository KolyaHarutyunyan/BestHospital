import React from 'react';
import { invoicePaymentsCoreStyle } from './styles';
import { Images } from '@eachbase/utils';

export const StepsContainer = ({ activeStep }) => {
    const classes = invoicePaymentsCoreStyle();

    const isFirst = activeStep === "first";
    const isLast = activeStep === "last";

    const firstStepStyle = `${classes.stepStyle} firstStep`; 
    const lastStepStyle = `${classes.stepStyle} lastStep ${isLast ? "active" : ""}`

  return (
    <div className={classes.stepsContainerStyle}>
        <div className={firstStepStyle}>
            {isFirst && <span>1</span>}
            {isLast && <img src={Images.checkmark} alt="" />}
        </div>
        <div className={classes.stepsLineStyle} />
        <div className={lastStepStyle}><span>2</span></div>
    </div>
  );
};
