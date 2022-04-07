import React, { useEffect, useState } from "react";
import { UserTextArea, CreateChancel } from "@eachbase/components";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { claimDetailsCoreStyle } from "./styles";
import { useDispatch } from "react-redux";
import { claimActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const CloseClaimInputs = ({ closeModal }) => {
   const classes = claimDetailsCoreStyle();

   const dispatch = useDispatch();

   const closingClaimLoader = FindLoad("");
   const closingClaimSuccess = FindSuccess("");

   useEffect(() => {
      if (!!closingClaimSuccess.length) {
         closeModal();
         httpRequestsOnSuccessActions.removeSuccess("");
      }
   }, [closingClaimSuccess]);

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const closingCommentDataIsValid = isNotEmpty(inputs.closingComment);

      if (closingCommentDataIsValid) {
         const closingCommentData = {
            comment: inputs.closingComment,
         };

         // dispatch(claimActions);
      } else {
         const errorText = !isNotEmpty(inputs.closingComment)
            ? "closingComment"
            : "";

         setError(errorText);
      }
   }

   return (
      <div>
         <UserTextArea
            className={classes.commentTextAreaStyle}
            id={"closingComment"}
            name={"closingComment"}
            label={"Add your comment here ...*"}
            value={inputs.closingComment}
            onChange={handleChange}
            hasText={!!inputs.closingComment}
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
