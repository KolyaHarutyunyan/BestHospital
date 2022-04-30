import React from "react";
import { containersStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const TwoStepsContainer = ({ activeStep, firstStepLabel, lastStepLabel }) => {
   const classes = containersStyle();

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const firstStepStyle = `${classes.stepStyle} firstStep`;
   const lastStepStyle = `${classes.stepStyle} lastStep ${isLast ? "active" : ""}`;

   return (
      <div className={classes.stepsContainerStyle}>
         <div className={classes.stepBoxStyle}>
            <div className={firstStepStyle}>
               {isFirst && <span>1</span>}
               {isLast && <img src={Images.checkmark} alt="" />}
            </div>
            {!!firstStepLabel && (
               <span className={classes.stepLabelStyle}>{firstStepLabel}</span>
            )}
         </div>
         <div className={classes.stepsLineStyle} />
         <div className={classes.stepBoxStyle}>
            <div className={lastStepStyle}>
               <span>2</span>
            </div>
            {!!lastStepLabel && (
               <span className={classes.stepLabelStyle}>{lastStepLabel}</span>
            )}
         </div>
      </div>
   );
};
