import React, { useContext } from "react";
import { PayrollSetupStyles } from "../../styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const SystemPaycodeTypeTHead = () => {
   const classes = PayrollSetupStyles();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getPaycodeTypeTitle(givenTitle = "", ...rest) {
      const size = open ? 1865 : 1670;
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, 4),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "262px" }}>
            {getPaycodeTypeTitle("Name", "", true)}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "144px" }}>
            {"Code"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "190px" }}>
            {getPaycodeTypeTitle("Type", "arrow", true)}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "182px" }}>
            {getPaycodeTypeTitle("Overtime Applied")}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "150px" }}>
            {getPaycodeTypeTitle("PTO Accrued")}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "128px" }}>
            {"Action"}
         </div>
      </div>
   );
};
