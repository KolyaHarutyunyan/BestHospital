import React, { useEffect, useState } from "react";
import { UserTextArea, CreateChancel } from "@eachbase/components";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { claimDetailsCoreStyle } from "./styles";
import { useDispatch } from "react-redux";
import { claimActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const CloseClaimInputs = ({ closeModal, claimId }) => {
   const classes = claimDetailsCoreStyle();

   const dispatch = useDispatch();

   const closingClaimLoader = FindLoad("EDIT_CLAIM_STATUS");
   const closingClaimSuccess = FindSuccess("EDIT_CLAIM_STATUS");

   useEffect(() => {
      if (!!closingClaimSuccess.length) {
         closeModal();
         httpRequestsOnSuccessActions.removeSuccess("EDIT_CLAIM_STATUS");
      }
   }, [closingClaimSuccess]);

   const [closingComment, setClosingComment] = useState("");
   const [error, setError] = useState("");

   function handleChange(event) {
      setClosingComment(event.target.value);
      !!error && setError("");
   }

   function handleSubmit() {
      if (isNotEmpty(closingComment)) {
         dispatch(
            claimActions.editClaimStatus(claimId, "CLOSED", closingComment)
         );
      } else {
         setError("closingComment");
      }
   }

   return (
      <div>
         <UserTextArea
            className={classes.commentTextAreaStyle}
            id={"closingComment"}
            name={"closingComment"}
            label={"Add your comment here ...*"}
            value={closingComment}
            onChange={handleChange}
            hasText={!!closingComment}
            typeError={error === "closingComment" && ErrorText.field}
         />
         <CreateChancel
            butnClassName={classes.closeOrCancelButnStyle}
            loader={!!closingClaimLoader.length}
            create={"Close"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            onClose={closeModal}
         />
      </div>
   );
};
