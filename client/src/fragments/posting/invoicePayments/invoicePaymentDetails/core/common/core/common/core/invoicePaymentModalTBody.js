import React, { useEffect, useState } from "react";
import { Images, isNotEmpty } from "@eachbase/utils";
import { invoiceModalTHeadTBodyStyle } from "./styles";
import { EditablePaymentInput } from "@eachbase/components";

export const InvoicePaymentModalTBody = ({ receivable, passReceivable }) => {
   const classes = invoiceModalTHeadTBodyStyle();

   const [edit, setEdit] = useState(false);
   const [paidAMT, setPaidAMT] = useState("");

   const inputIsFilled = isNotEmpty(paidAMT);

   useEffect(() => {
      passReceivable &&
         passReceivable({
            ...receivable,
            filled: inputIsFilled,
            paidAMT,
         });
   }, [inputIsFilled, paidAMT]);

   const actionImageUrl = inputIsFilled ? Images.successGreen : Images.success;

   const action = <img src={actionImageUrl} alt="" />;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={`${classes.tbodyRowStyle} ${edit ? "active" : ""}`}>
            <EditablePaymentInput
               inputClassName={classes.paidAmountInputStyle}
               triggerInputValue={(paidAMT) => setPaidAMT(paidAMT)}
               triggerEditBool={(editBool) => setEdit(editBool)}
            />
            <div className={classes.actionBoxStyle}>{action}</div>
         </div>
      </div>
   );
};
