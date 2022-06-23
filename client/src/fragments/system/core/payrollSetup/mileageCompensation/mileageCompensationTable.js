import React from "react";
import { MileageCompansationTHead, MileageCompansationTBody } from "./core";
import { PayrollSetupStyles } from "../styles";

export const MileageCompensationTable = ({ mileageCompensations = [] }) => {
   const classes = PayrollSetupStyles();

   return (
      <div className={classes.mileageCompensationTableStyle}>
         <MileageCompansationTHead />
         {mileageCompensations.map((mileageCompensation, index) => (
            <MileageCompansationTBody
               key={index}
               mileageCompensation={mileageCompensation}
            />
         ))}
      </div>
   );
};
