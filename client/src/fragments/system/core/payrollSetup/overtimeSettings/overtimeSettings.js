import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   SelectInputPlaceholder,
   SelectInput,
   ValidationInput,
   CreateChancel,
} from "@eachbase/components";
import { PayrollSetupStyles } from "../styles";
import { ErrorText, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { payrollActions } from "@eachbase/store/payroll";
import { httpRequestsOnSuccessActions } from "@eachbase/store";

const timeType = [
   { name: "DAILY" },
   { name: "WEEKLY" },
   { name: "CONSECUTIVE" },
];

const overtimeBtn = {
   width: "100%",
   height: "48px",
};

export const OvertimeSettings = ({
   handleOpenClose,
   editedData,
   maxWidth,
   marginRight,
   marginTop,
}) => {
   const classes = PayrollSetupStyles();
   const dispatch = useDispatch();
   const [inputs, setInputs] = useState(
      editedData
         ? editedData
         : {
              name: "",
              type: "",
              threshold: "",
              multiplier: "",
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
      const dataIsValid =
         isNotEmpty(inputs.name) &&
         isNotEmpty(inputs.type) &&
         isNotEmpty(inputs.threshold) &&
         isNotEmpty(inputs.multiplier);

      if (dataIsValid) {
         const data = {
            name: inputs.name,
            type: inputs.type,
            threshold: parseInt(inputs.threshold),
            multiplier: parseInt(inputs.multiplier),
         };
         if (editedData) {
            dispatch(
               payrollActions.editOvertimeSettingsByIdGlobal(
                  data,
                  editedData?.id
               )
            );
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
   };

   const loader = FindLoad("CREATE_OVERTIME_SETTINGS_GLOBAL");
   const loaderEdit = FindLoad("EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL");
   const success = FindSuccess("CREATE_OVERTIME_SETTINGS_GLOBAL");
   const edit = FindSuccess("EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({
            name: "",
            type: "",
            threshold: "",
            multiplier: "",
         });
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "CREATE_OVERTIME_SETTINGS_GLOBAL"
            )
         );
      }
   }, [success]);

   useEffect(() => {
      if (!!edit.length) {
         handleOpenClose && handleOpenClose();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL"
            )
         );
      }
   }, [edit]);

   return (
      <div
         className={classes.payCodeType}
         style={{
            maxWidth: maxWidth,
            marginRight: marginRight ? marginRight : 0,
            marginTop: marginTop ? marginTop : 0,
            width: editedData ? "480px" : "100%",
         }}
      >
         {editedData ? (
            <h1 className={classes.editModalTitle}>Edit Overtime Setting</h1>
         ) : (
            <>
               <h1 className={classes.modalTitle}>Add an Overtime Setting</h1>
               <p className={classes.modalSubTitle}>
                  Please fulfill the below fields to add a Paycode Type in the
                  system.
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
         {editedData ? (
            <SelectInput
               label="Type"
               name={"type"}
               handleSelect={handleChange}
               value={inputs.type}
               list={timeType}
               typeError={error === "type" ? ErrorText.field : ""}
            />
         ) : (
            <SelectInputPlaceholder
               placeholder="Type"
               name={"type"}
               handleSelect={handleChange}
               value={inputs.type}
               list={timeType}
               typeError={error === "type" ? ErrorText.field : ""}
            />
         )}
         <ValidationInput
            onChange={handleChange}
            value={inputs.threshold}
            variant={"outlined"}
            name={"threshold"}
            type={"number"}
            label={
               inputs.type === "CONSECUTIVE"
                  ? "Threshold in days*"
                  : inputs.type === undefined
                  ? "Threshold"
                  : "Threshold in hours*"
            }
            typeError={error === "threshold" ? ErrorText.field : ""}
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
         {editedData ? (
            <CreateChancel
               loader={!!loaderEdit.length}
               buttonWidth="192px"
               create="Save"
               chancel="Cancel"
               onClose={handleOpenClose}
               onCreate={handleSubmit}
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
