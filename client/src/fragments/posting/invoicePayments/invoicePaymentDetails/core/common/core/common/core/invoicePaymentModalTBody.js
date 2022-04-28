import React, { useEffect, useState } from "react";
import { Images, isNotEmpty } from "@eachbase/utils";
import { invoiceModalTHeadTBodyStyle } from "./styles";
import { EditablePaymentInput } from "@eachbase/components";

export const InvoicePaymentModalTBody = ({ triggerBool, triggerInputValue }) => {
   const classes = invoiceModalTHeadTBodyStyle();

   const [edit, setEdit] = useState(false);
   const [paidAmount, setPaidAmount] = useState("");

   const inputIsFilled = isNotEmpty(paidAmount);

   useEffect(() => {
      triggerBool && triggerBool(inputIsFilled);
   }, [inputIsFilled]);

   useEffect(() => {
      triggerInputValue && triggerInputValue(paidAmount);
   }, [paidAmount]);

   const actionImageUrl = inputIsFilled ? Images.successGreen : Images.success;

   const action = <img src={actionImageUrl} alt="" />;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={`${classes.tbodyRowStyle} ${edit ? "active" : ""}`}>
            <EditablePaymentInput
               inputClassName={classes.paidAmountInputStyle}
               triggerInputValue={(paidAmount) => setPaidAmount(paidAmount)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <div className={classes.actionBoxStyle}>{action}</div>
         </div>
      </div>
   );
};
