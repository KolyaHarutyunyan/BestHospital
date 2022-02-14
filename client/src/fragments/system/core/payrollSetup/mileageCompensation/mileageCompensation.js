import React, { useEffect, useState } from "react";
import { AddModalButton, ValidationInput, CreateChancel } from "@eachbase/components";
import { PayrollSetupStyles } from "../styles";
import { ErrorText, FindLoad, FindSuccess } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { mileagesActions } from "@eachbase/store";
import moment from "moment";

const overtimeBtn = {
   width: "100%",
   height: "48px",
};

export const MileageCompensation = ({
   marginTop,
   marginRight,
   maxWidth,
   editedData,
   handleOpenClose,
}) => {
   const classes = PayrollSetupStyles();
   const dispatch = useDispatch();
   const [inputs, setInputs] = useState(
      editedData
         ? editedData
         : {
              compensation: "",
              startDate: "",
           }
   );
   const [error, setError] = useState("");

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSubmit = () => {
      let data = {
         compensation: parseInt(inputs.compensation),
         startDate: inputs.startDate ? new Date(inputs.startDate).toISOString() : "",
      };
      if (inputs.compensation && inputs.startDate) {
         if (editedData) {
            dispatch(mileagesActions.editMileage(inputs._id, data));
         } else {
            dispatch(mileagesActions.createMileage(data));
         }
      } else {
         setError(
            !inputs.compensation
               ? "compensation"
               : !inputs.startDate
               ? "startDate"
               : "Input is not filled"
         );
      }
   };

   const success = FindSuccess("CREATE_MILEAGE");
   const editSuccess = FindSuccess("EDIT_MILEAGE");
   const load = FindLoad("CREATE_MILEAGE");
   const editLoad = FindLoad("EDIT_MILEAGE");

   useEffect(() => {
      if (success) {
         setInputs({
            compensation: "",
            startDate: "",
         });
      }
   }, [success.length]);

   useEffect(() => {
      if (editSuccess) {
         handleOpenClose && handleOpenClose();
      }
   }, [editSuccess.length]);

   return (
      <div
         className={classes.payCodeType}
         style={{
            maxWidth: maxWidth,
            marginRight: marginRight ? marginRight : 0,
            marginTop: marginTop ? marginTop : 0,
         }}
      >
         {editedData ? (
            <h1 className={classes.editModalTitle}>Edit Mileage Compensation</h1>
         ) : (
            <>
               <h1 className={classes.modalTitle}>Add a New Mileage Compensation</h1>
               <p className={classes.modalSubTitle}>
                  Please fulfill the below fields to add a Mileage Compensation in the system.
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
            value={
               editedData ? moment(inputs.startDate).format().substring(0, 10) : inputs.startDate
            }
            variant={"outlined"}
            name={"startDate"}
            type={"date"}
            placeholder={"Start Date*"}
            typeError={error === "startDate" ? ErrorText.field : ""}
         />
         {editedData ? (
            <CreateChancel
               loader={!!editLoad.length}
               buttonWidth="192px"
               create="Save"
               chancel="Cancel"
               onClose={handleOpenClose}
               onCreate={handleSubmit}
            />
         ) : (
            <AddModalButton
               loader={!!load.length}
               handleClick={handleSubmit}
               text={"Add Mileage Compensation"}
               styles={overtimeBtn}
            />
         )}
      </div>
   );
};
