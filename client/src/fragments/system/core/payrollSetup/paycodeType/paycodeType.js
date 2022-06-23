import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   RadioButton,
   SelectInput,
   ValidationInput,
   CreateChancel,
} from "@eachbase/components";
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
import { applyOvertimeData, checkboxStyle, payCodeBtn, ptoData } from "./constants";
import { PayrollSetupStyles } from "../styles";

export const PayCodeType = ({
   handleClose,
   editedData,
   maxWidth,
   marginRight,
   marginTop,
}) => {
   const classes = PayrollSetupStyles();

   const dispatch = useDispatch();

   const loader = !!editedData
      ? FindLoad("EDIT_PAYCODE_BY_ID_GLOBAL")
      : FindLoad("CREATE_PAYCODE_GLOBAL");
   const success = !!editedData
      ? FindSuccess("EDIT_PAYCODE_BY_ID_GLOBAL")
      : FindSuccess("CREATE_PAYCODE_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         if (!!editedData) {
            handleClose();
            dispatch(
               httpRequestsOnSuccessActions.removeSuccess("EDIT_PAYCODE_BY_ID_GLOBAL")
            );
         } else {
            setInputs({});
            dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_PAYCODE_GLOBAL"));
         }
      }
   }, [success]);

   const [inputs, setInputs] = useState(
      !!editedData ? { ...editedData, type: manageType(editedData.type) } : {}
   );
   const [error, setError] = useState("");
   const [applyOvertime, setApplyOvertime] = useState(
      !!editedData && editedData.overtime === true ? "Yes" : "No"
   );
   const [AccruePTO, setAccruePTO] = useState(
      !!editedData && editedData.pto === true ? "Yes" : "No"
   );

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function handleSubmit() {
      const dataIsValid =
         isNotEmpty(inputs.name) && isNotEmpty(inputs.type) && isNotEmpty(inputs.code);
      if (dataIsValid) {
         const data = {
            name: inputs.name,
            code: inputs.code,
            type: manageType(inputs.type),
            overtime: applyOvertime === "Yes",
            pto: AccruePTO === "Yes",
         };
         if (editedData) {
            dispatch(payrollActions.editPayCodeByIdGlobal(data, editedData?.id));
         } else {
            dispatch(payrollActions.createPayCodeGlobal(data));
            setApplyOvertime("No");
            setAccruePTO("No");
         }
      } else {
         const dataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.code)
            ? "code"
            : !isNotEmpty(inputs.type)
            ? "type"
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
               <h1 className={classes.modalTitle}>Add a New Paycode Type</h1>
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
            placeholder={"Name*"}
            label={"Name*"}
            typeError={error === "name" ? ErrorText.field : ""}
         />
         <ValidationInput
            onChange={handleChange}
            value={inputs.code}
            variant={"outlined"}
            label={"Code*"}
            name={"code"}
            type={"text"}
            placeholder={"Code*"}
            typeError={error === "code" ? ErrorText.field : ""}
         />
         <SelectInput
            label={"Type*"}
            placeholder="Type"
            name={"type"}
            handleSelect={handleChange}
            value={inputs.type}
            language={enumValues.PAYMENT_TYPES}
            typeError={error === "type" ? ErrorText.selectField : ""}
         />
         <div className={classes.flexBox}>
            <div className={classes.checkboxContainer}>
               <p>Apply Overtime?</p>
               <RadioButton
                  styles={checkboxStyle}
                  value={applyOvertime}
                  onChange={(e) => setApplyOvertime(e.target.value)}
                  radioData={applyOvertimeData}
               />
            </div>
            <div className={classes.checkboxContainer}>
               <p>Accrue PTO?</p>
               <RadioButton
                  styles={checkboxStyle}
                  value={AccruePTO}
                  onChange={(e) => setAccruePTO(e.target.value)}
                  radioData={ptoData}
               />
            </div>
         </div>
         {!!editedData ? (
            <CreateChancel
               loader={!!loader.length}
               buttonWidth="192px"
               create="Save"
               chancel="Cancel"
               onClose={handleClose}
               onCreate={handleSubmit}
               buttonWidth={"192px"}
               createButnMargin={"16px"}
            />
         ) : (
            <AddModalButton
               loader={!!loader.length}
               handleClick={handleSubmit}
               text={"Add Paycode Type"}
               styles={payCodeBtn}
            />
         )}
      </div>
   );
};
