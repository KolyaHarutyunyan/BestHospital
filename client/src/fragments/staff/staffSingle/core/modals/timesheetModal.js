import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
   Textarea,
} from "@eachbase/components";
import { Checkbox } from "@material-ui/core";
import { ErrorText, FindLoad, FindSuccess } from "@eachbase/utils";
import { adminActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { payrollActions } from "@eachbase/store/payroll";
import { createClientStyle } from "@eachbase/fragments/client";
import { staffModalsStyle } from "./styles";
import { useParams } from "react-router-dom";
import moment from "moment";

export const TimesheetModal = ({ handleClose, info, allPaycodes }) => {
   const params = useParams();
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? {
              ...info,
              startDate: moment(info.startDate).format("YYYY-MM-DD"),
              endDate: moment(info.endDate).format("YYYY-MM-DD"),
              payCode: info.payCode.payCodeTypeId,
           }
         : {
              description: "",
              hours: "",
              startDate: "",
              endDate: "",
           }
   );

   const [checked, setChecked] = useState(
      info ? (info.endDate ? false : true) : true
   );
   const [payCode, setPayCode] = useState(info ? info.payCode : null);

   const dispatch = useDispatch();

   const classes = createClientStyle();

   const classes_v2 = staffModalsStyle();
   const globalPayCodes = useSelector((state) => state.payroll.PayCodes);

   useEffect(() => {
      dispatch(payrollActions.getPayCodeGlobal());
      dispatch(adminActions.getAllPaycodes(params.id));
   }, []);

   const success = info
      ? FindSuccess("EDIT_TIMESHEET")
      : FindSuccess("CREATE_TIMESHEET");
   const loader = info
      ? FindLoad("EDIT_TIMESHEET")
      : FindLoad("CREATE_TIMESHEET");

   useEffect(() => {
      if (!success) return;
      handleClose();
      if (info) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_TIMESHEET"));
      } else {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("CREATE_TIMESHEET")
         );
      }
   }, [success]);

   const handleChange = (e) => {
      if (e.target.name === "payCode") {
         setPayCode(
            allPaycodes.find(
               (item) => item.payCodeTypeId.name === e.target.value
            )
         );
      }
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      (error === e.target.name || error === ErrorText.dateError) &&
         setError("");
   };

   const onCheck = (e) => {
      setChecked(e.target.checked);
      inputs["endDate"] = null;
      (error === "endDate" || error === ErrorText.dateError) && setError("");
   };

   const handleCreate = () => {
      const dateComparingIsValid =
         !!inputs.endDate &&
         new Date(inputs.startDate).getTime() <
            new Date(inputs.endDate).getTime();

      const timeSheetDataIsValid =
         !!inputs.description && !!inputs.hours && !!inputs.startDate && checked
            ? "Present"
            : dateComparingIsValid;
      if (timeSheetDataIsValid) {
         const data = {
            staffId: params.id,
            payCode: payCode?.id,
            description: inputs.description,
            hours: parseInt(inputs.hours),
            startDate: inputs.startDate,
            endDate: inputs.endDate ? inputs.endDate : null,
         };
         const editDate = {
            staffId: params.id,
            payCode: payCode?._id,
            description: inputs.description,
            hours: parseInt(inputs.hours),
            startDate: inputs.startDate,
            endDate:
               checked === true
                  ? null
                  : inputs.endDate && inputs.endDate !== "Invalid date"
                  ? inputs.endDate
                  : null,
         };

         if (info) {
            dispatch(
               adminActions.editTimesheet(editDate, inputs.id, params.id)
            );
         } else {
            dispatch(adminActions.createTimesheet(data));
         }
      } else {
         const paycodeDataErrorText = !inputs.payCode
            ? "payCode"
            : !inputs.description
            ? "description"
            : !inputs.hours
            ? "hours"
            : !inputs.startDate
            ? "startDate"
            : !inputs.endDate
            ? "endDate"
            : !dateComparingIsValid
            ? ErrorText.dateError
            : "";

         setError(paycodeDataErrorText);
      }
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Timesheet" : "Add a New Timesheet"}
            text={
               !info && "Please fulfill the below fields to add a timesheet."
            }
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <SelectInput
                     language={null}
                     name={"payCode"}
                     label={"Paycode*"}
                     handleSelect={handleChange}
                     value={payCode ? payCode.name : ""}
                     list={allPaycodes ? allPaycodes : []}
                     typeError={error === "payCode" ? ErrorText.field : ""}
                  />
                  <div className={classes.displayCodeBlock}>
                     <div className={classes_v2.paycodeBox}>
                        <p className={classes_v2.paycodeBoxTitle}>Rate:</p>
                        <p className={classes_v2.paycodeBoxText}>
                           {payCode ? payCode.payCodeTypeId.code : " N/A"}
                        </p>
                     </div>
                     <div
                        className={classes_v2.paycodeBox}
                        style={{ marginBottom: 0 }}
                     >
                        <p className={classes_v2.paycodeBoxTitle}>Type:</p>
                        <p className={classes_v2.paycodeBoxText}>
                           {payCode ? payCode.payCodeTypeId.type : "N/A"}
                        </p>
                     </div>
                  </div>
                  <Textarea
                     label={"Description*"}
                     name="description"
                     typeError={error === "description" ? ErrorText.field : ""}
                     value={inputs.description}
                     variant={"outlined"}
                     onChange={handleChange}
                  />
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={
                        inputs.hours
                           ? inputs.hours
                           : inputs.regularHours
                           ? inputs.regularHours
                           : ""
                     }
                     type={"number"}
                     label={"Hours*"}
                     name="hours"
                     typeError={error === "hours" && ErrorText.field}
                  />
                  <div className={classes_v2.paycodeBox}>
                     <Checkbox
                        defaultChecked={info ? checked : true}
                        onClick={onCheck}
                        color="primary"
                     />
                     <p className={classes_v2.activePaycode}>Active Paycode</p>
                  </div>
                  <div style={{ display: "flex" }}>
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.startDate}
                        type={"date"}
                        label={"Start Date*"}
                        name="startDate"
                        typeError={error === "startDate" && ErrorText.field}
                     />
                     <div style={{ width: 16 }} />
                     <ValidationInput
                        variant={"outlined"}
                        disabled={inputs.endDate ? false : checked}
                        onChange={handleChange}
                        value={checked ? "Present" : inputs.endDate}
                        type={checked ? "text" : "date"}
                        label={"End Date*"}
                        name="endDate"
                        typeError={
                           error === "endDate"
                              ? ErrorText.field
                              : error === ErrorText.dateError
                              ? ErrorText.dateError
                              : ""
                        }
                     />
                  </div>
               </div>
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth="224px"
               />
            </div>
         </div>
      </div>
   );
};
