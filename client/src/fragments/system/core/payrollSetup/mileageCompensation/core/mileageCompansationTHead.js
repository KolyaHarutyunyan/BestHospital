import React, { useContext } from "react";
import { PayrollSetupStyles } from "../../styles";
import { DrawerContext, hooksForTable, useWidth } from "@eachbase/utils";

export const MileageCompansationTHead = () => {
   const classes = PayrollSetupStyles();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { getTableHeader, getTextDependsOnWidth } = hooksForTable;

   function getMileageCompensationTitle(givenTitle = "", ...rest) {
      const size = open ? 1865 : 1670;
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, 4),
         ...rest
      );
   }

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle} style={{ maxWidth: "313px" }}>
            {getMileageCompensationTitle("Mileage Compensation", "", false)}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "312px" }}>
            {"Start Date"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "311px" }}>
            {"End Date"}
         </div>
         <div className={classes.thStyle} style={{ maxWidth: "121px" }}>
            {"Action"}
         </div>
      </div>
   );
};
