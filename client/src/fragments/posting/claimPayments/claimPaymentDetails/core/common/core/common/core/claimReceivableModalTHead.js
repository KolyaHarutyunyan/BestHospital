import React from "react";
import { claimModalTHeadTBodyStyle } from "./styles";
import { getLimitedVal, getTableHeader, useWidth } from "@eachbase/utils";

export const ClaimReceivableModalTHead = () => {
   const classes = claimModalTHeadTBodyStyle();

   const width = useWidth();

   function getReceivTitle(givenTitle = "", ...rest) {
      const limit = width <= 1680 ? 4 : 9;

      return getTableHeader(givenTitle, getLimitedVal(givenTitle, limit), ...rest);
   }

   const dateOfService = getReceivTitle("Date of Service", "latestEarliest", true, true);
   const cptCodeAndModif = getReceivTitle("CPT Code (Modifier)", "", false);
   const totalUnits = getReceivTitle("Total Units", "", false);
   const allowedAMT = getReceivTitle("Allowed AMT", "", false);
   const deductible = getReceivTitle("Deductible", "", false);
   const copay = getReceivTitle("Copay", "", false);
   const coINS = getReceivTitle("CoINS", "", false);
   const paidAMT = getReceivTitle("Paid AMT", "", false);
   const action = getReceivTitle("Action", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{dateOfService}</div>
         <div className={classes.thStyle}>{cptCodeAndModif}</div>
         <div className={classes.thStyle}>{totalUnits}</div>
         <div className={classes.thStyle}>{allowedAMT}</div>
         <div className={classes.thStyle}>{deductible}</div>
         <div className={classes.thStyle}>{copay}</div>
         <div className={classes.thStyle}>{coINS}</div>
         <div className={classes.thStyle}>{paidAMT}</div>
         <div className={classes.thStyle}>{action}</div>
      </div>
   );
};
