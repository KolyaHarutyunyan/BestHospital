import React from "react";
import { staffSingleCoreCommonStyle } from "./style";
import { PaycodeTHead, PaycodeTBody } from "./core";

export const PaycodeTable = ({ paycodes = [] }) => {
   const classes = staffSingleCoreCommonStyle();

   return (
      <div className={classes.paycodeTableStyle}>
         <PaycodeTHead />
         {paycodes.map((paycode, index) => (
            <PaycodeTBody key={index} paycode={paycode} />
         ))}
      </div>
   );
};
