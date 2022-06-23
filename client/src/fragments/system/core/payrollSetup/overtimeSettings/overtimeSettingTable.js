import React from "react";
import { OvertimeSettingTHead, OvertimeSettingTBody } from "./core";
import { PayrollSetupStyles } from "../styles";

export const OvertimeSettingTable = ({ overtimeSettings = [] }) => {
   const classes = PayrollSetupStyles();

   return (
      <div className={classes.overtimeSettingTableStyle}>
         <OvertimeSettingTHead />
         {overtimeSettings.map((overtimeSetting, index) => (
            <OvertimeSettingTBody key={index} overtimeSetting={overtimeSetting} />
         ))}
      </div>
   );
};
