import React, { useState } from "react";
import { UserTextArea, CreateChancel } from "@eachbase/components";
import { ErrorText, isNotEmpty } from "@eachbase/utils";

export const CloseClaimInputs = ({ closeModal }) => {
   const classes = {};

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

         console.log(closingCommentData);
         // dispatch();
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
            id={"closingComment"}
            name={"closingComment"}
            label={"Add your comment here ...*"}
            value={inputs.closingComment}
            onChange={handleChange}
            hasText={!!inputs.closingComment}
            typeError={error === "closingComment" && ErrorText.field}
         />
         <CreateChancel
            butnClassName={classes.addOrCancelButnStyle}
            // loader={!!loader.length}
            create={"Close"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            // onClose={closeModal}
         />
      </div>
   );
};
