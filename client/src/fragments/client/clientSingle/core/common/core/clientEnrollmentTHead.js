import React from "react";
import { clientEnrollmentCommonCoreStyle } from "./styles";

export const ClientEnrollmentTHead = () => {
   const classes = clientEnrollmentCommonCoreStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{"Primary"}</div>
         <div className={classes.thStyle}>{"Funding Source"}</div>
         <div className={classes.thStyle}>{"Client ID"}</div>
         <div className={classes.thStyle}>{"Start Date"}</div>
         <div className={classes.thStyle}>{"Termination Date"}</div>
         <div className={classes.thStyle}>{"Action"}</div>
      </div>
   );
};
