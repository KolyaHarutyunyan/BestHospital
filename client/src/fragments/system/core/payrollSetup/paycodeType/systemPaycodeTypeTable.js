import React from "react";
import { SystemPaycodeTypeTHead, SystemPaycodeTypeTBody } from "./core";
import { PayrollSetupStyles } from "../styles";

export const SystemPaycodeTypeTable = ({ paycodeTypes = [] }) => {
   const classes = PayrollSetupStyles();

   return (
      <div className={classes.paycodeTypeTableStyle}>
         <SystemPaycodeTypeTHead />
         {paycodeTypes.map((paycodeType, index) => (
            <SystemPaycodeTypeTBody key={index} paycodeType={paycodeType} />
         ))}
      </div>
   );
};
