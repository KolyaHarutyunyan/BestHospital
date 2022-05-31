import React, { useEffect, useState } from "react";
import { CreateChancel, SelectInput, ValidationInput } from "@eachbase/components";
import { ErrorText, FindLoad, isNotEmpty } from "@eachbase/utils";
import { scheduleModalsStyle } from "./styles";
import { modalsStyle } from "@eachbase/components/modal/styles";
import { adminActions, appointmentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getDynamicContent } from "./constants";

export const Break = ({
   handleOpenClose,
   type,
   date,
   staffList,
   allPaycodes,
   modalDate,
   day,
   createModalDate,
}) => {
   const classes = scheduleModalsStyle();
   const global = modalsStyle();

   const dispatch = useDispatch();

   const [inputs, setInputs] = useState(
      modalDate
         ? { ...modalDate, staffPayCode: modalDate.staffPayCode?._id }
         : day
         ? { ...day, ...createModalDate }
         : createModalDate
         ? { ...createModalDate }
         : {}
   );
   const [times, setTimes] = useState(date ? { ...date } : {});
   const [error, setError] = useState({});

   const handleCloseModal = () => {
      handleOpenClose && handleOpenClose();
      setInputs("");
      setTimes("");
   };

   useEffect(() => {
      if (createModalDate && createModalDate.staff) {
         dispatch(adminActions.getAllPaycodes(createModalDate.staff));
      }
   }, [createModalDate]);

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
      e.target.name === "staff" && dispatch(adminActions.getAllPaycodes(e.target.value));
   };

   const handleChangeDate = (e) => {
      let today = inputs.startDate ? new Date(inputs.startDate) : new Date();
      let myToday = new Date(
         today.getFullYear(),
         today.getMonth(),
         today.getDate(),
         e.target.value.slice(0, 2),
         e.target.value.slice(3, 5),
         0
      );
      setTimes((prevState) => ({ ...prevState, [e.target.name]: myToday }));
      (e.target.name === error || error === ErrorText.timeError) && setError("");
   };

   const modalType =
      type === "Break"
         ? "BREAK"
         : type === "Drive"
         ? "DRIVE"
         : type === "Paid"
         ? "PAID"
         : "";

   const handleCreate = () => {
      const timeComparingIsValid =
         !!times.startTime &&
         !!times.endTime &&
         Date.parse(times.startTime) < Date.parse(times.endTime);

      const dataIsValid =
         isNotEmpty(inputs.staff) &&
         isNotEmpty(inputs.staffPayCode) &&
         inputs.startDate &&
         timeComparingIsValid;

      const modalBool =
         modalType === "DRIVE" ? dataIsValid && isNotEmpty(inputs.miles) : dataIsValid;

      if (modalBool) {
         const date = {
            type: modalType,
            ...inputs,
            ...times,
            miles: +inputs.miles,
            eventStatus: "PENDING",
            status: "ACTIVE",
            require: false,
         };

         const editDate = {
            type: inputs.type,
            ...times,
            miles: +inputs.miles,
            eventStatus: "PENDING",
            status: "ACTIVE",
            require: false,
            staff: inputs.staff
               ? inputs.staff._id
                  ? inputs.staff._id
                  : inputs.staff
               : "",
            staffPayCode: inputs.staffPayCode
               ? inputs.staffPayCode._id
                  ? inputs.staffPayCode._id
                  : inputs.staffPayCode
               : "",
            startDate: inputs.startDate,
            _id: inputs.inputs,
         };
         inputs.type === "DRIVE" ? (editDate["miles"] = +inputs.miles) : "";

         if (modalDate) {
            dispatch(appointmentActions.editAppointment(editDate, inputs._id));
         } else {
            dispatch(appointmentActions.createAppointment(date));
         }
      } else {
         const errorText = !inputs.staff
            ? "staff"
            : !inputs.staffPayCode
            ? "staffPayCode"
            : !inputs.startDate
            ? "startDate"
            : !times.startTime
            ? "startTime"
            : !times.endTime
            ? "endTime"
            : !timeComparingIsValid
            ? ErrorText.timeError
            : "";

         if (modalType === "DRIVE") {
            setError(errorText ? errorText : !inputs.miles ? "miles" : "");
         } else {
            setError(errorText);
         }
      }
   };

   const loader = modalDate
      ? FindLoad("EDIT_APPOINTMENT")
      : FindLoad("CREATE_APPOINTMENT");

   const titleContent = getDynamicContent("TITLE", modalDate, type);
   const subtitleContent = getDynamicContent("SUBTITLE", modalDate, type);

   const activeStaffPaycodes = allPaycodes
      .filter((staffPaycode) => staffPaycode.active)
      .map((staffPaycode) => ({
         ...staffPaycode,
         name: staffPaycode.payCodeTypeId.name,
      }));

   return (
      <div>
         <p className={global.availableScheduleTitle}>{titleContent}</p>
         <p className={classes.subTitle}>{subtitleContent}</p>

         <div className={classes.breakWrapper}>
            <SelectInput
               type={"id"}
               language={null}
               name={"staff"}
               label={"Staff Member*"}
               handleSelect={handleChange}
               value={modalDate ? inputs.staff._id : inputs.staff}
               list={staffList ? staffList : []}
               typeError={error === "staff" && ErrorText.field}
            />
            <SelectInput
               type={"id"}
               language={null}
               name={"staffPayCode"}
               label={"Staff Paycode*"}
               handleSelect={handleChange}
               value={
                  modalDate
                     ? inputs.staffPayCode._id
                        ? inputs.staffPayCode._id
                        : inputs.staffPayCode
                     : inputs.staffPayCode
               }
               list={activeStaffPaycodes}
               typeError={error === "staffPayCode" && ErrorText.field}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               value={
                  inputs.startDate
                     ? moment(inputs.startDate).format("YYYY-MM-DD")
                     : inputs.startDate
               }
               type={"date"}
               label={"Start Date*"}
               name="startDate"
               typeError={error === "startDate" && ErrorText.field}
            />

            <div className={classes.timeInputs}>
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChangeDate}
                  value={
                     times.startTime
                        ? `${
                             times.startTime.getHours() < 10
                                ? `0${times.startTime.getHours()}`
                                : times.startTime.getHours()
                          }:${
                             times.startTime.getMinutes() < 10
                                ? `0${times.startTime.getMinutes()}`
                                : times.startTime.getMinutes()
                          }`
                        : ""
                  }
                  type={"time"}
                  label={"Start Time*"}
                  name="startTime"
                  style={classes.startTime}
                  typeError={error === "startTime" && ErrorText.field}
               />
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChangeDate}
                  value={
                     times.endTime
                        ? `${
                             times.endTime.getHours() < 10
                                ? `0${times.endTime.getHours()}`
                                : times.endTime.getHours()
                          }:${
                             times.endTime.getMinutes() < 10
                                ? `0${times.endTime.getMinutes()}`
                                : times.endTime.getMinutes()
                          }`
                        : ""
                  }
                  type={"time"}
                  label={"End Time*"}
                  name="endTime"
                  typeError={
                     error === "endTime"
                        ? ErrorText.field
                        : error === ErrorText.timeError
                        ? ErrorText.timeError
                        : ""
                  }
               />
            </div>

            {type === "Drive" && (
               <ValidationInput
                  variant={"outlined"}
                  onChange={handleChange}
                  value={inputs.miles}
                  type={"number"}
                  label={"Miles*"}
                  name="miles"
                  typeError={error === "miles" && ErrorText.field}
               />
            )}
            <CreateChancel
               loader={!!loader.length}
               create={modalDate ? "Save" : "Add"}
               chancel={"Cancel"}
               onCreate={handleCreate}
               onClose={handleCloseModal}
               buttonWidth="191px"
            />
         </div>
      </div>
   );
};
