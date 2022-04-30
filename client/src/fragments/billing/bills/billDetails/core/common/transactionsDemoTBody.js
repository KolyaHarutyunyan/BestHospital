import React, { useContext } from "react";
import {
   addSignToValueFromStart,
   DrawerContext,
   getDataForTable,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";

export const TransactionsDemoTBody = ({
   billTransaction,
   openConfirmingModal,
   onTrigger,
}) => {
   const classes = tableTheadTbodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const _isVoided = billTransaction.status === "VOID";

   const billTransactionId = getTableData(billTransaction._id);
   const date = getTableData(handleCreatedAtDate(billTransaction.date, 10, "/"));
   const creator = getTableData(billTransaction.creator);
   const type = getTableData(manageStatus(billTransaction.type));
   const amount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(billTransaction.rate))
   );
   const paymentRefNumber = getTableData(billTransaction.paymentRef);
   const note = getTableData(billTransaction.note);

   const actionStyle = `${classes.voidActionStyle} ${_isVoided ? "voided" : ""}`;
   const actionText = _isVoided ? "Voided" : "Void";

   function handleAction() {
      if (_isVoided) return;
      openConfirmingModal();
      onTrigger(billTransaction._id);
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{billTransactionId}</div>
            <div className={classes.tdStyle}>{date}</div>
            <div className={classes.tdStyle}>{creator}</div>
            <div className={classes.tdStyle}>{type}</div>
            <div className={classes.tdStyle}>{amount}</div>
            <div className={classes.tdStyle}>{paymentRefNumber}</div>
            <div className={classes.tdStyle}>{note}</div>
            <div className={classes.tdStyle}>
               <button className={actionStyle} onClick={handleAction}>
                  {actionText}
               </button>
            </div>
         </div>
      </div>
   );
};
