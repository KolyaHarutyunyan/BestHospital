import React, { useEffect, useState } from "react";
import { AddModalButton, ValidationInput, CreateChancel } from "@eachbase/components";
import { PayrollSetupStyles } from "../styles";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   hooksForTable,
   isNotEmpty,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { httpRequestsOnSuccessActions, mileagesActions } from "@eachbase/store";
import moment from "moment";
import { overtimeBtn } from "./constants";

export const MileageCompensation = ({
   marginTop,
   marginRight,
   maxWidth,
   editedData,
   handleClose,
}) => {
   const classes = PayrollSetupStyles();

   const dispatch = useDispatch();

   const success = !!editedData
      ? FindSuccess("EDIT_MILEAGE")
      : FindSuccess("CREATE_MILEAGE");
   const loader = !!editedData ? FindLoad("EDIT_MILEAGE") : FindLoad("CREATE_MILEAGE");

   useEffect(() => {
      if (!!success.length) {
         if (!!editedData) {
            handleClose();
            dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_MILEAGE"));
         } else {
            setInputs({});
            dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_MILEAGE"));
         }
      }
   }, [success]);

   const [inputs, setInputs] = useState(
      !!editedData
         ? {
              ...editedData,
              startDate: moment(editedData.startDate).format().substring(0, 10),
           }
         : {}
   );
   const [error, setError] = useState("");

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const dataIsValid = isNotEmpty(inputs.compensation) && !!inputs.startDate;
      if (dataIsValid) {
         const data = {
            compensation: parseInt(inputs.compensation),
            startDate: inputs.startDate ? new Date(inputs.startDate).toISOString() : "",
         };
         if (editedData) {
            dispatch(mileagesActions.editMileage(inputs._id, data));
         } else {
            dispatch(mileagesActions.createMileage(data));
         }
      } else {
         const dataErrorText = !isNotEmpty(inputs.compensation)
            ? "compensation"
            : !inputs.startDate
            ? "startDate"
            : "";
         setError(dataErrorText);
      }
   }

   return (
      <div
         className={!editedData ? classes.payCodeType : {}}
         style={{
            maxWidth: maxWidth,
            marginRight: marginRight ? marginRight : 0,
            marginTop: marginTop ? marginTop : 0,
         }}
      >
         {!editedData && (
            <>
               <h1 className={classes.modalTitle}>Add a New Mileage Compensation</h1>
               <p className={classes.modalSubTitle}>
                  Please fulfill the below fields to add a Mileage Compensation in the
                  system.
               </p>
            </>
         )}
         <ValidationInput
            onChange={handleChange}
            value={inputs.compensation}
            label={"Mileage Compensation*"}
            variant={"outlined"}
            name={"compensation"}
            type={"number"}
            placeholder={"Mileage Compensation*"}
            typeError={error === "compensation" ? ErrorText.field : ""}
         />
         <ValidationInput
            onChange={handleChange}
            value={inputs.startDate}
            variant={"outlined"}
            name={"startDate"}
            type={"date"}
            label={"Start Date*"}
            typeError={error === "startDate" ? ErrorText.field : ""}
         />
         {!!editedData ? (
            <CreateChancel
               loader={!!loader.length}
               create={"Save"}
               chancel={"Cancel"}
               onClose={handleClose}
               onCreate={handleSubmit}
               buttonWidth={"192px"}
               createButnMargin={"16px"}
            />
         ) : (
            <AddModalButton
               loader={!!loader.length}
               handleClick={handleSubmit}
               text={"Add Mileage Compensation"}
               styles={overtimeBtn}
            />
         )}
      </div>
   );
};
