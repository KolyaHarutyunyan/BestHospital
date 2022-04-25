import React from "react";
import { claimReceivableTableStyle } from "./styles";
import { NoItemText } from "@eachbase/components";
import { ClaimReceivableTBody, ClaimReceivableTHead } from "./common";

export const ClaimReceivableTable = ({ claimReceivables = [] }) => {
   const classes = claimReceivableTableStyle();

   return (
      <div className={classes.claimRecTableStyle}>
         <div className={classes.claimRecContainerStyle}>
            <h6 className={classes.claimRecTitleStyle}>Receivables</h6>
            {!!claimReceivables?.length ? (
               <div className={classes.claimReceivableContainerStyle}>
                  <ClaimReceivableTHead />
                  <div>
                     {claimReceivables.map((item, index) => (
                        <ClaimReceivableTBody
                           key={index}
                           receivable={item}
                        />
                     ))}
                  </div>
               </div>
            ) : (
               <NoItemText text={"No Claim Receivables Yet"} />
            )}
         </div>
      </div>
   );
};
