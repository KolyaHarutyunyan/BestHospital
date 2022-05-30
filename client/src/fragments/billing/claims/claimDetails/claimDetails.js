import React, { useContext, useState } from "react";
import { claimDetailsStyle } from "./styles";
import { ModalContentWrapper, NoItemText, SimpleModal } from "@eachbase/components";
import {
   DrawerContext,
   getLimitedVal,
   hooksForTable,
   Images,
   useWidth,
} from "@eachbase/utils";
import { ClaimReceivableTable, CloseClaimInputs } from "./core";
import { getClaimDetails } from "./constants";

export const ClaimDetailsFragment = ({ claimDetails }) => {
   const classes = claimDetailsStyle();

   const { open: drawerOpen } = useContext(DrawerContext);

   const [open, setOpen] = useState(false);

   const { _id, receivable, status, details } = claimDetails || {};

   const filteredDetails = getClaimDetails(claimDetails).filter(
      (claimDtl) => !!claimDtl.detail
   );

   const claimIsClosed = status === "CLOSED";
   const closedClaimDesc = `This Claim has been deleted for ${details}`;
   const closeButnStyle = `${classes.closeButnStyle} ${claimIsClosed ? "closed" : ""}`;
   const closeButnText = claimIsClosed ? "Closed" : "Close Claim";

   const width = useWidth();

   const { getTextDependsOnWidth } = hooksForTable;

   function getDetailDisplay(detail) {
      return getTextDependsOnWidth(width, 1480, detail, 14);
   }

   return (
      <>
         <div className={classes.claimDetailsContainerStyle}>
            <div className={classes.claimDetailsStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Claim Details</h2>
               </div>
               <button
                  className={closeButnStyle}
                  type="button"
                  onClick={() => setOpen(true)}
                  disabled={claimIsClosed}
               >
                  {closeButnText}
               </button>
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
                              {item.detailText} <em> {getDetailDisplay(item.detail)} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            {claimIsClosed && (
               <div className={classes.claimInfoBoxStyle}>
                  <img src={Images.claimInfo} alt="" />
                  <p className={classes.claimInfoStyle}>{closedClaimDesc}</p>
               </div>
            )}
            <div className={classes.claimDetailsSecondPartStyle}>
               <div className={classes.claimDetailsTitleBoxStyle}>
                  <h2 className={classes.claimDetailsTitleStyle}>Receivables</h2>
               </div>
               {!!receivable?.length ? (
                  <div className={classes.receivablesTableBoxStyle}>
                     <ClaimReceivableTable claimReceivables={receivable} />
                  </div>
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <ModalContentWrapper
                  wrapperStylesName={classes.closeClaimWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={"Close This Claim?"}
                  subtitleContent={
                     "Please indicate below the reason for closing the claim."
                  }
               >
                  <CloseClaimInputs closeModal={() => setOpen(false)} claimId={_id} />
               </ModalContentWrapper>
            }
         />
      </>
   );
};
