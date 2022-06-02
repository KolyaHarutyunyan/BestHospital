import React from "react";
import { fundingSourceCommonCoreStyle } from "./styles";

export const ModifierTHead = () => {
   const classes = fundingSourceCommonCoreStyle();

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{"Modifier"}</div>
         <div className={classes.thStyle}>{"Credential"}</div>
         <div className={classes.thStyle}>{"Charge Rate"}</div>
         <div className={classes.thStyle}>{"Type"}</div>
         <div className={classes.thStyle}>{"Action"}</div>
         <div className={classes.thStyle}>{"Status"}</div>
      </div>
   );
};
