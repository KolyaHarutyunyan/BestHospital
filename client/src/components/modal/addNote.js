import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   CloseButton,
   ValidationInput,
   Textarea,
} from "@eachbase/components";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   useGlobalTextStyles,
} from "@eachbase/utils";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { noteActions } from "@eachbase/store/notes";
import { httpRequestsOnSuccessActions } from "@eachbase/store";

export const AddNotes = ({
   model,
   noteModalTypeInfo,
   handleClose,
}) => {
   const classes = modalsStyle();
   const globalText = useGlobalTextStyles();

   const dispatch = useDispatch();

   const params = useParams();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      noteModalTypeInfo ? { ...noteModalTypeInfo } : { subject: "", text: "" }
   );

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSubmit = () => {
      const noteDataIsValid =
         isNotEmpty(inputs.subject) && isNotEmpty(inputs.text);

      if (noteDataIsValid) {
         if (noteModalTypeInfo) {
            const noteEditedData = {
               text: inputs.text,
               subject: inputs.subject,
            };

            dispatch(
               noteActions.editGlobalNote(
                  params.id,
                  noteModalTypeInfo.id,
                  noteEditedData,
                  model
               )
            );
         } else {
            const noteData = {
               text: inputs.text,
               subject: inputs.subject,
               resource: params.id,
               onModel: model,
            };

            dispatch(noteActions.createGlobalNote(noteData));
         }
      } else {
         const noteDataErrorText = !isNotEmpty(inputs.subject)
            ? "subject"
            : !isNotEmpty(inputs.text)
            ? "text"
            : "";

         setError(noteDataErrorText);
      }
   };

   const loader = !!noteModalTypeInfo ? FindLoad("EDIT_GLOBAL_NOTE") : FindLoad("CREATE_GLOBAL_NOTE");
   const success = !!noteModalTypeInfo ? FindSuccess("EDIT_GLOBAL_NOTE") : FindSuccess("CREATE_GLOBAL_NOTE");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   return (
      <div className={classes.inactiveModalBody}>
         <h1 className={`${globalText.modalTitle}`}>
            {noteModalTypeInfo?.modalType === "editNote"
               ? "Edit Note"
               : "Add a New Note"}
         </h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={handleClose} />
         </div>
         <p className={classes.inactiveModalInfo}>
            Please fulfill the below fields to add a comment.
         </p>
         <ValidationInput
            variant={"outlined"}
            value={inputs.subject}
            type={"text"}
            placeholder={"Subject*"}
            name="subject"
            onChange={handleChange}
            typeError={error === "subject" && ErrorText.field}
         />
         <Textarea
            maxRows={6}
            variant={"outlined"}
            value={inputs.text}
            label={"Add your comment here ..."}
            name="text"
            onChange={handleChange}
            typeError={error === "text" ? ErrorText.field : ""}
         />
         <AddModalButton
            loader={!!loader.length}
            handleClick={handleSubmit}
            text={noteModalTypeInfo ? "Edit" : "Add"}
         />
      </div>
   );
};
