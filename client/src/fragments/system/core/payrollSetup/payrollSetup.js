import React, { useState } from "react";
import { PayrollSetupStyles } from "./styles";
import { useSelector } from "react-redux";
import { NoItemText } from "@eachbase/components";
import { PayCodeType, SystemPaycodeTypeTable } from "./paycodeType";
import { OvertimeSettings, OvertimeSettingTable } from "./overtimeSettings";
import { MileageCompensation, MileageCompensationTable } from "./mileageCompensation";

export const PayrollSetup = ({ globalOvertimeSettings, globalPayCodes }) => {
   const classes = PayrollSetupStyles();

   const mileages = useSelector((state) => state.mileage.mileages);

   const [activeStep, setActiveStep] = useState(0);

   const showActiveStep = (activeStep) => {
      if (activeStep === 0) {
         return (
            <div className={classes.wrapper}>
               <PayCodeType marginTop="34px" marginRight="16px" maxWidth="508px" />
               {!!globalPayCodes?.length ? (
                  <SystemPaycodeTypeTable paycodeTypes={globalPayCodes} />
               ) : (
                  <div className={classes.noItemContainerStyle}>
                     <NoItemText text="No Paycode Types Yet" />
                  </div>
               )}
            </div>
         );
      } else if (activeStep === 1) {
         return (
            <div className={classes.wrapper}>
               <OvertimeSettings marginTop="34px" marginRight="16px" maxWidth="508px" />
               {!!globalOvertimeSettings?.length ? (
                  <OvertimeSettingTable overtimeSettings={globalOvertimeSettings} />
               ) : (
                  <div className={classes.noItemContainerStyle}>
                     <NoItemText text={"No Overtime Settings Yet"} />
                  </div>
               )}
            </div>
         );
      } else if (activeStep === 2) {
         return (
            <div className={classes.wrapper}>
               <MileageCompensation
                  marginTop="34px"
                  marginRight="16px"
                  maxWidth="508px"
               />
               {!!mileages?.length ? (
                  <MileageCompensationTable mileageCompensations={mileages} />
               ) : (
                  <div className={classes.noItemContainerStyle}>
                     <NoItemText text={"No Mileage Compensations Yet"} />
                  </div>
               )}
            </div>
         );
      }
   };

   const changeActiveStep = (stepNumber) => {
      setActiveStep(stepNumber);
   };

   const tabNavigation = () => {
      return (
         <>
            <p
               className={
                  activeStep === 0
                     ? [`${classes.activeStepText} ${classes.stepText}`]
                     : classes.stepText
               }
               onClick={() => changeActiveStep(0)}
            >
               PayCode Types
            </p>
            <p
               className={
                  activeStep === 1
                     ? [`${classes.activeStepText} ${classes.stepText}`]
                     : classes.stepText
               }
               onClick={() => changeActiveStep(1)}
            >
               Overtime Settings
            </p>
            <p
               className={
                  activeStep === 2
                     ? [`${classes.activeStepText} ${classes.stepText}`]
                     : classes.stepText
               }
               onClick={() => changeActiveStep(2)}
            >
               Mileage Compensation
            </p>
         </>
      );
   };

   return (
      <>
         <div className={classes.tabContainer}>{tabNavigation()}</div>
         <div className={classes.payrollSetupWrapper}>{showActiveStep(activeStep)}</div>
      </>
   );
};
