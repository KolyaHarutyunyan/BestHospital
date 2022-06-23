import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   SelectInput,
   ValidationInput,
   CreateChancel,
} from "@eachbase/components";
import { PayrollSetupStyles } from "../styles";
import {
   enumValues,
   ErrorText,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   manageType,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { payrollActions } from "@eachbase/store/payroll";
import { httpRequestsOnSuccessActions } from "@eachbase/store";
import { overtimeBtn } from "./constants";

export const OvertimeSettings = ({
   handleClose,
   editedData,
   maxWidth,
   marginRight,
   marginTop,
}) => {
   const classes = PayrollSetupStyles();

   const dispatch = useDispatch();

   const loader = !!editedData
      ? FindLoad("EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL")
      : FindLoad("CREATE_OVERTIME_SETTINGS_GLOBAL");
   const success = !!editedData
      ? FindSuccess("EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL")
      : FindSuccess("CREATE_OVERTIME_SETTINGS_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         if (!!editedData) {
            handleClose();
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess(
                  "EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL"
               )
            );
         } else {
            setInputs({});
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess(
                  "CREATE_OVERTIME_SETTINGS_GLOBAL"
               )
            );
         }
      }
   }, [success]);

   const [inputs, setInputs] = useState(
      editedData ? { ...editedData, type: manageType(editedData.type) } : {}
   );
   const [error, setError] = useState("");

   const thresholdLabel = !!inputs?.type
      ? inputs?.type?.toUpperCase() === "CONSECUTIVE"
         ? "Threshold in days*"
         : "Threshold in hours*"
      : "Threshold*";

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const dataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.type) &&
         isNotEmpty(inputs.threshold) &&
         isNotEmpty(inputs.multiplier);
      if (dataIsValid) {
         const data = {
            name: inputs.name,
            type: manageType(inputs.type),
            threshold: parseInt(inputs.threshold),
            multiplier: parseInt(inputs.multiplier),
         };
         if (!!editedData) {
            dispatch(payrollActions.editOvertimeSettingsByIdGlobal(data, editedData?.id));
         } else {
            dispatch(payrollActions.createOvertimeSettingsGlobal(data));
         }
      } else {
         const dataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.type)
            ? "type"
            : !isNotEmpty(inputs.threshold)
            ? "threshold"
            : !isNotEmpty(inputs.multiplier)
            ? "multiplier"
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
               <h1 className={classes.modalTitle}>Add an Overtime Setting</h1>
               <p className={classes.modalSubTitle}>
                  Please fulfill the below fields to add a Paycode Type in the system.
               </p>
            </>
         )}
         <ValidationInput
            onChange={handleChange}
            value={inputs.name}
            variant={"outlined"}
            name={"name"}
            type={"text"}
            label={"Name*"}
            typeError={error === "name" ? ErrorText.field : ""}
         />
         <SelectInput
            label="Type*"
            name={"type"}
            handleSelect={handleChange}
            value={inputs.type}
            language={enumValues.TIME_TYPES}
            typeError={error === "type" ? ErrorText.selectField : ""}
         />
         <ValidationInput
            onChange={handleChange}
            value={inputs.threshold}
            variant={"outlined"}
            name={"threshold"}
            type={"number"}
            label={thresholdLabel}
            typeError={error === "threshold" ? ErrorText.field : ""}
            disabled={!inputs?.type}
         />
         <ValidationInput
            onChange={handleChange}
            value={inputs.multiplier}
            variant={"outlined"}
            name={"multiplier"}
            type={"number"}
            label={"Multiplier*"}
            typeError={error === "multiplier" ? ErrorText.field : ""}
         />
         {!!editedData ? (
            <CreateChancel
               loader={!!loader.length}
               create="Save"
               chancel="Cancel"
               onClose={handleClose}
               onCreate={handleSubmit}
               buttonWidth="192px"
               createButnMargin={"16px"}
            />
         ) : (
            <AddModalButton
               loader={!!loader.length}
               handleClick={handleSubmit}
               text={"Add Overtime Setting"}
               styles={overtimeBtn}
            />
         )}
      </div>
   );
};
