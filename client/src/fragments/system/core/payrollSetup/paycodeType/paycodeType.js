import React, { useEffect, useState } from "react";
import {
   AddModalButton,
   RadioButton,
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

const payCodeType = [{ name: "HOURLY" }, { name: "SALARY" }, { name: "FIXED" }];

const payCodeBtn = {
   width: "100%",
   height: "48px",
};

const applyOvertimeData = [
   {
      label: "No",
      value: "No",
   },
   {
      label: "Yes",
      value: "Yes",
   },
];

const ptoData = [
   {
      label: "No",
      value: "No",
   },
   {
      label: "Yes",
      value: "Yes",
   },
];

const checkboxStyle = {
   display: "flex",
   alignItems: "center",
   flexDirection: "row",
};

export const PayCodeType = ({
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
              code: "",
              type: "",
           }
   );
   const [error, setError] = useState("");
   const [applyOvertime, setApplyOvertime] = useState(
      editedData && editedData.overtime === true ? "Yes" : "No"
   );
   const [AccruePTO, setAccruePTO] = useState(
      editedData && editedData.pto === true ? "Yes" : "No"
   );

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
         isNotEmpty(inputs.code);

      if (dataIsValid) {
         const data = {
            name: inputs.name,
            code: inputs.code,
            type: inputs.type,
            overtime: applyOvertime === "Yes",
            pto: AccruePTO === "Yes",
         };

         if (editedData) {
            dispatch(
               payrollActions.editPayCodeByIdGlobal(data, editedData?.id)
            );
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
   };

   const change = (event) => {
      setApplyOvertime(event.target.value);
   };

   const changePTO = (event) => {
      setAccruePTO(event.target.value);
   };

   const loader = FindLoad("CREATE_PAYCODE_GLOBAL");
   const loaderEdit = FindLoad("EDIT_PAYCODE_BY_ID_GLOBAL");
   const success = FindSuccess("CREATE_PAYCODE_GLOBAL");
   const edit = FindSuccess("EDIT_PAYCODE_BY_ID_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({
            name: "",
            code: "",
            type: "",
         });
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("CREATE_PAYCODE_GLOBAL")
         );
      }
   }, [success]);

   useEffect(() => {
      if (!!edit.length) {
         handleOpenClose && handleOpenClose();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "EDIT_PAYCODE_BY_ID_GLOBAL"
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
            <h1 className={classes.editModalTitle}>Edit Paycode Type</h1>
         ) : (
            <>
               <h1 className={classes.modalTitle}>Add a New Paycode Type</h1>
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
         {editedData ? (
            <SelectInput
               label={"Type*"}
               placeholder="Type"
               name={"type"}
               handleSelect={handleChange}
               value={inputs.type}
               list={payCodeType}
               typeError={error === "type" ? ErrorText.field : ""}
            />
         ) : (
            <SelectInputPlaceholder
               label={"Type*"}
               placeholder="Type*"
               F
               name={"type"}
               handleSelect={handleChange}
               value={inputs.type}
               list={payCodeType}
               typeError={error === "type" ? ErrorText.field : ""}
            />
         )}

         <div className={classes.flexBox}>
            <div className={classes.checkboxContainer}>
               <p>Apply Overtime?</p>
               <RadioButton
                  styles={checkboxStyle}
                  value={applyOvertime}
                  onChange={change}
                  radioData={applyOvertimeData}
               />
            </div>
            <div className={classes.checkboxContainer}>
               <p>Accrue PTO?</p>
               <RadioButton
                  styles={checkboxStyle}
                  value={AccruePTO}
                  onChange={changePTO}
                  radioData={ptoData}
               />
            </div>
         </div>
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
               text={"Add Paycode Type"}
               styles={payCodeBtn}
            />
         )}
      </div>
   );
};
