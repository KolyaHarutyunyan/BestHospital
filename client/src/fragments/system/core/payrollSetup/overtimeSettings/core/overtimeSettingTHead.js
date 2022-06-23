import React, { useContext } from "react";
import { PayrollSetupStyles } from "../../styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const OvertimeSettingTHead = () => {
   const classes = PayrollSetupStyles();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getOvertimeSettingTitle(givenTitle = "", ...rest) {
      const size = open ? 1865 : 1670;
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, 4),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "232px" }}>
            {"Name"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "232px" }}>
            {getOvertimeSettingTitle("Type", "arrow", true)}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "232px" }}>
            {"Threshold"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "232px" }}>
            {getOvertimeSettingTitle("Multiplier")}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "128px" }}>
            {"Action"}
         </div>
      </div>
   );
};
