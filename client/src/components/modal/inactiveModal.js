import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
   Colors,
   ErrorText,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   useGlobalTextStyles,
} from "@eachbase/utils";
import { modalsStyle } from "./styles";
import { AddModalButton, CloseButton } from "../buttons";
import { ValidationInput, Textarea } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import {
   fundingSourceActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const InactiveModal = ({ handleOpenClose, info, name, statusType }) => {
   const classes = modalsStyle();
   const globalText = useGlobalTextStyles();
   const params = useParams();
   const [activeOrInactive, setActiveOrInactive] = useState(
      info?.status === 1 ? "inactivate" : "activate"
   );
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState({ date: "", reason: "" });
   const dispatch = useDispatch();

   const success = FindSuccess("SET_STATUS");
   const loader = FindLoad("SET_STATUS");

   const inactivateButtonStyle = {
      backgroundColor:
         activeOrInactive === "activate"
            ? Colors.BackgroundBlue
            : Colors.ThemeRed,
   };

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );

   const cancel = () => {
      handleOpenClose();
   };

   const handleCreate = () => {
      const dataIsValid = isNotEmpty(inputs.date) && isNotEmpty(inputs.reason);

      if (dataIsValid) {
         const data = {
            date: inputs.date,
            reason: inputs.reason,
         };

         dispatch(
            fundingSourceActions.setStatus(
               params.id,
               info.path,
               statusType,
               data,
               info.type
            )
         );
      } else {
         const dataErrorText = !isNotEmpty(inputs.date)
            ? "date"
            : !isNotEmpty(inputs.reason)
            ? "reason"
            : "";

         setError(dataErrorText);
      }
   };

   useEffect(() => {
      if (!!success.length) {
         handleOpenClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("SET_STATUS"));
      }
   }, [success]);

   return (
      <div className={classes.inactiveModalBody}>
         <h1 className={`${globalText.modalTitle}`}> {name} </h1>
         <div className={classes.positionedButton}>
            <CloseButton handleCLic={cancel} />
         </div>
         <p
            className={classes.inactiveModalInfo}
         >{`${name} will be notified about the  reason `}</p>
         <ValidationInput
            variant={"outlined"}
            onChange={handleChange}
            value={inputs.date}
            type={"date"}
            label={"Date*"}
            name="date"
            typeError={error === "date" && ErrorText.field}
         />
         <Textarea
            value={inputs.reason}
            maxRows={6}
            variant={"outlined"}
            onChange={handleChange}
            label={"Write  reason here..."}
            name="reason"
            typeError={error === "reason" ? ErrorText.field : ""}
         />
         <AddModalButton
            btnStyles={inactivateButtonStyle}
            text={"Send"}
            handleClick={handleCreate}
            loader={!!loader.length}
         />
      </div>
   );
};
