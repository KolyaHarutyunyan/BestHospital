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
import {
   enumValues,
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   isNotEmpty,
   manageType,
} from "@eachbase/utils";
import {
   adminActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   systemActions,
} from "@eachbase/store";
import { createClientStyle } from "@eachbase/fragments/client";
import { Checkbox } from "@material-ui/core";

export const EmploymentModal = ({ handleClose, info }) => {
   const classes = createClientStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const jobTitles = useSelector((state) => state.system.jobs);
   const departments = useSelector((state) => state.system.departments);
   const staffList = useSelector((state) => state.admins.adminsAllList.staff)?.filter(
      (item) => item.id !== params.id && item
   );

   const success = info
      ? FindSuccess("EDIT_EMPLOYMENT")
      : FindSuccess("CREATE_EMPLOYMENT");
   const loader = info ? FindLoad("EDIT_EMPLOYMENT") : FindLoad("CREATE_EMPLOYMENT");
   const backError = info ? FindError("EDIT_EMPLOYMENT") : FindError("CREATE_EMPLOYMENT");

   const employmentIsOverlapping = backError[0]?.error === "employment overlapping3";

   useEffect(() => {
      if (employmentIsOverlapping) {
         setError(ErrorText.overlappingError("Employments"));
      }
   }, [employmentIsOverlapping]);

   useEffect(() => {
      dispatch(systemActions.getJobs());
      dispatch(systemActions.getDepartments());
      dispatch(adminActions.getAllAdmins());
   }, []);

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? {
              ...info,
              title: info.title?._id,
              supervisor: info.supervisor?.firstName,
              departmentId: info?.departmentId?.name,
              startDate: moment(info?.startDate).format("YYYY-MM-DD"),
              endDate: moment(info.endDate).format("YYYY-MM-DD"),
              employmentType: manageType(info.type),
           }
         : {}
   );
   const [checked, setChecked] = useState(info ? info.endDate === null : true);

   function onCheck(e) {
      setChecked(e.target.checked);
      inputs["endDate"] = null;
      (error === "endDate" || error === ErrorText.dateError) && setError("");
   }

   function handleChange(e) {
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
   }

   function handleCreate() {
      const startDateIsValid =
         new Date(inputs.startDate).getTime() < new Date(new Date()).getTime();
      const dateComparingIsValid =
         !!inputs.endDate &&
         new Date(inputs.startDate).getTime() < new Date(inputs.endDate).getTime();
      const employmentDataIsValid =
         !!inputs.title &&
         isNotEmpty(inputs.departmentId) &&
         // isNotEmpty(inputs.supervisor) &&
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
         const scheduleEnum =
            inputs.employmentType === "Full-time"
               ? 1
               : inputs.employmentType === "Part-time"
               ? 0
               : undefined;
         const data = {
            title: inputs.title,
            staffId: params.id,
            supervisor: supervisorID,
            departmentId: depId,
            active: false,
            startDate: new Date(),
            endDate: inputs.endDate || null,
            schedule: scheduleEnum,
            type: manageType(inputs.employmentType),
         };
         if (info) {
            dispatch(adminActions.editEmployment(data, info.id, params.id));
         } else {
            dispatch(adminActions.createEmployment(data, params.id));
         }
      } else {
         const employmentDataErrorText = !inputs.title
            ? "title"
            : // : !isNotEmpty(inputs.supervisor)
            // ? "supervisor"
            !isNotEmpty(inputs.departmentId)
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
   }

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            className={classes.employmentModalStyle}
            handleClose={handleClose}
            title={info ? "Edit Employment" : "Add a New Employment"}
            text={
               info
                  ? "Please modify the below fields to edit this employment."
                  : "Please fulfill the below fields to add an employment."
            }
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               <div className={classes.clientModalBox}>
                  <SelectInput
                     name="title"
                     type={"id"}
                     label={"Title*"}
                     handleSelect={handleChange}
                     value={inputs.title}
                     list={jobTitles ? jobTitles : []}
                     typeError={error === "title" ? ErrorText.selectField : ""}
                  />
                  <SelectInput
                     name={"supervisor"}
                     label={"Supervisor"}
                     handleSelect={handleChange}
                     value={inputs.supervisor}
                     list={staffList ? staffList : []}
                     // typeError={error === "supervisor" ? ErrorText.selectField : ""}
                  />
                  <SelectInput
                     name={"departmentId"}
                     label={"Department*"}
                     handleSelect={handleChange}
                     value={inputs.departmentId}
                     list={departments ? departments : []}
                     typeError={error === "departmentId" ? ErrorText.selectField : ""}
                  />
                  <SelectInput
                     name="employmentType"
                     label={"Employment Type*"}
                     handleSelect={handleChange}
                     value={inputs.employmentType}
                     language={enumValues.EMPLOYMENT_TYPES}
                     typeError={error === "employmentType" ? ErrorText.selectField : ""}
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
