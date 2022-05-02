import React, { useEffect, useState } from "react";
import { UserTextArea, CreateChancel } from "@eachbase/components";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { invoicePaymentDetailsCoreStyle } from "./styles";
import { useDispatch } from "react-redux";
import { httpRequestsOnSuccessActions, invoicePaymentActions } from "@eachbase/store";

export const VoidInvoicePaymentInputs = ({ closeModal, invoicePaymentId }) => {
   const classes = invoicePaymentDetailsCoreStyle();

   const dispatch = useDispatch();

   const voidingInvoicePmtLoader = FindLoad("EDIT_INVOICE_PAYMENT_STATUS");
   const voidingInvoicePmtSuccess = FindSuccess("EDIT_INVOICE_PAYMENT_STATUS");

   useEffect(() => {
      if (!!voidingInvoicePmtSuccess.length) {
         closeModal();
         httpRequestsOnSuccessActions.removeSuccess("EDIT_INVOICE_PAYMENT_STATUS");
      }
   }, [voidingInvoicePmtSuccess]);

   const [voidingComment, setVoidingComment] = useState("");
   const [error, setError] = useState("");

   function handleChange(event) {
      setVoidingComment(event.target.value);
      !!error && setError("");
   }

   function handleSubmit() {
      if (isNotEmpty(voidingComment)) {
         dispatch(
            invoicePaymentActions.editInvoicePaymentStatus(
               invoicePaymentId,
               "VOIDED",
               voidingComment
            )
         );
      } else {
         setError("voidingComment");
      }
   }

   return (
      <div>
         <UserTextArea
            className={classes.commentTextAreaStyle}
            id={"voidingComment"}
            name={"voidingComment"}
            label={"Add your comment here ...*"}
            value={voidingComment}
            onChange={handleChange}
            hasText={!!voidingComment}
            maxCharsLabel={"Max 500 characters"}
            typeError={error === "voidingComment" && ErrorText.field}
         />
         <CreateChancel
            butnClassName={classes.closeOrCancelButnStyle}
            loader={!!voidingInvoicePmtLoader.length}
            create={"Close"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            onClose={closeModal}
         />
      </div>
   );
};
