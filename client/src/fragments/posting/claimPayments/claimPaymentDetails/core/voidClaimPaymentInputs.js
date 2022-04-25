import React, { useEffect, useState } from "react";
import { UserTextArea, CreateChancel } from "@eachbase/components";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { claimPaymentDetailsCoreStyle } from "./styles";
import { useDispatch } from "react-redux";
import { claimPaymentActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const VoidClaimPaymentInputs = ({ closeModal, claimPaymentId }) => {
   const classes = claimPaymentDetailsCoreStyle();

   const dispatch = useDispatch();

   const voidingClaimPmtLoader = FindLoad("EDIT_CLAIM_PAYMENT_STATUS");
   const voidingClaimPmtSuccess = FindSuccess("EDIT_CLAIM_PAYMENT_STATUS");

   useEffect(() => {
      if (!!voidingClaimPmtSuccess.length) {
         closeModal();
         httpRequestsOnSuccessActions.removeSuccess("EDIT_CLAIM_PAYMENT_STATUS");
      }
   }, [voidingClaimPmtSuccess]);

   const [voidingComment, setVoidingComment] = useState("");
   const [error, setError] = useState("");

   function handleChange(event) {
      setVoidingComment(event.target.value);
      !!error && setError("");
   }

   function handleSubmit() {
      if (isNotEmpty(voidingComment)) {
         dispatch(
            claimPaymentActions.editClaimPaymentStatus(
               claimPaymentId,
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
            loader={!!voidingClaimPmtLoader.length}
            create={"Close"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            onClose={closeModal}
         />
      </div>
   );
};
