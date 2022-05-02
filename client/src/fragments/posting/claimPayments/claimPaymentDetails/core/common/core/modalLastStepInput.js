import React, { useContext } from "react";
import { claimReceivableTableStyle } from "./styles";
import { NoItemText } from "@eachbase/components";
import { DrawerContext, getLimitedVal } from "@eachbase/utils";
import { ClaimReceivableModalTable } from "./common";
import { getClaimDetailsForClaimPmt } from "./constants";

export const ModalLastStepInput = ({
   claims,
   selectedClaimId,
   triggerBool,
   triggerReceivables,
}) => {
   const classes = claimReceivableTableStyle();

   const selectedClaim = claims.find((claim) => claim._id === selectedClaimId);

   const { open: drawerOpen } = useContext(DrawerContext);

   const { _id, receivable } = selectedClaim || {};

   const filteredDetails = getClaimDetailsForClaimPmt(selectedClaim).filter(
      (claimDtl) => !!claimDtl.detail
   );

   return (
      <>
         <div className={classes.claimDetailsContainerStyle}>
            <div className={classes.claimDetailsStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Claim Details</h2>
               </div>
            </div>
            <div className={classes.claimDetailsFirstPartStyle}>
               <div className={classes.claimOutlineStyle}>
                  <span className={classes.claimIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.claimDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index} className={drawerOpen ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {item.detail} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.claimDetailsSecondPartStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Receivables</h2>
               </div>
               {!!receivable?.length ? (
                  <ClaimReceivableModalTable
                     claimReceivables={receivable}
                     triggerBool={triggerBool}
                     triggerReceivables={triggerReceivables}
                  />
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
      </>
   );
};
