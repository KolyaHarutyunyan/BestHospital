import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { ErrorText, FindError, FindLoad, FindSuccess, isNotEmpty } from "@eachbase/utils";
import {
   adminActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   systemActions,
} from "@eachbase/store";
import { createClientStyle } from "@eachbase/fragments/client";
import { Checkbox } from "@material-ui/core";

const _list = [{ name: "Part Time" }, { name: "Full Time" }];
const _partTime = _list[0].name;
const _fullTime = _list[1].name;

export const EmploymentModal = ({ handleClose, info }) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? {
              ...info,
              supervisor: info.supervisor.firstName,
              departmentId: info?.departmentId?.name,
              startDate: moment(info?.startDate).format("YYYY-MM-DD"),
              endDate: moment(info.endDate).format("YYYY-MM-DD"),
              employmentType:
                 info?.schedule === 0 ? _partTime : info?.schedule === 1 ? _fullTime : "",
           }
         : {}
   );

   const [checked, setChecked] = useState(info ? info.endDate === null : true);

   const params = useParams();

   const dispatch = useDispatch();

   const departments = useSelector((state) => state.system.departments);
   const staffList = useSelector((state) => state.admins.adminsAllList.staff)?.filter(
      (item) => item.id !== params.id && item
   );

   const classes = createClientStyle();

   const success = info
      ? FindSuccess("EDIT_EMPLOYMENT")
      : FindSuccess("CREATE_EMPLOYMENT");
   const loader = info ? FindLoad("EDIT_EMPLOYMENT") : FindLoad("CREATE_EMPLOYMENT");
   const backError = info ? FindError("EDIT_EMPLOYMENT") : FindError("CREATE_EMPLOYMENT");

   const employmentIsOverlapping = backError[1]?.error === "employment overlapping";

   useEffect(() => {
      if (employmentIsOverlapping) {
         setError(ErrorText.overlappingError("Employments"));
      }
   }, [employmentIsOverlapping]);

   useEffect(() => {
      dispatch(systemActions.getDepartments());
      dispatch(adminActions.getAllAdmins());
   }, []);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const onCheck = (e) => {
      setChecked(e.target.checked);
      inputs["endDate"] = null;
      (error === "endDate" || error === ErrorText.dateError) && setError("");
   };

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value === 0 ? "0" : e.target.value,
      }));
      if (
         error === e.target.name ||
         error === ErrorText.dateError ||
         error === ErrorText.startDateError ||
         error === ErrorText.overlappingError("Employments")
      ) {
         setError("");
      }
      if (!!backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError.type));
      }
   };

   const handleCreate = () => {
      const startDateIsValid =
         new Date(inputs.startDate).getTime() < new Date(new Date()).getTime();

      const dateComparingIsValid =
         !!inputs.endDate &&
         new Date(inputs.startDate).getTime() < new Date(inputs.endDate).getTime();

      const employmentDataIsValid =
         isNotEmpty(inputs.title) &&
         isNotEmpty(inputs.departmentId) &&
         isNotEmpty(inputs.supervisor) &&
         isNotEmpty(inputs.employmentType) &&
         !!inputs.startDate &&
         (checked ? startDateIsValid : dateComparingIsValid);

      if (employmentDataIsValid) {
         let depId;
         let supervisorID;

         departments.forEach((item) => {
            if (inputs.departmentId === item.name) {
               depId = item.id;
            }
         });

         staffList &&
            staffList.forEach((item) => {
               if (inputs.supervisor === item.firstName) {
                  supervisorID = item.id;
               }
            });

         const data = {
            title: inputs.title,
            staffId: params.id,
            supervisor: supervisorID,
            departmentId: depId,
            active: false,
            startDate: new Date(),
            endDate: inputs.endDate || null,
            schedule:
               inputs.employmentType === _partTime
                  ? 0
                  : inputs.employmentType === _fullTime
                  ? 1
                  : "",
         };

         if (info) {
            dispatch(adminActions.editEmployment(data, info.id, params.id));
         } else {
            dispatch(adminActions.createEmployment(data, params.id));
         }
      } else {
         const employmentDataErrorText = !isNotEmpty(inputs.title)
            ? "title"
            : !isNotEmpty(inputs.supervisor)
            ? "supervisor"
            : !isNotEmpty(inputs.departmentId)
            ? "departmentId"
            : !isNotEmpty(inputs.employmentType)
            ? "employmentType"
            : !inputs.startDate
            ? "startDate"
            : !startDateIsValid
            ? ErrorText.startDateError
            : !inputs.endDate
            ? "endDate"
            : !dateComparingIsValid
            ? ErrorText.dateError
            : "";

         setError(employmentDataErrorText);
      }
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            handleClose={handleClose}
            title={info ? "Edit Employment" : "Add a New Employment"}
            text={"Please fulfill the below fields to add an employment."}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.title}
                     type={"text"}
                     label={"Title*"}
                     name="title"
                     typeError={error === "title" && ErrorText.field}
                  />
                  <SelectInput
                     name={"supervisor"}
                     label={"Supervisor*"}
                     handleSelect={handleChange}
                     value={inputs.supervisor}
                     list={staffList ? staffList : []}
                     typeError={error === "supervisor" ? ErrorText.field : ""}
                  />
                  <SelectInput
                     name={"departmentId"}
                     label={"Department*"}
                     handleSelect={handleChange}
                     value={inputs.departmentId}
                     list={departments ? departments : []}
                     typeError={error === "departmentId" ? ErrorText.field : ""}
                  />
                  <SelectInput
                     name="employmentType"
                     label={"Employment Type*"}
                     handleSelect={handleChange}
                     value={inputs.employmentType}
                     list={_list}
                     typeError={error === "employmentType" ? ErrorText.field : ""}
                  />

                  <div className={classes.curentlyCheckbox}>
                     <Checkbox checked={checked} onClick={onCheck} color="primary" />
                     <p className={classes.curently}>Currently works in this role</p>
                  </div>
                  <div style={{ display: "flex" }}>
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.startDate}
                        type={"date"}
                        label={"Start Date*"}
                        name="startDate"
                        typeError={
                           error === "startDate"
                              ? ErrorText.field
                              : error === ErrorText.startDateError
                              ? ErrorText.startDateError
                              : error === ErrorText.overlappingError("Employments")
                              ? ErrorText.overlappingError("Employments")
                              : ""
                        }
                     />
                     <div style={{ width: 16 }} />
                     <ValidationInput
                        variant={"outlined"}
                        disabled={checked}
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
